import React, { useState } from "react";
import "./style/loanForm.css";

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
    declaration: false,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
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
              ✅ Personal Loan Application Submitted! <br />
              Name: {formData.applicantName}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="form-container">
      <form className="loan-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Personal Loan Application Form</h2>

        {/* Applicant Details */}
        <h4 className="section-title">Applicant Details</h4>
        <div className="grid">
          <div>
            <label>Full Name</label>
            <input
              type="text"
              name="applicantName"
              value={formData.applicantName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </div>
          <div>
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
          <div>
            <label>Contact Number</label>
            <input
              type="tel"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="10-digit number"
              pattern="[0-9]{10}"
              required
            />
          </div>
          <div>
            <label>Email ID</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="full-width">
            <label>Address</label>
            <textarea
              rows={2}
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Employment & Income */}
        <h4 className="section-title">Employment & Income</h4>
        <div className="grid">
          <div>
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
          <div>
            <label>Company / Business Name</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Monthly Income (₹)</label>
            <input
              type="number"
              name="income"
              value={formData.income}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Loan Details */}
        <h4 className="section-title">Loan Details</h4>
        <div className="grid">
          <div>
            <label>Loan Amount (₹)</label>
            <input
              type="number"
              name="loanAmount"
              value={formData.loanAmount}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Tenure (Months)</label>
            <input
              type="number"
              name="tenure"
              value={formData.tenure}
              onChange={handleChange}
              required
            />
          </div>
          <div className="full-width">
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
        <h4 className="section-title">Documents</h4>
        <div className="grid">
          <div className="full-width">
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
        </div>

        {/* Declaration */}
        <div className="loan-checkbox">
          <input
            type="checkbox"
            name="declaration"
            checked={formData.declaration}
            onChange={handleChange}
            required
          />
          <span >I hereby declare that the information provided is true and correct.</span>
        </div>

        {/* Submit */}
        <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
          <button type="submit" className="btn-submit">
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
}

export default PersonalLoanForm;
