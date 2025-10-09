import React, { useState, useEffect, useMemo } from "react";
import "./ComplaintsLayout.css";
import TicketQueue from "./TicketQueue";
import Escalations from "./Escalations";
import TicketDetails from "./TicketDetails";
import { getTickets } from "../services/ticketService";

const PRIMARY_COLOR = "#900603";
const ACCENT_COLOR = "#ff9800";
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

  const summaryData = useMemo(
    () => ({
      total: tickets.length,
      open: tickets.filter((t) => t.status === "Open").length,
      highPriority: tickets.filter((t) => t.priority === "High").length,
      closed: tickets.filter((t) => t.status === "Closed").length,
    }),
    [tickets]
  );

  const filteredTickets = useMemo(() => {
    return tickets.filter(
      (t) =>
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
    if (selectedTicket)
      return (
        <TicketDetails
          ticketId={selectedTicket}
          goBack={() => setSelectedTicket(null)}
          onUpdate={(updated) =>
            setTickets((prev) =>
              prev.map((t) => (t.id === updated.id ? { ...t, ...updated } : t))
            )
          }
        />
      );

    if (activeTab === "queue")
      return (
        <TicketQueue
          tickets={pagedTickets}
          search={search}
          onView={setSelectedTicket}
        />
      );

    if (activeTab === "escalations")
      return (
        <Escalations
          tickets={pagedTickets}
          search={search}
          onView={setSelectedTicket}
        />
      );
  };

  const summaryCards = [
    {
      title: "Total Tickets",
      value: summaryData.total,
      color: PRIMARY_COLOR,
      icon: "bi-people-fill",
    },
    {
      title: "Open Tickets",
      value: summaryData.open,
      color: "#28a745",
      icon: "bi-folder2-open",
    },
    {
      title: "High Priority",
      value: summaryData.highPriority,
      color: ACCENT_COLOR,
      icon: "bi-exclamation-circle-fill",
    },
    {
      title: "Closed Tickets",
      value: summaryData.closed,
      color: "gray",
      icon: "bi-check-circle-fill",
    },
  ];

  return (
    <>
      <header className="clx-header" style={{ backgroundColor: PRIMARY_COLOR }}>
        <h4>Complaints & Supports</h4>
        <div className="clx-tabs">
          <button
            className={`clx-tab-btn ${activeTab === "queue" ? "active" : ""}`}
            onClick={() => {
              setSelectedTicket(null);
              setActiveTab("queue");
              setCurrentPage(1);
            }}
          >
            Ticket Queue
          </button>
          <button
            className={`clx-tab-btn ${activeTab === "escalations" ? "active" : ""}`}
            onClick={() => {
              setSelectedTicket(null);
              setActiveTab("escalations");
              setCurrentPage(1);
            }}
          >
            Escalations
          </button>
        </div>
      </header>

      <div className="clx-layout">
        <main className="clx-container">
          {!selectedTicket && (
            <div className="clx-summary-cards">
              {summaryCards.map((card, idx) => (
                <div
                  key={idx}
                  className="clx-card"
                  style={{ borderLeftColor: card.color }}
                >
                  <div className="clx-card-body">
                    <div>
                      <h6>{card.title}</h6>
                      <h2>{card.value}</h2>
                    </div>
                   <div className="clx-card-icon">
  <i className={`bi ${card.icon}`}></i>
</div>

                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="clx-card clx-table-card">
            {!selectedTicket && (
              <div className="clx-card-header">
                <div className="clx-search-wrapper">
                  <i className="bi bi-search clx-search-icon"></i>
                  <input
                    type="text"
                    placeholder="Search by Ticket ID / Username..."
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="clx-search-input"
                  />
                </div>
              </div>
            )}

            <div className="clx-card-body">{renderTab()}</div>
{/* Pagination */}
{totalPages > 1 && (
  <div className="cl-pagination">
    <button
      disabled={currentPage === 1}
      onClick={() => setCurrentPage(prev => prev - 1)}
    >
      Prev
    </button>

    {Array.from({ length: totalPages }, (_, i) => i + 1)
      .filter((page) => {
        // Always show first, last, current ±2 pages
        return (
          page === 1 ||
          page === totalPages ||
          (page >= currentPage - 2 && page <= currentPage + 2)
        );
      })
      .map((page, idx, arr) => {
        const prevPage = arr[idx - 1];
        if (prevPage && page - prevPage > 1) {
          // Insert ellipsis if gap > 1
          return (
            <React.Fragment key={page}>
              <span className="ellipsis">...</span>
              <button
                className={currentPage === page ? "active" : ""}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            </React.Fragment>
          );
        }
        return (
          <button
            key={page}
            className={currentPage === page ? "active" : ""}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        );
      })}

    <button
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
