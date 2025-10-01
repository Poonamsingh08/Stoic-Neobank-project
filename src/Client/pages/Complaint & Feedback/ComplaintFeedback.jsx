import React, { useState, useRef, useEffect } from "react";
import {Phone,Mail,MessageCircle,Loader,CheckCircle,AlertTriangle,Circle,ChevronUp,MinusCircle,X,Send,Paperclip,Image as ImageIcon,} from "lucide-react";
import { useNavigate } from "react-router-dom";
import './ComplaintFeedback.css'; // 👈 unique CSS


const DetailsModal = ({ ticket, onClose }) => {
  return (
    <div className="cf-modal-overlay">
      <div className="cf-modal-card">
        <div className="cf-modal-header">
          <h3 className="cf-modal-title">Ticket Details</h3>
          <button onClick={onClose} className="cf-modal-close-btn">
            <X size={20} />
          </button>
        </div>
        <div className="cf-modal-body">
          <p><span className="cf-modal-label">Ticket ID:</span> {ticket.id}</p>
          <p><span className="cf-modal-label">Subject:</span> {ticket.subject}</p>
          <p><span className="cf-modal-label">Type:</span> {ticket.type}</p>
          <p><span className="cf-modal-label">Status:</span> {ticket.status}</p>
          <p><span className="cf-modal-label">Priority:</span> {ticket.priority}</p>
        </div>
        <div className="cf-modal-footer">
          <button onClick={onClose} className="cf-btn cf-btn-close">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const LiveChatModal = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (input.trim() === "" && !selectedImage) return;

    const newMsg = selectedImage
      ? { image: selectedImage, sender: "user" }
      : { text: input, sender: "user" };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");
    setSelectedImage(null);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: "Thank you! An agent will be with you shortly.", sender: "bot" },
      ]);
    }, 1500);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="cf-modal-overlay">
      <div className="cf-chat-modal">
        <div className="cf-chat-header">
          <h2 className="cf-chat-title">Live Chat Neo Bank</h2>
          <button onClick={onClose} className="cf-chat-close-btn">
            <X size={20} />
          </button>
        </div>
        <div className="cf-chat-body">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={
                msg.sender === "user"
                  ? "cf-chat-msg cf-chat-msg-user"
                  : "cf-chat-msg cf-chat-msg-bot"
              }
            >
              <div className="cf-chat-msg-content">
                {msg.text}
                {msg.image && (
                  <img
                    src={msg.image}
                    alt="upload"
                    className="cf-chat-img"
                  />
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form className="cf-chat-input-area" onSubmit={handleSendMessage}>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="cf-chat-file-input"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current.click()}
            className="cf-chat-btn-attach"
            title="Attach image"
          >
            <Paperclip size={20} />
          </button>
          <input
            type="text"
            className="cf-chat-text-input"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={!!selectedImage}
          />
          <button
            type="submit"
            className="cf-chat-btn-send"
            disabled={input.trim() === "" && !selectedImage}
          >
            <Send size={20} />
          </button>
          {selectedImage && (
            <div className="cf-chat-preview">
              <ImageIcon size={20} className="cf-chat-preview-icon" />
              <span className="cf-chat-preview-text">Image ready to send.</span>
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="cf-chat-preview-remove"
              >
                <X size={16} />
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default function ComplaintFeedback() {
  const [formData, setFormData] = useState({
    type: "",
    category: "",
    priority: "Low",
    subject: "",
    description: "",
    contactMethod: "",
  });
  const [tickets, setTickets] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [formMessage, setFormMessage] = useState({ type: "", text: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.subject || !formData.description || !formData.contactMethod) {
      setFormMessage({ type: "error", text: "Please fill all required fields." });
      return;
    }
    const newTicket = {
      id: `TKT${Math.floor(100000 + Math.random() * 900000)}`,
      subject: formData.subject,
      type: formData.type,
      date: new Date().toISOString().slice(0, 10),
      status: "Pending",
      priority: formData.priority,
    };
    setTickets((prev) => [newTicket, ...prev]);
    setFormMessage({ type: "success", text: "Your ticket has been submitted successfully!" });
    setFormData({
      type: "",
      category: "",
      priority: "Low",
      subject: "",
      description: "",
      contactMethod: "",
    });
  };

  const renderTicketBadge = (ticket) => {
    let statusBadge, priorityBadge;
    if (ticket.status === "Pending") {
      statusBadge = (
        <span className="cf-badge cf-badge-pending">
          <AlertTriangle size={14} /> Pending
        </span>
      );
    } else if (ticket.status === "Resolved") {
      statusBadge = (
        <span className="cf-badge cf-badge-resolved">
          <CheckCircle size={14} /> Resolved
        </span>
      );
    } else {
      statusBadge = (
        <span className="cf-badge cf-badge-progress">
          <Loader size={14} /> In Progress
        </span>
      );
    }

    if (ticket.priority === "High") {
      priorityBadge = (
        <span className="cf-badge cf-badge-high">
          <ChevronUp size={14} /> High Priority
        </span>
      );
    } else if (ticket.priority === "Medium") {
      priorityBadge = (
        <span className="cf-badge cf-badge-medium">
          <Circle size={14} /> Medium Priority
        </span>
      );
    } else {
      priorityBadge = (
        <span className="cf-badge cf-badge-low">
          <MinusCircle size={14} /> Low Priority
        </span>
      );
    }

    return { statusBadge, priorityBadge };
  };

  const handleViewDetails = (ticket) => {
    setSelectedTicket(ticket);
    setShowDetailsModal(true);
  };

  return (
    <div className="cf-root">
      <header className="cf-header">
        <h1 className="cf-header-title">Complaint & Feedback</h1>
        <p className="cf-header-subtitle">
          Fill in the details and we'll get back to you within the stipulated business hours
        </p>
      </header>

      <main className="cf-main-container">
        <div className="cf-columns">
          <section className="cf-form-section">
            <div className="cf-card">
              <div className="cf-card-header">
                <h3>Submit Your Concern</h3>
                <p>Fill out the form below and we'll get back to you as soon as possible.</p>
              </div>
              <div className="cf-card-body">
                {formMessage.text && (
                  <div
                    className={
                      formMessage.type === "success"
                        ? "cf-alert cf-alert-success"
                        : "cf-alert cf-alert-error"
                    }
                  >
                    {formMessage.text}
                  </div>
                )}
                <form onSubmit={handleSubmit} className="cf-form">
                  <div className="cf-form-group">
                    <label>Type</label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select type</option>
                      <option value="Complaint">Complaint</option>
                      <option value="Feedback">Feedback</option>
                      <option value="Suggestion">Suggestion</option>
                    </select>
                  </div>

                  <div className="cf-form-group">
                    <label>Category</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select category</option>
                      <option value="Account Issues">Account Issues</option>
                      <option value="Transaction Problems">Transaction Problems</option>
                      <option value="Card Related">Card Related</option>
                      <option value="Loan Services">Loan Services</option>
                      <option value="Investment Issues">Investment Issues</option>
                      <option value="Mobile/Internet Banking">Mobile/Internet Banking</option>
                      <option value="Customer Service">Customer Service</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="cf-form-group">
                    <label>Priority</label>
                    <select
                      name="priority"
                      value={formData.priority}
                      onChange={handleChange}
                      required
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>

                  <div className="cf-form-group">
                    <label>Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Enter subject"
                      required
                    />
                  </div>

                  <div className="cf-form-group">
                    <label>Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows="4"
                      placeholder="Describe the issue or feedback"
                      required
                    />
                  </div>

                  <div className="cf-form-group">
                    <label>Preferred Contact Method</label>
                    <select
                      name="contactMethod"
                      value={formData.contactMethod}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select preferred contact method</option>
                      <option value="Email">Email</option>
                      <option value="Phone">Phone</option>
                    </select>
                  </div>

                  <div className="cf-form-group">
                    <button type="submit" className="cf-btn cf-btn-submit">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </section>

          <aside className="cf-sidebar-section">
            <div className="cf-card cf-sidebar-card">
              <h4>Your Recent Tickets</h4>
              <p className="cf-sidebar-subtext">
                Track the status of your submitted concerns
              </p>
              <div className="cf-ticket-list">
                {tickets.map((t, idx) => {
                  const { statusBadge, priorityBadge } = renderTicketBadge(t);
                  return (
                    <div key={idx} className="cf-ticket-card">
                      <div className="cf-ticket-top">
                        <div>
                          <p className="cf-ticket-subject">{t.subject}</p>
                          <p className="cf-ticket-meta">
                            {t.id} • {t.type} • {t.date}
                          </p>
                        </div>
                        {statusBadge}
                      </div>
                      <div className="cf-ticket-bottom">
                        {priorityBadge}
                        <button
                          className="cf-btn cf-btn-view"
                          onClick={() => handleViewDetails(t)}
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  );
                })}

                {/* Hardcoded tickets */}
                <div className="cf-ticket-card">
                  <div className="cf-ticket-top">
                    <div>
                      <p className="cf-ticket-subject">Transaction failed but amount debited</p>
                      <p className="cf-ticket-meta">TKT001234 • Complaint • 2025-01-08</p>
                    </div>
                    <span className="cf-badge cf-badge-progress">
                      <Loader size={14} /> In Progress
                    </span>
                  </div>
                  <div className="cf-ticket-bottom">
                    <span className="cf-badge cf-badge-high">
                      <ChevronUp size={14} /> High Priority
                    </span>
                    <button
                      className="cf-btn cf-btn-view"
                      onClick={() =>
                        handleViewDetails({
                          id: "TKT001234",
                          subject: "Transaction failed but amount debited",
                          type: "Complaint",
                          date: "2025-01-08",
                          status: "In Progress",
                          priority: "High",
                        })
                      }
                    >
                      View Details
                    </button>
                  </div>
                </div>

                <div className="cf-ticket-card">
                  <div className="cf-ticket-top">
                    <div>
                      <p className="cf-ticket-subject">Suggestion for mobile app improvement</p>
                      <p className="cf-ticket-meta">TKT001235 • Feedback • 2025-01-05</p>
                    </div>
                    <span className="cf-badge cf-badge-resolved">
                      <CheckCircle size={14} /> Resolved
                    </span>
                  </div>
                  <div className="cf-ticket-bottom">
                    <span className="cf-badge cf-badge-low">
                      <MinusCircle size={14} /> Low Priority
                    </span>
                    <button
                      className="cf-btn cf-btn-view"
                      onClick={() =>
                        handleViewDetails({
                          id: "TKT001235",
                          subject: "Suggestion for mobile app improvement",
                          type: "Feedback",
                          date: "2025-01-05",
                          status: "Resolved",
                          priority: "Low",
                        })
                      }
                    >
                      View Details
                    </button>
                  </div>
                </div>

                <div className="cf-ticket-card">
                  <div className="cf-ticket-top">
                    <div>
                      <p className="cf-ticket-subject">Card blocked without notification</p>
                      <p className="cf-ticket-meta">TKT001236 • Complaint • 2025-01-03</p>
                    </div>
                    <span className="cf-badge cf-badge-pending">
                      <AlertTriangle size={14} /> Pending
                    </span>
                  </div>
                  <div className="cf-ticket-bottom">
                    <span className="cf-badge cf-badge-medium">
                      <Circle size={14} /> Medium Priority
                    </span>
                    <button
                      className="cf-btn cf-btn-view"
                      onClick={() =>
                        handleViewDetails({
                          id: "TKT001236",
                          subject: "Card blocked without notification",
                          type: "Complaint",
                          date: "2025-01-03",
                          status: "Pending",
                          priority: "Medium",
                        })
                      }
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="cf-sidebar-contact">
              <button
                className="cf-contact-btn cf-contact-chat"
                onClick={() => setIsChatOpen(true)}
              >
                <MessageCircle size={24} className="cf-contact-icon" />
                <div className="cf-contact-text">
                  <p>Live Chat Neo Bank</p>
                  <p className="cf-contact-sub">Available 24x7 • Avg wait 2 mins</p>
                </div>
                <span className="cf-contact-status">Online</span>
              </button>

              <button
=======
                className="cf-contact-btn cf-contact-email"
                onClick={() => navigate("/Client/email-support")}
>>>  >
                <Mail size={24} className="cf-contact-icon" />
                <div className="cf-contact-text">
                  <p>Email Support</p>
                  <p className="cf-contact-sub">Response within 4-6 hours</p>
                </div>
                <span className="cf-contact-status">Send Email</span>
              </button>

              <div className="cf-contact-phone">
                <Phone size={24} className="cf-contact-icon" />
                <div className="cf-contact-textblock">
                  <p>Customer Care</p>
                  <p className="cf-contact-sub">1860-419-5555 • Mon-Sun 8AM-8PM</p>
                </div>
              </div>
            </div>
          </aside>
        </div>

        <div className="cf-faq-section">
          <h2>Frequently Asked Questions</h2>
          <p>Get answers to common questions</p>
          <div className="cf-faq-grid">
            <div className="cf-faq-card">
              <h6>How long does it take to resolve a complaint?</h6>
              <p>
                Most complaints are resolved within 7 working days. For
                complex issues, it may take up to 15 business days.
              </p>
            </div>
            <div className="cf-faq-card">
              <h6>Can I track my complaint status?</h6>
              <p>
                Yes, you can track your complaint status using your ticket ID
                provided when you submitted your complaint.
              </p>
            </div>
            <div className="cf-faq-card">
              <h6>What information should I include in my complaint?</h6>
              <p>
                Please include relevant details, dates, amounts, and any
                relevant screenshots or documents.
              </p>
            </div>
            <div className="cf-faq-card">
              <h6>Is there a fee for filing a complaint?</h6>
              <p>
                No, filing a complaint or providing feedback is completely
                free of charge.
              </p>
            </div>
          </div>
        </div>
      </main>

      {isChatOpen && <LiveChatModal onClose={() => setIsChatOpen(false)} />}
      {showDetailsModal && selectedTicket && (
        <DetailsModal ticket={selectedTicket} onClose={() => setShowDetailsModal(false)} />
      )}
    </div>
  );
}
