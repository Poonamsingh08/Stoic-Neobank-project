import React, { useState } from 'react';
import { useOnboarding } from '../context/OnboardingContext';
import './PANScreen.css';

export default function PANScreen() {
  const { setCurrentStep, updateUserData } = useOnboarding();
  const [panNumber, setPanNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserData({ panNumber: panNumber.toUpperCase() });
    setCurrentStep('account-type'); // next step
  };

  return (
    <div className="panscreen-container">

      {/* Back Button */}
      <button
        onClick={() => setCurrentStep('aadhar')}
        className="panscreen-back-btn"
      >
        <div className="panscreen-back-arrow">←</div>
        <span>Back</span>
      </button>

      {/* Card */}
      <div className="panscreen-card">

        {/* Icon */}
        <div className="panscreen-icon-container">
          <div className="panscreen-icon">📄</div>
        </div>

        {/* Header */}
        <div className="panscreen-header">
          <h2 className="panscreen-title">Verify PAN</h2>
          <p className="panscreen-subtitle">Enter your PAN card number</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="panscreen-form">
          <div className="panscreen-form-group">
            <label className="panscreen-label">PAN Number</label>
            <input
              type="text"
              required
              value={panNumber}
              onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
              placeholder="ABCDE1234F"
              maxLength={10}
              pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
              className="panscreen-input"
            />
            <p className="panscreen-format-note">
              Format: 5 letters, 4 numbers, 1 letter
            </p>
          </div>

          {/* Info Box */}
          <div className="panscreen-info-box">
            <p className="panscreen-info-text">
              We'll verify your PAN details with Income Tax Department records
            </p>
          </div>

          {/* Verify Button */}
          <button type="submit" className="panscreen-verify-btn">
            <span>Verify PAN</span>
            <div className="panscreen-arrow-icon">→</div>
          </button>
        </form>
      </div>
    </div>
  );
}
