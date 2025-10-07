import React from 'react';
import { useOnboarding } from '../context/OnboardingContext';
import './WelcomeScreen.css';

export default function WelcomeScreen() {
  const { setCurrentStep } = useOnboarding();

  return (
    <div className="welcome-container">
      <div className="welcome-card">
        <div className="logo-container">
          <div className="logo-icon">N</div>
        </div>

        <h1 className="welcome-title">
          Welcome to <span className="bank-name">NeoBank</span>
        </h1>

        <p className="welcome-subtitle">
          Banking reimagined for the digital age
        </p>

        <div className="features-list">
          <div className="feature-item">
            <div className="feature-dot"></div>
            <span>Zero balance account</span>
          </div>
          <div className="feature-item">
            <div className="feature-dot"></div>
            <span>Instant digital onboarding</span>
          </div>
          <div className="feature-item">
            <div className="feature-dot"></div>
            <span>24/7 customer support</span>
          </div>
        </div>

        <button
          onClick={() => setCurrentStep('signup')}
          className="get-started-btn"
        >
          <span>Get Started</span>
          <div className="arrow-icon">→</div>
        </button>

        <div className="login-link">
          <button className="login-btn">
            Already have an account? <span className="login-text">Sign In</span>
          </button>
        </div>
      </div>

      <p className="footer-text">
        Regulated by RBI • Deposits insured up to ₹5,00,000
      </p>
    </div>
  );
}