import React, { useState } from "react";
import { FaBoxOpen, FaExchangeAlt, FaChartBar, FaCog, FaKey } from "react-icons/fa";
import ProductCatalog from "./ProductCatalog";
import Subscriptions from "./Subscriptions";
import PortfolioReports from "./PortfolioReports";
import Services from "./Services";
import APIKeys from "./APIKeys";
import "./InvestmentPanel.css"; // custom CSS file

export default function InvestmentPanel() {
  const [page, setPage] = useState("catalog");

  const pages = [
    { key: "catalog", title: "Product Catalog", icon: <FaBoxOpen /> },
    { key: "subscriptions", title: "Subscriptions/Redemptions", icon: <FaExchangeAlt /> },
    { key: "reports", title: "Portfolio Reports", icon: <FaChartBar /> },
    { key: "services", title: "Services & Merchant", icon: <FaCog /> },
    { key: "apikeys", title: "API Keys & Integrations", icon: <FaKey /> },
  ];

  return (

<>
      {/* Header */}
      <div className="invp-header">
        <h2>Investment Admin Panel</h2>
        <p>
          Manage Products, Subscriptions, Reports, Services & API Keys
        </p>
      </div>

    <div className="invp-panel">
    
      {/* Cards Section */}
      <div className="invp-cards">
        {pages.map((p) => (
          <div
            key={p.key}
            className={`invp-card ${page === p.key ? "active" : ""}`}
            onClick={() => setPage(p.key)}
          >
            <div className="invp-card-icon">{p.icon}</div>
            <h6 className="invp-card-title">{p.title}</h6>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <main className="invp-content">
        {page === "catalog" && <ProductCatalog />}
        {page === "subscriptions" && <Subscriptions />}
        {page === "reports" && <PortfolioReports />}
        {page === "services" && <Services />}
        {page === "apikeys" && <APIKeys />}
      </main>
    </div>
    </>
  );
}
