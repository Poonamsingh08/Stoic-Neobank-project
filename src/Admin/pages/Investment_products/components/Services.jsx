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
  const [newMerchant, setNewMerchant] = useState({ name: "", merchantId: "", service: "", serviceType: "" });

  const toggleStatus = (id) => {
    setMerchants(
      merchants.map((m) =>
        m.id === id ? { ...m, status: m.status === "Enabled" ? "Disabled" : "Enabled" } : m
      )
    );
  };

  const handleAddMerchant = () => {
    if (!newMerchant.name || !newMerchant.merchantId || !newMerchant.service || !newMerchant.serviceType) {
      alert("Fill all fields!");
      return;
    }
    const nextId = merchants.length + 1;
    setMerchants([...merchants, { id: nextId, ...newMerchant, status: "Enabled" }]);
    setNewMerchant({ name: "", merchantId: "", service: "", serviceType: "" });
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
                <th>Merchant ID</th>
                <th>Service</th>
                <th>Service Type</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {merchants.map((m) => (
                <tr key={m.id}>
                  <td>{m.name}</td>
                  <td>{m.merchantId || "-"}</td>
                  <td>{m.service}</td>
                  <td>{m.serviceType || "-"}</td>
                  <td>
                    <span className={`status-badge ${m.status === "Enabled" ? "enabled" : "disabled"}`}>
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
              {/* Merchant Details */}
              <div className="form-section">
                <h5>Merchant Details</h5>
                <label>Merchant Name</label>
                <input
                  type="text"
                  value={newMerchant.name}
                  onChange={(e) => setNewMerchant({ ...newMerchant, name: e.target.value })}
                  placeholder="Enter Merchant Name"
                />
                <label>Merchant ID</label>
                <input
                  type="text"
                  value={newMerchant.merchantId}
                  onChange={(e) => setNewMerchant({ ...newMerchant, merchantId: e.target.value })}
                  placeholder="Enter Merchant ID"
                />
              </div>

              {/* Service Details */}
              <div className="form-section">
                <h5>Service Details</h5>
                <label>Service Name</label>
                <input
                  type="text"
                  value={newMerchant.service}
                  onChange={(e) => setNewMerchant({ ...newMerchant, service: e.target.value })}
                  placeholder="Enter Service Name"
                />
                <label>Service Type</label>
                <select
                  value={newMerchant.serviceType}
                  onChange={(e) => setNewMerchant({ ...newMerchant, serviceType: e.target.value })}
                >
                  <option value="">Select Service Type</option>
                  <option value="UPI">UPI</option>
                  <option value="NetBanking">Net Banking</option>
                  <option value="Cards">Cards</option>
                  <option value="Wallet">Wallet</option>
                </select>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button className="btn-primary" onClick={handleAddMerchant}>
                Add Merchant
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
