import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/NeoBank_Logo_01.png";
import "./Dashboard.css";   // <-- Import CSS file

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

  return (
    <div className="container-fluid p-0">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h5 className="mb-0">KYC & Compliance Dashboard</h5>
          <small>Monitor and manage compliance operations</small>
        </div>
        <small className="last-updated">
          ⏱ Last updated: {lastUpdated.toLocaleTimeString()}
        </small>
      </div>

      {/* Summary Cards */}
      <div className="row m-3 g-3">
        {[
          { title: "KYC Approvals", text: "Pending Review", btn: "Review KYC", route: "review-kyc" },
          { title: "KYC History", text: "History list", btn: "Review History", route: "review-transactions" },
          { title: "System Alerts", text: "Requires Attention", btn: "View Alerts", route: "view-alerts" },
        ].map((item, i) => (
          <div className="col-md-4" key={i}>
            <div className="card shadow-sm text-center card-hover">
              <div className="card-body">
                <h6 className="text-muted">{item.title}</h6>
                <h5 className="fw-bold">0</h5>
                <p className="small text-muted">{item.text}</p>
                <button className="btn btn-sm btn-custom" onClick={() => navigate(item.route)}>
                  {item.btn}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Transactions + Alerts */}
      <div className="row m-3 g-3">
        {/* Transactions */}
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-header d-flex justify-content-between align-items-center">
              <strong>Recent Transactions</strong>
              <button className="btn btn-sm btn-outline-custom" onClick={() => navigate("transactions")}>
                View All Transactions
              </button>
            </div>
            <div className="card-body">
              {transactions.map((txn) => (
                <div key={txn.id} className="txn-item">
                  <div>
                    <strong>{txn.id}</strong> <br />
                    <small>{txn.type}</small>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <span className="badge bg-light text-dark">{txn.amount}</span>
                    {txn.status === "pending" ? (
                      <button className="btn btn-dark btn-sm">Monitor</button>
                    ) : (
                      <button className="btn btn-warning btn-sm">Review</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Alerts */}
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-header d-flex justify-content-between align-items-center">
              <strong>System Alerts</strong>
              <button className="btn btn-sm btn-outline-custom" onClick={() => navigate("view-alerts")}>
                Review Now
              </button>
            </div>
            <div className="card-body">
              {alerts.map((a) => (
                <div key={a.id} className="alert-item">
                  <div>
                    ⚠️ {a.text} <br />
                    <small>{a.time}</small>
                  </div>
                  <button className="btn btn-sm btn-custom" onClick={() => setViewingAlert(a)}>
                    View Report
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* AML Modal */}
      {viewingAlert && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header modal-header-custom">
                <h5 className="modal-title">AML Alert Details</h5>
                <button className="btn-close btn-close-white" onClick={() => setViewingAlert(null)}></button>
              </div>
              <div className="modal-body">
                <h6>{viewingAlert.text}</h6>
                <p><strong>Time:</strong> {viewingAlert.time}</p>
                <hr />
                <p>Here you can show full AML details, transaction list, flagged users, or compliance info.</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setViewingAlert(null)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Compliance Overview */}
      <div className="row m-3 g-3">
        {["Total Submissions", "Approval Rate", "Pending Review", "Active Alerts"].map((text, i) => (
          <div className="col-md-3" key={i}>
            <div className="card compliance-card shadow-sm">
              <div className="card-body fw-bold">0<br />{text}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
