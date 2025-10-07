import React, { useState } from 'react';
import { useOnboarding } from '../context/OnboardingContext';
import './AadharScreen.css';

export default function AadharScreen() {
  const { setCurrentStep, updateUserData } = useOnboarding();
  const [aadharNumber, setAadharNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpSent, setOtpSent] = useState(false);

  const handleAadharSubmit = (e) => {
    e.preventDefault();
    setOtpSent(true);
  };

  const handleOtpChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleVerify = () => {
    updateUserData({ aadharNumber });
    setCurrentStep('pan');
  };

  return (
    <div className="aadhar-container">
      <button
        onClick={() => setCurrentStep('signup')}
        className="back-btn"
      >
        <div className="back-arrow">←</div>
        <span>Back</span>
      </button>

      <div className="aadhar-card">
        <div className="aadhar-icon-container">
          <div className="aadhar-icon">🆔</div>
        </div>

        <div className="aadhar-header">
          <h2 className="aadhar-title">Verify Aadhar</h2>
          <p className="aadhar-subtitle">Enter your 12-digit Aadhar number</p>
        </div>

       

        {!otpSent ? (
          <form onSubmit={handleAadharSubmit} className="aadhar-form">
            <div className="form-group">
              <label className="form-label">Aadhar Number</label>
              <input
                type="text"
                required
                value={aadharNumber}
                onChange={(e) => setAadharNumber(e.target.value)}
                placeholder="XXXX XXXX XXXX"
                maxLength={12}
                pattern="[0-9]{12}"
                className="aadhar-input"
              />
            </div>

            <div className="info-box">
              <div className="info-icon">🔒</div>
              <p className="info-text">
                Your Aadhar details are encrypted and securely stored. We comply with all UIDAI regulations.
              </p>
            </div>

            <button type="submit" className="send-otp-btn">
              <span>Send OTP</span>
              <div className="arrow-icon">→</div>
            </button>
          </form>
        ) : (
          <div className="otp-container">
            <div className="form-group">
              <label className="form-label">Enter 6-digit OTP sent to your registered mobile</label>
              <div className="otp-inputs">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    maxLength={1}
                    className="otp-input"
                  />
                ))}
              </div>
            </div>

            <button
              onClick={handleVerify}
              disabled={otp.some(digit => !digit)}
              className="verify-btn"
            >
              <span>Verify & Continue</span>
              <div className="arrow-icon">→</div>
            </button>

            <button
              onClick={() => setOtpSent(false)}
              className="resend-btn"
            >
              Resend OTP
            </button>
          </div>
        )}
      </div>
    </div>
  );
}