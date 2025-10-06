// src/services/ticketService.js

// Mock tickets data
const ticketsData = [
  { id: 1, ticketId: "TCKT001", user: "John Doe", subject: "Issue with login", priority: "High", status: "Open", lastUpdate: new Date(), messages: [{ sender: "User", text: "Cannot login", time: new Date().toLocaleString() }, { sender: "Agent", text: "Please reset your password", time: new Date().toLocaleString() }] },
  { id: 2, ticketId: "TCKT002", user: "Jane Smith", subject: "Payment not processed", priority: "Medium", status: "Closed", lastUpdate: new Date(), messages: [] },
  { id: 3, ticketId: "TCKT003", user: "Mike Johnson", subject: "App crashes on startup", priority: "High", status: "Open", lastUpdate: new Date(), messages: [] },
  { id: 4, ticketId: "TCKT004", user: "Alice Brown", subject: "Cannot reset password", priority: "Medium", status: "Open", lastUpdate: new Date(), messages: [] },
  { id: 5, ticketId: "TCKT005", user: "David Lee", subject: "Feature request: Dark mode", priority: "Low", status: "Open", lastUpdate: new Date(), messages: [] },
  { id: 6, ticketId: "TCKT006", user: "Sophia Wilson", subject: "Error 500 on checkout", priority: "High", status: "Closed", lastUpdate: new Date(), messages: [] },
  { id: 7, ticketId: "TCKT007", user: "Chris Martin", subject: "Unable to upload documents", priority: "Medium", status: "Open", lastUpdate: new Date(), messages: [] },
  { id: 8, ticketId: "TCKT008", user: "Emma Davis", subject: "Notification not received", priority: "Low", status: "Open", lastUpdate: new Date(), messages: [] },
  { id: 9, ticketId: "TCKT009", user: "Brian Clark", subject: "Incorrect account balance", priority: "High", status: "Open", lastUpdate: new Date(), messages: [] },
  { id: 10, ticketId: "TCKT010", user: "Olivia Miller", subject: "Cannot link bank account", priority: "Medium", status: "Closed", lastUpdate: new Date(), messages: [] },
  { id: 11, ticketId: "TCKT011", user: "Ethan Thomas", subject: "App freezes on login", priority: "High", status: "Open", lastUpdate: new Date(), messages: [] },
  { id: 12, ticketId: "TCKT012", user: "Mia Anderson", subject: "Transaction failed", priority: "Medium", status: "Closed", lastUpdate: new Date(), messages: [] },
  { id: 13, ticketId: "TCKT013", user: "Noah Harris", subject: "Cannot update profile", priority: "Low", status: "Open", lastUpdate: new Date(), messages: [] },
  { id: 14, ticketId: "TCKT014", user: "Ava Martinez", subject: "Login session expired too quickly", priority: "Low", status: "Open", lastUpdate: new Date(), messages: [] },
  { id: 15, ticketId: "TCKT015", user: "Liam Rodriguez", subject: "Refund not received", priority: "High", status: "Open", lastUpdate: new Date(), messages: [] },
  { id: 16, ticketId: "TCKT016", user: "Isabella Garcia", subject: "Unable to download invoice", priority: "Medium", status: "Open", lastUpdate: new Date(), messages: [] },
  { id: 17, ticketId: "TCKT017", user: "Mason Walker", subject: "Password reset email not received", priority: "Medium", status: "Closed", lastUpdate: new Date(), messages: [] },
  { id: 18, ticketId: "TCKT018", user: "Charlotte Young", subject: "App crashes on logout", priority: "High", status: "Open", lastUpdate: new Date(), messages: [] },
  { id: 19, ticketId: "TCKT019", user: "Logan King", subject: "Incorrect notification count", priority: "Low", status: "Open", lastUpdate: new Date(), messages: [] },
  { id: 20, ticketId: "TCKT020", user: "Amelia Scott", subject: "Unable to change email", priority: "Medium", status: "Open", lastUpdate: new Date(), messages: [] }
];

// Simulate API call
export function getTickets() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(ticketsData), 300);
  });
}

export function getTicketDetails(ticketId) {
  return new Promise((resolve) => {
    const ticket = ticketsData.find(t => t.id === ticketId);
    setTimeout(() => resolve(ticket), 200);
  });
}

export function updateTicket(ticketId, action, payload = {}) {
  return new Promise((resolve) => {
    const ticket = ticketsData.find(t => t.id === ticketId);
    if (!ticket) return resolve(null);

    switch(action) {
      case "assign":
        ticket.assigned = payload.agent;
        break;
      case "close":
        ticket.status = "Closed";
        break;
      case "escalate":
        ticket.priority = "High";
        break;
      case "reply":
        ticket.messages.push({ sender: "Agent", text: payload.text, time: new Date().toLocaleString() });
        break;
      default: break;
    }
    setTimeout(() => resolve(ticket), 200);
  });
}
