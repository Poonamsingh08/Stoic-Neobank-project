import React, { useState } from "react";
import "./style/LoanApplicationForm.css"; // Custom CSS
 import { useNavigate } from "react-router-dom";

function LoanApplicationForm() {
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
    coApplicantName: "",
    relationship: "",
    coApplicantIncome: "",
    loanType: "",
    loanAmount: "",
    tenure: "",
    purpose: "",
    goldType: "",
    goldWeight: "",
    goldPurity: "",
    idProof: "",
    addressProof: null,
    incomeProof: null,
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
 
  const navigate = useNavigate();

  const goldPricePerGram = 6000;
  const ltv = 0.75;

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    setFormData({ ...formData, [name]: type === "file" ? files[0] : value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const calculateLoanAmount = () => {
    if (!formData.goldWeight || !formData.goldPurity) return formData.loanAmount || 0;
    const purityFactor = parseFloat(formData.goldPurity) / 24;
    const goldValue = parseFloat(formData.goldWeight) * purityFactor * goldPricePerGram;
    return Math.floor(goldValue * ltv);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.applicantName.trim()) newErrors.applicantName = "Full name is required";
    if (!formData.dob) newErrors.dob = "Date of birth is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.contact.trim()) newErrors.contact = "Contact number is required";
    else if (!/^\d{10}$/.test(formData.contact)) newErrors.contact = "Contact number must be 10 digits";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.loanType) newErrors.loanType = "Loan type is required";
    if (!formData.loanAmount && formData.loanType !== "Gold Loan") newErrors.loanAmount = "Loan amount is required";
    if (!formData.tenure) newErrors.tenure = "Tenure is required";
    if (!formData.purpose.trim()) newErrors.purpose = "Purpose is required";
    if (!formData.idProof) newErrors.idProof = "ID proof is required";
    if (!formData.addressProof) newErrors.addressProof = "Address proof is required";
    if (!formData.incomeProof) newErrors.incomeProof = "Income proof is required";

    if (formData.coApplicantName && !/^[A-Za-z ]+$/.test(formData.coApplicantName))
      newErrors.coApplicantName = "Co-applicant name must contain only letters";
    if (formData.relationship && !/^[A-Za-z ]+$/.test(formData.relationship))
      newErrors.relationship = "Relationship must contain only letters";

    if (formData.loanType === "Gold Loan") {
      if (!formData.goldType) newErrors.goldType = "Gold type is required";
      if (!formData.goldWeight || parseFloat(formData.goldWeight) <= 0) newErrors.goldWeight = "Valid gold weight is required";
      if (!formData.goldPurity) newErrors.goldPurity = "Gold purity is required";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) setErrors(validationErrors);
    else setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="form-container">
        <div className="form-card">
          <div className="alert success">
            ✅ Your Loan Application has been submitted successfully!
          </div>
          <p>Applicant: <strong>{formData.applicantName}</strong></p>
          {formData.loanType === "Gold Loan" && (
            <p>Eligible Loan Amount: <strong>₹{calculateLoanAmount().toLocaleString()}</strong></p>
          )}
          <button className="submit-btn" onClick={() => setSubmitted(false)}>Submit Another Application</button>
        </div>
      </div>
    );
  }

  return (
    <div className="form-container">
      <h2 className="form-title">Loan Application Form</h2>
      <form className="form-card" onSubmit={handleSubmit}>
        {/* Applicant Details */}
        <h4 className="form-section-title">Applicant Details</h4>
        <div className="form-row">
          <div className="form-group">
            <label>Full Name *</label>
            <input type="text" name="applicantName" value={formData.applicantName} onChange={handleChange} />
            {errors.applicantName && <p className="error">{errors.applicantName}</p>}
          </div>
          <div className="form-group">
            <label>Date of Birth *</label>
            <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
            {errors.dob && <p className="error">{errors.dob}</p>}
          </div>
          <div className="form-group">
            <label>Gender *</label>
            <select name="gender" value={formData.gender} onChange={handleChange}>
              <option value="">Select</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
            {errors.gender && <p className="error">{errors.gender}</p>}
          </div>
        </div>

        {/* Contact & Address */}
        <div className="form-row">
          <div className="form-group">
            <label>Contact Number *</label>
            <input type="tel" name="contact" value={formData.contact} onChange={handleChange} />
            {errors.contact && <p className="error">{errors.contact}</p>}
          </div>
          <div className="form-group">
            <label>Email ID</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
          </div>
        </div>

        <div className="form-group">
          <label>Address *</label>
          <textarea name="address" rows="2" value={formData.address} onChange={handleChange}></textarea>
          {errors.address && <p className="error">{errors.address}</p>}
        </div>

        {/* Loan Details */}
        <h4 className="form-section-title">Loan Details</h4>
        <div className="form-row">
          <div className="form-group">
            <label>Loan Type *</label>
            <select name="loanType" value={formData.loanType} onChange={handleChange}>
              <option value="">Select</option>
              <option>Personal Loan</option>
              <option>Home Loan</option>
              <option>Car Loan</option>
              <option>Education Loan</option>
              <option>Business Loan</option>
              <option>Gold Loan</option>
            </select>
            {errors.loanType && <p className="error">{errors.loanType}</p>}
          </div>
          {formData.loanType !== "Gold Loan" && (
            <div className="form-group">
              <label>Loan Amount (₹) *</label>
              <input type="number" name="loanAmount" value={formData.loanAmount} onChange={handleChange} />
              {errors.loanAmount && <p className="error">{errors.loanAmount}</p>}
            </div>
          )}
          <div className="form-group">
            <label>Tenure (Months) *</label>
            <input type="number" name="tenure" value={formData.tenure} onChange={handleChange} />
            {errors.tenure && <p className="error">{errors.tenure}</p>}
          </div>
        </div>

        {formData.loanType === "Gold Loan" && (
          <>
            <h4>Gold Loan Details</h4>
            <div className="form-row">
              <div className="form-group">
                <label>Gold Type *</label>
                <select name="goldType" value={formData.goldType} onChange={handleChange}>
                  <option value="">Select</option>
                  <option>Jewellery</option>
                  <option>Coins</option>
                  <option>Bullion</option>
                </select>
                {errors.goldType && <p className="error">{errors.goldType}</p>}
              </div>
              <div className="form-group">
                <label>Gold Weight (grams) *</label>
                <input type="number" name="goldWeight" value={formData.goldWeight} onChange={handleChange} />
                {errors.goldWeight && <p className="error">{errors.goldWeight}</p>}
              </div>
              <div className="form-group">
                <label>Gold Purity (K) *</label>
                <select name="goldPurity" value={formData.goldPurity} onChange={handleChange}>
                  <option value="">Select</option>
                  <option value="18">18K</option>
                  <option value="22">22K</option>
                  <option value="24">24K</option>
                </select>
                {errors.goldPurity && <p className="error">{errors.goldPurity}</p>}
              </div>
            </div>
            {formData.goldWeight && formData.goldPurity && (
              <div className="alert info">
                Eligible Loan Amount: <strong>₹{calculateLoanAmount().toLocaleString()}</strong>
              </div>
            )}
          </>
        )}

        <div className="form-group">
          <label>Purpose of Loan *</label>
          <input type="text" name="purpose" value={formData.purpose} onChange={handleChange} />
          {errors.purpose && <p className="error">{errors.purpose}</p>}
        </div>

        {/* Documents */}
        <h4 className="form-section-title">Documents</h4>
        <div className="form-row">
          <div className="form-group">
            <label>ID Proof *</label>
            <select name="idProof" value={formData.idProof} onChange={handleChange}>
              <option value="">Select</option>
              <option>Aadhar Card</option>
              <option>PAN Card</option>
              <option>Passport</option>
              <option>Voter ID</option>
              <option>Driving License</option>
            </select>
            {errors.idProof && <p className="error">{errors.idProof}</p>}
          </div>
          <div className="form-group">
            <label>Upload Address Proof *</label>
            <input type="file" name="addressProof" onChange={handleChange} />
            {errors.addressProof && <p className="error">{errors.addressProof}</p>}
          </div>
          <div className="form-group">
            <label>Upload Income Proof *</label>
            <input type="file" name="incomeProof" onChange={handleChange} />
            {errors.incomeProof && <p className="error">{errors.incomeProof}</p>}
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn">Submit Application</button>
          <button  onClick={()=>navigate(-1)} className="submit-btn">Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default LoanApplicationForm;
