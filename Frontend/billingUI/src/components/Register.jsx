import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  Form,
  Button,
  Row,
  Col,
  Alert
} from "react-bootstrap";
import rolesData from "../../data/roles.json";
import mockData from "../../data/db.json";

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
    // Load roles from local JSON (could be replaced with API)
    setRoles(rolesData);

    // Preload dummy data from register_mock.json
    setForm({
      firstName: mockData.firstName,
      lastName: mockData.lastName,
      password: mockData.password,
      confirmPassword: mockData.confirmPassword,
      role: mockData.role,
      profilePic: null // file input can't be auto-filled
    });

    setPreview(mockData.profilePic.url); // preview from mock image URL
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

    // Simulate form submission
    const submittedData = {
      ...form,
      profilePic: form.profilePic ? form.profilePic.name : null
    };

    console.log("Submitted Data:", submittedData);
    setSuccess("Registration successful (simulated)!");

    // Reset form
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
    <div 
  style={{ 
    minHeight: "100vh", 
    display: "flex", 
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor: "#f8f9fa",
    padding: "20px"
  }}
>
  <Container 
    className="shadow-lg rounded" 
    style={{ maxWidth: "600px", backgroundColor: "#fff", overflow: "hidden" }}
  >
    <Row noGutters style={{ minHeight: "450px" }}>
      {/* Colored Side */}
      <Col 
        md={5} 
        style={{ 
          backgroundColor: "#0d6efd", 
          color: "white", 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center",
          padding: "20px",
          height: "100%"  // full height of the row
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h3>Welcome Back!</h3>
          <p>Join our community and start your journey.</p>
        </div>
      </Col>

      {/* Form Side */}
      <Col 
        md={7} 
        style={{ 
          padding: "30px", 
          display: "flex", 
          flexDirection: "column", 
          justifyContent: "center" 
        }}
      >
        <Card 
          style={{ borderRadius: "20px", border: "none" }} 
          className="shadow"
        >
          <Card.Body>
            <h2 
              className="text-center mb-4" 
              style={{ color: "#0d6efd", fontWeight: "600", fontSize: "1.8rem" }}
            >
              Create Account
            </h2>

            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

            <Form onSubmit={handleSubmit} encType="multipart/form-data">
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="firstName">
                    <Form.Label style={{ color: "#0d6efd" }}>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter first name"
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      className="rounded-pill border-primary"
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3" controlId="lastName">
                    <Form.Label style={{ color: "#0d6efd" }}>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter last name"
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      className="rounded-pill border-primary"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3" controlId="profilePic">
                <Form.Label style={{ color: "#0d6efd" }}>Profile Picture</Form.Label>
                <Form.Control
                  type="file"
                  name="profilePic"
                  accept="image/*"
                  onChange={handleChange}
                  className="rounded-pill"
                />
                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="mt-3"
                    style={{ height: "80px", borderRadius: "10px", display: "block", margin: "0 auto" }}
                  />
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Label style={{ color: "#0d6efd" }}>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="rounded-pill border-primary"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="confirmPassword">
                <Form.Label style={{ color: "#0d6efd" }}>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="rounded-pill border-primary"
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="role">
                <Form.Label style={{ color: "#0d6efd" }}>User Role</Form.Label>
                <Form.Select 
                  name="role" 
                  value={form.role} 
                  onChange={handleChange} 
                  className="rounded-pill border-primary"
                >
                  <option value="">-- Select Role --</option>
                  {roles.map((r) => (
                    <option key={r.value} value={r.value}>
                      {r.label}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Button 
                variant="primary" 
                type="submit" 
                className="w-100 rounded-pill"
                style={{ fontWeight: "500" }}
              >
                Register
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
</div>

  );
};

export default Register;
