import React, { useState, useMemo } from "react";
import { PiggyBank, PlusSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./DepositsPage.css"; // ✅ new unique CSS file

export default function DepositsPageUnique() {
  const navigate = useNavigate();

  const [deposits] = useState([
    {
      id: 1,
      type: "Fixed Deposit",
      rate: 7.5,
      amount: 100000,
      start: "2022-12-15",
      maturityDate: "2025-12-15",
      maturityAmount: 107500,
    },
    {
      id: 2,
      type: "Recurring Deposit",
      rate: 7.0,
      amount: 5000,
      start: "2025-06-30",
      maturityDate: "2026-06-30",
      maturityAmount: 65000,
    },
    {
      id: 3,
      type: "Tax Saver FD",
      rate: 7.75,
      amount: 150000,
      start: "2023-03-20",
      maturityDate: "2028-03-20",
      maturityAmount: 187500,
    },
  ]);

  const [principal, setPrincipal] = useState("");
  const [termYears, setTermYears] = useState("");
  const [interestRate, setInterestRate] = useState(7.5);

  const maturity = useMemo(() => {
    const P = parseFloat(principal) || 0;
    const r = parseFloat(interestRate) / 100;
    const t = parseFloat(termYears) || 0;
    if (!P || !t) return 0;
    return Math.round(P * Math.pow(1 + r, t));
  }, [principal, interestRate, termYears]);

  const totalDeposits = deposits.reduce((s, d) => s + d.amount, 0);
  const expectedReturns = deposits.reduce(
    (s, d) => s + (d.maturityAmount - d.amount),
    0
  );
  const avgInterest = (
    deposits.reduce((s, d) => s + d.rate, 0) / deposits.length
  ).toFixed(2);

  return (
    <div className="depositsUnique-page">
      {/* Header */}
      <header className="depositsUnique-header">
        <div>
          <h2>Deposits</h2>
          <p>Secure your future with guaranteed returns</p>
        </div>
        <div className="depositsUnique-dropdown">
          <button className="depositsUnique-dropdown-btn">
            <PlusSquare size={16} /> Open New Deposit
          </button>
          <div className="depositsUnique-dropdown-menu">
            <button onClick={() => navigate("/Client/fd-calculator")}>
              Fixed Deposit
            </button>
            <button onClick={() => navigate("/Client/recurring-deposit")}>
              Recurring Deposit
            </button>
            <button onClick={() => navigate("/Client/tax-saver-fd11")}>
              Tax Saver FD
            </button>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <div className="depositsUnique-content">
        {/* Deposit Calculator */}
        <div className="depositsUnique-card12">
          <h3>Deposit Calculator</h3>
          <div className="depositsUnique-form-grid">
            <input
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              placeholder="Enter amount"
            />
            <select
              value={termYears}
              onChange={(e) => setTermYears(e.target.value)}
            >
              <option value="">Select term</option>
              <option value="1">1 year</option>
              <option value="2">2 years</option>
              <option value="3">3 years</option>
              <option value="5">5 years</option>
              <option value="10">10 years</option>
            </select>
            <input
              type="number"
              step="0.01"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
            />
            <div className="depositsUnique-maturity-box">
              <div>Maturity Amount</div>
              <div>₹{maturity.toLocaleString()}</div>
            </div>
          </div>
        </div>

        {/* Deposit Options */}
        <div className="depositsUnique-card">
          <h3>Deposit Options</h3>
          <div className="depositsUnique-grid-3">
            <PlanCard
              title="Fixed Deposit"
              rate={7.5}
              minAmount={1000}
              term="10 years"
              navigate={navigate}
            />
            <PlanCard
              title="Recurring Deposit"
              rate={7.0}
              minAmount={500}
              term="10 years"
              navigate={navigate}
            />
            <PlanCard
              title="Tax Saver FD"
              rate={7.75}
              minAmount={100}
              term="5 years"
              navigate={navigate}
            />
          </div>
        </div>

        {/* My Deposits */}
        <div className="depositsUnique-card">
          <h3>My Deposits</h3>
          <div className="depositsUnique-list">
            {deposits.map((d) => (
              <div key={d.id} className="depositsUnique-list-item">
                <div className="depositsUnique-list-left">
                  <div className="icon">
                    <PiggyBank size={18} />
                  </div>
                  <div>
                    <div>{d.type}</div>
                    <div className="text-muted">
                      {d.rate}% p.a. · Matures on {formatDate(d.maturityDate)}
                    </div>
                  </div>
                </div>
                <div className="depositsUnique-list-right">
                  <div className="depositsUnique-amount">
                    ₹{d.amount.toLocaleString()}
                  </div>
                  <div className="depositsUnique-maturity">
                    Maturity: ₹{d.maturityAmount.toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Cards */}
        <div className="depositsUnique-grid-4">
          <SummaryCard
            title="Total Deposits"
            value={`₹${totalDeposits.toLocaleString()}`}
            subtitle={`Across ${deposits.length} accounts`}
          />
          <SummaryCard
            title="Expected Returns"
            value={`₹${expectedReturns.toLocaleString()}`}
            subtitle="Total interest earned"
          />
          <SummaryCard
            title="Next Maturity"
            value="Dec 2025"
            subtitle="Fixed Deposit"
          />
          <SummaryCard
            title="Avg. Interest"
            value={`${avgInterest}%`}
            subtitle="Weighted average"
          />
        </div>
      </div>
    </div>
  );
}

function PlanCard({ title, rate, minAmount, term, navigate }) {
  const handleOpen = () => {
    if (title === "Fixed Deposit") navigate("/Client/fd-calculator");
    else if (title === "Recurring Deposit")
      navigate("/Client/recurring-deposit");
    else if (title === "Tax Saver FD") navigate("/Client/tax-saver-fd11");
  };

  return (
    <div className="depositsUnique-plan-card">
      <div className="depositsUnique-plan-header">
        <div className="depositsUnique-plan-left">
          <div className="icon">
            <PiggyBank size={18} />
          </div>
          <div>
            <div>{title}</div>
            <div className="depositsUnique-plan-info">
              Guaranteed returns with fixed interest rate
            </div>
          </div>
        </div>
        <div className="depositsUnique-badge">{rate}%</div>
      </div>
      <div className="depositsUnique-plan-info">
        <div>
          <strong>Min Amount</strong> ₹{minAmount.toLocaleString()}
        </div>
        <div>
          <strong>Max Term</strong> {term}
        </div>
      </div>
      <ul>
        <li>Guaranteed returns</li>
        <li>Flexible tenure</li>
        <li>Premature withdrawal</li>
      </ul>
      <button onClick={handleOpen}>Open Account</button>
    </div>
  );
}

function SummaryCard({ title, value, subtitle }) {
  return (
    <div className="depositsUnique-summary-card">
      <div className="depositsUnique-summary-title">{title}</div>
      <div className="depositsUnique-summary-value">{value}</div>
      <div className="depositsUnique-summary-subtitle">{subtitle}</div>
    </div>
  );
}

function formatDate(dateStr) {
  try {
    return new Date(dateStr).toLocaleDateString();
  } catch {
    return dateStr;
  }
}
