import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import SignatureCanvas from "react-signature-canvas";
import { useOnboarding } from "../context/OnboardingContext";
import "./UpdateKYC33.css"; // Custom CSS

export default function UpdateKYC33({ onComplete }) {
  const { updateUserData } = useOnboarding();

  const [step, setStep] = useState(1);
  const [choice, setChoice] = useState("customerId");
  const [customerId, setCustomerId] = useState("");
  const [panNumber, setPanNumber] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [verificationAnswer, setVerificationAnswer] = useState("");
  const [otp, setOtp] = useState("");
  const [photo, setPhoto] = useState(null);
  const [showWebcam, setShowWebcam] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [captchaNum1, setCaptchaNum1] = useState(0);
  const [captchaNum2, setCaptchaNum2] = useState(0);
  const [isRecording, setIsRecording] = useState(false);

  const webcamRef = useRef(null);
  const sigCanvas = useRef(null);

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    setCaptchaNum1(Math.floor(Math.random() * 10) + 1);
    setCaptchaNum2(Math.floor(Math.random() * 10) + 1);
  };

  const getSelectedValue = () => {
    if (choice === "customerId") return customerId;
    if (choice === "panNumber") return panNumber;
    return accountNumber;
  };

  const handleStep1Submit = (e) => {
    e.preventDefault();
    if (!getSelectedValue()) {
      setError("Please enter a value.");
      return;
    }
    if (parseInt(verificationAnswer) !== captchaNum1 * captchaNum2) {
      setError("Captcha answer is incorrect.");
      generateCaptcha();
      setVerificationAnswer("");
      return;
    }
    setError("");
    setStep(2);
  };

  const handleStep2Submit = (e) => {
    e.preventDefault();
    if (otp !== "123456") {
      setError("Incorrect OTP.");
      return;
    }
    setError("");
    setStep(3);
  };

  const capturePhoto = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setPhoto(imageSrc);
      setShowWebcam(false);
    }
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    if (!photo) {
      setError("Please capture a photo.");
      return;
    }
    if (sigCanvas.current.isEmpty()) {
      setError("Please draw your signature.");
      return;
    }
    setError("");
    setSuccess(true);
    updateUserData({ kycCompleted: true });
  };

  const resetForm = () => {
    setStep(1);
    setChoice("customerId");
    setCustomerId("");
    setPanNumber("");
    setAccountNumber("");
    setVerificationAnswer("");
    setOtp("");
    setPhoto(null);
    setShowWebcam(true);
    if (sigCanvas.current) sigCanvas.current.clear();
    setError("");
    setSuccess(false);
    generateCaptcha();
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      if (onComplete) onComplete(); // Finish onboarding
    }, 2000);
  };

  return (
    <div className="account-type-container">
      <button className="back-btn" onClick={resetForm}>
        ← Back
      </button>

      <div className="account-type-card">
        <div className="account-type-header">
          <h2 className="account-type-title">Update KYC</h2>
          <p className="account-type-subtitle">
            Complete your verification in three simple steps
          </p>
        </div>

        {!success ? (
          <>
            {step === 1 && (
              <form onSubmit={handleStep1Submit}>
                <h3>Step 1: Verify Identity</h3>
                {["customerId", "panNumber", "accountNumber"].map((type) => (
                  <label key={type} className="kyc-radio-label">
                    <input
                      type="radio"
                      value={type}
                      checked={choice === type}
                      onChange={() => setChoice(type)}
                    />
                    <span>
                      {type === "customerId"
                        ? "Customer ID"
                        : type === "panNumber"
                        ? "PAN Number"
                        : "Account Number"}
                    </span>
                  </label>
                ))}

                <input
                  type="text"
                  className="kyc-input"
                  placeholder={`Enter your ${
                    choice === "customerId"
                      ? "Customer ID"
                      : choice === "panNumber"
                      ? "PAN Number"
                      : "Account Number"
                  }`}
                  value={getSelectedValue()}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (choice === "customerId") setCustomerId(val);
                    else if (choice === "panNumber") setPanNumber(val);
                    else setAccountNumber(val);
                  }}
                />

                <label>
                  Solve: {captchaNum1} × {captchaNum2} = ?
                </label>
                <input
                  type="text"
                  className="kyc-input"
                  value={verificationAnswer}
                  onChange={(e) => setVerificationAnswer(e.target.value)}
                />

                {error && <div className="kyc-error">{error}</div>}

                <button type="submit" className="record-btn">
                  Verify & Send OTP
                </button>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handleStep2Submit}>
                <h3>Step 2: Enter OTP</h3>
                <input
                  type="text"
                  className="kyc-input"
                  placeholder="Enter OTP (123456)"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                {error && <div className="kyc-error">{error}</div>}

                <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                  <button type="button" className="record-btn" onClick={() => alert("OTP resent: 123456")}>
                    Resend OTP
                  </button>
                  <button type="button" className="record-btn" onClick={resetForm}>
                    Cancel
                  </button>
                </div>

                <button type="submit" className="record-btn">
                  Verify OTP
                </button>
              </form>
            )}

            {step === 3 && (
              <form onSubmit={handleFinalSubmit}>
                <h3>Step 3: Capture Photo & Signature</h3>

                <label>Take Photo:</label>
                {showWebcam ? (
                  <>
                    <Webcam
                      audio={false}
                      ref={webcamRef}
                      screenshotFormat="image/jpeg"
                      width="100%"
                      className="video-preview"
                    />
                    <button type="button" className="record-btn" onClick={capturePhoto}>
                      Capture Photo
                    </button>
                  </>
                ) : (
                  <img src={photo} alt="Captured" className="video-preview" />
                )}

                <label>Draw Signature:</label>
                <SignatureCanvas
                  penColor="white"
                  canvasProps={{ width: 300, height: 100, className: "video-preview" }}
                  ref={sigCanvas}
                />
                <button type="button" className="record-btn" onClick={() => sigCanvas.current.clear()}>
                  Clear Signature
                </button>

                {error && <div className="kyc-error">{error}</div>}

                <button type="submit" className="record-btn">
                  Submit KYC
                </button>
              </form>
            )}
          </>
        ) : (
          <div style={{ textAlign: "center" }}>
            <h3>✅ KYC Completed Successfully!</h3>
            <button className="record-btn" onClick={handleStartRecording} disabled={isRecording}>
              {isRecording ? "Processing..." : "Finish & Continue"}
            </button>
          </div>
        )}

        <p className="footer-note">
          Regulated by RBI • Deposits insured up to ₹5,00,000
        </p>
      </div>
    </div>
  );
}
