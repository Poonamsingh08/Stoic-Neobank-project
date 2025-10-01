import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

// Components
import Navbar from "./component/Navbar";
import SplashScreen from "./component/SplashScreen";

// Dashboard
import DashBoard from "./pages/dashboard/DashBoard";
import HomePage from "./pages/dashboard/HomePage";
import AddMoney from "./pages/dashboard/AddMoney";
import SendMoneyDashboard from "./pages/dashboard/SendMoney";
import PayBills from "./pages/dashboard/PayBills";

// MyAccounts Pages
import MyAccounts from "./pages/MyAccount/MyAccounts";
import Welcome from "./pages/MyAccount/welcome";
import UpdateKYC from "./pages/MyAccount/UpdateKYC";
import AccountStatementForm from "./pages/MyAccount/AccountStatement";
import AccountClosure from "./pages/MyAccount/AccountClosure";
import Chequebook from "./pages/MyAccount/Chequebook";

// Loan Pages
import Loan from "./pages/LOAN/Loan";
import LoanApplicationForm from "./pages/LOAN/LoanApplicationForm";
import PersonalLoanForm from "./pages/LOAN/PersonalLoanForm";
import HomeLoanForm from "./pages/LOAN/HomeLoanForm";
import CarLoanForm from "./pages/LOAN/CarLoanForm";
import EducationLoanForm from "./pages/LOAN/EducationLoanForm";
import GoldLoanForm from "./pages/LOAN/GoldLoanForm";
import BusinessLoanForm from "./pages/LOAN/BusinessLoanForm";
import ViewLoanStatement from "./pages/LOAN/ViewLoanStatement";

// Services & Deposits Pages
import Services from "./pages/Services/Services";
import DepositsPage from "./pages/Deposits/DepositsPage";
import FixedDepositForm from "./pages/Deposits/FixedDepositForm";
import RDPage from "./pages/Deposits/RDPage";
import FdCalculator from "./pages/Deposits/FdCalculator";
import TaxSaverFD from "./pages/Deposits/TaxSaverFD";

// Investment Pages
import Investment from "./pages/Investment/Investment";
import AddGoal from "./pages/Investment/AddGoal";

// Settings
import Setting from "./pages/SETTINGS/setting";
import NotificationsPage from "./pages/SETTINGS/NotificationsPage";
import GeneralSettings from "./pages/SETTINGS/GeneralSettings";
import PersonalDetails from "./pages/SETTINGS/PersonalDetails";

// Money-transfer
import MoneyTransfer from "./pages/Money-Transfer/MoneyTransfer";
import DomesticTransfer from "./pages/Money-Transfer/DomesticTransfer";
import SendMoneyTransfer from "./pages/Money-Transfer/SendMoney";
import Kyc from "./pages/Money-Transfer/Kyc";
import Bills from "./pages/Money-Transfer/Bills";
import History from "./pages/Money-Transfer/History";
import NEFTFormPage from "./pages/Money-Transfer/NEFTFormPage";
import RtgsForm from "./pages/Money-Transfer/RtgsForm";
import ImpsForm from "./pages/Money-Transfer/ImpsForm";
import InternationalTransferPage from "./pages/Money-Transfer/InternationalTransferPage";

// Cards
import ClientCard from "./pages/cards/ClientCard";
import ApplyNewCard from "./pages/cards/ApplyNewCard";

// Complaint & Feedback
import ComplaintFeedback from "./pages/Complaint & Feedback/ComplaintFeedback";
import EmailSupport from "./pages/Complaint & Feedback/EmailSupport";

const ClientApp = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) return <SplashScreen />;

  return (
    <div className="App">
      <Navbar />
      <Routes>
        {/* Dashboard */}
        <Route path="/" element={<DashBoard />} />
        <Route path="homepage" element={<HomePage />} />
        <Route path="add-money" element={<AddMoney />} />
        <Route path="send-money" element={<SendMoneyDashboard />} />
        <Route path="pay-bills" element={<PayBills />} />

        {/* My Accounts */}
        <Route path="myAccount" element={<MyAccounts />} />
        <Route path="welcome" element={<Welcome />} />
        <Route path="update-kyc" element={<UpdateKYC />} />
        <Route path="account-statement" element={<AccountStatementForm />} />
        <Route path="close-account" element={<AccountClosure />} />
        <Route path="chequebook" element={<Chequebook />} />

        {/* Loan */}
        <Route path="loan" element={<Loan />} />
        <Route path="apply-loan" element={<LoanApplicationForm />} />
        <Route path="personal-loan" element={<PersonalLoanForm />} />
        <Route path="home-loan" element={<HomeLoanForm />} />
        <Route path="car-loan" element={<CarLoanForm />} />
        <Route path="education-loan" element={<EducationLoanForm />} />
        <Route path="gold-loan" element={<GoldLoanForm />} />
        <Route path="business-loan" element={<BusinessLoanForm />} />
        <Route path="view-loan-statement" element={<ViewLoanStatement />} />

        {/* Services */}
        <Route path="services" element={<Services />} />

        {/* Deposits */}
        <Route path="deposit" element={<DepositsPage />} />
        <Route path="fd-calculator" element={<FdCalculator />} />
        <Route path="fixed-deposit" element={<FixedDepositForm />} />
        <Route path="recurring-deposit" element={<RDPage />} />
        <Route path="tax-saver-fd11" element={<TaxSaverFD />} />

        {/* Investment */}
        <Route path="investment" element={<Investment />} />
        <Route path="add-goal" element={<AddGoal />} />

        {/* Settings */}
        <Route path="setting" element={<Setting />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="GeneralSettings" element={<GeneralSettings />} />
        <Route path="personal-details" element={<PersonalDetails />} />

        {/* Money-transfer */}
        <Route path="money-transfer" element={<MoneyTransfer />} />
        <Route path="money-transfer/send" element={<SendMoneyTransfer />} />
        <Route path="kyc" element={<Kyc />} />
        <Route path="pay-bills-transfer" element={<Bills />} />
        <Route path="history" element={<History />} />
        <Route path="neft" element={<NEFTFormPage />} />
        <Route path="rtgs" element={<RtgsForm />} />
        <Route path="imps" element={<ImpsForm />} />
        <Route path="domestic-transfers" element={<DomesticTransfer />} />
        <Route path="international-transfer" element={<InternationalTransferPage />} />

        {/* Cards */}
        <Route path="cards" element={<ClientCard />} />
        <Route path="applynewcard" element={<ApplyNewCard />} />

        {/* Complaint & Feedback */}
        <Route path="complaintfeedback" element={<ComplaintFeedback />} />
        <Route path="email-support" element={<EmailSupport />} />
       
      </Routes>
    </div>
  );
};

export default ClientApp;
