import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import { useOnboarding } from "../context/OnboardingContext";
import "./VideoKYCScreen.css";

export default function VideoKYCScreen() {
  const { setCurrentStep, updateUserData } = useOnboarding();
  const webcamRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [videoURL, setVideoURL] = useState(null);

  const handleStartRecording = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      setVideoURL("sample-video.mp4"); // simulate video recording
      updateUserData({ videoKYCCompleted: true });
      setCurrentStep("updateKYC33"); // ✅ move to next step
    }, 3000);
  };

  return (
    <div className="kyc-container">
      <button onClick={() => setCurrentStep("pan")} className="back-btn">
        <div className="back-arrow">←</div>
        <span>Back</span>
      </button>

      <div className="kyc-card">
        <div className="kyc-icon-container">
          <div className="kyc-icon">🎥</div>
        </div>

        <div className="kyc-header">
          <h2 className="kyc-title">Video KYC</h2>
          <p className="kyc-subtitle">
            Complete your verification with a quick video
          </p>
        </div>

        <div className="video-container">
          {videoURL ? (
            <video src={videoURL} controls className="video-preview" />
          ) : (
            <Webcam
              ref={webcamRef}
              audio={false}
              screenshotFormat="image/jpeg"
              width="100%"
              className="video-preview"
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
    </div>
  );
}
