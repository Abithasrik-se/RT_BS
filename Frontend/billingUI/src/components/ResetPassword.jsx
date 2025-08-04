import React, { useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import axios from "axios";


const ResetPassword = () => {
  const { uid, token } = useParams();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate()

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://127.0.0.1:8000/account/reset-password/${uid}/${token}/`,
        { password }
      );
      setMessage(res.data.message);
      setError("");
      navigate('/login')
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong.");
      setMessage("");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "450px" }}>
      <h3>Reset Password</h3>
      <form onSubmit={handleReset}>
        <div className="form-group mt-3">
          <label>Enter New Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-success mt-3">Reset Password</button>
      </form>

      {message && <div className="alert alert-success mt-3">{message}</div>}
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
};

export default ResetPassword;
