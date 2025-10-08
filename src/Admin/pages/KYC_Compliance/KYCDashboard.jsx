import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCheck, FaHistory, FaBell, FaExchangeAlt, FaShieldAlt } from "react-icons/fa";
import "./KYCDashboard11.css";

export default function KYCDashboard() {
  const navigate = useNavigate();
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [viewingAlert, setViewingAlert] = useState(null);

  // ✅ New States for Monitor & Review Modals
  const [monitorTxn, setMonitorTxn] = useState(null);
  const [reviewTxn, setReviewTxn] = useState(null);

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
          <h5>KYC & Compliance Dashboard</h5>
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
                    <button className="db-btn db-btn-dark" onClick={() => setMonitorTxn(txn)}>
                      Monitor
                    </button>
                  ) : (
                    <button className="db-btn db-btn-warning" onClick={() => setReviewTxn(txn)}>
                      Review
                    </button>
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

      {/* ✅ Monitor Modal with Live Progress */}
{monitorTxn && (
  <div className="db-modal-overlay">
    <div className="db-modal-box">
      <div className="db-modal-header">
        <h5>Monitor Transaction</h5>
        <button className="db-modal-close" onClick={() => setMonitorTxn(null)}>✖</button>
      </div>
      <div className="db-modal-body">
        <h6>{monitorTxn.id} - {monitorTxn.type}</h6>
        <p><strong>Amount:</strong> {monitorTxn.amount}</p>
        <p>Status: <span className="db-badge">Pending Monitoring</span></p>
        <hr />
        <p>Live updates:</p>
        <ul>
          <li>Source & Destination Accounts: XXXX123 → YYYY456</li>
          <li>AML / Risk Check: Running...</li>
          <li>Progress: <progress value={Math.floor(Math.random() * 100)} max="100"></progress></li>
          <li>Suspicious activity: None detected</li>
        </ul>
      </div>
      <div className="db-modal-footer">
        <button className="db-btn db-btn-secondary" onClick={() => setMonitorTxn(null)}>Close</button>
      </div>
    </div>
  </div>
)}

{/* ✅ Review Modal with Actions & Comments */}
{reviewTxn && (
  <div className="db-modal-overlay">
    <div className="db-modal-box">
      <div className="db-modal-header">
        <h5>Review Transaction</h5>
        <button className="db-modal-close" onClick={() => setReviewTxn(null)}>✖</button>
      </div>
      <div className="db-modal-body">
        <h6>{reviewTxn.id} - {reviewTxn.type}</h6>
        <p><strong>Amount:</strong> {reviewTxn.amount}</p>
        <p>Status: <span className="db-badge">Flagged for Review</span></p>
        <hr />
        <p>Transaction Details:</p>
        <ul>
          <li>Sender Account: XXXX123</li>
          <li>Receiver Account: YYYY456</li>
          <li>Compliance Checks: Passed / Failed</li>
          <li>Risk Score: Medium</li>
        </ul>
        <hr />
        <p>Admin Comments:</p>
        <textarea
          className="db-textarea"
          placeholder="Add remarks..."
          rows={3}
        ></textarea>
      </div>
      <div className="db-modal-footer">
        <button className="db-btn db-btn-secondary" onClick={() => setReviewTxn(null)}>Close</button>
        <button className="db-btn db-btn-primary">Approve</button>
        <button className="db-btn db-btn-warning">Reject</button>
        <button className="db-btn db-btn-dark">Escalate</button>
      </div>
    </div>
  </div>
)}


      {/* ✅ AML Modal */}
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
