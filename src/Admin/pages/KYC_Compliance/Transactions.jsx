import React, { useState } from "react";
import { FaExchangeAlt } from "react-icons/fa";
import "./Transactions.css";

export default function Transactions() {
  const dummyTransactions = [
    {
      id: "T001",
      user: "Ram Kumar",
      type: "Deposit",
      amount: 15000,
      status: "Completed",
      date: "2025-09-18",
      auditLogs: [
        { id: 1, action: "Created", user: "System", date: "2025-09-18 09:30", remark: "Deposit request" },
        { id: 2, action: "Completed", user: "Admin1", date: "2025-09-18 09:45", remark: "Funds credited" },
      ],
      notes: ["Verified transaction"],
    },
    {
      id: "T002",
      user: "Sita Sharma",
      type: "Withdrawal",
      amount: 5000,
      status: "Pending",
      date: "2025-09-17",
      auditLogs: [
        { id: 1, action: "Created", user: "System", date: "2025-09-17 14:10", remark: "Withdrawal request" },
      ],
      notes: ["Need approval"],
    },
    {
      id: "T003",
      user: "Amit Verma",
      type: "Transfer",
      amount: 25000,
      status: "Flagged",
      date: "2025-09-16",
      auditLogs: [
        { id: 1, action: "Created", user: "System", date: "2025-09-16 10:00", remark: "Transfer request" },
        { id: 2, action: "Flagged", user: "Admin2", date: "2025-09-16 10:30", remark: "High amount flagged" },
      ],
      notes: ["Under compliance review"],
    },
  ];

  const [transactions, setTransactions] = useState(dummyTransactions);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("latest");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState([]);
  const [viewingTxn, setViewingTxn] = useState(null);
  const itemsPerPage = 5;

  // Filter & sort
  const filtered = transactions.filter(
    (t) =>
      (t.user.toLowerCase().includes(search.toLowerCase()) ||
        t.id.toLowerCase().includes(search.toLowerCase()) ||
        t.type.toLowerCase().includes(search.toLowerCase())) &&
      (filter === "All" || t.status === filter)
  );

  filtered.sort((a, b) =>
    sort === "latest" ? new Date(b.date) - new Date(a.date) : new Date(a.date) - new Date(b.date)
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  // Selection
  const toggleOne = (id) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const toggleAll = () =>
    setSelected(selected.length === paginated.length ? [] : paginated.map((t) => t.id));

  // Bulk action
  const bulkAction = (action) => {
    setTransactions((prev) =>
      prev.map((t) =>
        selected.includes(t.id)
          ? {
              ...t,
              status: action,
              auditLogs: [
                ...t.auditLogs,
                {
                  id: t.auditLogs.length + 1,
                  action,
                  user: "Admin",
                  date: new Date().toLocaleString(),
                  remark: `${action} via bulk`,
                },
              ],
            }
          : t
      )
    );
    setSelected([]);
  };

  // Add note
  const addNote = (id, text) => {
    if (!text.trim()) return;
    setTransactions((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              notes: [...t.notes, text],
              auditLogs: [
                ...t.auditLogs,
                {
                  id: t.auditLogs.length + 1,
                  action: "Note Added",
                  user: "Admin",
                  date: new Date().toLocaleString(),
                  remark: text,
                },
              ],
            }
          : t
      )
    );
  };

  const statusClass = (status) =>
    status === "Completed" ? "status-completed" : status === "Pending" ? "status-pending" : "status-flagged";

  // Tabs state
  const [activeTab, setActiveTab] = useState("info");

  return (
    <div className="transactions-container">
      {/* Navbar */}
      <nav className="transactions-navbar">
        Neo Bank – All Transactions
      </nav>

      <div className="transactions-main">
        {/* Card Header */}
        <div className="transactions-card-header" style={{ marginBottom: "1rem" }}>
          <FaExchangeAlt size={28} color="#900603" />
          <h3>All Transactions</h3>
        </div>

        {/* Controls */}
        <div className="transactions-controls">
          <input
            type="text"
            className="transactions-input"
            placeholder="Search by ID / User / Type"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
          <select
            className="transactions-select"
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setPage(1);
            }}
          >
            <option value="All">All Status</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="Flagged">Flagged</option>
          </select>
          <select className="transactions-select" value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="latest">Latest First</option>
            <option value="oldest">Oldest First</option>
          </select>
          <div className="transactions-bulk-buttons">
            <button className="transactions-btn transactions-btn-success" onClick={() => bulkAction("Completed")}>
              Bulk Completed
            </button>
            <button className="transactions-btn transactions-btn-flagged" onClick={() => bulkAction("Flagged")}>
              Bulk Flagged
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="transactions-table-wrapper">
          <table className="transactions-table">
            <thead>
              <tr>
                <th>
                  <input type="checkbox" checked={selected.length === paginated.length && paginated.length > 0} onChange={toggleAll} />
                </th>
                <th>Txn ID</th>
                <th>User</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((t) => (
                <tr key={t.id}>
                  <td>
                    <input type="checkbox" checked={selected.includes(t.id)} onChange={() => toggleOne(t.id)} />
                  </td>
                  <td>{t.id}</td>
                  <td>{t.user}</td>
                  <td>{t.type}</td>
                  <td>₹ {t.amount.toLocaleString()}</td>
                  <td className={statusClass(t.status)}>{t.status}</td>
                  <td>{t.date}</td>
                  <td>
                    <button className="transactions-btn transactions-btn-view" onClick={() => { setViewingTxn(t); setActiveTab("info"); }}>
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="transactions-pagination">
          <span>Page {page} of {totalPages}</span>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button
              className="transactions-btn"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Prev
            </button>
            <button
              className="transactions-btn"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>
        </div>

        {/* Modal */}
        {viewingTxn && (
          <div className="transactions-modal-overlay">
            <div className="transactions-modal">
              <div className="transactions-modal-header">
                <span>Transaction {viewingTxn.id}</span>
                <button className="transactions-btn-close" onClick={() => setViewingTxn(null)}>×</button>
              </div>

              <div className="transactions-modal-body">
                {/* Tabs */}
                <div className="transactions-tabs">
                  <div className={`transactions-tab ${activeTab === "info" ? "active" : ""}`} onClick={() => setActiveTab("info")}>
                    Info
                  </div>
                  <div className={`transactions-tab ${activeTab === "audit" ? "active" : ""}`} onClick={() => setActiveTab("audit")}>
                    Audit Trail
                  </div>
                  <div className={`transactions-tab ${activeTab === "notes" ? "active" : ""}`} onClick={() => setActiveTab("notes")}>
                    Notes
                  </div>
                </div>

                {/* Tab content */}
                <div className="transactions-tab-content">
                  {activeTab === "info" && (
                    <div className="transactions-tab-pane active">
                      <p><strong>User:</strong> {viewingTxn.user}</p>
                      <p><strong>Type:</strong> {viewingTxn.type}</p>
                      <p><strong>Amount:</strong> ₹ {viewingTxn.amount.toLocaleString()}</p>
                      <p><strong>Status:</strong> {viewingTxn.status}</p>
                      <p><strong>Date:</strong> {viewingTxn.date}</p>

                      <div className="transactions-input-group">
                        <input type="text" placeholder="Add note..." id="txnNote" />
                        <button
                          className="transactions-btn transactions-btn-note"
                          onClick={() => {
                            const text = document.getElementById("txnNote").value;
                            addNote(viewingTxn.id, text);
                            document.getElementById("txnNote").value = "";
                          }}
                        >
                          Add Note
                        </button>
                      </div>
                    </div>
                  )}

                  {activeTab === "audit" && (
                    <div className="transactions-tab-pane active">
                      <div className="transactions-table-wrapper">
                        <table className="transactions-table">
                          <thead>
                            <tr>
                              <th>Date</th>
                              <th>Action</th>
                              <th>User</th>
                              <th>Remark</th>
                            </tr>
                          </thead>
                          <tbody>
                            {viewingTxn.auditLogs.map((log) => (
                              <tr key={log.id}>
                                <td>{log.date}</td>
                                <td>{log.action}</td>
                                <td>{log.user}</td>
                                <td>{log.remark}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {activeTab === "notes" && (
                    <div className="transactions-tab-pane active">
                      <ul className="transactions-notes-list">
                        {viewingTxn.notes.map((n, idx) => (
                          <li key={idx}>{n}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <div style={{ padding: "0.8rem", textAlign: "right" }}>
                <button className="transactions-btn" onClick={() => setViewingTxn(null)}>Close</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
