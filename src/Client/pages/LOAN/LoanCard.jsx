import React from "react";
import { FaMoneyBillWave, FaWallet, FaCheckCircle, FaCalendarAlt } from "react-icons/fa";
import "./style/LoanCard.css"; // custom CSS

function LoanCard() {
  return (
    <div className="loan-card-container">
      <div className="loan-card-grid">
        {/* TOTAL LOAN CARD */}
        <div className="loan-card-item">
          <div className="loan-card">
            <div className="loan-card-header">
              <FaMoneyBillWave color="#900603" />
              <h6>Total Loan Amount</h6>
            </div>
            <p className="loan-card-value text-warning">₹25,00,000.00</p>
            <span className="loan-card-subtitle">Life time borrowed</span>
          </div>
        </div>

        {/* OUTSTANDING LOAN CARD */}
        <div className="loan-card-item">
          <div className="loan-card">
            <div className="loan-card-header">
              <FaWallet color="#900603" />
              <h6>Outstanding</h6>
            </div>
            <p className="loan-card-value text-danger">₹18,50,000.00</p>
            <span className="loan-card-subtitle">Remaining balance</span>
          </div>
        </div>

        {/* AMOUNT PAID CARD */}
        <div className="loan-card-item">
          <div className="loan-card">
            <div className="loan-card-header">
              <FaCheckCircle color="#900603" />
              <h6>Amount Paid</h6>
            </div>
            <p className="loan-card-value text-success">₹6,50,000.00</p>
            <span className="loan-card-subtitle">Principal + Interest</span>
          </div>
        </div>

        {/* MONTHLY EMI CARD */}
        <div className="loan-card-item">
          <div className="loan-card">
            <div className="loan-card-header">
              <FaCalendarAlt color="#900603" />
              <h6>Monthly EMI</h6>
            </div>
            <p className="loan-card-value text-primary">₹23,500.00</p>
            <span className="loan-card-subtitle">Next Due: 2/1/2025</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoanCard;
