import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import SignatureCanvas from "react-signature-canvas";
import { useOnboarding } from "../context/OnboardingContext";
import "./UpdateKYC33.css";

export default function UpdateKYC33({ onComplete }) {
  const { updateUserData, setCurrentStep, userData } = useOnboarding();

  const [step, setStep] = useState(1);
  const [choice, setChoice] = useState("customerId");
  const [customerId, setCustomerId] = useState(userData?.customerId || "");
  const [verificationAnswer, setVerificationAnswer] = useState("");
  const [otp, setOtp] = useState("");
  const [photo, setPhoto] = useState(null);
  const [showWebcam, setShowWebcam] = useState(true);
  const [videoURL, setVideoURL] = useState(null);
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

  const handleStep1Submit = (e) => {
    e.preventDefault();

    if (!customerId) {
      setError("Please enter your Customer ID.");
      return;
    }
    if (customerId !== userData?.customerId) {
      setError("Invalid Customer ID. Use the ID generated on Customer ID page.");
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

  const handleStartRecording = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      setVideoURL("sample-video.mp4"); 
      updateUserData({ videoKYCCompleted: true });
      setStep(4);
    }, 3000);
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

  const handleBack = () => {
    if (step === 1) {
      setCurrentStep("customerIDPage");
    } else {
      setStep((prev) => prev - 1);
    }
  };

  return (
    <div className="account-type-container">
      <button className="back-btn" onClick={handleBack}>
        ← Back
      </button>

      <div className="account-type-card">
        <div className="account-type-header">
          <h2 className="account-type-title">KYC</h2>
          <p className="account-type-subtitle">
            Complete your verification in four simple steps
          </p>
        </div>

        <div className="progress-bar">
          {[1, 2, 3, 4].map((num) => (
            <div
              key={num}
              className={`progress-step ${step >= num ? "active" : ""}`}
            />
          ))}
        </div>

        {!success ? (
          <>
            {/* Step 1: Customer ID */}
            {step === 1 && (
              <div className="step-container">
                <form onSubmit={handleStep1Submit}>
                  <h3>Step 1: Verify Customer ID</h3>
                  <input
                    type="text"
                    className="kyc-input"
                    placeholder="Enter your Customer ID"
                    value={customerId}
                    onChange={(e) => setCustomerId(e.target.value)}
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
              </div>
            )}

            {/* Step 2: OTP */}
            {step === 2 && (
              <div className="step-container">
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
                    <button
                      type="button"
                      className="record-btn"
                      onClick={() => alert("OTP resent: 123456")}
                    >
                      Resend OTP
                    </button>
                  </div>
                  <button type="submit" className="record-btn">
                    Verify OTP
                  </button>
                </form>
              </div>
            )}

            {/* Step 3: Video KYC */}
            {step === 3 && (
              <div className="step-container">
                <h3>Step 3: Video KYC</h3>
                {isRecording && (
                  <div className="recording-indicator-container">
                    <div className="recording-indicator"></div>
                    <span>Recording in progress...</span>
                  </div>
                )}
                <div className="video-container">
                  {videoURL ? (
                    <video src={videoURL} controls className="video-preview" />
                  ) : (
                    <Webcam
                      ref={webcamRef}
                      audio={false}
                      screenshotFormat="image/jpeg"
                      width="100%"
                      className={`video-preview ${isRecording ? "recording" : ""}`}
                    />
                  )}
                </div>
                <div className="instructions">
                  <h3>Instructions:</h3>
                  <ul>
                    <li>Ensure good lighting and clear background</li>
                    <li>Hold your PAN card next to your face</li>
                    <li>Say "I agree to open an account with NeoBank"</li>
                  </ul>
                </div>
                <button
                  onClick={handleStartRecording}
                  disabled={isRecording}
                  className="record-btn"
                >
                  {isRecording ? "Recording..." : "Start Recording"}
                </button>
              </div>
            )}

            {/* Step 4: Photo & Signature */}
            {step === 4 && (
              <div className="step-container">
                <form onSubmit={handleFinalSubmit}>
                  <h3>Step 4: Capture Photo & Signature</h3>
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
                    canvasProps={{
                      width: 300,
                      height: 100,
                      className: "video-preview",
                    }}
                    ref={sigCanvas}
                  />
                  <button
                    type="button"
                    className="record-btn"
                    onClick={() => sigCanvas.current.clear()}
                  >
                    Clear Signature
                  </button>
                  {error && <div className="kyc-error">{error}</div>}
                  <button type="submit" className="record-btn">
                    Submit KYC
                  </button>
                </form>
              </div>
            )}
          </>
        ) : (
          // ✅ Success message with verification info
          <div style={{ textAlign: "center", padding: "20px" }}>
            <h3 className="success-check">✅ KYC Completed Successfully!</h3>
            <p style={{ marginTop: "10px", fontSize: "16px", color: "#555" }}>
              Your details have been submitted and are being verified. <br />
              Your account will be active within 6 hours.
            </p>
            <button
              className="record-btn"
              onClick={onComplete}
              disabled={isRecording}
              style={{ marginTop: "15px" }}
            >
              Finish & Continue
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
