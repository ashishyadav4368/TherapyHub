import React, { createContext, useContext, useState } from "react";

const BookingPlanContext = createContext(null);

export const useBookingPlan = () => {
  const ctx = useContext(BookingPlanContext);
  if (!ctx) {
    throw new Error("useBookingPlan must be used within BookingPlanProvider");
  }
  return ctx;
};

export const BookingPlanProvider = ({ children }) => {
  const [plan, setPlan] = useState(null);

  const selectPlan = (planData) => setPlan(planData);
  const clearPlan = () => setPlan(null);

  return (
    <BookingPlanContext.Provider value={{ plan, selectPlan, clearPlan }}>
      {children}
    </BookingPlanContext.Provider>
  );
};
