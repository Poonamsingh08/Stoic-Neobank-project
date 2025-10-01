import React, { useState } from "react";
import { Row, Col, Card, Form } from "react-bootstrap";
import { FaMobileAlt, FaBell, FaEye, FaLock } from "react-icons/fa";

const quickSettings = [
  { title: "Biometric Login", icon: <FaMobileAlt />, default: true },
  { title: "Transaction Alerts", icon: <FaBell />, default: true },
  { title: "Account Visibility", icon: <FaEye />, default: false },
  { title: "Auto-Lock", icon: <FaLock />, default: true },
];

const QuickSettings = () => {
  const [settings, setSettings] = useState(
    quickSettings.map((s) => ({ ...s, enabled: s.default }))
  );

  const toggleSetting = (index) => {
    setSettings((prev) =>
      prev.map((s, i) =>
        i === index ? { ...s, enabled: !s.enabled } : s
      )
    );
  };

  return (
    <div className="p-4 bg-light rounded shadow-sm">
      <h5 className="fw-bold">Quick Settings</h5>
      <p className="text-muted">Frequently used settings for quick access</p>

      <Row className="g-3">
        {settings.map((item, index) => (
          <Col md={3} key={index}>
            <Card className="d-flex flex-row align-items-center justify-content-between p-3 border-0 shadow-sm">
              {/* Icon box */}
              <div
                className="d-flex align-items-center justify-content-center rounded p-2"
                style={{ backgroundColor: "rgba(255, 140, 0, 0.15)", width: "40px", height: "40px" }}
              >
                <span className="text-warning fs-5">{item.icon}</span>
              </div>

              {/* Text */}
              <div className="ms-3 flex-grow-1">
                <p className="mb-0 fw-medium">{item.title}</p>
              </div>

              {/* Toggle */}
              <Form.Check
                type="switch"
                id={`switch-${index}`}
                checked={item.enabled}
                onChange={() => toggleSetting(index)}
                className="ms-auto"
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default QuickSettings;

