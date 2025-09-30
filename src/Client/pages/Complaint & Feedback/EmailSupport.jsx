import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
function EmailSupport() {
  const [formState, setFormState] = useState({
    fullName: "",
    email: "",
    subject: "",
    category: "",
    priority: "",
    message: "",
    attachment: null,

  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormState({
      ...formState,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formState);
    alert("Your email request has been submitted successfully!");
    
  };

  return (
    <div className="w-100">
      {/* 🔴 Header Full Width */}
      <div className="w-full bg-[#900603] py-4">
        <Container className="text-center text-white">
          <h1 className="text-white">Neo Bank Email Support</h1>
          <p className="text-white">
            We value your feedback and are committed to resolving your concerns promptly. <br />
            Choose your preferred way to reach us.
          </p>
        </Container>
      </div>

      {/* Page Content */}
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={10}>
            <Row>
              {/* Left Side (Email Form) */}
              <Col md={7}>
                <Card className="shadow-sm border-0 mb-4">
                  <Card.Body>
                    <h3 className="mb-2" style={{ color: "#A50034" }}>📧 Email Support</h3>
                    <p className="text-muted">
                      Contact our support team via email. We’ll respond within{" "}
                      <strong>24-48 hours</strong>.
                    </p>

                    <Form onSubmit={handleSubmit}>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Full Name *</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter your full name"
                              name="fullName"
                              value={formState.fullName}
                              onChange={handleChange}
                              required
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Email Address *</Form.Label>
                            <Form.Control
                              type="email"
                              placeholder="your.email@example.com"
                              name="email"
                              value={formState.email}
                              onChange={handleChange}
                              required
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Form.Group className="mb-3">
                        <Form.Label>Subject *</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Brief description of your inquiry"
                          name="subject"
                          value={formState.subject}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>

                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Category *</Form.Label>
                            <Form.Select
                              name="category"
                              value={formState.category}
                              onChange={handleChange}
                              required
                            >
                              <option value="">Select category</option>
                              <option>Account Issues</option>
                              <option>Transaction Problems</option>
                              <option>Card Related</option>
                              <option>Loan Services</option>
                              <option>Investment Issues</option>
                              <option>Mobile/Internet Banking</option>
                              <option>Other</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Priority Level *</Form.Label>
                            <Form.Select
                              name="priority"
                              value={formState.priority}
                              onChange={handleChange}
                              required
                            >
                              <option value="">Select priority</option>
                              <option>Low Priority - General inquiries</option>
                              <option>Medium Priority - Account issues</option>
                              <option>High Priority - Urgent issues</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>

                      <Form.Group className="mb-3">
                        <Form.Label>Message *</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={4}
                          placeholder="Please provide detailed information about your inquiry or issue..."
                          name="message"
                          value={formState.message}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>

                      <Form.Group className="mb-4">
                        <Form.Label>Attachments (Optional)</Form.Label>
                        <Form.Control
                          type="file"
                          name="attachment"
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          onChange={handleChange}
                        />
                        <Form.Text className="text-muted">
                          Supported formats: PDF, DOC, DOCX, JPG, PNG (Max 10MB per file)
                        </Form.Text>
                      </Form.Group>

                      <div className="d-flex justify-content-between">
                        <Button
                          variant="light"
                          className="border"
                          onClick={() => navigate("/Client/complaintfeedback")}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          className="text-white px-4"
                          style={{ backgroundColor: "#A50034", border: "none" }}
                           onClick={() => navigate("/Client/complaintfeedback")}
                        >
                          🚀 Send Email
                        </Button>
                      </div>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>

              {/* Right Side (Extra Info) */}
              <Col md={5}>
                <Card className="shadow-sm border-0 mb-4">
                  <Card.Body>
                    <h5 className="mb-3">⏱ Response Times</h5>
                    <div className="d-flex justify-content-between mb-2">
                      <Badge bg="success">Low Priority</Badge>
                      <span>24-48 hours</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <Badge bg="warning">Medium Priority</Badge>
                      <span>12-24 hours</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <Badge bg="danger">High Priority</Badge>
                      <span>4-12 hours</span>
                    </div>
                  </Card.Body>
                </Card>

                <Card className="shadow-sm border-0 mb-4">
                  <Card.Body>
                    <h5 className="mb-3">📞 Other Contact Options</h5>
                    <p>
                      <strong>Phone Support:</strong> 1800-123-4567 (24/7)
                    </p>
                    <p>
                      <strong>Live Chat:</strong> Available 9 AM - 9 PM
                    </p>
                  </Card.Body>
                </Card>

                <Card className="shadow-sm border-0">
                  <Card.Body>
                    <h5 className="mb-3">💡 Email Tips</h5>
                    <ul className="mb-0 text-muted">
                      <li>Include account details for faster resolution</li>
                      <li>Attach screenshots for technical issues</li>
                      <li>Be specific about the problem or question</li>
                      <li>Check your spam folder for our replies</li>
                    </ul>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default EmailSupport;
