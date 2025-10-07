import React, { useEffect, useState } from "react";
import TicketChat from "./TicketChat";
import TicketActions from "./TicketActions";
import { getTicketDetails, updateTicket } from "../services/ticketService";
import "./TicketDetails.css";

export default function TicketDetails({ ticketId, goBack, onUpdate }) {
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showActions, setShowActions] = useState(false);

  useEffect(() => {
    setLoading(true);
    getTicketDetails(ticketId).then((data) => {
      setTicket(data);
      setLoading(false);
    });
  }, [ticketId]);

  const handleTicketUpdate = async (updateType, payload) => {
    // Update backend
    const updatedTicket = await updateTicket(ticketId, updateType, payload);
    setTicket(updatedTicket);
    onUpdate(updatedTicket); // propagate to parent
  };

  if (loading) return <div className="td-loading">Loading...</div>;

  return (
    <div className="td-modal-overlay">
      <div className="td-modal">
        <div className="td-header">
          <button className="td-btn td-back" onClick={goBack}>⬅ Back</button>
          <div className="td-header-info">
            <h4>{ticket.subject}</h4>
            <small>Ticket ID: {ticket.ticketId} | User: {ticket.user}</small>
          </div>
          <button className="td-btn td-actions" onClick={() => setShowActions(true)}>
            Manage Ticket ⚙
          </button>
        </div>

        <TicketChat
          ticket={ticket}
          onSendMessage={(msg) => handleTicketUpdate("reply", { text: msg })}
        />

        {showActions && (
          <TicketActions
            ticket={ticket}
            close={() => setShowActions(false)}
            onUpdate={handleTicketUpdate}
          />
        )}
      </div>
    </div>
  );
}
