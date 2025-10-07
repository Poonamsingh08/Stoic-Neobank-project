import React, { useState } from 'react';
import { useOnboarding } from '../context/OnboardingContext';
import './PANScreen.css';

function PANScreen() {
  const { setCurrentStep, updateUserData } = useOnboarding();
  const [panNumber, setPanNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserData({ panNumber: panNumber.toUpperCase() });
    setCurrentStep('account-type');
  };

  return (
    <div className="pan-container">
      <button
        onClick={() => setCurrentStep('aadhar')}
        className="back-btn"
      >
        <div className="back-arrow">←</div>
        <span>Back</span>
      </button>

      <div className="pan-card">
        <div className="pan-icon-container">
          <div className="pan-icon">📄</div>
        </div>

        <div className="pan-header">
          <h2 className="pan-title">Verify PAN</h2>
          <p className="pan-subtitle">Enter your PAN card number</p>
        </div>

      

        <form onSubmit={handleSubmit} className="pan-form">
          <div className="form-group">
            <label className="form-label">PAN Number</label>
            <input
              type="text"
              required
              value={panNumber}
              onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
              placeholder="ABCDE1234F"
              maxLength={10}
              pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
              className="pan-input"
            />
            <p className="format-note">Format: 5 letters, 4 numbers, 1 letter</p>
          </div>

          <div className="info-box">
            <p className="info-text">
              We'll verify your PAN details with Income Tax Department records
            </p>
          </div>

          <button type="submit" className="verify-pan-btn">
            <span>Verify PAN</span>
            <div className="arrow-icon">→</div>
          </button>
        </form>
      </div>
    </div>
  );
}

export default PANScreen;