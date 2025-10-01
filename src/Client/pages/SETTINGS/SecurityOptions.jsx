import React from 'react';
import { FaExclamationTriangle, FaMobileAlt, FaKey } from 'react-icons/fa';
import './SecurityOptions.css';

const SecurityOptions = () => {
  return (
    <div className="security-options-page">
      <div className="security-options-container">
        <h5 className="security-header">Security Recommendations</h5>
        <p className="security-subtitle">
          Improve your account security with these suggestions
        </p>

        {/* Enable Two-Factor Authentication */}
        <div className="security-card warning-card">
          <div className="security-card-body">
            <div className="security-card-left">
              <FaExclamationTriangle className="security-icon warning-icon" />
              <div>
                <h6 className="security-card-title">Enable Two-Factor Authentication</h6>
                <small className="security-card-desc">
                  Add an extra layer of security to your account
                </small>
              </div>
            </div>
            <button className="security-btn warning-btn">Enable</button>
          </div>
        </div>

        {/* Update Password */}
        <div className="security-card primary-card">
          <div className="security-card-body">
            <div className="security-card-left">
              <FaKey className="security-icon primary-icon" />
              <div>
                <h6 className="security-card-title">Update Password</h6>
                <small className="security-card-desc">
                  Your password was last changed 6 months ago
                </small>
              </div>
            </div>
            <button className="security-btn primary-btn">Update</button>
          </div>
        </div>

        {/* Enable Biometric Login */}
        <div className="security-card success-card">
          <div className="security-card-body">
            <div className="security-card-left">
              <FaMobileAlt className="security-icon success-icon" />
              <div>
                <h6 className="security-card-title">Enable Biometric Login</h6>
                <small className="security-card-desc">
                  Use fingerprint or face recognition for quick access
                </small>
              </div>
            </div>
            <button className="security-btn success-btn">Setup</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityOptions;
