export async function classifyText(reportTitle, reportContent) {
  try {
    const response = await fetch('/api/classify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        reportTitle,
        reportContent
      })
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Failed to classify text')
    }

    const classifications = await response.json()
    return classifications
  } catch (error) {
    console.error('Classification API Error:', error)
    throw new Error(error.message || 'Failed to classify text. Please try again.')
  }
}