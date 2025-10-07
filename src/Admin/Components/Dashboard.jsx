// src/Components/Dashboard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <>
      {/* ===== Welcome Banner ===== */}
      <div className="neoDash-welcomeBanner">
        <h2 className="neoDash-welcomeText">
          Welcome, <span className="neoDash-username">Khushavant Wagh</span> 👋
        </h2>
      </div>

      {/* ===== Red Header Bar ===== */}
      <div className="neoDash-header">
        <h1 className="neoDash-headerText">Let’s make today amazing.</h1>
      </div>

      {/* ===== Main Content ===== */}
      <div className="neoDash-container">
        <p className="neoDash-sub">
          Welcome back! Here's an overview of your{" "}
          <span className="neoDash-highlight">Neo-Bank</span> operations.
        </p>

        {/* ===== Top Stats ===== */}
        <div className="neoDash-statsGrid">
          <div
            className="neoDash-statCard neoDash-clickable"
            onClick={() => navigate("/Admin/users")}
          >
            <h3>Active Users</h3>
            <p className="neoDash-statValue">24,531</p>
            <span className="neoDash-statChange">+12% from last month</span>
          </div>

          <div
            className="neoDash-statCard neoDash-clickable"
            onClick={() => navigate("/Admin/kyc")}
          >
            <h3>Pending KYCs</h3>
            <p className="neoDash-statValue">147</p>
            <span className="neoDash-statChange">+5 since yesterday</span>
          </div>

          <div
            className="neoDash-statCard neoDash-clickable"
            onClick={() => navigate("/Admin/transactions")}
          >
            <h3>Daily Transactions</h3>
            <p className="neoDash-statValue">$2.4M</p>
            <span className="neoDash-statChange">+8.2% from yesterday</span>
          </div>
        </div>

        {/* ===== Quick Actions ===== */}
        <h2 className="neoDash-sectionTitle">Quick Actions</h2>
        <div className="neoDash-quickActions">
          <div className="neoDash-actionCard">
            <div className="neoDash-actionHeader">
              <h3>KYC Approvals</h3>
              <span className="neoDash-badge">147 pending</span>
            </div>
            <p>Review and approve pending user verifications</p>
            <button
              className="neoDash-actionBtn"
              onClick={() => navigate("/Admin/kyc")}
            >
              Review KYCs
            </button>
          </div>

          <div className="neoDash-actionCard">
            <div className="neoDash-actionHeader">
              <h3>Transaction Reviews</h3>
              <span className="neoDash-badge">23 pending</span>
            </div>
            <p>Check flagged high-value transactions</p>
            <button
              className="neoDash-actionBtn"
              onClick={() => navigate("/Admin/transactions")}
            >
              Review Transactions
            </button>
          </div>

          <div className="neoDash-actionCard">
            <div className="neoDash-actionHeader">
              <h3>Loan Applications</h3>
              <span className="neoDash-badge">56 pending</span>
            </div>
            <p>Process new loan requests and approvals</p>
            <button
              className="neoDash-actionBtn"
              onClick={() => navigate("/Admin/loans")}
            >
              Review Loans
            </button>
          </div>
        </div>

        {/* ===== Transactions + Alerts ===== */}
        <div className="neoDash-bottomGrid">
          {/* ===== Recent Transactions ===== */}
          <div className="neoDash-transactions">
            <h2 className="neoDash-sectionTitle">Recent Transactions</h2>
            <p className="neoDash-sectionSub">
              Latest high-value transactions requiring attention
            </p>
            <ul className="neoDash-txnList">
              <li>
                <strong>TXN001</strong>{" "}
                <span className="neoDash-tag neoDash-pending">pending</span>
                <p>Alice Johnson</p>
                <span className="neoDash-amount">$50,000</span>
                <span className="neoDash-time">2 min ago</span>
              </li>
              <li>
                <strong>TXN002</strong>{" "}
                <span className="neoDash-tag neoDash-flagged">flagged</span>
                <p>Bob Smith</p>
                <span className="neoDash-amount">$25,000</span>
                <span className="neoDash-time">5 min ago</span>
              </li>
              <li>
                <strong>TXN003</strong>{" "}
                <span className="neoDash-tag neoDash-approved">approved</span>
                <p>Carol Davis</p>
                <span className="neoDash-amount">$15,000</span>
                <span className="neoDash-time">12 min ago</span>
              </li>
            </ul>
            <button
              className="neoDash-viewAll"
              onClick={() => navigate("/Admin/transactions")}
            >
              View All Transactions
            </button>
          </div>

          {/* ===== System Alerts ===== */}
          <div className="neoDash-alerts">
            <h2 className="neoDash-sectionTitle">System Alerts</h2>
            <p className="neoDash-sectionSub">
              Critical notifications and system status
            </p>
            <ul className="neoDash-alertList">
              <li>
                <span className="neoDash-dot neoDash-red"></span>
                AML compliance check failed for <strong>3 users</strong>
                <span className="neoDash-time">10 min ago</span>
                <button
                  className="neoDash-alertBtn"
                  onClick={() => navigate("/Admin/users")}
                >
                  Review Now
                </button>
              </li>
              <li>
                <span className="neoDash-dot neoDash-orange"></span>
                High transaction volume detected
                <span className="neoDash-time">25 min ago</span>
                <button
                  className="neoDash-alertBtn"
                  onClick={() => navigate("/Admin/transactions")}
                >
                  Monitor
                </button>
              </li>
              <li>
                <span className="neoDash-dot neoDash-green"></span>
                Daily backup completed successfully
                <span className="neoDash-time">1 hour ago</span>
                <button
                  className="neoDash-alertBtn"
                  onClick={() => navigate("/Admin/reports")}
                >
                  View Report
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
