import React, { useState } from "react";
import "./ReviewTransactions.css";

export default function ReviewTransactions() {
  const dummyCases = [
    {
      caseId: "C001",
      name: "Ram Kumar",
      status: "Pending",
      date: "2025-09-18",
      note: "Initial KYC",
      docs: [
        { type: "Aadhar", url: "https://via.placeholder.com/150" },
        { type: "PAN", url: "https://via.placeholder.com/150" },
      ],
      auditLogs: [
        { id: 1, action: "Created", user: "Admin1", date: "2025-09-18 10:00", remark: "KYC started" },
      ],
      notes: ["Initial check pending"],
    },
    {
      caseId: "C002",
      name: "Sita Sharma",
      status: "Approved",
      date: "2025-09-17",
      note: "Verified",
      docs: [{ type: "Passport", url: "https://via.placeholder.com/150" }],
      auditLogs: [
        { id: 1, action: "Approved", user: "Admin2", date: "2025-09-17 12:00", remark: "Verified" },
      ],
      notes: ["Documents verified"],
    },
    {
      caseId: "C003",
      name: "Amit Verma",
      status: "Rejected",
      date: "2025-09-16",
      note: "Invalid Docs",
      docs: [],
      auditLogs: [
        { id: 1, action: "Rejected", user: "Admin1", date: "2025-09-16 14:00", remark: "Invalid documents" },
      ],
      notes: ["Documents not valid"],
    },
  ];

  const [cases, setCases] = useState(dummyCases);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("latest");
  const [page, setPage] = useState(1);
  const [selectedCases, setSelectedCases] = useState([]);
  const [viewingCase, setViewingCase] = useState(null);
  const [activeTab, setActiveTab] = useState("Documents");
  const itemsPerPage = 5;

  const filteredCases = cases
    .filter(c =>
      (c.name.toLowerCase().includes(search.toLowerCase()) || c.caseId.toLowerCase().includes(search.toLowerCase())) &&
      (filter === "All" || c.status === filter)
    )
    .sort((a, b) => sort === "latest" ? new Date(b.date) - new Date(a.date) : new Date(a.date) - new Date(b.date));

  const totalPages = Math.ceil(filteredCases.length / itemsPerPage);
  const paginatedCases = filteredCases.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const toggleCase = (caseId) => setSelectedCases(prev =>
    prev.includes(caseId) ? prev.filter(id => id !== caseId) : [...prev, caseId]
  );

  const toggleAll = () => setSelectedCases(
    selectedCases.length === paginatedCases.length ? [] : paginatedCases.map(c => c.caseId)
  );

  const bulkAction = (action) => {
    if (!selectedCases.length) return;
    setCases(prev => prev.map(c =>
      selectedCases.includes(c.caseId)
        ? { ...c, status: action, auditLogs: [...c.auditLogs, { id: c.auditLogs.length + 1, action, user: "Admin", date: new Date().toLocaleString(), remark: `${action} via bulk` }] }
        : c
    ));
    setSelectedCases([]);
  };

  const addNote = (caseId, noteText) => {
    if (!noteText.trim()) return;
    setCases(prev => prev.map(c =>
      c.caseId === caseId ? { ...c, notes: [...c.notes, noteText], auditLogs: [...c.auditLogs, { id: c.auditLogs.length + 1, action: "Note Added", user: "Admin", date: new Date().toLocaleString(), remark: noteText }] } : c
    ));
  };

  const escalateCase = (caseId, reason) => {
    if (!reason.trim()) return;
    setCases(prev => prev.map(c =>
      c.caseId === caseId ? { ...c, status: "Escalated", note: reason, auditLogs: [...c.auditLogs, { id: c.auditLogs.length + 1, action: "Escalated", user: "Admin", date: new Date().toLocaleString(), remark: reason }] } : c
    ));
  };

  const downloadDoc = (url, type) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = `${type}.png`;
    link.click();
  };

  return (
    <div className="rt-container">

       <nav className="rt-navbar">
        Neo Bank – KYC History
      </nav>

      <header className="rt-header">KYC History</header>

      <div className="rt-controls">
        <input type="text" placeholder="Search Case ID or Name" value={search} onChange={e => { setSearch(e.target.value); setPage(1) }} />
        <select value={filter} onChange={e => { setFilter(e.target.value); setPage(1) }}>
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
          <option value="Escalated">Escalated</option>
        </select>
        <select value={sort} onChange={e => setSort(e.target.value)}>
          <option value="latest">Latest First</option>
          <option value="oldest">Oldest First</option>
        </select>
        <div className="rt-bulk-buttons">
          <button onClick={() => bulkAction("Approved")} className="rt-btn-approve">Bulk Approve</button>
          <button onClick={() => bulkAction("Rejected")} className="rt-btn-reject">Bulk Reject</button>
        </div>
      </div>

      <div className="rt-table-wrapper">
        <table className="rt-table">
          <thead>
            <tr>
              <th><input type="checkbox" checked={selectedCases.length === paginatedCases.length && paginatedCases.length > 0} onChange={toggleAll} /></th>
              <th>Case ID</th>
              <th>Name</th>
              <th>Status</th>
              <th>Date</th>
              <th>Note</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCases.map(c => (
              <tr key={c.caseId}>
                <td><input type="checkbox" checked={selectedCases.includes(c.caseId)} onChange={() => toggleCase(c.caseId)} /></td>
                <td>{c.caseId}</td>
                <td>{c.name}</td>
                <td className={`rt-status ${c.status.toLowerCase()}`}>{c.status}</td>
                <td>{c.date}</td>
                <td>{c.note}</td>
                <td><button className="rt-btn-view" onClick={() => { setViewingCase(c); setActiveTab("Documents") }}>View</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rt-pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</button>
        <span>Page {page} of {totalPages}</span>
        <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</button>
      </div>

      {viewingCase && (
        <div className="rt-modal">
          <div className="rt-modal-content">
            <header className="rt-modal-header">
              <h3>{viewingCase.caseId} - {viewingCase.name}</h3>
              <button className="rt-btn-close" onClick={() => setViewingCase(null)}>×</button>
            </header>
            <div className="rt-modal-body">
              <div className="rt-tab-buttons">
                {["Documents", "Notes", "Audit Trail", "Escalate"].map(tab => (
                  <button key={tab} className={activeTab === tab ? "active" : ""} onClick={() => setActiveTab(tab)}>
                    {tab}
                  </button>
                ))}
              </div>

              <div className="rt-tab-content">
                {activeTab === "Documents" && (
                  <div className="rt-documents">
                    {viewingCase.docs.length ? viewingCase.docs.map((doc, idx) => (
                      <div key={idx} className="rt-doc-card">
                        <img src={doc.url} alt={doc.type} />
                        <span>{doc.type}</span>
                        <button onClick={() => downloadDoc(doc.url, doc.type)}>Download</button>
                      </div>
                    )) : <p>No documents uploaded</p>}
                  </div>
                )}

                {activeTab === "Notes" && (
                  <div className="rt-notes">
                    {viewingCase.notes.map((n, idx) => <p key={idx}>{n}</p>)}
                    <input type="text" id="rt-noteInput" />
                    <button onClick={() => {
                      const val = document.getElementById("rt-noteInput").value;
                      addNote(viewingCase.caseId, val);
                      document.getElementById("rt-noteInput").value = "";
                    }}>Add Note</button>
                  </div>
                )}

                {activeTab === "Audit Trail" && (
                  <div className="rt-audit">
                    {viewingCase.auditLogs.map(log => (
                      <p key={log.id}>{log.date} - {log.user} - {log.action} - {log.remark}</p>
                    ))}
                  </div>
                )}

                {activeTab === "Escalate" && (
                  <div className="rt-escalate">
                    <input type="text" placeholder="Reason" id="rt-escalateInput" />
                    <button onClick={() => {
                      const val = document.getElementById("rt-escalateInput").value;
                      escalateCase(viewingCase.caseId, val);
                      document.getElementById("rt-escalateInput").value = "";
                    }}>Escalate Case</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
