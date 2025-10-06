import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ImpsForm.css"; // Plain CSS

const ImpsForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    accountNumber: "",
    ifsc: "",
    mobileNumber: "",
    mmid: "",
    amount: "",
    remark: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (
      (!formData.accountNumber || !formData.ifsc) &&
      (!formData.mobileNumber || !formData.mmid)
    ) {
      alert(
        "Please provide either Account Number + IFSC OR Mobile Number + MMID"
      );
      return;
    }
    if (!formData.amount) {
      alert("Please enter an amount");
      return;
    }
    if (Number(formData.amount) > 200000) {
      alert(
        "IMPS daily transfer limit is ₹2,00,000. Please enter a smaller amount."
      );
      return;
    }
    if (!formData.name) {
      alert("Please enter the beneficiary name");
      return;
    }

    setSubmitted(true);
  };

  return (
    <div className="imps-page-container">
      <div className="imps-card">
        <h2 className="imps-card-title">IMPS Transfer</h2>

        <form className="imps-form" onSubmit={handleSubmit}>
          {/* Beneficiary Name */}
          <div className="imps-form-group">
            <label htmlFor="name" className="imps-label">Beneficiary Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter beneficiary name"
              value={formData.name}
              onChange={handleChange}
              className="imps-input"
            />
          </div>

          {/* Account + IFSC */}
          <div className="imps-form-group">
            <label htmlFor="accountNumber" className="imps-label">Account Number</label>
            <input
              type="text"
              id="accountNumber"
              name="accountNumber"
              placeholder="Enter account number"
              value={formData.accountNumber}
              onChange={handleChange}
              className="imps-input"
            />
          </div>

          <div className="imps-form-group">
            <label htmlFor="ifsc" className="imps-label">IFSC Code</label>
            <input
              type="text"
              id="ifsc"
              name="ifsc"
              placeholder="Enter IFSC code"
              value={formData.ifsc}
              onChange={handleChange}
              className="imps-input"
            />
          </div>

          <div className="imps-or">OR</div>

          {/* Mobile + MMID */}
          <div className="imps-form-group">
            <label htmlFor="mobileNumber" className="imps-label">Mobile Number</label>
            <input
              type="text"
              id="mobileNumber"
              name="mobileNumber"
              placeholder="Enter mobile number"
              value={formData.mobileNumber}
              onChange={handleChange}
              className="imps-input"
            />
          </div>

          <div className="imps-form-group">
            <label htmlFor="mmid" className="imps-label">MMID</label>
            <input
              type="text"
              id="mmid"
              name="mmid"
              placeholder="Enter MMID"
              value={formData.mmid}
              onChange={handleChange}
              className="imps-input"
            />
          </div>

          {/* Amount */}
          <div className="imps-form-group">
            <label htmlFor="amount" className="imps-label">Amount</label>
            <input
              type="number"
              id="amount"
              name="amount"
              placeholder="Enter amount (max ₹2,00,000)"
              value={formData.amount}
              onChange={handleChange}
              className="imps-input"
            />
          </div>

          {/* Remark */}
          <div className="imps-form-group">
            <label htmlFor="remark" className="imps-label">Remark</label>
            <input
              type="text"
              id="remark"
              name="remark"
              placeholder="Enter remark"
              value={formData.remark}
              onChange={handleChange}
              className="imps-input"
            />
          </div>

          {/* Buttons */}
          <div className="imps-buttons">
            <button type="submit" className="imps-btn-submit">Submit IMPS</button>
            <button type="button" onClick={() => navigate(-1)} className="imps-btn-back">Back</button>
          </div>

          {/* Success message */}
          {submitted && (
            <div className="imps-alert">
              ✅ IMPS Transfer of ₹{formData.amount} to {formData.name} has been initiated successfully!
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ImpsForm;
