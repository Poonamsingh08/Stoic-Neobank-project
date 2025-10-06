import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownLeft,
  Download,
  CheckCircle,
  FileText,
  BookOpen,
  X,
  Eye,
  CreditCard,
  Banknote,
  ShoppingCart,
  Wallet
} from "lucide-react";

import "./myAccounts.css"; // Custom CSS file

const MyAccountsPage = () => {
  const [showNewAccountMenu, setShowNewAccountMenu] = useState(false);
  const [showCloseAccountMenu, setShowCloseAccountMenu] = useState(false);
  const [showAccountDetails, setShowAccountDetails] = useState(false);
  const [showStatementPopup, setShowStatementPopup] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const navigate = useNavigate();

  const accounts = [
    {
      id: 1,
      type: "Savings Account",
      balance: "₹1,25,480.75",
      accountNumber: "12345678903456",
      maskedNumber: "****3456",
      ifsc: "NEOB0001567",
      status: "Active",
      statusColor: "mac-status-active",
      openedDate: "2023-05-15",
      branch: "Mumbai Main",
      interestRate: "3.5%",
    },
    {
      id: 2,
      type: "Current Account",
      balance: "₹89,250.50",
      accountNumber: "12345678907890",
      maskedNumber: "****7890",
      ifsc: "NEOB0001234",
      status: "Inactive",
      statusColor: "mac-status-inactive",
      openedDate: "2022-11-20",
      branch: "Delhi Corporate",
      interestRate: "0%",
    },
    {
      id: 3,
      type: "Fixed Deposit",
      balance: "₹2,00,000.00",
      accountNumber: "12345678909123",
      maskedNumber: "****9123",
      ifsc: "NEOB0001289",
      status: "Active",
      statusColor: "mac-status-active",
      openedDate: "2024-01-10",
      branch: "Bangalore South",
      interestRate: "6.8%",
      maturityDate: "2025-07-10",
    },
    {
      id: 4,
      type: "Joint Account",
      balance: "₹1,50,750.00",
      accountNumber: "12345678904567",
      maskedNumber: "****4567",
      ifsc: "NEOB0001456",
      status: "Active",
      statusColor: "mac-status-active",
      openedDate: "2023-08-05",
      branch: "Chennai Central",
      interestRate: "3.5%",
      jointHolder: "Priya Sharma",
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
      icon: "salary",
      amountColor: "mac-amount-credit",
      category: "Salary",
    },
    {
      type: "debit",
      title: "Online Shopping - Amazon",
      account: "Current Account",
      reference: "TXN123456784",
      amount: "-₹2,500.00",
      date: "2025-01-09",
      icon: "shopping",
      amountColor: "mac-amount-debit",
      category: "Shopping",
    },
    {
      type: "credit",
      title: "Interest Credit",
      account: "Fixed Deposit",
      reference: "TXN123456783",
      amount: "+₹1,250.00",
      date: "2025-01-08",
      icon: "interest",
      amountColor: "mac-amount-credit",
      category: "Interest",
    },
    {
      type: "debit",
      title: "ATM Withdrawal",
      account: "Savings Account",
      reference: "TXN123456782",
      amount: "-₹5,000.00",
      date: "2025-01-07",
      icon: "withdrawal",
      amountColor: "mac-amount-debit",
      category: "Cash",
    },
    {
      type: "debit",
      title: "Credit Card Payment",
      account: "Current Account",
      reference: "TXN123456781",
      amount: "-₹15,200.00",
      date: "2025-01-06",
      icon: "creditcard",
      amountColor: "mac-amount-debit",
      category: "Payment",
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

  const statementPeriods = [
    { label: "Last 7 days", value: "7days" },
    { label: "Last 30 days", value: "30days" },
    { label: "Last 3 months", value: "3months" },
    { label: "Last 6 months", value: "6months" },
    { label: "Custom Range", value: "custom" },
  ];

  const handleViewDetails = (account) => {
    setSelectedAccount(account);
    setShowAccountDetails(true);
  };

  const handleDownloadStatement = (account) => {
    setSelectedAccount(account);
    setShowStatementPopup(true);
  };

  const getTransactionIcon = (iconType) => {
    switch (iconType) {
      case "salary":
        return <Wallet size={16} className="mac-transaction-icon-salary" />;
      case "shopping":
        return <ShoppingCart size={16} className="mac-transaction-icon-shopping" />;
      case "interest":
        return <TrendingUp size={16} className="mac-transaction-icon-interest" />;
      case "withdrawal":
        return <Banknote size={16} className="mac-transaction-icon-withdrawal" />;
      case "creditcard":
        return <CreditCard size={16} className="mac-transaction-icon-creditcard" />;
      default:
        return <ArrowUpRight size={16} />;
    }
  };

  const getTransactionIconColor = (iconType) => {
    switch (iconType) {
      case "salary":
        return "#28a745";
      case "shopping":
        return "#ff6b6b";
      case "interest":
        return "#17a2b8";
      case "withdrawal":
        return "#6f42c1";
      case "creditcard":
        return "#fd7e14";
      default:
        return "#6c757d";
    }
  };

  return (
    <div className="mac-container">
      {/* Header */}
      <div className="mac-header">
        <div className="mac-header-left">
          <h1>My Accounts</h1>
          <p>Manage your accounts, view transactions, and access banking services</p>
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
                    <span>{account.maskedNumber}</span>
                  </div>
                  <div className="mac-account-info-row">
                    <span>IFSC Code</span>
                    <span>{account.ifsc}</span>
                  </div>
                </div>

                <div className="mac-account-actions">
                  <button 
                    className="mac-btn-view"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewDetails(account);
                    }}
                  >
                    <Eye size={14} /> View Details
                  </button>
                  <button 
                    className="mac-btn-download"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownloadStatement(account);
                    }}
                  >
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
            {transactions.map((txn, idx) => (
              <div key={idx} className="mac-transaction-item">
                <div className="mac-transaction-left">
                  <div 
                    className="mac-transaction-icon"
                    style={{ backgroundColor: `${getTransactionIconColor(txn.icon)}20` }}
                  >
                    {getTransactionIcon(txn.icon)}
                  </div>
                  <div>
                    <p className="mac-transaction-title">{txn.title}</p>
                    <p className="mac-txn-account">{txn.account}</p>
                    <p className="mac-txn-ref">Ref: {txn.reference}</p>
                  </div>
                </div>
                <div className="mac-transaction-right">
                  <p className={txn.amountColor}>{txn.amount}</p>
                  <p className="mac-txn-date">{txn.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Stats - Moved to Bottom */}
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

      {/* Account Details Popup */}
      {showAccountDetails && selectedAccount && (
        <div className="mac-popup-overlay">
          <div className="mac-popup-content">
            <div className="mac-popup-header">
              <h3>Account Details</h3>
              <button 
                className="mac-popup-close"
                onClick={() => setShowAccountDetails(false)}
              >
                <X size={20} />
              </button>
            </div>
            <div className="mac-popup-body">
              <div className="mac-account-detail-section">
                <h4>{selectedAccount.type}</h4>
                <div className="mac-detail-grid">
                  <div className="mac-detail-item">
                    <span className="mac-detail-label">Account Number</span>
                    <span className="mac-detail-value">{selectedAccount.accountNumber}</span>
                  </div>
                  <div className="mac-detail-item">
                    <span className="mac-detail-label">IFSC Code</span>
                    <span className="mac-detail-value">{selectedAccount.ifsc}</span>
                  </div>
                  <div className="mac-detail-item">
                    <span className="mac-detail-label">Current Balance</span>
                    <span className="mac-detail-value mac-balance-large">{selectedAccount.balance}</span>
                  </div>
                  <div className="mac-detail-item">
                    <span className="mac-detail-label">Account Status</span>
                    <span className={`mac-detail-value ${selectedAccount.statusColor}`}>
                      {selectedAccount.status}
                    </span>
                  </div>
                  <div className="mac-detail-item">
                    <span className="mac-detail-label">Branch</span>
                    <span className="mac-detail-value">{selectedAccount.branch}</span>
                  </div>
                  <div className="mac-detail-item">
                    <span className="mac-detail-label">Opened Date</span>
                    <span className="mac-detail-value">{selectedAccount.openedDate}</span>
                  </div>
                  {selectedAccount.interestRate && (
                    <div className="mac-detail-item">
                      <span className="mac-detail-label">Interest Rate</span>
                      <span className="mac-detail-value">{selectedAccount.interestRate}</span>
                    </div>
                  )}
                  {selectedAccount.maturityDate && (
                    <div className="mac-detail-item">
                      <span className="mac-detail-label">Maturity Date</span>
                      <span className="mac-detail-value">{selectedAccount.maturityDate}</span>
                    </div>
                  )}
                  {selectedAccount.jointHolder && (
                    <div className="mac-detail-item">
                      <span className="mac-detail-label">Joint Holder</span>
                      <span className="mac-detail-value">{selectedAccount.jointHolder}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="mac-popup-footer">
              <button 
                className="mac-btn-secondary"
                onClick={() => setShowAccountDetails(false)}
              >
                Close
              </button>
              <button 
                className="mac-btn-primary"
                onClick={() => {
                  setShowAccountDetails(false);
                  handleDownloadStatement(selectedAccount);
                }}
              >
                Download Statement
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Statement Download Popup */}
      {showStatementPopup && selectedAccount && (
        <div className="mac-popup-overlay">
          <div className="mac-popup-content">
            <div className="mac-popup-header">
              <h3>Download Account Statement</h3>
              <button 
                className="mac-popup-close"
                onClick={() => setShowStatementPopup(false)}
              >
                <X size={20} />
              </button>
            </div>
            <div className="mac-popup-body">
              <div className="mac-statement-section">
                <div className="mac-account-info-small">
                  <h4>{selectedAccount.type}</h4>
                  <p>{selectedAccount.maskedNumber} • {selectedAccount.ifsc}</p>
                </div>
                
                <div className="mac-statement-period">
                  <h5>Select Period</h5>
                  <div className="mac-period-options">
                    {statementPeriods.map((period, index) => (
                      <label key={index} className="mac-period-option">
                        <input type="radio" name="statementPeriod" value={period.value} />
                        <span>{period.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mac-file-format">
                  <h5>File Format</h5>
                  <div className="mac-format-options">
                    <label className="mac-format-option">
                      <input type="radio" name="fileFormat" value="pdf" defaultChecked />
                      <span>PDF</span>
                    </label>
                    <label className="mac-format-option">
                      <input type="radio" name="fileFormat" value="excel" />
                      <span>Excel</span>
                    </label>
                    <label className="mac-format-option">
                      <input type="radio" name="fileFormat" value="csv" />
                      <span>CSV</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="mac-popup-footer">
              <button 
                className="mac-btn-secondary"
                onClick={() => setShowStatementPopup(false)}
              >
                Cancel
              </button>
              <button 
                className="mac-btn-primary"
                onClick={() => {
                  // Handle download logic here
                  alert(`Statement for ${selectedAccount.type} is being downloaded`);
                  setShowStatementPopup(false);
                }}
              >
                <Download size={16} /> Download Statement
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAccountsPage;