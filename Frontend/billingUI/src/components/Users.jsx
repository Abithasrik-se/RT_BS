import { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AdminLogin from "./AdminLogin";
import axios from "axios";

const Users = () => {
  const {  role, isAuthenticated } = useSelector((state) => state.auth);
  const [message,setMessage] = useState([""]);
  const navigate = useNavigate();
  console.log(role)

  
    const [users, setUsers] = useState([]);

  // Fetch users from API
    useEffect(() => {
      axios.get("http://127.0.0.1:8000/account/user/")
        .then(res => {setUsers(res.data)
          console.log(res.data);
          
        })
        .catch(err => console.error("Error fetching users:", err));
    }, []);

    const handleCreate = () => {
      navigate('/register');
      alert("Navigate to Create User page or open modal.");
    };

    const handleUpdate = (userId) => {
      // update navigation link
      alert(`Update user with ID: ${userId}`);
    };

    const handleDelete = (userId) => {
      const confirmDelete = window.confirm("Are you sure you want to delete this user?");
      if (confirmDelete) {
      // DELETE call (optional)
        axios.delete(`http://127.0.0.1:8000/account/user/${userId}/`)
          .then(() => {
            setUsers(prev => prev.filter(user => user.id !== userId));
          })
          .catch(err => console.error("Error deleting user:", err));
      }
    };

  if(!isAuthenticated){
    return <div>
        <h1>Access Denied.Unauthorized user.</h1>
        <p>Go to <Link to="/login">Login Page.</Link></p>
    </div>
  }
  
  if(role ==='super_admin' | role === 'tenant_admin'){
  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>User List</h3>
        <button className="btn btn-primary" onClick={handleCreate}>Create User</button>
      </div>

      <table className="table table-striped table-bordered shadow">
        <thead className="table-dark">
          <tr>
            <th>Tenant</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">No users found</td>
            </tr>
          ) : (
            users.map(user => (  
              <tr key={user.id}>
                <td>{user.tenant}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.role}</td>
                <td>
                  <button className="btn btn-sm btn-warning me-2" onClick={() => handleUpdate(user.id)}>
                    Update
                  </button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(user.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );

}}



export default Users