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
import "./style/LoanProducts.css"; // custom CSS

const loans = [
  {
    type: "Personal Loan",
    Icon: <FaUserTie />,
    rate: "10.5% p.a.",
    tenure: "60 months",
    purpose: "Weddings, travel, or medical emergencies",
    maxAmount: "₹15,00,000.00",
    processing: "24-48 hours",
    url: "/Client/personal-loan",
  },
  {
    type: "Home Loan",
    Icon: <FaHome />,
    rate: "7.2% p.a.",
    tenure: "360 months",
    purpose: "Purchasing or constructing a new home",
    maxAmount: "₹1,00,00,000.00",
    processing: "24-48 hours",
    url: "/Client/home-loan",
  },
  {
    type: "Car Loan",
    Icon: <FaCar />,
    rate: "8.9% p.a.",
    tenure: "84 months",
    purpose: "Finance your dream car",
    maxAmount: "₹25,00,000.00",
    processing: "24-48 hours",
    url: "/Client/car-loan",
  },
  {
    type: "Education Loan",
    Icon: <FaGraduationCap />,
    rate: "9.8% p.a.",
    tenure: "120 months",
    purpose: "Higher education in India or abroad",
    maxAmount: "₹75,00,000.00",
    processing: "24-48 hours",
    url: "/Client/education-loan",
  },
  {
    type: "Small Business Loan",
    Icon: <FaBriefcase />,
    rate: "12% p.a.",
    tenure: "48 months",
    purpose: "Business expansion",
    maxAmount: "₹50,00,000.00",
    processing: "24-48 hours",
    url: "/Client/business-loan",
  },
  {
    type: "Gold Loan",
    Icon: <FaCoins />,
    rate: "9.5% p.a.",
    tenure: "24 months",
    purpose: "Liquidity against gold ornaments",
    maxAmount: "₹20,00,000.00",
    processing: "24-48 hours",
    url: "/Client/gold-loan",
  },
];

function LoanProducts() {
  const navigate = useNavigate();

  return (
    <div className="loan-products-container">
      <div className="loan-products-card">
        <p className="loan-products-title">Available Loan Products</p>
        <h6 className="loan-products-subtitle">
          Choose from our range of competitive loan options
        </h6>

        <div className="loan-products-grid">
          {loans.map((loan, index) => (
            <div className="loan-product-item" key={index}>
              <div className="loan-product-card">
                <div className="loan-product-header">
                  <div className="loan-icon">{loan.Icon}</div>
                  <h6>{loan.type}</h6>
                </div>

                <p className="loan-purpose">{loan.purpose}</p>

                <ul className="loan-info">
                  <li>
                    <span>Interest Rate:</span> {loan.rate}
                  </li>
                  <li>
                    <span>Tenure:</span> {loan.tenure}
                  </li>
                  <li>
                    <span>Max Amount:</span> {loan.maxAmount}
                  </li>
                  <li>
                    <span>Processing Time:</span> {loan.processing}
                  </li>
                </ul>

                <button
                  className="loan-apply-btn"
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
  );
}

export default LoanProducts;
