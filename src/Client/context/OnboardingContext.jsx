import React, { createContext, useContext, useState } from 'react';

const OnboardingContext = createContext();

export function OnboardingProvider({ children }) {
  const [currentStep, setCurrentStep] = useState('welcome');
  const [userData, setUserData] = useState({});

  const updateUserData = (data) => {
    setUserData((prev) => ({ ...prev, ...data }));
  };

  const resetOnboarding = () => {
    setCurrentStep('welcome');
    setUserData({});
  };

  return (
    <OnboardingContext.Provider
      value={{
        currentStep,
        userData,
        setCurrentStep,
        updateUserData,
        resetOnboarding,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within OnboardingProvider');
  }
  return context;
}
