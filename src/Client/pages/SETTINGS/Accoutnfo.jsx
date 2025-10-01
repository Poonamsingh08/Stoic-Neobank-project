import React from "react";
import { Row, Col, Card } from "react-bootstrap";

const accountInfo = [
  { label: "Account Status", value: "Active", status: "success" },
  { label: "Last Login", value: "Today, 10:30 AM", status: "muted" },
  { label: "KYC Status", value: "Verified", status: "success" },
  { label: "Mobile Verified", value: "Yes", status: "success" },
  { label: "Two-Factor Auth", value: "Disabled", status: "danger" },
  { label: "Email Verified", value: "Yes", status: "success" },
];

const AccountInfo = () => {
  return (
    <div className="p-4 bg-light rounded shadow-sm ">
   
    <Card className="p-3">
      {/* Header */}
      <h5 className="fw-bold">Account Information</h5>
      <p className="text-muted">Overview of your account settings and status</p>

      {/* Grid */}
      <Row className="g-3">
        {accountInfo.map((item, index) => (
          <Col md={6} key={index}>
            <div className="d-flex justify-content-between align-items-center border rounded p-3">
              <span className="fw-medium text-secondary">{item.label}</span>
              <span
                className={
                  item.status === "success"
                    ? "text-success fw-semibold"
                    : item.status === "danger"
                    ? "text-danger fw-semibold"
                    : "text-muted fw-semibold"
                }
              >
                {item.value}
              </span>
            </div>
          </Col>
        ))}
      </Row>
    </Card>
     </div>
  );
};

export default AccountInfo;

