import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button } from 'react-bootstrap';
import { FaExclamationTriangle, FaMobileAlt, FaKey } from 'react-icons/fa';

const SecurityOptions = () => {
  return (
    <div className=" bg-light">
      <div className="p-3 mx-4 rounded border shadow-sm bg-white" >
        <h5 className="fw-bold">Security Recommendations</h5>
        <p className="text-muted mb-4">
          Improve your account security with these suggestions
        </p>

        {/* Enable Two-Factor Authentication */}
        <Card className="mb-3 border-warning bg-warning-subtle">
          <Card.Body className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <FaExclamationTriangle className="text-warning me-3 fs-4" />
              <div>
                <h6 className="mb-1">Enable Two-Factor Authentication</h6>
                <small className="text-muted">
                  Add an extra layer of security to your account
                </small>
              </div>
            </div>
            <Button variant="outline-warning" size="sm">Enable</Button>
          </Card.Body>
        </Card>

        {/* Update Password */}
        <Card className="mb-3 border-primary bg-primary-subtle">
          <Card.Body className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <FaKey className="text-primary me-3 fs-4" />
              <div>
                <h6 className="mb-1">Update Password</h6>
                <small className="text-muted">
                  Your password was last changed 6 months ago
                </small>
              </div>
            </div>
            <Button variant="outline-primary" size="sm">Update</Button>
          </Card.Body>
        </Card>

        {/* Enable Biometric Login */}
        <Card className="border-success bg-success-subtle">
          <Card.Body className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <FaMobileAlt className="text-success me-3 fs-4" />
              <div>
                <h6 className="mb-1">Enable Biometric Login</h6>
                <small className="text-muted">
                  Use fingerprint or face recognition for quick access
                </small>
              </div>
            </div>
            <Button variant="outline-success" size="sm">Setup</Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default SecurityOptions;


