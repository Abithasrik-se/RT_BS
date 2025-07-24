import React from 'react'
import '../css/AdminLogin.css'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const AdminLogin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setError("Both email and password are required.");
      return;
    }

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/account/login/',
        form,
        { headers: { 'Content-Type': 'application/json' } }
      );

      const data = response.data;

      // Save token and user details to localStorage (optional)
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setSuccess("Login successful!");
      setTimeout(() => navigate("/dashboard"), 1000);

    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
<div className="login-container d-flex justify-content-center align-items-center min-vh-100 bg-gradient">
  <form onSubmit={handleSubmit} className="login-box shadow-lg p-5 rounded bg-white">
    <h2 className="text-center mb-4 text-primary fw-bold">Admin Login</h2>

    {error && <p className="error">{error}</p>}
    {success && <p className="success">{success}</p>}

    <div className="mb-3">
      <label htmlFor="email" className="form-label fw-semibold">Username</label>
      <input
        type="email"
        name="email"
        id="email"
        className="form-control"
        value={form.email}
        onChange={handleChange}
        placeholder="Enter username"
      />
    </div>

    <div className="mb-3">
      <label htmlFor="password" className="form-label fw-semibold">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        className="form-control"
        value={form.password}
        onChange={handleChange}
        placeholder="Enter password"
      />
    </div>

    <div className="text-end mb-3">
      <a href="#" className="text-decoration-none text-primary small">Forgot password?</a>
    </div>

    <button type="submit" className="btn btn-primary w-100 fw-bold">Login</button>
  </form>
</div>


    
  );
}

export default AdminLogin