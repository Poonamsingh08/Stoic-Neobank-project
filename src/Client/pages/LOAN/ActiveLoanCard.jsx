
import React from "react";
import { Home, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./style/ActiveLoanCard.css"; // custom CSS file

function ActiveLoanCard() {
  const navigate = useNavigate();
  const handleStatement = () => {
    navigate("/Client/view-loan-statement");
  };

  return (
    <div className="loan-card-container">
      <div className="loan-card">
        <div className="loan-card-body">
          {/* Header */}
          <div className="loan-header111">
            <div>
              <h5>My Active Loan</h5>
              <p>Track your current loan details</p>
            </div>

            <div className="loan-status">
              <CheckCircle size={16} color="#900603" />
              <span>Active</span>
            </div>
          </div>

          <div className="loan-content">
            {/* Left section - loan details */}
            <div className="loan-details">
              <div className="loan-type">
                <div className="loan-icon">
                  <Home size={24} color="#ffc107" />
                </div>
                <div>
                  <h6>Home Loan</h6>
                  <small>8.5% p.a. • 240 months</small>
                </div>
              </div>

              <ul>
                <li>
                  <span>Loan Amount</span>
                  <span>₹25,00,000.00</span>
                </li>
                <li>
                  <span>Outstanding</span>
                  <span>₹18,50,000.00</span>
                </li>
                <li>
                  <span>Monthly EMI</span>
                  <span>₹23,500.00</span>
                </li>
                <li>
                  <span>Next EMI Date</span>
                  <span>2/1/2025</span>
                </li>
              </ul>
            </div>

            {/* Right section - progress + actions */}
            <div className="loan-progress-section">
              <div className="loan-progress">
                <div className="loan-progress-header">
                  <span>Loan Progress</span>
                  <span>25%</span>
                </div>
                <div className="loan-progress-bar">
                  <div className="loan-progress-fill"></div>
                </div>
                <div className="loan-progress-info">
                  <span>60 months paid</span>
                  <span>180 months remaining</span>
                </div>
              </div>

              <div className="loan-actions">
                <button className="btn-primary">Make Payment</button>
                <button className="btn-outline" onClick={handleStatement}>
                  View Statement
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActiveLoanCard;
