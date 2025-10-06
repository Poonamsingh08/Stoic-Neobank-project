import React, { useState } from "react";
import {
  FaSearch,
  FaUserCheck,
  FaBan,
  FaRegFileAlt,
  FaStickyNote,
  FaUserShield,
} from "react-icons/fa";
import "./PendingKYC.css"; // custom CSS file

const initialUsers = [
  {
    id: 1,
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    kycId: "KYC-001-20240715",
    documents: [
      { type: "Aadhaar", img: "https://via.placeholder.com/600x400?text=Aadhaar" },
      { type: "PAN", img: "https://via.placeholder.com/600x400?text=PAN" },
      { type: "Passport", img: "https://via.placeholder.com/600x400?text=Passport" },
      { type: "Utility Bill", img: "https://via.placeholder.com/600x400?text=Utility+Bill" },
    ],
    uploadedDate: "Jul 15, 2024",
    validity: "Dec 31, 2030",
    status: "Pending",
    notes: ["Aadhaar image slightly blurry, but readable. PAN looks clear."],
    auditLogs: [
      { id: 1, action: "Submitted", user: "User", date: "2025-09-18 09:00", remark: "Initial submission" },
    ],
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    email: "rajesh.kumar@example.com",
    kycId: "KYC-002-20240714",
    documents: [
      { type: "Aadhaar", img: "https://via.placeholder.com/600x400?text=Aadhaar" },
      { type: "PAN", img: "https://via.placeholder.com/600x400?text=PAN" },
      { type: "Passport", img: "https://via.placeholder.com/600x400?text=Passport" },
      { type: "Utility Bill", img: "https://via.placeholder.com/600x400?text=Utility+Bill" },
    ],
    uploadedDate: "Jul 14, 2024",
    validity: "Jun 15, 2028",
    status: "Approved",
    notes: ["All documents verified and approved. No issues found."],
    auditLogs: [
      { id: 1, action: "Submitted", user: "User", date: "2025-09-17 08:00", remark: "Initial submission" },
      { id: 2, action: "Approved", user: "Admin1", date: "2025-09-17 12:00", remark: "All good" },
    ],
  },
];

export default function PendingKYC() {
  const [users, setUsers] = useState(initialUsers);
  const [showModal, setShowModal] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [alert, setAlert] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [recentAction, setRecentAction] = useState({});

  const handleView = (doc) => {
    setSelectedDoc(doc);
    setShowModal(true);
  };

  const handleDownload = (doc) => {
    const link = document.createElement("a");
    link.href = doc.img;
    link.download = `${doc.type}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setAlert({ type: "info", msg: `${doc.type} downloaded successfully!` });
    setTimeout(() => setAlert(null), 2500);
  };

  const handleAction = (type, userId) => {
    const userIndex = users.findIndex((u) => u.id === userId);
    if (userIndex === -1) return;

    const user = users[userIndex];
    const time = new Date().toLocaleString();
    const updated = { ...user };

    if (type === "approve") {
      updated.status = "Approved";
      setAlert({ type: "success", msg: `✅ ${user.name} approved.` });
      setRecentAction({ id: userId, action: "approve" });
    } else if (type === "reject") {
      updated.status = "Rejected";
      setAlert({ type: "danger", msg: `❌ ${user.name} rejected.` });
      setRecentAction({ id: userId, action: "reject" });
    } else if (type === "request") {
      updated.status = "Info Requested";
      setAlert({ type: "warning", msg: `📑 Requested more documents from ${user.name}.` });
      setRecentAction({ id: userId, action: "request" });
    } else if (type === "notes") {
      updated.notes = [...(updated.notes || []), "New note added"];
      setAlert({ type: "success", msg: `📝 Note added for ${user.name}.` });
    } else if (type === "edd") {
      updated.status = "Escalated (EDD)";
      setAlert({ type: "danger", msg: `🔎 ${user.name} marked for EDD.` });
      setRecentAction({ id: userId, action: "edd" });
    }

    const next = [...users];
    next[userIndex] = updated;
    setUsers(next);
    setTimeout(() => setRecentAction({}), 2000);
    setTimeout(() => setAlert(null), 2500);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.kycId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="kyc-container">
      {/* Header */}
      <div className="kyc-header">
        <div>
          <h4>KYC Approve</h4>
          <small>Efficiently review and manage all KYC submissions</small>
        </div>
        <div className="kyc-header-icon">
          <FaUserCheck size="2.5rem" color="#fff" />
        </div>
      </div>

      {/* Search */}
      <div className="search-bar">
        <div className="search-input">
          <span className="search-icon"><FaSearch /></span>
          <input
            type="text"
            placeholder="Search by Name, Email, or KYC ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Alerts */}
      {alert && <div className={`alert ${alert.type}`}>{alert.msg}</div>}

      {/* User Cards */}
      {filteredUsers.length > 0 ? (
        filteredUsers.map((user) => {
          const isRecent = recentAction.id === user.id;
          const recentClass =
            recentAction.action === "approve"
              ? "recent-approve"
              : recentAction.action === "reject"
              ? "recent-reject"
              : recentAction.action === "request"
              ? "recent-request"
              : recentAction.action === "edd"
              ? "recent-edd"
              : "";

          return (
            <div className={`user-card ${isRecent ? recentClass : ""}`} key={user.id}>
              <div className="user-info">
                <div>
                  <h5>{user.name}</h5>
                  <small>{user.email} | KYC ID: <span>{user.kycId}</span></small>
                </div>
                <span
                  className={`status-badge ${
                    user.status === "Approved"
                      ? "approved"
                      : user.status === "Rejected"
                      ? "rejected"
                      : user.status === "Info Requested"
                      ? "info-requested"
                      : user.status === "Escalated (EDD)"
                      ? "escalated-edd"
                      : "pending"
                  }`}
                >
                  {user.status}
                </span>
              </div>

              {/* Documents */}
              <div className="documents-grid">
                {user.documents.map((doc, idx) => (
                  <div className="document-card" key={idx}>
                    <h6>{doc.type}</h6>
                    <div className="doc-actions">
                      <button onClick={() => handleView(doc)}>View</button>
                      <button onClick={() => handleDownload(doc)}>Download</button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Meta */}
              <div className="meta-info">
                <strong>Uploaded:</strong> {user.uploadedDate} | <strong>Validity:</strong> {user.validity}
              </div>

              {/* Notes */}
              <div className="notes">
                <strong>Compliance Notes:</strong>{" "}
                {user.notes && user.notes.length > 0 ? (
                  <span>{user.notes[user.notes.length - 1]}</span>
                ) : (
                  <span>No notes yet.</span>
                )}
              </div>

              {/* Actions */}
              <div className="action-buttons">
                <button className="approve" onClick={() => handleAction("approve", user.id)}><FaUserCheck /> Approve</button>
                <button className="reject" onClick={() => handleAction("reject", user.id)}><FaBan /> Reject</button>
                <button className="request" onClick={() => handleAction("request", user.id)}><FaRegFileAlt /> Request Docs</button>
                <button className="notes-btn" onClick={() => handleAction("notes", user.id)}><FaStickyNote /> Add Notes</button>
                <button className="edd" onClick={() => handleAction("edd", user.id)}><FaUserShield /> Mark EDD</button>
              </div>
            </div>
          );
        })
      ) : (
        <div className="alert info">No users found matching your search.</div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h5>Document Preview</h5>
            {selectedDoc && <img src={selectedDoc.img} alt="Document" />}
            <button className="close-btn" onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
