import React, { useState } from "react";
import "./ServicesMerchant.css";

const dummyMerchants = [
  { id: 1, name: "Merchant A", service: "Payment Gateway", status: "Enabled" },
  { id: 2, name: "Merchant B", service: "Bill Payment", status: "Disabled" },
  { id: 3, name: "Merchant C", service: "Wallet Integration", status: "Enabled" },
];

export default function ServicesMerchant() {
  const [merchants, setMerchants] = useState(dummyMerchants);
  const [showModal, setShowModal] = useState(false);
  const [newMerchant, setNewMerchant] = useState({ name: "", service: "" });

  const toggleStatus = (id) => {
    setMerchants(
      merchants.map((m) =>
        m.id === id ? { ...m, status: m.status === "Enabled" ? "Disabled" : "Enabled" } : m
      )
    );
  };

  const handleAddMerchant = () => {
    const nextId = merchants.length + 1;
    setMerchants([...merchants, { id: nextId, ...newMerchant, status: "Enabled" }]);
    setNewMerchant({ name: "", service: "" });
    setShowModal(false);
  };

  return (
    <div className="services-container">
      <h3 className="services-title">Services & Merchant Integrations</h3>

      <div className="services-card">
        <div className="services-actions">
          <button className="btn-primary" onClick={() => setShowModal(true)}>
            Add Merchant / Service
          </button>
        </div>

        <div className="table-wrapper">
          <table className="services-table">
            <thead>
              <tr>
                <th>Merchant Name</th>
                <th>Service</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {merchants.map((m) => (
                <tr key={m.id}>
                  <td>{m.name}</td>
                  <td>{m.service}</td>
                  <td>
                    <span
                      className={`status-badge ${
                        m.status === "Enabled" ? "enabled" : "disabled"
                      }`}
                    >
                      {m.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className={m.status === "Enabled" ? "btn-danger" : "btn-success"}
                      onClick={() => toggleStatus(m.id)}
                    >
                      {m.status === "Enabled" ? "Disable" : "Enable"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Merchant Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-header">
              <h4>Add Merchant / Service</h4>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                ✕
              </button>
            </div>
            <div className="modal-body">
              <label>Merchant Name</label>
              <input
                type="text"
                value={newMerchant.name}
                onChange={(e) => setNewMerchant({ ...newMerchant, name: e.target.value })}
                placeholder="Enter Merchant Name"
              />
              <label>Service</label>
              <input
                type="text"
                value={newMerchant.service}
                onChange={(e) => setNewMerchant({ ...newMerchant, service: e.target.value })}
                placeholder="Enter Service Name"
              />
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button className="btn-primary" onClick={handleAddMerchant}>
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
