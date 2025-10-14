import React, { useState, useEffect } from "react";
import "./Security.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Shield,
  Key,
  Eye,
  EyeSlash,
  Gear,
  CheckCircle,
  ExclamationTriangle,
  Globe,
  Phone,
  Fingerprint,
  ArrowRepeat,
  Download,
  Clock,
  ExclamationCircle,
} from "react-bootstrap-icons";

const Security = () => {
  const navigate = useNavigate();

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordUpdated, setPasswordUpdated] = useState(false);

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    smsAlerts: true,
    emailAlerts: true,
    loginNotifications: true,
    biometricLogin: false,
    sessionTimeout: true,
  });

  const [securityScore, setSecurityScore] = useState(0);

  // ✅ Recalculate security score when preferences or password changes
  useEffect(() => {
    const totalItems = Object.keys(securitySettings).length + 1; // +1 for password
    let enabledItems = Object.values(securitySettings).filter(Boolean).length;
    if (passwordUpdated) enabledItems += 1;

    const score = Math.round((enabledItems / totalItems) * 100);
    setSecurityScore(score);
  }, [securitySettings, passwordUpdated]);

  // ✅ Password validation
  const validatePassword = (password) => {
    const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
    return regex.test(password);
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();

    if (!validatePassword(newPassword)) {
      setPasswordError("Use at least 8 characters, 1 number & 1 symbol.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("New Password and Confirm Password must match!");
      return;
    }

    // ✅ If valid password entered
    setPasswordError("");
    setPasswordUpdated(true);
    alert("✅ Password updated successfully!");

    setNewPassword("");
    setConfirmPassword("");
  };

  const toggleSetting = (setting) => {
    setSecuritySettings((prev) => ({ ...prev, [setting]: !prev[setting] }));
  };

  const recentActivity = [
    {
      id: 1,
      action: "Successful Login",
      device: "iPhone 14 Pro",
      location: "Mumbai, India",
      time: "2025-01-10 14:30",
      status: "success",
    },
    {
      id: 2,
      action: "Password Changed",
      device: "MacBook Pro",
      location: "Mumbai, India",
      time: "2025-01-08 09:15",
      status: "success",
    },
    {
      id: 3,
      action: "Failed Login Attempt",
      device: "Unknown Device",
      location: "Delhi, India",
      time: "2025-01-07 22:45",
      status: "warning",
    },
  ];

  const activeSessions = [
    {
      id: 1,
      device: "iPhone 14 Pro",
      browser: "Safari",
      location: "Mumbai, India",
      lastActive: "2 minutes ago",
      current: true,
    },
    {
      id: 2,
      device: "MacBook Pro",
      browser: "Chrome",
      location: "Mumbai, India",
      lastActive: "1 hour ago",
      current: false,
    },
  ];

  return (
    <div className="sec-container">
      {/* Header */}
      <div className="sec-header">
        <span className="s-back-btn" onClick={() => navigate("/Client/setting")}>
          ← Back
        </span>
        <h2>Security</h2>
        <p>Manage your account security and privacy</p>

      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="sec-grid"
      >
        {/* Left Column */}
        <div className="sec-column">
          {/* Security Score */}
          <div className="sec-card">
            <div className="sec-card-header">
              <Shield className="icon" />
              <h3>Security Score</h3>
            </div>
            <div className="sec-card-body center">
              <div className="score-circle">
                <span>{securityScore}%</span>
                <p>
                  {securityScore >= 90
                    ? "Excellent"
                    : securityScore >= 70
                      ? "Strong"
                      : "Weak"}
                </p>
              </div>
              <p className="text-small">
                Enable more options or update your password to improve your
                security score.
              </p>
            </div>
          </div>

          {/* Change Password */}
          <div className="sec-card">
            <div className="sec-card-header">
              <Key className="icon" />
              <h3>Change Password</h3>
            </div>
            <form className="sec-form" onSubmit={handlePasswordUpdate}>
              <label>Current Password</label>
              <div className="input-wrapper">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  placeholder="Enter current password"
                />
                <span
                  onClick={() =>
                    setShowCurrentPassword(!showCurrentPassword)
                  }
                >
                  {showCurrentPassword ? (
                    <EyeSlash size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </span>
              </div>

              <label>New Password</label>
              <div className="input-wrapper">
                <input
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <span
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? (
                    <EyeSlash size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </span>
              </div>

              <label>Confirm Password</label>
              <div className="input-wrapper">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Re-enter new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <span
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                >
                  {showConfirmPassword ? (
                    <EyeSlash size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </span>
              </div>

              {/* ⚠️ Show only when invalid */}
              {passwordError && (
                <div className="alert-box">
                  <ExclamationTriangle size={20} /> {passwordError}
                </div>
              )}

              <button type="submit" className="primary-btn">
                Update Password
              </button>
            </form>
          </div>

          {/* Security Preferences */}
          <div className="sec-card">
            <div className="sec-card-header">
              <Gear className="icon" />
              <h3>Security Preferences</h3>
            </div>
            <div className="toggle-list">
              {Object.keys(securitySettings).map((setting, index) => (
                <div key={index} className="toggle-item">
                  <span className="toggle-label">
                    {setting.replace(/([A-Z])/g, " $1")}
                  </span>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={securitySettings[setting]}
                      onChange={() => toggleSetting(setting)}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="sec-column">
          {/* Recent Activity */}
          <div className="sec-card">
            <div className="sec-card-header">
              <Clock className="icon" />
              <h3>Recent Activity</h3>
              <button className="outline-btn">
                <Download /> Export
              </button>
            </div>
            <div className="activity-list">
              {recentActivity.map((a) => (
                <div
                  key={a.id}
                  className={`activity-item ${a.status === "warning" ? "warning" : "success"
                    }`}
                >
                  <div>
                    <strong>{a.action}</strong>
                    <p>
                      {a.device} • {a.location}
                    </p>
                    <small>{a.time}</small>
                  </div>
                  {a.status === "warning" ? (
                    <ExclamationCircle />
                  ) : (
                    <CheckCircle />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Active Sessions */}
          <div className="sec-card">
            <div className="sec-card-header">
              <Globe className="icon" />
              <h3>Active Sessions</h3>
              <button className="outline-danger">
                <ArrowRepeat /> End All
              </button>
            </div>
            {activeSessions.map((s) => (
              <div key={s.id} className="session-item">
                <div className="session-info">
                  <Phone className="session-icon" />
                  <div>
                    <p>
                      <strong>{s.device}</strong> — {s.browser}
                    </p>
                    <small>
                      {s.location} • Last active {s.lastActive}
                    </small>
                  </div>
                </div>
                {!s.current && (
                  <button className="outline-danger small">End</button>
                )}
              </div>
            ))}
          </div>

          {/* Security Tips */}
          <div className="sec-card">
            <div className="sec-card-header">
              <Fingerprint className="icon" />
              <h3>Security Tips</h3>
            </div>
            <ul className="tips-list">
              <li>
                <CheckCircle /> Use strong passwords with symbols.
              </li>
              <li>
                <CheckCircle /> Enable Two-Factor Authentication.
              </li>
              <li>
                <CheckCircle /> Review login devices regularly.
              </li>
              <li>
                <CheckCircle /> Keep your app updated.
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Security;
