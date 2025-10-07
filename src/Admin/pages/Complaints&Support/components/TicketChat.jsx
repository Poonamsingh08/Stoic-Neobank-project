import React, { useState } from "react";
import "./TicketChat.css";

export default function TicketChat({ ticket, onSendMessage }) {
  const [msg, setMsg] = useState("");

  const send = () => {
    if (!msg.trim()) return;
    onSendMessage(msg);
    setMsg("");
  };

  return (
    <div className="tc-chat">
      <div className="tc-messages">
        {(ticket.messages || []).map((m, i) => (
          <div key={i} className={`tc-message ${m.sender === "User" ? "user" : "agent"}`}>
            <p>{m.text}</p>
            <small>{m.sender} | {m.time}</small>
          </div>
        ))}
      </div>
      <div className="tc-reply">
        <input
          type="text"
          placeholder="Type reply..."
          value={msg}
          onChange={e => setMsg(e.target.value)}
          onKeyDown={e => e.key === "Enter" && send()}
        />
        <button onClick={send}>Send</button>
      </div>
    </div>
  );
}
