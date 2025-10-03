import React, { useState } from "react";
import "./PortfolioReports.css";

const dummyReports = [
  { id: 1, user: "Ram Kumar", product: "Mutual Fund A", invested: "$5000", returns: "$200", date: "2025-09-20" },
  { id: 2, user: "Sita Sharma", product: "Bond B", invested: "$3000", returns: "$150", date: "2025-09-21" },
  { id: 3, user: "Amit Singh", product: "Mutual Fund C", invested: "$7000", returns: "$350", date: "2025-09-22" },
];

export default function PortfolioReports() {
  const [reports] = useState(dummyReports);
  const [filterUser, setFilterUser] = useState("");

  const handleExport = () => {
    const csvContent = [
      ["User", "Product", "Invested", "Returns", "Date"],
      ...reports.map((r) => [r.user, r.product, r.invested, r.returns, r.date]),
    ]
      .map((e) => e.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "portfolio_reports.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredReports = reports.filter((r) =>
    r.user.toLowerCase().includes(filterUser.toLowerCase())
  );

  return (
    <div className="reports-container">
      <h3 className="reports-title">Portfolio Reports</h3>

      <div className="reports-card">
        {/* Filter + Export */}
        <div className="reports-actions">
          <input
            type="text"
            className="reports-input"
            placeholder="Filter by User"
            value={filterUser}
            onChange={(e) => setFilterUser(e.target.value)}
          />
          <button className="btn-primary" onClick={handleExport}>
            Export CSV
          </button>
        </div>

        {/* Table */}
        <div className="table-wrapper">
          <table className="reports-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Product</th>
                <th>Invested</th>
                <th>Returns</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map((r) => (
                <tr key={r.id}>
                  <td>{r.user}</td>
                  <td>{r.product}</td>
                  <td>{r.invested}</td>
                  <td>{r.returns}</td>
                  <td>{r.date}</td>
                </tr>
              ))}
              {filteredReports.length === 0 && (
                <tr>
                  <td colSpan="5" className="no-data">
                    No reports found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
