import Image from "next/image";
import { getWorkoutById } from "@/lib/api";
import DetailActions from "@/components/DetailActions";

export default async function WorkoutDetailPage({ params }) {
  const { id } = await params;
  const workout = await getWorkoutById(id);

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-10">
      {/* Left: image */}
      <div className="relative w-full h-[500px] rounded-2xl overflow-hidden">
        <Image
          src="/workout-detail.png"
          alt={workout.name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>

      {/* Right: details */}
      <div>
        <h1 className="font-display font-bold text-3xl md:text-4xl mb-3">
          {workout.name}
        </h1>
        <p className="text-muted mb-4">{workout.description}</p>

        <div className="flex gap-2 mb-6">
          {workout.muscleGroups?.map((tag) => (
            <span
              key={tag}
              className="bg-accent text-black text-xs font-bold px-3 py-1 rounded-full uppercase"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="bg-card border border-line rounded-xl overflow-hidden mb-8">
          <SpecRow label="Equipment" value={workout.equipment} />
          <SpecRow label="Difficulty" value={workout.difficulty} />
          <SpecRow label="Sets" value={workout.sets} />
          <SpecRow label="Reps" value={workout.reps} />
          <SpecRow label="Duration" value={`${workout.duration} min`} />
          <SpecRow label="Calories" value={`${workout.caloriesBurned} kcal`} />
          <SpecRow label="Rating" value={workout.rating} last />
        </div>

        <h2 className="font-display font-bold text-xl mb-3">Instructions</h2>
        <ol className="space-y-2 text-muted list-decimal list-inside mb-4">
          {workout.instructions?.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>

        <DetailActions workout={workout} />
      </div>
    </main>
  );
}

function SpecRow({ label, value, last }) {
  return (
    <div
      className={`flex items-center justify-between px-5 py-3 text-sm ${
        !last ? "border-b border-line" : ""
      }`}
    >
      <span className="text-muted uppercase tracking-wide">{label}</span>
      <span className="text-white font-medium">{value}</span>
    </div>
  );
}