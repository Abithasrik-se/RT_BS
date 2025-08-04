import Register from './components/Register'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from './components/AdminLogin';
import Dashboard from './components/Dashboard';
import UserProfile from './components/UserProfile'
import Users from './components/Users'
import { useEffect } from 'react';
import { getAuthFromStorage } from './utils/utilities';
import { useDispatch } from 'react-redux';
import { loginSuccess } from './redux/authSlice';
import ForgetPassword from './components/ForgetPassword';
import ResetPassword from './components/ResetPassword';




function App() {

  const dispatch = useDispatch()

    useEffect(() => {
    const authData = getAuthFromStorage();
    if (authData.token && authData.role) {
      dispatch(loginSuccess(authData));
    }
  }, [dispatch]);
  return (
     <Router>
      <Routes>
        <Route path="/login" element={<AdminLogin/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/user-profile" element={<UserProfile/>}/>
        <Route path="/" element={<h1>Welcome to Billing System </h1>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/users" element={<Users/>}/>
        <Route path="/forget-password" element={<ForgetPassword/>}/>
        <Route path="/reset-password/:uid/:token" element={<ResetPassword />}/>
        <Route path="/update-user/:userId" element={<UpdateUser />} />
      </Routes>
    </Router>  
  )
}

export default App