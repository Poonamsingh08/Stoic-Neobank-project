// import React, { useState, useEffect } from "react";
// import { FaCalculator } from "react-icons/fa";

// const LoanCalculator = () => {
//   const [loanAmount, setLoanAmount] = useState("");
//   const [tenure, setTenure] = useState("");
//   const [interestRate, setInterestRate] = useState("");
//   const [emi, setEmi] = useState("");

//   // Auto-calculate EMI whenever inputs change
//   useEffect(() => {
//     if (!loanAmount || !tenure || !interestRate) {
//       setEmi("");
//       return;
//     }

//     const P = parseFloat(loanAmount);
//     const n = parseInt(tenure);
//     const r = parseFloat(interestRate) / 12 / 100;

//     if (P > 0 && n > 0 && r > 0) {
//       const emiValue =
//         (P * r * Math.pow(1 + r, n)) /
//         (Math.pow(1 + r, n) - 1);

//       setEmi(emiValue.toFixed(2));
//     } else {
//       setEmi("");
//     }
//   }, [loanAmount, tenure, interestRate]);

//   return (

//     <div className="mx-6 my-4 p-6 bg-white border border-gray-200 rounded-2xl shadow-md">
//       {/* Header */}
//       <div className="flex items-center gap-2 mb-4">
//         <FaCalculator className="text-orange-600 text-2xl" />
//         <p className="text-xl font-semibold">EMI Calculator</p>
//       </div>
//       <h3 className="text-gray-600 mb-6">
//         Calculate your monthly EMI before you apply
//       </h3>

//       <div className="flex flex-col md:flex-row gap-6">
//         {/* Loan Amount */}
//         <div>
//           <label className="block text-gray-600 font-medium">
//             Loan Amount (₹)
//           </label>
//           <input
//             type="number"
//             value={loanAmount}
//             onChange={(e) => setLoanAmount(e.target.value)}
//             placeholder="Enter loan amount"
//             className="w-full md:w-80 border rounded-md p-2 mt-1 hover:border-[#900603]"
//           />
//         </div>

//         {/* Tenure */}
//         <div>
//           <label className="block text-gray-600 font-medium">
//             Tenure (months)
//           </label>
//           <input
//             type="number"
//             value={tenure}
//             onChange={(e) => setTenure(e.target.value)}
//             placeholder="Enter tenure"
//             className="w-full md:w-80 border rounded-md p-2 mt-1"
//           />
//         </div>

//         {/* Interest Rate */}
//         <div>
//           <label className="block text-gray-600 font-medium">
//             Interest Rate (%)
//           </label>
//           <input
//             type="number"
//             value={interestRate}
//             onChange={(e) => setInterestRate(e.target.value)}
//             placeholder="Enter rate"
//             className="w-full md:w-80 border rounded-md p-2 mt-1"
//           />
//         </div>

//         {/* EMI Result */}
//         <div>
//           <label className="block text-gray-600 font-medium">
//             Monthly EMI (₹)
//           </label>
//           <input
//             type="text"
//             value={emi}
//             readOnly
//             placeholder="Calculated EMI"
//             className="w-full md:w-80 border rounded-md p-2 mt-1 bg-gray-100"
//           />
//         </div>
//       </div>
//     </div>

//   );
// };

// export default LoanCalculator;

import React, { useState, useEffect } from "react";
import { FaCalculator } from "react-icons/fa";

const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState("");
  const [tenure, setTenure] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [emi, setEmi] = useState("");

  // Auto-calculate EMI whenever inputs change
  useEffect(() => {
    if (!loanAmount || !tenure || !interestRate) {
      setEmi("");
      return;
    }

    const P = parseFloat(loanAmount);
    const n = parseInt(tenure);
    const r = parseFloat(interestRate) / 12 / 100;

    if (P > 0 && n > 0 && r > 0) {
      const emiValue = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

      setEmi(emiValue.toFixed(2));
    } else {
      setEmi("");
    }
  }, [loanAmount, tenure, interestRate]);

  return (
    <div className=" m-4">
      <div className="card shadow-sm border rounded-3 p-4">
        {/* Header */}
        <div className="d-flex align-items-center mb-3">
          <FaCalculator
            className="fs-4 me-2" // fs-4 = font-size, me-2 = margin-end
            color="#900603" // custom deep red color
          />

          <p className="h5 fw-semibold mb-0">EMI Calculator</p>
        </div>
        <h6 className="text-muted mb-4">
          Calculate your monthly EMI before you apply
        </h6>

        <div className="row g-4">
          {/* Loan Amount */}
          <div className="col-12 col-md-6 col-lg-3">
            <label className="form-label fw-medium text-muted">
              Loan Amount (₹)
            </label>
            <input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              placeholder="Enter loan amount"
              className="form-control"
            />
          </div>

          {/* Tenure */}
          <div className="col-12 col-md-6 col-lg-3">
            <label className="form-label fw-medium text-muted">
              Tenure (months)
            </label>
            <input
              type="number"
              value={tenure}
              onChange={(e) => setTenure(e.target.value)}
              placeholder="Enter tenure"
              className="form-control"
            />
          </div>

          {/* Interest Rate */}
          <div className="col-12 col-md-6 col-lg-3">
            <label className="form-label fw-medium text-muted">
              Interest Rate (%)
            </label>
            <input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              placeholder="Enter rate"
              className="form-control"
            />
          </div>

          {/* EMI Result */}
          <div className="col-12 col-md-6 col-lg-3">
            <label className="form-label fw-medium text-muted">
              Monthly EMI (₹)
            </label>
            <input
              type="text"
              value={emi}
              readOnly
              placeholder="Calculated EMI"
              className="form-control bg-light"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanCalculator;
