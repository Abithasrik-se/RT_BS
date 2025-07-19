import React, { useState, useEffect } from "react";
import rolesData from "../../data/roles.json";
import mockData from "../../data/db.json";
import '../css/Register.css'

const Register = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    role: "",
    profilePic: null
  });

  const [roles, setRoles] = useState([]);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    setRoles(rolesData);

    setForm({
      firstName: mockData.firstName,
      lastName: mockData.lastName,
      password: mockData.password,
      confirmPassword: mockData.confirmPassword,
      role: mockData.role,
      profilePic: null
    });

    setPreview(mockData.profilePic.url);
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "profilePic") {
      const file = files[0];
      setForm((prev) => ({ ...prev, profilePic: file }));
      if (file) setPreview(URL.createObjectURL(file));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    const { firstName, lastName, password, confirmPassword, role } = form;

    if (!firstName || !lastName || !password || !confirmPassword || !role) {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const validationMessage = validateForm();
    if (validationMessage) {
      setError(validationMessage);
      return;
    }

    const submittedData = {
      ...form,
      profilePic: form.profilePic ? form.profilePic.name : null
    };

    console.log("Submitted Data:", submittedData);
    setSuccess("Registration successful (simulated)!");

    setForm({
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
      role: "",
      profilePic: null
    });
    setPreview(null);
  };

  return (
  <div className="register-page d-flex justify-content-center align-items-center vh-100">
    <div className="card p-4 shadow-lg" style={{ width: "100%", maxWidth: "600px" }}>
      <h3 className="text-center mb-4 text-primary">Create Your Account</h3>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label className="form-label">First Name</label>
          <input
            type="text"
            className="form-control"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Last Name</label>
          <input
            type="text"
            className="form-control"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Profile Picture</label>
          <input
            type="file"
            className="form-control"
            name="profilePic"
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
          Register
        </button>
      </form>
    </div>
  </div>
);
};

export default Register;
