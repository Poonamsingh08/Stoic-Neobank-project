
import React from "react";
import {
  FaUserTie,
  FaHome,
  FaCar,
  FaGraduationCap,
  FaBriefcase,
  FaCoins,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const loans = [
  {
    "Loan Type": "Personal Loan",
    Icon: <FaUserTie className="text-warning fs-4" />,
    "Interest Rate": "10.5% p.a.",
    Tenure: "60 months",
    Purpose: "Weddings, travel, or medical emergencies",
    "Max Amount": "₹15,00,000.00",
    "Processing Time": "24-48 hours",
    url: "/Client/personal-loan"
  },
  {
    "Loan Type": "Home Loan",
    Icon: <FaHome className="text-warning fs-4" />,
    "Interest Rate": "7.2% p.a.",
    Tenure: "360 months",
    Purpose: "Purchasing or constructing a new home",
    "Max Amount": "₹1,00,00,000.00",
    "Processing Time": "24-48 hours",
    url: "/Client/home-loan"
  },
  {
    "Loan Type": "Car Loan",
    Icon: <FaCar className="text-warning fs-4" />,
    "Interest Rate": "8.9% p.a.",
    Tenure: "84 months",
    Purpose: "Finance your dream car",
    "Max Amount": "₹25,00,000.00",
    "Processing Time": "24-48 hours",
    url: "/Client/car-loan"
  },
  {
    "Loan Type": "Education Loan",
    Icon: <FaGraduationCap className="text-warning fs-4" />,
    "Interest Rate": "9.8% p.a.",
    Tenure: "120 months",
    Purpose: "Higher education in India or abroad",
    "Max Amount": "₹75,00,000.00",
    "Processing Time": "24-48 hours",
    url: "/Client/education-loan"
  },
  {
    "Loan Type": "Small Business Loan",
    Icon: <FaBriefcase className="text-warning fs-4" />,
    "Interest Rate": "12% p.a.",
    Tenure: "48 months",
    Purpose: "Business expansion",
    "Max Amount": "₹50,00,000.00",
    "Processing Time": "24-48 hours",
    url: "/Client/business-loan"
  },
  {
    "Loan Type": "Gold Loan",
    Icon: <FaCoins className="text-warning fs-4" />,
    "Interest Rate": "9.5% p.a.",
    Tenure: "24 months",
    Purpose: "Liquidity against gold ornaments",
    "Max Amount": "₹20,00,000.00",
    "Processing Time": "24-48 hours",
    url: "/Client/gold-loan"
  },
];


function LoanProducts() {
  const navigate=useNavigate();
  return (
    <div className="m-4">
      <div className="card shadow rounded-4 border-0">
        <div className="card-body p-4">
          <p className="h5 fw-semibold">Available Loan Products</p>
          <h6 className="text-muted">
            Choose from our range of competitive loan options
          </h6>

          <div className="row g-4 mt-3">
            {loans.map((loan, index) => (
              <div className="col-md-6" key={index}>
                <div className="card h-100 shadow-sm border-0 rounded-4 p-3 hover-shadow">
                  {/* Icon + Loan Type */}
                  <div className="d-flex align-items-center gap-3 mb-3">
                    {/* <div className="bg-warning bg-opacity-25 p-3 rounded" >
                      {loan.Icon}
                    </div> */}
                    <div
                      className="p-3 rounded"
                      style={{ backgroundColor: "#900603" }} // 20 = 12% opacity
                    >
                      {loan.Icon}
                    </div>

                    <h6 className="fw-bold mb-0">{loan["Loan Type"]}</h6>
                  </div>

                  <p className="small text-muted mb-3">{loan.Purpose}</p>

                  <ul className="list-unstyled small text-dark mb-3">
                    <li>
                      <span className="fw-medium text-muted">
                        Interest Rate:
                      </span>{" "}
                      {loan["Interest Rate"]}
                    </li>
                    <li>
                      <span className="fw-medium text-muted">Tenure:</span>{" "}
                      {loan.Tenure}
                    </li>
                    <li>
                      <span className="fw-medium text-muted">Max Amount:</span>{" "}
                      {loan["Max Amount"]}
                    </li>
                    <li>
                      <span className="fw-medium text-muted">
                        Processing Time:
                      </span>{" "}
                      {loan["Processing Time"]}
                    </li>
                  </ul>

                  <button
                    className="btn btn-warning text-white w-100 fw-medium"
                    style={{ backgroundColor: "#900603" }}
                    onClick={() => navigate(loan.url)}
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoanProducts;
