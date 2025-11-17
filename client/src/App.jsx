import React from 'react'
import AuthPage from './pages/AuthPage.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';

function App() {

  return (
    <AuthProvider>
    <>
      <Router>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/dashboard" element={<div>Dashboard Page</div>} />
        </Routes>
      </Router>
    </>
    </AuthProvider>
  )
}

export default App
