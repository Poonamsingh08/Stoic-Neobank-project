import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import "./DomesticTransfer.css";

const DomesticTransfer = () => {
  const navigate = useNavigate();

  return (
    <Container
      fluid
      className="dom-transfer-container d-flex justify-content-center align-items-center"
    >
      <Card className="dom-transfer-card p-4 shadow-lg rounded-4 d-flex flex-column align-items-center text-center">
        {/* Icon */}
        <div className="dom-transfer-icon">
          <svg
  xmlns="http://www.w3.org/2000/svg"
  width="28"
  height="28"
  fill="white"   // ✅ icon color white
  viewBox="0 0 16 16"
>
  <path d="M12 1a1 1 0 0 1 1 1v2h-1V2H5v1H4V2a1 1 0 0 1 1-1h7zM3 4h10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4zm3 2a.5.5 0 0 0-.5.5V8H4v1h1v1h1V9h1V8H7V6.5A.5.5 0 0 0 6 6z" />
</svg>

        </div>

        {/* Title */}
        <h5 className="fw-bold text-dark mb-2">Domestic Transfers</h5>

        {/* Description */}
        <p className="dom-transfer-description text-muted fs-6 mb-4">
          Choose from NEFT, IMPS, RTGS, or UPI for sending money within India.
        </p>

        {/* Transfer Buttons */}
        <div className="d-flex flex-column align-items-center w-100"></div>
       
        <Row className="g-4 justify-content-center w-100 dom-transfer-button-row">
          <Col xs={6} md={5}>
          
            <Button
  className="dom-transfer-btn"
  onClick={() => navigate("/Client/neft")}
>
  NEFT
</Button>
          </Col>
          <Col xs={6}  md={5}>
            <Button
           className="dom-transfer-btn"
              onClick={() => navigate("/Client/imps")}
            >
              IMPS
            </Button>
          </Col>
          <Col xs={6} md={5}>
            <Button
              className="dom-transfer-btn"
              onClick={() => navigate("/Client/rtgs")}
            >
              RTGS
            </Button>
          </Col>
         <Col xs={6} md={5}>
            <Button
              className="dom-transfer-btn"
              onClick={() => navigate("/Client/money-transfer/send?type=upi")}
            >
              UPI
            </Button>
          </Col>
        

       {/* Back Button - same size as others */}
 <Col xs={6} md={5}>
    <Button
      className="dom-transfer-btn"
      onClick={() => navigate(-1)}
    >
      Back
    </Button>
  </Col>
</Row>

      </Card>
    </Container>
  );
};

export default DomesticTransfer;
