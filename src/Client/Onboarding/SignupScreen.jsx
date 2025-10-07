import React, { useState } from 'react';
import { useOnboarding } from '../context/OnboardingContext';
import './SignupScreen.css';

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
    setCurrentStep('aadhar');
  };

  return (
    <div className="signup-container">
      <button onClick={() => setCurrentStep('welcome')} className="back-btn">
        ← Back
      </button>

      <div className="signup-card">
        <div className="signup-header">
          <h2 className="signup-title">Create Account</h2>
          <p className="signup-subtitle">Enter your details to get started</p>
        </div>

        
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              required
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="Enter your full name"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="your.email@example.com"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Mobile Number</label>
            <input
              type="tel"
              required
              value={formData.mobileNumber}
              onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
              placeholder="+91 XXXXXXXXXX"
              pattern="[+]?[0-9]{10,13}"
              className="form-input"
            />
          </div>

          <button type="submit" className="continue-btn">
            Continue → 
          </button>
        </form>

        <p className="terms-text">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
