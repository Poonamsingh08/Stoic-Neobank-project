import React, { useState, useEffect } from "react";
import fdBanner from "./fd-banner.png";
import { useNavigate } from "react-router-dom";
import "./FdCalculator.css"; // custom CSS file

function FdCalculator() {
  const navigate = useNavigate();

  // States
  const [amount, setAmount] = useState(100000);
  const [duration, setDuration] = useState(24); // months
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
    <div className="fd-page">
        
      {/* Hero Section */}
      <section className="fd-hero">
        <div className="fd-hero-container">

          {/* 🔙 Back Button */}
          <button className="fd-back-btn" onClick={() => navigate(-1)}>
            ← Back
          </button>

          <div className="fd-hero-left">
            <h1>Fixed Deposit (FD)</h1>
            <h4>Invest smartly and safely</h4>
            <p>Attractive returns | Flexible Tenures | Guaranteed Returns</p>
            <div className="fd-hero-buttons">
              <button
                className="btn-primary"
                onClick={() =>
                  navigate("/Client/fixed-deposit", {
                    state: {
                      type: "Fixed Deposit",
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
            <p className="fd-hero-note">⭐ 8,500+ PEOPLE ARE INTERESTED</p>
          </div>

          <div className="fd-hero-right">
            <img src={fdBanner} alt="FD Banner" />
          </div>
        </div>
      </section>


      {/* FD Calculator */}
      <section className="fd-calculator-section">
        <div className="fd-card">
          <div className="fd-card-header">Fixed Deposit Calculator</div>
          <div className="fd-card-body">
            {/* Left Section */}
            <div className="fd-card-left">

              {/* Tabs */}
              <div className="fd-tabs">
                <button
                  className={`fd-tab ${!isSenior ? "active" : ""}`}
                  onClick={() => setIsSenior(false)}
                >
                  General
                </button>
                <button
                  className={`fd-tab ${isSenior ? "active" : ""}`}
                  onClick={() => setIsSenior(true)}
                >
                  Senior Citizen
                </button>
              </div>

              {/* Amount Slider */}
              <div className="fd-input-group">
                <label>Amount to be saved</label>
                <input
                  type="range"
                  min="1000"
                  max="1000000"
                  step="10000"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                />
                <div className="fd-range-values">
                  <span>₹1,000</span>
                  <span className="fd-range-current">₹{amount.toLocaleString()}</span>
                  <span>₹10,00,000</span>
                </div>
              </div>

              {/* Duration Slider */}
              <div className="fd-input-group">
                <label>Duration</label>
                <input
                  type="range"
                  min="6"
                  max="120"
                  step="6"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                />
                <div className="fd-range-values">
                  <span>6 Months</span>
                  <span className="fd-range-current">{duration} Months</span>
                  <span>10 Years</span>
                </div>
              </div>

              {/* Interest Slabs */}
              <div className="fd-slabs">
                {interestRates.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      setSelectedRate(item);
                      setDuration(item.months);
                    }}
                    className={`fd-slab ${activeRate.id === item.id ? "active" : ""}`}
                  >
                    <h5>{item.rate}%</h5>
                    <p>{item.label}</p>
                    {item.highlight && <span className="badge">Highest</span>}
                  </div>
                ))}
              </div>

              <div className="fd-note">
                Note: The above calculation does not include TDS deductions.
              </div>
            </div>

            {/* Right Summary */}
            <div className="fd-card-right">
              <div className="fd-summary">
                <h6>Interest Rate</h6>
                <h2>{activeRate.rate.toFixed(2)}% Per Annum</h2>
                <hr />
                <p><strong>Maturity Amount:</strong> ₹{maturityAmount.toLocaleString()}</p>
                <p><strong>Total Interest:</strong> ₹{totalInterest.toLocaleString()}</p>
                <p><strong>Duration:</strong> {duration} Months</p>
                <p><strong>Maturity Date:</strong>{" "}
                  {maturityDate.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                </p>

                <div className="fd-summary-buttons">
                  <button
                    className="btn-primary"
                    onClick={() =>
                      navigate("/Client/fixed-deposit", {
                        state: {
                          type: "Fixed Deposit",
                          amount,
                          duration,
                          interestRate: activeRate.rate,
                          maturity: maturityAmount,
                        },
                      })
                    }
                  >
                    OPEN FIXED DEPOSIT
                  </button>
                  <button
                    className="btn-outline-dark"
                    onClick={() => alert("Interest rate checked!")}
                  >
                    CHECK INTEREST RATE
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="fd-benefits">
        <div className="fd-benefits-container">
          <h3>Get Maximum Benefits from Fixed Deposit Investment</h3>
          <div className="fd-benefit-cards">
            {[
              { title: "Additional Interest Rate", desc: "Senior Citizen FD is at +0.50% of additional interest rate" },
              { title: "Overdraft Against FD", desc: "Avail Overdraft against FD for emergencies" },
              { title: "Choose Tenure with Max Interest Rate", desc: "Tenures of 2 years 1 day to 10 years avail maximum interest rate of 6.60% p.a." },
              { title: "Instant FD Creation", desc: "Now create an FD online anytime, anywhere within 60 seconds" },
            ].map((item, i) => (
              <div key={i} className="fd-benefit-card">
                <h6>{item.title}</h6>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

export default FdCalculator;

