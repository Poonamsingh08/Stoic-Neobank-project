

import React from "react";
import { Home, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

function ActiveLoanCard() {
  const navigate=useNavigate();
  const handleStatement=()=>{
    navigate('/Client/view-loan-statement');
  }
  return (
    <div className="m-4">
      <div className="card shadow rounded-4 border-0 w-100">
        <div className="card-body p-4">
          {/* Header */}
          <div className="d-flex justify-content-between align-items-start mb-4">
            <div>
              <h5 className="fw-semibold mb-1">My Active Loan</h5>
              <p className="text-muted small mb-0">
                Track your current loan details
              </p>
            </div>
            {/* <div className="d-flex align-items-center gap-2 text-success bg-light px-3 py-1 rounded-pill">
              <CheckCircle size={16} />
              <span className="small fw-medium">Active</span>
            </div> */}
            <div className="d-flex align-items-center gap-2 bg-light px-3 py-1 rounded-pill">
              <CheckCircle size={16} color="#900603" />
              <span className="small fw-medium" style={{ color: "#900603" }}>
                Active
              </span>
            </div>
          </div>

          <div className="row g-4">
            {/* Left section - loan details */}
            <div className="col-md-6">
              <div className="d-flex align-items-center gap-3 mb-4">
                <div
                  className="p-2 rounded"
                  style={{ backgroundColor: "#900503" }} // light tint of your custom red
                >
                  <Home size={24} color="#ffc107" />
                </div>

                <div>
                  <h6 className="fw-semibold mb-0">Home Loan</h6>
                  <small className="text-muted">8.5% p.a. • 240 months</small>
                </div>
              </div>

              <ul className="list-unstyled mb-0">
                <li className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Loan Amount</span>
                  <span className="fw-medium">₹25,00,000.00</span>
                </li>
                <li className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Outstanding</span>
                  <span className="fw-medium">₹18,50,000.00</span>
                </li>
                <li className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Monthly EMI</span>
                  <span className="fw-medium">₹23,500.00</span>
                </li>
                <li className="d-flex justify-content-between">
                  <span className="text-muted">Next EMI Date</span>
                  <span className="fw-medium">2/1/2025</span>
                </li>
              </ul>
            </div>

            {/* Right section - progress + actions */}
            <div className="col-md-6">
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="fw-medium">Loan Progress</span>
                  <span className="fw-semibold">25%</span>
                </div>
                <div className="progress" style={{ height: "8px" }}>
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: "25%", backgroundColor: "#900603" }}
                  ></div>
                </div>
                <div className="d-flex justify-content-between small text-muted mt-2">
                  <span>60 months paid</span>
                  <span>180 months remaining</span>
                </div>
              </div>

              <div className="d-flex gap-3">
                <button
                  className="btn text-white fw-medium flex-fill background"
                  style={{ backgroundColor: "#900603" }}
                >
                  Make Payment
                </button>
                {/* <button className="btn btn-outline-warning fw-medium flex-fill">
                  View Statement
                </button> */}
                <button
                  className="btn fw-medium flex-fill"
                  style={{
                    borderColor: "#900603",
                    color: "#900603",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = "#900603";
                    e.currentTarget.style.color = "#fff";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "#900603";
                  }}
                  onClick={() => handleStatement()}
                >
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
