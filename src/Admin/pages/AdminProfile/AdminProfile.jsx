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
    <div className="admin-container">
      {/* Top Header */}
      <header className="admin-header">
        <div className="logo-section">
          <div className="logo-box">
            <Shield size={22} color="#fff" />
          </div>
          <div>
            <h1 className="logo-text">NeoBank</h1>
            <p className="logo-sub">Admin Profile</p>
          </div>
        </div>
        <div className="header-actions">
          <button className="notif-btn">
            <Bell size={20} />
            <span className="notif-dot"></span>
          </button>
          <div className="profile-chip">
            <div className="chip-avatar">
              <User size={18} color="#fff" />
            </div>
            <div>
              <p className="chip-name">{adminData.name}</p>
              <p className="chip-role">{adminData.role}</p>
            </div>
          </div>
          <button className="logout-btn">
            <LogOut size={20} />
          </button>
        </div>
      </header>
      {/* Main Content */}
      {/* <main className="admin-main"> */}
        {/* <h2 className="page-title">My Account</h2> */}
        {/* <p className="page-sub">Manage your account information and security preferences</p> */}
        {/* Profile Card */}
        <div className="profile-card">
          <div className="profile-header"></div>
          <div className="profile-body">
            <div className="profile-top">
              <div className="profile-pic-wrapper">
                <img
                  src={adminData.profileImage}
                  alt="Profile"
                  className="profile-pic"
                  onError={(e) => {
                    e.target.src = "https://placehold.co/160x160/cccccc/333333?text=AR";
                  }}
                />
                <button className="change-photo">
                  <Camera size={20} />
                  <span>Change Photo</span>
                </button>
              </div>
              <div className="profile-actions">
                <button className="btn-primary">
                  <Edit2 size={16} /> Edit Profile
                </button>
                <button className="btn-outline">
                  <Lock size={16} /> Change Password
                </button>
              </div>
            </div>
            <div className="info-grid">
              <div className="info-card">
                <User className="info-icon blue" />
                <div>
                  <p className="info-label">Employee ID</p>
                  <p className="info-value">{adminData.employeeId}</p>
                </div>
              </div>
              <div className="info-card">
                <Mail className="info-icon purple" />
                <div>
                  <p className="info-label">Email Address</p>
                  <p className="info-value">{adminData.email}</p>
                </div>
              </div>
              <div className="info-card">
                <Phone className="info-icon green" />
                <div>
                  <p className="info-label">Phone Number</p>
                  <p className="info-value">{adminData.phone}</p>
                </div>
              </div>
              <div className="info-card">
                <Briefcase className="info-icon orange" />
                <div>
                  <p className="info-label">Department</p>
                  <p className="info-value">{adminData.department}</p>
                </div>
              </div>
              <div className="info-card">
                <Building2 className="info-icon teal" />
                <div>
                  <p className="info-label">Branch Location</p>
                  <p className="info-value">{adminData.branch}</p>
                </div>
              </div>
              <div className="info-card twofactor">
                <Shield className="info-icon red" />
                <div>
                  <p className="info-label">Two-Factor Authentication</p>
                  <p className="info-desc">Extra security layer</p>
                </div>
                <button
                  className={`toggle-btn ${twoFactorEnabled ? "on" : "off"}`}
                  onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                >
                  <span className="toggle-circle">
                    {twoFactorEnabled && <CheckCircle2 size={14} color="#900603" />}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Access Logs */}
        <div className="section-card">
          <h3 className="section-title">
            <Clock size={18} /> Access Log
          </h3>
          <div className="log-list">
            {accessLogs.map((log, i) => (
              <div key={i} className="log-item">
                <div className="log-left">
                  <Monitor className="log-icon" />
                  <div>
                    <p className="log-device">{log.device}</p>
                    <p className="log-location">{log.location}</p>
                  </div>
                </div>
                <div className="log-right">
                  <p className="log-time">{log.date} • {log.time}</p>
                  <div className="log-status">
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
        <div className="section-card">
          <h3 className="section-title">
            <Bell size={18} /> Notification Preferences
          </h3>
          <div className="notif-list">
            {[
              { key: "transactionAlerts", label: "Transaction Alerts", desc: "Get notified about all transactions" },
              { key: "systemNotifications", label: "System Notifications", desc: "Important system updates" },
              { key: "newDeviceLogin", label: "New Device Login", desc: "Alert when logging from new device" },
              { key: "monthlyStatements", label: "Monthly Statement Emails", desc: "Receive monthly reports via email" },
            ].map((item) => (
              <div key={item.key} className="notif-item-row">
                <div className="notif-text">
                  <p className="notif-label">{item.label}</p>
                  <p className="notif-desc">{item.desc}</p>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={notifications[item.key]}
                    onChange={() => handleNotificationToggle(item.key)}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
            ))}
          </div>
        </div>
        {/* Security Notice */}
        <div className="security-note">
          <AlertCircle size={18} />
          <div>
            <p className="note-title">Security Reminder</p>
            <p className="note-text">
              Never share your login credentials with anyone. Bank administrators will never ask for your password.
            </p>
          </div>
        </div>
      {/* </main> */}
    </div>
  );
}
export default AdminProfile;