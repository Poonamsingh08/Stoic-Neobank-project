import React, { useState, useRef, useEffect } from "react";
import { Phone, Mail, MessageCircle, Loader, CheckCircle, AlertTriangle, Circle, ChevronUp, MinusCircle, X, Send, Paperclip, Image as ImageIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Modal component for the "View Details" message.
const DetailsModal = ({ ticket, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    {/* Overlay to click away */}
    <div className="absolute inset-0 bg-gray-900 opacity-50" onClick={onClose}></div>
    
    {/* Modal Card */}
    <div className="relative w-full max-w-sm rounded-xl shadow-2xl overflow-hidden bg-white p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-800">Ticket Details</h3>
        <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:text-gray-600 transition-colors">
          <X size={20} />
        </button>
      </div>
      <div className="space-y-2">
        <p className="text-sm">
          <span className="font-semibold">Ticket ID:</span> {ticket.id}
        </p>
        <p className="text-sm">
          <span className="font-semibold">Subject:</span> {ticket.subject}
        </p>
        <p className="text-sm">
          <span className="font-semibold">Type:</span> {ticket.type}
        </p>
        <p className="text-sm">
          <span className="font-semibold">Status:</span> {ticket.status}
        </p>
        <p className="text-sm">
          <span className="font-semibold">Priority:</span> {ticket.priority}
        </p>
      </div>
      <div className="mt-6 flex justify-end">
        <button
          onClick={onClose}
          className="py-2 px-4 bg-[#780606] text-white rounded-lg shadow-md hover:bg-red-800 transition-colors duration-200"
        >
          Close
        </button>
      </div>
    </div>
  </div>
);

// LiveChatModal component for the popup chat interface.
const LiveChatModal = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // Scrolls to the bottom of the message list whenever messages change.
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (input.trim() === "" && !selectedImage) return;

    const newMessage = selectedImage
      ? { image: selectedImage, sender: "user" }
      : { text: input, sender: "user" };

    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    setInput("");
    setSelectedImage(null);

    // Simulate a bot response after a short delay
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Thank you! An agent will be with you shortly.", sender: "bot" },
      ]);
    }, 1500);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay to click away */}
      <div className="absolute inset-0 bg-gray-900 opacity-50" onClick={onClose}></div>
      
      {/* Modal Card */}
      <div className="relative w-full max-w-lg rounded-xl shadow-2xl overflow-hidden flex flex-col h-3/4 max-h-[80vh] bg-white">
        {/* Header */}
        <div className="bg-[#900603] text-white p-4 flex justify-between items-center rounded-t-xl">
          <h2 className="text-xl font-bold">Live Chat Neo Bank</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-white/20 transition-colors">
            <X size={20} />
          </button>
        </div>
        
        {/* Message Area */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-100">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[75%] px-4 py-2 rounded-xl text-sm ${
                  msg.sender === "user"
                    ? "bg-[#780606] text-white rounded-br-none"
                    : "bg-gray-300 text-gray-800 rounded-bl-none"
                }`}
              >
                {msg.text && msg.text}
                {msg.image && (
                  <img
                    src={msg.image}
                    alt="Uploaded file"
                    className="max-w-full rounded-md mt-2"
                  />
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Input Form */}
        <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-200">
          <div className="flex items-center space-x-2">
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="p-2 bg-gray-200 text-gray-600 rounded-full hover:bg-gray-300 transition-colors"
              title="Attach image"
            >
              <Paperclip size={20} />
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#780606] transition-all"
              placeholder="Type your message..."
              disabled={!!selectedImage}
            />
            <button
              type="submit"
              className="p-2 bg-[#780606] text-white rounded-full hover:bg-red-800 transition-colors"
              disabled={input.trim() === "" && !selectedImage}
            >
              <Send size={20} />
            </button>
          </div>
          {selectedImage && (
            <div className="flex items-center mt-2 p-2 bg-gray-100 rounded-lg">
              <ImageIcon size={20} className="text-gray-500 mr-2"/>
              <span className="text-xs text-gray-600 truncate">
                Image ready to send.
              </span>
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="ml-auto p-1 rounded-full text-gray-500 hover:text-red-500"
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
  const [formMessage, setFormMessage] = useState({ type: '', text: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.subject || !formData.description || !formData.contactMethod) {
      setFormMessage({ type: 'error', text: "Please fill all required fields." });
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

    setTickets([newTicket, ...tickets]);
    setFormMessage({ type: 'success', text: "Your ticket has been submitted successfully!" });

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

    if (ticket.status === "Pending")
      statusBadge = (
        <>
          <AlertTriangle size={14} className="me-1" /> Pending
        </>
      );
    else if (ticket.status === "Resolved")
      statusBadge = (
        <>
          <CheckCircle size={14} className="me-1" /> Resolved
        </>
      );
    else
      statusBadge = (
        <>
          <Loader size={14} className="me-1" /> In Progress
        </>
      );

    if (ticket.priority === "High")
      priorityBadge = (
        <>
          <ChevronUp size={14} className="me-1" /> High Priority
        </>
      );
    else if (ticket.priority === "Medium")
      priorityBadge = (
        <>
          <Circle size={14} className="me-1" /> Medium Priority
        </>
      );
    else
      priorityBadge = (
        <>
          <MinusCircle size={14} className="me-1" /> Low Priority
        </>
      );

    return { statusBadge, priorityBadge };
  };

  const handleViewDetails = (ticket) => {
    setSelectedTicket(ticket);
    setShowDetailsModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      
       {/* Header */}
      <div
        className="py-4 text-center shadow-sm"
        style={{ backgroundColor: "#960603" }}
      >
        <h1 className="fw-bold fs-2 text-white">Complaint & Feedback</h1>
        <p className="text-light mb-0">
         Fill in the details and we'll get back to you within the stipulated
          business hours
        </p>
      </div>
    

      <div className="container mx-auto py-10 px-4">
        <div className="grid lg:grid-cols-7 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-4">
            <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
              <div className="bg-[#900603] text-white p-6 rounded-t-2xl">
                <h2 className="text-2xl font-bold">Submit Your Concern</h2>
                <p className="text-sm opacity-90 mt-1">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </div>
              <div className="p-6">
                {formMessage.text && (
                  <div
                    className={`p-3 rounded-lg text-sm mb-4 ${
                      formMessage.type === 'success'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {formMessage.text}
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Type */}
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">Type</label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="w-full p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#780606] transition-all bg-gray-50"
                      required
                    >
                      <option value="">Select type</option>
                      <option value="Complaint">Complaint</option>
                      <option value="Feedback">Feedback</option>
                      <option value="Suggestion">Suggestion</option>
                    </select>
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">Category</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#780606] transition-all bg-gray-50"
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

                  {/* Priority */}
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">Priority</label>
                    <select
                      name="priority"
                      value={formData.priority}
                      onChange={handleChange}
                      className="w-full p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#780606] transition-all bg-gray-50"
                      required
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#780606] transition-all bg-gray-50"
                      placeholder="Enter subject"
                      required
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="w-full p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#780606] transition-all bg-gray-50 resize-none"
                      rows="4"
                      placeholder="Describe the issue or feedback"
                      required
                    />
                  </div>

                  {/* Contact Method */}
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">Preferred Contact Method</label>
                    <select
                      name="contactMethod"
                      value={formData.contactMethod}
                      onChange={handleChange}
                      className="w-full p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#780606] transition-all bg-gray-50"
                      required
                    >
                      <option value="">Select preferred contact method</option>
                      <option value="Email">Email</option>
                      <option value="Phone">Phone</option>
                    </select>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3 bg-[#780606] text-white font-bold rounded-lg shadow-md hover:bg-red-800 transition-colors duration-200"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-3">
            {/* Recent Tickets */}
            <div className="bg-white shadow-xl rounded-2xl p-6 mb-8">
              <h3 className="text-lg font-bold mb-3">Your Recent Tickets</h3>
              <p className="text-gray-500 text-sm mb-4">
                Track the status of your submitted concerns
              </p>

              {tickets.map((ticket, idx) => {
                const { statusBadge, priorityBadge } = renderTicketBadge(ticket);
                return (
                  <div key={idx} className="bg-gray-100 rounded-lg p-4 mb-3 border border-gray-200">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-sm font-semibold mb-1">{ticket.subject}</p>
                        <p className="text-gray-500 text-xs">
                          {ticket.id} • {ticket.type} • {ticket.date}
                        </p>
                      </div>
                      <span className="inline-flex items-center text-xs font-medium px-2 py-1 rounded-full bg-red-100 text-red-700">
                        {statusBadge}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="inline-flex items-center text-xs font-medium px-2 py-1 rounded-full bg-yellow-100 text-yellow-700">
                        {priorityBadge}
                      </span>
                      <button
                        className="py-1 px-3 text-xs font-semibold rounded-md border border-red-500 text-red-500 hover:bg-red-50 transition-all duration-200"
                        onClick={() => handleViewDetails(ticket)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                );
              })}

              {/* Existing hardcoded tickets */}
              <div className="bg-gray-100 rounded-lg p-4 mb-3 border border-gray-200">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-sm font-semibold mb-1">Transaction failed but amount debited</p>
                    <p className="text-gray-500 text-xs">TKT001234 • Complaint • 2025-01-08</p>
                  </div>
                  <span className="inline-flex items-center text-xs font-medium px-2 py-1 rounded-full bg-yellow-100 text-yellow-700">
                    <Loader size={14} className="mr-1" /> In Progress
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="inline-flex items-center text-xs font-medium px-2 py-1 rounded-full bg-red-100 text-red-700">
                    <ChevronUp size={14} className="mr-1" /> High Priority
                  </span>
                  <button
                    className="py-1 px-3 text-xs font-semibold rounded-md border border-red-500 text-red-500 hover:bg-red-50 transition-all duration-200"
                    onClick={() => handleViewDetails({ id: "TKT001234", subject: "Transaction failed but amount debited", type: "Complaint", date: "2025-01-08", status: "In Progress", priority: "High" })}
                  >
                    View Details
                  </button>
                </div>
              </div>

              <div className="bg-gray-100 rounded-lg p-4 mb-3 border border-gray-200">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-sm font-semibold mb-1">Suggestion for mobile app improvement</p>
                    <p className="text-gray-500 text-xs">TKT001235 • Feedback • 2025-01-05</p>
                  </div>
                  <span className="inline-flex items-center text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-700">
                    <CheckCircle size={14} className="mr-1" /> Resolved
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="inline-flex items-center text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-700">
                    <MinusCircle size={14} className="mr-1" /> Low Priority
                  </span>
                  <button
                    className="py-1 px-3 text-xs font-semibold rounded-md border border-red-500 text-red-500 hover:bg-red-50 transition-all duration-200"
                    onClick={() => handleViewDetails({ id: "TKT001235", subject: "Suggestion for mobile app improvement", type: "Feedback", date: "2025-01-05", status: "Resolved", priority: "Low" })}
                  >
                    View Details
                  </button>
                </div>
              </div>

              <div className="bg-gray-100 rounded-lg p-4 border border-gray-200">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-sm font-semibold mb-1">Card blocked without notification</p>
                    <p className="text-gray-500 text-xs">TKT001236 • Complaint • 2025-01-03</p>
                  </div>
                  <span className="inline-flex items-center text-xs font-medium px-2 py-1 rounded-full bg-red-100 text-red-700">
                    <AlertTriangle size={14} className="mr-1" /> Pending
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="inline-flex items-center text-xs font-medium px-2 py-1 rounded-full bg-yellow-100 text-yellow-700">
                    <Circle size={14} className="mr-1" /> Medium Priority
                  </span>
                  <button
                    className="py-1 px-3 text-xs font-semibold rounded-md border border-red-500 text-red-500 hover:bg-red-50 transition-all duration-200"
                    onClick={() => handleViewDetails({ id: "TKT001236", subject: "Card blocked without notification", type: "Complaint", date: "2025-01-03", status: "Pending", priority: "Medium" })}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>

            {/* Other Ways to Reach Us */}
            <div className="space-y-4">
              {/* Live Chat */}
              <button
                onClick={() => setIsChatOpen(true)}
                className="w-full flex items-center p-4 bg-white rounded-xl border border-green-200 shadow-sm hover:shadow-lg transition-shadow duration-200"
              >
                <div className="relative mr-4">
                  <MessageCircle className="text-green-500" size={24} />
                  <span className="absolute top-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white bg-green-500"></span>
                </div>
                <div className="flex-grow text-left">
                  <p className="font-semibold mb-0">Live Chat Neo Bank</p>
                  <p className="text-gray-500 text-xs">
                    Available 24x7 • Avg wait 2 mins
                  </p>
                </div>
                <span className="text-xs font-medium px-3 py-1 rounded-full bg-green-100 text-green-700">
                  Online
                </span>
              </button>

              {/* Email Support */}
              <button
               onClick={() => navigate("/Client/email-support")}
                className="w-full flex items-center p-4 bg-white rounded-xl border border-blue-200 shadow-sm hover:shadow-lg transition-shadow duration-200"
              >
                <Mail className="text-blue-500 mr-4" size={24} />
                <div className="flex-grow text-left">
                  <p className="font-semibold mb-0">Email Support</p>
                  <p className="text-gray-500 text-xs">
                    Response within 4-6 hours
                  </p>
                </div>
                <span className="text-xs font-medium px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                  Send Email
                </span>
              </button>


              {/* Phone */}
              <div className="flex items-center p-4 bg-white border border-orange-200 shadow-sm">
                <Phone className="text-orange-500 mr-4" size={24} />
                <div>
                  <p className="font-semibold mb-0">Customer Care</p>
                  <p className="text-gray-500 text-xs">
                    1860-419-5555 • Mon-Sun 8AM-8PM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-3">Frequently Asked Questions</h2>
          <p className="text-gray-500 text-sm mb-6">Get answers to common questions</p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white shadow-md rounded-xl p-6 h-full">
              <h6 className="font-semibold text-lg mb-2">
                How long does it take to resolve a complaint?
              </h6>
              <p className="text-gray-600 text-sm">
                Most complaints are resolved within 7 working days. For
                complex issues, it may take up to 15 business days.
              </p>
            </div>

            <div className="bg-white shadow-md rounded-xl p-6 h-full">
              <h6 className="font-semibold text-lg mb-2">Can I track my complaint status?</h6>
              <p className="text-gray-600 text-sm">
                Yes, you can track your complaint status using your ticket ID
                provided when you submitted your complaint.
              </p>
            </div>

            <div className="bg-white shadow-md rounded-xl p-6 h-full">
              <h6 className="font-semibold text-lg mb-2">
                What information should I include in my complaint?
              </h6>
              <p className="text-gray-600 text-sm">
                Please include relevant details, dates, amounts, and any
                relevant screenshots or documents.
              </p>
            </div>

            <div className="bg-white shadow-md rounded-xl p-6 h-full">
              <h6 className="font-semibold text-lg mb-2">Is there a fee for filing a complaint?</h6>
              <p className="text-gray-600 text-sm">
                No, filing a complaint or providing feedback is completely
                free of charge.
              </p>
            </div>
          </div>
        </div>
      </div>
      {isChatOpen && <LiveChatModal onClose={() => setIsChatOpen(false)} />}
      {showDetailsModal && selectedTicket && (
        <DetailsModal ticket={selectedTicket} onClose={() => setShowDetailsModal(false)} />
      )}
    </div>
  );
}
