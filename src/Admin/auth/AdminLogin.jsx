import React, { useState } from "react";
import "./AdminLogin.css";

export default function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "admin@neobank.com" && password === "admin123") {
      onLogin();
    } else {
      alert("Invalid credentials!");
    }
  };

  const handleForgotPassword = () => {
    const inputEmail = prompt("Enter your admin email to reset password:");
    if (inputEmail === "admin@neobank.com") {
      alert("Password reset link sent to your email!");
    } else {
      alert("Email not recognized.");
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-card">
        <div className="admin-logo-container">
          <div className="admin-logo-icon">A</div>
        </div>

        <h2 className="admin-title">Admin Login</h2>

        <form className="admin-form" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="admin-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="admin-input"
          />
          <button type="submit" className="admin-btn">
            Login
          </button>
        </form>

        <p className="forgot-password" onClick={handleForgotPassword}>
          Forgot Password?
        </p>

        <p className="admin-info">
          Use <strong>admin@neobank.com</strong> / <strong>admin123</strong> for demo
        </p>
      </div>
    </div>
  );
}
