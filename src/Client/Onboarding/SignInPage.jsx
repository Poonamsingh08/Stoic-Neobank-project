import React, { useState } from 'react';
import { useOnboarding } from '../context/OnboardingContext';
import './SignInPage.css';

export default function SignInPage() {
  const { setCurrentStep, updateUserData, userData } = useOnboarding();
  const [accountNumber, setAccountNumber] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = (e) => {
    e.preventDefault();

    if (!accountNumber || !customerId || !password) {
      setError('Please fill all fields.');
      return;
    }

    // ✅ Simulate validation: accountNumber and customerId must match userData
    if (
      accountNumber === userData?.accountNumber &&
      customerId === userData?.customerId &&
      password === userData?.password
    ) {
      updateUserData({ loggedIn: true });
      setCurrentStep('dashboard'); // Direct to Dashboard
    } else {
      setError('Invalid credentials. Check your Account Number, Customer ID or Password.');
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
            placeholder="Account Number"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            className="signin-input"
          />
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
        <p className="signin-footer">
          Don't have an account?{' '}
          <span onClick={() => setCurrentStep('signup')} className="signup-link">
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}
