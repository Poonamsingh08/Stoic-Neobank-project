import { FaHandHoldingUsd } from "react-icons/fa";
import React from "react";
import LoanCalculator from "./LoanCalculator";
import ActiveLoanCard from "./ActiveLoanCard";
import LoanProducts from "./LoanProducts";
import LoanCard from "./LoanCard";
import { useNavigate } from "react-router-dom";
import "./style/Loan.css"; // ✅ new unique CSS file

const Loan = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* ===== Header Section ===== */}
      <div className="loanUnique-header">
        {/* Left side: Title & Subtitle */}
        <div className="loanUnique-title">
          <h3>Loans</h3>
          <p>Achieve your dreams with flexible loan options</p>
        </div>

        {/* Right side: Button */}
        <div className="loanUnique-action">
          <button
            onClick={() => navigate("/Client/apply-loan")}
            className="loanUnique-btn"
          >
            <FaHandHoldingUsd size={20} />
            Apply for Loan
          </button>
        </div>
      </div>

      {/* ===== Other Sections ===== */}
      <LoanCalculator />
      <ActiveLoanCard />
      <LoanProducts />
      <LoanCard />
    </>
  );
};

export default Loan;
