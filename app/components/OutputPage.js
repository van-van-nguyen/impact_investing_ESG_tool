'use client'

import { useState } from 'react'
import { exportToCSV, exportRawText } from '../utils/export'

export default function OutputPage({ data, onBackToInput, onNewClassification, onLogout }) {
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')

  const handleDownloadCSV = () => {
    try {
      exportToCSV(data.classifications, data.title)
      setSnackbarMessage('CSV file downloaded successfully!')
      setSnackbarOpen(true)
    } catch (error) {
      setSnackbarMessage('Failed to download CSV file')
      setSnackbarOpen(true)
    }
  }

  const handleDownloadRaw = () => {
    try {
      exportRawText(data.content, data.title)
      setSnackbarMessage('Raw text file downloaded successfully!')
      setSnackbarOpen(true)
    } catch (error) {
      setSnackbarMessage('Failed to download raw text file')
      setSnackbarOpen(true)
    }
  }

  const handleSnackbarClose = () => {
    setSnackbarOpen(false)
  }

  const getCategoryColor = (category) => {
    const colors = {
      'Tài chính & Kiểm toán': 'bg-blue-100 text-blue-800 border-blue-200',
      'Môi trường & Xã hội (E&S)': 'bg-green-100 text-green-800 border-green-200',
      'Quản trị & Tuân thủ': 'bg-purple-100 text-purple-800 border-purple-200',
      'Thù lao': 'bg-orange-100 text-orange-800 border-orange-200',
      'Hoạt động': 'bg-gray-100 text-gray-800 border-gray-200',
      'Đầu tư chiến lược': 'bg-indigo-100 text-indigo-800 border-indigo-200',
    }
    return colors[category] || 'bg-gray-100 text-gray-800 border-gray-200'
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
              <h1 className="text-xl font-semibold text-gray-800">ESG Classification Results</h1>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Classification Results</h2>
          <p className="text-gray-600">Report: {data.title}</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center transition-all duration-200 ease-in-out">
            <div className="text-3xl font-bold text-green-700 mb-2">
              {data.classifications.length}
            </div>
            <div className="text-sm text-green-600">Total Resolutions</div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center transition-all duration-200 ease-in-out">
            <div className="text-3xl font-bold text-blue-700 mb-2">
              {new Set(data.classifications.map(c => c.ClassifiedTopic)).size}
            </div>
            <div className="text-sm text-blue-600">Categories Found</div>
          </div>
          
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 text-center transition-all duration-200 ease-in-out">
            <div className="text-3xl font-bold text-purple-700 mb-2">
              {data.classifications.filter(c => c.ClassifiedTopic !== 'N/A').length}
            </div>
            <div className="text-sm text-purple-600">Successfully Classified</div>
          </div>
        </div>

        {/* Download Buttons */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 transition-all duration-200 ease-in-out">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Download Results</h3>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={handleDownloadCSV}
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-all duration-200 ease-in-out flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Download CSV</span>
            </button>
            <button
              onClick={handleDownloadRaw}
              className="border border-green-600 text-green-600 hover:bg-green-50 font-medium py-2 px-6 rounded-lg transition-all duration-200 ease-in-out flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Download Raw Text</span>
            </button>
          </div>
        </div>

        {/* Results Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-200 ease-in-out">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-green-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Resolution
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Definition
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.classifications.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-all duration-200 ease-in-out">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.ResolutionNumber || index + 1}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 max-w-md">
                      <div className="truncate">
                        {item.Resolution}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getCategoryColor(item.ClassifiedTopic)}`}>
                        {item.ClassifiedTopic}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-sm">
                      <div className="truncate">
                        {item.Definition}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={onBackToInput}
            className="border border-green-600 text-green-600 hover:bg-green-50 font-medium py-2 px-6 rounded-lg transition-all duration-200 ease-in-out flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Input</span>
          </button>
          <button
            onClick={onNewClassification}
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-all duration-200 ease-in-out flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>New Classification</span>
          </button>
        </div>
      </div>

      {/* Snackbar */}
      {snackbarOpen && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg shadow-md transition-all duration-200 ease-in-out">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{snackbarMessage}</span>
              <button
                onClick={handleSnackbarClose}
                className="ml-4 text-green-600 hover:text-green-800"
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