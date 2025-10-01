import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {TrendingUp,TrendingDown,ArrowUpRight, ArrowDownLeft,Download,CheckCircle,FileText,BookOpen} from "lucide-react";

import "./myAccounts.css"; // Custom CSS file

const MyAccountsPage = () => {
  const [showNewAccountMenu, setShowNewAccountMenu] = useState(false);
  const [showCloseAccountMenu, setShowCloseAccountMenu] = useState(false);
  const navigate = useNavigate();

  const accounts = [
    {
      type: "Savings Account",
      balance: "₹1,25,480.75",
      accountNumber: "****3456",
      ifsc: "NEOB0001567",
      status: "Active",
      statusColor: "mac-status-active",
    },
    {
      type: "Current Account",
      balance: "₹89,250.50",
      accountNumber: "****7890",
      ifsc: "NEOB0001234",
      status: "Inactive",
      statusColor: "mac-status-inactive",
    },
    {
      type: "Fixed Deposit",
      balance: "₹2,00,000.00",
      accountNumber: "****9123",
      ifsc: "NEOB0001289",
      status: "Active",
      statusColor: "mac-status-active",
    },
    {
      type: "Joint Account",
      balance: "₹1,50,750.00",
      accountNumber: "****4567",
      ifsc: "NEOB0001456",
      status: "Active",
      statusColor: "mac-status-active",
    },
  ];

  const transactions = [
    {
      type: "credit",
      title: "Salary Credit",
      account: "Savings Account",
      reference: "TXN123456789",
      amount: "+₹75,000.00",
      date: "2025-01-10",
      icon: ArrowDownLeft,
      amountColor: "mac-amount-credit",
    },
    {
      type: "debit",
      title: "Online Shopping - Amazon",
      account: "Current Account",
      reference: "TXN123456784",
      amount: "-₹2,500.00",
      date: "2025-01-09",
      icon: ArrowUpRight,
      amountColor: "mac-amount-debit",
    },
    {
      type: "credit",
      title: "Interest Credit",
      account: "Fixed Deposit",
      reference: "TXN123456783",
      amount: "+₹1,250.00",
      date: "2025-01-08",
      icon: ArrowDownLeft,
      amountColor: "mac-amount-credit",
    },
    {
      type: "debit",
      title: "ATM Withdrawal",
      account: "Savings Account",
      reference: "TXN123456782",
      amount: "-₹5,000.00",
      date: "2025-01-07",
      icon: ArrowUpRight,
      amountColor: "mac-amount-debit",
    },
  ];

  const monthlyStats = [
    {
      title: "Monthly Inflow",
      amount: "₹85,000",
      change: "+5%",
      changeText: "from last month",
      changeColor: "mac-amount-credit",
      amountColor: "mac-amount-credit",
      icon: TrendingUp,
    },
    {
      title: "Monthly Outflow",
      amount: "₹32,500",
      change: "-12%",
      changeText: "from last month",
      changeColor: "mac-amount-debit",
      amountColor: "mac-amount-debit",
      icon: TrendingDown,
    },
    {
      title: "Net Savings",
      amount: "₹52,500",
      change: "+15%",
      changeText: "from last month",
      changeColor: "mac-amount-credit",
      amountColor: "mac-amount-credit",
      icon: TrendingUp,
    },
  ];

  const accountOptions = [
    { name: "Savings", icon: "bi-wallet2" },
    { name: "Current", icon: "bi-bank" },
    { name: "Salary", icon: "bi-cash-stack" },
    { name: "Joint Accounts", icon: "bi-people" },
  ];

  return (
    <div className="mac-container">
      {/* Header */}
      <div className="mac-header">
        <div className="mac-header-left">
          <h1>My Accounts</h1>
          <p>App preferences, language, and display settings</p>
        </div>

        <div className="mac-header-right">
          {/* Open Account */}
          <div className="mac-header-menu-wrapper">
            <button
              onClick={() => {
                setShowNewAccountMenu(!showNewAccountMenu);
                setShowCloseAccountMenu(false);
              }}
              className="mac-header-btn"
            >
              <i className="bi bi-person-plus"></i> Open New Account
            </button>
            {showNewAccountMenu && (
              <div
                className="mac-header-dropdown"
                onMouseLeave={() => setShowNewAccountMenu(false)}
              >
                {accountOptions.map((accountType, index) => (
                  <Link
                    key={index}
                    to="/Client/welcome"
                    className="mac-dropdown-item"
                  >
                    <i className={`bi ${accountType.icon}`}></i>
                    {accountType.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Close Account */}
          <div className="mac-header-menu-wrapper">
            <button
              onClick={() => {
                setShowCloseAccountMenu(!showCloseAccountMenu);
                setShowNewAccountMenu(false);
              }}
              className="mac-header-btn"
            >
              <i className="bi bi-person-dash"></i> Close Account
            </button>
            {showCloseAccountMenu && (
              <div
                className="mac-header-dropdown"
                onMouseLeave={() => setShowCloseAccountMenu(false)}
              >
                {accountOptions.map((accountType, index) => (
                  <div
                    key={index}
                    className="mac-dropdown-item"
                    onClick={() => navigate("/Client/close-account")}
                  >
                    <i className={`bi ${accountType.icon}`}></i>
                    {accountType.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mac-main">
        {/* Accounts Grid */}
        <div className="mac-accounts-grid">
          {accounts.map((account, index) => (
            <div
              key={index}
              className="mac-account-card"
              onClick={() => navigate("/Client/account-details")}
            >
              <div className="mac-account-card-body">
                <div className="mac-account-top">
                  <div className="mac-account-icon">
                    <i className="bi bi-bank"></i>
                  </div>
                  <span className={`mac-account-status ${account.statusColor}`}>
                    {account.status}
                  </span>
                </div>
                <h5>{account.type}</h5>
                <div className="mac-account-balance-label">Available Balance</div>
                <p className="mac-account-balance">{account.balance}</p>
                <div className="mac-account-info">
                  <div className="mac-account-info-row">
                    <span>Account Number</span>
                    <span>{account.accountNumber}</span>
                  </div>
                  <div className="mac-account-info-row">
                    <span>IFSC Code</span>
                    <span>{account.ifsc}</span>
                  </div>
                </div>

                <div className="mac-account-actions">
                  <button className="mac-btn-view">View Details</button>
                  <button className="mac-btn-download">
                    <Download size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Services Grid */}
        <div className="mac-services-grid">
          {/* Update KYC */}
          <div className="mac-service-card" onClick={() => navigate("/Client/update-kyc")}>
            <div className="mac-service-icon">
              <CheckCircle size={32} />
            </div>
            <h5>Update KYC</h5>
            <p>Keep your KYC documents updated for seamless banking</p>
            <button
              className="mac-service-btn"
              onClick={(e) => {
                e.stopPropagation();
                navigate("/Client/update-kyc");
              }}
            >
              Update Now
            </button>
          </div>

          {/* Account Statement */}
          <div className="mac-service-card" onClick={() => navigate("/Client/account-statement")}>
            <div className="mac-service-icon">
              <FileText size={32} />
            </div>
            <h5>Account Statement</h5>
            <p>Download your account statements instantly</p>
            <button
              className="mac-service-btn"
              onClick={(e) => {
                e.stopPropagation();
                navigate("/Client/account-statement");
              }}
            >
              Download
            </button>
          </div>

          {/* Cheque Book */}
          <div className="mac-service-card" onClick={() => navigate("/Client/chequebook")}>
            <div className="mac-service-icon">
              <BookOpen size={32} />
            </div>
            <h5>Cheque Book</h5>
            <p>Request new cheque book for your account</p>
            <button
              className="mac-service-btn"
              onClick={(e) => {
                e.stopPropagation();
                navigate("/Client/chequebook");
              }}
            >
              Request
            </button>
          </div>
        </div>

        {/* Transactions */}
        <div className="mac-transactions-card">
          <div className="mac-transactions-header">
            <div>
              <h4>Recent Transactions</h4>
              <p>Latest transactions across all accounts</p>
            </div>
            <button className="mac-btn-view-all">View All</button>
          </div>

          <div className="mac-transactions-list">
            {transactions.map((txn, idx) => {
              const IconComponent = txn.icon;
              return (
                <div key={idx} className="mac-transaction-item">
                  <div className="mac-transaction-left">
                    <div className="mac-transaction-icon">
                      <IconComponent size={14} />
                    </div>
                    <div>
                      <p>{txn.title}</p>
                      <p className="mac-txn-account">{txn.account}</p>
                      <p className="mac-txn-ref">Ref: {txn.reference}</p>
                    </div>
                  </div>
                  <div className="mac-transaction-right">
                    <p className={txn.amountColor}>{txn.amount}</p>
                    <p className="mac-txn-date">{txn.date}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Monthly Stats */}
        <div className="mac-stats-grid">
          {monthlyStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="mac-stat-card">
                <div className="mac-stat-icon">
                  <IconComponent size={24} className={stat.amountColor} />
                </div>
                <h5>{stat.title}</h5>
                <p className={stat.amountColor}>{stat.amount}</p>
                <p className={stat.changeColor}>
                  {stat.change} {stat.changeText}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MyAccountsPage;
