"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, Flame, Star, Check, X, ChevronDown } from "lucide-react";
import { usePlan } from "@/context/PlanContext";

const SORT_OPTIONS = [
  { label: "Duration", key: "duration" },
  { label: "Calories", key: "caloriesBurned" },
  { label: "Rating", key: "rating" },
];

export default function MyPlanPage() {
  const { plan, saved, removeFromPlan, removeFromSaved, markDone } = usePlan();

  const [activeTab, setActiveTab] = useState("plan"); // "plan" | "saved"
  const [sortKey, setSortKey] = useState("duration");
  const [sortOpen, setSortOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const currentList = activeTab === "plan" ? plan : saved;

  const sortedList = useMemo(() => {
    return [...currentList].sort((a, b) => b[sortKey] - a[sortKey]);
  }, [currentList, sortKey]);

   const metrics = useMemo(() => {
    return currentList.reduce(
      (acc, item) => ({
        exercises: acc.exercises + 1,
        minutes: acc.minutes + (item.duration || 0),
        calories: acc.calories + (item.caloriesBurned || 0),
      }),
      { exercises: 0, minutes: 0, calories: 0 }
    );
  }, [currentList]);

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="font-display text-4xl mb-1">MY PLAN</h1>
      <p className="text-muted mb-8">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      {/* Metrics summary */}
      <div className="grid grid-cols-3 bg-card border border-line rounded-xl mb-8 overflow-hidden">
        <Metric label="Exercises" value={metrics.exercises} accent />
        <Metric label="Minutes" value={metrics.minutes} />
        <Metric label="Calories" value={metrics.calories} />
      </div>

      {/* Tabs + Sort */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div className="flex bg-card border border-line rounded-full p-1">
          <TabButton
            active={activeTab === "plan"}
            onClick={() => setActiveTab("plan")}
          >
            Today&apos;s Plan
          </TabButton>
          <TabButton
            active={activeTab === "saved"}
            onClick={() => setActiveTab("saved")}
          >
            Saved
          </TabButton>
        </div>

        <div className="relative">
          <button
            onClick={() => setSortOpen(!sortOpen)}
            className="flex items-center gap-2 bg-card border border-line rounded-md px-4 py-2 text-sm"
          >
            Sort By: {SORT_OPTIONS.find((o) => o.key === sortKey)?.label}
            <ChevronDown size={16} />
          </button>
          {sortOpen && (
            <div className="absolute right-0 mt-2 bg-card border border-line rounded-md overflow-hidden z-10 w-40">
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => {
                    setSortKey(opt.key);
                    setSortOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-bg ${
                    sortKey === opt.key ? "text-accent" : "text-white"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* List */}
      {isLoading ? (
        <div className="text-center text-muted py-20">Loading workouts…</div>
      ) : sortedList.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-4">
          {sortedList.map((item) => (
            <PlanCard
              key={item.id}
              item={item}
              isPlanTab={activeTab === "plan"}
              onRemove={() =>
                activeTab === "plan"
                  ? removeFromPlan(item.id)
                  : removeFromSaved(item.id)
              }
              onMarkDone={() => markDone(item.id)}
            />
          ))}
        </div>
      )}
    </main>
  );
}

function Metric({ label, value, accent }) {
  return (
    <div className="px-6 py-5 border-r border-line last:border-r-0">
      <p className="text-muted text-sm mb-1">{label}</p>
      <p
        className={`font-display text-3xl ${
          accent ? "text-accent" : "text-white"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function TabButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
        active ? "bg-line text-white" : "text-muted"
      }`}
    >
      {children}
    </button>
  );
}

function PlanCard({ item, isPlanTab, onRemove, onMarkDone }) {
  return (
    <div className="flex items-center gap-4 bg-card border border-line rounded-xl p-4">
      <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0">
        <Image
          src="/workout-thumb.png"
          alt={item.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-display text-lg">{item.name}</h3>
        <p className="text-muted text-sm mb-1">{item.equipment}</p>
        <div className="flex items-center gap-4 text-sm text-muted">
          <span className="flex items-center gap-1">
            <Clock size={14} /> {item.duration} min
          </span>
          <span className="flex items-center gap-1">
            <Flame size={14} /> {item.caloriesBurned} kcal
          </span>
          <span className="flex items-center gap-1">
            <Star size={14} /> {item.rating}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <Link
          href={`/workouts/${item.id}`}
          className="border border-line text-white text-sm font-medium px-4 py-2 rounded-md hover:border-accent transition-colors"
        >
          View Details
        </Link>

        {isPlanTab &&
          (item.done ? (
            <span className="flex items-center gap-1 bg-accent/20 text-accent text-sm font-medium px-4 py-2 rounded-md">
              <Check size={16} /> Done
            </span>
          ) : (
            <button
              onClick={onMarkDone}
              className="flex items-center gap-1 bg-accent text-black text-sm font-medium px-4 py-2 rounded-md hover:opacity-90"
            >
              <Check size={16} /> Mark as Done
            </button>
          ))}

        <button
          onClick={onRemove}
          className="text-muted hover:text-white p-2"
          aria-label="Remove"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center border border-line rounded-xl py-20">
      <h3 className="font-display text-2xl mb-2">NOTHING HERE YET</h3>
      <p className="text-muted mb-6">
        Browse the library and add a lift to get today moving.
      </p>
      <Link
        href="/"
        className="inline-block bg-accent text-black font-bold px-6 py-3 rounded-md hover:opacity-90 transition-opacity"
      >
        Go to workouts
      </Link>
    </div>
  );
}