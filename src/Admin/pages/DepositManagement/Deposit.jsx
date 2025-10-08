import React, { useState } from "react";
import styles from "./Deposit.module.css";

const Deposit = () => {
  const [activeTab, setActiveTab] = useState("deposits");

  const sampleData = [
    { id: 1, name: "John Doe", amount: "₹50,000", rate: "6%", status: "approved" },
    { id: 2, name: "Jane Smith", amount: "₹40,000", rate: "5.5%", status: "pending" },
  ];

  return (
    <div className={styles["adm-container"]}>
      <h1 className={styles["adm-title"]}>Deposit Management</h1>

      {/* Tabs */}
      <div className={styles["adm-tabs"]}>
        {["deposits", "maturities", "early-withdrawals"].map((tab) => (
          <button
            key={tab}
            className={`${styles["adm-tabButton"]} ${activeTab === tab ? styles["adm-activeTab"] : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.replace("-", " ").toUpperCase()}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className={styles["adm-filters"]}>
        <input className={styles["adm-input"]} type="text" placeholder="Search customer..." />
        <select className={styles["adm-select"]}>
          <option>All Statuses</option>
          <option>Pending</option>
          <option>Approved</option>
          <option>Rejected</option>
        </select>
      </div>

      {/* Table */}
      <div className={styles["adm-tableCard"]}>
        <table className={styles["adm-table"]}>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Amount</th>
              <th>Rate</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sampleData.map((row) => (
              <tr key={row.id}>
                <td>{row.name}</td>
                <td>{row.amount}</td>
                <td>{row.rate}</td>
                <td>
                  <span className={`${styles["adm-status"]} ${styles[`adm-${row.status}`]}`}>
                    {row.status}
                  </span>
                </td>
                <td>
                  <div className={styles["adm-actions"]}>
                    <button className={styles["adm-actionBtn"]}>View</button>
                    <button className={styles["adm-actionBtn"]}>Approve</button>
                    <button className={styles["adm-actionBtn"]}>Reject</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className={styles["adm-pagination"]}>
        <button className={styles["adm-pageBtn"]}>Prev</button>
        <button className={`${styles["adm-pageBtn"]} ${styles["adm-activePage"]}`}>1</button>
        <button className={styles["adm-pageBtn"]}>2</button>
        <button className={styles["adm-pageBtn"]}>Next</button>
      </div>
    </div>
  );
};

export default Deposit;
