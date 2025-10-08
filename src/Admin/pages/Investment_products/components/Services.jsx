import React, { useState } from "react";
import Select from "react-select";
import "./ServicesMerchant.css";

const dummyMerchants = [
  { id: 1, name: "Merchant A", service: "Payment Gateway", serviceType: "UPI", status: "Enabled", merchantId: "M001" },
  { id: 2, name: "Merchant B", service: "Bill Payment", serviceType: "NetBanking", status: "Disabled", merchantId: "M002" },
  { id: 3, name: "Merchant C", service: "Wallet Integration", serviceType: "Wallet", status: "Enabled", merchantId: "M003" },
];

export default function ServicesMerchant() {
  const [merchants, setMerchants] = useState(dummyMerchants);
  const [showModal, setShowModal] = useState(false);
  const [newMerchant, setNewMerchant] = useState({ name: "", merchantId: "", service: "", serviceType: "" });

  const serviceOptions = [
    { value: "", label: "Select Service Type" },
    { value: "UPI", label: "UPI" },
    { value: "NetBanking", label: "Net Banking" },
    { value: "Cards", label: "Cards" },
    { value: "Wallet", label: "Wallet" },
  ];

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
                <Select
                  options={serviceOptions}
                  value={serviceOptions.find(option => option.value === newMerchant.serviceType)}
                  onChange={(option) => setNewMerchant({ ...newMerchant, serviceType: option.value })}
                  styles={{
                    control: (provided, state) => ({
                      ...provided,
                      borderColor: state.isFocused ? "#900603" : "#ccc",
                      boxShadow: state.isFocused ? "0 0 0 1px #900603" : "none",
                      "&:hover": { borderColor: "#900603" },
                      borderRadius: 6,
                      padding: 2,
                    }),
                    option: (provided, state) => ({
                      ...provided,
                      backgroundColor: state.isSelected ? "#900603" : state.isFocused ? "#f8d7da" : "#fff",
                      color: state.isSelected ? "#fff" : "#000",
                    }),
                    singleValue: (provided) => ({ ...provided, color: "#900603" }),
                    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                  }}
                  menuPortalTarget={document.body}
                  menuPosition="fixed"
                />
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
