import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center px-6 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-accent">
        Error 404
      </p>
      <h1 className="mt-3 text-5xl md:text-6xl">Lift not found</h1>
      <p className="mt-3 max-w-md text-muted">
        The page you are looking for does not exist or the workout was removed.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-accent px-6 py-3 font-semibold text-black transition hover:brightness-110"
      >
        Back to workouts
      </Link>
    </section>
  );
}