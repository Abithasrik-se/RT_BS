import React from 'react'
import adminData from '../../data/admin.json'
import '../css/AdminLogin.css'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";


const AdminLogin = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

    const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError("");
    setSuccess("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { username, password } = form;
    const { admin } = adminData;

    if (!username || !password) {
      setError("Both fields are required.");
      return;
    }

    if (username === admin.username && password === admin.password) {
      setSuccess("Login successful!");
      setTimeout(() => navigate("/dashboard"), 1000);
    } else {
      setError("Invalid credentials.");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-box">
        <h2>Admin Login</h2>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <label>Username</label>
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Enter admin username"
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Enter password"
        />
        <div style={{ textAlign: "right", marginTop: "5px" }}>
          <a href="#" style={{ fontSize: "14px", color: "#0d6efd" }}>
            Forgot password?
          </a>
        </div>

        <button type="submit">Login</button>
      </form>
      
    </div>
    
  );
}

export default AdminLogin