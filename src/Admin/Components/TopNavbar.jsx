import React, { useState } from "react";
import { NavLink } from "react-router-dom";
// Font Awesome Icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
// Lucide React Icons (Bell icon is removed)
import {
  User,
  LayoutDashboard,
  Users,
  FileText,
  Wallet,
  CreditCard,
  Send,
  Banknote,
  DollarSign,
  BarChart3,
  FileBarChart,
  Settings,
  ChevronDown,
  Menu,
} from "lucide-react";
import logo from "../assets/logo.png";
import "./TopNavbar.css";

const TopNavbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={18} />, path: "/" },
    { name: "Users", icon: <Users size={18} />, path: "/Admin/users" },
    { name: "KYC", icon: <FileText size={18} />, path: "/Admin/kyc" },
    {
      name: "Accounts & Wallets",
      icon: <Wallet size={18} />,
      path: "/Admin/accountsdashboard",
    },
    { name: "Transactions", icon: <CreditCard size={18} />, path: "/Admin/transactions" },
    {
      name: "Money Transfer Request",
      icon: <Send size={18} />,
      path: "/Admin/moneyrequest",
    },
    {
      name: "Deposit Management",
      icon: <Banknote size={18} />,
      path: "/Admin/depositmanagement",
    },
    {
      name: "Services",
      icon: <Settings size={18} />,
      dropdown: [
        { name: "Investment Products", icon: <BarChart3 size={16} />, path: "/Admin/investment_products" },
        { name: "Complaints & Support", icon: <FileBarChart size={16} />, path: "/Admin/complaints" },
        { name: "Reports & Analytics", icon: <FileBarChart size={16} />, path: "/Admin/reports" },
        { name: "Loans", icon: <DollarSign size={16} />, path: "/Admin/loans" },
        { name: "Cards", icon: <CreditCard size={16} />, path: "/Admin/cards" },
      ],
    },
  ];

  return (
    <>
      {/* ---------- Top Navbar ---------- */}
      <nav className="tn-navbar">
        <div className="tn-navbar-container">
          {/* Logo */}
          <NavLink to="/" className="tn-navbar-brand">
            <img src={logo} alt="NeoBank Logo" className="tn-logo" />
            <span className="tn-brand-text">NeoBank Admin</span>
          </NavLink>

          {/* Search */}
          <form className="tn-search-form">
            <input
              type="text"
              className="tn-search-input"
              placeholder="Search users, transactions..."
            />
          </form>

          {/* Right Side */}
          <div className="tn-navbar-right">
            <button className="tn-icon-btn">
              {/* --- MODIFIED ICON --- */}
              <FontAwesomeIcon icon={faBell} className="tn-bell-icon" />
              <span className="tn-badge">3</span>
            </button>
            <NavLink to="/admin/profile" className="tn-profile-btn">
              <User size={20} className="tn-profile-icon" />
              <span>Admin</span>
            </NavLink>
            <button
              className="tn-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu size={26} />
            </button>
          </div>
        </div>
      </nav>

      {/* ---------- Secondary Navbar ---------- */}
      <div className="tn-secondary-navbar">
        <ul className="tn-nav-list">
          {menuItems.map((item) => (
            <li key={item.name} className={item.dropdown ? "tn-dropdown" : ""}>
              {!item.dropdown ? (
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `tn-nav-item ${isActive ? "tn-active" : ""}`
                  }
                >
                  <span className="tn-icon">{item.icon}</span>
                  {item.name}
                </NavLink>
              ) : (
                <>
                  <span className="tn-nav-item tn-dropdown-trigger">
                    <span className="tn-icon">{item.icon}</span>
                    {item.name} <ChevronDown size={14} />
                  </span>
                  <ul className="tn-dropdown-menu">
                    {item.dropdown.map((sub) => (
                      <li key={sub.name}>
                        <NavLink to={sub.path} className="tn-dropdown-item">
                          <span className="tn-icon">{sub.icon}</span>
                          {sub.name}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* ---------- Mobile Menu ---------- */}
      {mobileMenuOpen && (
        <div className="tn-mobile-menu">
          <ul className="tn-mobile-nav-list">
            {menuItems.map((item) => (
              <li key={item.name}>
                {!item.dropdown ? (
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `tn-mobile-nav-item ${isActive ? "tn-mobile-active" : ""}`
                    }
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="tn-icon">{item.icon}</span>
                    {item.name}
                  </NavLink>
                ) : (
                  <>
                    <div
                      className="tn-mobile-nav-item tn-mobile-dropdown-toggle"
                      onClick={() => setServicesOpen(!servicesOpen)}
                    >
                      <span className="tn-icon">{item.icon}</span>
                      {item.name}
                      <ChevronDown
                        size={14}
                        className={`tn-chevron ${servicesOpen ? "tn-chevron-open" : ""}`}
                      />
                    </div>

                    {servicesOpen && (
                      <ul className="tn-mobile-dropdown">
                        {item.dropdown.map((sub) => (
                          <li key={sub.name}>
                            <NavLink
                              to={sub.path}
                              className="tn-mobile-dropdown-item"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              <span className="tn-icon">{sub.icon}</span>
                              {sub.name}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default TopNavbar;