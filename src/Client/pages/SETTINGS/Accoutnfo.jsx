import React from "react";
import "./AccountInfo.css";

const accountInfo = [
  { label: "Account Status", value: "Active", status: "success" },
  { label: "Last Login", value: "Today, 10:30 AM", status: "muted" },
  { label: "KYC Status", value: "Verified", status: "success" },
  { label: "Mobile Verified", value: "Yes", status: "success" },
  { label: "Two-Factor Auth", value: "Disabled", status: "danger" },
  { label: "Email Verified", value: "Yes", status: "success" },
];

const AccountInfo = () => {
  return (
    <div className="account-info-page">
      <div className="account-info-container">
        <h5 className="account-info-header">Account Information</h5>
        <p className="account-info-subtitle">
          Overview of your account settings and status
        </p>

        <div className="account-info-grid">
          {accountInfo.map((item, index) => (
            <div className="account-info-card" key={index}>
              <span className="account-label">{item.label}</span>
              <span
                className={
                  item.status === "success"
                    ? "account-value success"
                    : item.status === "danger"
                    ? "account-value danger"
                    : "account-value muted"
                }
              >
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
