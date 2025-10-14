import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SendMoney.css";

export default function SendMoney() {
  const navigate = useNavigate();

  const [recipientType, setRecipientType] = useState("mobile");
  const [mobile, setMobile] = useState("");
  const [upiId, setUpiId] = useState("");
  const [bank, setBank] = useState({ acc: "", confirmAcc: "", ifsc: "" });
  const [amount, setAmount] = useState("");
  const [remark, setRemark] = useState("");
  const [error, setError] = useState("");

  const validate = () => {
    setError("");
    if (!amount || Number(amount) <= 0) return setError("Enter valid amount.");
    if (recipientType === "mobile" && !/^\d{10}$/.test(mobile))
      return setError("Enter valid 10-digit mobile number.");
    if (recipientType === "upi" && !/^[\w.+-]+@[\w]+$/.test(upiId))
      return setError("Enter valid UPI ID.");
    if (recipientType === "bank") {
      if (!bank.acc || !bank.confirmAcc || bank.acc !== bank.confirmAcc)
        return setError("Account numbers do not match.");
      if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(bank.ifsc))
        return setError("Enter valid IFSC code.");
    }
    return true;
  };

  const handleSend = () => {
    if (!validate()) return;
    alert(`✅ Sent ₹${amount} via ${recipientType.toUpperCase()}`);
    setMobile("");
    setUpiId("");
    setBank({ acc: "", confirmAcc: "", ifsc: "" });
    setAmount("");
    setRemark("");
  };

  return (
    <div className="sendmoney-wrapper">
      <div className="sendmoney-card">
        {/* Header with Back Button */}
        <div className="sm-header">
          <span className="sm-back-btn" onClick={() => navigate(-1)}>
            ← Back
          </span>
          <h1 className="sm-title">💸 Send Money</h1>
        </div>

        {/* Recipient type selector */}
        <span>Send To</span>
        <div className="recipient-types">
          {["mobile", "upi", "bank"].map((type) => (
            <button
              key={type}
              className={recipientType === type ? "selected" : ""}
              onClick={() => setRecipientType(type)}
            >
              {type === "mobile"
                ? "📱 Mobile"
                : type === "upi"
                ? "💳 UPI ID"
                : "🏦 Bank"}
            </button>
          ))}
        </div>

        {/* Conditional input fields */}
        {recipientType === "mobile" && (
          <input
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="📱 Enter Mobile Number"
          />
        )}
        {recipientType === "upi" && (
          <input
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            placeholder="💳 Enter UPI ID (e.g. name@upi)"
          />
        )}
        {recipientType === "bank" && (
          <>
            <input
              value={bank.acc}
              onChange={(e) => setBank((s) => ({ ...s, acc: e.target.value }))}
              placeholder="🏦 Account Number"
            />
            <input
              value={bank.confirmAcc}
              onChange={(e) =>
                setBank((s) => ({ ...s, confirmAcc: e.target.value }))
              }
              placeholder="🔁 Confirm Account Number"
            />
            <input
              value={bank.ifsc}
              onChange={(e) =>
                setBank((s) => ({ ...s, ifsc: e.target.value.toUpperCase() }))
              }
              placeholder="🔑 IFSC Code"
            />
          </>
        )}

        {/* Amount */}
        <input
          type="number"
          min="1"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="💰 Enter Amount"
        />

        {/* Remark */}
        <input
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
          placeholder="📝 Remark (optional)"
        />

        {/* Error */}
        {error && <div className="sendmoney-error">⚠️ {error}</div>}

        {/* Send button */}
        <button onClick={handleSend} className="send-btn">
          🚀 Send ₹{amount || "0"} Now
        </button>
      </div>
    </div>
  );
}
