"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";

export default function Navbar() {
    const pathname = usePathname();
    const { plan, saved } = usePlan();

    const navLinks = [
        { name: "Workouts", href: "/" },
        { name: "My Plan", href: "/my-plan" },
    ];

    return (
        <header className="border-b border-line bg-bg/95 backdrop-blur sticky top-0 z-50">
            <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <Image src="/logo.png" alt="FitLog logo" width={28} height={28} />
                    <span className="font-display text-xl tracking-wide">FITLOG</span>
                </Link>

                {/* Nav links */}
                <div className="hidden md:flex items-center gap-2">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${isActive
                                        ? "bg-accent/15 text-accent"
                                        : "text-muted hover:text-white"
                                    }`}
                            >
                                {link.name}
                            </Link>
                        );
                    })}
                </div>

                {/* Badges */}
                <div className="flex items-center gap-4 text-sm">
                    <Link href="/my-plan" className="flex items-center gap-2">
                        <span className="text-muted">Plan</span>
                        <span className="bg-accent text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                            {plan.length}
                        </span>
                    </Link>
                    <Link href="/my-plan" className="flex items-center gap-2">
                        <span className="text-muted">Saved</span>
                        <span className="border border-line text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                            {saved.length}
                        </span>
                    </Link>
                </div>
            </nav>
        </header>
    );
}