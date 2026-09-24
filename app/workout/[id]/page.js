import Image from "next/image";
import { notFound } from "next/navigation";
import { getWorkoutById } from "@/lib/api";
import WorkoutActions from "@/components/WorkoutActions";

export default async function WorkoutDetails({ params }) {
  const { id } = await params;
  const workout = await getWorkoutById(id);

  if (!workout) {
    notFound();
  }

  const {
    name,
    image,
    description,
    muscleGroups,
    equipment,
    difficulty,
    sets,
    reps,
    duration,
    caloriesBurned,
    rating,
    instructions,
  } = workout;

  const specs = [
    { label: "Equipment", value: equipment },
    { label: "Difficulty", value: difficulty },
    { label: "Sets", value: sets },
    { label: "Reps", value: reps },
    { label: "Duration", value: `${duration} min` },
    { label: "Calories", value: `${caloriesBurned} kcal` },
    { label: "Rating", value: rating },
  ];

  return (
    <section className="mx-auto grid max-w-7xl gap-10 px-6 py-12 lg:grid-cols-2">
      {/* Left: image */}
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-line">
        <Image
          src={image}
          alt={name}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>

      {/* Right: info */}
      <div>
        <h1 className="text-4xl md:text-5xl">{name}</h1>
        <p className="mt-3 text-lg text-muted">{description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {muscleGroups.map((group) => (
            <span
              key={group}
              className="rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase text-black"
            >
              {group}
            </span>
          ))}
        </div>

        <dl className="mt-8 overflow-hidden rounded-2xl border border-line bg-card">
          {specs.map((spec) => (
            <div
              key={spec.label}
              className="flex items-center justify-between border-b border-line px-6 py-4 last:border-b-0"
            >
              <dt className="text-sm font-semibold uppercase tracking-wider text-muted">
                {spec.label}
              </dt>
              <dd>{spec.value}</dd>
            </div>
          ))}
        </dl>

        <h2 className="mt-10 text-xl">Instructions</h2>
        <ol className="mt-4 list-inside list-decimal space-y-3 text-muted">
          {instructions.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>

        <WorkoutActions workout={workout} />
      </div>
    </section>
  );
}