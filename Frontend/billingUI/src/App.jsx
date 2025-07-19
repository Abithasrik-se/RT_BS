import React from 'react'
import Register from './components/Register'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from './components/AdminLogin';
import Dashboard from './components/Dashboard';

function App() {
  return (
     <Router>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin/>} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/" element={<h1>Welcome to Billing System</h1>} />
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
    </Router>
    
  )
}

export default App