import Register from './components/Register'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from './components/AdminLogin';
import Dashboard from './components/Dashboard';
import UserProfile from './components/UserProfile'
import Users from './components/Users'

function App() {
  return (
     <Router>
      <Routes>
        <Route path="/login" element={<AdminLogin/>} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/user-profile" element={<UserProfile/>}/>
        <Route path="/" element={<h1>Welcome to Billing System</h1>} />
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/users" element={<Users/>}/>
      </Routes>
    </Router>
    
  )
}

export default App