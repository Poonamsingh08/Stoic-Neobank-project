import React, { useState } from "react";
import "./RejectionModal.css";

const RejectionModal = ({ row, onClose, onConfirm }) => {
  const [reason, setReason] = useState("");

  const handleReject = () => {
    const payload = { reason };
    if (onConfirm) {
      onConfirm(payload);
    } else {
      console.log("Rejection Reason:", reason);
      onClose();
    }
  };

  return (
    <div className="adm-rejection-modal-backdrop">
      <div className="adm-rejection-modal">
        <h3>Reject Request</h3>
        <p>{row?.name ? `Customer: ${row.name}` : ""}</p>

        <textarea
          placeholder="Enter rejection reason..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />

        <div className="adm-rejection-modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button className="adm-reject" onClick={handleReject}>
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default RejectionModal;
