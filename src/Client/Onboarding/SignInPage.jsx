import React, { useState } from 'react';
import { useOnboarding } from '../context/OnboardingContext';
import './SignInPage.css';

export default function SignInPage({ onComplete }) {
  const { setCurrentStep, updateUserData } = useOnboarding();
  const [customerId, setCustomerId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // ✅ Static demo credentials
  const demoCustomerId = "custm123456";
  const demoPassword = "User123";

  const handleSignIn = (e) => {
    e.preventDefault();

    // ✅ Validation
    if (!customerId.trim() || !password.trim()) {
      setError('Please fill in both Customer ID and Password.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    // ✅ Static credential check
    if (customerId === demoCustomerId && password === demoPassword) {
      // Store login state
      updateUserData({ loggedIn: true, customerId });

      setError('');

      // ✅ Trigger main flow completion (Dashboard)
      if (onComplete) {
        onComplete();
      } else {
        setCurrentStep('dashboard');
      }
    } else {
      setError('Invalid Customer ID or Password. Please try again.');
    }
  };

  const handleBack = () => {
    setCurrentStep('welcome');
  };

  return (
    <div className="signin-container">
      <div className="signin-card">
        <div className="logo-icon-signin">N</div>

        <button className="back-btn" onClick={handleBack}>
          ← Back
        </button>

        <h2>Sign In</h2>

        <form onSubmit={handleSignIn}>
          <input
            type="text"
            placeholder="Customer ID"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            className="signin-input"
          />

          <input 
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="signin-input"
          />

          {error && <div className="signin-error">{error}</div>}

          <button type="submit" className="signin-btn">
            Sign In
          </button>
        </form>

        <div className="extra-links">
          <p className="signin-footer">
            Don’t have an account?{' '}
            <span
              onClick={() => setCurrentStep('signup')}
              className="signup-link"
            >
              Sign Up
            </span>
          </p>

          {/* ✅ Forgot Password link */}
          <button
            className="forgot-btn"
            onClick={() => alert('Password reset link sent to your registered email!')}
          >
            Forgot Password?
          </button>
        </div>

        {/* ✅ Demo info text */}
        <p className="signin-info">
          Use <strong>custm123456</strong> / <strong>User123</strong> for demo login
        </p>
      </div>
    </div>
  );
}
