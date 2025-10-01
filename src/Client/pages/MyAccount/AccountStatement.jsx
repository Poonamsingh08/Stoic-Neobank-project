import React, { useState, useEffect } from "react";
import "./AccountStatement.css";
import logoWhite from '../../assets/neobank-white.png';

export function AccountStatement() {
  const [step, setStep] = useState(1);
  const [captcha, setCaptcha] = useState("");
  const [enteredCaptcha, setEnteredCaptcha] = useState("");
  const [statementType, setStatementType] = useState("Request for statement");
  const [period, setPeriod] = useState("");

  const generateCaptcha = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setCaptcha(code);
    setEnteredCaptcha("");
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const stepTitles = [
    { id: 1, label: "Account Verification" },
    { id: 2, label: "OTP Verification" },
    { id: 3, label: "Request Statement" },
  ];

  return (
    <div className="astmt-container">
      <div className="astmt-box">
        {/* Left Branding */}
        <div className="astmt-left">
          <img src={logoWhite} alt="Neo Bank Logo" className="astmt-logo" />
          <h4 className="astmt-title">Neo Bank Account Statement</h4>
          <p className="astmt-subtitle">Follow these steps to download your account statement</p>
        </div>

        {/* Right Section */}
        <div className="astmt-right">
          {/* Stepper */}
          <div className="astmt-stepper">
            {stepTitles.map((s, idx) => (
              <div key={s.id} className="astmt-step">
                <div className={`astmt-step-circle ${step >= s.id ? "active" : ""}`}>
                  {s.id}
                </div>
                <div className={`astmt-step-label ${step >= s.id ? "active" : ""}`}>
                  {s.label}
                </div>
                {idx < stepTitles.length - 1 && (
                  <div className={`astmt-step-line ${step > s.id ? "filled" : ""}`}></div>
                )}
              </div>
            ))}
          </div>

          {/* Step 1 */}
          {step === 1 && (
            <div className="astmt-card">
              <div className="astmt-card-header">Step 1: Account Verification</div>
              <div className="astmt-card-body">
                <div className="astmt-form-group">
                  <label>Account Number</label>
                  <input type="text" placeholder="Enter Account Number" className="astmt-input" />
                </div>
                <div className="astmt-form-group astmt-captcha-row">
                  <input
                    type="text"
                    className="astmt-input"
                    placeholder="Enter Captcha"
                    value={enteredCaptcha}
                    onChange={(e) => setEnteredCaptcha(e.target.value.toUpperCase())}
                  />
                  <div className="astmt-captcha-box">{captcha}</div>
                  <button type="button" className="astmt-btn-outline" onClick={generateCaptcha}>
                    Refresh
                  </button>
                </div>
                <div className="astmt-btn-row right">
                  <button className="astmt-btn" disabled={enteredCaptcha !== captcha} onClick={() => setStep(2)}>
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div className="astmt-card">
              <div className="astmt-card-header">Step 2: OTP Verification</div>
              <div className="astmt-card-body">
                <p>An OTP has been sent to your registered mobile number: <b>+91xxxx389</b></p>
                <input type="text" className="astmt-input mb-3" placeholder="Enter OTP" />
                <div className="astmt-btn-row">
                  <button className="astmt-btn-outline" onClick={() => setStep(1)}>Back</button>
                  <button className="astmt-btn" onClick={() => setStep(3)}>Next</button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div className="astmt-card">
              <div className="astmt-card-header">Step 3: Request Account Statement</div>
              <div className="astmt-card-body">
                <div className="astmt-grid">
                  <div>
                    <label>Account Holder</label>
                    <input type="text" value="AMITxxxxPUT" readOnly />
                  </div>
                  <div>
                    <label>Account Number</label>
                    <input type="text" value="1937xxxx850" readOnly />
                  </div>
                  <div>
                    <label>Mobile</label>
                    <input type="text" value="+91xxxx389" readOnly />
                  </div>
                  <div>
                    <label>Email</label>
                    <input type="text" value="na@nxxxx.na" readOnly />
                  </div>
                  <div className="full">
                    <label>Address</label>
                    <input type="text" value="GALIxxxxRDA" readOnly />
                  </div>
                </div>

                <div className="astmt-grid">
                  <div>
                    <label>From Date</label>
                    <input type="date" />
                  </div>
                  <div>
                    <label>To Date</label>
                    <input type="date" />
                  </div>
                </div>

                <div className="astmt-form-group">
                  <label>Banking Type</label>
                  <select>
                    <option>General Banking</option>
                  </select>
                </div>

                <div className="astmt-form-group">
                  <label>Statement Type</label>
                  <select value={statementType} onChange={(e) => setStatementType(e.target.value)}>
                    <option>Request for statement</option>
                    <option>Request for interest certificate</option>
                    <option>Request for TDS certificate</option>
                  </select>
                </div>

                {statementType === "Request for statement" && (
                  <div className="astmt-form-group">
                    <label>Select Period</label>
                    <select value={period} onChange={(e) => setPeriod(e.target.value)}>
                      <option value="">-- Select Period --</option>
                      <option value="30">Last 1 Month</option>
                      <option value="90">Last 3 Months</option>
                      <option value="180">Last 6 Months</option>
                      <option value="365">Last 1 Year</option>
                      <option value="custom">Custom Date Range</option>
                    </select>
                  </div>
                )}

                <div className="astmt-btn-row">
                  <button className="astmt-btn-outline" onClick={() => setStep(2)}>Back</button>
                  <button className="astmt-btn" onClick={() => {
                    alert("Request submitted successfully!");
                    setStep(1);
                    generateCaptcha();
                    setStatementType("Request for statement");
                    setPeriod("");
                    setEnteredCaptcha("");
                  }}>Submit</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AccountStatement;
