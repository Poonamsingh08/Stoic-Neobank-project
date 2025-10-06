import React, { useState, useEffect, useMemo, useCallback } from "react";
import { faker } from "@faker-js/faker";
import UserProfileModal from "./UserProfileModal";
import "./UserManagement.css"; // custom CSS file

const PNB_PRIMARY_COLOR = "#900603";
const PNB_ACCENT_COLOR = "#ff9800";

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(amount);

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortConfig, setSortConfig] = useState({ key: "name", direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const pageSize = 10;

  useEffect(() => {
    const dummyUsers = Array.from({ length: 50 }).map((_, i) => ({
      id: i + 1,
      name: faker.person.fullName(),
      email: faker.internet.email().toLowerCase(),
      phone: faker.phone.number(),
      fatherName: faker.person.fullName(),
      address: faker.location.streetAddress(),
      aadhaar: faker.string.numeric(12),
      pan: faker.string.alphanumeric(10).toUpperCase(),
      account: `XXXX${faker.finance.accountNumber(8)}`,
      type: faker.helpers.arrayElement(["Savings", "Current", "Salary"]),
      balance: formatCurrency(faker.finance.amount({ min: 5000, max: 200000 })),
      status: faker.helpers.arrayElement(["Active", "Pending KYC", "Suspended"]),
      frozen: faker.datatype.boolean(),
      lastLogin: faker.date.recent({ days: 30 }).toISOString(),
      photo: `https://i.pravatar.cc/150?u=${i + 1}`,
      aadhaarFront: `https://dummyimage.com/600x400/cccccc/000000&text=Aadhaar+Front+${i + 1}`,
      aadhaarBack: `https://dummyimage.com/600x400/cccccc/000000&text=Aadhaar+Back+${i + 1}`,
      panCard: `https://dummyimage.com/600x400/cccccc/000000&text=PAN+Card+${i + 1}`,
      signature: `https://dummyimage.com/600x200/cccccc/000000&text=Signature+${i + 1}`,
      documents: [
        { name: "Bank Statement", url: `https://dummyimage.com/800x600/cccccc/000000&text=Bank+Statement+${i + 1}` },
      ],
    }));
    setUsers(dummyUsers);
  }, []);

  const filteredUsers = useMemo(() => {
    let sortableUsers = [...users].filter((u) => {
      const searchText = search.toLowerCase();
      const matchesSearch =
        u.name.toLowerCase().includes(searchText) ||
        u.email.toLowerCase().includes(searchText) ||
        u.phone.includes(searchText) ||
        u.account.includes(searchText);
      const matchesStatus = statusFilter === "All" || u.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    if (sortConfig.key) {
      sortableUsers.sort((a, b) => {
        let valA = a[sortConfig.key];
        let valB = b[sortConfig.key];
        if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
        if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return sortableUsers;
  }, [users, search, statusFilter, sortConfig]);

  const pagedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredUsers.slice(startIndex, startIndex + pageSize);
  }, [filteredUsers, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredUsers.length / pageSize);

  const handleSort = useCallback((key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  }, []);

  const toggleFreeze = useCallback((userId) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, frozen: !u.frozen } : u))
    );
  }, []);

  const toggleStatus = useCallback((userId, currentStatus) => {
    const newStatus = currentStatus === "Active" ? "Suspended" : "Active";
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, status: newStatus } : u))
    );
  }, []);

  const handleUpdateUser = (updatedUser) => {
    setUsers((prev) => prev.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
  };

  const sortIcon = (key) => {
    if (sortConfig.key !== key) return <i className="bi bi-arrow-down-up text-muted ms-1"></i>;
    return sortConfig.direction === "asc" ? (
      <i className="bi bi-sort-up ms-1"></i>
    ) : (
      <i className="bi bi-sort-down ms-1"></i>
    );
  };

  const toggleSelect = (id) => {
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  const toggleSelectAll = () => {
    if (pagedUsers.length > 0 && pagedUsers.every((u) => selectedIds.has(u.id))) {
      setSelectedIds((prev) => {
        const newSet = new Set(prev);
        pagedUsers.forEach((u) => newSet.delete(u.id));
        return newSet;
      });
    } else {
      setSelectedIds((prev) => {
        const newSet = new Set(prev);
        pagedUsers.forEach((u) => newSet.add(u.id));
        return newSet;
      });
    }
  };

  const bulkFreeze = () => {
    setUsers((prev) => prev.map((u) => (selectedIds.has(u.id) ? { ...u, frozen: true } : u)));
    alert(`Frozen ${selectedIds.size} users!`);
  };

  const bulkExport = () => {
    const exportData = users.filter((u) => selectedIds.has(u.id));
    console.log("Exported:", exportData);
    alert(`Exported ${exportData.length} users (check console)`);
  };

  const summaryData = useMemo(
    () => ({
      total: users.length,
      active: users.filter((u) => u.status === "Active").length,
      frozen: users.filter((u) => u.frozen).length,
      pending: users.filter((u) => u.status === "Pending KYC").length,
    }),
    [users]
  );

  return (
    <>
      <header className="dashboard-header">
        <h1>User Management Dashboard</h1>
      </header>

      <div className="user-management-container">
        {/* Summary Cards */}
        <section className="summary-cards">
          {[
            { title: "Total Users", value: summaryData.total, icon: "bi-people-fill", color: PNB_PRIMARY_COLOR },
            { title: "Active Users", value: summaryData.active, icon: "bi-person-check-fill", color: "#28a745" },
            { title: "Frozen Accounts", value: summaryData.frozen, icon: "bi-snow", color: "#6c757d" },
            { title: "Pending KYC", value: summaryData.pending, icon: "bi-card-checklist", color: PNB_ACCENT_COLOR },
          ].map((card, idx) => (
            <div className="summary-card" key={idx} style={{ borderLeftColor: card.color }}>
              <div className="card-content">
                <div>
                  <h6>{card.title}</h6>
                  <h2>{card.value}</h2>
                </div>
                <div className="card-icon" style={{ backgroundColor: card.color }}>
                  <i className={`bi ${card.icon}`}></i>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Controls */}
        <section className="user-controls">
          <input
            type="text"
            placeholder="Search by name, email, phone, account..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
          />
          <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}>
            <option value="All">All Status</option>
            <option>Active</option>
            <option>Pending KYC</option>
            <option>Suspended</option>
          </select>
          <div className="action-buttons">
            <button onClick={bulkFreeze} disabled={!selectedIds.size}><i className="bi bi-snow"></i> Freeze</button>
            <button onClick={bulkExport} disabled={!selectedIds.size}><i className="bi bi-download"></i> Export</button>
          </div>
        </section>

        {/* User Table */}
        <table className="user-table">
          <thead>
            <tr>
              <th><input type="checkbox" onChange={toggleSelectAll} checked={pagedUsers.length > 0 && pagedUsers.every(u => selectedIds.has(u.id))} /></th>
              <th onClick={() => handleSort("name")}>User {sortIcon("name")}</th>
              <th>Email & Phone</th>
              <th>Account & Type</th>
              <th onClick={() => handleSort("status")}>Status {sortIcon("status")}</th>
              <th onClick={() => handleSort("lastLogin")}>Last Login {sortIcon("lastLogin")}</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pagedUsers.map((user) => (
              <tr key={user.id} className={user.frozen ? "frozen-row" : ""}>
                <td><input type="checkbox" checked={selectedIds.has(user.id)} onChange={() => toggleSelect(user.id)} /></td>
                <td className="user-info">
                  <img src={user.photo} alt={user.name} />
                  <span>{user.name}</span>
                </td>
                <td>
                  <div>{user.email}</div>
                  <div className="text-muted">{user.phone}</div>
                </td>
                <td>
                  <div>{user.account}</div>
                  <div className="text-muted">{user.type}</div>
                </td>
                <td>
                  <span className={`status-badge ${user.status.replace(" ", "-").toLowerCase()}`}>{user.status}</span>
                  {user.frozen && <span className="status-badge frozen">Frozen</span>}
                </td>
                <td>{new Date(user.lastLogin).toLocaleDateString("en-GB")}</td>
                <td className="action-buttons">
                  <button onClick={() => setSelectedUser(user)}><i className="bi bi-eye-fill"></i></button>
                  <button className={user.frozen ? "unfreeze" : "freeze"} onClick={() => toggleFreeze(user.id)}>
                    {user.frozen ? "Unfreeze" : "Freeze"}
                  </button>
                  <button className={user.status === "Active" ? "deactivate" : "activate"} onClick={() => toggleStatus(user.id, user.status)}>
                    {user.status === "Active" ? "Deactivate" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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

        {/* Modal */}
        {selectedUser && <UserProfileModal user={selectedUser} onClose={() => setSelectedUser(null)} onUpdate={handleUpdateUser} />}
      </div>
    </>
  );
}
