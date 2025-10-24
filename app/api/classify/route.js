import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request) {
  try {
    const { reportTitle, reportContent } = await request.json()

    if (!reportTitle || !reportContent) {
      return NextResponse.json(
        { error: 'Report title and content are required' },
        { status: 400 }
      )
    }

    if (!openai.apiKey || openai.apiKey === 'your_openai_api_key_here') {
      // Return mock data for development
      return NextResponse.json(generateMockData(reportContent))
    }

    const prompt = `
System / Instruction for the classifier:
You are a Vietnamese AGM resolution classifier. Input text will be Vietnamese AGM resolutions (each bullet/number/letter = one resolution).

Use these six categories (output the category name exactly in Vietnamese):

Tài chính & Kiểm toán (includes: Báo cáo tài chính thường niên đã kiểm toán; Giao dịch với các bên liên quan; Chương trình quyền chọn cổ phiếu / ESOP; Cổ tức; Kế hoạch phân phối lợi nhuận; Mua lại cổ phiếu quỹ; Phát hành/niêm yết thêm cổ phần cho cổ đông hiện hữu; Tăng vốn điều lệ; Bổ nhiệm / tái bổ nhiệm kiểm toán viên; Phát hành trái phiếu)

Môi trường & Xã hội (E&S) (includes: Môi trường / Sức khỏe; Xã hội / Nhân quyền)

Quản trị & Tuân thủ (includes: Cơ cấu HĐQT / Tính độc lập của HĐQT; Bổ nhiệm / tái bổ nhiệm thành viên HĐQT; Sửa đổi/chia tách điều lệ)

Thù lao (includes: Thù lao của Ban điều hành / Thành viên HĐQT; Các khoản đãi ngộ ngoài lương)

Hoạt động (includes: Báo cáo của HĐQT và Ban kiểm soát; Các vấn đề kinh tế chung; Hoạt động thường xuyên / Kinh doanh; Phê duyệt quyên góp và chi tiêu chính trị; Khác)

Đầu tư chiến lược (includes: Kế hoạch mở rộng kinh doanh & đầu tư; Sáp nhập và Mua lại)

Matching rules (strict, step-by-step):
a. Normalize text (case-insensitive).
b. Match keywords / the resolution to the bullet definitions above by looking for exact phrases or common synonyms (e.g., "báo cáo tài chính", "cổ tức", "ESOP", "mua lại cổ phiếu", "bổ nhiệm HĐQT", "sáp nhập", "mua lại", "mở rộng đầu tư", "phát hành trái phiếu", "quyên góp chính trị", "môi trường", "nhân quyền", "thù lao", etc.).
d. If multiple categories match, pick the single primary category using this rule: (1) exact phrase match to a definition (highest priority), (2) most keyword matches, (3) if still tied, use context matching.
e. If no category matches, flag it as N/A.

Output format (exactly; nothing else): a CSV with one header row and one row per resolution. Do not output any commentary, explanation, or extra text — only the CSV.

Header (exact):
Company,ResolutionNumber,Resolution,ClassifiedTopic,Definition

Column rules:
Company: company name or empty string if not given. If the company name is present in the input, fill it; otherwise leave blank.
Resolution number: the number that indicates the resolution
Resolution: a generated title using key words that helped classify the resolution. These are used for human cross-check.
ClassifiedTopic: write the category name
Definition: write the exact definition (example: Báo cáo tài chính thường niên đã kiểm toán).

If the input contains many resolutions, process them all and output one CSV row per resolution.

Input text to classify:
${reportContent}
`

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a Vietnamese AGM resolution classifier. Return only CSV data with no additional text or explanations."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.1,
      max_tokens: 2000,
    })

    const response = completion.choices[0].message.content.trim()
    const classifications = parseCSVResponse(response)
    
    return NextResponse.json(classifications)

  } catch (error) {
    console.error('OpenAI API Error:', error)
    return NextResponse.json(
      { error: 'Failed to classify text. Please check your API key and try again.' },
      { status: 500 }
    )
  }
}

function parseCSVResponse(csvText) {
  const lines = csvText.split('\n').filter(line => line.trim())
  if (lines.length < 2) {
    throw new Error('Invalid response format from AI')
  }

  const headers = lines[0].split(',').map(h => h.trim())
  const results = []

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim().replace(/^"|"$/g, ''))
    if (values.length >= 5) {
      results.push({
        Company: values[0] || '',
        ResolutionNumber: values[1] || '',
        Resolution: values[2] || '',
        ClassifiedTopic: values[3] || 'N/A',
        Definition: values[4] || ''
      })
    }
  }

  return results
}

function generateMockData(content) {
  // Generate mock data for development/testing
  const mockCategories = [
    'Tài chính & Kiểm toán',
    'Môi trường & Xã hội (E&S)',
    'Quản trị & Tuân thủ',
    'Thù lao',
    'Hoạt động',
    'Đầu tư chiến lược'
  ]

  const mockDefinitions = [
    'Báo cáo tài chính thường niên đã kiểm toán',
    'Môi trường / Sức khỏe',
    'Bổ nhiệm / tái bổ nhiệm thành viên HĐQT',
    'Thù lao của Ban điều hành / Thành viên HĐQT',
    'Báo cáo của HĐQT và Ban kiểm soát',
    'Kế hoạch mở rộng kinh doanh & đầu tư'
  ]

  // Split content by common bullet point patterns
  const resolutions = content.split(/(?:\d+[\.\)]\s*|\d+[a-z][\.\)]\s*|[a-z][\.\)]\s*|\*\s*|\-\s*)/)
    .filter(item => item.trim().length > 10)
    .slice(0, 5) // Limit to 5 mock items

  return resolutions.map((resolution, index) => {
    const categoryIndex = index % mockCategories.length
    return {
      Company: '',
      ResolutionNumber: (index + 1).toString(),
      Resolution: resolution.trim().substring(0, 100) + (resolution.length > 100 ? '...' : ''),
      ClassifiedTopic: mockCategories[categoryIndex],
      Definition: mockDefinitions[categoryIndex]
    }
  })
}
