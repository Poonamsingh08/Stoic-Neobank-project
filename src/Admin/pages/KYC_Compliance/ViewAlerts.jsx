import React, { useState } from "react";
import { FaBell } from "react-icons/fa";
import "./ViewAlerts.css";
import Select from "react-select";

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
  const [activeTab, setActiveTab] = useState("info"); // <-- Tab state

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

  const openModal = (alert) => {
    setViewingAlert(alert);
    setActiveTab("info"); // reset tab to info when opening modal
    setNewNote("");
    setEscalateReason("");
  };

  return (
    <div className="alerts-container">
      <div className="alerts-headings">
        <h2 className="alerts-brand">Neo Bank AML & Complaints</h2>
         <p>View and manage all AML reports and customer complaints here.</p>
      </div>

      <main className="alerts-main">
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
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          />
                  {/* Filter Select */}
<Select
  options={[
    { value: "All", label: "All Status" },
    { value: "Pending", label: "Pending" },
    { value: "Approved", label: "Approved" },
    { value: "Rejected", label: "Rejected" },
    { value: "Escalated", label: "Escalated" },
  ]}
  value={{ value: filter, label: filter }}
  onChange={(option) => { setFilter(option.value); setPage(1); }}
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

{/* Sort Select */}
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
                <th><input type="checkbox" checked={selectedAlerts.length === paginatedAlerts.length && paginatedAlerts.length > 0} onChange={toggleAll} /></th>
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
                  <td><input type="checkbox" checked={selectedAlerts.includes(a.alertId)} onChange={() => toggleAlert(a.alertId)} /></td>
                  <td>{a.alertId}</td>
                  <td>{a.name}</td>
                  <td>{a.type}</td>
                  <td className={statusColor(a.status)}>{a.status}</td>
                  <td>{a.date}</td>
                  <td>{a.note}</td>
                  <td><button onClick={() => openModal(a)} className="alerts-btn alerts-btn-view">View</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination same as before */}
        <div className="alerts-pagination">
          <span>Page {page} of {totalPages}</span>
          <div>
            <button disabled={page === 1} onClick={() => setPage(page - 1)} className="alerts-btn alerts-btn-outline">Prev</button>
            <button disabled={page === totalPages} onClick={() => setPage(page + 1)} className="alerts-btn alerts-btn-outline">Next</button>
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
                {/* Tabs */}
                <div className="alerts-tabs">
                  <button className={`alerts-tab ${activeTab === "info" ? "active" : ""}`} onClick={() => setActiveTab("info")}>Info</button>
                  <button className={`alerts-tab ${activeTab === "audit" ? "active" : ""}`} onClick={() => setActiveTab("audit")}>Audit Logs</button>
                  <button className={`alerts-tab ${activeTab === "notes" ? "active" : ""}`} onClick={() => setActiveTab("notes")}>Notes</button>
                </div>

                <div className="alerts-tab-content">
                  {activeTab === "info" && (
                    <div className="alerts-tab-pane active">
                      <p><strong>Alert ID:</strong> {viewingAlert.alertId}</p>
                      <p><strong>Type:</strong> {viewingAlert.type}</p>
                      <p><strong>Status:</strong> {viewingAlert.status}</p>
                      <p><strong>Note:</strong> {viewingAlert.note}</p>
                      <p><strong>Date:</strong> {viewingAlert.date}</p>

                      <div className="alerts-input-group">
                        <input type="text" placeholder="Add note..." value={newNote} onChange={(e) => setNewNote(e.target.value)} />
                        <button onClick={() => addNote(viewingAlert.alertId)} className="alerts-btn alerts-btn-add">Add Note</button>
                      </div>

                      <div className="alerts-input-group">
                        <input type="text" placeholder="Escalate reason..." value={escalateReason} onChange={(e) => setEscalateReason(e.target.value)} />
                        <button onClick={() => escalateAlert(viewingAlert.alertId)} className="alerts-btn alerts-btn-danger">Escalate</button>
                      </div>
                    </div>
                  )}
                  {activeTab === "audit" && (
                    <div className="alerts-tab-pane active">
                      <table className="alerts-table">
                        <thead>
                          <tr><th>Date</th><th>Action</th><th>User</th><th>Remark</th></tr>
                        </thead>
                        <tbody>
                          {viewingAlert.auditLogs.map(log => (
                            <tr key={log.id}><td>{log.date}</td><td>{log.action}</td><td>{log.user}</td><td>{log.remark}</td></tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                  {activeTab === "notes" && (
                    <div className="alerts-tab-pane active">
                      <ul className="alerts-notes-list">{viewingAlert.notes.map((n, idx) => <li key={idx}>{n}</li>)}</ul>
                    </div>
                  )}
                </div>
              </div>

              <div className="alerts-modal-footer">
                <button onClick={() => setViewingAlert(null)} className="alerts-btn alerts-btn-outline">Close</button>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
