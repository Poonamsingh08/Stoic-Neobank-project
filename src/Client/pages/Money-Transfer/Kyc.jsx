import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";

const Kyc = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    address: "",
    phone: "",
    email: "",
    idProof: null,
    addressProof: null,
    selfie: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

    const buttonStyle = {
    backgroundColor: "#950606",
    borderColor: "#950606",
    fontSize: "1rem",
    padding: "0.65rem 1.75rem",
  };
  const inputStyle = { fontSize: "1rem", padding: "0.65rem" };

  return (
    <Container fluid className="p-4 bg-light min-vh-100 d-flex align-items-center justify-content-center">
      <Card className="w-100" style={{ maxWidth: "750px", borderRadius: "1rem", minHeight: "500px" }}>
        <Card.Body className="p-5 d-flex flex-column">

          {/* Step Indicator */}
          <Row className="mb-4 text-center">
            {["Intro", "Info", "Documents", "Review", "Done"].map((label, i) => (
              <Col key={i}>
                <span
                  style={{
                    fontWeight: step === i + 1 ? "700" : "500",
                    fontSize:"0.95rem",
                    color: step === i + 1 ? "orange" : "gray",
                  }}
                >
                  {label}
                </span>
              </Col>
            ))}
          </Row>

          {/* Step Content */}
          <div className="flex-grow-1 mt-4">
            {/* Step 1: Intro */}
            {step === 1 && (
              <>
                <div className="text-center">
                  <h5 className="fw-bold text-dark mb-3">KYC Verification</h5>

                  <p className="text-muted fs-6 mx-auto" style={{ maxWidth: "600px" }}>
                    To increase your transaction limits and secure your account, we need to verify your identity. Please keep the following documents ready:
                  </p>
                </div>
                <ul
                  className="mt-4 fs-6 text-muted mx-auto"
                  style={{ maxWidth: "500px" }}
                >
                  <li>Government-issued Photo ID (Aadhar, PAN, Passport)</li>
                  <li>Proof of Address (Utility Bill, Bank Statement)</li>
                  <li>A recent Selfie/Photo</li>
                </ul>
                <div className="text-center mt-5">
                  <Button onClick={nextStep} style={buttonStyle} size="lg"
                  onMouseEnter={(e) => (e.target.style.backgroundColor = "#780606")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#900603")}
                  >
                    Start KYC →
                  </Button>
                </div>
              </>
            )}

            {/* Step 2: Personal Info */}
            {step === 2 && (
              <>
                <h5 className="fw-bold text-dark">Personal Information</h5>
                <Form className="mt-4">
                  <Row className="g-3">
                    <Col md={6}>
                      <Form.Control
                        type="text"
                        name="fullName"
                        placeholder="Full Legal Name"
                        value={formData.fullName}
                        onChange={handleChange}
                        style={inputStyle}
                      />
                    </Col>
                    <Col md={6}>
                      <Form.Control
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        style={inputStyle}
                      />
                    </Col>
                    <Col md={12}>
                      <Form.Control
                        type="text"
                        name="address"
                        placeholder="Address"
                        value={formData.address}
                        onChange={handleChange}
                        style={inputStyle}
                      />
                    </Col>
                    <Col md={6}>
                      <Form.Control
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                        style={inputStyle}
                      />
                    </Col>
                    <Col md={6}>
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        style={inputStyle}
                      />
                    </Col>
                  </Row>
                </Form>
                <div className="d-flex justify-content-between mt-4">
                  <Button onClick={prevStep} style={buttonStyle} size="lg"
                  onMouseEnter={(e) => (e.target.style.backgroundColor = "#780606")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#900603")}
                  >
                    Back
                  </Button>
                  <Button onClick={nextStep} style={buttonStyle} size="lg"
                  onMouseEnter={(e) => (e.target.style.backgroundColor = "#780606")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#900603")}
                  >
                    Next
                  </Button>
                </div>
              </>
            )}

            {/* Step 3: Document Upload */}
            {step === 3 && (
              <>
                <h5 className="fw-bold text-dark">Upload Documents</h5>
                <Form className="mt-4">
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold fs-6">Photo ID</Form.Label>
                    <Form.Control
                      type="file"
                      name="idProof"
                      accept="image/*,application/pdf"
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                   <Form.Label className="fw-semibold fs-6">Address Proof</Form.Label>
                    <Form.Control
                      type="file"
                      name="addressProof"
                      accept="image/*,application/pdf"
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group>
                   <Form.Label className="fw-semibold fs-6">Selfie</Form.Label>
                    <Form.Control
                      type="file"
                      name="selfie"
                      accept="image/*"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Form>
                <div className="d-flex justify-content-between mt-4">
                  <Button onClick={prevStep} style={buttonStyle} size="lg"
                  onMouseEnter={(e) => (e.target.style.backgroundColor = "#780606")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#900603")}
                  >
                    Back
                  </Button>
                  <Button onClick={nextStep} style={buttonStyle} size="lg"
                  onMouseEnter={(e) => (e.target.style.backgroundColor = "#780606")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#900603")}
                  >
                    Next 
                  </Button>
                </div>
              </>
            )}

            {/* Step 4: Review */}
            {step === 4 && (
              <>
                <h2 className="fw-bold fs-4 text-dark">Review Your Details</h2>
                <div className="fw-bold mt-3 fs-6" text-muted>
                  <p>Name:{formData.fullName}</p>
                  <p>DOB:{formData.dob}</p>
                  <p>Address:{formData.address}</p>
                  <p>Phone:{formData.phone}</p>
                  <p>Email:{formData.email}</p>
                  <p>ID Proof:{formData.idProof?.name}</p>
                  <p>Address Proof:{formData.addressProof?.name}</p>
                  <p>Selfie:{formData.selfie?.name}</p>
                </div>
                <div className="d-flex justify-content-between mt-4">
                  <Button onClick={prevStep} style={buttonStyle} size="lg"
                  onMouseEnter={(e) => (e.target.style.backgroundColor = "#780606")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#900603")}
                  >
                    Back
                  </Button>
                  <Button onClick={nextStep} style={buttonStyle} size="lg"
                  onMouseEnter={(e) => (e.target.style.backgroundColor = "#780606")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#900603")}
                  >
                    Submit ✔
                  </Button>
                </div>
              </>
            )}

            {/* Step 5: Done */}
            {step === 5 && (
              <div className="text-center mt-4">
                <h5 className="fw-bold text-success">✅ KYC Submitted!</h5>
                <p
                  className="text-muted fs-6 mx-auto"
                  style={{ maxWidth: "600px" }}
                >
                  Your documents have been submitted successfully. Verification may take up to 24–48 hours. You can track your KYC status in your profile.
                </p>
                <Button onClick={() => setStep(1)} style={buttonStyle} size="lg" className="mt-3"
                  onMouseEnter={(e) => (e.target.style.backgroundColor = "#780606")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#900603")}
                  >
                  Go to Dashboard
                </Button>
              </div>
            )}
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Kyc;
