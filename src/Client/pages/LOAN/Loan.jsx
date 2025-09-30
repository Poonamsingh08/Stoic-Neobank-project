
import { FaHandHoldingUsd } from "react-icons/fa";
import React from "react";
import LoanCalculator from "./LoanCalculator";
import ActiveLoanCard from "./ActiveLoanCard";
import LoanProducts from "./LoanProducts";
import LoanCard from "./LoanCard";
import { useNavigate } from "react-router-dom";

const Loan = () => {
  const navigate = useNavigate();

  return (
    <>
{/* Header Section */}
<div
      className="d-flex flex-column flex-md-row align-items-center justify-content-between py-4 px-4 mb-4"
      style={{ backgroundColor: "#900603", width: "100%" }}
    >
      {/* Left side: Title & Subtitle */}
      <div className="text-center text-md-start mb-3 mb-md-0" style={{ backgroundColor: "#900603"}}>
        <h1 className="fw-bold fs-2 text-white mb-1">Loans</h1>
        <p className="text-white mb-0 fs-5">
          Achieve your dreams with flexible loan options
        </p>
      </div>

      {/* Right side: Button */}
      <div className="text-center text-md-end">
        <button
          onClick={() => navigate("/Client/apply-loan")}
          className="btn d-flex align-items-center gap-2 px-4 py-2 fw-semibold text-white shadow"
          style={{  backgroundColor: "#900606",
              border: "2px solid white"}}
        >
         
          Apply for Loan
        </button>
      </div>
    </div>
  



      {/* Other Sections */}
      <LoanCalculator />
      <ActiveLoanCard />
      <LoanProducts />
      <LoanCard />
    </>
  );
};

export default Loan;
