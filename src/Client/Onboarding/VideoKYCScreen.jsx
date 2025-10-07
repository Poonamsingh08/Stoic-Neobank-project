import React, { useState } from 'react';
import { useOnboarding } from '../context/OnboardingContext';
import './VideoKYCScreen.css';

function VideoKYCScreen({ onComplete }) {
  const { updateUserData } = useOnboarding();
  const [isRecording, setIsRecording] = useState(false);

  const handleStartRecording = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      updateUserData({ kycVideoCompleted: true });
      if (onComplete) onComplete();
    }, 3000);
  };

  return (
    <div className="kyc-container">
      <div className="kyc-card">
        <div className="kyc-icon-container">
          <div className="kyc-icon">🎥</div>
        </div>

        <div className="kyc-header">
          <h2 className="kyc-title">Video KYC</h2>
          <p className="kyc-subtitle">Complete your verification with a quick video</p>
        </div>

        <div className="progress-bar">
          <div className="progress-step active"></div>
          <div className="progress-step active"></div>
          <div className="progress-step active"></div>
          <div className="progress-step active"></div>
        </div>

        <div className="video-container">
          <div className="video-placeholder">
            {isRecording ? (
              <div className="recording-indicator">
                <div className="recording-dot"></div>
                <p>Recording in progress...</p>
              </div>
            ) : (
              <div className="video-prompt">
                <div className="camera-icon">📷</div>
                <p>Camera preview will appear here</p>
              </div>
            )}
          </div>
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
          {isRecording ? 'Recording...' : 'Start Recording'}
        </button>
      </div>
    </div>
  );
}

export default VideoKYCScreen;