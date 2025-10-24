'use client'

import { useState, useEffect } from 'react'
import LoginPage from './components/LoginPage'
import InputPage from './components/InputPage'
import OutputPage from './components/OutputPage'

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentPage, setCurrentPage] = useState('login')
  const [classificationData, setClassificationData] = useState(null)

  useEffect(() => {
    // Check if user is already authenticated
    const authStatus = localStorage.getItem('esg_auth')
    if (authStatus === 'true') {
      setIsAuthenticated(true)
      setCurrentPage('input')
    }
  }, [])

  const handleLogin = (success) => {
    if (success) {
      setIsAuthenticated(true)
      setCurrentPage('input')
      localStorage.setItem('esg_auth', 'true')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setCurrentPage('login')
    setClassificationData(null)
    localStorage.removeItem('esg_auth')
  }

  const handleClassificationComplete = (data) => {
    setClassificationData(data)
    setCurrentPage('output')
  }

  const handleBackToInput = () => {
    setCurrentPage('input')
    setClassificationData(null)
  }

  const handleNewClassification = () => {
    setCurrentPage('input')
    setClassificationData(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sustainability-green-50 to-white">
      {currentPage === 'login' && (
        <LoginPage onLogin={handleLogin} />
      )}
      
      {currentPage === 'input' && isAuthenticated && (
        <InputPage 
          onClassificationComplete={handleClassificationComplete}
          onLogout={handleLogout}
        />
      )}
      
      {currentPage === 'output' && isAuthenticated && (
        <OutputPage 
          data={classificationData}
          onBackToInput={handleBackToInput}
          onNewClassification={handleNewClassification}
          onLogout={handleLogout}
        />
      )}
    </div>
  )
}
