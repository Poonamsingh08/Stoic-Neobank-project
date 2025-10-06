import React, { useState } from "react";
import { FaBell } from "react-icons/fa";
import "./ViewAlerts.css";

export default function ViewAlerts() {
  const dummyAlerts = [
    {
      alertId: "A001",
      name: "Ram Kumar",
      type: "Suspicious Transaction",
      status: "Pending",
      date: "2025-09-18",
      note: "Transaction above threshold",
      auditLogs: [
        { id: 1, action: "Created", user: "Admin1", date: "2025-09-18 10:00", remark: "Initial alert" },
      ],
      notes: ["Check transaction details"],
    },
    {
      alertId: "A002",
      name: "Sita Sharma",
      type: "Customer Complaint",
      status: "Resolved",
      date: "2025-09-17",
      note: "Refund issued",
      auditLogs: [
        { id: 1, action: "Resolved", user: "Admin2", date: "2025-09-17 12:00", remark: "Refund processed" },
      ],
      notes: ["Customer notified"],
    },
    {
      alertId: "A003",
      name: "Amit Verma",
      type: "Suspicious Transaction",
      status: "Escalated",
      date: "2025-09-16",
      note: "Large transfer flagged",
      auditLogs: [
        { id: 1, action: "Escalated", user: "Admin1", date: "2025-09-16 14:00", remark: "High-risk transaction" },
      ],
      notes: ["Sent to compliance team"],
    },
  ];

  const [alerts, setAlerts] = useState(dummyAlerts);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("latest");
  const [page, setPage] = useState(1);
  const [selectedAlerts, setSelectedAlerts] = useState([]);
  const [viewingAlert, setViewingAlert] = useState(null);
  const [newNote, setNewNote] = useState("");
  const [escalateReason, setEscalateReason] = useState("");

  const itemsPerPage = 5;

  const filteredAlerts = alerts.filter(
    (a) =>
      (a.name.toLowerCase().includes(search.toLowerCase()) ||
        a.alertId.toLowerCase().includes(search.toLowerCase()) ||
        a.type.toLowerCase().includes(search.toLowerCase())) &&
      (filter === "All" || a.status === filter)
  );

  filteredAlerts.sort((a, b) =>
    sort === "latest" ? new Date(b.date) - new Date(a.date) : new Date(a.date) - new Date(b.date)
  );

  const totalPages = Math.ceil(filteredAlerts.length / itemsPerPage);
  const paginatedAlerts = filteredAlerts.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const toggleAlert = (alertId) =>
    setSelectedAlerts((prev) =>
      prev.includes(alertId) ? prev.filter((id) => id !== alertId) : [...prev, alertId]
    );

  const toggleAll = () =>
    setSelectedAlerts(
      selectedAlerts.length === paginatedAlerts.length
        ? []
        : paginatedAlerts.map((a) => a.alertId)
    );

  const bulkAction = (action) => {
    setAlerts((prev) =>
      prev.map((a) =>
        selectedAlerts.includes(a.alertId)
          ? {
              ...a,
              status: action,
              auditLogs: [
                ...a.auditLogs,
                {
                  id: a.auditLogs.length + 1,
                  action,
                  user: "Admin",
                  date: new Date().toLocaleString(),
                  remark: `${action} via bulk`,
                },
              ],
            }
          : a
      )
    );
    setSelectedAlerts([]);
  };

  const addNote = (alertId) => {
    if (!newNote.trim()) return;
    setAlerts((prev) =>
      prev.map((a) =>
        a.alertId === alertId
          ? {
              ...a,
              notes: [...(a.notes || []), newNote],
              auditLogs: [
                ...a.auditLogs,
                {
                  id: a.auditLogs.length + 1,
                  action: "Note Added",
                  user: "Admin",
                  date: new Date().toLocaleString(),
                  remark: newNote,
                },
              ],
            }
          : a
      )
    );
    setNewNote("");
  };

  const escalateAlert = (alertId) => {
    if (!escalateReason.trim()) return;
    setAlerts((prev) =>
      prev.map((a) =>
        a.alertId === alertId
          ? {
              ...a,
              status: "Escalated",
              note: escalateReason,
              auditLogs: [
                ...a.auditLogs,
                {
                  id: a.auditLogs.length + 1,
                  action: "Escalated",
                  user: "Admin",
                  date: new Date().toLocaleString(),
                  remark: escalateReason,
                },
              ],
            }
          : a
      )
    );
    setEscalateReason("");
  };

  const statusColor = (status) =>
    status === "Pending"
      ? "status-pending"
      : status === "Resolved"
      ? "status-resolved"
      : "status-escalated";

  return (
    <div className="alerts-container">
      {/* Navbar */}
      <header className="alerts-navbar">
        <div className="alerts-brand">Neo Bank AML & Complaints</div>
      </header>

      {/* Main Content */}
      <main className="alerts-main">
        {/* Heading */}
        <div className="alerts-card">
          <div className="alerts-card-header">
            <FaBell size={28} />
            <h3>AML / Complaints Alerts</h3>
          </div>
        </div>

        {/* Controls */}
        <div className="alerts-controls">
          <input
            type="text"
            className="alerts-input"
            placeholder="Search by ID / Name / Type"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
          <select
            className="alerts-select"
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setPage(1);
            }}
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Resolved">Resolved</option>
            <option value="Escalated">Escalated</option>
          </select>
          <select
            className="alerts-select"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="latest">Latest First</option>
            <option value="oldest">Oldest First</option>
          </select>
          <div className="alerts-bulk-buttons">
            <button onClick={() => bulkAction("Resolved")} className="alerts-btn alerts-btn-success">
              Bulk Resolve
            </button>
            <button onClick={() => bulkAction("Escalated")} className="alerts-btn alerts-btn-danger">
              Bulk Escalate
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="alerts-table-wrapper">
          <table className="alerts-table">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={selectedAlerts.length === paginatedAlerts.length && paginatedAlerts.length > 0}
                    onChange={toggleAll}
                  />
                </th>
                <th>Alert ID</th>
                <th>Name</th>
                <th>Type</th>
                <th>Status</th>
                <th>Date</th>
                <th>Note</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedAlerts.map((a) => (
                <tr key={a.alertId}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedAlerts.includes(a.alertId)}
                      onChange={() => toggleAlert(a.alertId)}
                    />
                  </td>
                  <td>{a.alertId}</td>
                  <td>{a.name}</td>
                  <td>{a.type}</td>
                  <td className={statusColor(a.status)}>{a.status}</td>
                  <td>{a.date}</td>
                  <td>{a.note}</td>
                  <td>
                    <button onClick={() => setViewingAlert(a)} className="alerts-btn alerts-btn-view">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="alerts-pagination">
          <span>
            Page {page} of {totalPages}
          </span>
          <div>
            <button disabled={page === 1} onClick={() => setPage(page - 1)} className="alerts-btn alerts-btn-outline">
              Prev
            </button>
            <button disabled={page === totalPages} onClick={() => setPage(page + 1)} className="alerts-btn alerts-btn-outline">
              Next
            </button>
          </div>
        </div>

        {/* Modal */}
        {viewingAlert && (
          <div className="alerts-modal-overlay">
            <div className="alerts-modal">
              <div className="alerts-modal-header">
                <h5>{viewingAlert.name}</h5>
                <button onClick={() => setViewingAlert(null)} className="alerts-btn-close">✕</button>
              </div>

              <div className="alerts-modal-body">
                <div className="alerts-tabs">
                  <button className="alerts-tab active" data-tab="info">Info</button>
              
                </div>

                <div className="alerts-tab-content">
                  <div className="alerts-tab-pane active" data-tab="info">
                    <p><strong>Alert ID:</strong> {viewingAlert.alertId}</p>
                    <p><strong>Type:</strong> {viewingAlert.type}</p>
                    <p><strong>Status:</strong> {viewingAlert.status}</p>
                    <p><strong>Note:</strong> {viewingAlert.note}</p>
                    <p><strong>Date:</strong> {viewingAlert.date}</p>

                    <div className="alerts-input-group">
                      <input
                        type="text"
                        placeholder="Add note..."
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                      />
                      <button onClick={() => addNote(viewingAlert.alertId)} className="alerts-btn alerts-btn-add">
                        Add Note
                      </button>
                    </div>

                    <div className="alerts-input-group">
                      <input
                        type="text"
                        placeholder="Escalate reason..."
                        value={escalateReason}
                        onChange={(e) => setEscalateReason(e.target.value)}
                      />
                      <button onClick={() => escalateAlert(viewingAlert.alertId)} className="alerts-btn alerts-btn-danger">
                        Escalate
                      </button>
                    </div>
                  </div>

                  <div className="alerts-tab-pane" data-tab="audit">
                    <table className="alerts-table">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Action</th>
                          <th>User</th>
                          <th>Remark</th>
                        </tr>
                      </thead>
                      <tbody>
                        {viewingAlert.auditLogs.map((log) => (
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

                  <div className="alerts-tab-pane" data-tab="notes">
                    <ul className="alerts-notes-list">
                      {viewingAlert.notes.map((n, idx) => (
                        <li key={idx}>{n}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="alerts-modal-footer">
                <button onClick={() => setViewingAlert(null)} className="alerts-btn alerts-btn-outline">
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
