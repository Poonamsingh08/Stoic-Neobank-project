import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Shield,
  Bell,
  Lock,
  Edit2,
  Monitor,
  Clock,
  Camera,
  CheckCircle2,
  XCircle,
  Building2,
  Briefcase,
  AlertCircle,
  LogOut,
} from "lucide-react";
import "./AdminProfile.css";

function AdminProfile() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [notifications, setNotifications] = useState({
    transactionAlerts: true,
    systemNotifications: true,
    newDeviceLogin: true,
    monthlyStatements: false,
  });

  const adminData = {
    name: "Amit Rajput",
    employeeId: "EMP009874",
    role: "Branch Manager",
    department: "Retail Banking",
    email: "amit@neobank.com",
    phone: "+91-9876543210",
    branch: "Mumbai – Andheri West",
    profileImage:
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
  };

  const accessLogs = [
    { date: "2025-10-09", time: "09:15 AM", device: "Windows Chrome", ip: "192.168.1.45", location: "Mumbai, MH", status: "success" },
    { date: "2025-10-08", time: "02:30 PM", device: "MacBook Safari", ip: "192.168.1.45", location: "Mumbai, MH", status: "success" },
    { date: "2025-10-07", time: "10:45 AM", device: "Android App", ip: "103.212.45.89", location: "Thane, MH", status: "success" },
    { date: "2025-10-06", time: "08:20 PM", device: "Windows Firefox", ip: "103.212.45.90", location: "Unknown", status: "failed" },
  ];

  const handleNotificationToggle = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="adminp-container">
      {/* ===== Fixed Header ===== */}
      <header className="adminp-header">
        <div className="adminp-logo-section">
          <div className="adminp-logo-box">
            <Shield size={22} color="#fff" />
          </div>
          <div>
            <h1 className="adminp-logo-text">NeoBank</h1>
            <p className="adminp-logo-sub">Admin Profile</p>
          </div>
        </div>

        <div className="adminp-header-actions">
          <button className="adminp-notif-btn">
            <Bell size={20} />
            <span className="adminp-notif-dot"></span>
          </button>

          <div className="adminp-profile-chip">
            <div className="adminp-chip-avatar">
              <User size={18} color="#fff" />
            </div>
            <div>
              <p className="adminp-chip-name">{adminData.name}</p>
              <p className="adminp-chip-role">{adminData.role}</p>
            </div>
          </div>

          <button className="adminp-logout-btn">
            <LogOut size={20} />
          </button>
        </div>
      </header>

      {/* ===== Main Content ===== */}
      <main className="adminp-main">
        {/* Profile Card */}
        <div className="adminp-profile-card">
          <div className="adminp-profile-header"></div>

          <div className="adminp-profile-body">
            <div className="adminp-profile-top">
              <div className="adminp-profile-pic-wrapper">
                <img
                  src={adminData.profileImage}
                  alt="Profile"
                  className="adminp-profile-pic"
                  onError={(e) => {
                    e.target.src = "https://placehold.co/160x160/cccccc/333333?text=AR";
                  }}
                />
                <button className="adminp-change-photo">
                  <Camera size={20} />
                  <span>Change Photo</span>
                </button>
              </div>

              <div className="adminp-profile-actions">
                <button className="adminp-btn-primary">
                  <Edit2 size={16} /> Edit Profile
                </button>
                <button className="adminp-btn-outline">
                  <Lock size={16} /> Change Password
                </button>
              </div>
            </div>

            <div className="adminp-info-grid">
              <div className="adminp-info-card">
                <User className="adminp-info-icon blue" />
                <div>
                  <p className="adminp-info-label">Employee ID</p>
                  <p className="adminp-info-value">{adminData.employeeId}</p>
                </div>
              </div>

              <div className="adminp-info-card">
                <Mail className="adminp-info-icon purple" />
                <div>
                  <p className="adminp-info-label">Email Address</p>
                  <p className="adminp-info-value">{adminData.email}</p>
                </div>
              </div>

              <div className="adminp-info-card">
                <Phone className="adminp-info-icon green" />
                <div>
                  <p className="adminp-info-label">Phone Number</p>
                  <p className="adminp-info-value">{adminData.phone}</p>
                </div>
              </div>

              <div className="adminp-info-card">
                <Briefcase className="adminp-info-icon orange" />
                <div>
                  <p className="adminp-info-label">Department</p>
                  <p className="adminp-info-value">{adminData.department}</p>
                </div>
              </div>

              <div className="adminp-info-card">
                <Building2 className="adminp-info-icon teal" />
                <div>
                  <p className="adminp-info-label">Branch Location</p>
                  <p className="adminp-info-value">{adminData.branch}</p>
                </div>
              </div>

              <div className="adminp-info-card twofactor">
                <Shield className="adminp-info-icon red" />
                <div>
                  <p className="adminp-info-label">Two-Factor Authentication</p>
                  <p className="adminp-info-desc">Extra security layer</p>
                </div>
                <button
                  className={`adminp-toggle-btn ${twoFactorEnabled ? "on" : "off"}`}
                  onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                >
                  <span className="adminp-toggle-circle">
                    {twoFactorEnabled && <CheckCircle2 size={14} color="#900603" />}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Access Logs */}
        <div className="adminp-section-card">
          <h3 className="adminp-section-title">
            <Clock size={18} /> Access Log
          </h3>
          <div className="adminp-log-list">
            {accessLogs.map((log, i) => (
              <div key={i} className="adminp-log-item">
                <div className="adminp-log-left">
                  <Monitor className="adminp-log-icon" />
                  <div>
                    <p className="adminp-log-device">{log.device}</p>
                    <p className="adminp-log-location">{log.location}</p>
                  </div>
                </div>
                <div className="adminp-log-right">
                  <p className="adminp-log-time">{log.date} • {log.time}</p>
                  <div className="adminp-log-status">
                    <span>{log.ip}</span>
                    {log.status === "success" ? (
                      <CheckCircle2 size={14} color="green" />
                    ) : (
                      <XCircle size={14} color="red" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="adminp-section-card">
          <h3 className="adminp-section-title">
            <Bell size={18} /> Notification Preferences
          </h3>
          <div className="adminp-notif-list">
            {[
              { key: "transactionAlerts", label: "Transaction Alerts", desc: "Get notified about all transactions" },
              { key: "systemNotifications", label: "System Notifications", desc: "Important system updates" },
              { key: "newDeviceLogin", label: "New Device Login", desc: "Alert when logging from new device" },
              { key: "monthlyStatements", label: "Monthly Statement Emails", desc: "Receive monthly reports via email" },
            ].map((item) => (
              <div key={item.key} className="adminp-notif-item-row">
                <div className="adminp-notif-text">
                  <p className="adminp-notif-label">{item.label}</p>
                  <p className="adminp-notif-desc">{item.desc}</p>
                </div>
                <label className="adminp-switch">
                  <input
                    type="checkbox"
                    checked={notifications[item.key]}
                    onChange={() => handleNotificationToggle(item.key)}
                  />
                  <span className="adminp-slider round"></span>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Security Note */}
        <div className="adminp-security-note">
          <AlertCircle size={18} />
          <div>
            <p className="adminp-note-title">Security Reminder</p>
            <p className="adminp-note-text">
              Never share your login credentials with anyone. Bank administrators will never ask for your password.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminProfile;
