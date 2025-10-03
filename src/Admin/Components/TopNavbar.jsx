import { Link, NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FileText,
  Wallet,
  CreditCard,
  Send,
  Banknote,
  DollarSign,
  CreditCard as CardIcon,
  BarChart3,
  HelpCircle,
  FileBarChart,
  Settings,
  Bell,
  Menu,
} from "lucide-react";
import { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import "./TopNavbar.css";

const TopNavbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Middle Navbar items
  const middleRow = [
    { name: "Dashboard", icon: <LayoutDashboard size={18} />, path: "/Admin" },
    { name: "Users", icon: <Users size={18} />, path: "/Admin/users" },
    { name: "KYC", icon: <FileText size={18} />, path: "/Admin/kyc" },
    { name: "Accounts & Wallets", icon: <Wallet size={18} />, path: "/Admin/accountsdashboard" },
    { name: "Transactions", icon: <CreditCard size={18} />, path: "/Admin/transactions" },
    { name: "Money Transfer", icon: <Send size={18} />, path: "/Admin/moneyrequest" },
    { name: "Deposit Management", icon: <Banknote size={18} />, path: "/Admin/depositmanagement" },
    { name: "Loans", icon: <DollarSign size={18} />, path: "/Admin/loans" },
    { name: "Cards", icon: <CardIcon size={18} />, path: "/Admin/cards" },
    
  ];

  // Bottom Navbar items
  const bottomRow = [
    { name: "Investment Products", icon: <BarChart3 size={18} />, path: "/Admin/investment_products" },
    { name: "Complaints & Support", icon: <HelpCircle size={18} />, path: "/Admin/complaints" },
    { name: "Reports & Analytics", icon: <FileBarChart size={18} />, path: "/Admin/reports" },
    { name: "Settings", icon: <Settings size={18} />, path: "/settings" },
  ];

  return (
    <>
      {/* Top Navbar */}
      <nav className="top-navbar">
        <div className="navbar-container">
          <Link to="/homepage" className="navbar-logo">
            <img src={logo} alt="NeoBank Logo" />
            <span>NeoBank</span>
          </Link>

          <form className="navbar-search-form">
            <input
              type="text"
              className="navbar-search"
              placeholder="Search users, transactions..."
            />
          </form>

          <div className="navbar-right">
            <div className="bell-icon">
              <Bell size={22} />
              <span className="badge">3</span>
            </div>
            <div className="user-menu">
              <span className="username">JD</span>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Middle Navbar */}
      <div className="middle-navbar">
        <ul>
          {middleRow.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
              >
                <span className="icon">{item.icon}</span>
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom Navbar */}
      <div className="bottom-navbar">
        <ul>
          {bottomRow.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
              >
                <span className="icon">{item.icon}</span>
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          <ul>
            {[...middleRow, ...bottomRow].map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="icon">{item.icon}</span>
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default TopNavbar;
