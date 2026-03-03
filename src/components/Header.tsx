"use client";

import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <header className="fixed top-0 left-0 w-full z-[100] px-6 md:px-10 py-6 md:py-8 flex justify-between items-center mix-blend-difference text-white">
            <Link href="/" className="text-xl font-bold tracking-tighter font-oswald uppercase leading-tight z-[110]">
                <div>Doyle Omachonu</div>
                <div className="text-[0.6rem] md:text-xs tracking-[0.3em] opacity-80">
                    CEO, Cribnosh
                </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex gap-10 text-sm font-medium tracking-widest uppercase">
                <Link href="/" className="hover:opacity-50 transition-opacity">Home</Link>
                <Link href="/letter" className="hover:opacity-50 transition-opacity">Open Letter</Link>
                <Link href="/experiences" className="hover:opacity-50 transition-opacity">Experiences</Link>
            </nav>

            <Link
                href="https://www.linkedin.com/in/doyle-omachonu-9907981a0/"
                target="_blank"
                rel="noreferrer"
                className="hidden md:block px-6 py-2 border border-white rounded-full text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all"
            >
                Connect on LinkedIn
            </Link>

            {/* Mobile Menu Button */}
            <button 
                onClick={toggleMenu}
                className="md:hidden flex flex-col gap-1.5 z-[110] p-2"
                aria-label="Toggle Menu"
            >
                <span className={cn("w-6 h-0.5 bg-white transition-all duration-300", isMenuOpen && "rotate-45 translate-y-2")} />
                <span className={cn("w-6 h-0.5 bg-white transition-all duration-300", isMenuOpen && "opacity-0")} />
                <span className={cn("w-6 h-0.5 bg-white transition-all duration-300", isMenuOpen && "-rotate-45 -translate-y-2")} />
            </button>

            {/* Mobile Navigation Drawer */}
            <div className={cn(
                "fixed inset-0 bg-black z-[100] flex flex-col justify-center items-center gap-12 transition-all duration-500",
                isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
            )}>
                <nav className="flex flex-col items-center gap-8 text-2xl font-oswald uppercase tracking-widest">
                    <Link href="/" onClick={toggleMenu} className="hover:text-gray-400 transition-colors">Home</Link>
                    <Link href="/letter" onClick={toggleMenu} className="hover:text-gray-400 transition-colors">Open Letter</Link>
                    <Link href="/experiences" onClick={toggleMenu} className="hover:text-gray-400 transition-colors">Experiences</Link>
                </nav>
                <Link
                    href="https://www.linkedin.com/in/doyle-omachonu-9907981a0/"
                    target="_blank"
                    rel="noreferrer"
                    onClick={toggleMenu}
                    className="px-8 py-3 border border-white rounded-full text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all"
                >
                    Connect on LinkedIn
                </Link>
            </div>
        </header>
    );
}
