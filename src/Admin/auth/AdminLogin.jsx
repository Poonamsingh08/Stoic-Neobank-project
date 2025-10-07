// src/Admin/auth/AdminLogin.jsx
import React, { useState } from "react";

export default function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Simple demo auth (replace with real API later)
    if (email === "admin@neobank.com" && password === "admin123") {
      onLogin(); // triggers AdminApp to show dashboard
    } else {
      alert("Invalid credentials!");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #900603 0%, #0f172a 50%, #900603 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(20px)",
          borderRadius: "24px",
          padding: "50px 40px",
          maxWidth: "400px",
          width: "100%",
          textAlign: "center",
          color: "white",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
        }}
      >
        <h2 style={{ color: "#900603", marginBottom: "30px", fontWeight: "700" }}>
          Admin Login
        </h2>
        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              padding: "12px 15px",
              borderRadius: "12px",
              border: "none",
              outline: "none",
              fontSize: "16px",
              background: "rgba(255,255,255,0.1)",
              color: "white",
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              padding: "12px 15px",
              borderRadius: "12px",
              border: "none",
              outline: "none",
              fontSize: "16px",
              background: "rgba(255,255,255,0.1)",
              color: "white",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "12px 0",
              borderRadius: "12px",
              border: "none",
              backgroundColor: "#900603",
              color: "white",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#b70a0a")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#900603")}
          >
            Login
          </button>
        </form>
        <p style={{ marginTop: "20px", fontSize: "14px", color: "#cbd5e1" }}>
          Use <strong>admin@neobank.com</strong> / <strong>admin123</strong> for demo
        </p>
      </div>
    </div>
  );
}
