import React, { useState } from 'react';
import './PANVerification.css'; // 👈 unique CSS

const PANVerification = ({ userData, updateUserData, nextStep, prevStep }) => {
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [enteredOtp, setEnteredOtp] = useState("");
  const [message, setMessage] = useState(""); // for OTP & verification messages
  const [messageType, setMessageType] = useState(""); // "success" or "error"

  const handleChange = (e) => updateUserData({ [e.target.name]: e.target.value });

  const sendOtp = () => {
    if (userData.panNumber.length === 10) {
      const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
      setOtp(generatedOtp);
      setOtpSent(true);
      setMessage(`A test OTP has been sent: ${generatedOtp}`);
      setMessageType("success");
    } else {
      setMessage("Please enter a valid 10-character PAN number.");
      setMessageType("error");
    }
  };

  const verifyOtp = () => {
    if (enteredOtp === otp && enteredOtp !== "") {
      setMessage("✅ PAN Verified Successfully!");
      setMessageType("success");
      setTimeout(() => nextStep(), 1000); // proceed to next step after 1s
    } else {
      setMessage("❌ Incorrect OTP. Please try again.");
      setMessageType("error");
    }
  };

  return (
    <div className="pv-container">
      <h2 className="pv-title">PAN Verification</h2>

      <div className="pv-form-group">
        <label className="pv-label">PAN Number</label>
        <input
          type="text"
          name="panNumber"
          value={userData.panNumber}
          onChange={handleChange}
          placeholder="Enter your PAN Number"
          className="pv-input"
        />
      </div>

      {!otpSent ? (
        <button
          onClick={sendOtp}
          disabled={userData.panNumber.length !== 10}
          className={`pv-btn ${userData.panNumber.length === 10 ? 'pv-btn-active' : 'pv-btn-disabled'}`}
        >
          Send OTP
        </button>
      ) : (
        <div className="pv-otp-section">
          <input
            type="text"
            placeholder="Enter OTP"
            value={enteredOtp}
            onChange={(e) => setEnteredOtp(e.target.value)}
            className="pv-input pv-otp-input"
          />

          {message && (
            <p className={`pv-message ${messageType === "success" ? "pv-success" : "pv-error"}`}>
              {message}
            </p>
          )}

          <div className="pv-btn-row">
            <button onClick={prevStep} className="pv-btn pv-btn-back">
              Back
            </button>
            <button onClick={sendOtp} className="pv-btn pv-btn-resend">
              Resend OTP
            </button>
            <button
              onClick={verifyOtp}
              disabled={enteredOtp.length !== 6}
              className={`pv-btn ${enteredOtp.length === 6 ? 'pv-btn-active' : 'pv-btn-disabled'}`}
            >
              Verify OTP
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PANVerification;
