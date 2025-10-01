import React, { useState, useEffect } from "react";
import "./AdminApp.css";
import { Eye } from "lucide-react";

const AdminTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedTxn, setSelectedTxn] = useState(null);

  useEffect(() => {
    setTransactions([
      {
        id: "TXN1001",
        date: "2025-09-25 11:00 AM",
        account: "AC123456",
        customer: "Ravi Kumar",
        type: "Credit",
        amount: 20000,
        status: "Success",
      },
      {
        id: "TXN1002",
        date: "2025-09-25 11:15 AM",
        account: "AC234567",
        customer: "Anita Sharma",
        type: "Transfer",
        amount: 5000,
        status: "Pending",
      },
      {
        id: "TXN1003",
        date: "2025-09-25 11:30 AM",
        account: "AC345678",
        customer: "Amit Verma",
        type: "Debit",
        amount: 7000,
        status: "Failed",
        reason: "Insufficient Balance",
      },
    ]);
  }, []);

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

  return (
    <div className="transactions-page">
      <div className="page-header">
        <h1>Admin — Transactions</h1>
      </div>

      {/* Tabs */}
      <div className="tabs">
        {["all", "pending", "failed", "reconciliation"].map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? "active" : ""}
            onClick={() => setActiveTab(tab)}
          >
            {tab === "all"
              ? "All Transactions"
              : tab === "pending"
              ? "Pending Transfers"
              : tab === "failed"
              ? "Failed / Rejected"
              : "Reconciliation"}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search by ID, Account, or Customer"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          {["All", "Credit", "Debit", "Transfer"].map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="table-card">
        <h2>
          {activeTab === "all"
            ? "All Transactions"
            : activeTab === "pending"
            ? "Pending Transfers"
            : activeTab === "failed"
            ? "Failed / Rejected"
            : "Reconciliation"}
        </h2>

        <table>
          <thead>
            <tr>
              <th>Txn ID</th>
              <th>Date</th>
              <th>Account</th>
              <th>Customer</th>
              <th>Type</th>
              <th>Amount (₹)</th>
              <th>Status</th>
              {activeTab === "failed" && <th>Reason</th>}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length === 0 ? (
              <tr>
                <td colSpan={activeTab === "failed" ? 9 : 8} className="no-data">
                  No transactions found
                </td>
              </tr>
            ) : (
              filteredTransactions.map((txn) => (
                <tr key={txn.id} className={`row-${txn.status.toLowerCase()}`}>
                  <td>{txn.id}</td>
                  <td>{txn.date}</td>
                  <td>{txn.account}</td>
                  <td>{txn.customer}</td>
                  <td>
                    <span className={`type-badge type-${txn.type.toLowerCase()}`}>
                      {txn.type}
                    </span>
                  </td>
                  <td>{formatCurrency(txn.amount)}</td>
                  <td>
                    <span className={`status ${txn.status.toLowerCase()}`}>
                      {txn.status}
                    </span>
                  </td>
                  {activeTab === "failed" && <td>{txn.reason || "—"}</td>}
                  <td>
                    <button className="view-btn" onClick={() => setSelectedTxn(txn)}>
                      <Eye size={16} /> View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Export */}
      <div className="export-section">
        {["CSV", "PDF", "Excel"].map((format) => (
          <button key={format} className="export-btn">
            Export {format}
          </button>
        ))}
      </div>

      {/* Modal */}
      {selectedTxn && (
        <div className="modal-overlay" onClick={() => setSelectedTxn(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Transaction Details</h2>
            <p>
              <strong>ID:</strong> {selectedTxn.id}
            </p>
            <p>
              <strong>Date:</strong> {selectedTxn.date}
            </p>
            <p>
              <strong>Account:</strong> {selectedTxn.account}
            </p>
            <p>
              <strong>Customer:</strong> {selectedTxn.customer}
            </p>
            <p>
              <strong>Type:</strong> {selectedTxn.type}
            </p>
            <p>
              <strong>Amount:</strong> ₹{selectedTxn.amount}
            </p>
            <p>
              <strong>Status:</strong> {selectedTxn.status}
            </p>
            {selectedTxn.reason && (
              <p>
                <strong>Reason:</strong> {selectedTxn.reason}
              </p>
            )}

            <div className="modal-actions">
              <button className="reverse-btn">Reverse</button>
              <button className="refund-btn">Refund</button>
              <button className="resolve-btn">Mark Resolved</button>
              <button className="note-btn">Add Note</button>
              <button className="close-btn" onClick={() => setSelectedTxn(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTransactions;
