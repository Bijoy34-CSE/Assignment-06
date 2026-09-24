"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, ChevronDown, Clock, Flame, Star, X } from "lucide-react";
import { usePlan } from "@/context/PlanContext";

const sortOptions = [
  { value: "duration", label: "Duration" },
  { value: "caloriesBurned", label: "Calories" },
  { value: "rating", label: "Rating" },
];

function PlanCard({ item, isPlanTab, onRemove, onMarkDone }) {
  return (
    <li
      className={`flex flex-col gap-4 rounded-2xl border border-line bg-card p-4 sm:flex-row sm:items-center ${item.done ? "opacity-70" : ""
        }`}
    >
      <div className="relative h-32 w-full shrink-0 overflow-hidden rounded-xl sm:h-20 sm:w-36">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 640px) 100vw, 144px"
          className="object-cover"
        />
      </div>

      <div className="flex-1">
        <h3 className="text-xl">{item.name}</h3>
        <p className="text-sm font-semibold text-muted">{item.equipment}</p>
        <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted">
          <span className="flex items-center gap-1">
            <Clock size={14} className="text-accent" />
            {item.duration} min
          </span>
          <span className="flex items-center gap-1">
            <Flame size={14} className="text-accent" />
            {item.caloriesBurned} kcal
          </span>
          <span className="flex items-center gap-1">
            <Star size={14} className="text-accent" />
            {item.rating}
          </span>
        </div>
      </div>

     <div className="flex flex-wrap items-center gap-2 sm:shrink-0">
        <Link
          href={`/workout/${item.id}`}
          className="rounded-full border border-line px-4 py-2 text-sm font-medium text-white transition hover:border-accent"
        >
          View Details
        </Link>

        {isPlanTab &&
          (item.done ? (
            <span className="flex items-center gap-1 rounded-full bg-accent/20 px-4 py-2 text-sm font-medium text-accent">
              <Check size={16} /> Done
            </span>
          ) : (
            <button
              onClick={() => onMarkDone(item.id)}
              className="flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-black transition hover:brightness-110"
            >
              <Check size={16} />
              Mark as Done
            </button>
          ))}

        <button
          onClick={() => onRemove(item.id)}
          aria-label={`Remove ${item.name}`}
          className="p-2 text-muted transition hover:text-white"
        >
          <X size={18} />
        </button>
      </div>
    </li>
  );
}

export default function MyPlanPage() {
  const { plan, saved, isLoaded, removeFromPlan, removeFromSaved, markDone } =
    usePlan();
  const [tab, setTab] = useState("plan");
  const [sortBy, setSortBy] = useState("duration");
  if (!isLoaded) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-line border-t-accent" />
        <p className="text-muted">Loading workouts…</p>
      </div>
    );
  }

  const isPlanTab = tab === "plan";
  const totalMinutes = plan.reduce((sum, item) => sum + item.duration, 0);
  const totalCalories = plan.reduce(
    (sum, item) => sum + item.caloriesBurned,
    0
  );

  const currentList = isPlanTab ? plan : saved;
  const sortedList = [...currentList].sort((a, b) => a[sortBy] - b[sortBy]);

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="text-4xl md:text-5xl">My Plan</h1>
      <p className="mt-2 text-muted">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      {/* Stats */}
      <div className="mt-8 grid rounded-2xl border border-line bg-card sm:grid-cols-3">
        <div className="p-6">
          <p className="text-sm text-muted">Exercises</p>
          <p className="font-display text-5xl font-bold text-accent">
            {plan.length}
          </p>
        </div>
        <div className="border-t border-line p-6 sm:border-l sm:border-t-0">
          <p className="text-sm text-muted">Minutes</p>
          <p className="font-display text-5xl font-bold">{totalMinutes}</p>
        </div>
        <div className="border-t border-line p-6 sm:border-l sm:border-t-0">
          <p className="text-sm text-muted">Calories</p>
          <p className="font-display text-5xl font-bold">{totalCalories}</p>
        </div>
      </div>

      {/* Tabs + Sort */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-1 rounded-xl border border-line bg-card p-1">
          <button
            onClick={() => setTab("plan")}
            className={`rounded-lg px-4 py-2 text-sm transition ${isPlanTab ? "bg-line font-semibold text-white" : "text-muted"
              }`}
          >
            Today&apos;s Plan
          </button>
          <button
            onClick={() => setTab("saved")}
            className={`rounded-lg px-4 py-2 text-sm transition ${!isPlanTab ? "bg-line font-semibold text-white" : "text-muted"
              }`}
          >
            Saved
          </button>
        </div>

        <label className="relative flex items-center text-sm text-white">
          <span className="sr-only">Sort by</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="appearance-none rounded-lg border border-line bg-card py-2 pl-4 pr-10 text-white"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                Sort By: {option.label}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-3"
          />
        </label>
      </div>

      {/* List or Empty state */}
      {sortedList.length === 0 ? (
        <div className="mt-6 flex flex-col items-center rounded-2xl border border-dashed border-line px-6 py-20 text-center">
          <h2 className="text-2xl">Nothing here yet</h2>
          <p className="mt-2 text-sm text-muted">
            Browse the library and add a lift to get today moving.
          </p>
          <Link
            href="/"
            className="mt-6 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-black transition hover:brightness-110"
          >
            Go to workouts
          </Link>
        </div>
      ) : (
        <ul className="mt-6 space-y-4">
          {sortedList.map((item) => (
            <PlanCard
              key={item.id}
              item={item}
              isPlanTab={isPlanTab}
              onRemove={isPlanTab ? removeFromPlan : removeFromSaved}
              onMarkDone={markDone}
            />
          ))}
        </ul>
      )}
    </section>
  );
}