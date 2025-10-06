import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RtgsForm.css"; // Plain CSS file

const RtgsForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    beneficiaryName: "",
    accountNumber: "",
    ifsc: "",
    amount: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.beneficiaryName || !formData.accountNumber || !formData.ifsc || !formData.amount) {
      alert("Please fill all fields!");
      return;
    }
    if (parseFloat(formData.amount) < 200000) {
      alert("RTGS is for transactions ₹2,00,000 or more.");
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="rtgs-page-container">
      <div className="rtgs-card">
        <h2 className="rtgs-card-title">RTGS Transfer</h2>

        <form className="rtgs-form" onSubmit={handleSubmit}>
          {/* Beneficiary Name */}
          <div className="rtgs-form-group">
            <label htmlFor="beneficiaryName" className="rtgs-label">Beneficiary Name</label>
            <input
              type="text"
              id="beneficiaryName"
              name="beneficiaryName"
              placeholder="Enter beneficiary name"
              value={formData.beneficiaryName}
              onChange={handleChange}
              className="rtgs-input"
            />
          </div>

          {/* Account Number */}
          <div className="rtgs-form-group">
            <label htmlFor="accountNumber" className="rtgs-label">Account Number</label>
            <input
              type="text"
              id="accountNumber"
              name="accountNumber"
              placeholder="Enter account number"
              value={formData.accountNumber}
              onChange={handleChange}
              className="rtgs-input"
            />
          </div>

          {/* IFSC Code */}
          <div className="rtgs-form-group">
            <label htmlFor="ifsc" className="rtgs-label">IFSC Code</label>
            <input
              type="text"
              id="ifsc"
              name="ifsc"
              placeholder="Enter IFSC code"
              value={formData.ifsc}
              onChange={handleChange}
              className="rtgs-input"
            />
          </div>

          {/* Amount */}
          <div className="rtgs-form-group">
            <label htmlFor="amount" className="rtgs-label">Amount (₹2,00,000+)</label>
            <input
              type="number"
              id="amount"
              name="amount"
              placeholder="Enter amount"
              min={200000}
              value={formData.amount}
              onChange={handleChange}
              className="rtgs-input"
            />
          </div>

          {/* Buttons */}
          <div className="rtgs-buttons">
            <button type="submit" className="rtgs-btn-submit">Submit RTGS</button>
            <button type="button" onClick={() => navigate(-1)} className="rtgs-btn-back">Back</button>
          </div>

          {/* Success Message */}
          {submitted && (
            <div className="rtgs-alert">
              ✅ RTGS Transfer of ₹{formData.amount} has been initiated successfully!
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default RtgsForm;
