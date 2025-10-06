import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCog, FaUser, FaShieldAlt, FaBell } from "react-icons/fa";
import QuickSettings from "./QuickSettings";
import AccountInfo from "./Accoutnfo";
import SecurityOptions from "./SecurityOptions";
import "./Settings.css"; // ✅ Plain CSS

const settings = [
  {
    title: "General Settings",
    description: "App preferences, language, and display settings",
    icon: <FaCog className="icon-color" />,
    path: "/Client/GeneralSettings",
  },
  {
    title: "Personal Details",
    description: "Update your profile information and contact details",
    icon: <FaUser className="icon-color" />,
    path: "/Client/personal-details",
  },
  {
    title: "Security",
    description: "Password, 2FA, and security preferences",
    icon: <FaShieldAlt className="icon-color" />,
    path: "/Client/security",
  },
  {
    title: "Notifications",
    description: "Manage email, SMS, and push notifications",
    icon: <FaBell className="icon-color" />,
    path: "/Client/notifications",
  },
];

const Setting = () => {
  const navigate = useNavigate();

  return (
    <div className="settings-page">
      {/* Header */}
      <div className="settings-header">
        <h1>Settings</h1>
        <p>Manage your account preferences and security</p>
      </div>

      {/* Main Cards Grid */}
      <div className="cards-grid">
        {settings.map((item, idx) => (
          <div className="card" key={idx}>
            <div className="card-icon">{item.icon}</div>
            <h5 className="card-title">{item.title}</h5>
            <p className="card-desc">{item.description}</p>
            <button
              className="card-btn"
              onClick={() => item.path && navigate(item.path)}
            >
              Configure <span>→</span>
            </button>
          </div>
        ))}
      </div>

      {/* Extra Sections */}
      <QuickSettings />
      <AccountInfo />
      <SecurityOptions />
    </div>
  );
};

export default Setting;

