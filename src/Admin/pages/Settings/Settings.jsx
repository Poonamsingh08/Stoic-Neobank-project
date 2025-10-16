import React, { useEffect, useState } from 'react';
import './Settings.css';

const Settings = () => {
  // State to manage form visibility for each section
  const [showGeneralForm, setShowGeneralForm] = useState(false);
  const [showPersonalForm, setShowPersonalForm] = useState(false);
  const [showSecurityForm, setShowSecurityForm] = useState(false);
  const [activeSecurityRec, setActiveSecurityRec] = useState(null);

  // Quick settings state with localStorage persistence
  const [quickSettings, setQuickSettings] = useState({
    biometricLogin: true,
    transactionAlerts: true,
    accountVisibility: false,
    autoLock: true,
  });

  // Photo upload state
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  // Security features state
  const [securityFeatures, setSecurityFeatures] = useState({
    twoFactorAuth: false,
    biometricLogin: false,
    passwordLastUpdated: null
  });

  // Password update state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Success/error messages
  const [securityMessage, setSecurityMessage] = useState({ type: '', text: '' });

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('adminQuickSettings');
      if (saved) {
        const parsed = JSON.parse(saved);
        setQuickSettings((prev) => ({ ...prev, ...parsed }));
      }
    } catch (_) {
      // ignore corrupted storage
    }
  }, []);

  // Persist to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem('adminQuickSettings', JSON.stringify(quickSettings));
    } catch (_) {
      // ignore quota errors
    }
  }, [quickSettings]);

  const handleToggle = (key) => (e) => {
    const next = e.target.checked;
    setQuickSettings((prev) => ({ ...prev, [key]: next }));
  };

  // Photo upload handler
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Security feature handlers
  const handleEnable2FA = () => {
    setSecurityFeatures(prev => ({ ...prev, twoFactorAuth: true }));
    setSecurityMessage({ type: 'success', text: 'Two-Factor Authentication has been enabled successfully!' });
    setTimeout(() => setSecurityMessage({ type: '', text: '' }), 3000);
  };

  const handleDisable2FA = () => {
    setSecurityFeatures(prev => ({ ...prev, twoFactorAuth: false }));
    setSecurityMessage({ type: 'success', text: 'Two-Factor Authentication has been disabled.' });
    setTimeout(() => setSecurityMessage({ type: '', text: '' }), 3000);
  };

  const handleEnableBiometric = () => {
    setSecurityFeatures(prev => ({ ...prev, biometricLogin: true }));
    setSecurityMessage({ type: 'success', text: 'Biometric Login has been enabled successfully!' });
    setTimeout(() => setSecurityMessage({ type: '', text: '' }), 3000);
  };

  const handleDisableBiometric = () => {
    setSecurityFeatures(prev => ({ ...prev, biometricLogin: false }));
    setSecurityMessage({ type: 'success', text: 'Biometric Login has been disabled.' });
    setTimeout(() => setSecurityMessage({ type: '', text: '' }), 3000);
  };

  const handlePasswordChange = (e) => {
    setPasswordForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setSecurityMessage({ type: 'error', text: 'New passwords do not match!' });
      setTimeout(() => setSecurityMessage({ type: '', text: '' }), 3000);
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      setSecurityMessage({ type: 'error', text: 'Password must be at least 8 characters long!' });
      setTimeout(() => setSecurityMessage({ type: '', text: '' }), 3000);
      return;
    }

    // Simulate password update
    setSecurityFeatures(prev => ({ ...prev, passwordLastUpdated: new Date().toISOString() }));
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setSecurityMessage({ type: 'success', text: 'Password updated successfully!' });
    setTimeout(() => setSecurityMessage({ type: '', text: '' }), 3000);
  };

  // Handlers for toggling forms
  const toggleGeneralForm = () => setShowGeneralForm(!showGeneralForm);
  const togglePersonalForm = () => setShowPersonalForm(!showPersonalForm);
  const toggleSecurityForm = () => setShowSecurityForm(!showSecurityForm);

  return (
    <div className="settings-container">
      {/* Compact Admin Header */}
      <header className="admin-header">
        <div className="header-content">
          <h1 className="admin-title">Admin Settings</h1>
          <p className="admin-subtitle">Manage your preferences and security</p>
        </div>
      </header>

      {/* Settings Grid */}
      <div className="settings-grid">
        <div className="settings-card general">
          <div className="card-header">
            <div className="card-icon general-icon"></div>
            <h2>General Settings</h2>
          </div>
          <p>App preferences, language, and display settings</p>
          <button className="configure-btn" onClick={toggleGeneralForm}>
            Configure
          </button>
          {showGeneralForm && (
            <div className="settings-form">
              <h3>Edit General Settings</h3>
              <form>
                <div className="form-group">
                  <label>Username / Display Name</label>
                  <input type="text" placeholder="Enter username" />
                </div>
                <div className="form-group">
                  <label>Language Preferences</label>
                  <select>
                    <option value="en">English</option>
                    <option value="hi">Hindi</option>
                    <option value="es">Spanish</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Timezone / Region</label>
                  <select>
                    <option value="IST">India Standard Time (UTC+5:30)</option>
                    <option value="PST">Pacific Standard Time (UTC-8:00)</option>
                    <option value="GMT">Greenwich Mean Time (UTC+0:00)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Notifications Preferences</label>
                  <select>
                    <option value="all">All Notifications</option>
                    <option value="important">Important Only</option>
                    <option value="none">None</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>App/Theme Preferences</label>
                  <select>
                    <option value="light">Light Mode</option>
                    <option value="dark">Dark Mode</option>
                    <option value="system">System Default</option>
                  </select>
                </div>
                <div className="form-actions">
                  <button type="button" onClick={toggleGeneralForm}>
                    Cancel
                  </button>
                  <button type="submit">Save</button>
                </div>
              </form>
            </div>
          )}
        </div>

        <div className="settings-card personal">
          <div className="card-header">
            <div className="card-icon user-icon"></div>
            <h2>Personal Details</h2>
          </div>
          <p>Update your profile information and contact details</p>
          <button className="configure-btn" onClick={togglePersonalForm}>
            Configure
          </button>
          {showPersonalForm && (
            <div className="settings-form">
              <h3>Edit Personal Details</h3>
              <form>
                <div className="form-group photo-group">
                  <label>Profile Photo</label>
                  <div className="photo-upload">
                    <input 
                      type="file" 
                      id="photo-upload" 
                      accept="image/*" 
                      onChange={handlePhotoUpload}
                      style={{display: 'none'}} 
                    />
                    <label htmlFor="photo-upload" className="photo-upload-btn">
                      <div className="upload-icon">📷</div>
                      <span>Upload Photo</span>
                    </label>
                    {photoPreview && (
                      <div className="photo-preview">
                        <img src={photoPreview} alt="Profile preview" />
                        <button 
                          type="button" 
                          className="remove-photo-btn"
                          onClick={() => {
                            setPhotoPreview(null);
                            setProfilePhoto(null);
                          }}
                        >
                          ✕
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" placeholder="Enter full name" />
                </div>
                <div className="form-group">
                  <label>Email ID</label>
                  <input type="email" placeholder="Enter email" />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="tel" placeholder="Enter phone number" />
                </div>
                <div className="form-group">
                  <label>Date of Birth</label>
                  <input type="date" />
                </div>
                <div className="form-group">
                  <label>Address (Optional)</label>
                  <textarea placeholder="Enter address"></textarea>
                </div>
                <div className="form-actions">
                  <button type="button" onClick={togglePersonalForm}>
                    Cancel
                  </button>
                  <button type="submit">Save</button>
                </div>
              </form>
            </div>
          )}
        </div>

        <div className="settings-card security">
          <div className="card-header">
            <div className="card-icon shield-icon"></div>
            <h2>Security</h2>
          </div>
          <p>Password, 2FA, and security preferences</p>
          <button className="configure-btn" onClick={toggleSecurityForm}>
            Configure
          </button>
          {showSecurityForm && (
            <div className="settings-form">
              <h3>Edit Security Settings</h3>
              <form>
                <div className="form-group">
                  <label>Password Reset / Change Password</label>
                  <input type="password" placeholder="Enter new password" />
                </div>
                <div className="form-group">
                  <label>Confirm New Password</label>
                  <input type="password" placeholder="Confirm new password" />
                </div>
                <div className="form-group">
                  <label>Two-Factor Authentication (2FA)</label>
                  <select>
                    <option value="enabled">Enabled</option>
                    <option value="disabled">Disabled</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Security Questions</label>
                  <select>
                    <option value="q1">What is your pet's name?</option>
                    <option value="q2">What is your favorite book?</option>
                    <option value="q3">What is your mother's maiden name?</option>
                  </select>
                  <input type="text" placeholder="Enter answer" />
                </div>
                <div className="form-group">
                  <label>Login Activity / Sessions</label>
                  <p>View and manage active sessions</p>
                  <button type="button">View Sessions</button>
                </div>
                <div className="form-group">
                  <label>Account Recovery Options</label>
                  <input type="email" placeholder="Recovery email" />
                  <input type="tel" placeholder="Recovery phone number" />
                </div>
                <div className="form-actions">
                  <button type="button" onClick={toggleSecurityForm}>
                    Cancel
                  </button>
                  <button type="submit">Save</button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>


      {/* Quick Settings Section */}
      <section className="quick-settings">
        <h2>Quick Settings</h2>
        <p>Frequently used settings for quick access</p>

        <div className="quick-toggles">
          <div className="toggle-item">
            <div className="toggle-icon fingerprint-icon">👆</div>
            <label className="toggle-label">Biometric Login</label>
            <label className="switch">
              <input type="checkbox" checked={quickSettings.biometricLogin} onChange={handleToggle('biometricLogin')} />
              <span className="slider"></span>
            </label>
          </div>

          <div className="toggle-item">
            <div className="toggle-icon bell-icon-small">🔔</div>
            <label className="toggle-label">Transaction Alerts</label>
            <label className="switch">
              <input type="checkbox" checked={quickSettings.transactionAlerts} onChange={handleToggle('transactionAlerts')} />
              <span className="slider"></span>
            </label>
          </div>

          <div className="toggle-item">
            <div className="toggle-icon eye-icon">👁️</div>
            <label className="toggle-label">Account Visibility</label>
            <label className="switch">
              <input type="checkbox" checked={quickSettings.accountVisibility} onChange={handleToggle('accountVisibility')} />
              <span className="slider"></span>
            </label>
          </div>

          <div className="toggle-item">
            <div className="toggle-icon lock-icon">🔒</div>
            <label className="toggle-label">Auto Lock</label>
            <label className="switch">
              <input type="checkbox" checked={quickSettings.autoLock} onChange={handleToggle('autoLock')} />
              <span className="slider"></span>
            </label>
          </div>
        </div>

        {/* Account Information */}
        <div className="account-info">
          <h3>Account Information and Status</h3>
          <p>Overview of your account settings and status</p>

          <div className="status-table">
            <div className="status-row">
              <span className="status-label">Account Status</span>
              <span className="status-value active">Active</span>
            </div>
            <div className="status-row">
              <span className="status-label">Last Login</span>
              <span className="status-value">Today 10:30 AM</span>
            </div>
            <div className="status-row">
              <span className="status-label">KYC Status</span>
              <span className="status-value verified">Verified</span>
            </div>
            <div className="status-row">
              <span className="status-label">Mobile Verified</span>
              <span className="status-value yes">Yes</span>
            </div>
            <div className="status-row">
              <span className="status-label">Two-Factor Auth</span>
              <span className="status-value enabled">Enabled</span>
            </div>
            <div className="status-row">
              <span className="status-label">Email Verified</span>
              <span className="status-value yes">Yes</span>
            </div>
          </div>
        </div>

        {/* Security Recommendations */}
        <div className="security-recs">
          <h3>Security Recommendations</h3>
          <p>Improve your account security with these suggestions</p>
          <div className="recs-list">
            <div className="rec-item-container">
              <button
                type="button"
                className={`rec-item rec-button ${activeSecurityRec === '2fa' ? 'active' : ''}`}
                onClick={() => setActiveSecurityRec('2fa')}
                aria-pressed={activeSecurityRec === '2fa'}
              >
                <div className="rec-icon">🔐</div>
                <div className="rec-content">
                  <span className="rec-title">Enable Two-Factor Authentication</span>
                  <span className="rec-description">Add an extra layer of security to your account</span>
                </div>
              </button>
              {activeSecurityRec === '2fa' && (
                <div className="rec-panel">
                  <h4>Two-Factor Authentication</h4>
                  <p>
                    Add an extra layer of security to your account by enabling 2FA. 
                    You'll receive a verification code via SMS or authenticator app when signing in.
                  </p>
                  <div className="security-status">
                    Status: <span className={`status-badge ${securityFeatures.twoFactorAuth ? 'enabled' : 'disabled'}`}>
                      {securityFeatures.twoFactorAuth ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                  <div className="security-actions">
                    {securityFeatures.twoFactorAuth ? (
                      <button className="disable-2fa-btn" onClick={handleDisable2FA}>
                        Disable 2FA
                      </button>
                    ) : (
                      <button className="enable-2fa-btn" onClick={handleEnable2FA}>
                        Enable 2FA
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            <div className="rec-item-container">
              <button
                type="button"
                className={`rec-item rec-button ${activeSecurityRec === 'password' ? 'active' : ''}`}
                onClick={() => setActiveSecurityRec('password')}
                aria-pressed={activeSecurityRec === 'password'}
              >
                <div className="rec-icon">🔑</div>
                <div className="rec-content">
                  <span className="rec-title">Update Password</span>
                  <span className="rec-description">Use a strong, unique password and change it regularly</span>
                </div>
              </button>
              {activeSecurityRec === 'password' && (
                <div className="rec-panel">
                  <h4>Update Your Password</h4>
                  <p>
                    Use a strong, unique password and change it regularly. Avoid reusing passwords across services.
                    Consider using a password manager to keep credentials secure.
                  </p>
                  {securityFeatures.passwordLastUpdated && (
                    <div className="security-status">
                      Last Updated: <span className="status-badge enabled">
                        {new Date(securityFeatures.passwordLastUpdated).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                  <form onSubmit={handlePasswordUpdate} className="password-form">
                    <div className="form-group">
                      <label>Current Password</label>
                      <input 
                        type="password" 
                        name="currentPassword"
                        value={passwordForm.currentPassword}
                        onChange={handlePasswordChange}
                        placeholder="Enter current password"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>New Password</label>
                      <input 
                        type="password" 
                        name="newPassword"
                        value={passwordForm.newPassword}
                        onChange={handlePasswordChange}
                        placeholder="Enter new password"
                        required
                        minLength="8"
                      />
                    </div>
                    <div className="form-group">
                      <label>Confirm New Password</label>
                      <input 
                        type="password" 
                        name="confirmPassword"
                        value={passwordForm.confirmPassword}
                        onChange={handlePasswordChange}
                        placeholder="Confirm new password"
                        required
                      />
                    </div>
                    <button type="submit" className="update-password-btn">
                      Update Password
                    </button>
                  </form>
                </div>
              )}
            </div>
            
            <div className="rec-item-container">
              <button
                type="button"
                className={`rec-item rec-button ${activeSecurityRec === 'biometric' ? 'active' : ''}`}
                onClick={() => setActiveSecurityRec('biometric')}
                aria-pressed={activeSecurityRec === 'biometric'}
              >
                <div className="rec-icon">👆</div>
                <div className="rec-content">
                  <span className="rec-title">Enable Biometric Login</span>
                  <span className="rec-description">Use fingerprint or face recognition for secure access</span>
                </div>
              </button>
              {activeSecurityRec === 'biometric' && (
                <div className="rec-panel">
                  <h4>Biometric Login</h4>
                  <p>
                    Turn on fingerprint or face recognition to sign in quickly and securely.
                    Your biometric data never leaves your device; we store only a token to verify you.
                  </p>
                  <div className="security-status">
                    Status: <span className={`status-badge ${securityFeatures.biometricLogin ? 'enabled' : 'disabled'}`}>
                      {securityFeatures.biometricLogin ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                  <div className="security-actions">
                    {securityFeatures.biometricLogin ? (
                      <button className="disable-biometric-btn" onClick={handleDisableBiometric}>
                        Disable Biometric
                      </button>
                    ) : (
                      <button className="enable-biometric-btn" onClick={handleEnableBiometric}>
                        Enable Biometric
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Security Message Display */}
          {securityMessage.text && (
            <div className={`security-message ${securityMessage.type}`}>
              {securityMessage.text}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Settings;