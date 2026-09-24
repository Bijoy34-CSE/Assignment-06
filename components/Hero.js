import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-6 pt-10">
      <div className="flex flex-col items-center justify-between gap-8 rounded-3xl border border-line bg-card px-8 py-12 md:flex-row md:px-14 md:py-16">
        <div className="max-w-xl text-center md:text-left">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">
            Workout Library
          </p>

          <h1 className="mt-4 text-4xl leading-tight md:text-6xl">
            Train with intent. Log every set.
          </h1>

          <p className="mt-5 text-muted">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <Link
            href="#library"
            className="mt-8 inline-block rounded-md bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-black transition hover:brightness-110"
          >
            Browse Workouts
          </Link>
        </div>

        <Image
          src="/banner.png"
          alt="Gym equipment illustration"
          width={334}
          height={334}
          priority
          className="h-auto w-56 md:w-72"
        />
      </div>
    </section>
  );
}