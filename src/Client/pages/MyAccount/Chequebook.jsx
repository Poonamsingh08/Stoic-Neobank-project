import React, { useState } from "react";
import {CreditCard,Home,Building,User,MapPin,CheckCircle,AlertCircle} from "lucide-react";
import "./Chequebook.css"; // Import custom CSS
import logoWhite from '../../assets/neobank-white.png';


function ChequeBookRequest() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    accountType: "",
    accountNumber: "",
    numberOfBooks: "1",
    deliveryType: "home",
    fullName: "",
    mobileNumber: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    landmark: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = () => currentStep < 3 && setCurrentStep(currentStep + 1);
  const prevStep = () => currentStep > 1 && setCurrentStep(currentStep - 1);
  const handleSubmit = () => setIsSubmitted(true);

  const resetForm = () => {
    setIsSubmitted(false);
    setCurrentStep(1);
    setFormData({
      accountType: "",
      accountNumber: "",
      numberOfBooks: "1",
      deliveryType: "home",
      fullName: "",
      mobileNumber: "",
      email: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      landmark: "",
    });
  };

  if (isSubmitted) {
    return (
      <div className="cbr-container">
        <div className="cbr-center-card">
          <div className="cbr-success-icon">
            <CheckCircle className="cbr-check-icon" size={40} />
          </div>
          <h3 className="cbr-title">Request Submitted Successfully!</h3>
          <p className="cbr-subtext">
            Your cheque book request has been received. You will receive a confirmation SMS and email shortly.
          </p>
          <div className="cbr-alert">
            <p><strong>Request ID:</strong> CB{Math.random().toString().substr(2, 8)}</p>
            <p><strong>Expected delivery:</strong> 3-5 business days</p>
          </div>
          <button className="cbr-btn-danger" onClick={resetForm}>
            Make Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cbr-container">
      <div className="cbr-form-wrapper">
        {/* Left Panel */}
        <div className="cbr-left-panel">
          <img src={logoWhite} alt="Neo Bank Logo" className="cbr-logo" />
          <h4 className="cbr-left-title">Neo Bank Cheque Book</h4>
          <p className="cbr-left-subtitle">
            Quick and secure cheque book ordering in just a few steps
          </p>
        </div>

        {/* Right Panel */}
        <div className="cbr-right-panel">
          {/* Stepper */}
          <div className="cbr-stepper">
            {["Account Details", "Personal Info", "Delivery"].map((label, index) => {
              const stepNumber = index + 1;
              const isActive = currentStep >= stepNumber;
              return (
                <div key={index} className="cbr-step">
                  <div className={`cbr-step-circle ${isActive ? "cbr-active-step" : ""}`}>
                    {stepNumber}
                  </div>
                  <small className={`cbr-step-label ${isActive ? "cbr-step-active-label" : ""}`}>
                    {label}
                  </small>
                  {index < 2 && (
                    <div className={`cbr-step-line ${currentStep > stepNumber ? "cbr-step-line-active" : ""}`} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Form Card */}
          <div className="cbr-form-card">
            {/* STEP 1 */}
            {currentStep === 1 && (
              <div>
                <h4 className="cbr-form-title"><CreditCard className="cbr-icon" size={20} /> Account Details</h4>
                <div className="cbr-form-group">
                  <label>Account Type</label>
                  <select name="accountType" value={formData.accountType} onChange={handleInputChange}>
                    <option value="">Select Account Type</option>
                    <option value="savings">Savings Account</option>
                    <option value="current">Current Account</option>
                    <option value="salary">Salary Account</option>
                  </select>
                </div>

                <div className="cbr-form-group">
                  <label>Account Number</label>
                  <input type="text" name="accountNumber" value={formData.accountNumber} onChange={handleInputChange} placeholder="Enter your account number" />
                </div>

                <div className="cbr-form-group">
                  <label>Number of Cheque Books</label>
                  <select name="numberOfBooks" value={formData.numberOfBooks} onChange={handleInputChange}>
                    <option value="1">1 Book (25 leaves)</option>
                    <option value="2">2 Books (50 leaves)</option>
                    <option value="3">3 Books (75 leaves)</option>
                  </select>
                </div>

                <div className="cbr-form-group">
                  <label>Delivery Type</label>
                  <div className="cbr-radio-group">
                    <label className="cbr-radio">
                      <input type="radio" name="deliveryType" value="home" checked={formData.deliveryType === "home"} onChange={handleInputChange} />
                      <Home className="cbr-radio-icon" /> Home Delivery
                    </label>
                    <label className="cbr-radio">
                      <input type="radio" name="deliveryType" value="branch" checked={formData.deliveryType === "branch"} onChange={handleInputChange} />
                      <Building className="cbr-radio-icon" /> Branch Collection
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {currentStep === 2 && (
              <div>
                <h4 className="cbr-form-title"><User className="cbr-icon" size={20} /> Personal Information</h4>
                <div className="cbr-form-group">
                  <label>Full Name</label>
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Enter your full name" />
                </div>
                <div className="cbr-row">
                  <div className="cbr-col">
                    <div className="cbr-form-group">
                      <label>Mobile Number</label>
                      <input type="tel" name="mobileNumber" value={formData.mobileNumber} onChange={handleInputChange} placeholder="Enter mobile number" />
                    </div>
                  </div>
                  <div className="cbr-col">
                    <div className="cbr-form-group">
                      <label>Email Address</label>
                      <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Enter email address" />
                    </div>
                  </div>
                </div>
                <div className="cbr-alert-info">
                  <AlertCircle size={18} /> <strong>Important:</strong> Please ensure your contact details are up to date for delivery notifications.
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {currentStep === 3 && (
              <div>
                <h4 className="cbr-form-title"><MapPin className="cbr-icon" size={20} /> Delivery Address</h4>
                <div className="cbr-form-group">
                  <label>Complete Address</label>
                  <textarea name="address" value={formData.address} onChange={handleInputChange} rows={3} placeholder="Enter your complete address"></textarea>
                </div>
                <div className="cbr-row">
                  <div className="cbr-col">
                    <div className="cbr-form-group">
                      <label>City</label>
                      <input type="text" name="city" value={formData.city} onChange={handleInputChange} />
                    </div>
                  </div>
                  <div className="cbr-col">
                    <div className="cbr-form-group">
                      <label>State</label>
                      <input type="text" name="state" value={formData.state} onChange={handleInputChange} />
                    </div>
                  </div>
                </div>
                <div className="cbr-row">
                  <div className="cbr-col">
                    <div className="cbr-form-group">
                      <label>PIN Code</label>
                      <input type="text" name="pincode" value={formData.pincode} onChange={handleInputChange} />
                    </div>
                  </div>
                  <div className="cbr-col">
                    <div className="cbr-form-group">
                      <label>Landmark (Optional)</label>
                      <input type="text" name="landmark" value={formData.landmark} onChange={handleInputChange} />
                    </div>
                  </div>
                </div>
                <div className="cbr-summary-card">
                  <h6>Request Summary</h6>
                  <p><strong>Account Type:</strong> {formData.accountType}</p>
                  <p><strong>Number of Books:</strong> {formData.numberOfBooks} Book(s)</p>
                  <p><strong>Delivery Type:</strong> {formData.deliveryType === "home" ? "Home Delivery" : "Branch Collection"}</p>
                  <p><strong>Mobile:</strong> {formData.mobileNumber}</p>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="cbr-nav-buttons">
              <button className="cbr-btn-outline" disabled={currentStep === 1} onClick={prevStep}>← Previous</button>
              {currentStep < 3 ? (
                <button className="cbr-btn-next" onClick={nextStep}>Next Step →</button>
              ) : (
                <button className="cbr-btn-submit" onClick={handleSubmit}> Submit Request</button>
              )}
            </div>

            <div className="cbr-help-text">
              Need help? Contact our customer support at 1800-XXX-XXXX <br /> Available 24/7 for your assistance
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChequeBookRequest;
