// import React, { useState } from "react";

// function LoanStatement() {
//   const [show, setShow] = useState(false);
//   const [filter, setFilter] = useState("3"); // default 3 months
//   const [transactions, setTransactions] = useState([
//     { date: "2025-09-01", description: "EMI Payment", amount: -10000 },
//     { date: "2025-08-01", description: "EMI Payment", amount: -10000 },
//     { date: "2025-07-01", description: "EMI Payment", amount: -10000 },
//     { date: "2025-06-01", description: "EMI Payment", amount: -10000 },
//     { date: "2025-05-01", description: "EMI Payment", amount: -10000 },
//     { date: "2025-04-01", description: "EMI Payment", amount: -10000 },
//     { date: "2025-03-01", description: "EMI Payment", amount: -10000 },
//     { date: "2025-02-01", description: "EMI Payment", amount: -10000 },
//     { date: "2025-01-01", description: "EMI Payment", amount: -10000 },
//   ]);

//   // ✅ Improved filter logic
//   const filteredTransactions =
//     filter === "all"
//       ? transactions
//       : transactions.filter((t) => {
//           const txnDate = new Date(t.date);
//           const cutoff = new Date();
//           cutoff.setMonth(cutoff.getMonth() - parseInt(filter));
//           return txnDate >= cutoff;
//         });

//   // Sort by latest date first
//   const sortedTransactions = [...filteredTransactions].sort(
//     (a, b) => new Date(b.date) - new Date(a.date)
//   );

//   return (
//     <div className="p-6 bg-white rounded-xl shadow-md">
//       <div className="text-center">
//         {/* ✅ Fixed button */}
//         <button
//           type="button"
//           onClick={() => setShow(!show)}
//           style={{
//             backgroundColor: "#950606",
//             border: "none",
//             padding: "10px 20px",
//             fontWeight: "500",
//             color: "white",
//             borderRadius: "8px",
//             cursor: "pointer",
//           }}
//           onMouseOver={(e) =>
//             (e.currentTarget.style.backgroundColor = "#b30707")
//           }
//           onMouseOut={(e) =>
//             (e.currentTarget.style.backgroundColor = "#950606")
//           }
//         >
//           {show ? "Hide Statement" : "View Statement"}
//         </button>
//       </div>

//       {show && (
//         <div className="mt-4">
//           {/* Dropdown filter */}
//           <div className="mb-3">
//             <label className="mr-2 font-medium">View for: </label>
//             <select
//               value={filter}
//               onChange={(e) => setFilter(e.target.value)}
//               className="border border-[#950606] px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-[#950606]"
//             >
//               <option value="3">Last 3 Months</option>
//               <option value="6">Last 6 Months</option>
//               <option value="9">Last 9 Months</option>
//               <option value="12">Last 12 Months</option>
//               <option value="15">Last 15 Months</option>
//               <option value="all">All Transactions</option>
//             </select>
//           </div>

//           {/* Transactions Table */}
//           <table className="w-full border-collapse border border-gray-300">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="border p-2">Date</th>
//                 <th className="border p-2">Description</th>
//                 <th className="border p-2">Amount</th>
//               </tr>
//             </thead>
//             <tbody>
//               {sortedTransactions.length > 0 ? (
//                 sortedTransactions.map((t, index) => (
//                   <tr key={index}>
//                     <td className="border p-2">{t.date}</td>
//                     <td className="border p-2">{t.description}</td>
//                     <td
//                       className={`border p-2 ${
//                         t.amount < 0 ? "text-red-600" : "text-green-600"
//                       }`}
//                     >
//                       {t.amount < 0
//                         ? `-₹${Math.abs(t.amount)}`
//                         : `+₹${t.amount}`}
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td
//                     colSpan="3"
//                     className="border p-2 text-center text-gray-500"
//                   >
//                     No transactions in this period
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }

// export default LoanStatement;
import React, { useState } from "react";
import "./style/viewloan.css";

function LoanStatement() {
  const [show, setShow] = useState(false);
  const [filter, setFilter] = useState("3");
  const [transactions, setTransactions] = useState([
    { date: "2025-09-01", description: "EMI Payment", amount: -10000 },
    { date: "2025-08-01", description: "EMI Payment", amount: -10000 },
    { date: "2025-07-01", description: "EMI Payment", amount: -10000 },
    { date: "2025-06-01", description: "EMI Payment", amount: -10000 },
    { date: "2025-05-01", description: "EMI Payment", amount: -10000 },
    { date: "2025-04-01", description: "EMI Payment", amount: -10000 },
    { date: "2025-03-01", description: "EMI Payment", amount: -10000 },
    { date: "2025-02-01", description: "EMI Payment", amount: -10000 },
    { date: "2025-01-01", description: "EMI Payment", amount: -10000 },
  ]);

  const filteredTransactions =
    filter === "all"
      ? transactions
      : transactions.filter((t) => {
          const txnDate = new Date(t.date);
          const cutoff = new Date();
          cutoff.setMonth(cutoff.getMonth() - parseInt(filter));
          return txnDate >= cutoff;
        });

  const sortedTransactions = [...filteredTransactions].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <div className="loan-statement-container">
      <div className="button-wrapper">
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="toggle-button"
        >
          {show ? "Hide Statement" : "View Statement"}
        </button>
      </div>

      {show && (
        <div className="statement-content">
          <div className="filter-wrapper">
            <label className="filter-label">View for: </label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="filter-select"
            >
              <option value="3">Last 3 Months</option>
              <option value="6">Last 6 Months</option>
              <option value="9">Last 9 Months</option>
              <option value="12">Last 12 Months</option>
              <option value="15">Last 15 Months</option>
              <option value="all">All Transactions</option>
            </select>
          </div>

          <table className="transactions-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {sortedTransactions.length > 0 ? (
                sortedTransactions.map((t, index) => (
                  <tr key={index}>
                    <td>{t.date}</td>
                    <td>{t.description}</td>
                    <td className={t.amount < 0 ? "amount-negative" : "amount-positive"}>
                      {t.amount < 0
                        ? `-₹${Math.abs(t.amount)}`
                        : `+₹${t.amount}`}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="empty-row">
                    No transactions in this period
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default LoanStatement;