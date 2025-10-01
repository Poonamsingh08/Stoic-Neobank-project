
import React, { useState } from "react";
import "./style/loanForm.css";

function GoldLoanForm() {
  const [formData, setFormData] = useState({
    applicantName: "",
    dob: "",
    gender: "",
    contact: "",
    email: "",
    address: "",
    goldType: "",
    goldWeight: "",
    goldPurity: "",
    tenure: "",
    idProof: "",
    addressProof: null,
  });

  const [submitted, setSubmitted] = useState(false);

  const goldPricePerGram = 6000;
  const ltv = 0.75;

  const calculateLoanAmount = () => {
    if (!formData.goldWeight || !formData.goldPurity) return 0;
    const purityFactor = parseFloat(formData.goldPurity) / 24;
    const goldValue =
      parseFloat(formData.goldWeight) * purityFactor * goldPricePerGram;
    return Math.floor(goldValue * ltv);
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
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
            ✅ Gold Loan Application Submitted! <br />
            Eligible Loan Amount: ₹{calculateLoanAmount().toLocaleString()}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="loan-form-container">
      <h2 className="loan-form-title">Gold Loan Application Form</h2>
      <div className="loan-form-card">
        <form onSubmit={handleSubmit}>
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

          {/* Gold Details */}
          <h5 className="loan-form-section">Gold Details</h5>
          <div className="form-row">
            <div className="form-group">
              <label>Gold Type</label>
              <select
                name="goldType"
                value={formData.goldType}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option>Jewellery</option>
                <option>Coins</option>
                <option>Bullion</option>
              </select>
            </div>
            <div className="form-group">
              <label>Gold Weight (grams)</label>
              <input
                type="number"
                name="goldWeight"
                value={formData.goldWeight}
                onChange={handleChange}
                min="1"
                required
              />
            </div>
            <div className="form-group">
              <label>Purity (karat)</label>
              <select
                name="goldPurity"
                value={formData.goldPurity}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="18">18K</option>
                <option value="22">22K</option>
                <option value="24">24K</option>
              </select>
            </div>
          </div>

          {/* Loan Calculation */}
          <div className="loan-success" style={{ background: "#900603", color: "#fff" }}>
            <strong>Eligible Loan Amount:</strong> ₹
            {calculateLoanAmount().toLocaleString()}
          </div>

          {/* Tenure */}
          <div className="form-row">
            <div className="form-group">
              <label>Tenure (months)</label>
              <input
                type="number"
                name="tenure"
                value={formData.tenure}
                onChange={handleChange}
                min="1"
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

          <div className="form-group">
            <label>Upload Address Proof</label>
            <input type="file" name="addressProof" onChange={handleChange} />
          </div>

          {/* Submit */}
          <div className="form-submit">
            <button type="submit" className="loan-submit-btn">
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default GoldLoanForm;
