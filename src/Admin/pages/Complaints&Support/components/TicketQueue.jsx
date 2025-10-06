import React, { useMemo, useState } from "react";
import "./TicketQueue.css";

export default function TicketQueue({ tickets, search, onView }) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const filteredTickets = useMemo(() => {
    const text = search.toLowerCase();
    return tickets.filter(
      t => t.user.toLowerCase().includes(text) || t.ticketId.toLowerCase().includes(text)
    );
  }, [tickets, search]);

  const pagedTickets = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredTickets.slice(start, start + pageSize);
  }, [filteredTickets, currentPage]);

  const totalPages = Math.ceil(filteredTickets.length / pageSize);

  return (
    <div className="tq-layout">
      <div className="tq-table-container">
        <table className="tq-table">
          <thead>
            <tr>
              <th>Ticket ID</th>
              <th>User</th>
              <th>Subject</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Last Update</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pagedTickets.map(ticket => (
              <tr key={ticket.id}>
                <td>{ticket.ticketId}</td>
                <td>{ticket.user}</td>
                <td>{ticket.subject}</td>
                <td>
                  <span className={`tq-badge ${
                    ticket.priority === "High" ? "danger" :
                    ticket.priority === "Medium" ? "warning" : "success"
                  }`}>
                    {ticket.priority}
                  </span>
                </td>
                <td>{ticket.status}</td>
                <td>{new Date(ticket.lastUpdate).toLocaleDateString()}</td>
                <td>
                  <button className="tq-btn view-btn" onClick={() => onView(ticket.id)}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      


      </div>

          
    </div>
  );
}
