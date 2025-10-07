import React, { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

// Components
import TopNavbar from "./Components/TopNavbar";
import SplashScreen from "./Components/SplashScreen";
import Dashboard from "./Components/Dashboard";
import AccountsDashboard from "./pages/AccountsDashboard/AccountsDashboard.jsx";
import UserManagement from "./pages/UserManagement/UserManagement";
import ComplaintsLayout from "./pages/Complaints&Support/components/ComplaintsLayout";
import InvestmentPanel from "./pages/Investment_products/components/InvestmentPanel";
import KYCComplianceRoutes from "./pages/KYC_Compliance";
import DepositManagement from "./pages/DepositManagement/AdminDeposits";
import Loans from "./pages/Loan/Loans.jsx";
import MoneyTransferRequest from "./pages/MoneyTransferRequests/MoneyTransferRequests";
import Reports from "./pages/Reports/Reports.jsx";
import AdminTransactions from "./pages/Transaction/AdminApp.jsx";
import Card from "./Components/Card";

// Temp Pages
function KYC() { return <h1>KYC Page</h1>; }
function Support() { return <h1>Support Page</h1>; }
function Settings() { return <h1>Settings Page</h1>; }

// Admin Login
import AdminLogin from "./auth/AdminLogin";

export default function AdminApp() {
  const [showSplash, setShowSplash] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (showSplash) return <SplashScreen onFinish={() => setShowSplash(false)} />;

  return (
    <>
      {isLoggedIn && <TopNavbar />}
      <div style={{ paddingTop: isLoggedIn ? "70px" : "0" }}>
        <Routes>
          {/* Login Route */}
          <Route
            path="/login"
            element={
              isLoggedIn ? (
                <Navigate to="/admin/dashboard" />
              ) : (
                <AdminLogin onLogin={() => setIsLoggedIn(true)} />
              )
            }
          />

          {/* Protected Routes */}
          {isLoggedIn ? (
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/users" element={<UserManagement />} />
              <Route path="/kyc/*" element={<KYCComplianceRoutes />} />
              <Route path="/transactions" element={<AdminTransactions />} />
              <Route path="/loans" element={<Loans />} />
              <Route path="/DepositManagement" element={<DepositManagement />} />
              <Route path="/complaints" element={<ComplaintsLayout />} />
              <Route path="/cards" element={<Card />} />
              <Route path="/support" element={<Support />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/AccountsDashboard" element={<AccountsDashboard />} />
              <Route path="/investment_products" element={<InvestmentPanel />} />
              <Route path="/moneyrequest" element={<MoneyTransferRequest />} />
              <Route path="/reports" element={<Reports />} />
              {/* Default redirect for logged in admin */}
              <Route path="*" element={<Navigate to="/admin/dashboard" />} />
            </>
          ) : (
            // Redirect all unknown routes to login if not logged in
            <Route path="*" element={<Navigate to="/admin/login" />} />
          )}
        </Routes>
      </div>
    </>
  );
}
