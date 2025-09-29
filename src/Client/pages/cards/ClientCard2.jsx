
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaLock, FaMobileAlt, FaDownload, FaCog, FaCreditCard } from "react-icons/fa";

const ClientCard2 = () => {
  const transactions = [
    {
      id: 1,
      merchant: "Amazon India",
      card: "Credit Card ****9012",
      amount: -2500,
      date: "2025-01-10",
    },
    {
      id: 2,
      merchant: "Swiggy",
      card: "Debit Card ****5678",
      amount: -450,
      date: "2025-01-09",
    },
    {
      id: 3,
      merchant: "Swiggy",
      card: "Debit Card ****5678",
      amount: -450,
      date: "2025-01-09",
    },
    {
      id: 4,
      merchant: "Swiggy",
      card: "Debit Card ****5678",
      amount: -450,
      date: "2025-01-09",
    },
  ];

  const formatAmount = (amount) => {
    return (
      <span className={amount < 0 ? "text-danger fw-bold" : "text-success fw-bold"}>
        {amount < 0 ? `-₹${Math.abs(amount).toLocaleString()}` : `₹${amount.toLocaleString()}`}
      </span>
    );
  };

  return (

    <div className="container-fluid px-12 my-4">

   
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h5 className="fw-bold mb-3">Quick Actions</h5>
          <p className="text-muted">Common card management tasks</p>
          <div className="row text-center">
            <div className="col-md-3 col-6 mb-3">
              <div className="p-3 border rounded-3 shadow-sm h-100 d-flex flex-column align-items-center">
                <FaLock size={30} className="text-danger mb-2" />
                <span className="fw-semibold">Block Card</span>
              </div>
            </div>
            <div className="col-md-3 col-6 mb-3">
              <div className="p-3 border rounded-3 shadow-sm h-100 d-flex flex-column align-items-center">
                <FaCog size={30} className="text-warning mb-2" />
                <span className="fw-semibold">Set PIN</span>
              </div>
            </div>
            <div className="col-md-3 col-6 mb-3">
              <div className="p-3 border rounded-3 shadow-sm h-100 d-flex flex-column align-items-center">
                <FaDownload size={30} className="text-primary mb-2" />
                <span className="fw-semibold">Download Statement</span>
              </div>
            </div>
            <div className="col-md-3 col-6 mb-3">
              <div className="p-3 border rounded-3 shadow-sm h-100 d-flex flex-column align-items-center">
                <FaMobileAlt size={30} className="text-success mb-2" />
                <span className="fw-semibold">Mobile Pay</span>
              </div>
            </div>
          </div>
        </div>
      </div>

   
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="fw-bold mb-0">Recent Card Transactions</h5>
            <button className="btn btn-outline-danger btn-sm">View All</button>
          </div>
          <p className="text-muted">Latest transactions across all cards</p>

          {transactions.map((txn) => (
            <div
              key={txn.id}
              className="d-flex justify-content-between align-items-center p-3 border rounded-3 mb-2 shadow-sm bg-light"
            >
              <div className="d-flex align-items-center">
                <FaCreditCard size={28} className="me-3" style={{ color: "#950606" }} />
                <div>
                  <div className="fw-bold">{txn.merchant}</div>
                  <small className="text-muted">{txn.card}</small>
                </div>
              </div>
              <div className="text-end">
                {formatAmount(txn.amount)}
                <div className="text-muted small">{txn.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-4 mb-3">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h6 className="fw-bold">Cashback Earned</h6>
              <h4 className="text-success fw-bold">₹2,450</h4>
              <small className="text-muted">This month</small>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h6 className="fw-bold">Reward Points</h6>
              <h4 className="text-warning fw-bold">15,680</h4>
              <small className="text-muted">Available to redeem</small>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h6 className="fw-bold">Monthly Spend</h6>
              <h4 className="text-danger fw-bold">₹18,750</h4>
              <small className="text-muted">Across all cards</small>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ClientCard2;
