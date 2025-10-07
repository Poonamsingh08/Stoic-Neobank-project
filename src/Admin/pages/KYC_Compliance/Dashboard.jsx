import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCheck, FaHistory, FaBell, FaExchangeAlt, FaShieldAlt } from "react-icons/fa";
import "./Dashboard11.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [viewingAlert, setViewingAlert] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => setLastUpdated(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const transactions = [
    { id: "TXN001", type: "High Value", amount: "$30,000", status: "pending" },
    { id: "TXN002", type: "Structuring", amount: "$25,000", status: "flagged" },
    { id: "TXN003", type: "Offshore", amount: "$35,000", status: "pending" },
  ];

  const alerts = [
    { id: 1, text: "AML compliance check failed for 3 users", time: "2 hours ago" },
    { id: 2, text: "High transaction volume detected", time: "4 hours ago" },
    { id: 3, text: "Daily backup completed successfully", time: "6 hours ago" },
  ];

  const summaryCards = [
    { title: "KYC Approvals", text: "Pending Review", btn: "Review KYC", route: "review-kyc", icon: <FaUserCheck /> },
    { title: "KYC History", text: "History list", btn: "Review History", route: "review-transactions", icon: <FaHistory /> },
    { title: "System Alerts", text: "Requires Attention", btn: "View Alerts", route: "view-alerts", icon: <FaBell /> },
  ];

  return (
    <div className="db-container">
      {/* Header */}
      <div className="db-header">
        <div>
          <h3>KYC & Compliance Dashboard</h3>
          <small>Monitor and manage compliance operations</small>
        </div>
        <small className="db-last-updated">
          ⏱ Last updated: {lastUpdated.toLocaleTimeString()}
        </small>
      </div>

      {/* Summary Cards with Icons */}
      <div className="db-grid-3">
        {summaryCards.map((item, i) => (
          <div className="db-card db-card-hover" key={i}>
            <div className="db-card-icon">{item.icon}</div>
            <h6>{item.title}</h6>
            <h5>0</h5>
            <p>{item.text}</p>
            <button className="db-btn db-btn-primary" onClick={() => navigate(item.route)}>
              {item.btn}
            </button>
          </div>
        ))}
      </div>

      {/* Transactions + Alerts */}
      <div className="db-grid-2">
        {/* Transactions */}
        <div className="db-card">
          <div className="db-card-header">
            <strong>Recent Transactions</strong>
            <button className="db-btn db-btn-outline" onClick={() => navigate("transactions")}>
              View All
            </button>
          </div>
          <div className="db-card-body">
            {transactions.map((txn) => (
              <div key={txn.id} className="db-txn-item">
                <div>
                  <strong>{txn.id}</strong> <br />
                  <small>{txn.type}</small>
                </div>
                <div className="db-txn-actions">
                  <span className="db-badge">{txn.amount}</span>
                  {txn.status === "pending" ? (
                    <button className="db-btn db-btn-dark">Monitor</button>
                  ) : (
                    <button className="db-btn db-btn-warning">Review</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts */}
        <div className="db-card">
          <div className="db-card-header">
            <strong>System Alerts</strong>
            <button className="db-btn db-btn-outline" onClick={() => navigate("view-alerts")}>
              Review Now
            </button>
          </div>
          <div className="db-card-body">
            {alerts.map((a) => (
              <div key={a.id} className="db-alert-item">
                <div>
                  ⚠️ {a.text} <br />
                  <small>{a.time}</small>
                </div>
                <button className="db-btn db-btn-primary" onClick={() => setViewingAlert(a)}>
                  View Report
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AML Modal */}
      {viewingAlert && (
        <div className="db-modal-overlay">
          <div className="db-modal-box">
            <div className="db-modal-header">
              <h5>AML Alert Details</h5>
              <button className="db-modal-close" onClick={() => setViewingAlert(null)}>✖</button>
            </div>
            <div className="db-modal-body">
              <h6>{viewingAlert.text}</h6>
              <p><strong>Time:</strong> {viewingAlert.time}</p>
              <hr />
              <p>Here you can show full AML details, transaction list, flagged users, or compliance info.</p>
            </div>
            <div className="db-modal-footer">
              <button className="db-btn db-btn-secondary" onClick={() => setViewingAlert(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Compliance Overview */}
      <div className="db-grid-4">
        {[
          { text: "Total Submissions", icon: <FaExchangeAlt /> },
          { text: "Approval Rate", icon: <FaUserCheck /> },
          { text: "Pending Review", icon: <FaHistory /> },
          { text: "Active Alerts", icon: <FaShieldAlt /> },
        ].map((item, i) => (
          <div className="db-card db-compliance-card" key={i}>
            <div className="db-card-icon">{item.icon}</div>
            <div className="db-card-body">
              0 <br /> {item.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
