import React, { useState } from "react";
import "./Subscriptions.css";

const dummySubs = [
  { id: 1, user: "Ram Kumar", type: "Subscription", amount: "$1000", status: "Pending" },
  { id: 2, user: "Sita Sharma", type: "Redemption", amount: "$500", status: "Pending" },
  { id: 3, user: "Amit Singh", type: "Subscription", amount: "$2000", status: "Approved" },
];

export default function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState(dummySubs);

  const handleApprove = (id) => {
    setSubscriptions(
      subscriptions.map((sub) =>
        sub.id === id ? { ...sub, status: "Approved" } : sub
      )
    );
  };

  const handleReject = (id) => {
    setSubscriptions(
      subscriptions.map((sub) =>
        sub.id === id ? { ...sub, status: "Rejected" } : sub
      )
    );
  };

  return (
    <div className="subs-container">
      <h3 className="subs-title">Subscriptions / Redemptions</h3>

      <div className="subs-card">
        <div className="subs-table-wrapper">
          <table className="subs-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.map((sub) => (
                <tr key={sub.id}>
                  <td>{sub.user}</td>
                  <td>{sub.type}</td>
                  <td>{sub.amount}</td>
                  <td>
                    <span
                      className={`subs-status-badge ${
                        sub.status === "Approved"
                          ? "subs-approved"
                          : sub.status === "Rejected"
                          ? "subs-rejected"
                          : "subs-pending"
                      }`}
                    >
                      {sub.status}
                    </span>
                  </td>
                  <td>
                    {sub.status === "Pending" ? (
                      <div className="subs-actions">
                        <button
                          className="subs-btn-outline subs-btn-success"
                          onClick={() => handleApprove(sub.id)}
                        >
                          Approve
                        </button>
                        <button
                          className="subs-btn-outline subs-btn-danger"
                          onClick={() => handleReject(sub.id)}
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span>-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
