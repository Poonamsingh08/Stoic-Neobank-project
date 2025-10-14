import React, { useState, useEffect } from "react";
import {
  Sun,
  Moon,
  Display,
  ArrowCounterclockwise,
  Check2Circle,
} from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import "./GeneralSettings.css";

const GeneralSettings = () => {
  const navigate = useNavigate();

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "Light");
  const [compactView, setCompactView] = useState(
    JSON.parse(localStorage.getItem("compactView")) || false
  );
  const [animations, setAnimations] = useState(
    JSON.parse(localStorage.getItem("animations")) ?? true
  );
  const [soundEffects, setSoundEffects] = useState(
    JSON.parse(localStorage.getItem("soundEffects")) ?? true
  );

  const [pushNotifications, setPushNotifications] = useState(
    JSON.parse(localStorage.getItem("pushNotifications")) ?? true
  );
  const [emailNotifications, setEmailNotifications] = useState(
    JSON.parse(localStorage.getItem("emailNotifications")) ?? true
  );
  const [smsNotifications, setSmsNotifications] = useState(
    JSON.parse(localStorage.getItem("smsNotifications")) ?? false
  );

  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "English"
  );
  const [currency, setCurrency] = useState(
    localStorage.getItem("currency") || "₹ INR"
  );
  const [dateFormat, setDateFormat] = useState(
    localStorage.getItem("dateFormat") || "DD/MM/YYYY"
  );
  const [timeFormat, setTimeFormat] = useState(
    localStorage.getItem("timeFormat") || "12-hour"
  );

  const [analytics, setAnalytics] = useState(
    JSON.parse(localStorage.getItem("analytics")) ?? true
  );
  const [crashReporting, setCrashReporting] = useState(
    JSON.parse(localStorage.getItem("crashReporting")) ?? true
  );

  const [resetHover, setResetHover] = useState(false);

  const handleSaveSettings = () => {
    localStorage.setItem("theme", theme);
    localStorage.setItem("compactView", compactView);
    localStorage.setItem("animations", animations);
    localStorage.setItem("soundEffects", soundEffects);

    localStorage.setItem("pushNotifications", pushNotifications);
    localStorage.setItem("emailNotifications", emailNotifications);
    localStorage.setItem("smsNotifications", smsNotifications);

    localStorage.setItem("language", language);
    localStorage.setItem("currency", currency);
    localStorage.setItem("dateFormat", dateFormat);
    localStorage.setItem("timeFormat", timeFormat);

    localStorage.setItem("analytics", analytics);
    localStorage.setItem("crashReporting", crashReporting);

    alert("Settings applied successfully!");
  };

  const handleBack = () => {
    navigate("/Setting");
  };

  useEffect(() => {
    if (theme === "Dark") {
      document.body.style.backgroundColor = "#121212";
      document.body.style.color = "#f1f1f1";
    } else {
      document.body.style.backgroundColor = "#f8f9fa";
      document.body.style.color = "#212529";
    }
  }, [theme]);

  const cardStyle = {
    backgroundColor: theme === "Dark" ? "#1e1e1e" : "#fff",
    color: theme === "Dark" ? "#f1f1f1" : "#212529",
  };

  const subtitleColor = theme === "Dark" ? "#cfcfcf" : "#6c757d";

  return (
    <div className="settings-page">
      {/* Header */}
      <div className="settings-header">
         <span className="s-back-btn" onClick={() => navigate(-1)}>
          ← Back
        </span>
        <h2>General Settings</h2>
        <p>Customize your app experience and preferences</p>
      </div>

      <div className="settings-container">
        {/* Left Column */}
        <div className="settings-column">
          {/* Theme & Appearance */}
          <div className="settings-card" style={cardStyle}>
            <h5>🎨 Theme & Appearance</h5>
            <p className="subtitle">Customize the look and feel of your app</p>

            <h6>App Theme</h6>
            {[
              { name: "Light", icon: <Sun className="theme-icon text-warning" /> },
              { name: "Dark", icon: <Moon className="theme-icon" /> },
              { name: "Auto", icon: <Display className="theme-icon" /> },
            ].map((item) => (
              <div
                key={item.name}
                className={`theme-option ${theme === item.name ? "active-option" : ""
                  }`}
                style={{
                  backgroundColor:
                    theme === "Dark"
                      ? "#2c2c2c"
                      : theme === item.name
                        ? "#f8d7da"
                        : cardStyle.backgroundColor,
                  color: cardStyle.color,
                }}
                onClick={() => setTheme(item.name)}
              >
                {item.icon}
                <div>
                  <strong>{item.name} Theme</strong>
                  <div className="option-subtext">
                    {item.name === "Light"
                      ? "Clean and bright interface"
                      : item.name === "Dark"
                        ? "Easy on the eyes in low light"
                        : "Follows your device settings"}
                  </div>
                </div>
                {theme === item.name && (
                  <span className="badge-active">Active</span>
                )}
              </div>
            ))}

            <hr />
            <h6>Display Options</h6>
            <div className="switch-row">
              <div>
                <label>Compact View</label>
                <p className="option-subtext">Reduce spacing and padding</p>
              </div>
              <input
                type="checkbox"
                checked={compactView}
                onChange={() => setCompactView(!compactView)}
              />
            </div>

            <div className="switch-row">
              <div>
                <label>Animations</label>
                <p className="option-subtext">Enable smooth transitions</p>
              </div>
              <input
                type="checkbox"
                checked={animations}
                onChange={() => setAnimations(!animations)}
              />
            </div>

            <div className="switch-row">
              <div>
                <label>Sound Effects</label>
                <p className="option-subtext">Play sounds for actions</p>
              </div>
              <input
                type="checkbox"
                checked={soundEffects}
                onChange={() => setSoundEffects(!soundEffects)}
              />
            </div>
          </div>

          {/* Notification Preferences */}
          <div className="settings-card" style={cardStyle}>
            <h5>🔔 Notification Preferences</h5>
            <p className="subtitle">
              Choose how you want to receive notifications
            </p>

            {[
              {
                label: "Push Notifications",
                state: pushNotifications,
                setter: setPushNotifications,
              },
              {
                label: "Email Notifications",
                state: emailNotifications,
                setter: setEmailNotifications,
              },
              {
                label: "SMS Notifications",
                state: smsNotifications,
                setter: setSmsNotifications,
              },
            ].map(({ label, state, setter }, idx) => (
              <div key={idx} className="switch-row">
                <label>{label}</label>
                <input
                  type="checkbox"
                  checked={state}
                  onChange={() => setter(!state)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="settings-column">
          {/* Language & Regional */}
          <div className="settings-card" style={cardStyle}>
            <h5>🌐 Language & Regional</h5>
            <p className="subtitle">
              Set your language, currency, and format preferences
            </p>

            <div className="form-group">
              <label>Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="English">US English</option>
                <option value="UK English">UK English</option>
                <option value="Hindi">Hindi</option>
              </select>
            </div>

            <div className="form-group">
              <label>Currency</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <option value="₹ INR">₹ Indian Rupee (₹)</option>
                <option value="$ USD">$ US Dollar ($)</option>
              </select>
            </div>

            <div className="form-group">
              <label>Date Format</label>
              <select
                value={dateFormat}
                onChange={(e) => setDateFormat(e.target.value)}
              >
                <option value="DD/MM/YYYY">DD/MM/YYYY (31/12/2025)</option>
                <option value="MM/DD/YYYY">MM/DD/YYYY (12/31/2025)</option>
              </select>
            </div>

            <div className="form-group">
              <label>Time Format</label>
              <select
                value={timeFormat}
                onChange={(e) => setTimeFormat(e.target.value)}
              >
                <option value="12-hour">12-hour (2:30 PM)</option>
                <option value="24-hour">24-hour (14:30)</option>
              </select>
            </div>
          </div>

          {/* Privacy & Data */}
          <div className="settings-card" style={cardStyle}>
            <h5>🔒 Privacy & Data</h5>
            <p className="subtitle">Control how your data is used and shared</p>

            {[
              {
                label: "Analytics & Usage Data",
                state: analytics,
                setter: setAnalytics,
              },
              {
                label: "Crash Reporting",
                state: crashReporting,
                setter: setCrashReporting,
              },
            ].map(({ label, state, setter }, idx) => (
              <div key={idx} className="switch-row">
                <label>{label}</label>
                <input
                  type="checkbox"
                  checked={state}
                  onChange={() => setter(!state)}
                />
              </div>
            ))}
          </div>

          {/* Settings Preview */}
          <div className="settings-card" style={cardStyle}>
            <h5>📊 Settings Preview</h5>
            <p className="subtitle">A preview of your current settings</p>

            <div className="preview-row">
              <span>Theme</span>
              <span>{theme} Theme</span>
            </div>
            <div className="preview-row">
              <span>Language</span>
              <span>{language}</span>
            </div>
            <div className="preview-row">
              <span>Currency</span>
              <span>{currency}</span>
            </div>
            <div className="preview-row">
              <span>Date Format</span>
              <span>{dateFormat}</span>
            </div>
            <div className="preview-row">
              <span>Time Format</span>
              <span>{timeFormat}</span>
            </div>
            <div className="preview-row">
              <span>Notifications</span>
              <span>
                {[
                  pushNotifications && "Push",
                  emailNotifications && "Email",
                  smsNotifications && "SMS",
                ]
                  .filter(Boolean)
                  .join(", ")}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="footer-buttons">
        <button
          className={`btn-reset ${resetHover ? "hovered" : ""}`}
          onMouseEnter={() => setResetHover(true)}
          onMouseLeave={() => setResetHover(false)}
          onClick={() => window.location.reload()}
        >
          <ArrowCounterclockwise className="me-2" /> Reset to Defaults
        </button>
        <button className="btn-save" onClick={handleSaveSettings}>
          <Check2Circle className="me-2" /> Save Settings
        </button>
      </div>
    </div>
  );
};

export default GeneralSettings;
