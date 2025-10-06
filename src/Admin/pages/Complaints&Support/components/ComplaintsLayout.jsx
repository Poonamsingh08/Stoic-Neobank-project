import React, { useState, useEffect, useMemo } from "react";
import "./ComplaintsLayout.css";
import TicketQueue from "./TicketQueue";
import Escalations from "./Escalations";
import TicketDetails from "./TicketDetails";
import { getTickets } from "../services/ticketService";

const PNB_PRIMARY_COLOR = "#900603";
const PNB_ACCENT_COLOR = "#ff9800";
const PAGE_SIZE = 10;

export default function ComplaintsLayout() {
  const [activeTab, setActiveTab] = useState("queue");
  const [search, setSearch] = useState("");
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getTickets().then(setTickets);
  }, []);

  const summaryData = useMemo(() => ({
    total: tickets.length,
    open: tickets.filter(t => t.status === "Open").length,
    highPriority: tickets.filter(t => t.priority === "High").length,
    closed: tickets.filter(t => t.status === "Closed").length
  }), [tickets]);

  const filteredTickets = useMemo(() => {
    return tickets.filter(t =>
      t.id.toString().includes(search) ||
      t.username?.toLowerCase().includes(search.toLowerCase())
    );
  }, [tickets, search]);

  const pagedTickets = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredTickets.slice(start, start + PAGE_SIZE);
  }, [filteredTickets, currentPage]);

  const totalPages = Math.ceil(filteredTickets.length / PAGE_SIZE);

  const renderTab = () => {
    if (selectedTicket) return (
      <TicketDetails
        ticketId={selectedTicket}
        goBack={() => setSelectedTicket(null)}
        onUpdate={updated => setTickets(prev => prev.map(t => t.id === updated.id ? { ...t, ...updated } : t))}
      />
    );

    if (activeTab === "queue") return (
      <TicketQueue tickets={pagedTickets} search={search} onView={setSelectedTicket} />
    );

    if (activeTab === "escalations") return (
      <Escalations tickets={pagedTickets} search={search} onView={setSelectedTicket} />
    );
  };

  const summaryCards = [
    { title: "Total Tickets", value: summaryData.total, color: PNB_PRIMARY_COLOR, icon: "bi-people-fill" },
    { title: "Open Tickets", value: summaryData.open, color: "#28a745", icon: "bi-folder2-open" },
    { title: "High Priority", value: summaryData.highPriority, color: PNB_ACCENT_COLOR, icon: "bi-exclamation-circle-fill" },
    { title: "Closed Tickets", value: summaryData.closed, color: "gray", icon: "bi-check-circle-fill" }
  ];

  return (
    <>
      <header className="cl-header" style={{ backgroundColor: PNB_PRIMARY_COLOR }}>
        <h4>📩 Complaints & Supports</h4>
        <div className="cl-tabs">
          <button
            className={`cl-tab-btn ${activeTab === "queue" ? "active" : ""}`}
            onClick={() => { setSelectedTicket(null); setActiveTab("queue"); setCurrentPage(1); }}
          >
            Ticket Queue
          </button>
          <button
            className={`cl-tab-btn ${activeTab === "escalations" ? "active" : ""}`}
            onClick={() => { setSelectedTicket(null); setActiveTab("escalations"); setCurrentPage(1); }}
          >
            Escalations
          </button>
        </div>
      </header>

      <div className="cl-layout">
        <main className="cl-container">
          {!selectedTicket && (
            <div className="cl-summary-cards">
              {summaryCards.map((card, idx) => (
                <div key={idx} className="cl-card" style={{ borderLeftColor: card.color }}>
                  <div className="cl-card-body">
                    <div>
                      <h6>{card.title}</h6>
                      <h2>{card.value}</h2>
                    </div>
                    <div className="cl-card-icon" style={{ backgroundColor: card.color }}>
                      <i className={`bi ${card.icon}`}></i>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="cl-card cl-table-card">
            {!selectedTicket && (
              <div className="cl-card-header">
                <div className="cl-search-wrapper">
                  <i className="bi bi-search cl-search-icon"></i>
                  <input
                    type="text"
                    placeholder="Search by Ticket ID / Username..."
                    value={search}
                    onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
                    className="cl-search-input"
                  />
                </div>
              </div>
            )}

            <div className="cl-card-body">{renderTab()}</div>

          {/* Pagination */}
{totalPages > 1 && (
  <div className="cl-pagination">
    <button
      className="cl-prev-btn"
      disabled={currentPage === 1}
      onClick={() => setCurrentPage(prev => prev - 1)}
    >
      Prev
    </button>

    {(() => {
      const pages = [];
      let startPage = Math.max(1, currentPage - 2);
      let endPage = Math.min(totalPages, currentPage + 2);

      if (startPage > 1) {
        pages.push(
          <button key={1} className={`cl-page-btn ${currentPage === 1 ? "active" : ""}`} onClick={() => setCurrentPage(1)}>
            1
          </button>
        );
        if (startPage > 2) pages.push(<span key="start-ellipsis" className="cl-ellipsis">...</span>);
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(
          <button key={i} className={`cl-page-btn ${i === currentPage ? "active" : ""}`} onClick={() => setCurrentPage(i)}>
            {i}
          </button>
        );
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) pages.push(<span key="end-ellipsis" className="cl-ellipsis">...</span>);
        pages.push(
          <button key={totalPages} className={`cl-page-btn ${currentPage === totalPages ? "active" : ""}`} onClick={() => setCurrentPage(totalPages)}>
            {totalPages}
          </button>
        );
      }

      return pages;
    })()}

    <button
      className="cl-next-btn"
      disabled={currentPage === totalPages}
      onClick={() => setCurrentPage(prev => prev + 1)}
    >
      Next
    </button>
  </div>
)}

          </div>
        </main>

      </div>
    </>
  );
}
