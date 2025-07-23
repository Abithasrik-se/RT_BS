import React from 'react'
import '../css/AdminLogin.css'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios'


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

  const handleSubmit = async(e) => {
    e.preventDefault();
    const { username, password } = form;

    if (!username || !password) {
      setError("Both fields are required.");
      return;
    }

     // Newly added
     try {
    // Fetch all admins
    const response = await axios.get('http://localhost:3001/admin');
    const admins = response.data;

    // Try to find user with matching username
    const user = (admins) => admins.username === username

    if (user) {
      if (admins.password === password) {
        setSuccess("Login successful!");
        setTimeout(() => navigate("/dashboard"), 1000);
      } else {
        setError("Incorrect Password.");
      }
    } else {
      setError("Incorrect Username.");
    }
  } catch (err) {
    console.error("API Error:", err);
    setError("Server error. Please try again later.");
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
          name="username" className="bg-light"
          value={form.username}
          onChange={handleChange}
          placeholder="Enter admin username"
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          className="bg-light"
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