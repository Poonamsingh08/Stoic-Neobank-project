import React, { useState, useEffect } from "react";
import Select from 'react-select';
import "./TransactionsRecords.css";
import { Eye, Download, FileText, PieChart } from "lucide-react";

const AdminTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedTxn, setSelectedTxn] = useState(null);

  // More realistic bank transactions data
  useEffect(() => {
    setTransactions([
      {
        id: "TXN1001",
        date: "2025-09-25 11:00 AM",
        account: "AC1234567890",
        customer: "Ravi Kumar",
        type: "Credit",
        amount: 20000,
        status: "Success",
        channel: "Internet Banking",
        reference: "REF1001"
      },
      {
        id: "TXN1002",
        date: "2025-09-25 11:15 AM",
        account: "AC2345678901",
        customer: "Anita Sharma",
        type: "Transfer",
        amount: 5000,
        status: "Pending",
        channel: "Mobile App",
        reference: "REF1002"
      },
      {
        id: "TXN1003",
        date: "2025-09-25 11:30 AM",
        account: "AC3456789012",
        customer: "Amit Verma",
        type: "Debit",
        amount: 7000,
        status: "Failed",
        reason: "Insufficient Balance",
        channel: "ATM",
        reference: "REF1003"
      },
      {
        id: "TXN1004",
        date: "2025-09-25 10:45 AM",
        account: "AC4567890123",
        customer: "Priya Singh",
        type: "Credit",
        amount: 15000,
        status: "Success",
        channel: "Branch",
        reference: "REF1004"
      },
      {
        id: "TXN1005",
        date: "2025-09-25 09:30 AM",
        account: "AC5678901234",
        customer: "Rajesh Patel",
        type: "Transfer",
        amount: 30000,
        status: "Success",
        channel: "Internet Banking",
        reference: "REF1005"
      }
    ]);
  }, []);

  // React-select options with proper styling
  const filterOptions = [
    { value: "All", label: "All Transactions" },
    { value: "Credit", label: "Credit" },
    { value: "Debit", label: "Debit" },
    { value: "Transfer", label: "Transfer" }
  ];

  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);

  const filteredTransactions = transactions.filter((txn) => {
    if (activeTab === "pending" && txn.status !== "Pending") return false;
    if (activeTab === "failed" && txn.status !== "Failed") return false;
    if (activeTab === "reconciliation" && txn.status !== "Success") return false;

    return (
      (filterType === "All" || txn.type === filterType) &&
      (txn.customer.toLowerCase().includes(search.toLowerCase()) ||
        txn.id.includes(search) ||
        txn.account.includes(search))
    );
  });

  // Custom styles for react-select to match #900603 color
  const customStyles = {
    control: (base, state) => ({
      ...base,
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      minHeight: '42px',
      boxShadow: state.isFocused ? '0 0 0 2px rgba(144, 6, 3, 0.2)' : 'none',
      borderColor: state.isFocused ? '#900603' : '#d1d5db',
      '&:hover': {
        borderColor: '#900603'
      }
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected ? '#900603' : state.isFocused ? '#fdf2f2' : 'white',
      color: state.isSelected ? 'white' : '#374151',
      '&:active': {
        backgroundColor: '#900603',
        color: 'white'
      }
    }),
    singleValue: (base) => ({
      ...base,
      color: '#900603',
      fontWeight: '500'
    }),
    menu: (base) => ({
      ...base,
      borderRadius: '6px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      zIndex: 9999
    })
  };

  return (
    <div className="transactions-page">
      {/* Header Section */}
      <div className="page-header">
        <div className="header-content">
          <h2>Transaction Management</h2>
          <p>Monitor, manage, and review all banking transactions efficiently</p>
        </div>
        <div className="header-stats">
          <div className="stat-card">
            <PieChart size={20} />
            <div className="stat-info">
              <span className="stat-value">{transactions.length}</span>
              <span className="stat-label">Total Transactions</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Tabs */}
        <div className="tabs">
          {[
            { key: "all", label: "All Transactions" },
            { key: "pending", label: "Pending Transfers" },
            { key: "failed", label: "Failed / Rejected" },
            { key: "reconciliation", label: "Reconciliation" }
          ].map((tab) => (
            <button
              key={tab.key}
              className={activeTab === tab.key ? "active" : ""}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Filters Section */}
        <div className="filters-section">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search by Txn ID, Account No, or Customer Name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="filter-controls">
            <div className="filter-group">
              <label>Transaction Type</label>
              <Select
                options={filterOptions}
                value={filterOptions.find(option => option.value === filterType)}
                onChange={(selectedOption) => setFilterType(selectedOption.value)}
                styles={customStyles}
                className="transaction-select"
                classNamePrefix="react-select"
              />
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="table-container">
          <div className="table-header">
            <h3>
              {activeTab === "all"
                ? "All Transactions"
                : activeTab === "pending"
                ? "Pending Transfers"
                : activeTab === "failed"
                ? "Failed / Rejected Transactions"
                : "Reconciliation Required"}
            </h3>
            <div className="table-actions">
              <button className="export-btn">
                <Download size={16} />
                Export CSV
              </button>
              <button className="export-btn">
                <FileText size={16} />
                Export PDF
              </button>
            </div>
          </div>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Txn ID</th>
                  <th>Date & Time</th>
                  <th>Account No</th>
                  <th>Customer Name</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Status</th>
                  {activeTab === "failed" && <th>Failure Reason</th>}
                  <th>Channel</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.length === 0 ? (
                  <tr>
                    <td colSpan={activeTab === "failed" ? 10 : 9} className="no-data">
                      <div className="no-data-content">
                        No transactions found matching your criteria
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredTransactions.map((txn) => (
                    <tr key={txn.id} className={`transaction-row status-${txn.status.toLowerCase()}`}>
                      <td className="txn-id">{txn.id}</td>
                      <td className="txn-date">{txn.date}</td>
                      <td className="account-no">{txn.account}</td>
                      <td className="customer-name">{txn.customer}</td>
                      <td>
                        <span className={`type-badge type-${txn.type.toLowerCase()}`}>
                          {txn.type}
                        </span>
                      </td>
                      <td className="amount">{formatCurrency(txn.amount)}</td>
                      <td>
                        <span className={`status-badge status-${txn.status.toLowerCase()}`}>
                          {txn.status}
                        </span>
                      </td>
                      {activeTab === "failed" && (
                        <td className="failure-reason">{txn.reason || "—"}</td>
                      )}
                      <td className="channel">{txn.channel}</td>
                      <td>
                        <button
                          className="view-btn"
                          onClick={() => setSelectedTxn(txn)}
                        >
                          <Eye size={16} />
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Export Section */}
        <div className="export-section">
          <div className="export-options">
            <h4>Export Reports</h4>
            <div className="export-buttons">
              {["CSV", "PDF", "Excel"].map((format) => (
                <button key={format} className="export-format-btn">
                  <Download size={16} />
                  Export {format}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Transaction Details Modal */}
      {selectedTxn && (
        <div className="modal-overlay" onClick={() => setSelectedTxn(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Transaction Details</h3>
              <button className="close-btn" onClick={() => setSelectedTxn(null)}>
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <div className="detail-grid">
                <div className="detail-item">
                  <label>Transaction ID</label>
                  <span>{selectedTxn.id}</span>
                </div>
                <div className="detail-item">
                  <label>Reference No</label>
                  <span>{selectedTxn.reference}</span>
                </div>
                <div className="detail-item">
                  <label>Date & Time</label>
                  <span>{selectedTxn.date}</span>
                </div>
                <div className="detail-item">
                  <label>Account Number</label>
                  <span>{selectedTxn.account}</span>
                </div>
                <div className="detail-item">
                  <label>Customer Name</label>
                  <span>{selectedTxn.customer}</span>
                </div>
                <div className="detail-item">
                  <label>Transaction Type</label>
                  <span className={`type-badge type-${selectedTxn.type.toLowerCase()}`}>
                    {selectedTxn.type}
                  </span>
                </div>
                <div className="detail-item">
                  <label>Amount</label>
                  <span className="amount-large">{formatCurrency(selectedTxn.amount)}</span>
                </div>
                <div className="detail-item">
                  <label>Status</label>
                  <span className={`status-badge status-${selectedTxn.status.toLowerCase()}`}>
                    {selectedTxn.status}
                  </span>
                </div>
                <div className="detail-item">
                  <label>Channel</label>
                  <span>{selectedTxn.channel}</span>
                </div>
                {selectedTxn.reason && (
                  <div className="detail-item full-width">
                    <label>Failure Reason</label>
                    <span className="failure-reason">{selectedTxn.reason}</span>
                  </div>
                )}
              </div>

              <div className="modal-actions">
                <button className="btn-reverse">Reverse Transaction</button>
                <button className="btn-refund">Process Refund</button>
                <button className="btn-resolve">Mark as Resolved</button>
                <button className="btn-note">Add Internal Note</button>
                <button className="btn-close" onClick={() => setSelectedTxn(null)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTransactions;