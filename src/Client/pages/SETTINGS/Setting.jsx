import React from "react";
import { Button, Row, Col, Card } from "react-bootstrap";
import {
  FaCog,
  FaUser,
  FaShieldAlt,
  FaBell,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // ✅ navigation import
import QuickSettings from "./QuickSettings";
import AccountInfo from "./Accoutnfo";
import SecurityOptions from "./SecurityOptions";

const settings = [
  {
    title: "General Settings",
    description: "App preferences, language, and display settings",
    icon: <FaCog className="text-warning" />,
    path: "/Client/GeneralSettings",
  },
  {
    title: "Personal Details",
    description: "Update your profile information and contact details",
    icon: <FaUser className="text-warning" />,
    path: "/Client/personal-details",
  },
  {
    title: "Security",
    description: "Password, 2FA, and security preferences",
    icon: <FaShieldAlt className="text-warning" />,
    path: "/Client/security",
  },
  {
    title: "Notifications",
    description: "Manage email, SMS, and push notifications",
    icon: <FaBell className="text-warning" />,
    path: "/Client/notifications",
  },
];

const Setting = () => {
  const navigate = useNavigate(); // ✅ hook for navigation

  return (
    <>
      {/* Header */}
      <div
        className="py-4 text-center shadow-sm"
        style={{ backgroundColor: "#960603" }}
      >
        <h1 className="fw-bold fs-2 text-white">Settings</h1>
        <p className="text-light mb-0">
          Manage your account preferences and security
        </p>
      </div>

      {/* Cards Grid */}
      <div className="bg-light p-4 shadow-sm">
        <Row className="g-4">
          {settings.map((item, index) => (
            <Col md={6} lg={4} key={index}>
              <Card
                className="h-100 shadow-sm border-0 rounded-3"
                style={{ minHeight: "250px" }}
              >
                <Card.Body>
                  {/* Icon box */}
                  <div
                    className="d-inline-flex align-items-center justify-content-center rounded mb-3"
                    style={{
                      width: "40px",
                      height: "40px",
                      backgroundColor: "#960603",
                    }}
                  >
                    {item.icon}
                  </div>

                  {/* Title & Description */}
                  <h5 className="fw-bold mb-2">{item.title}</h5>
                  <p
                    className="text-muted small mb-3"
                    style={{ lineHeight: "1.6" }}
                  >
                    {item.description}
                  </p>

                  {/* Configure Button */}
                  <Button
                    className="w-100 mt-3 d-flex justify-content-between align-items-center"
                    style={{
                      color: "#960603",
                      border: "1px solid #960603",
                      backgroundColor: "transparent",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = "#960603";
                      e.currentTarget.style.color = "#fff";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = "#960603";
                    }}
                    onClick={() => item.path && navigate(item.path)} // ✅ navigate on click
                  >
                    Configure <span>→</span>
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Extra Sections */}
      <QuickSettings />
      <AccountInfo />
      <SecurityOptions />
    </>
  );
};

export default Setting;

