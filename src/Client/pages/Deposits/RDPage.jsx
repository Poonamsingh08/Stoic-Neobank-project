import React, { useState, useEffect } from "react";
import fdBanner from "./fd-banner.png";
import { useNavigate } from "react-router-dom";
import "./RDPage.css";

function RDPage() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState(100000);
  const [duration, setDuration] = useState(24);
  const [isSenior, setIsSenior] = useState(false);

  const generalRates = [
    { id: "g1", rate: 6.4, label: "For Tenure of 18M to 2Y", months: 24 },
    { id: "g2", rate: 6.6, label: "For Tenure of 2Y 1D to 10Y", months: 36, highlight: true },
    { id: "g3", rate: 6.6, label: "For Tenure of Tax Saver FD (5Y)", months: 60 },
  ];

  const seniorRates = [
    { id: "s1", rate: 6.9, label: "For Tenure of 12M to 2Y", months: 24 },
    { id: "s2", rate: 7.1, label: "For Tenure of 2Y 1D to 10Y", months: 42, highlight: true },
    { id: "s3", rate: 7.3, label: "For Tenure of Tax Saver FD (5Y)", months: 60 },
  ];

  const interestRates = isSenior ? seniorRates : generalRates;
  const [selectedRate, setSelectedRate] = useState(interestRates[0]);

  useEffect(() => {
    setSelectedRate(interestRates[0]);
    setDuration(interestRates[0].months);
  }, [isSenior]);

  const activeRate = selectedRate;
  const r = activeRate.rate / 100;
  const n = duration / 12;
  const maturityAmount = Math.round(amount * Math.pow(1 + r, n));
  const totalInterest = maturityAmount - amount;
  const maturityDate = new Date();
  maturityDate.setMonth(maturityDate.getMonth() + duration);

  return (
    <div>
      {/* Hero */}
      <section className="rd-hero">
        <div className="rd-hero-container">

          <div className="rd-hero-left">
            {/* 🔙 Back Button */}
            <button className="rd-back-btn" onClick={() => navigate(-1)}>
              ← Back
            </button>

            <h1>Recurring Deposit (RD)</h1>
            <h4>Invest smartly and safely</h4>
            <p>Attractive returns | Flexible Tenures | Guaranteed Returns</p>
            <div className="rd-hero-buttons">
              <button
                className="btn-primary"
                onClick={() =>
                  navigate("/Client/fixed-deposit", {
                    state: {
                      type: "Recurring Deposit",
                      amount,
                      duration,
                      interestRate: activeRate.rate,
                      maturity: maturityAmount,
                    },
                  })
                }
              >
                OPEN FD
              </button>
              <button className="btn-outline"onClick={() =>
                  navigate("/Client/deposit")}>Back</button>
            </div>
            <p className="rd-hero-note">⭐ 8,500+ PEOPLE ARE INTERESTED</p>
          </div>

          <div className="rd-hero-right">
            <img src={fdBanner} alt="FD Banner" />
          </div>
        </div>
      </section>



      {/* Calculator */}
      <section className="rd-calculator-section">
        <div className="rd-card">
          <div className="rd-card-header">Recurring Deposit Calculator</div>
          <div className="rd-card-body">
            <div className="rd-card-left">
              {/* Tabs */}
              <div className="rd-tabs">
                <div className={`rd-tab ${!isSenior ? "active" : ""}`} onClick={() => setIsSenior(false)}>General</div>
                <div className={`rd-tab ${isSenior ? "active" : ""}`} onClick={() => setIsSenior(true)}>Senior Citizen</div>
              </div>

              {/* Amount Slider */}
              <div className="rd-input-group">
                <label>Amount to be saved</label>
                <input type="range" min="1000" max="1000000" step="10000" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
                <div className="rd-range-values">
                  <span>₹1000</span>
                  <span className="rd-range-current">₹{amount.toLocaleString()}</span>
                  <span>₹10,00,000</span>
                </div>
              </div>

              {/* Duration Slider */}
              <div className="rd-input-group">
                <label>Duration</label>
                <input type="range" min="6" max="120" step="6" value={duration} onChange={(e) => setDuration(Number(e.target.value))} />
                <div className="rd-range-values">
                  <span>6 Months</span>
                  <span className="rd-range-current">{duration} Months</span>
                  <span>10 Years</span>
                </div>
              </div>

              {/* Interest Slabs */}
              <div className="rd-slabs">
                {interestRates.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => { setSelectedRate(item); setDuration(item.months); }}
                    className={`rd-slab ${activeRate.id === item.id ? "active" : ""}`}
                  >
                    <h5>{item.rate}%</h5>
                    <p>{item.label}</p>
                    {item.highlight && <span className="badge">Highest</span>}
                  </div>
                ))}
              </div>
              <div className="rd-note">Note: The above calculation does not include TDS deductions.</div>
            </div>

            {/* Right Summary */}
            <div className="rd-card-right">
              <div className="rd-summary">
                <h6>Interest Rate</h6>
                <h2>{activeRate.rate.toFixed(2)}% Per Annum</h2>
                <p><strong>Maturity Amount:</strong> ₹{maturityAmount.toLocaleString()}</p>
                <p><strong>Total Interest:</strong> ₹{totalInterest.toLocaleString()}</p>
                <p><strong>Duration:</strong> {duration} Months</p>
                <p><strong>Maturity Date:</strong> {maturityDate.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</p>
                <div className="rd-summary-buttons">
                  <button
                    className="btn-primary"
                    onClick={() =>
                      navigate("/Client/fixed-deposit", { state: { type: "Recurring Deposit", amount, duration, interestRate: activeRate.rate, maturity: maturityAmount } })
                    }
                  >
                    OPEN RECURRING DEPOSIT
                  </button>
                  <button className="btn-outline-dark">CHECK INTEREST RATE</button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="rd-benefits">
        <div className="rd-benefits-container">
          <h3>Get Maximum Benefits from Recurring Deposit Investment</h3>
          <div className="rd-benefit-cards">
            {[
              { title: "Flexible Tenures", desc: "Choose a tenure from 6 months to 10 years." },
              { title: "Attractive Returns", desc: "Benefit from high interest rates, linked to Fixed Deposits." },
              { title: "Goal-Based Savings", desc: "Be financially prepared with What-if planning." },
              { title: "Hassle-Free Setup", desc: "Open RD easily via Mobile, Net Banking, or at branches." },
            ].map((item, i) => (
              <div className="rd-card-benefit" key={i}>
                <h6>{item.title}</h6>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <section className="rd-footer">
        <div className="rd-footer-container">
          <h3>Pick the right Recurring Deposit for you</h3>
          <div className="rd-footer-buttons">
            <button className="btn-primary">For Recurring Deposits</button>
            <button className="btn-outline-dark">With Goal Based Savings</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default RDPage;
