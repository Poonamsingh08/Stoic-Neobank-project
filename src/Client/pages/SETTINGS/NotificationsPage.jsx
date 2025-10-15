import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Notifications.css";

const DEFAULT_SETTINGS = {
  globalEnabled: true,
  channels: { email: true, sms: true, push: true },
  categories: {
    transaction: { email: true, sms: true, push: true },
    security: { email: true, sms: true, push: true },
    offers: { email: false, sms: false, push: false },
    product: { email: true, sms: false, push: true },
  },
  frequency: "immediate",
};

export default function NotificationsPage() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [savedMsg, setSavedMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("nb_notify_settings");
    if (saved) {
      try {
        setSettings(JSON.parse(saved));
      } catch {
        setSettings(DEFAULT_SETTINGS);
      }
    }
  }, []);

  useEffect(() => {
    if (savedMsg) {
      const t = setTimeout(() => setSavedMsg(""), 3000);
      return () => clearTimeout(t);
    }
  }, [savedMsg]);

  const toggleGlobal = () =>
    setSettings((s) => ({ ...s, globalEnabled: !s.globalEnabled }));

  const toggleChannel = (channel) =>
    setSettings((s) => ({
      ...s,
      channels: { ...s.channels, [channel]: !s.channels[channel] },
    }));

  const toggleCategoryChannel = (category, channel) =>
    setSettings((s) => ({
      ...s,
      categories: {
        ...s.categories,
        [category]: {
          ...s.categories[category],
          [channel]: !s.categories[category][channel],
        },
      },
    }));

  const setFrequency = (freq) =>
    setSettings((s) => ({ ...s, frequency: freq }));

  const saveSettings = () => {
    localStorage.setItem("nb_notify_settings", JSON.stringify(settings));
    setSavedMsg("✅ Settings saved successfully");
  };

  const resetDefaults = () => {
    setSettings(DEFAULT_SETTINGS);
    setSavedMsg("🔄 Restored default settings");
  };

  const ChannelBadge = ({ ch }) => (
    <span className="badge">
      {ch === "email" ? "✉️" : ch === "sms" ? "📱" : "🔔"} {ch.toUpperCase()}
    </span>
  );

  return (
    <div className="notify-page">
      {/* Header */}
      <div className="notify-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <div className="header-text">
          <h1>Manage Notifications</h1>
          <p>
            Choose how you receive alerts for transactions, security, offers,
            and more.
          </p>
        </div>
        <div className="header-toggle">
          <label className="switch">
            <input
              type="checkbox"
              checked={settings.globalEnabled}
              onChange={toggleGlobal}
            />
            <span className="slider round"></span>
          </label>
          <small>
            All notifications {settings.globalEnabled ? "ON" : "OFF"} <br />
            <span className="muted">Toggle to enable or disable all alerts</span>
          </small>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid">
        {/* Channels */}
        {/* Channels */}
        <div className="card111">
          <h5>Channels</h5>
          <p className="muted">Enable or disable channels across all notifications</p>
          {["email", "sms", "push"].map((ch) => (
            <div className="channel-row" key={ch}>
              <div className="cat-header-inline">
                <div className="cat-text">
                  <strong>{ch.toUpperCase()}</strong>
                  <div className="small muted">
                    {ch === "email"
                      ? "Receive Email Notifications"
                      : ch === "sms"
                        ? "Receive SMS Alerts"
                        : "Receive Push Notifications"}
                  </div>
                </div>
                <div className="toggles-inline">
                  <label className="switch small">
                    <input
                      type="checkbox"
                      checked={settings.channels[ch]}
                      onChange={() => toggleChannel(ch)}
                      disabled={!settings.globalEnabled}
                    />
                    <span className="slider round"></span>
                    <span className="label">{ch}</span>
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Categories */}
        <div className="card">
          <h5>Notification Categories</h5>
          <p className="muted">Manage per-category preferences</p>
          {[
            { key: "transaction", title: "Transaction Alerts", desc: "Debit/Credit, UPI, NEFT, IMPS, RTGS", icon: "💳" },
            { key: "security", title: "Security Alerts", desc: "Login attempts, password changes, suspicious activity", icon: "🔒" },
            { key: "offers", title: "Offers & Promotions", desc: "New offers, partner deals, promotional messages", icon: "🎁" },
            { key: "product", title: "Product Updates", desc: "New features & announcements", icon: "🧭" },
          ].map((cat) => (
            <div className="category-row" key={cat.key}>
              <div className="cat-icon">{cat.icon}</div>
              <div className="flex-grow">
                <div className="cat-header-inline">
                  <div className="cat-text">
                    <h6>{cat.title}</h6>
                    <div className="muted small">{cat.desc}</div>
                  </div>
                  <div className="toggles-inline">
                    {["email", "sms", "push"].map((ch) => (
                      <label className="switch small" key={ch}>
                        <input
                          type="checkbox"
                          checked={settings.categories[cat.key][ch]}
                          onChange={() => toggleCategoryChannel(cat.key, ch)}
                          disabled={!settings.globalEnabled || !settings.channels[ch]}
                        />
                        <span className="slider round"></span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}

          <hr />
          <div className="frequency">
            <div>
              <h6>Digest Frequency</h6>
              <small className="muted">
                How often you receive non-critical messages
              </small>
            </div>
            <div className="freq-buttons">
              {["immediate", "daily", "weekly"].map((freq) => (
                <button
                  key={freq}
                  className={`btn ${settings.frequency === freq ? "active" : ""}`}
                  onClick={() => setFrequency(freq)}
                  disabled={!settings.globalEnabled}
                >
                  {freq}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="card wide">
          <h5>Preview</h5>
          <div className="badges">
            <ChannelBadge ch="email" />
            <ChannelBadge ch="sms" />
            <ChannelBadge ch="push" />
          </div>
          <div className="mt">
            <div><strong>Global:</strong> {settings.globalEnabled ? "Enabled" : "Disabled"}</div>
            <div>
              <strong>Active Channels:</strong>{" "}
              {Object.entries(settings.channels).filter(([_, v]) => v).map(([k]) => k.toUpperCase()).join(", ") || "None"}
            </div>
            <div><strong>Frequency:</strong> {settings.frequency}</div>
          </div>
          <div className="actions">
            <button className="btn dark" onClick={saveSettings}>💾 Save Changes</button>
            <button className="btn outline" onClick={resetDefaults}>♻️ Restore Defaults</button>
            {savedMsg && <div className="alert">{savedMsg}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
