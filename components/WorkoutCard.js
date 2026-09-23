import Image from "next/image";
import Link from "next/link";
import { Clock, Flame, Star } from "lucide-react";

export default function WorkoutCard({ workout }) {
  return (
    <Link
      href={`/workouts/${workout.id}`}
      className="block bg-card border border-line rounded-xl overflow-hidden hover:border-accent transition-colors"
    >
      <div className="relative w-full aspect-[393/192]">
        <Image
          src="/workout-thumb.png"
          alt={workout.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
      </div>

      <div className="p-4">
        <div className="flex gap-2 mb-3">
          {workout.muscleGroups?.map((tag) => (
            <span
              key={tag}
              className="bg-accent text-black text-xs font-bold px-3 py-1 rounded-full uppercase"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="font-display font-bold text-lg mb-1">{workout.name}</h3>
        <p className="text-muted text-sm mb-3">{workout.equipment}</p>

        <div className="flex items-center gap-4 text-sm text-muted border-t border-line pt-3">
          <span className="flex items-center gap-1">
            <Clock size={14} /> {workout.duration} min
          </span>
          <span className="flex items-center gap-1">
            <Flame size={14} /> {workout.caloriesBurned} kcal
          </span>
          <span className="flex items-center gap-1">
            <Star size={14} /> {workout.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}