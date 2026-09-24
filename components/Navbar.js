"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";

const links = [
    { href: "/", label: "Workouts" },
    { href: "/my-plan", label: "My Plan" },
];

export default function Navbar() {
    const pathname = usePathname();
    const { plan, saved } = usePlan();

    return (
        <header className="border-b border-line bg-bg">
            <nav className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-y-3 px-6 py-4">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <Image src="/logo.png" alt="FitLog logo" width={32} height={32} />
                    <span className="font-display text-2xl font-bold uppercase tracking-wide">
                        FitLog
                    </span>
                </Link>

                {/* Nav links*/}
                <ul className="order-3 flex w-full items-center justify-center gap-2 md:order-none md:w-auto">
                    {links.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className={`rounded-full px-4 py-2 text-sm transition ${isActive
                                            ? "bg-accent/10 text-accent"
                                            : "text-white/80 hover:text-white"
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                {/* Plan and Saved badge */}
                <div className="flex items-center gap-5 text-sm">
                    <Link href="/my-plan" className="flex items-center gap-2">
                        <span>Plan</span>
                        <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-accent px-2 text-xs font-bold text-black">
                            {plan.length}
                        </span>
                    </Link>

                    <Link href="/my-plan" className="flex items-center gap-2 text-muted">
                        <span>Saved</span>
                        <span className="flex h-6 min-w-6 items-center justify-center rounded-full border border-line px-2 text-xs text-white">
                            {saved.length}
                        </span>
                    </Link>
                </div>
            </nav>
        </header>
    );
}