import Image from "next/image";
import { Dumbbell } from "lucide-react";

export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-6 pt-12 pb-16 grid md:grid-cols-2 gap-8 items-center">
      <div>
        <p className="text-accent text-sm font-bold tracking-widest mb-3">
          WORKOUT LIBRARY
        </p>
        <h1 className="font-display text-4xl md:text-5xl leading-tight mb-4">
          TRAIN WITH INTENT. LOG EVERY SET.
        </h1>
        <p className="text-muted mb-6">
          FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
          into today&apos;s plan, and watch the week&apos;s work add up.
        </p>
        
       <a href="#library"
          className="inline-flex items-center gap-2 bg-accent text-black font-bold px-6 py-3 rounded-md hover:opacity-90 transition-opacity"
        >
          <Dumbbell size={18} />
          BROWSE WORKOUTS
        </a>
      </div>

      <div className="relative w-full h-72 md:h-96">
        <Image
          src="/banner.png"
          alt="FitLog banner"
          fill
          className="object-contain"
        />
      </div>
    </section>
  );
}