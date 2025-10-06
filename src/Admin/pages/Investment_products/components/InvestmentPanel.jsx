import React, { useState } from "react";
import {
  FaBoxOpen,
  FaExchangeAlt,
  FaChartBar,
  FaCog,
  FaKey,
} from "react-icons/fa";

import ProductCatalog from "./ProductCatalog";
import Subscriptions from "./Subscriptions";
import PortfolioReports from "./PortfolioReports";
import Services from "./Services";
import APIKeys from "./APIKeys";
import "./InvestmentPanel.css";

export default function InvestmentPanel() {
  const [page, setPage] = useState("catalog");

  const pages = [
    { key: "catalog", title: "Product Catalog", icon: <FaBoxOpen /> },
    {
      key: "subscriptions",
      title: "Subscriptions / Redemptions",
      icon: <FaExchangeAlt />,
    },
    { key: "reports", title: "Portfolio Reports", icon: <FaChartBar /> },
    { key: "services", title: "Services & Merchant", icon: <FaCog /> },
    { key: "apikeys", title: "API Keys & Integrations", icon: <FaKey /> },
  ];

  return (
    <div className="investment-panel">
      {/* Header */}
      <header className="investment-header">
        <h2>Investment Admin Panel</h2>
        <p>Manage Products, Subscriptions, Reports, Services & API Keys</p>
      </header>

      {/* Cards */}
      <section className="investment-card-container">
        {pages.map((p) => (
          <div
            key={p.key}
            className={`investment-card ${page === p.key ? "active" : ""}`}
            onClick={() => setPage(p.key)}
          >
            <div className="card-icon">{p.icon}</div>
            <div className="card-title">{p.title}</div>
          </div>
        ))}
      </section>

      {/* Main Content */}
      <main className="investment-main">
        {page === "catalog" && <ProductCatalog />}
        {page === "subscriptions" && <Subscriptions />}
        {page === "reports" && <PortfolioReports />}
        {page === "services" && <Services />}
        {page === "apikeys" && <APIKeys />}
      </main>
    </div>
  );
}
