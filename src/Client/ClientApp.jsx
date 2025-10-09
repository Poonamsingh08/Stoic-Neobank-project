// React imports
import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

// Components
import Navbar from "./component/Navbar";
import SplashScreen from "./component/SplashScreen";

// Onboarding Context
import { OnboardingProvider, useOnboarding } from "./context/OnboardingContext";

// Onboarding Pages
import WelcomeScreen from "./Onboarding/WelcomeScreen.jsx";
import SignupScreen from "./Onboarding/SignupScreen.jsx";
import AadharScreen from "./Onboarding/AadharScreen.jsx";
import PANScreen from "./Onboarding/PANScreen.jsx";
import AccountTypeScreen from "./Onboarding/AccountTypeScreen.jsx";
import VideoKYCScreen from "./Onboarding/VideoKYCScreen.jsx";
import UpdateKYC33 from "./Onboarding/UpdateKYC33.jsx";
import CustomerIDPage from "./Onboarding/CustomerIDPage.jsx"; // ✅ NEW PAGE


// Dashboard Pages
import DashBoard from "./pages/dashboard/DashBoard.jsx";
import HomePage from "./pages/dashboard/HomePage.jsx";
import AddMoney from "./pages/dashboard/AddMoney.jsx";
import SendMoneyDashboard from "./pages/dashboard/SendMoney.jsx";
import PayBills from "./pages/dashboard/PayBills.jsx";

// MyAccount Pages
import MyAccounts from "./pages/MyAccount/MyAccounts.jsx";
import Welcome from "./pages/MyAccount/Welcome.jsx";
import UpdateKYC from "./pages/MyAccount/UpdateKYC.jsx";
import AccountStatementForm from "./pages/MyAccount/AccountStatement.jsx";
import AccountClosure from "./pages/MyAccount/AccountClosure.jsx";
import Chequebook from "./pages/MyAccount/Chequebook.jsx";

// Loan Pages
import Loan from "./pages/LOAN/Loan.jsx";
import LoanApplicationForm from "./pages/LOAN/LoanApplicationForm.jsx";
import PersonalLoanForm from "./pages/LOAN/PersonalLoanForm.jsx";
import HomeLoanForm from "./pages/LOAN/HomeLoanForm.jsx";
import CarLoanForm from "./pages/LOAN/CarLoanForm.jsx";
import EducationLoanForm from "./pages/LOAN/EducationLoanForm.jsx";
import GoldLoanForm from "./pages/LOAN/GoldLoanForm.jsx";
import BusinessLoanForm from "./pages/LOAN/BusinessLoanForm.jsx";
import ViewLoanStatement from "./pages/LOAN/ViewLoanStatement.jsx";

// Services & Deposits Pages
import Services from "./pages/Services/Services.jsx";
import DepositsPage from "./pages/Deposits/DepositsPage.jsx";
import FixedDepositForm from "./pages/Deposits/FixedDepositForm.jsx";
import RDPage from "./pages/Deposits/RDPage.jsx";
import FdCalculator from "./pages/Deposits/FdCalculator.jsx";
import TaxSaverFD from "./pages/Deposits/TaxSaverFD.jsx";

// Investment Pages
import Investment from "./pages/Investment/Investment.jsx";
import AddGoal from "./pages/Investment/AddGoal.jsx";

// Settings Pages
import Setting from "./pages/SETTINGS/Setting.jsx";
import NotificationsPage from "./pages/SETTINGS/NotificationsPage.jsx";
import GeneralSettings from "./pages/SETTINGS/GeneralSettings.jsx";
import PersonalDetails from "./pages/SETTINGS/PersonalDetails.jsx";

// Money Transfer Pages
import MoneyTransfer from "./pages/Money-Transfer/MoneyTransfer.jsx";
import DomesticTransfer from "./pages/Money-Transfer/DomesticTransfer.jsx";
import SendMoneyTransfer from "./pages/Money-Transfer/SendMoney.jsx";
import Kyc from "./pages/Money-Transfer/Kyc.jsx";
import Bills from "./pages/Money-Transfer/Bills.jsx";
import History from "./pages/Money-Transfer/History.jsx";
import NEFTFormPage from "./pages/Money-Transfer/NEFTFormPage.jsx";
import RtgsForm from "./pages/Money-Transfer/RtgsForm.jsx";
import ImpsForm from "./pages/Money-Transfer/ImpsForm.jsx";
import InternationalTransferPage from "./pages/Money-Transfer/InternationalTransferPage.jsx";

// Cards Pages
import ClientCard from "./pages/cards/ClientCard.jsx";
import ApplyNewCard from "./pages/cards/ApplyNewCard.jsx";

// Complaint & Feedback
import ComplaintFeedback from "./pages/Complaint & Feedback/ComplaintFeedback";
import EmailSupport from "./pages/Complaint & Feedback/EmailSupport";

// Profile
import Profile from "./pages/Profile/Profile.jsx";

// ------------------- Onboarding Flow -------------------
function OnboardingFlow({ onComplete }) {
  const [showSplash, setShowSplash] = useState(true);
  
    if (showSplash) {
      return <SplashScreen onFinish={() => setShowSplash(false)} />;
    }
  const { currentStep } = useOnboarding();

  switch (currentStep) {
    case "welcome":
      return <WelcomeScreen />;
    case "signup":
      return <SignupScreen />;
    case "aadhar":
      return <AadharScreen />;
    case "pan":
      return <PANScreen />;
    case "account-type":
      return <AccountTypeScreen />;

     case "customer-id": // ✅ NEW STEP ADDED HERE
      return <CustomerIDPage />;
    case "kyc":
      return <VideoKYCScreen />;
    case "updateKYC33":
      return <UpdateKYC33 onComplete={onComplete} />; // ✅ correct usage
    default:
      return <WelcomeScreen />;
  }
}

// ------------------- Main App -------------------
function MainApp() {
  

  return (
    <div className="App">
      <Navbar />
      <Routes>
        {/* Profile */}
        <Route path="/profile" element={<Profile />} />

        {/* Dashboard */}
        <Route path="/" element={<DashBoard />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/add-money" element={<AddMoney />} />
        <Route path="/send-money" element={<SendMoneyDashboard />} />
        <Route path="/pay-bills" element={<PayBills />} />

        {/* MyAccount */}
        <Route path="/myAccount" element={<MyAccounts />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/update-kyc" element={<UpdateKYC />} />
        <Route path="/account-statement" element={<AccountStatementForm />} />
        <Route path="/close-account" element={<AccountClosure />} />
        <Route path="/chequebook" element={<Chequebook />} />

        {/* Loan */}
        <Route path="/loan" element={<Loan />} />
        <Route path="/apply-loan" element={<LoanApplicationForm />} />
        <Route path="/personal-loan" element={<PersonalLoanForm />} />
        <Route path="/home-loan" element={<HomeLoanForm />} />
        <Route path="/car-loan" element={<CarLoanForm />} />
        <Route path="/education-loan" element={<EducationLoanForm />} />
        <Route path="/gold-loan" element={<GoldLoanForm />} />
        <Route path="/business-loan" element={<BusinessLoanForm />} />
        <Route path="/view-loan-statement" element={<ViewLoanStatement />} />

        {/* Services */}
        <Route path="/services" element={<Services />} />

        {/* Deposits */}
        <Route path="/deposit" element={<DepositsPage />} />
        <Route path="/fd-calculator" element={<FdCalculator />} />
        <Route path="/fixed-deposit" element={<FixedDepositForm />} />
        <Route path="/recurring-deposit" element={<RDPage />} />
        <Route path="/tax-saver-fd" element={<TaxSaverFD />} />

        {/* Investment */}
        <Route path="/investment" element={<Investment />} />
        <Route path="/add-goal" element={<AddGoal />} />

        {/* Settings */}
        <Route path="/setting" element={<Setting />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/General" element={<GeneralSettings />} />
        <Route path="/personal-details" element={<PersonalDetails />} />

        {/* Money Transfer */}
        <Route path="/money-transfer" element={<MoneyTransfer />} />
        <Route path="/money-transfer/send" element={<SendMoneyTransfer />} />
        <Route path="/kyc" element={<Kyc />} />
        <Route path="/pay-bills-transfer" element={<Bills />} />
        <Route path="/history" element={<History />} />
        <Route path="/neft" element={<NEFTFormPage />} />
        <Route path="/rtgs" element={<RtgsForm />} />
        <Route path="/imps" element={<ImpsForm />} />
        <Route path="/domestic-transfers" element={<DomesticTransfer />} />
        <Route path="/international-transfer" element={<InternationalTransferPage />} />

        {/* Cards */}
        <Route path="/cards" element={<ClientCard />} />
        <Route path="/applynewcard" element={<ApplyNewCard />} />

        {/* Complaint & Feedback */}
        <Route path="/complaintfeedback" element={<ComplaintFeedback />} />
        <Route path="/email-support" element={<EmailSupport />} />
      </Routes>
    </div>
  );
}

// ------------------- ClientApp -------------------
const ClientApp = () => {
  const [onboardingComplete, setOnboardingComplete] = useState(false);

  return (
    <OnboardingProvider>
      {!onboardingComplete ? (
        <OnboardingFlow onComplete={() => setOnboardingComplete(true)} />
      ) : (
        <MainApp />
      )}
    </OnboardingProvider>
  );
};

export default ClientApp;
