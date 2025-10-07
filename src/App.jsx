// Core imports
import React, { Suspense, lazy } from "react";
import { Routes, Route, Link } from "react-router-dom";

// Lazy-loaded apps
const ClientApp = lazy(() => import("./Client/ClientApp")); // User side App
const AdminApp = lazy(() => import("./Admin/AdminApp"));   // Admin side App

// ------------------- Home Page -------------------
function Home() {
  return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      {/* Hero Section */}
      <header
        className="text-white text-center py-5"
        style={{ backgroundColor: "#900603" }}
      >
        <h1 className="display-4 fw-bold">Welcome to NeoBank</h1>
        <p className="lead">
          Secure, Fast, and Trusted Banking at Your Fingertips
        </p>
        <div className="mt-4">
          <Link to="/client" className="btn btn-light btn-lg me-3">
            Open User App
          </Link>
          <Link to="/admin" className="btn btn-outline-light btn-lg">
            Open Admin App
          </Link>
        </div>
      </header>

      {/* Features Section */}
      <section className="container py-5">
        <h2 className="text-center mb-5" style={{ color: "#900603" }}>
          Why Choose NeoBank?
        </h2>
        <div className="row text-center g-4">
          <div className="col-md-4">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title text-primary">Secure Banking</h5>
                <p className="card-text">
                  Your money is protected with state-of-the-art security
                  protocols.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title text-primary">Fast Transactions</h5>
                <p className="card-text">
                  Transfer funds instantly with minimal charges and maximum
                  convenience.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title text-primary">24/7 Support</h5>
                <p className="card-text">
                  Our dedicated team is always here to help you with any banking
                  needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section
        className="text-center py-5 text-white"
        style={{ backgroundColor: "#900603" }}
      >
        <h3 className="mb-3">Ready to Get Started?</h3>
        <p className="mb-4">
          Join thousands of happy customers using NeoBank every day.
        </p>
        <Link to="/client" className="btn btn-light btn-lg me-3">
          Open User App
        </Link>
        <Link to="/admin/login" className="btn btn-outline-light btn-lg">
          Open Admin App
        </Link>
      </section>
    </div>
  );
}

// ------------------- Onboarding Redirect -------------------
function OnboardingFlow() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #1e293b 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(20px)",
          borderRadius: "24px",
          padding: "40px",
          maxWidth: "500px",
          width: "100%",
          textAlign: "center",
          color: "white",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <h2 style={{ color: "#900603", marginBottom: "20px" }}>
          Account Setup Required
        </h2>
        <p style={{ marginBottom: "30px", color: "#cbd5e1" }}>
          Please complete your account setup to access the banking features.
        </p>
        <Link
          to="/client"
          style={{
            background: "#900603",
            color: "white",
            padding: "12px 30px",
            borderRadius: "8px",
            textDecoration: "none",
            display: "inline-block",
            fontWeight: "600",
          }}
        >
          Continue Setup
        </Link>
      </div>
    </div>
  );
}

// ------------------- App Root -------------------
export default function App() {
  return (
    <Suspense fallback={<div className="text-center py-5">Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/client/*" element={<ClientApp />} />
        <Route path="/admin/*" element={<AdminApp />} />
        <Route path="/onboarding" element={<OnboardingFlow />} />
      </Routes>
    </Suspense>
  );
}
