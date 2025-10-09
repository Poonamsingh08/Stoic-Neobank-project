import React, { useState } from "react";
import "./style/loanForm.css";

function HomeLoanForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    mobileNumber: "",
    email: "",
    panAadhaar: "",
    address: "",
    occupation: "",
    company: "",
    monthlyIncome: "",
    workExperience: "",
    propertyType: "",
    propertyLocation: "",
    propertyValue: "",
    builderName: "",
    loanAmount: "",
    tenure: "",
    coApplicantName: "",
    relationship: "",
    coApplicantIncome: "",
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
              ✅ Your Home Loan Application has been submitted successfully!
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="form-container">
      <h2 className="form-title">Home Loan Application Form</h2>

      <form onSubmit={handleSubmit} className="loan-form">
        {/* Personal Details */}
        <h4 className="section-title">Personal Details</h4>
        <div className="grid">
          <div>
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
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
            <label>Mobile Number</label>
            <input
              type="tel"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              placeholder="10-digit number"
              pattern="[0-9]{10}"
              required
            />
          </div>
        </div>

        <div className="grid">
          <div>
            <label>Email ID</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>PAN / Aadhaar</label>
            <input
              type="text"
              name="panAadhaar"
              value={formData.panAadhaar}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="full-width">
          <label>Address</label>
          <textarea
            name="address"
            rows="2"
            value={formData.address}
            onChange={handleChange}
            required
          ></textarea>
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
              name="monthlyIncome"
              value={formData.monthlyIncome}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Work Exp (Years)</label>
            <input
              type="number"
              name="workExperience"
              value={formData.workExperience}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Property Details */}
        <h4 className="section-title">Property Details</h4>
        <div className="grid">
          <div>
            <label>Property Type</label>
            <input
              type="text"
              name="propertyType"
              value={formData.propertyType}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Location</label>
            <input
              type="text"
              name="propertyLocation"
              value={formData.propertyLocation}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Property Value (₹)</label>
            <input
              type="number"
              name="propertyValue"
              value={formData.propertyValue}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="full-width">
          <label>Builder / Seller Name</label>
          <input
            type="text"
            name="builderName"
            value={formData.builderName}
            onChange={handleChange}
          />
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
            />
          </div>
          <div>
            <label>Tenure (Months)</label>
            <input
              type="number"
              name="tenure"
              value={formData.tenure}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Co-Applicant */}
        <h4 className="section-title">Co-Applicant (Optional)</h4>
        <div className="grid">
          <div>
            <label>Full Name</label>
            <input
              type="text"
              name="coApplicantName"
              value={formData.coApplicantName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Relationship</label>
            <input
              type="text"
              name="relationship"
              value={formData.relationship}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Monthly Income (₹)</label>
            <input
              type="number"
              name="coApplicantIncome"
              value={formData.coApplicantIncome}
              onChange={handleChange}
            />
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
          <label>
            I hereby declare that the information provided is true and correct.
          </label>
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

export default HomeLoanForm;
