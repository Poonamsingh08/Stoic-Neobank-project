import React, { useState } from "react";
import "./style/loanForm.css";

function CarLoanForm() {
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
    carModel: "",
    variantFuel: "",
    exShowroomPrice: "",
    onRoadPrice: "",
    dealerName: "",
    loanAmount: "",
    downPayment: "",
    tenure: "",
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
      <div className="loan-form-container">
        <div className="loan-form-card">
          <div className="loan-success">
            ✅ Your Car Loan Application has been submitted successfully!
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="loan-form-container">
      <h2 className="loan-form-title">🚗 Car Loan Application Form</h2>

      <form className="loan-form-card" onSubmit={handleSubmit}>
        {/* Personal Details */}
        <h5 className="loan-form-section">Personal Details</h5>
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
              type="text"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>PAN / Aadhaar Number</label>
            <input
              type="text"
              name="panAadhaar"
              value={formData.panAadhaar}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Current Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
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
              <option value="">Select Occupation</option>
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
            <label>Work Experience (Years)</label>
            <input
              type="number"
              name="workExperience"
              value={formData.workExperience}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Vehicle Details */}
        <h5 className="loan-form-section">Vehicle Details</h5>
        <div className="form-row">
          <div className="form-group">
            <label>Car Make & Model</label>
            <input
              type="text"
              name="carModel"
              value={formData.carModel}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Variant / Fuel Type</label>
            <input
              type="text"
              name="variantFuel"
              value={formData.variantFuel}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Ex-Showroom Price (₹)</label>
            <input
              type="number"
              name="exShowroomPrice"
              value={formData.exShowroomPrice}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>On-Road Price (₹)</label>
            <input
              type="number"
              name="onRoadPrice"
              value={formData.onRoadPrice}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Dealer Name</label>
            <input
              type="text"
              name="dealerName"
              value={formData.dealerName}
              onChange={handleChange}
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
            <label>Down Payment (₹)</label>
            <input
              type="number"
              name="downPayment"
              value={formData.downPayment}
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
              required
            />
          </div>
        </div>

        {/* Declaration */}
        <div className="form-group">
          <label>
            <input type="checkbox" required /> I hereby declare that the
            information provided is true and correct.
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

export default CarLoanForm;
