
import { Link } from "react-router-dom";
import { NavLink, useLocation } from "react-router-dom";
import {
  Bell, Banknote, User, CreditCard, DollarSign,
  Repeat, TrendingUp, Settings, AlertCircle, LayoutDashboard, Menu
} from "lucide-react";


import { useEffect, useState } from "react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [secondaryOpen, setSecondaryOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
    setSecondaryOpen(false);
  }, [location.pathname]);

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={18} />, path: "/" },
    { name: "My Account", icon: <User size={18} />, path: "/myaccount" },
    { name: "Deposit", icon: <CreditCard size={18} />, path: "/deposit" },
    { name: "Loan", icon: <DollarSign size={18} />, path: "/loan" },
    { name: "Money Transfer", icon: <Repeat size={18} />, path: "/money-transfer" },
    { name: "Investment", icon: <TrendingUp size={18} />, path: "/investment" },
    { name: "cards", icon: <CreditCard size={18} />, path: "/cards" },
    { name: "Services", icon: <Settings size={18} />, path: "/services" },
    { name: "Setting", icon: <Settings size={18} />, path: "/setting" },
    { name: "Complaint", icon: <AlertCircle size={18} />, path: "/complaintfeedback" },
  ];

  return (
    <>

      <nav className="navbar navbar-expand-md navbar-light bg-white shadow-sm fixed-top">
        <div className="container-fluid">

          <Link
            to="/homepage"
            className="navbar-brand d-flex align-items-center fw-bold text-danger"
            s
          >

            <span className="ms-3 fw-bold fs-4 text-uppercase" style={{ color: "#950606" }}>
              NeoBank
            </span>
          </Link>




          <form className="d-none d-md-flex flex-grow-1 mx-md-3 ">
            <input
              type="text"
              className="form-control"
              style={{ maxWidth: "500px", marginLeft: '30px' }}
              placeholder="Search users, transactions..."
            />
          </form>


          <div className="d-flex align-items-center ms-auto flex-wrap flex-sm-nowrap">

            <button className="btn position-relative me-3 d-none d-lg-block">
              <Bell size={22} />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                3
              </span>
            </button>


            <div className="d-flex align-items-center">
              <span className="fw-bold me-2">JD</span>
              <button
                className="navbar-toggler "
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Menu size={24} />
              </button>

              <button
                className="btn p-0 border-0"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >

              </button>
            </div>

          </div>
        </div>

      </nav>


      <div className="bg-light  shadow-sm border-top mt-3 d-none d-lg-block">

        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm  border-bottom border-dark mt-5">
          <div className="container-fluid">

            <div className={`navbar-collapse ${secondaryOpen ? "show" : ""}`} id="secondaryNav">

              <ul className="navbar-nav mx-auto flex-wrap gap-1">
                {menuItems.map((item) => (
                  <li className="nav-item" key={item.name}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `nav-link nav-hover d-flex align-items-center fw-semi-bold px-2 py-1 rounded`
                      }
                      style={({ isActive }) => ({
                        backgroundColor: isActive ? "#950606" : "transparent",
                        color: isActive ? "white" : "#333",
                        transition: "all 0.3s ease",
                      })}
                      onClick={() => setSecondaryOpen(true)}
                    >

                      <span className="me-2">{item.icon}</span>
                      {item.name}
                    </NavLink>

                  </li>
                ))}
                <style>
{`
  .nav-hover:hover {
    background-color: #950606 !important;
    color: #fff !important;
  }
`}
</style>
              </ul>
            </div>

          </div>
        </nav>

      </div>

      {mobileMenuOpen && (
        <div className="bg-light shadow-lg border-top d-lg-none"
          style={{
            position: 'absolute',
            top: '70px',
            left: 0,
            right: 0,
            zIndex: 9999,
            borderRadius: '0 0 10px 10px',
            borderTop: '2px solid black',
            borderBottom: '2px solid black',
            overflow: 'hidden',
            animation: 'slideDown 0.3s ease'
          }}>
          <div className="container-fluid py-3">
            <ul className="nav flex-column">
              {menuItems.map((item) => (
                <li className="nav-item mb-2" key={item.name}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `nav-link d-flex align-items-center fw-semibold px-3 py-2 rounded shadow-sm`
                    }
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? "#e0e0e0" : "#fff",
                      color: isActive ? "#000" : "#333",
                      transition: "all 0.3s ease",
                    })}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="me-3">{item.icon}</span>
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>


          <style>
            {`
        @keyframes slideDown {
          0% { transform: translateY(-20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
      `}
          </style>
        </div>
      )}

    </>
  );
};

export default Navbar;

