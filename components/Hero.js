import Image from "next/image";
import { Dumbbell } from "lucide-react";

export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-6 pt-10">
      <div className="bg-card border border-line rounded-2xl grid md:grid-cols-2 gap-8 items-center p-8 md:p-12">
        <div>
          <p className="text-accent text-sm font-bold tracking-widest mb-3">
            WORKOUT LIBRARY
          </p>
          <h1 className="font-display font-bold text-3xl md:text-4xl leading-tight mb-4">
            TRAIN WITH INTENT. LOG EVERY SET.
          </h1>
          <p className="text-muted mb-6">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>
          
          <a  href="#library"
            className="inline-flex items-center gap-2 bg-accent text-black font-bold px-6 py-3 rounded-md hover:opacity-90 transition-opacity"
          >
             
            BROWSE WORKOUTS
          </a>
        </div>

        <div className="relative w-full h-56 md:h-72">
          <Image
  src="/banner.png"
  alt="FitLog banner"
  fill
  sizes="(max-width: 768px) 100vw, 50vw"
  className="object-contain"
/>
        </div>
      </div>
    </section>
  );
}