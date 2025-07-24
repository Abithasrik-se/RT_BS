import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../css/Register.css'
import axios from "axios";

const Register = () => {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email :"",
    password: "",
    confirmPassword: "",
    role: "",
    image: null
  });

    


  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

const [roles, setRoles] = useState([
  { value: "super_admin", label: "Super Admin" },
  { value: "tenant_admin", label: "Tenant Admin" },
  { value: "billing_manager", label: "Billing Manager" },
  { value: "accountant", label: "Accountant" },
  { value: "sales_user", label: "Sales User" },
  { value: "customer_support", label: "Customer Support" },
  { value: "read_only", label: "Read-only User" }
]);


  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      const file = files[0];
      setForm((prev) => ({ ...prev, image: file }));
      if (file) setPreview(URL.createObjectURL(file));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    const { first_name, last_name,email,password, confirmPassword, role } = form;

    if (!first_name || !last_name || !email || !password || !confirmPassword || !role) {
      return "All fields are required.";
    }

    if (password.length < 6) {
      return "Password must be at least 6 characters.";
    }

    if (password !== confirmPassword) {
      return "Passwords do not match.";
    }

    return "";
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
  
    const validationMessage = validateForm();
    if (validationMessage) {
      setError(validationMessage);
      return;
    }

     const formData = new FormData();
  formData.append("first_name", form.first_name);
  formData.append("last_name", form.last_name);
  formData.append("email", form.email);
  formData.append("password", form.password);
  formData.append("role", form.role);
  if (form.image) {
    formData.append("profile_pic", form.image); // Django expects profile_pic or as per your model
  }

    try{
      const response = await axios.post('http://127.0.0.1:8000/account/register/',
      formData,
     
    )
      const data = response.data;

      // Save token and user details to localStorage (optional)
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setSuccess("Account Created successfully!");
      setTimeout(() => navigate("/login"), 1000);

       setForm({
      first_name: "",
      last_name: "",
      email:"",
      password: "",
      confirmPassword: "",
      role: "",
      image: null
    });
    setPreview(null);


    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
     };

  return (
  <div className="register-page d-flex justify-content-center align-items-center vh-100">
    <div className="card p-4 shadow-lg" style={{ width: "100%", maxWidth: "600px" }}>
      <h3 className="text-center mb-4 text-primary">Create New User Account</h3>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label className="form-label">First Name</label>
          <input
            type="text"
            className="form-control"
            name="first_name"
            value={form.first_name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Last Name</label>
          <input
            type="text"
            className="form-control"
            name="last_name"
            value={form.last_name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Profile Picture</label>
          <input
            type="file"
            className="form-control"
            name="image"
            accept="image/*"
            onChange={handleChange}
          />
          {preview && <img src={preview} alt="Preview" className="profile-preview img-thumbnail mt-2" />}
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="form-label">Role</label>
          <select
            className="form-select"
            name="role"
            value={form.role}
            onChange={handleChange}
          >
            <option value="">-- Select Role --</option>
            {roles.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Create User
        </button>
      </form>
    </div>
  </div>
);
};

export default Register;

