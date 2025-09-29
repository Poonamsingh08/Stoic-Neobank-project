


// import React from "react";
// import { FaMoneyBillWave, FaWallet, FaCheckCircle, FaCalendarAlt } from "react-icons/fa";

// function LoanCard() {
//   return (
//     <div className="mx-6 my-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

//       {/* TOTAL LOAN CARD */}
//       <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-3 flex flex-col gap-2 hover:shadow-lg transition h-40">
//         <div className="flex items-center gap-2">
//           <FaMoneyBillWave className="text-orange-600 text-2xl" />
//           <h2 className="text-md font-bold text-gray-800">Total Loan Amount</h2>
//         </div>
//         <p className="text-xl font-semibold text-orange-600 pt-3">₹25,00,000.00</p>
//         <h3 className="text-sm text-gray-600">Life time borrowed</h3>
//       </div>

//       {/* OUTSTANDING LOAN CARD */}
//       <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-3 flex flex-col gap-2 hover:shadow-lg transition h-40">
//         <div className="flex items-center gap-2">
//           <FaWallet className="text-orange-600 text-2xl" />
//           <h2 className="text-md font-bold text-gray-800">Outstanding</h2>
//         </div>
//         <p className="text-xl font-semibold text-red-700 pt-3">₹18,50,000.00</p>
//         <h3 className="text-sm text-gray-600">Remaining balance</h3>
//       </div>

//       {/* AMOUNT PAID CARD */}
//       <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-3 flex flex-col gap-2 hover:shadow-lg transition h-40">
//         <div className="flex items-center gap-2">
//           <FaCheckCircle className="text-orange-600 text-2xl" />
//           <h2 className="text-md font-bold text-gray-800">Amount Paid</h2>
//         </div>
//         <p className="text-xl font-semibold text-green-600 pt-3">₹6,50,000.00</p>
//         <h3 className="text-sm text-gray-600">Principal + Interest</h3>
//       </div>

//       {/* MONTHLY EMI CARD */}
//       <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-3 flex flex-col gap-2 hover:shadow-lg transition h-40">
//         <div className="flex items-center gap-2">
//           <FaCalendarAlt className="text-orange-600 text-2xl" />
//           <h2 className="text-md font-bold text-gray-800">Monthly EMI</h2>
//         </div>
//         <p className="text-xl font-semibold text-blue-600 pt-3">₹23,500.00</p>
//         <h3 className="text-sm text-gray-600">Next Due: 2/1/2025</h3>
//       </div>

//     </div>
//   );
// }

// export default LoanCard;
import React from "react";
import { FaMoneyBillWave, FaWallet, FaCheckCircle, FaCalendarAlt } from "react-icons/fa";

function LoanCard() {
  return (
    <div className=" m-4">
      <div className="row g-4">
        {/* TOTAL LOAN CARD */}
        <div className="col-12 col-md-6 col-lg-3">
          <div className="card shadow-sm border rounded-3 h-100 p-3 d-flex flex-column justify-content-between loan-card">
            <div className="d-flex align-items-center gap-2">
              <FaMoneyBillWave className=" fs-4"  color="#900603"/>
              <h2 className="h6 fw-bold text-dark mb-0">Total Loan Amount</h2>
            </div>
            <p className="fs-5 fw-semibold text-warning mt-3 mb-1">₹25,00,000.00</p>
            <h3 className="small text-muted mb-0">Life time borrowed</h3>
          </div>
        </div>

        {/* OUTSTANDING LOAN CARD */}
        <div className="col-12 col-md-6 col-lg-3">
          <div className="card shadow-sm border rounded-3 h-100 p-3 d-flex flex-column justify-content-between loan-card">
            <div className="d-flex align-items-center gap-2">
              <FaWallet className=" fs-4"  color="#900603"/>
              <h2 className="h6 fw-bold text-dark mb-0">Outstanding</h2>
            </div>
            <p className="fs-5 fw-semibold text-danger mt-3 mb-1">₹18,50,000.00</p>
            <h3 className="small text-muted mb-0">Remaining balance</h3>
          </div>
        </div>

        {/* AMOUNT PAID CARD */}
        <div className="col-12 col-md-6 col-lg-3">
          <div className="card shadow-sm border rounded-3 h-100 p-3 d-flex flex-column justify-content-between loan-card">
            <div className="d-flex align-items-center gap-2">
              <FaCheckCircle className=" fs-4" color="#900603" />
              <h2 className="h6 fw-bold text-dark mb-0">Amount Paid</h2>
            </div>
            <p className="fs-5 fw-semibold text-success mt-3 mb-1">₹6,50,000.00</p>
            <h3 className="small text-muted mb-0">Principal + Interest</h3>
          </div>
        </div>

        {/* MONTHLY EMI CARD */}
        <div className="col-12 col-md-6 col-lg-3">
          <div className="card shadow-sm border rounded-3 h-100 p-3 d-flex flex-column justify-content-between loan-card">
            <div className="d-flex align-items-center gap-2">
              <FaCalendarAlt className=" fs-4" color="#900603" />
              <h2 className="h6 fw-bold text-dark mb-0">Monthly EMI</h2>
            </div>
            <p className="fs-5 fw-semibold text-primary mt-3 mb-1">₹23,500.00</p>
            <h3 className="small text-muted mb-0">Next Due: 2/1/2025</h3>
          </div>
        </div>
      </div>

      {/* custom CSS for equal height */}
      <style>
        {`
          .loan-card {
            min-height: 160px; /* similar to Tailwind h-40 */
            transition: box-shadow 0.3s ease;
          }
          .loan-card:hover {
            box-shadow: 0px 4px 12px rgba(0,0,0,0.15);
          }
        `}
      </style>
    </div>
  );
}

export default LoanCard;
