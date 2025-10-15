

import React, { useState } from "react";
import "./style/loanForm.css";
import { useNavigate } from "react-router-dom";

function EducationLoanForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    mobileNumber: "",
    email: "",
    panAadhaar: "",
    address: "",
    courseName: "",
    courseType: "",
    instituteName: "",
    instituteAddress: "",
    courseDuration: "",
    annualFees: "",
    loanAmount: "",
    tenure: "",
    purpose: "",
    coApplicantName: "",
    relationship: "",
    coApplicantOccupation: "",
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
  const navigate = useNavigate();
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
              ✅ Your Education Loan Application has been submitted successfully!
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="form-container">
      <h2 className="form-title">🎓 Education Loan Application Form</h2>

      <form onSubmit={handleSubmit} className="loan-form">
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
              type="tel"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              placeholder="10-digit number"
              pattern="[0-9]{10}"
              required
            />
          </div>

          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
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
        </div>

        {/* Course & Institute Details */}
        <h5 className="section-title">Course & Institute Details</h5>
        <div className="grid">
          <div>
            <label>Course Name</label>
            <input
              type="text"
              name="courseName"
              value={formData.courseName}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Course Type</label>
            <select
              name="courseType"
              value={formData.courseType}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option>Undergraduate</option>
              <option>Postgraduate</option>
              <option>Diploma</option>
              <option>PhD</option>
            </select>
          </div>

          <div>
            <label>Institute / University Name</label>
            <input
              type="text"
              name="instituteName"
              value={formData.instituteName}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Institute Address</label>
            <input
              type="text"
              name="instituteAddress"
              value={formData.instituteAddress}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Course Duration (Years)</label>
            <input
              type="number"
              name="courseDuration"
              value={formData.courseDuration}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Annual Fees (₹)</label>
            <input
              type="number"
              name="annualFees"
              value={formData.annualFees}
              onChange={handleChange}
              required
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
            <label>Purpose (Tuition, Hostel, Books, etc.)</label>
            <input
              type="text"
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Co-Applicant Details */}
        <h5 className="section-title">Co-Applicant / Parent Details</h5>
        <div className="grid">
          <div>
            <label>Co-Applicant Full Name</label>
            <input
              type="text"
              name="coApplicantName"
              value={formData.coApplicantName}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Relationship</label>
            <select
              name="relationship"
              value={formData.relationship}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option>Father</option>
              <option>Mother</option>
              <option>Guardian</option>
            </select>
          </div>

          <div>
            <label>Occupation</label>
            <input
              type="text"
              name="coApplicantOccupation"
              value={formData.coApplicantOccupation}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Annual Income (₹)</label>
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

export default EducationLoanForm;

