import React, { useState } from "react";
import styles from "./ApprovalModal.module.css"; // 👈 Scoped import

const ApprovalModal = ({ row, onClose, onConfirm }) => {
  const initialRate = (row?.rate || "").toString().replace("%", "");
  const initialTenure = (row?.tenure || "").toString();

  const [rate, setRate] = useState(initialRate);
  const [tenure, setTenure] = useState(initialTenure);

  const handleConfirm = () => {
    const payload = { rate: rate ? `${rate}%` : undefined, tenure };
    if (onConfirm) {
      onConfirm(payload);
    } else {
      alert(`Approved ${row?.name} with ${payload.rate} / ${payload.tenure}`);
      onClose();
    }
  };

  return (
    <div className={styles["adm-modalBackdrop"]}>
      <div className={styles["adm-modal"]}>
        <h3>Approve Request</h3>
        <p>{row?.name ? `Customer: ${row.name}` : "Customer details unavailable"}</p>

        <input
          type="text"
          placeholder="Interest Rate (%)"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
        />
        <input
          type="text"
          placeholder="Tenure"
          value={tenure}
          onChange={(e) => setTenure(e.target.value)}
        />

        <div className={styles["adm-modalActions"]}>
          <button className={styles["adm-cancel"]} onClick={onClose}>Cancel</button>
          <button className={styles["adm-approve"]} onClick={handleConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default ApprovalModal;
