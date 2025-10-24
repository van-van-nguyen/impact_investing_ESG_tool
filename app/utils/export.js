import Papa from 'papaparse'

export function exportToCSV(data, filename) {
  if (!data || data.length === 0) {
    throw new Error('No data to export')
  }

  // Ensure all required columns are present
  const csvData = data.map(item => ({
    Company: item.Company || '',
    ResolutionNumber: item.ResolutionNumber || '',
    Resolution: item.Resolution || '',
    ClassifiedTopic: item.ClassifiedTopic || 'N/A',
    Definition: item.Definition || ''
  }))

  const csv = Papa.unparse(csvData, {
    header: true,
    delimiter: ',',
    quotes: true,
    quoteChar: '"',
    escapeChar: '"'
  })

  // Create blob and download
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `${sanitizeFilename(filename)}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }
}

export function exportRawText(content, filename) {
  if (!content) {
    throw new Error('No content to export')
  }

  const blob = new Blob([content], { type: 'text/plain;charset=utf-8;' })
  const link = document.createElement('a')
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `${sanitizeFilename(filename)}_raw.txt`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }
}

function sanitizeFilename(filename) {
  // Remove or replace invalid filename characters
  return filename
    .replace(/[^a-z0-9]/gi, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '')
    .toLowerCase()
    .substring(0, 50) // Limit length
}

