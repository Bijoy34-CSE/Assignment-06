import Hero from "@/components/Hero";
import WorkoutCard from "@/components/WorkoutCard";
import { getAllWorkouts } from "@/lib/api";

export default async function Home() {
  const workouts = await getAllWorkouts();

  return (
    <main>
      <Hero />

      <section id="library" className="max-w-7xl mx-auto px-6 pb-16">
        <h2 className="font-display text-3xl mb-1">THE LIBRARY</h2>
        <p className="text-muted mb-8">
          Twelve lifts covering every major muscle group.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {workouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      </section>
    </main>
  );
}