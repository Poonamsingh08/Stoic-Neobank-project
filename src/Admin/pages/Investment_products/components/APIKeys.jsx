import React, { useState } from "react";
import "./APIKeysIntegrations.css";

const dummyKeys = [
  { id: 1, name: "Payment Gateway Key", status: "Active", created: "2025-09-01", value: "abc123xyz" },
  { id: 2, name: "Biller Integration Key", status: "Disabled", created: "2025-08-25", value: "def456uvw" },
];

export default function APIKeysIntegrations() {
  const [keys, setKeys] = useState(dummyKeys);
  const [showModal, setShowModal] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");

  const toggleStatus = (id) => {
    setKeys(
      keys.map((k) =>
        k.id === id
          ? { ...k, status: k.status === "Active" ? "Disabled" : "Active" }
          : k
      )
    );
  };

  const handleGenerateKey = () => {
    const nextId = keys.length + 1;
    const randomValue = Math.random().toString(36).slice(2, 12); // generate dummy key
    setKeys([
      ...keys,
      {
        id: nextId,
        name: newKeyName,
        status: "Active",
        created: new Date().toISOString().slice(0, 10),
        value: randomValue
      },
    ]);
    setNewKeyName("");
    setShowModal(false);
  };

  const handleCopyKey = (keyValue) => {
    navigator.clipboard.writeText(keyValue);
    alert("API Key copied to clipboard!");
  };

  const handleRevokeKey = (id) => {
    if(window.confirm("Are you sure you want to revoke this API Key?")) {
      setKeys(keys.filter(k => k.id !== id));
    }
  };

  return (
    <div className="apikeys-container">
      <h3 className="apikeys-title">API Keys & Integrations</h3>

      <div className="apikeys-card">
        <div className="apikeys-actions">
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            Generate New API Key
          </button>
        </div>

        <div className="table-wrapper">
          <table className="apikeys-table">
            <thead>
              <tr>
                <th>Key Name</th>
                <th>Status</th>
                <th>Created Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {keys.map((k) => (
                <tr key={k.id}>
                  <td>{k.name}</td>
                  <td>{k.status}</td>
                  <td>{k.created}</td>
                  <td className="action-buttons">
                    <button className="btn btn-success" title="Copy Key" onClick={() => handleCopyKey(k.value)}>
                      Copy
                    </button>
                    <button
                      className={`btn ${k.status === "Active" ? "btn-danger" : "btn-success"}`}
                      title={k.status === "Active" ? "Disable Key" : "Enable Key"}
                      onClick={() => toggleStatus(k.id)}
                    >
                      {k.status === "Active" ? "Disable" : "Enable"}
                    </button>
                    <button className="btn btn-secondary" title="Revoke Key" onClick={() => handleRevokeKey(k.id)}>
                      Revoke
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="api-modal-box">
            <div className="modal-header">
              <h4>Generate New API Key</h4>
              <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              <label className="form-label">Key Name</label>
              <input
                type="text"
                className="form-input"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                placeholder="Enter Key Name"
              />
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleGenerateKey}>Generate</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
