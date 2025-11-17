import React from 'react'
import AuthPage from './pages/AuthPage.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { BrowserRouter as Router,Route } from 'react-router-dom';

function App() {

  return (
    <AuthProvider>
    <>
      <Router>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/dashboard" element={<div>Dashboard Page</div>} />
      </Router>
    </>
    </AuthProvider>
  )
}

export default App
