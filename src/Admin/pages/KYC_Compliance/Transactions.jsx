import React, { useState } from "react";
import { FaExchangeAlt, FaArrowLeft } from "react-icons/fa";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import "./Transactions.css";

export default function Transactions() {
  const navigate = useNavigate();

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
  const [activeTab, setActiveTab] = useState("info");

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
    setSelected(selected.length === paginated.length && paginated.length > 0 ? [] : paginated.map((t) => t.id));

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
    status === "Completed"
      ? "transactions-app-status-completed"
      : status === "Pending"
      ? "transactions-app-status-pending"
      : "transactions-app-status-flagged";

  return (
    <div className="transactions-app-container">
      <div className="transactions-app-navbar-heading">
        <div className="transactions-header-content">
          <h2>Neo Bank - All Transactions</h2>
          <p>Track and manage all user transactions in one place.</p>
        </div>
        <div className="transactions-back-btn-container">
          <button
            onClick={() => navigate('/Admin/kyc')}
            className="transactions-back-btn"
          >
            <FaArrowLeft className="transactions-back-btn-icon" />
            <span className="transactions-back-btn-text">Back to KYC Dashboard</span>
          </button>
        </div>
      </div>

      <div className="transactions-app-main">
        <div className="transactions-app-card-header" style={{ marginBottom: "1rem" }}>
          <FaExchangeAlt size={28} color="#900603" />
          <h3>All Transactions</h3>
        </div>

        {/* Controls */}
        <div className="transactions-app-controls">
          <input
            type="text"
            className="transactions-app-input"
            placeholder="Search by ID / User / Type"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />

          {/* Filter */}
          <Select
            options={[
              { value: "All", label: "All Status" },
              { value: "Pending", label: "Pending" },
              { value: "Completed", label: "Completed" },
              { value: "Flagged", label: "Flagged" },
            ]}
            value={{ value: filter, label: filter }}
            onChange={(option) => {
              setFilter(option.value);
              setPage(1);
            }}
            styles={{
              container: (provided) => ({ ...provided, flex: 1, minWidth: "150px" }),
              menuPortal: (base) => ({ ...base, zIndex: 9999 }),
              control: (provided, state) => ({
                ...provided,
                borderColor: state.isFocused ? "#900603" : "#ccc",
                boxShadow: state.isFocused ? "0 0 0 1px #900603" : "none",
                "&:hover": { borderColor: "#900603" },
              }),
              option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isSelected ? "#900603" : state.isFocused ? "#f8d7da" : "#fff",
                color: state.isSelected ? "#fff" : "#000",
              }),
              singleValue: (provided) => ({ ...provided, color: "#900603" }),
            }}
            menuPortalTarget={document.body}
            menuPosition="fixed"
          />

          {/* Sort */}
          <Select
            options={[
              { value: "latest", label: "Latest First" },
              { value: "oldest", label: "Oldest First" },
            ]}
            value={{ value: sort, label: sort === "latest" ? "Latest First" : "Oldest First" }}
            onChange={(option) => setSort(option.value)}
            styles={{
              container: (provided) => ({ ...provided, flex: 1, minWidth: "150px" }),
              menuPortal: (base) => ({ ...base, zIndex: 9999 }),
              control: (provided, state) => ({
                ...provided,
                borderColor: state.isFocused ? "#900603" : "#ccc",
                boxShadow: state.isFocused ? "0 0 0 1px #900603" : "none",
                "&:hover": { borderColor: "#900603" },
              }),
              option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isSelected ? "#900603" : state.isFocused ? "#f8d7da" : "#fff",
                color: state.isSelected ? "#fff" : "#000",
              }),
              singleValue: (provided) => ({ ...provided, color: "#900603" }),
            }}
            menuPortalTarget={document.body}
            menuPosition="fixed"
          />

          <div className="transactions-app-bulk-buttons">
            <button className="transactions-app-btn transactions-app-btn-success" onClick={() => bulkAction("Completed")}>
              Bulk Completed
            </button>
            <button className="transactions-app-btn transactions-app-btn-flagged" onClick={() => bulkAction("Flagged")}>
              Bulk Flagged
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="transactions-app-table-wrapper">
          <table className="transactions-app-table">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={selected.length === paginated.length && paginated.length > 0}
                    onChange={toggleAll}
                  />
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
                    <button
                      className="transactions-app-btn transactions-app-btn-view"
                      onClick={() => {
                        setViewingTxn(t);
                        setActiveTab("info");
                      }}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="transactions-app-pagination">
          <span>Page {page} of {totalPages}</span>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button
              className="transactions-app-btn"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Prev
            </button>
            <button
              className="transactions-app-btn"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>
        </div>

        {/* Modal */}
        {viewingTxn && (
          <div className="transactions-app-modal-overlay">
            <div className="transactions-app-modal">
              <div className="transactions-app-modal-header">
                <span>Transaction {viewingTxn.id}</span>
                <button className="transactions-app-btn-close" onClick={() => setViewingTxn(null)}>
                  ×
                </button>
              </div>

              <div className="transactions-app-modal-body">
                {/* Tabs */}
                <div className="transactions-app-tabs">
                  <div
                    className={`transactions-app-tab ${activeTab === "info" ? "active" : ""}`}
                    onClick={() => setActiveTab("info")}
                  >
                    Info
                  </div>
                  <div
                    className={`transactions-app-tab ${activeTab === "audit" ? "active" : ""}`}
                    onClick={() => setActiveTab("audit")}
                  >
                    Audit Trail
                  </div>
                  <div
                    className={`transactions-app-tab ${activeTab === "notes" ? "active" : ""}`}
                    onClick={() => setActiveTab("notes")}
                  >
                    Notes
                  </div>
                </div>

                {/* Tab content */}
                <div className="transactions-app-tab-content">
                  {activeTab === "info" && (
                    <div className="transactions-app-tab-pane active">
                      <p><strong>User:</strong> {viewingTxn.user}</p>
                      <p><strong>Type:</strong> {viewingTxn.type}</p>
                      <p><strong>Amount:</strong> ₹ {viewingTxn.amount.toLocaleString()}</p>
                      <p><strong>Status:</strong> {viewingTxn.status}</p>
                      <p><strong>Date:</strong> {viewingTxn.date}</p>

                      <div className="transactions-app-input-group">
                        <input type="text" placeholder="Add note..." id="txnNote" />
                        <button
                          className="transactions-app-btn transactions-app-btn-note"
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
                    <div className="transactions-app-tab-pane active">
                      <div className="transactions-app-table-wrapper">
                        <table className="transactions-app-table">
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
                    <div className="transactions-app-tab-pane active">
                      <ul className="transactions-app-notes-list">
                        {viewingTxn.notes.map((n, idx) => (
                          <li key={idx}>{n}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <div style={{ padding: "0.8rem", textAlign: "right" }}>
                <button className="transactions-app-btn" onClick={() => setViewingTxn(null)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}