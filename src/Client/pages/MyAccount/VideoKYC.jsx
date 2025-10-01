import React, { useState, useRef } from 'react';
import './VideoKYC.css'; // 👈 unique CSS

const VideoKYC = ({ prevStep }) => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [kycStatus, setKycStatus] = useState("pending"); // pending, in_progress, completed
  const [message, setMessage] = useState(""); // Status message
  const videoRef = useRef(null);

  const startKyc = () => {
    setIsVerifying(true);
    setKycStatus("in_progress");
    setMessage("Connecting with a verification officer... This is a simulated process.");

    setTimeout(() => {
      setIsVerifying(false);
      setKycStatus("completed");
      setMessage("🎉 Your Video KYC has been successfully completed!");
    }, 5000);
  };

  const getButtonText = () => {
    switch (kycStatus) {
      case "pending":
        return "Start KYC";
      case "in_progress":
        return "Verifying...";
      case "completed":
        return "KYC Completed";
      default:
        return "Start KYC";
    }
  };

  return (
    <div className="vk-container">
      <h2 className="vk-title">Video KYC</h2>
      <p className="vk-subtitle">
        Complete your video KYC to finish your account setup. This is a crucial step for identity verification.
      </p>

      <div className="vk-video-wrapper">
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          muted 
          className="vk-video"
        >
          <source 
            src="https://assets.mixkit.co/videos/preview/mixkit-online-learning-with-laptop-and-coffee-4161-large.mp4" 
            type="video/mp4" 
          />
        </video>
        {kycStatus === "pending" && (
          <div className="vk-overlay">
            <span className="vk-overlay-text">Click "Start KYC" to begin...</span>
          </div>
        )}
      </div>

      {message && (
        <p className={`vk-message ${kycStatus === "completed" ? "vk-success" : "vk-info"}`}>
          {message}
        </p>
      )}

      <div className="vk-btn-row">
        <button
          onClick={prevStep}
          className="vk-btn vk-btn-back"
        >
          Back
        </button>
        <button
          onClick={startKyc}
          disabled={isVerifying || kycStatus === "completed"}
          className={`vk-btn ${kycStatus === "completed" ? "vk-btn-completed" : isVerifying ? "vk-btn-verifying" : "vk-btn-active"}`}
        >
          {getButtonText()}
        </button>
      </div>
    </div>
  );
};

export default VideoKYC;
