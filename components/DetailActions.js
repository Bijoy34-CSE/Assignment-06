"use client";

import { CalendarPlus, Bookmark } from "lucide-react";
import { usePlan } from "@/context/PlanContext";

export default function DetailActions({ workout }) {
  const { addToPlan, addToSaved } = usePlan();

  return (
    <div className="flex flex-wrap gap-4 mt-6">
      <button
        onClick={() => addToPlan(workout)}
        className="inline-flex items-center gap-2 bg-accent text-black font-bold px-6 py-3 rounded-md hover:opacity-90 transition-opacity"
      >
        <CalendarPlus size={18} />
        Add to today&apos;s plan
      </button>

      <button
        onClick={() => addToSaved(workout)}
        className="inline-flex items-center gap-2 border border-line text-white font-bold px-6 py-3 rounded-md hover:border-accent transition-colors"
      >
        <Bookmark size={18} />
        Save for later
      </button>
    </div>
  );
}