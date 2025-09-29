import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./services.css";

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);
  const navigate = useNavigate();

  // 🔹 Categories with services
  const serviceCategories = [
    {
      category: "Accounts",
      services: [
        { label: "Open Savings Account", icon: "🏦" },
        { label: "Fixed Deposit", icon: "💰" },
        { label: "Recurring Deposit (RD)", icon: "🗓️" },
        { label: "Government Schemes (PPF/SSY)", icon: "🏦" },
      ],
    },
    {
      category: "Loans",
      services: [
        { label: "Loan Services", icon: "📄" },
        { label: "Loan Eligibility Check", icon: "📌" },
        { label: "EMI Calculator", icon: "🧮" },
      ],
    },
    {
      category: "Cards",
      services: [
        { label: "Credit Card Services", icon: "💳" },
        { label: "Block / Unblock Card", icon: "🛑" },
        { label: "Change Card PIN", icon: "🔐" },
        { label: "Set Spending Limit", icon: "📉" },
      ],
    },
    {
      category: "Payments",
      services: [
        { label: "Fund Transfer", icon: "💸" },
        { label: "UPI Payments", icon: "📲" },
        { label: "Bill Payments", icon: "🧾" },
        { label: "Add Beneficiary", icon: "👤" },
      ],
    },
    {
      category: "Digital Banking",
      services: [
        { label: "Mobile Banking Registration", icon: "📱" },
        { label: "Internet Banking Activation", icon: "🖥️" },
        { label: "Reset / Change Password", icon: "🔑" },
        { label: "e-Statement Subscription", icon: "🧾" },
      ],
    },
    {
      category: "Security & Support",
      services: [
        { label: "Report Fraud", icon: "⚠️" },
        { label: "Raise Service Request", icon: "🗣️" },
        { label: "Feedback / Complaint", icon: "✉️" },
        { label: "Stop Cheque Payment", icon: "❌" },
        { label: "Cheque Book Request", icon: "📜" },
      ],
    },
  ];

  // 🔹 Popular services
  const popularServices = [
    { label: "UPI Payments", icon: "📲" },
    { label: "Fund Transfer", icon: "💸" },
    { label: "Bill Payments", icon: "🧾" },
    { label: "Mobile Banking", icon: "📱" },
  ];

  // 🔹 Map each service to a route
  const serviceRoutes = {
    "Open Savings Account": "/Client/myAccount",
    "Fixed Deposit": "/Client/Deposit",
    "Recurring Deposit (RD)": "/Client/Deposit",
    "Government Schemes (PPF/SSY)": "/ppf",
    "Loan Services": "/Client/Loan",
    "Loan Eligibility Check": "/Client/Loan",
    "EMI Calculator": "/Loan",
    "Credit Card Services": "/Client/cards",
    "Block / Unblock Card": "/Client/cards",
    "Change Card PIN": "/cards",
    "Set Spending Limit": "/Client/money-transfer",
    "Fund Transfer": "/Client/money-transfer",
    "UPI Payments": "/Client/send-money",
    "Bill Payments": "/Client/pay-bills",
    "Add Beneficiary": "/addBeneficiary",
    "Mobile Banking Registration": "/mobileBanking",
    "Internet Banking Activation": "/internetBanking",
    "Reset / Change Password": "/resetPassword",
    "e-Statement Subscription": "/Client/account-statement",
    "Report Fraud": "/complaintfeedback",
    "Raise Service Request": "/Client/complaintfeedback",
    "Feedback / Complaint": "/Client/complaintfeedback",
    "Stop Cheque Payment": "/Client/stopCheque",
    "Cheque Book Request": "/Client/chequeBook",
  };

  // 🔹 Handle Proceed
  const handleProceed = (service) => {
    if (serviceRoutes[service]) {
      navigate(serviceRoutes[service]);
    } else {
      alert(`No route defined for "${service}"`);
    }
  };

  return (
    <div className="services-container">
       {/* Header */}
      <div
        className="py-4 text-center shadow-sm"
        style={{ backgroundColor: "#960603" }}
      >
        <h1 className="fw-bold fs-2 text-white">Our Services</h1>
        <p className="text-light mb-0">
          Explore all the banking services we provide
        </p>
      
      </div>

      {/* Category-wise services */}
      {serviceCategories.map((cat, i) => (
        <div key={i} className="category-section">
          <h2 className="category-title">{cat.category}</h2>
          <div className="services-grid">
            {cat.services.map((service, j) => (
              <div
                key={j}
                className="service-card"
                onClick={() => setSelectedService(service.label)}
              >
                <span className="service-icon">{service.icon}</span>
                <p className="service-label">{service.label}</p>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Popular Services */}
      <div className="popular-services">
        <h2 className="popular-title">Popular Services</h2>
        <div className="popular-grid">
          {popularServices.map((service, index) => (
            <div
              key={index}
              className="popular-card"
              onClick={() => setSelectedService(service.label)}
            >
              <span className="popular-icon">{service.icon}</span>
              <p className="popular-label">{service.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedService && (
        <div className="modal-overlay" onClick={() => setSelectedService(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedService}</h2>
            <p>
              You have selected <strong>{selectedService}</strong>. Proceed
              further…
            </p>

            <div className="modal-actions">
              <button
                className="close-btn"
                onClick={() => setSelectedService(null)}
              >
                Close
              </button>
              <button
                className="proceed-btn"
                onClick={() => handleProceed(selectedService)}
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;
