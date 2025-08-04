import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/Register.css";
import { useNavigate, useParams } from "react-router-dom";

const UpdateUser = () => {
  const [tenants, setTenants] = useState([]);
  const [form, setForm] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    image: null,
    role: "",
    tenant_id: ""
  });
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const { userId } = useParams(); // If using router path like /update/:userId

  const roles = [
    "super_admin",
    "tenant_admin",
    "billing_manager",
    "accountant",
    "sales_user",
    "customer_support",
    "read_only"
  ];

  useEffect(() => {
    const fetchUserAndTenants = async () => {
      try {
        const [tenantRes, userRes] = await Promise.all([
          axios.get("http://127.0.0.1:8000/account/tenant/"),
          axios.get(`http://127.0.0.1:8000/account/user/${userId}/`) // Assuming this exists
        ]);

        setTenants(tenantRes.data);
        const userData = userRes.data;
        setForm({
          username: userData.username,
          email: userData.email,
          first_name: userData.first_name,
          last_name: userData.last_name,
          image: null,
          role: userData.role,
          tenant_id: userData.tenant_id.toString()
        });

        if (userData.image) {
          setPreview(`http://127.0.0.1:8000${userData.image}`); // assuming image URL
        }
      } catch (err) {
        console.error("Error fetching user or tenants:", err);
        setError("Failed to fetch user or tenants.");
      }
    };

    fetchUserAndTenants();
  }, [userId]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const {
      username,
      email,
      first_name,
      last_name,
      role,
      tenant_id
    } = form;

    if (!username || !email || !first_name || !last_name || !role || !tenant_id) {
      setError("Please fill all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("user_id", userId); // required by update API
    formData.append("username", username);
    formData.append("email", email);
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("role", role);
    formData.append("tenant_id", tenant_id);
    if (form.image) formData.append("image", form.image);

    try {
      await axios.put(
        "http://127.0.0.1:8000/account/updateuser/",
        formData
      );
      setSuccess("User updated successfully!");

      setTimeout(() => {
        navigate("/users"); // Redirect to user list page
      }, 1500);
    } catch (err) {
      const errMsg =
        err.response?.data?.detail ||
        Object.values(err.response?.data || {}).flat().join(" ") ||
        "Something went wrong.";
      setError(errMsg);
    }
  };

  return (
    <div className="register-page d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow" style={{ maxWidth: "600px", width: "100%" }}>
        <h4 className="text-center text-primary mb-4">Update User</h4>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-3">
            <label>Username</label>
            <input
              type="text"
              name="username"
              className="form-control"
              value={form.username}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label>First Name</label>
            <input
              type="text"
              name="first_name"
              className="form-control"
              value={form.first_name}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label>Last Name</label>
            <input
              type="text"
              name="last_name"
              className="form-control"
              value={form.last_name}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label>Profile Image</label>
            <input
              type="file"
              name="image"
              className="form-control"
              accept="image/*"
              onChange={handleChange}
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="img-thumbnail mt-2"
                style={{ height: "80px" }}
              />
            )}
          </div>

          <div className="mb-3">
            <label>Tenant ID</label>
            <input
              type="text"
              name="tenant_id"
              className="form-control"
              value={form.tenant_id}
              readOnly
            />
          </div>

          <div className="mb-3">
            <label>Role</label>
            <select
              name="role"
              className="form-select"
              value={form.role}
              onChange={handleChange}
            >
              <option value="">-- Select Role --</option>
              {roles.map((r) => (
                <option key={r} value={r}>
                  {r.replace("_", " ").toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Update User
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
