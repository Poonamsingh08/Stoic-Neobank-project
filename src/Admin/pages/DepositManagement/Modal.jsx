import React, { useState } from "react";
import "./Modal.css"; // Keep your CSS file

const Modal = ({ action, row, onClose, onSubmit }) => {
  const [remarks, setRemarks] = useState("");

  const handleSubmit = () => {
    const payload = { remarks };
    if (onSubmit) {
      onSubmit(payload);
    } else {
      alert(`${action} submitted for ${row?.name || row?.id} with remarks: ${remarks}`);
      onClose();
    }
  };

  return (
    <div className="adm-modal-backdrop">
      <div className="adm-modal">
        <h3>{action} Request</h3>
        <p>User: {row?.name || row?.id}</p>
        <p>Amount: {row?.amount ?? "N/A"}</p>

        <textarea
          placeholder="Enter remarks..."
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
        />

        <div className="adm-modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button className="adm-approve" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
