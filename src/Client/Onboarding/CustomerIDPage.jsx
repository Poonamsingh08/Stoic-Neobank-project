import React, { useEffect, useState } from "react";
import { useOnboarding } from "../context/OnboardingContext";
import "./CustomerIDPage.css";

export default function CustomerIDPage() {
  const { setCurrentStep, updateUserData } = useOnboarding();
  const [customerId, setCustomerId] = useState("");

  useEffect(() => {
    // ✅ Always generate a new unique ID
    const uniqueId = "CUST" + Math.floor(10000000 + Math.random() * 90000000);
    setCustomerId(uniqueId);
    updateUserData({ customerId: uniqueId });
  }, []); // empty dependency → run on every mount

  // ✅ Proceed to KYC
  const handleProceed = () => {
    setCurrentStep("updateKYC33");
  };

  // ✅ Back to Account Type
  const handleBack = () => {
    setCurrentStep("account-type");
  };

  return (
    <div className="welcome-container">
      <div className="welcome-card">
        {/* Back Button */}
        <button className="back-btn" onClick={handleBack}>
          ← Back
        </button>

        <div className="logo-container">
          <div className="logo-icon">💳</div>
        </div>

        <h1 className="welcome-title">Your Customer ID is Ready!</h1>
        <p className="welcome-subtitle">
          Use this unique ID for your KYC and account login.
        </p>

        <div className="customer-id-box">
          <span className="label">Customer ID</span>
          <h2 className="generated-id">{customerId}</h2>
        </div>

        <div className="id-info">
          Please save this ID safely. You’ll need it to complete your KYC.
        </div>

        <button className="get-started-btn" onClick={handleProceed}>
          Proceed to KYC <span className="arrow-icon">→</span>
        </button>

        <p className="footer-text">
          Powered by <span className="login-text">Stoic Neobank</span> • Secure Digital Banking
        </p>
      </div>
    </div>
  );
}
