

import React, { useState } from "react";
import "./style/loanForm.css";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();
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
              ✅ Your Car Loan Application has been submitted successfully!
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="form-container">
      <h2 className="form-title">🚗 Car Loan Application Form</h2>

      <form className="loan-form" onSubmit={handleSubmit}>
        {/* Personal Details */}
        <h5 className="section-title">Personal Details</h5>
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
              type="text"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>PAN / Aadhaar Number</label>
            <input
              type="text"
              name="panAadhaar"
              value={formData.panAadhaar}
              onChange={handleChange}
              required
            />
          </div>

          <div className="full-width">
            <label>Current Address</label>
            <textarea
              name="address"
              rows="2"
              value={formData.address}
              onChange={handleChange}
              required
            ></textarea>
          </div>
        </div>

        {/* Employment & Income */}
        <h5 className="section-title">Employment & Income</h5>
        <div className="grid">
          <div>
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
        <h5 className="section-title">Vehicle Details</h5>
        <div className="grid">
          <div>
            <label>Car Make & Model</label>
            <input
              type="text"
              name="carModel"
              value={formData.carModel}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Variant / Fuel Type</label>
            <input
              type="text"
              name="variantFuel"
              value={formData.variantFuel}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Ex-Showroom Price (₹)</label>
            <input
              type="number"
              name="exShowroomPrice"
              value={formData.exShowroomPrice}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>On-Road Price (₹)</label>
            <input
              type="number"
              name="onRoadPrice"
              value={formData.onRoadPrice}
              onChange={handleChange}
            />
          </div>

          <div className="full-width">
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
        <h5 className="section-title">Loan Details</h5>
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
            <label>Down Payment (₹)</label>
            <input
              type="number"
              name="downPayment"
              value={formData.downPayment}
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
              required
            />
          </div>
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
           <button type="button" className="btn-submit" onClick={() => navigate(-1)}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default CarLoanForm;
