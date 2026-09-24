import { getWorkouts } from "@/lib/api";
import WorkoutCard from "@/components/WorkoutCard";

export default async function Home() {
  const workouts = await getWorkouts();

  return (
    <section id="library" className="mx-auto max-w-7xl px-6 py-16">
      <h2 className="text-4xl">The Library</h2>
      <p className="text-muted">
        Twelve lifts covering every major muscle group.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {workouts.map((workout) => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </div>
    </section>
  );
}