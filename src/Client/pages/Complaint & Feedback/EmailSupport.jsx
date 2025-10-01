import React, { useState } from "react";
import "./EmailSupport.css";

const EmailSupport = () => {
  const [formState, setFormState] = useState({
    fullName: "",
    email: "",
    subject: "",
    category: "",
    priority: "",
    message: "",
    attachment: null,
  });

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
    <div className="es-root">
      {/* Header */}
      <div className="es-header">
        <div className="es-header-content">
          <h1 className="es-header-title">Neo Bank Email Support</h1>
          <p className="es-header-subtitle">
            We value your feedback and are committed to resolving your concerns promptly.
            <br />
            Choose your preferred way to reach us.
          </p>
        </div>
      </div>

      {/* Page Content */}
      <div className="es-container">
        <div className="es-row">
          {/* Left Side - Form */}
          <div className="es-col es-col-left">
            <div className="es-card">
              <h3 className="es-card-title">📧 Email Support</h3>
              <p className="es-card-subtitle">
                Contact our support team via email. We’ll respond within <strong>24-48 hours</strong>.
              </p>

              <form className="es-form" onSubmit={handleSubmit}>
                <div className="es-form-row">
                  <div className="es-form-col">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formState.fullName}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div className="es-form-col">
                    <label>Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="es-form-group">
                  <label>Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    placeholder="Brief description of your inquiry"
                    required
                  />
                </div>

                <div className="es-form-row">
                  <div className="es-form-col">
                    <label>Category *</label>
                    <select
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
                    </select>
                  </div>
                  <div className="es-form-col">
                    <label>Priority Level *</label>
                    <select
                      name="priority"
                      value={formState.priority}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select priority</option>
                      <option>Low Priority - General inquiries</option>
                      <option>Medium Priority - Account issues</option>
                      <option>High Priority - Urgent issues</option>
                    </select>
                  </div>
                </div>

                <div className="es-form-group">
                  <label>Message *</label>
                  <textarea
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    placeholder="Please provide detailed information about your inquiry or issue..."
                    rows="4"
                    required
                  />
                </div>

                <div className="es-form-group">
                  <label>Attachments (Optional)</label>
                  <input
                    type="file"
                    name="attachment"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    onChange={handleChange}
                  />
                  <small className="es-form-text">
                    Supported formats: PDF, DOC, DOCX, JPG, PNG (Max 10MB per file)
                  </small>
                </div>

                <div className="es-form-actions">
                  <button
                    type="button"
                    className="es-btn es-btn-light"
                    onClick={() => (window.location.href = "/complaint")}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="es-btn es-btn-submit">
                    🚀 Send Email
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Side - Info */}
          <div className="es-col es-col-right">
            <div className="es-card">
              <h5 className="es-card-title">⏱ Response Times</h5>
              <div className="es-info-row">
                <span className="es-badge es-badge-success">Low Priority</span>
                <span>24-48 hours</span>
              </div>
              <div className="es-info-row">
                <span className="es-badge es-badge-warning">Medium Priority</span>
                <span>12-24 hours</span>
              </div>
              <div className="es-info-row">
                <span className="es-badge es-badge-danger">High Priority</span>
                <span>4-12 hours</span>
              </div>
            </div>

            <div className="es-card">
              <h5 className="es-card-title">📞 Other Contact Options</h5>
              <p><strong>Phone Support:</strong> 1800-123-4567 (24/7)</p>
              <p><strong>Live Chat:</strong> Available 9 AM - 9 PM</p>
            </div>

            <div className="es-card">
              <h5 className="es-card-title">💡 Email Tips</h5>
              <ul className="es-tips-list">
                <li>Include account details for faster resolution</li>
                <li>Attach screenshots for technical issues</li>
                <li>Be specific about the problem or question</li>
                <li>Check your spam folder for our replies</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailSupport;
