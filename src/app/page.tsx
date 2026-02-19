"use client";

import dynamic from "next/dynamic";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

const Scene = dynamic(() => import("@/components/Scene"), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

// Simple Text Splitter Component
function SplitText({ children, className }: { children: string; className?: string }) {
    return (
        <span className={cn("inline-block overflow-hidden align-bottom", className)}>
            {children.split("").map((char, i) => (
                <span key={i} className="char inline-block translate-y-full opacity-0">
                    {char === " " ? "\u00A0" : char}
                </span>
            ))}
        </span>
    );
}

export default function Home() {
    const container = useRef<HTMLDivElement>(null);
    const portfolioTrack = useRef<HTMLDivElement>(null);
    const sections = useRef<(HTMLElement | null)[]>([]);

    useGSAP(() => {
        if (!container.current) return;

        // Master Timeline linked to scroll
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: document.body,
                start: "top top",
                end: "bottom bottom",
                scrub: 1, // Smooth scrubbing
            },
            defaults: { ease: "power1.inOut" }
        });

        const sec1 = sections.current[0]; // Hero
        const sec2 = sections.current[1]; // Statement
        const sec3 = sections.current[2]; // Portfolio
        const sec4 = sections.current[3]; // Footer

        // --- SEQUENCE ---

        // 0% - 15%: Hero Exit
        tl.to(sec1, { opacity: 0, scale: 0.95, filter: "blur(10px)", duration: 0.15 }, 0);

        // 15% - 20%: Statement Enter
        tl.fromTo(sec2, { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 0.05 }, 0.15);
        // 20% - 30%: Statement Text Reveal
        tl.to(sec2?.querySelectorAll(".char") || [], { y: 0, opacity: 1, stagger: 0.02, duration: 0.05 }, 0.2);

        // 40% - 45%: Statement Exit
        tl.to(sec2, { opacity: 0, y: -50, filter: "blur(5px)", duration: 0.05 }, 0.4);

        // 45% - 50%: Portfolio Container Enter
        tl.fromTo(sec3, { opacity: 0 }, { opacity: 1, duration: 0.05 }, 0.45);

        // 50% - 80%: Portfolio Horizontal Scroll
        // We animate the track x position from 0 to -200% (assuming 3 cards)
        if (portfolioTrack.current) {
            tl.fromTo(portfolioTrack.current,
                { x: "20%" },
                { x: "-80%", duration: 0.3, ease: "none" },
                0.5
            );
        }

        // 85% - 90%: Portfolio Exit
        tl.to(sec3, { opacity: 0, scale: 0.9, duration: 0.05 }, 0.85);

        // 90% - 100%: Footer Enter
        tl.fromTo(sec4, { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 0.1 }, 0.9);

    }, []);

    const addToRefs = (el: HTMLElement | null, index: number) => {
        sections.current[index] = el;
    };

    return (
        <SmoothScroll>
            <Header />
            <Scene />

            {/* FIXED VIEWPORT */}
            <main ref={container} className="fixed top-0 left-0 w-full h-screen pointer-events-none z-10 font-sans text-black">

                {/* --- SECTION 1: HERO --- */}
                <section ref={(el) => addToRefs(el, 0)} className="absolute inset-0 flex flex-col justify-center items-center p-10">
                    <div className="text-center z-10 mix-blend-difference text-white">
                        <p className="text-xs md:text-sm tracking-[0.5em] uppercase mb-4 opacity-80 font-inter">Digital Experience Design</p>
                        <h1 className="text-[14vw] leading-[0.8] font-bold tracking-tighter uppercase font-oswald text-transparent stroke-text">
                            Doyle Omachonu
                        </h1>
                    </div>
                    {/* Overlay gradient for depth */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 pointer-events-none" />
                </section>

                {/* --- SECTION 2: STATEMENT --- */}
                <section ref={(el) => addToRefs(el, 1)} className="absolute inset-0 flex flex-col justify-center items-start p-8 md:p-32 opacity-0">
                    <div className="max-w-5xl w-full">
                        <h2 className="text-5xl md:text-8xl font-medium leading-[0.9] text-black mb-12 tracking-tight font-oswald uppercase">
                            <SplitText>Thinking isn't linear.</SplitText>
                            <br />
                            <SplitText className="ml-10 md:ml-20">Neither are we.</SplitText>
                        </h2>
                        <p className="text-lg md:text-xl text-gray-800 max-w-lg leading-relaxed font-inter ml-auto mr-20">
                            We build digital experiences that defy convention and embrace the organic nature of human interaction.
                        </p>
                    </div>
                </section>

                {/* --- SECTION 3: PORTFOLIO (Horizontal) --- */}
                <section ref={(el) => addToRefs(el, 2)} className="absolute inset-0 flex items-center overflow-hidden opacity-0">
                    <div ref={portfolioTrack} className="flex gap-20 px-20 w-[300vw]">

                        {/* Card 1 */}
                        <div className="w-[80vw] md:w-[60vw] h-[60vh] bg-black text-white p-10 flex flex-col justify-end shrink-0 relative overflow-hidden group border border-white/10">
                            <div className="absolute top-10 right-10 text-6xl font-oswald opacity-20 group-hover:opacity-100 transition-opacity">01</div>
                            <h3 className="text-4xl md:text-6xl font-oswald uppercase mb-4">Digital Alchemy</h3>
                            <p className="font-inter opacity-60 max-w-md">Transforming ideas into immersive reality seamlessly.</p>
                        </div>

                        {/* Card 2 */}
                        <div className="w-[80vw] md:w-[60vw] h-[60vh] bg-[#f0f0f0] text-black p-10 flex flex-col justify-end shrink-0 relative overflow-hidden group border border-black/10">
                            <div className="absolute top-10 right-10 text-6xl font-oswald opacity-20 group-hover:opacity-100 transition-opacity">02</div>
                            <h3 className="text-4xl md:text-6xl font-oswald uppercase mb-4">Neo-Brutalism</h3>
                            <p className="font-inter opacity-60 max-w-md">Stripped back design for maximum impact.</p>
                        </div>

                        {/* Card 3 */}
                        <div className="w-[80vw] md:w-[60vw] h-[60vh] bg-[#1a1a1a] text-white p-10 flex flex-col justify-end shrink-0 relative overflow-hidden group border border-white/10">
                            <div className="absolute top-10 right-10 text-6xl font-oswald opacity-20 group-hover:opacity-100 transition-opacity">03</div>
                            <h3 className="text-4xl md:text-6xl font-oswald uppercase mb-4">Organic Flow</h3>
                            <p className="font-inter opacity-60 max-w-md">Motion that feels natural and fluid.</p>
                        </div>

                    </div>
                </section>

                {/* --- SECTION 4: FOOTER --- */}
                <section ref={(el) => addToRefs(el, 3)} className="absolute inset-0 flex flex-col justify-center items-center bg-black text-white pointer-events-auto opacity-0 z-20">
                    <h2 className="text-5xl md:text-8xl font-bold mb-12 tracking-tight font-oswald uppercase text-center">
                        Ready to<br />start?
                    </h2>
                    <button className="px-12 py-6 border border-white rounded-full hover:bg-white hover:text-black transition-all duration-500 text-xl uppercase tracking-widest cursor-pointer font-inter group relative overflow-hidden">
                        <span className="relative z-10">Get in touch</span>
                    </button>

                    <div className="absolute bottom-10 left-10 text-xs text-gray-500 font-inter tracking-widest uppercase">
                        © 2026 Doyle Omachonu Implementation
                    </div>
                </section>

            </main>

            {/* Scroll Proxy (Height determines speed/duration) */}
            <div className="w-full h-[800vh] invisible pointer-events-none"></div>
        </SmoothScroll>
    );
}
