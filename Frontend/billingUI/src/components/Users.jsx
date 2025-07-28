import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AdminLogin from "./AdminLogin";

const Users = () => {
  const { token, role, isAuthenticated } = useSelector((state) => state.auth);
  const [message,setMessage] = useState([""]);
  const navigate = useNavigate();

  if(!isAuthenticated){
    return <div>
        <h1>Access Denied.Unauthorized user.</h1>
        <p>Go to <Link to={<AdminLogin/>}/>Login Page.</p>
    </div>
  }
  if(role.lower() ==='tenant_admin' | role.lower() === 'super_admin')
{
    
}

};


export default Users