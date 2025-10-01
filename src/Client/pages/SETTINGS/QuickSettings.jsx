import React, { useState } from "react";
import { FaMobileAlt, FaBell, FaEye, FaLock } from "react-icons/fa";
import './QuickSettings.css';

const quickSettings = [
  { title: "Biometric Login", icon: <FaMobileAlt />, default: true },
  { title: "Transaction Alerts", icon: <FaBell />, default: true },
  { title: "Account Visibility", icon: <FaEye />, default: false },
  { title: "Auto-Lock", icon: <FaLock />, default: true },
];

const QuickSettings = () => {
  const [settings, setSettings] = useState(
    quickSettings.map((s) => ({ ...s, enabled: s.default }))
  );

  const toggleSetting = (index) => {
    setSettings((prev) =>
      prev.map((s, i) => (i === index ? { ...s, enabled: !s.enabled } : s))
    );
  };

  return (
    <div className="quick-settings-page">
      <h5 className="quick-header">Quick Settings</h5>
      <p className="quick-subtitle">Frequently used settings for quick access</p>

      <div className="quick-cards-grid">
        {settings.map((item, index) => (
          <div className="quick-card" key={index}>
            <div className="quick-card-icon">{item.icon}</div>
            <div className="quick-card-title">{item.title}</div>
            <label className="switch">
              <input
                type="checkbox"
                checked={item.enabled}
                onChange={() => toggleSetting(index)}
              />
              <span className="slider"></span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickSettings;
