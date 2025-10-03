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
      <div className="loan-form-container">
        <div className="loan-success">
          ✅ Your Home Loan Application has been submitted successfully!
        </div>
      </div>
    );
  }

  return (
    <div className="loan-form-container">
      <h2 className="loan-form-title">Home Loan Application Form</h2>

      <form onSubmit={handleSubmit} className="loan-form-card">
        {/* Personal Details */}
        <h4 className="loan-form-section">Personal Details</h4>
        <div className="form-row">
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
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

        <div className="form-row">
          <div className="form-group">
            <label>Email ID</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
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

        <div className="form-group">
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
        <h4 className="loan-form-section">Employment & Income</h4>
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
            </select>
          </div>
          <div className="form-group">
            <label>Company / Business Name</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Monthly Income (₹)</label>
            <input
              type="number"
              name="monthlyIncome"
              value={formData.monthlyIncome}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
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
        <h4 className="loan-form-section">Property Details</h4>
        <div className="form-row">
          <div className="form-group">
            <label>Property Type</label>
            <input
              type="text"
              name="propertyType"
              value={formData.propertyType}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              name="propertyLocation"
              value={formData.propertyLocation}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Property Value (₹)</label>
            <input
              type="number"
              name="propertyValue"
              value={formData.propertyValue}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Builder / Seller Name</label>
          <input
            type="text"
            name="builderName"
            value={formData.builderName}
            onChange={handleChange}
          />
        </div>

        {/* Loan Details */}
        <h4 className="loan-form-section">Loan Details</h4>
        <div className="form-row">
          <div className="form-group">
            <label>Loan Amount (₹)</label>
            <input
              type="number"
              name="loanAmount"
              value={formData.loanAmount}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
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
        <h4 className="loan-form-section">Co-Applicant (Optional)</h4>
        <div className="form-row">
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="coApplicantName"
              value={formData.coApplicantName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Relationship</label>
            <input
              type="text"
              name="relationship"
              value={formData.relationship}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
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
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="declaration"
              checked={formData.declaration}
              onChange={handleChange}
              required
            />{" "}
            I hereby declare that the information provided is true and correct.
          </label>
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

export default HomeLoanForm;
