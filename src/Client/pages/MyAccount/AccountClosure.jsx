import React, { useState } from "react";
import {CheckCircle,User,CreditCard,FileText,Shield,AlertTriangle,Download} from "lucide-react";
import './AccountClosure.css'; // 👈 unique CSS file
import logoWhite from '../../assets/neobank-white.png';  // adjust path as needed


function AccountClosure() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    accountType: "",
    accountNumber: "",
    confirmAccountNumber: "",
    fullName: "",
    mobileNumber: "",
    email: "",
    dateOfBirth: "",
    closureReason: "",
    otherReason: "",
    transferAccount: "",
    transferIfsc: "",
    transferBankName: "",
    hasOutstandingLoans: "",
    hasPendingTransactions: "",
    acknowledgment: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const nextStep = () => { if (currentStep < 4) setCurrentStep(currentStep + 1); };
  const prevStep = () => { if (currentStep > 1) setCurrentStep(currentStep - 1); };
  const handleSubmit = () => setIsSubmitted(true);

  const closureReasons = [
    "Switching to another bank",
    "No longer needed",
    "Unsatisfactory service",
    "High charges/fees",
    "Moving to different location",
    "Account consolidation",
    "Other",
  ];

  if (isSubmitted) {
    return (
      <div className="ac-container ac-submitted">
        <div className="ac-card">
          <div className="ac-icon-wrapper">
            <CheckCircle className="ac-success-icon" size={40} />
          </div>
          <h2 className="ac-title">Account Closure Request Submitted</h2>
          <p className="ac-text-muted">
            Your account closure request has been received and is being processed. You'll receive updates via SMS and email.
          </p>

          <div className="ac-alert ac-alert-danger">
            <h5 className="ac-alert-title">Request Details:</h5>
            <p><strong>Request ID:</strong> AC{Math.random().toString().substr(2, 8)}</p>
            <p><strong>Account Number:</strong> ****{formData.accountNumber.slice(-4)}</p>
            <p><strong>Processing Time:</strong> 7-10 business days</p>
            <p><strong>Status:</strong> <span className="ac-text-warning">Under Review</span></p>
          </div>

          <div className="ac-alert ac-alert-warning">
            <AlertTriangle className="ac-alert-icon" />
            <strong>Important:</strong> Please ensure all pending transactions are completed and maintain minimum balance until closure is confirmed.
          </div>

          <div className="ac-btn-group">
            <button className="ac-btn ac-btn-light" onClick={() => window.print()}>
              <Download size={16} className="ac-btn-icon" /> Download Receipt
            </button>
            <button
              className="ac-btn ac-btn-danger"
              onClick={() => {
                setIsSubmitted(false);
                setCurrentStep(1);
                setFormData({
                  accountType: "",
                  accountNumber: "",
                  confirmAccountNumber: "",
                  fullName: "",
                  mobileNumber: "",
                  email: "",
                  dateOfBirth: "",
                  closureReason: "",
                  otherReason: "",
                  transferAccount: "",
                  transferIfsc: "",
                  transferBankName: "",
                  hasOutstandingLoans: "",
                  hasPendingTransactions: "",
                  acknowledgment: false,
                });
              }}
            >
              New Request
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ac-container ac-form-container">
      <div className="ac-form-wrapper">
        {/* Left Branding Panel */}
        <div className="ac-left-panel">
          <img src={logoWhite} alt="Neo Bank Logo" className="ac-logo" />
          <h4 className="ac-brand-title">Neo Bank Account Closure</h4>
          <p className="ac-brand-subtitle">Secure and hassle-free account closure process in simple steps</p>
        </div>

        {/* Right Form Panel */}
        <div className="ac-right-panel">
          {/* Stepper */}
          <div className="ac-stepper">
            {["Account Details", "Personal Info", "Closure Details", "Review"].map((label, index) => {
              const stepNumber = index + 1;
              const isActive = currentStep >= stepNumber;
              return (
                <div key={index} className="ac-step">
                  <div className={`ac-step-circle ${isActive ? 'ac-step-active' : ''}`}>{stepNumber}</div>
                  <small className={`ac-step-label ${isActive ? 'ac-label-active' : ''}`}>{label}</small>
                  {index < 3 && <div className={`ac-step-line ${currentStep > stepNumber ? 'ac-filled' : ''}`} />}
                </div>
              );
            })}
          </div>

          <div className="ac-card">
            {/* Step 1 */}
            {currentStep === 1 && (
              <>
                <h4 className="ac-card-title"><CreditCard className="ac-icon" /> Account Information</h4>
                <div className="ac-form-group">
                  <label>Account Type</label>
                  <select name="accountType" value={formData.accountType} onChange={handleInputChange} className="ac-input">
                    <option value="">Select Account Type</option>
                    <option value="savings">Savings Account</option>
                    <option value="current">Current Account</option>
                    <option value="salary">Salary Account</option>
                    <option value="fixed-deposit">Fixed Deposit Account</option>
                  </select>
                </div>
                <div className="ac-form-group">
                  <label>Account Number</label>
                  <input type="text" name="accountNumber" value={formData.accountNumber} onChange={handleInputChange} className="ac-input" />
                </div>
                <div className="ac-form-group">
                  <label>Confirm Account Number</label>
                  <input type="text" name="confirmAccountNumber" value={formData.confirmAccountNumber} onChange={handleInputChange} className="ac-input" />
                  {formData.confirmAccountNumber && formData.accountNumber !== formData.confirmAccountNumber && (
                    <small className="ac-text-danger">Account numbers do not match</small>
                  )}
                </div>
                <div className="ac-alert ac-alert-danger">
                  <Shield size={16} className="ac-icon me-1" />
                  <strong>Security Notice:</strong> Ensure you're on our official website. Never share PIN/OTP here.
                </div>
              </>
            )}

            {/* Step 2 */}
            {currentStep === 2 && (
              <>
                <h4 className="ac-card-title"><User className="ac-icon" /> Personal Information</h4>
                <div className="ac-form-group">
                  <label>Full Name</label>
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className="ac-input" />
                </div>
                <div className="ac-form-group">
                  <label>Mobile Number</label>
                  <input type="tel" name="mobileNumber" value={formData.mobileNumber} onChange={handleInputChange} className="ac-input" />
                </div>
                <div className="ac-form-group">
                  <label>Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="ac-input" />
                </div>
                <div className="ac-form-group">
                  <label>Date of Birth</label>
                  <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} className="ac-input" />
                </div>
                <div className="ac-alert ac-alert-info">
                  <AlertTriangle className="ac-icon me-1" />
                  All information must match bank records. Verification may be required.
                </div>
              </>
            )}

            {/* Step 3 */}
            {currentStep === 3 && (
              <>
                <h4 className="ac-card-title"><FileText className="ac-icon" /> Closure Details</h4>
                <div className="ac-form-group">
                  <label>Reason for Account Closure</label>
                  <select name="closureReason" value={formData.closureReason} onChange={handleInputChange} className="ac-input">
                    <option value="">Select reason</option>
                    {closureReasons.map((reason) => (<option key={reason}>{reason}</option>))}
                  </select>
                </div>
                {formData.closureReason === "Other" && (
                  <div className="ac-form-group">
                    <label>Please specify</label>
                    <textarea rows={3} name="otherReason" value={formData.otherReason} onChange={handleInputChange} className="ac-input" />
                  </div>
                )}
                <h5 className="ac-subtitle">Balance Transfer Details</h5>
                <div className="ac-form-group">
                  <label>Transfer to Account Number</label>
                  <input type="text" name="transferAccount" value={formData.transferAccount} onChange={handleInputChange} className="ac-input" />
                </div>
                <div className="ac-form-group">
                  <label>IFSC Code</label>
                  <input type="text" name="transferIfsc" value={formData.transferIfsc} onChange={handleInputChange} className="ac-input" />
                </div>
                <div className="ac-form-group">
                  <label>Bank Name</label>
                  <input type="text" name="transferBankName" value={formData.transferBankName} onChange={handleInputChange} className="ac-input" />
                </div>
              </>
            )}

            {/* Step 4 */}
            {currentStep === 4 && (
              <>
                <h4 className="ac-card-title"><CheckCircle className="ac-icon" /> Review & Confirmation</h4>
                <div className="ac-review-section">
                  <h6>Account Details</h6>
                  <p><strong>Type:</strong> {formData.accountType}</p>
                  <p><strong>Number:</strong> ****{formData.accountNumber.slice(-4)}</p>
                  <p><strong>Holder:</strong> {formData.fullName}</p>
                  <p><strong>Mobile:</strong> {formData.mobileNumber}</p>
                </div>
                <div className="ac-review-section">
                  <h6>Closure Details</h6>
                  <p><strong>Reason:</strong> {formData.closureReason}</p>
                  {formData.otherReason && (<p><strong>Other:</strong> {formData.otherReason}</p>)}
                  <p><strong>Balance Transfer:</strong> {formData.transferBankName} (****{formData.transferAccount.slice(-4)})</p>
                </div>
                <div className="ac-alert ac-alert-danger">
                  <ul className="ac-alert-list">
                    <li>Closure takes 7-10 business days</li>
                    <li>All pending transactions must be cleared</li>
                    <li>Remaining balance will be transferred</li>
                    <li>This action cannot be undone</li>
                  </ul>
                </div>
                <label className="ac-checkbox-label">
                  <input type="checkbox" name="acknowledgment" checked={formData.acknowledgment} onChange={handleInputChange} /> I acknowledge all terms and authorize closure
                </label>
              </>
            )}

            {/* Navigation Buttons */}
            <div className="ac-btn-group ac-btn-nav">
              <button className="ac-btn ac-btn-outline" disabled={currentStep === 1} onClick={prevStep}>← Previous</button>
              {currentStep < 4 ? (
                <button className="ac-btn ac-btn-primary" onClick={nextStep} disabled={currentStep === 1 && formData.accountNumber !== formData.confirmAccountNumber}>Next Step →</button>
              ) : (
                <button className="ac-btn ac-btn-primary" onClick={handleSubmit} disabled={!formData.acknowledgment}>✅ Submit Request</button>
              )}
            </div>

            <div className="ac-text-muted ac-footer">Need help? Call 1800-XXX-XXXX (24/7 support)</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountClosure;
