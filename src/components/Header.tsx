"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    useEffect(() => {
        if (!isMenuOpen) return;

        const { body, documentElement } = document;
        const scrollY = window.scrollY;
        const previousHtmlOverflow = documentElement.style.overflow;
        const previousBodyOverflow = body.style.overflow;
        const previousBodyPosition = body.style.position;
        const previousBodyTop = body.style.top;
        const previousBodyWidth = body.style.width;

        documentElement.style.overflow = "hidden";
        body.style.overflow = "hidden";
        body.style.position = "fixed";
        body.style.top = `-${scrollY}px`;
        body.style.width = "100%";

        return () => {
            documentElement.style.overflow = previousHtmlOverflow;
            body.style.overflow = previousBodyOverflow;
            body.style.position = previousBodyPosition;
            body.style.top = previousBodyTop;
            body.style.width = previousBodyWidth;
            window.scrollTo(0, scrollY);
        };
    }, [isMenuOpen]);

    return (
        <header className={cn(
            "fixed top-0 left-0 w-full z-[9999] px-6 md:px-10 py-6 md:py-8 flex justify-between items-center transition-colors duration-300",
            !isMenuOpen && "mix-blend-difference text-white",
            isMenuOpen && "bg-white text-black"
        )}>
            <Link href="/" className="text-xl font-bold tracking-tighter font-oswald uppercase leading-tight z-[10001]">
                <div>Doyle Omachonu</div>
                <div className="text-[0.6rem] md:text-xs tracking-[0.3em] opacity-80">
                    CEO, Cribnosh
                </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex gap-10 text-sm font-medium tracking-widest uppercase">
                <Link href="/" className="hover:opacity-50 transition-opacity">Home</Link>
                <Link href="/pieces" className="hover:opacity-50 transition-opacity">Pieces</Link>
                <Link href="/letter" className="hover:opacity-50 transition-opacity">Open Letter</Link>
                <Link href="/experiences" className="hover:opacity-50 transition-opacity">Experiences</Link>
            </nav>

            <Link
                href="https://www.linkedin.com/in/doyle-omachonu-9907981a0/"
                target="_blank"
                rel="noreferrer"
                className={cn(
                    "hidden md:block px-6 py-2 border rounded-full text-xs uppercase tracking-widest transition-all",
                    isMenuOpen ? "border-black text-black hover:bg-black hover:text-white" : "border-white text-white hover:bg-white hover:text-black"
                )}
            >
                Connect on LinkedIn
            </Link>

            {/* Mobile Menu Button */}
            <button 
                onClick={toggleMenu}
                className="md:hidden flex flex-col gap-1.5 z-[10001] p-2"
                aria-controls="mobile-site-menu"
                aria-expanded={isMenuOpen}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
                <span className={cn("w-6 h-0.5 transition-all duration-300", isMenuOpen ? "bg-black rotate-45 translate-y-2" : "bg-white")} />
                <span className={cn("w-6 h-0.5 transition-all duration-300", isMenuOpen ? "opacity-0" : "bg-white")} />
                <span className={cn("w-6 h-0.5 transition-all duration-300", isMenuOpen ? "bg-black -rotate-45 -translate-y-2" : "bg-white")} />
            </button>

            {/* Mobile Navigation Drawer */}
            <div className={cn(
                "fixed inset-0 bg-white z-[10000] flex flex-col justify-center items-center gap-12 transition-all duration-500",
                isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
            )}
                id="mobile-site-menu"
                aria-hidden={!isMenuOpen}
            >
                <nav className="flex flex-col items-center gap-8 text-2xl font-oswald uppercase tracking-widest text-black">
                    <Link href="/" onClick={toggleMenu} className="hover:text-gray-400 transition-colors">Home</Link>
                    <Link href="/pieces" onClick={toggleMenu} className="hover:text-gray-400 transition-colors">Pieces</Link>
                    <Link href="/letter" onClick={toggleMenu} className="hover:text-gray-400 transition-colors">Open Letter</Link>
                    <Link href="/experiences" onClick={toggleMenu} className="hover:text-gray-400 transition-colors">Experiences</Link>
                </nav>
                <Link
                    href="https://www.linkedin.com/in/doyle-omachonu-9907981a0/"
                    target="_blank"
                    rel="noreferrer"
                    onClick={toggleMenu}
                    className="px-8 py-3 border border-black rounded-full text-xs uppercase tracking-widest text-black hover:bg-black hover:text-white transition-all"
                >
                    Connect on LinkedIn
                </Link>
            </div>
        </header>
    );
}
