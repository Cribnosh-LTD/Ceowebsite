"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Header() {
    return (
        <header className="fixed top-0 left-0 w-full z-50 px-10 py-8 flex justify-between items-center mix-blend-difference text-white">
            <div className="text-xl font-bold tracking-tighter font-oswald uppercase">
                Doyle Omachonu
            </div>

            <nav className="hidden md:flex gap-10 text-sm font-medium tracking-widest uppercase">
                <Link href="#" className="hover:opacity-50 transition-opacity">Home</Link>
                <Link href="#" className="hover:opacity-50 transition-opacity">Portfolio</Link>
                <Link href="#" className="hover:opacity-50 transition-opacity">About</Link>
            </nav>

            <button className="hidden md:block px-6 py-2 border border-white rounded-full text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                Say Hi!
            </button>
        </header>
    );
}
