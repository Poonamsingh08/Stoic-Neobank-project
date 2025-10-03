import { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import SignatureCanvas from "react-signature-canvas";
import "./UpdateKYC.css";
import logoWhite from '../../assets/neobank-white.png';


export function UpdateKYC() {
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

  const webcamRef = useRef(null);
  const sigCanvas = useRef(null);

  const generateCaptcha = () => {
    setCaptchaNum1(Math.floor(Math.random() * 10) + 1);
    setCaptchaNum2(Math.floor(Math.random() * 10) + 1);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

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

  return (
    <div className="kyc-unique-container">
      <div className="kyc-unique-box">
        {/* Left Branding */}
        <div className="kyc-unique-left">
          <img src={logoWhite} alt="Neo Bank Logo" className="kyc-unique-logo" />
          <h2 className="kyc-unique-title">Neo Bank KYC</h2>
          <p className="kyc-unique-subtitle">
            Securely complete your account verification in simple steps
          </p>
        </div>

        {/* Right Form */}
        <div className="kyc-unique-right">
          {!success ? (
            <>
              {step === 1 && (
                <form onSubmit={handleStep1Submit}>
                  <h4 className="kyc-unique-heading">KYC Verification</h4>

                  {["customerId", "panNumber", "accountNumber"].map((type) => (
                    <label key={type} className="kyc-unique-radio-label">
                      <input
                        type="radio"
                        value={type}
                        checked={choice === type}
                        onChange={() => setChoice(type)}
                      />
                      <span className="kyc-unique-radio-text">
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
                    className="kyc-unique-input"
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

                  <label className="kyc-unique-captcha">
                    What is the value of {captchaNum1} × {captchaNum2}?
                  </label>
                  <input
                    type="text"
                    className="kyc-unique-input"
                    placeholder="Enter Answer"
                    value={verificationAnswer}
                    onChange={(e) => setVerificationAnswer(e.target.value)}
                  />

                  {error && <div className="kyc-unique-error">{error}</div>}

                  <button type="submit" className="kyc-unique-btn kyc-unique-btn-primary">
                    Verify & Send OTP
                  </button>
                </form>
              )}

              {step === 2 && (
                <form onSubmit={handleStep2Submit}>
                  <h5 className="kyc-unique-subheading">Enter OTP</h5>
                  <input
                    type="text"
                    className="kyc-unique-input"
                    placeholder="Enter OTP (Use 123456)"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />

                  <div className="kyc-unique-btn-group">
                    <button
                      type="button"
                      className="kyc-unique-btn kyc-unique-btn-outline-warning"
                      onClick={() => alert("OTP resent: 123456")}
                    >
                      Resend OTP
                    </button>
                    <button type="button" className="kyc-unique-btn kyc-unique-btn-outline-danger" onClick={resetForm}>
                      Cancel
                    </button>
                  </div>

                  {error && <div className="kyc-unique-error">{error}</div>}
                  <button type="submit" className="kyc-unique-btn kyc-unique-btn-danger">Verify OTP</button>
                </form>
              )}

              {step === 3 && (
                <form onSubmit={handleFinalSubmit}>
                  <h5 className="kyc-unique-subheading">Capture Photo & Signature</h5>

                  <label className="kyc-unique-label">Take Photo</label>
                  {showWebcam ? (
                    <>
                      <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        width="100%"
                        videoConstraints={{ width: 300, height: 200, facingMode: "user" }}
                        className="kyc-unique-webcam"
                      />
                      <button type="button" className="kyc-unique-btn kyc-unique-btn-outline-success" onClick={capturePhoto}>
                        Capture Photo
                      </button>
                    </>
                  ) : (
                    <img src={photo} alt="Captured" className="kyc-unique-photo" />
                  )}

                  <label className="kyc-unique-label">Draw Signature</label>
                  <SignatureCanvas
                    penColor="black"
                    canvasProps={{ width: 300, height: 100, className: "kyc-unique-signature" }}
                    ref={sigCanvas}
                  />
                  <button type="button" className="kyc-unique-btn kyc-unique-btn-outline-secondary" onClick={() => sigCanvas.current.clear()}>
                    Clear Signature
                  </button>

                  {error && <div className="kyc-unique-error">{error}</div>}

                  <button type="submit" className="kyc-unique-btn kyc-unique-btn-submit">Submit KYC</button>
                </form>
              )}
            </>
          ) : (
            <div className="kyc-unique-success">
              <h4>✅ KYC completed successfully!</h4>
              <button className="kyc-unique-btn kyc-unique-btn-outline-primary" onClick={resetForm}>
                Start New KYC
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UpdateKYC;
