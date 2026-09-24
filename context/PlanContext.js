"use client";

import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const PlanContext = createContext(null);

const PLAN_LIMIT = 5;
const PLAN_KEY = "fitlog-plan";
const SAVED_KEY = "fitlog-saved";

export function PlanProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // 1. load plan and saved from localStorage
  useEffect(() => {
    try {
      const storedPlan = localStorage.getItem(PLAN_KEY);
      const storedSaved = localStorage.getItem(SAVED_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (storedPlan) setPlan(JSON.parse(storedPlan));
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (storedSaved) setSaved(JSON.parse(storedSaved));
    } catch (error) {
      console.error("Could not read saved data", error);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem(PLAN_KEY, JSON.stringify(plan));
  }, [plan, isLoaded]);


  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem(SAVED_KEY, JSON.stringify(saved));
  }, [saved, isLoaded]);

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
    setSaved([...saved, workout]);
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
      plan.map((item) => (item.id === id ? { ...item, done: true } : item))
    );
    toast.success("Nice work! Marked as done");
  };

  const value = {
    plan,
    saved,
    isLoaded,
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