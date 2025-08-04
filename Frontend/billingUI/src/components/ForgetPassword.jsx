import React, { useState } from "react";
import axios from "axios";


const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:8000/account/forget-password/", { email });
      setMessage(res.data.message);
    } catch (error) {
      setMessage(error.response?.data?.error || "Something went wrong.");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "450px" }}>
      <h3>Forgot Password</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group mt-3">
          <label>Enter your email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-primary mt-3">Send Reset Link</button>
      </form>
      {message && <div className="alert alert-info mt-3">{message}</div>}
    </div>
  );
};

export default ForgetPassword;
