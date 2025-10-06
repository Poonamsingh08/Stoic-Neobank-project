
 import React, { useState } from "react";
import "./style/loanForm.css"; // Import CSS file

function PersonalLoanForm() {
  const [formData, setFormData] = useState({
    applicantName: "",
    dob: "",
    gender: "",
    contact: "",
    email: "",
    address: "",
    occupation: "",
    company: "",
    income: "",
    loanAmount: "",
    tenure: "",
    purpose: "",
    idProof: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="loan-form-container">
      <h2 className="loan-form-title">Personal Loan Application Form</h2>

      {submitted && (
        <div className="loan-success">
          ✅ Personal Loan Application Submitted! <br />
          Name: {formData.applicantName}
        </div>
      )}

      <form onSubmit={handleSubmit} className="loan-form-card">
        {/* Applicant Details */}
        <h5 className="loan-form-section">Applicant Details</h5>
        <div className="form-row">
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="applicantName"
              value={formData.applicantName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Contact Number</label>
            <input
              type="tel"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              pattern="[0-9]{10}"
              placeholder="10-digit number"
              required
            />
          </div>
          <div className="form-group">
            <label>Email ID</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Address</label>
          <textarea
            rows={2}
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        {/* Employment & Income */}
        <h5 className="loan-form-section">Employment & Income</h5>
        <div className="form-row">
          <div className="form-group">
            <label>Occupation</label>
            <select
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option>Salaried</option>
              <option>Self-Employed</option>
              <option>Business</option>
              <option>Other</option>
            </select>
          </div>
          <div className="form-group">
            <label>Company / Business Name</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Monthly Income (₹)</label>
            <input
              type="number"
              name="income"
              value={formData.income}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Loan Details */}
        <h5 className="loan-form-section">Loan Details</h5>
        <div className="form-row">
          <div className="form-group">
            <label>Loan Amount (₹)</label>
            <input
              type="number"
              name="loanAmount"
              value={formData.loanAmount}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Tenure (Months)</label>
            <input
              type="number"
              name="tenure"
              value={formData.tenure}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Purpose of Loan</label>
            <input
              type="text"
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
              placeholder="e.g. Wedding, Travel, Medical"
              required
            />
          </div>
        </div>

        {/* Documents */}
        <h5 className="loan-form-section">Documents</h5>
        <div className="form-group">
          <label>Identity Proof</label>
          <select
            name="idProof"
            value={formData.idProof}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option>Aadhar Card</option>
            <option>PAN Card</option>
            <option>Passport</option>
            <option>Voter ID</option>
            <option>Driving License</option>
          </select>
        </div>

        {/* Submit */}
        <div className="form-submit">
          <button type="submit" className="loan-submit-btn">
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
}

export default PersonalLoanForm;
