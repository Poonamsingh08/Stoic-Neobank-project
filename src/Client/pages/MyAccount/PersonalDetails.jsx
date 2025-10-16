import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PersonalDetails.css';

const PersonalDetails = ({ userData, updateUserData, nextStep }) => {
  const navigate = useNavigate();

  const handleChange = (e) => {
    updateUserData({ [e.target.name]: e.target.value });
  };

  const isFormValid = userData.fullName && userData.mobileNumber && userData.email;

  return (
    <div className="pd-container">
      <h2 className="pd-title">Personal Details</h2>

      <div className="pd-form-group">
        <label className="pd-label">Full Name</label>
        <input
          type="text"
          name="fullName"
          value={userData.fullName}
          onChange={handleChange}
          placeholder="Enter your full name"
          className="pd-input"
        />
      </div>

      <div className="pd-form-group">
        <label className="pd-label">Mobile Number</label>
        <input
          type="text"
          name="mobileNumber"
          value={userData.mobileNumber}
          onChange={handleChange}
          placeholder="Enter your mobile number"
          className="pd-input"
        />
      </div>

      <div className="pd-form-group">
        <label className="pd-label">Email</label>
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          className="pd-input"
        />
      </div>

      {/* Footer Buttons */}
      <div className="pd-btn-row">
        {/* 👈 Back Button (Left Side) */}
        <button
          type="button"
          className="pd-btn-outline"
          onClick={() => navigate('/Client/myaccount')} // change route if needed
        >
          ← Back
        </button>

        {/* 👉 Next Button (Right Side) */}
        <button
          onClick={nextStep}
          disabled={!isFormValid}
          className={`pd-btn ${isFormValid ? 'pd-btn-active' : 'pd-btn-disabled'}`}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default PersonalDetails;
