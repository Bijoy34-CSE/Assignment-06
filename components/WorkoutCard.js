import Image from "next/image";
import Link from "next/link";
import { Clock, Flame, Star } from "lucide-react";

export default function WorkoutCard({ workout }) {
  const {
    id,
    name,
    image,
    muscleGroups,
    equipment,
    duration,
    caloriesBurned,
    rating,
  } = workout;

  return (
    <Link
      href={`/workout/${id}`}
      className="block overflow-hidden rounded-2xl border border-line bg-card transition hover:-translate-y-1 hover:border-accent"
    >
      <div className="relative h-48 w-full">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
      </div>

      <div className="p-5">
        <div className="flex flex-wrap gap-2">
          {muscleGroups.map((group) => (
            <span
              key={group}
              className="rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase text-black"
            >
              {group}
            </span>
          ))}
        </div>

        <h3 className="mt-3 text-xl">{name}</h3>
        <p className="text-sm text-muted">{equipment}</p>

        <div className="mt-4 flex items-center gap-4 border-t border-line pt-4 text-sm text-muted">
          <span className="flex items-center gap-1">
            <Clock size={14} className="text-accent" />
            {duration} min
          </span>
          <span className="flex items-center gap-1">
            <Flame size={14} className="text-accent" />
            {caloriesBurned} kcal
          </span>
          <span className="flex items-center gap-1">
            <Star size={14} className="text-accent" />
            {rating}
          </span>
        </div>
      </div>
    </Link>
  );
}