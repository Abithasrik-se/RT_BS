import React from 'react'
<<<<<<< HEAD
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import Navbar from './components/Navbar'
import { useState } from 'react'


function App() {
     const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
=======
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
    
>>>>>>> feature/frontend
  )
  
}

export default App