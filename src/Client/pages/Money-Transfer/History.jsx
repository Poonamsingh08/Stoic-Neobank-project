import React, { useState, useEffect } from "react";
import "./History.css";

const History = () => {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("transactions")) || [];
    setTransactions(saved);
  }, []);

  const filtered = transactions.filter(
    (tx) =>
      tx.recipient?.toLowerCase().includes(search.toLowerCase()) ||
      tx.type?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="history-page-container">
      {/* Header */}
      <div className="history-header">
        <h1 className="history-title">Transaction History</h1>
        <p className="history-subtitle">
          View all your past money transfers, bill payments, and recharges
        </p>
      </div>

      {/* Search */}
      <div className="history-search-container">
        <input
          type="text"
          placeholder="Search by recipient or type..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="history-search-input"
        />
      </div>

      {/* Table */}
      <div className="history-table-container">
        <div className="history-card">
          <table className="history-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Recipient</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? (
                filtered.map((tx, index) => (
                  <tr key={index}>
                    <td>{tx.date}</td>
                    <td>{tx.recipient}</td>
                    <td>{tx.type}</td>
                    <td className="history-amount">₹{tx.amount}</td>
                    <td className={`history-status ${tx.status.toLowerCase()}`}>
                      {tx.status}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="history-empty">
                    No transactions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default History;
