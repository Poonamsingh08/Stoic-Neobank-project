import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ For back button
import "./PayBills.css";

const billers = [
  { id: "electricity", name: "Electricity Bill", icon: "💡" },
  { id: "water", name: "Water Bill", icon: "🚰" },
  { id: "gas", name: "Gas Bill", icon: "🔥" },
  { id: "mobile", name: "Mobile Recharge", icon: "📱" },
  { id: "dth", name: "DTH Recharge", icon: "📺" },
  { id: "broadband", name: "Broadband Bill", icon: "🌐" },
];

export default function PayBills() {
  const navigate = useNavigate(); // ✅ Initialize navigate
  const [biller, setBiller] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handlePay = (e) => {
    e.preventDefault();
    if (!biller || !accountNumber || !amount) {
      setMessage("⚠️ Please fill in all fields.");
      return;
    }
    setMessage(`✅ Successfully paid ₹${amount} for ${biller}!`);
    setBiller("");
    setAccountNumber("");
    setAmount("");
  };

  return (
    <div className="paybills-wrapper">
      <div className="paybills-card">
        {/* Header with Back Button */}
        <div className="pb-header">
          <span className="pb-back-btn" onClick={() => navigate(-1)}>← Back</span>
          <h1 className="pb-title">🧾 Pay Bills</h1>
        </div>

        <p>Select a biller and pay instantly</p>

        {/* Biller Grid */}
        <div className="biller-grid">
          {billers.map((item) => (
            <div
              key={item.id}
              className={`biller-card ${biller === item.name ? "selected" : ""}`}
              onClick={() => setBiller(item.name)}
            >
              <div className="icon">{item.icon}</div>
              <div className="name">{item.name}</div>
            </div>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handlePay}>
          <input
            type="text"
            placeholder="Account / Consumer Number"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
          />
          <input
            type="number"
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button type="submit">🚀 Pay Now</button>
        </form>

        {/* Message */}
        {message && <div className="paybills-message">{message}</div>}
      </div>
    </div>
  );
}
