// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { ArrowDownLeft, ArrowUpRight, CreditCard, PiggyBank, Wallet } from "lucide-react";

// const DashBoard = () => {
//   const navigate = useNavigate();

//   const actions = [
//     { label: "Send Money", color: "bg-primary", icon: "✈️", path: "/Client/send-money" },
//     { label: "Pay Bills", color: "bg-success", icon: "📱", path: "/Client/pay-bills" },
//     { label: "Add Money", color: "bg-purple", icon: "➕", path: "/Client/add-money" },
//     { label: "Investments", color: "bg-warning", icon: "📈", path: "/Client/investment" },
//     { label: "Fixed Deposit", color: "bg-pink", icon: "🐷", path: "/Client/deposit" },
//     { label: "Cards", color: "bg-info", icon: "💳", path: "/Client/cards" },
//   ];

//   return (
//     // ✅ Navbar se chipakane ke liye "pt-0 mt-0" aur padding hata diya
//     <div className="bg-light min-vh-100 m-0 p-0">
     
//       {/* Header Card */}
//       <div className="py-3 text-center shadow-s card text-white mb-4 shadow rounded-0" style={{ backgroundColor: "#950606" }}>
//         <div className="card-body d-flex justify-content-between align-items-center">
//           <div>
//             <h className="fw-bold fs-3 text-white">Welcome Back, PoonamSingh!</h>
//             <p className="text-light mb-0 opacity-75">
//               Here's your financial overview for today
//             </p>
//           </div>
//           <div className="text-end">
//             <p className="small opacity-75 mb-1">Total Balance</p>
//             <p className="h3 fw-bold mb-0">₹3,73,731.00</p>
//           </div>
//         </div>
//       </div>

//       {/* Quick Actions */}
//       <div className="card mb-4 shadow rounded-0">
//         <div className="card-body">
//           <h5 className="fw-bold">Quick Actions</h5>
//           <p className="text-muted mb-4 fw-semibold">Frequently used banking services</p>
//           <div className="row g-3">
//             {actions.map((item, i) => (
//               <div key={i} className="col-6 col-md-4 col-lg-2">
//                 <div
//                   onClick={() => navigate(item.path)}
//                   className="border rounded text-center p-3 h-100 d-flex flex-column align-items-center justify-content-center shadow-sm"
//                   style={{ cursor: "pointer" }}
//                 >
//                   <div
//                     className={`rounded-circle d-flex align-items-center justify-content-center text-white mb-2 shadow ${item.color}`}
//                     style={{ width: "48px", height: "48px" }}
//                   >
//                     <span>{item.icon}</span>
//                   </div>
//                   <p className="small fw-medium mb-0">{item.label}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Accounts & Transactions */}
//       <div className="row g-4 mx-0">
//         <div className="col-lg-6">
//           <div className="card shadow h-100">
//             <div className="card-body">
//               <h5 className="fw-bold">My Accounts</h5>
//               <p className="text-muted mb-3 fw-semibold">Overview of all your accounts</p>
//               {[
//                 { title: "Primary Savings", type: "Savings Account", number: "****1234", balance: "₹1,25,450.75", icon: <Wallet className="text-warning" /> },
//                 { title: "Current Account", type: "Current Account", number: "****5678", balance: "₹48,280.25", icon: <CreditCard className="text-primary" /> },
//                 { title: "Fixed Deposit", type: "Fixed Deposit", number: "****9012", balance: "₹2,00,000.00", icon: <PiggyBank className="text-danger" /> },
//               ].map((acc, i) => (
//                 <div key={i} className="d-flex justify-content-between align-items-center border rounded p-3 mb-3">
//                   <div className="d-flex align-items-center">
//                     <div className="rounded-circle bg-light d-flex align-items-center justify-content-center me-3" style={{ width: "40px", height: "40px" }}>
//                       {acc.icon}
//                     </div>
//                     <div>
//                       <p className="fw-semibold mb-0">{acc.title}</p>
//                       <p className="text-muted small mb-0">{acc.type}</p>
//                       <p className="text-secondary small mb-0">{acc.number}</p>
//                     </div>
//                   </div>
//                   <p className="fw-bold text-danger mb-0">{acc.balance}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         <div className="col-lg-6">
//           <div className="card shadow h-100">
//             <div className="card-body">
//               <h5 className="fw-bold">Recent Transactions</h5>
//               <p className="text-muted mb-3 fw-semibold">Your latest financial activities</p>
//               {[
//                 { label: "Salary Credit", type: "Income", amount: "+₹75,000.00", date: "2025-01-10", color: "text-success", icon: <ArrowDownLeft />, iconBg: "bg-success bg-opacity-10" },
//                 { label: "Online Shopping", type: "Shopping", amount: "-₹2,500.00", date: "2025-01-09", color: "text-danger", icon: <ArrowUpRight />, iconBg: "bg-danger bg-opacity-10" },
//                 { label: "Electricity Bill", type: "Utilities", amount: "-₹1,200.00", date: "2025-01-08", color: "text-danger", icon: <ArrowUpRight />, iconBg: "bg-danger bg-opacity-10" },
//                 { label: "Investment Returns", type: "Investment", amount: "+₹5,000.00", date: "2025-01-07", color: "text-success", icon: <ArrowDownLeft />, iconBg: "bg-success bg-opacity-10" },
//               ].map((tx, i) => (
//                 <div key={i} className="d-flex justify-content-between align-items-center border rounded p-3 mb-3">
//                   <div className="d-flex align-items-center">
//                     <div className={`rounded-circle d-flex align-items-center justify-content-center me-3 ${tx.iconBg}`} style={{ width: "40px", height: "40px" }}>
//                       {tx.icon}
//                     </div>
//                     <div>
//                       <p className="fw-medium mb-0">{tx.label}</p>
//                       <p className="text-muted small mb-0">{tx.type}</p>
//                     </div>
//                   </div>
//                   <div className="text-end">
//                     <p className={`fw-bold mb-0 ${tx.color}`}>{tx.amount}</p>
//                     <p className="text-secondary small mb-0">{tx.date}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Extra Widgets */}
//       <div className="row g-4 mx-0 mt-2">
//         <div className="col-md-4">
//           <div className="card shadow h-100 text-center">
//             <div className="card-body">
//               <h5 className="fw-bold">Monthly Spending</h5>
//               <p className="h4 fw-bold text-danger mt-2">₹15,750</p>
//               <p className="text-success fw-semibold mb-0">↓ 12% from last month</p>
//             </div>
//           </div>
//         </div>
//         <div className="col-md-4">
//           <div className="card shadow h-100 text-center">
//             <div className="card-body">
//               <h5 className="fw-bold">Investment Growth</h5>
//               <p className="h4 fw-bold text-danger mt-2">₹2,45,000</p>
//               <p className="text-success fw-semibold mb-0">↑ 8.5% this quarter</p>
//             </div>
//           </div>
//         </div>
//         <div className="col-md-4">
//           <div className="card shadow h-100 text-center">
//             <div className="card-body">
//               <h5 className="fw-bold">Credit Score</h5>
//               <p className="h4 fw-bold text-danger mt-2">785</p>
//               <p className="text-success fw-semibold mb-0">Excellent</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashBoard;


import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowDownLeft, ArrowUpRight, CreditCard, PiggyBank, Wallet } from "lucide-react";
import "./DashBoard.css"; // ✅ external CSS file

const DashBoard = () => {
  const navigate = useNavigate();

  const actions = [
    { label: "Send Money", color: "primary", icon: "✈️", path: "/Client/send-money" },
    { label: "Pay Bills", color: "success", icon: "📱", path: "/Client/pay-bills" },
    { label: "Add Money", color: "purple", icon: "➕", path: "/Client/add-money" },
    { label: "Investments", color: "warning", icon: "📈", path: "/Client/investment" },
    { label: "Fixed Deposit", color: "pink", icon: "🐷", path: "/Client/deposit" },
    { label: "Cards", color: "info", icon: "💳", path: "/Client/cards" },
  ];

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-left">
          <h2>Welcome Back, PoonamSingh!</h2>
          <p>Here's your financial overview for today</p>
        </div>
        <div className="header-right">
          <p className="label">Total Balance</p>
          <h3>₹3,73,731.00</h3>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card-container" style={{margin:'10px 20px'}}>
        <h4 style={{fontWeight:'bold'}}>Quick Actions</h4>
        <p className="subtitle">Frequently used banking services</p>
        <div className="actions-grid">
          {actions.map((item, i) => (
            <div
              key={i}
              onClick={() => navigate(item.path)}
              className="action-card"
            >
              <div className={`action-icon ${item.color}`}>{item.icon}</div>
              <p>{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Accounts & Transactions */}
      <div className="two-column">
        {/* Accounts */}
        <div className="card-container">
          <h4 style={{fontWeight:'bold'}}>My Accounts</h4>
          <p className="subtitle">Overview of all your accounts</p>
          {[
            { title: "Primary Savings", type: "Savings Account", number: "****1234", balance: "₹1,25,450.75", icon: <Wallet /> },
            { title: "Current Account", type: "Current Account", number: "****5678", balance: "₹48,280.25", icon: <CreditCard /> },
            { title: "Fixed Deposit", type: "Fixed Deposit", number: "****9012", balance: "₹2,00,000.00", icon: <PiggyBank /> },
          ].map((acc, i) => (
            <div key={i} className="account-card">
              <div className="account-left">
                <div className="account-icon">{acc.icon}</div>
                <div>
                  <p className="title">{acc.title}</p>
                  <p className="subtitle">{acc.type}</p>
                  <p className="small">{acc.number}</p>
                </div>
              </div>
              <p className="balance">{acc.balance}</p>
            </div>
          ))}
        </div>

        {/* Transactions */}
        <div className="card-container">
          <h4 style={{fontWeight:'bold'}}>Recent Transactions</h4>
          <p className="subtitle">Your latest financial activities</p>
          {[
            { label: "Salary Credit", type: "Income", amount: "+₹75,000.00", date: "2025-01-10", color: "success", icon: <ArrowDownLeft /> },
            { label: "Online Shopping", type: "Shopping", amount: "-₹2,500.00", date: "2025-01-09", color: "danger", icon: <ArrowUpRight /> },
            { label: "Electricity Bill", type: "Utilities", amount: "-₹1,200.00", date: "2025-01-08", color: "danger", icon: <ArrowUpRight /> },
            { label: "Investment Returns", type: "Investment", amount: "+₹5,000.00", date: "2025-01-07", color: "success", icon: <ArrowDownLeft /> },
          ].map((tx, i) => (
            <div key={i} className="transaction-card">
              <div className="transaction-left">
                <div className={`transaction-icon ${tx.color}`}>{tx.icon}</div>
                <div>
                  <p className="title">{tx.label}</p>
                  <p className="subtitle">{tx.type}</p>
                </div>
              </div>
              <div className="transaction-right">
                <p className={`amount ${tx.color}`}>{tx.amount}</p>
                <p className="small">{tx.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Extra Widgets */}
      <div className="three-column">
        <div className="widget-card">
          <h5>Monthly Spending</h5>
          <p className="value">₹15,750</p>
          <p className="positive">↓ 12% from last month</p>
        </div>
        <div className="widget-card">
          <h5>Investment Growth</h5>
          <p className="value">₹2,45,000</p>
          <p className="positive">↑ 8.5% this quarter</p>
        </div>
        <div className="widget-card">
          <h5>Credit Score</h5>
          <p className="value">785</p>
          <p className="positive">Excellent</p>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
