import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import fdBanner from "./fd-banner.png";
import "./TaxSaverFD.css";

const TaxSaverFD = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState(10000);
  const rate = 7.75;
  const term = 5; // 5 Years Fixed
  const maturity = Math.round(amount * Math.pow(1 + rate / 100, term));

  return (
    <div className="fd-container">

      {/* Hero Section */}
      <section className="fd-hero">
        <div className="fd-hero-inner">
          <div className="fd-hero-left">
            {/* 🔙 Back Button */}
            <button className="ts-back-btn" onClick={() => navigate(-1)}>
              ← Back
            </button>

            <h1>Tax Saver Fixed Deposit</h1>
            <p>
              Save tax under Section 80C & earn guaranteed <strong>7.75% returns</strong>
            </p>
            <div className="fd-buttons">
              <button
                className="btn-primary"
                onClick={() =>
                  navigate("/Client/fixed-deposit", {
                    state: {
                      type: "Tax Saver FD",
                      amount,
                      duration: 0,
                      interestRate: 0,
                      maturity: 0,
                    },
                  })
                }
              >
                Open FD Account
              </button>
              <button className="btn-outline" onClick={() => navigate("/Client/deposit")}>Back</button>
            </div>
          </div>
          <div className="fd-hero-right">
            <img src={fdBanner} alt="FD Banner" />
          </div>
        </div>
      </section>


      {/* Calculator Section */}
      <section className="fd-calculator">
        <div className="fd-calculator-inner">
          <div className="fd-calculator-left">
            <h2>Calculate Your Returns</h2>
            <input
              type="number"
              value={amount}
              min={100}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="fd-input"
            />
            <div className="fd-cards">
              <div className="fd-card">
                <h3>Interest Rate</h3>
                <p>{rate}%</p>
              </div>
              <div className="fd-card">
                <h3>Tenure</h3>
                <p>{term} Years</p>
              </div>
              <div className="fd-card">
                <h3>Maturity Value</h3>
                <p>₹{maturity.toLocaleString()}</p>
              </div>
            </div>
            <p className="fd-note">*Premature withdrawal not allowed</p>
          </div>
          <div className="fd-calculator-right">
            <div className="fd-summary-card">
              <h3>Summary</h3>
              <p>Amount: ₹{amount.toLocaleString()}</p>
              <p>Rate: {rate}% p.a.</p>
              <p>Tenure: {term} Years</p>
              <p>Maturity: ₹{maturity.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="fd-benefits">
        <h2>Why Choose Tax Saver FD?</h2>
        <div className="fd-benefit-cards">
          {[
            "Save tax upto ₹1.5 Lakh under 80C",
            "100% Guaranteed & Safe Returns",
            "Start with just ₹100",
            "Hassle-free Setup",
          ].map((benefit, i) => (
            <div key={i} className="fd-benefit-card">
              <h3>{benefit}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="fd-cta">
        <h2>Start your Tax Saver FD Today</h2>
        <button
          className="btn-primary flex-btn"
          onClick={() => navigate("/Client/fixed-deposit", { state: { type: "Tax Saver FD", amount, duration: 0, interestRate: 0, maturity: 0 } })}
        >
          Open FD Account <ArrowRight size={18} />
        </button>
      </section>

    </div>
  );
};

export default TaxSaverFD;
