


// import { useState } from "react";

// export default function SendMoney() {
//   const [recipientType, setRecipientType] = useState("mobile");
//   const [mobile, setMobile] = useState("");
//   const [upiId, setUpiId] = useState("");
//   const [bank, setBank] = useState({ acc: "", confirmAcc: "", ifsc: "" });
//   const [amount, setAmount] = useState("");
//   const [remark, setRemark] = useState("");
//   const [error, setError] = useState("");

//   const validate = () => {
//     setError("");
//     if (!amount || Number(amount) <= 0) return setError("Enter valid amount.");
//     if (recipientType === "mobile" && !/^\d{10}$/.test(mobile))
//       return setError("Enter valid 10-digit mobile number.");
//     if (recipientType === "upi" && !/^[\w.+-]+@[\w]+$/.test(upiId))
//       return setError("Enter valid UPI ID.");
//     if (recipientType === "bank") {
//       if (!bank.acc || !bank.confirmAcc || bank.acc !== bank.confirmAcc)
//         return setError("Account numbers do not match.");
//       if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(bank.ifsc))
//         return setError("Enter valid IFSC code.");
//     }
//     return true;
//   };

//   const handleSend = () => {
//     if (!validate()) return;
//     alert(`✅ Sent ₹${amount} via ${recipientType.toUpperCase()}`);
//     setMobile("");
//     setUpiId("");
//     setBank({ acc: "", confirmAcc: "", ifsc: "" });
//     setAmount("");
//     setRemark("");
//   };

//   return (
//     <div
//       className="d-flex justify-content-center align-items-center"
//       style={{
//         width: "100vw",        // full screen width
//           // full screen height
//         backgroundColor: "#fafafa",
//         // overflow: "hidden",
        
//       }}
//     >
//       <div
//     className="w-100 h-100 p-4 mb-1"
//     style={{
//       borderRadius: "12px",   // optional rounded corners
//       backgroundColor: "#fff",
//       boxShadow: "0px 6px 20px rgba(0,0,0,0.1)",
//       margin:'30px'
//     }}
//   >
//         <div className="card-body p-4 d-flex flex-column">
//           <h1
//             className="mb-4 fw-bold fs-2 text-center"
//             style={{ color: "#950606", letterSpacing: "0.5px" }}
//           >
//             💸 Send Money
//           </h1>

//           {/* Recipient type selector */}
//           <div className="mb-4">
//             <span className="text-muted small fw-semibold">Send To</span>
//             <div className="d-flex gap-2 mt-2">
//               {["mobile", "upi", "bank"].map((type) => (
//                 <button
//                   key={type}
//                   onClick={() => setRecipientType(type)}
//                   className={`btn btn-sm fw-semibold px-3 py-2 rounded-pill ${
//                     recipientType === type
//                       ? "text-white"
//                       : "btn-outline-secondary"
//                   }`}
//                   style={{
//                     backgroundColor:
//                       recipientType === type ? "#950606" : "transparent",
//                     borderColor: recipientType === type ? "#950606" : "#ccc",
//                     transition: "all 0.3s ease",
//                   }}
//                 >
//                   {type === "mobile"
//                     ? "📱 Mobile"
//                     : type === "upi"
//                     ? "💳 UPI ID"
//                     : "🏦 Bank"}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Conditional input fields */}
//           {recipientType === "mobile" && (
//             <input
//               value={mobile}
//               onChange={(e) => setMobile(e.target.value)}
//               placeholder="📱 Enter Mobile Number"
//               className="form-control mb-3 rounded-pill px-3 py-2"
//             />
//           )}
//           {recipientType === "upi" && (
//             <input
//               value={upiId}
//               onChange={(e) => setUpiId(e.target.value)}
//               placeholder="💳 Enter UPI ID (e.g. name@upi)"
//               className="form-control mb-3 rounded-pill px-3 py-2"
//             />
//           )}
//           {recipientType === "bank" && (
//             <div className="mb-3">
//               <input
//                 value={bank.acc}
//                 onChange={(e) => setBank((s) => ({ ...s, acc: e.target.value }))}
//                 placeholder="🏦 Account Number"
//                 className="form-control mb-2 rounded-pill px-3 py-2"
//               />
//               <input
//                 value={bank.confirmAcc}
//                 onChange={(e) =>
//                   setBank((s) => ({ ...s, confirmAcc: e.target.value }))
//                 }
//                 placeholder="🔁 Confirm Account Number"
//                 className="form-control mb-2 rounded-pill px-3 py-2"
//               />
//               <input
//                 value={bank.ifsc}
//                 onChange={(e) =>
//                   setBank((s) => ({ ...s, ifsc: e.target.value.toUpperCase() }))
//                 }
//                 placeholder="🔑 IFSC Code"
//                 className="form-control rounded-pill px-3 py-2"
//               />
//             </div>
//           )}

//           {/* Amount */}
//           <input
//             type="number"
//             min="1"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//             placeholder="💰 Enter Amount"
//             className="form-control mb-3 rounded-pill px-3 py-2"
//           />

//           {/* Remark */}
//           <input
//             value={remark}
//             onChange={(e) => setRemark(e.target.value)}
//             placeholder="📝 Remark (optional)"
//             className="form-control mb-3 rounded-pill px-3 py-2"
//           />

//           {/* Error Message */}
//           {error && (
//             <p className="text-danger small fw-semibold mb-3">⚠️ {error}</p>
//           )}

//           {/* Send button */}
//           <button
//             onClick={handleSend}
//             className="btn w-100 text-white fw-bold  rounded-pill mt-auto"
//             style={{
//               backgroundColor: "#950606",
//               boxShadow: "0px 4px 12px rgba(149, 6, 6, 0.4)",
//               transition: "all 0.3s ease",
//             }}
//             onMouseOver={(e) =>
//               (e.currentTarget.style.backgroundColor = "#7a0505")
//             }
//             onMouseOut={(e) =>
//               (e.currentTarget.style.backgroundColor = "#950606")
//             }
//           >
//             🚀 Send ₹{amount || "0"} Now
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import "./SendMoney.css";

export default function SendMoney() {
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
        <h1>💸 Send Money</h1>

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
