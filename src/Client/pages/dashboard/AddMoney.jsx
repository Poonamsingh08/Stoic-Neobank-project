
// import { useState } from "react";
// import { CreditCard, Smartphone, Landmark, Wallet } from "lucide-react";

// const paymentOptions = [
//   { id: "upi", label: "UPI", icon: <Smartphone size={18} /> },
//   { id: "card", label: "Debit / Credit Card", icon: <CreditCard size={18} /> },
//   { id: "bank", label: "Netbanking", icon: <Landmark size={18} /> },
//   { id: "wallet", label: "Wallet", icon: <Wallet size={18} /> },
// ];

// export default function AddMoney() {
//   const [amount, setAmount] = useState("");
//   const [source, setSource] = useState("upi");
//   const [upiId, setUpiId] = useState("");
//   const [card, setCard] = useState({ number: "", expiry: "", cvv: "", name: "" });
//   const [saving, setSaving] = useState(false);
//   const [error, setError] = useState("");
//   const [savePayment, setSavePayment] = useState(false);

//   const validate = () => {
//     setError("");
//     const amt = Number(amount);
//     if (!amt || amt <= 0) { setError("Enter a valid amount."); return false; }
//     if (amt < 10) { setError("Minimum amount is ₹10."); return false; }
//     if (source === "upi") {
//       const re = /^[\w.+-]+@[\w]+$/;
//       if (!re.test(upiId)) { setError("Enter a valid UPI ID."); return false; }
//     }
//     if (source === "card") {
//       if (!/^\d{13,19}$/.test(card.number.replace(/\s+/g, ""))) { setError("Enter a valid card number."); return false; }
//       if (!/^\d{3,4}$/.test(card.cvv)) { setError("Enter valid CVV."); return false; }
//       if (!/^\d{2}\/\d{2}$/.test(card.expiry)) { setError("Expiry should be MM/YY."); return false; }
//     }
//     return true;
//   };

//   const handlePay = () => {
//     if (!validate()) return;
//     setSaving(true);
//     setError("");

//     setTimeout(() => {
//       alert(`✅ Payment successful\nAdded ₹${amount} via ${source.toUpperCase()}`);
//       setAmount("");
//       setUpiId("");
//       setCard({ number: "", expiry: "", cvv: "", name: "" });
//       setSavePayment(false);
//       setSaving(false);
//     }, 1200);
//   };

//   return (
//     <div className="container-fluid py-4 px-3">
//       <div
//         className="card shadow-lg p-4 rounded-4 border-0"
//         style={{ width: "100%", borderRadius: "18px" }}
//       >
//         <h1 className="mb-4  fs-2 fw-bold text-center" style={{ color: "#950606" }}>
//           💰 Add Money
//         </h1>

//         {/* Amount */}
//         <div className="mb-3">
//           <label className="form-label">Amount (INR)</label>
//           <div className="input-group">
//             <span className="input-group-text">₹</span>
//             <input
//               type="number"
//               className="form-control"
//               min="10"
//               value={amount}
//               onChange={(e) => setAmount(e.target.value)}
//               placeholder="Enter amount e.g. 1000"
//             />
//           </div>
//         </div>

//         {/* Payment Source */}
//         <div className="mb-4">
//           <label className="form-label">Choose source</label>
//           <div className="d-flex flex-wrap gap-2">
//             {paymentOptions.map((opt) => (
//               <button
//                 type="button"
//                 key={opt.id}
//                 onClick={() => setSource(opt.id)}
//                 className={`btn rounded-pill d-flex align-items-center gap-2 px-3 py-2 ${
//                   source === opt.id ? "btn-danger text-white" : "btn-outline-secondary"
//                 }`}
//                 style={
//                   source === opt.id
//                     ? { backgroundColor: "#950606", borderColor: "#950606" }
//                     : {}
//                 }
//               >
//                 {opt.icon} {opt.label}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* UPI */}
//         {source === "upi" && (
//           <div className="mb-3">
//             <label className="form-label">UPI ID</label>
//             <div className="input-group">
//               <span className="input-group-text">@</span>
//               <input
//                 type="text"
//                 className="form-control"
//                 value={upiId}
//                 onChange={(e) => setUpiId(e.target.value)}
//                 placeholder="example@bank"
//               />
//             </div>
//           </div>
//         )}

//         {/* Card */}
//         {source === "card" && (
//           <div className="mb-3">
//             <div className="input-group mb-2">
//               <span className="input-group-text"><CreditCard size={18} /></span>
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Card number"
//                 value={card.number}
//                 onChange={(e) => setCard((s) => ({ ...s, number: e.target.value }))}
//               />
//             </div>
//             <div className="row g-2">
//               <div className="col-6">
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="MM/YY"
//                   value={card.expiry}
//                   onChange={(e) => setCard((s) => ({ ...s, expiry: e.target.value }))}
//                 />
//               </div>
//               <div className="col-6">
//                 <input
//                   type="password"
//                   className="form-control"
//                   placeholder="CVV"
//                   value={card.cvv}
//                   onChange={(e) => setCard((s) => ({ ...s, cvv: e.target.value }))}
//                 />
//               </div>
//             </div>
//             <input
//               type="text"
//               className="form-control mt-2"
//               placeholder="Cardholder name"
//               value={card.name}
//               onChange={(e) => setCard((s) => ({ ...s, name: e.target.value }))}
//             />
//             <div className="form-check mt-2">
//               <input
//                 type="checkbox"
//                 className="form-check-input"
//                 checked={savePayment}
//                 onChange={(e) => setSavePayment(e.target.checked)}
//                 id="saveCard"
//               />
//               <label htmlFor="saveCard" className="form-check-label small">
//                 Save this card for faster payments
//               </label>
//             </div>
//           </div>
//         )}

//         {/* Error */}
//         {error && <div className="alert alert-danger py-2">{error}</div>}

//         {/* Button */}
//         <div className="d-grid">
//           <button
//             onClick={handlePay}
//             disabled={saving}
//             className="btn btn-lg fw-bold text-white rounded-pill"
//             style={{ backgroundColor: "#950606" }}
//           >
//             {saving ? "Processing..." : `Add ₹${amount || ""}`}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import { CreditCard, Smartphone, Landmark, Wallet } from "lucide-react";
import "./AddMoney.css"; // external css file

const paymentOptions = [
  { id: "upi", label: "UPI", icon: <Smartphone size={18} /> },
  { id: "card", label: "Debit / Credit Card", icon: <CreditCard size={18} /> },
  { id: "bank", label: "Netbanking", icon: <Landmark size={18} /> },
  { id: "wallet", label: "Wallet", icon: <Wallet size={18} /> },
];

export default function AddMoney() {
  const [amount, setAmount] = useState("");
  const [source, setSource] = useState("upi");
  const [upiId, setUpiId] = useState("");
  const [card, setCard] = useState({ number: "", expiry: "", cvv: "", name: "" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [savePayment, setSavePayment] = useState(false);

  const validate = () => {
    setError("");
    const amt = Number(amount);
    if (!amt || amt <= 0) { setError("Enter a valid amount."); return false; }
    if (amt < 10) { setError("Minimum amount is ₹10."); return false; }
    if (source === "upi") {
      const re = /^[\w.+-]+@[\w]+$/;
      if (!re.test(upiId)) { setError("Enter a valid UPI ID."); return false; }
    }
    if (source === "card") {
      if (!/^\d{13,19}$/.test(card.number.replace(/\s+/g, ""))) { setError("Enter a valid card number."); return false; }
      if (!/^\d{3,4}$/.test(card.cvv)) { setError("Enter valid CVV."); return false; }
      if (!/^\d{2}\/\d{2}$/.test(card.expiry)) { setError("Expiry should be MM/YY."); return false; }
    }
    return true;
  };

  const handlePay = () => {
    if (!validate()) return;
    setSaving(true);
    setError("");

    setTimeout(() => {
      alert(`✅ Payment successful\nAdded ₹${amount} via ${source.toUpperCase()}`);
      setAmount("");
      setUpiId("");
      setCard({ number: "", expiry: "", cvv: "", name: "" });
      setSavePayment(false);
      setSaving(false);
    }, 1200);
  };

  return (
    <div className="addmoney-container">
      <div className="addmoney-card">
        <h1 className="addmoney-title">💰 Add Money</h1>

        {/* Amount */}
        <div className="form-group">
          <label style={{fontSize:'16px',fontWeight:'bold'}}>Amount (INR)</label>
          <div className="input-wrapper">
            <span className="input-prefix">₹</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount e.g. 1000"
            />
          </div>
        </div>

        {/* Payment Source */}
        <div className="form-group">
          <label style={{fontSize:'16px',fontWeight:'bold'}}>Choose source</label>
          <div className="options">
            {paymentOptions.map((opt) => (
              <button
                type="button"
                key={opt.id}
                onClick={() => setSource(opt.id)}
                className={`option-btn ${source === opt.id ? "active" : ""}`}
              >
                {opt.icon} {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* UPI */}
        {source === "upi" && (
          <div className="form-group">
            <label style={{fontSize:'16px',fontWeight:'bold'}}>UPI ID</label>
            <div className="input-wrapper">
              <span className="input-prefix">@</span>
              <input
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="example@bank"
              />
            </div>
          </div>
        )}

        {/* Card */}
        {source === "card" && (
          <div className="form-group">
            <div className="input-wrapper">
              <span className="input-prefix"><CreditCard size={18} /></span>
              <input
                type="text"
                placeholder="Card number"
                value={card.number}
                onChange={(e) => setCard((s) => ({ ...s, number: e.target.value }))}
              />
            </div>
            <div className="row">
              <input
                type="text"
                placeholder="MM/YY"
                value={card.expiry}
                onChange={(e) => setCard((s) => ({ ...s, expiry: e.target.value }))}
              />
              <input
                type="password"
                placeholder="CVV"
                value={card.cvv}
                onChange={(e) => setCard((s) => ({ ...s, cvv: e.target.value }))}
              />
            </div>
            <input
              type="text"
              className="full-input"
              placeholder="Cardholder name"
              value={card.name}
              onChange={(e) => setCard((s) => ({ ...s, name: e.target.value }))}
            />
            <label className="checkbox"  style={{fontSize:'16px',fontWeight:'bold'}}>
              <input
                type="checkbox"
                checked={savePayment}
                onChange={(e) => setSavePayment(e.target.checked)}
               
              />
              Save this card for faster payments
            </label>
          </div>
        )}

        {/* Error */}
        {error && <div className="error">{error}</div>}

        {/* Button */}
        <button
          onClick={handlePay}
          disabled={saving}
          className="pay-btn"
        >
          {saving ? "Processing..." : `Add ₹${amount || ""}`}
        </button>
      </div>
    </div>
  );
}
