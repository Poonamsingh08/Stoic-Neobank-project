import React, { useState, useEffect } from "react";
import "../Notification/Notification.css";

// Dummy Data
const templatesData = [
  { id: 1, type: "Email", title: "Welcome Email", active: true },
  { id: 2, type: "SMS", title: "OTP Verification", active: true },
  { id: 3, type: "Push", title: "App Reminder", active: false },
];

const alertRulesData = [
  { id: 1, name: "Transaction Limit Exceeded", description: "Notify if transaction > ₹10,000", enabled: true },
  { id: 2, name: "Low Balance", description: "Alert when account balance < ₹500", enabled: false },
  { id: 3, name: "Multiple Login Attempts", description: "Alert when failed logins exceed 3", enabled: true },
];

const notificationLogsData = [
  { id: 1, time: "10:32 AM", channel: "Email", message: "Welcome Email Sent", status: "Sent" },
  { id: 2, time: "11:05 AM", channel: "SMS", message: "OTP Sent", status: "Sent" },
  { id: 3, time: "12:10 PM", channel: "Push", message: "Promo Alert", status: "Failed" },
];

// Template Manager Component
const TemplateManager = () => {
  const [templates, setTemplates] = useState(templatesData);

  const toggleActive = (id) =>
    setTemplates((t) =>
      t.map((tpl) => (tpl.id === id ? { ...tpl, active: !tpl.active } : tpl))
    );

  return (
    <div className="adminnotify-card">
      <h2>Notification Templates</h2>
      <p className="adminnotify-muted">Create or edit email, SMS, and push templates</p>

      <div className="adminnotify-table">
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Title</th>
              <th>Status</th>
              <th>Toggle</th>
            </tr>
          </thead>
          <tbody>
            {templates.map((tpl) => (
              <tr key={tpl.id}>
                <td>{tpl.type}</td>
                <td>{tpl.title}</td>
                <td>{tpl.active ? "Active" : "Inactive"}</td>
                <td>
                  <button
                    className="adminnotify-btn"
                    onClick={() => toggleActive(tpl.id)}
                  >
                    {tpl.active ? "Deactivate" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Send Notification Component
const SendNotification = () => {
  const [form, setForm] = useState({ channel: "email", message: "" });
  const [status, setStatus] = useState("");
  const [autoSend, setAutoSend] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const sendNow = () => {
    if (!form.message.trim()) {
      setStatus("⚠️ Please enter a message");
      setTimeout(() => setStatus(""), 3000);
      return;
    }

    setShowPopup(true);
    setStatus(`✅ Notification sent via ${form.channel}`);
    
    setTimeout(() => {
      setShowPopup(false);
    }, 1000);

    setTimeout(() => setStatus(""), 3000);
  };

  useEffect(() => {
    if (autoSend) {
      const interval = setInterval(() => sendNow(), 8000);
      return () => clearInterval(interval);
    }
  }, [autoSend, form.channel]);

  return (
    <div className="adminnotify-card">
      <h2>Send Notification</h2>
      <p className="adminnotify-muted">
        Choose a channel and send messages manually or automatically
      </p>

      <div className="adminnotify-form">
        <label>Channel</label>
        <select
          name="channel"
          value={form.channel}
          onChange={handleChange}
          className="adminnotify-input"
        >
          <option value="email">Email</option>
          <option value="sms">SMS</option>
          <option value="push">Push</option>
        </select>

        <label>Message</label>
        <textarea
          name="message"
          rows="4"
          value={form.message}
          onChange={handleChange}
          className="adminnotify-input"
          placeholder="Enter message..."
        ></textarea>

        <div className="adminnotify-actions">
          <button onClick={sendNow} className="adminnotify-btn dark">
            Send Now
          </button>
          <button
            onClick={() => setAutoSend(!autoSend)}
            className="adminnotify-btn outline"
          >
            {autoSend ? "Stop Auto Send" : "Auto Send Every 8s"}
          </button>
        </div>

        {status && <div className="adminnotify-alert">{status}</div>}
      </div>

      {/* Beautiful Popup Message */}
      {showPopup && (
        <div className="notification-popup-overlay">
          <div className="notification-popup">
            <div className="notification-popup-icon">
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                <circle cx="30" cy="30" r="28" fill="#4CAF50" opacity="0.2"/>
                <circle cx="30" cy="30" r="24" fill="#4CAF50"/>
                <path d="M20 30L26 36L40 22" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>Message Sent Successfully!</h3>
            <p>Your notification has been delivered via {form.channel}</p>
          </div>
        </div>
      )}
    </div>
  );
};

// Alert Rules Component
const AlertRules = () => {
  const [rules, setRules] = useState(alertRulesData);

  const toggleRule = (id) =>
    setRules((r) =>
      r.map((rule) => (rule.id === id ? { ...rule, enabled: !rule.enabled } : rule))
    );

  return (
    <div className="adminnotify-card">
      <h2>Alert Rules</h2>
      <p className="adminnotify-muted">Set thresholds for automatic alerts</p>

      <ul className="adminnotify-list">
        {rules.map((r) => (
          <li key={r.id} className="adminnotify-list-item">
            <div>
              <strong>{r.name}</strong>
              <div className="adminnotify-muted small">{r.description}</div>
            </div>
            <button
              className={`adminnotify-btn ${r.enabled ? "dark" : "outline"}`}
              onClick={() => toggleRule(r.id)}
            >
              {r.enabled ? "Disable" : "Enable"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Notification Logs Component
const NotificationLogs = () => {
  return (
    <div className="adminnotify-card">
      <h2>Notification Logs</h2>
      <p className="adminnotify-muted">Recent notifications and their statuses</p>

      <div className="adminnotify-table">
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Channel</th>
              <th>Message</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {notificationLogsData.map((log) => (
              <tr key={log.id}>
                <td>{log.time}</td>
                <td>{log.channel}</td>
                <td>{log.message}</td>
                <td>
                  <span
                    className={`adminnotify-status ${
                      log.status === "Sent" ? "sent" : "failed"
                    }`}
                  >
                    {log.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Main Notification Component
const Notification = () => {
  const [activeTab, setActiveTab] = useState("templates");

  const renderTab = () => {
    switch (activeTab) {
      case "templates":
        return <TemplateManager />;
      case "send":
        return <SendNotification />;
      case "alerts":
        return <AlertRules />;
      case "logs":
        return <NotificationLogs />;
      default:
        return null;
    }
  };

  return (
    <div className="RuKh_notification-page">
      {/* 🔴 Full-width Red Banner */}
      <div className="RuKh_notification-header">
        <h1>Notification</h1>
      </div>

      {/* Admin Notification Center */}
      <div className="adminnotify-container">
        <h1 className="adminnotify-header">Admin Notification Center</h1>
        <div className="adminnotify-tabs">
          {["templates", "send", "alerts", "logs"].map((tab) => (
            <button
              key={tab}
              className={`adminnotify-tab-btn ${
                activeTab === tab ? "active" : ""
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="adminnotify-content">{renderTab()}</div>
      </div>
    </div>
  );
};

export default Notification;