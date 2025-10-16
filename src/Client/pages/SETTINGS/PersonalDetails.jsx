import React, { useState, useRef } from "react";
import {
  FaRegIdCard, FaRegFileAlt, FaRegCreditCard, FaPhoneAlt,
  FaEdit,
  FaEye,FaCamera,
  FaEyeSlash,
  FaCopy,
  FaUpload,
} from "react-icons/fa";
import "./PersonalDetails.css";
import {FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const PersonalDetails = () => {
  const [showSensitive, setShowSensitive] = useState({
    account: false,
    pan: false,
    aadhar: false,
  });
  const navigate = useNavigate();
  const [copySuccess, setCopySuccess] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");
  const [editMode, setEditMode] = useState({
    personal: false,
    contact: false,
  });

  const [profileImage, setProfileImage] = useState(
    "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"
  );
  const fileInputRef = useRef(null);

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const [uploadedDocs, setUploadedDocs] = useState({});
  const [viewDoc, setViewDoc] = useState(null);

  const handleDocUpload = (e, docType) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUploadedDocs((prev) => ({ ...prev, [docType]: url }));
    }
  };

  const [profileData, setProfileData] = useState({
    firstName: "Rajesh",
    middleName: "",
    lastName: "Sharma",
    dateOfBirth: "1990-05-15",
    gender: "Male",
    maritalStatus: "Married",
    nationality: "Indian",
    accountNumber: "123456789012",
    accountType: "Premium Savings",
    balance: "₹1,25,000",
    status: "Active",
    lastLogin: "Today",
    email: "rajesh.sharma@email.com",
    phoneNumber: "9876543210",
    address:
      "123, MG Road, Sector 14, Near City Mall, Gurgaon, Haryana - 122001",
    emergencyName: "Priya Sharma",
    emergencyRelation: "Spouse",
    emergencyPhone: "9876543212",
    panNumber: "ABCPK1234F",
    aadharNumber: "123456789012",
    passportNumber: "A1234567",
  });

  const maskData = (value, type) => {
    if (showSensitive[type]) return value;
    if (type === "pan") return value.slice(0, 2) + "" + value.slice(-1);
    if (type === "aadhar") return "" + value.slice(-4);
    if (type === "account") return "" + value.slice(-4);
    return value;
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleEdit = (tab) => {
    setEditMode((prev) => ({ ...prev, [tab]: !prev[tab] }));
  };
  
  return (
    <div className="pd-container">
      {/* Header */}
      <div className="pd-header">
  {/* ===== Left Section (Profile Info) ===== */}
  <div className="pd-header-left">
    <div className="pd-profile-pic">
      <img src={profileImage} alt="profile" />
      {/* Upload Icon Overlay */}
      <div
        className="pd-upload-overlay"
        onClick={() => fileInputRef.current.click()}
      >
        <FaCamera size={18} />
      </div>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept="image/*"
        onChange={handleProfileImageChange}
      />
    </div>

    <div className="pd-user-info">
      <h2>
        {profileData.firstName} {profileData.middleName} {profileData.lastName}
      </h2>
      <p>{profileData.accountType}</p>
      <span className="pd-verified">✅ Verified</span>
      <span className="pd-premium">⭐ Premium Member</span>
    </div>
  </div>

  {/* ===== Right Section (Back Button) ===== */}
  <div className="pd-header-right">
    <button className="pd-back-btn" onClick={() => navigate("/Client/setting")}>
      <FaArrowLeft size={20} />
      <span>Back</span>
    </button>
  </div>
</div>



      {/* Tabs */}
      <div className="pd-tabs">
        {[
          { key: "personal", label: "Personal Info", icon: <FaRegIdCard /> },
          { key: "contact", label: "Contact Details", icon: <FaPhoneAlt /> },
          { key: "documents", label: "Documents", icon: <FaRegFileAlt /> },
          { key: "financial", label: "Financial Info", icon: <FaRegCreditCard /> },
        ].map((tab) => (
          <button
            key={tab.key}
            className={`pd-tab-btn ${activeTab === tab.key ? "active" : ""}`}
            onClick={() => setActiveTab(tab.key)}
          >
            <span className="pd-tab-icon">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>


      {/* Tab Content */}
      <div className="pd-content">
        {activeTab === "personal" && (
          <div className="pd-card">
            <h3 className="pd-card-title">Personal Info</h3>
            {editMode.personal ? (
              <>
                <div className="pd-form">
                  <div className="pd-row">
                    <div className="pd-col">
                      <label>First Name</label>
                      <input
                        name="firstName"
                        value={profileData.firstName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="pd-col">
                      <label>Middle Name</label>
                      <input
                        name="middleName"
                        value={profileData.middleName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="pd-col">
                      <label>Last Name</label>
                      <input
                        name="lastName"
                        value={profileData.lastName}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="pd-row">
                    <div className="pd-col">
                      <label>Date of Birth</label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={profileData.dateOfBirth}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="pd-col">
                      <label>Gender</label>
                      <select
                        name="gender"
                        value={profileData.gender}
                        onChange={handleInputChange}
                      >
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div className="pd-col">
                      <label>Marital Status</label>
                      <select
                        name="maritalStatus"
                        value={profileData.maritalStatus}
                        onChange={handleInputChange}
                      >
                        <option>Single</option>
                        <option>Married</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="pd-row">
                    <div className="pd-col">
                      <label>Nationality</label>
                      <input
                        name="nationality"
                        value={profileData.nationality}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
                <button
                  className="pd-btn-warning"
                  onClick={() => toggleEdit("personal")}
                >
                  <FaEdit /> Save
                </button>
              </>
            ) : (
              <>
                {[
                  {
                    label: "Name",
                    value: `${profileData.firstName} ${profileData.middleName} ${profileData.lastName}`,
                  },
                  { label: "Date of Birth", value: profileData.dateOfBirth },
                  { label: "Gender", value: profileData.gender },
                  { label: "Marital Status", value: profileData.maritalStatus },
                  { label: "Nationality", value: profileData.nationality },
                ].map((item, idx) => (
                  <div key={idx} className="pd-info-row">
                    <strong>{item.label}:</strong>
                    <span>{item.value}</span>
                  </div>
                ))}
                <button
                  className="pd-btn-warning"
                  onClick={() => toggleEdit("personal")}
                >
                  <FaEdit /> Edit
                </button>
              </>
            )}
          </div>
        )}

        {activeTab === "contact" && (
          <div className="pd-card">
            <h3 className="pd-card-title">Contact Details</h3>
            {editMode.contact ? (
              <>
                <div className="pd-form">
                  <div className="pd-col">
                    <label>Email</label>
                    <input
                      name="email"
                      value={profileData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="pd-col">
                    <label>Address</label>
                    <textarea
                      name="address"
                      value={profileData.address}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <button
                  className="pd-btn-warning"
                  onClick={() => toggleEdit("contact")}
                >
                  <FaEdit /> Save
                </button>
              </>
            ) : (
              <>
                {[
                  { label: "Email", value: profileData.email },
                  { label: "Phone", value: profileData.phoneNumber },
                  { label: "Address", value: profileData.address },
                ].map((item, idx) => (
                  <div key={idx} className="pd-info-row">
                    <strong>{item.label}:</strong>
                    <span>{item.value}</span>
                  </div>
                ))}
                <button
                  className="pd-btn-warning"
                  onClick={() => toggleEdit("contact")}
                >
                  <FaEdit /> Edit
                </button>
              </>
            )}
          </div>
        )}

        {activeTab === "documents" && (
          <div className="pd-card">
            <h3 className="pd-card-title">Identity Documents</h3>
            <div className="pd-docs-grid">
              {[
                {
                  label: "PAN Number",
                  value: profileData.panNumber,
                  type: "pan",
                },
                {
                  label: "Aadhar Number",
                  value: profileData.aadharNumber,
                  type: "aadhar",
                },
                {
                  label: "Passport Number",
                  value: profileData.passportNumber,
                  type: "passport",
                },
              ].map((doc, idx) => (
                <div key={idx} className="pd-doc-card">
                  <strong>{doc.label}:</strong>
                  <span>
                    {doc.type === "passport"
                      ? doc.value
                      : maskData(doc.value, doc.type)}
                  </span>
                  {doc.type !== "passport" && (
                    <div className="pd-doc-actions">
                      <button
                        onClick={() =>
                          setShowSensitive((prev) => ({
                            ...prev,
                            [doc.type]: !prev[doc.type],
                          }))
                        }
                      >
                        {showSensitive[doc.type] ? <FaEyeSlash /> : <FaEye />}
                      </button>
                      <button onClick={() => copyToClipboard(doc.value)}>
                        <FaCopy />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <h3 className="pd-card-title mt-4">Document Upload</h3>
            <div className="pd-docs-grid">
              {["PAN Card", "Aadhar Card", "Passport", "Signature"].map(
                (doc, idx) => (
                  <div key={idx} className="pd-upload-card">
                    <span>{doc}</span>
                    <div>
                      {uploadedDocs[doc] && (
                        <button onClick={() => setViewDoc(uploadedDocs[doc])}>
                          <FaEye />
                        </button>
                      )}
                      <button
                        onClick={() =>
                          document.getElementById(`upload-${doc}`).click()
                        }
                      >
                        <FaUpload />
                      </button>
                      <input
                        type="file"
                        id={`upload-${doc}`}
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={(e) => handleDocUpload(e, doc)}
                      />
                    </div>
                  </div>
                )
              )}
            </div>

            {viewDoc && (
              <div className="pd-modal">
                <div className="pd-modal-content">
                  <button
                    className="pd-close-btn"
                    onClick={() => setViewDoc(null)}
                  >
                    ✖
                  </button>
                  <img src={viewDoc} alt="document" />
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "financial" && (
          <div className="pd-card">
            <h3 className="pd-card-title">Financial Info</h3>
            {[
              {
                label: "Account Number",
                value: maskData(profileData.accountNumber, "account"),
              },
              { label: "Account Type", value: profileData.accountType },
              { label: "Balance", value: profileData.balance },
              { label: "Status", value: profileData.status },
              { label: "Last Login", value: profileData.lastLogin },
            ].map((item, idx) => (
              <div key={idx} className="pd-info-row">
                <strong>{item.label}:</strong>
                <span>{item.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {copySuccess && <div className="pd-toast">Copied to clipboard!</div>}
    </div>
  );
};

export default PersonalDetails;