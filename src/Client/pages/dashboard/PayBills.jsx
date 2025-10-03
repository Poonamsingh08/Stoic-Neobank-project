

// import { useState } from "react";

// const PayBills = () => {
//   const [biller, setBiller] = useState("");
//   const [accountNumber, setAccountNumber] = useState("");
//   const [amount, setAmount] = useState("");
//   const [message, setMessage] = useState("");

//   const billers = [
//     { id: "electricity", name: "Electricity Bill", icon: "💡" },
//     { id: "water", name: "Water Bill", icon: "🚰" },
//     { id: "gas", name: "Gas Bill", icon: "🔥" },
//     { id: "mobile", name: "Mobile Recharge", icon: "📱" },
//     { id: "dth", name: "DTH Recharge", icon: "📺" },
//     { id: "broadband", name: "Broadband Bill", icon: "🌐" },
//   ];

//   const handlePay = (e) => {
//     e.preventDefault();
//     if (!biller || !accountNumber || !amount) {
//       setMessage("⚠️ Please fill in all fields.");
//       return;
//     }
//     setMessage(`✅ Successfully paid ₹${amount} for ${biller}!`);
//     setBiller("");
//     setAccountNumber("");
//     setAmount("");
//   };

//   return (
//     <div
//       className="d-flex justify-content-center align-items-center"
//       style={{
//         width: "100vw", // full window width
//         height: "100vh", // full window height
//         backgroundColor: "#fafafa",
//       }}
//     >
//       {/* Outer bordered box */}
//       <div
//         className="w-100 h-100 p-4 mb-2"
//         style={{
       
//           borderRadius: "12px",
//           backgroundColor: "#fff",
//           boxShadow: "0px 6px 20px rgba(0,0,0,0.1)",
//           overflowY: "auto",
//           margin:'30px'
//         }}
//       >
//         <div className="p-2">
//           <h1
//             className="fw-bold fs-2 text-center mb-2"
//             style={{ color: "#950606" }}
//           >
//             🧾 Pay Bills
//           </h1>
//           <p className="text-muted text-center mb-4">
//             Select a biller and pay instantly
//           </p>

//           {/* Biller options */}
//           <div className="row g-3 mb-4">
//             {billers.map((item) => (
//               <div key={item.id} className="col-6 col-md-4">
//                 <div
//                   onClick={() => setBiller(item.name)}
//                   className={`text-center p-3 border rounded-4 shadow-sm h-100 ${
//                     biller === item.name
//                       ? "border-2 border-danger bg-light"
//                       : "border-secondary-subtle"
//                   }`}
//                   style={{
//                     transition: "all 0.3s ease",
//                     cursor: "pointer",
//                   }}
//                 >
//                   <div className="fs-3 mb-2">{item.icon}</div>
//                   <p className="small fw-semibold mb-0">{item.name}</p>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Form */}
//           <form onSubmit={handlePay}>
//             <div className="mb-3">
//               <input
//                 type="text"
//                 placeholder="Account / Consumer Number"
//                 value={accountNumber}
//                 onChange={(e) => setAccountNumber(e.target.value)}
//                 className="form-control rounded-pill px-3 py-2"
//               />
//             </div>
//             <div className="mb-3">
//               <input
//                 type="number"
//                 placeholder="Enter Amount"
//                 value={amount}
//                 onChange={(e) => setAmount(e.target.value)}
//                 className="form-control rounded-pill px-3 py-2"
//               />
//             </div>
//             <button
//               type="submit"
//               className="btn w-100 text-white fw-bold py-2 rounded-pill"
//               style={{
//                 backgroundColor: "#950606",
//                 boxShadow: "0px 4px 12px rgba(149, 6, 6, 0.4)",
//                 transition: "all 0.3s ease",
//               }}
//               onMouseOver={(e) =>
//                 (e.currentTarget.style.backgroundColor = "#7a0505")
//               }
//               onMouseOut={(e) =>
//                 (e.currentTarget.style.backgroundColor = "#950606")
//               }
//             >
//               🚀 Pay Now
//             </button>
//           </form>

//           {/* Message */}
//           {message && (
//             <p className="mt-4 text-center fw-semibold text-success">{message}</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PayBills;


import { useState } from "react";
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
        <h1>🧾 Pay Bills</h1>
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
