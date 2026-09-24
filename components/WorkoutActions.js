"use client";

import { CalendarPlus, Bookmark } from "lucide-react";
import { usePlan } from "@/context/PlanContext";

const PLAN_LIMIT = 5;

export default function WorkoutActions({ workout }) {
  const { plan, saved, addToPlan, addToSaved } = usePlan();

  const inPlan = plan.some((item) => item.id === workout.id);
  const isSaved = saved.some((item) => item.id === workout.id);
  const isFull = plan.length >= PLAN_LIMIT;

  return (
    <div className="mt-10 flex flex-wrap gap-4">
      <button
        onClick={() => addToPlan(workout)}
        disabled={inPlan || isFull}
        className="flex items-center gap-2 rounded-xl bg-accent px-6 py-3 font-semibold text-black transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <CalendarPlus size={18} />
        {inPlan
          ? "In today's plan"
          : isFull
          ? "Plan is full"
          : "Add to today's plan"}
      </button>

      <button
        onClick={() => addToSaved(workout)}
        disabled={isSaved}
        className="flex items-center gap-2 rounded-xl border border-line px-6 py-3 font-semibold transition hover:border-accent disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Bookmark size={18} />
        {isSaved ? "Saved" : "Save for later"}
      </button>
    </div>
  );
}