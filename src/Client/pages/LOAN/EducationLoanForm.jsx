import React, { useState } from "react";
import "./style/loanForm.css";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="loan-form-container">
        <div className="loan-success">
          ✅ Your Education Loan Application has been submitted successfully!
        </div>
      </div>
    );
  }

  return (
    <div className="loan-form-container">
      <h2 className="loan-form-title">🎓 Education Loan Application Form</h2>

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
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
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

        {/* Course & Institute Details */}
        <h4 className="loan-form-section">Course & Institute Details</h4>
        <div className="form-row">
          <div className="form-group">
            <label>Course Name</label>
            <input
              type="text"
              name="courseName"
              value={formData.courseName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
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
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Institute / University Name</label>
            <input
              type="text"
              name="instituteName"
              value={formData.instituteName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Institute Address</label>
            <input
              type="text"
              name="instituteAddress"
              value={formData.instituteAddress}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Course Duration (Years)</label>
            <input
              type="number"
              name="courseDuration"
              value={formData.courseDuration}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
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
        <h4 className="loan-form-section">Loan Details</h4>
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
        </div>

        <div className="form-group">
          <label>Purpose (Tuition, Hostel, Books, etc.)</label>
          <input
            type="text"
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            required
          />
        </div>

        {/* Co-Applicant Details */}
        <h4 className="loan-form-section">Co-Applicant / Parent Details</h4>
        <div className="form-row">
          <div className="form-group">
            <label>Co-Applicant Full Name</label>
            <input
              type="text"
              name="coApplicantName"
              value={formData.coApplicantName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
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
          <div className="form-group">
            <label>Occupation</label>
            <input
              type="text"
              name="coApplicantOccupation"
              value={formData.coApplicantOccupation}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
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

export default EducationLoanForm;
