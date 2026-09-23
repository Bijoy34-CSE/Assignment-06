"use client";

import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

const PlanContext = createContext(null);

const PLAN_LIMIT = 5;

export function PlanProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);

  const addToPlan = (workout) => {
    if (plan.some((item) => item.id === workout.id)) {
      toast.error("Already in today's plan");
      return;
    }
    if (plan.length >= PLAN_LIMIT) {
      toast.error("Plan is full. Finish a lift first.");
      return;
    }
    setPlan([...plan, { ...workout, done: false }]);
    toast.success("Added to today's plan");
  };

  const addToSaved = (workout) => {
    if (saved.some((item) => item.id === workout.id)) {
      toast.error("Already saved");
      return;
    }
    setSaved([...saved, { ...workout }]);
    toast.success("Saved for later");
  };

  const removeFromPlan = (id) => {
    setPlan(plan.filter((item) => item.id !== id));
    toast.success("Removed from today's plan");
  };

  const removeFromSaved = (id) => {
    setSaved(saved.filter((item) => item.id !== id));
    toast.success("Removed from saved");
  };

  const markDone = (id) => {
    setPlan(
      plan.map((item) =>
        item.id === id ? { ...item, done: true } : item
      )
    );
    toast.success("Marked as done");
  };

  const value = {
    plan,
    saved,
    addToPlan,
    addToSaved,
    removeFromPlan,
    removeFromSaved,
    markDone,
  };

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
}

export function usePlan() {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error("usePlan must be used inside PlanProvider");
  }
  return context;
}