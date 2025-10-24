'use client'

import { useState } from 'react'
import { classifyText } from '../utils/openai'

export default function InputPage({ onClassificationComplete, onLogout }) {
  const [reportTitle, setReportTitle] = useState('')
  const [reportContent, setReportContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')

  const handleClassify = async () => {
    if (!reportTitle.trim()) {
      setSnackbarMessage('Please enter a report title')
      setSnackbarOpen(true)
      return
    }

    if (!reportContent.trim()) {
      setSnackbarMessage('Please enter report content')
      setSnackbarOpen(true)
      return
    }

    setLoading(true)
    setError('')

    try {
      const result = await classifyText(reportTitle, reportContent)
      onClassificationComplete({
        title: reportTitle,
        content: reportContent,
        classifications: result
      })
    } catch (err) {
      setError(err.message || 'Failed to classify text. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleSnackbarClose = () => {
    setSnackbarOpen(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h1 className="text-xl font-semibold text-gray-800">ESG Classification Tool</h1>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-all duration-200 ease-in-out"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Input Report Data</h2>
          <p className="text-gray-600">Paste your Vietnamese AGM resolution text below for ESG classification</p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-lg shadow-md p-8 transition-all duration-200 ease-in-out">
          <div className="space-y-6">
            {/* Report Title */}
            <div>
              <label htmlFor="reportTitle" className="block text-sm font-medium text-gray-700 mb-2">
                Report Title
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <input
                  id="reportTitle"
                  type="text"
                  value={reportTitle}
                  onChange={(e) => setReportTitle(e.target.value)}
                  disabled={loading}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 ease-in-out disabled:bg-gray-50 disabled:cursor-not-allowed"
                  placeholder="Enter the report title (used for file naming)"
                />
              </div>
            </div>

            {/* Report Content */}
            <div>
              <label htmlFor="reportContent" className="block text-sm font-medium text-gray-700 mb-2">
                Report Content
              </label>
              <textarea
                id="reportContent"
                rows={12}
                value={reportContent}
                onChange={(e) => setReportContent(e.target.value)}
                disabled={loading}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 ease-in-out disabled:bg-gray-50 disabled:cursor-not-allowed resize-vertical"
                placeholder="Paste your Vietnamese AGM resolution text here. Each bullet point or numbered item will be classified separately."
              />
              <p className="mt-2 text-sm text-gray-500">
                Each bullet point, numbered item, or lettered item will be treated as a separate resolution for classification.
              </p>
            </div>

            {/* Error Display */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg transition-all duration-200 ease-in-out">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                onClick={handleClassify}
                disabled={loading || !reportTitle.trim() || !reportContent.trim()}
                className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-medium py-3 px-8 rounded-lg transition-all duration-200 ease-in-out flex items-center space-x-2 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Classifying...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m-6-8h8a2 2 0 012 2v8a2 2 0 01-2 2H8a2 2 0 01-2-2V6a2 2 0 012-2z" />
                    </svg>
                    Classify ESG
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 p-6 bg-green-50 rounded-lg border border-green-200">
          <h3 className="text-lg font-semibold text-green-800 mb-3">How it works:</h3>
          <div className="space-y-2 text-green-700">
            <p className="flex items-start space-x-2">
              <span className="text-green-600 mt-1">•</span>
              <span>Paste Vietnamese AGM resolution text with bullet points or numbered items</span>
            </p>
            <p className="flex items-start space-x-2">
              <span className="text-green-600 mt-1">•</span>
              <span>Each item will be classified into one of 6 ESG categories</span>
            </p>
            <p className="flex items-start space-x-2">
              <span className="text-green-600 mt-1">•</span>
              <span>Results will be exported as CSV with company, resolution, and classification data</span>
            </p>
            <p className="flex items-start space-x-2">
              <span className="text-green-600 mt-1">•</span>
              <span>Raw input text will also be available for download</span>
            </p>
          </div>
        </div>
      </div>

      {/* Snackbar */}
      {snackbarOpen && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-lg shadow-md transition-all duration-200 ease-in-out">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <span>{snackbarMessage}</span>
              <button
                onClick={handleSnackbarClose}
                className="ml-4 text-yellow-600 hover:text-yellow-800"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}