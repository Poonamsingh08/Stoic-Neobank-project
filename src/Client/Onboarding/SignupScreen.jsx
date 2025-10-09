import React, { useState } from 'react';
import { useOnboarding } from '../context/OnboardingContext';
import './SignupScreen.css'; // Make sure to use the updated CSS

export default function SignupScreen() {
  const { setCurrentStep, updateUserData } = useOnboarding();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobileNumber: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserData(formData);
    setCurrentStep('aadhar'); // or the next step in your flow
  };

  return (
    <div className="signupscreen-container">

      {/* Back and Next Buttons */}
      <button
        onClick={() => setCurrentStep('welcome')}
        className="signupscreen-back-btn"
      >
        ← Back
      </button>
      <button
        onClick={() => setCurrentStep('updateKYC33')}
        className="signupscreen-next-btn"
      >
        Next →
      </button>

      {/* Card */}
      <div className="signupscreen-card">
        <div className="signupscreen-header">
          <h2 className="signupscreen-title">Create Account</h2>
          <p className="signupscreen-subtitle">Enter your details to get started</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="signupscreen-form">
          <div className="signupscreen-form-group">
            <label className="signupscreen-label">Full Name</label>
            <input
              type="text"
              required
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              placeholder="Enter your full name"
              className="signupscreen-input"
            />
          </div>

          <div className="signupscreen-form-group">
            <label className="signupscreen-label">Email Address</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="your.email@example.com"
              className="signupscreen-input"
            />
          </div>

          <div className="signupscreen-form-group">
            <label className="signupscreen-label">Mobile Number</label>
            <input
              type="tel"
              required
              value={formData.mobileNumber}
              onChange={(e) =>
                setFormData({ ...formData, mobileNumber: e.target.value })
              }
              placeholder="+91 XXXXXXXXXX"
              pattern="[+]?[0-9]{10,13}"
              className="signupscreen-input"
            />
          </div>

          <button type="submit" className="signupscreen-continue-btn">
            Continue →
          </button>
        </form>

        <p className="signupscreen-terms-text">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
