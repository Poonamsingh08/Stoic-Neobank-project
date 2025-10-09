
import React, { useState } from "react";
import "./style/loanForm.css"

function BusinessLoanForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    panAadhaar: "",
    mobileNumber: "",
    email: "",
    address: "",
    businessName: "",
    businessType: "",
    registrationNumber: "",
    yearsInBusiness: "",
    businessAddress: "",
    annualTurnover: "",
    netProfit: "",
    existingLoans: "",
    emiObligations: "",
    loanAmount: "",
    tenure: "",
    purpose: "",
    collateral: "",
    guarantorName: "",
    guarantorRelationship: "",
    guarantorOccupation: "",
    guarantorIncome: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="form-container">
        <div className="card">
          <div className="card-body">
            <div className="alert success">
              ✅ Your Business Loan Application has been submitted successfully!
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="form-container">
      <h2 className="form-title">🏢 Business Loan Application Form</h2>

      <form className="loan-form" onSubmit={handleSubmit}>
        {/* Applicant Details */}
        <h5 className="section-title">Applicant Details</h5>
        <div className="grid">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="panAadhaar"
            placeholder="PAN / Aadhaar Number"
            value={formData.panAadhaar}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="mobileNumber"
            placeholder="Mobile Number"
            value={formData.mobileNumber}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Current Address"
            className="full-width"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        {/* Business Details */}
        <h5 className="section-title">Business Details</h5>
        <div className="grid">
          <input
            type="text"
            name="businessName"
            placeholder="Business Name"
            value={formData.businessName}
            onChange={handleChange}
            required
          />
          <select
            name="businessType"
            value={formData.businessType}
            onChange={handleChange}
            required
          >
            <option value="">Business Type</option>
            <option>Proprietorship</option>
            <option>Partnership</option>
            <option>Private Limited</option>
            <option>LLP</option>
          </select>
          <input
            type="text"
            name="registrationNumber"
            placeholder="Business Registration / GST Number"
            value={formData.registrationNumber}
            onChange={handleChange}
          />
          <input
            type="number"
            name="yearsInBusiness"
            placeholder="Years in Business"
            value={formData.yearsInBusiness}
            onChange={handleChange}
          />
          <input
            type="text"
            name="businessAddress"
            placeholder="Business Address"
            className="full-width"
            value={formData.businessAddress}
            onChange={handleChange}
          />
        </div>

        {/* Financial Details */}
        <h5 className="section-title">Financial Details</h5>
        <div className="grid">
          <input
            type="number"
            name="annualTurnover"
            placeholder="Annual Turnover (₹)"
            value={formData.annualTurnover}
            onChange={handleChange}
          />
          <input
            type="number"
            name="netProfit"
            placeholder="Net Profit (₹)"
            value={formData.netProfit}
            onChange={handleChange}
          />
          <input
            type="text"
            name="existingLoans"
            placeholder="Existing Loans (if any)"
            value={formData.existingLoans}
            onChange={handleChange}
          />
          <input
            type="number"
            name="emiObligations"
            placeholder="EMI Obligations (₹)"
            value={formData.emiObligations}
            onChange={handleChange}
          />
        </div>

        {/* Loan Requirements */}
        <h5 className="section-title">Loan Requirements</h5>
        <div className="grid">
          <input
            type="number"
            name="loanAmount"
            placeholder="Loan Amount Required (₹)"
            value={formData.loanAmount}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="tenure"
            placeholder="Tenure (Months)"
            value={formData.tenure}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="purpose"
            placeholder="Purpose of Loan"
            className="full-width"
            value={formData.purpose}
            onChange={handleChange}
            required
          />
        </div>

        {/* Collateral */}
        <h5 className="section-title">Collateral / Security</h5>
        <input
          type="text"
          name="collateral"
          placeholder="Collateral Details"
          className="full-width"
          value={formData.collateral}
          onChange={handleChange}
        />

        {/* Guarantor */}
        <h5 className="section-title">Guarantor Details</h5>
        <div className="grid">
          <input
            type="text"
            name="guarantorName"
            placeholder="Guarantor Full Name"
            value={formData.guarantorName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="guarantorRelationship"
            placeholder="Relationship with Applicant"
            value={formData.guarantorRelationship}
            onChange={handleChange}
          />
          <input
            type="text"
            name="guarantorOccupation"
            placeholder="Guarantor Occupation"
            value={formData.guarantorOccupation}
            onChange={handleChange}
          />
          <input
            type="number"
            name="guarantorIncome"
            placeholder="Guarantor Annual Income (₹)"
            value={formData.guarantorIncome}
            onChange={handleChange}
          />
        </div>

        {/* Declaration */}
        <div className="loan-checkbox">
          <input type="checkbox" required />
          <label>
            I hereby declare that the information provided is true and correct.
          </label>
        </div>

        {/* Submit */}
        <div className="text-center">
          <button type="submit" className="btn-submit">
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
}

export default BusinessLoanForm;
