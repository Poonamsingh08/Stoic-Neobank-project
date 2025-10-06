import React, { useState } from "react";
import "./TicketChat.css";
import { updateTicket } from "../services/ticketService";

export default function TicketActions({ ticket, close, onUpdate }) {
  const [assigned, setAssigned] = useState(ticket.assigned || "");
  const [note, setNote] = useState("");

  const handleAssign = async () => {
    if (!assigned.trim()) return;
    await updateTicket(ticket.id, "assign", { agent: assigned });
    const updated = { ...ticket, assigned };
    onUpdate(updated);
    close();
  };

  const handleCloseTicket = async () => {
    await updateTicket(ticket.id, "close");
    const updated = { ...ticket, status: "Closed" };
    onUpdate(updated);
    close();
  };

  const handleEscalate = async () => {
    await updateTicket(ticket.id, "escalate");
    const updated = { ...ticket, priority: "High" };
    onUpdate(updated);
    close();
  };

  return (
    <div className="ta-modal-backdrop" onClick={close}>
      <div className="ta-modal" onClick={e => e.stopPropagation()}>
        <div className="ta-header">
          <h4>Manage Ticket</h4>
          <button className="ta-close-btn" onClick={close}>×</button>
        </div>
        <div className="ta-body">
          <div className="ta-group">
            <label>Assign to Agent</label>
            <input
              type="text"
              value={assigned}
              onChange={e => setAssigned(e.target.value)}
              placeholder="Agent Name"
            />
            <button className="ta-btn info" onClick={handleAssign}>Assign</button>
          </div>
          <div className="ta-group">
            <label>Add Internal Note</label>
            <textarea
              rows={3}
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder="Write note..."
            />
          </div>
          <div className="ta-group" style={{ display: 'flex', gap: '10px' }}>
            <button className="ta-btn success" onClick={handleCloseTicket}>Close Ticket</button>
            <button className="ta-btn warning" onClick={handleEscalate}>Escalate</button>
          </div>
        </div>
      </div>
    </div>
  );
}
