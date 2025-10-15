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
          <p>Total Balance</p>
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
