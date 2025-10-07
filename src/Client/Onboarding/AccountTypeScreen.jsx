import React from 'react';
import { useOnboarding } from '../context/OnboardingContext';
import './AccountTypeScreen.css';

function AccountTypeScreen() {
  const { setCurrentStep, updateUserData } = useOnboarding();

  const accountTypes = [
    {
      type: 'savings',
      icon: '💰',
      title: 'Savings Account',
      description: 'For personal banking and daily transactions',
      features: ['4% interest p.a.', 'Free debit card', 'No minimum balance'],
    },
    {
      type: 'current',
      icon: '💼',
      title: 'Current Account',
      description: 'For business and professional needs',
      features: ['Unlimited transactions', 'Overdraft facility', 'Business tools'],
    },
    {
      type: 'business',
      icon: '🏢',
      title: 'Business Account',
      description: 'For enterprises and large businesses',
      features: ['Multi-user access', 'API integration', 'Priority support'],
    },
  ];

  const handleSelect = (type) => {
    updateUserData({ accountType: type });
    setCurrentStep('kyc');
  };

  return (
    <div className="account-type-container">
      <button
        onClick={() => setCurrentStep('pan')}
        className="back-btn"
      >
        <div className="back-arrow">←</div>
        <span>Back</span>
      </button>

      <div className="account-type-card">
        <div className="account-type-header">
          <h2 className="account-type-title">Choose Account Type</h2>
          <p className="account-type-subtitle">Select the account that best fits your needs</p>
        </div>

        <div className="progress-bar">
          <div className="progress-step active"></div>
          <div className="progress-step active"></div>
          <div className="progress-step active"></div>
          <div className="progress-step active"></div>
        </div>

        <div className="account-types-grid">
          {accountTypes.map((account) => (
            <button
              key={account.type}
              onClick={() => handleSelect(account.type)}
              className="account-type-option"
            >
              <div className="account-icon">{account.icon}</div>
              <h3 className="account-type-name">{account.title}</h3>
              <p className="account-description">{account.description}</p>
              <ul className="account-features">
                {account.features.map((feature, index) => (
                  <li key={index} className="feature-item">
                    <div className="feature-dot"></div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="select-indicator">
                <span>Select</span>
                <div className="arrow-icon">→</div>
              </div>
            </button>
          ))}
        </div>

        <p className="footer-note">
          You can upgrade or change your account type anytime from settings
        </p>
      </div>
    </div>
  );
}

export default AccountTypeScreen;