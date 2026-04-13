"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

const Scene = dynamic(() => import("@/components/Scene"), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

export default function HomeClient() {
    const container = useRef<HTMLDivElement>(null);
    const portfolioTrack = useRef<HTMLDivElement>(null);
    const sections = useRef<(HTMLElement | null)[]>([]);
    const [shouldRenderScene, setShouldRenderScene] = useState(false);
    const mobileInnerScrollClass =
        "overflow-y-auto md:overflow-hidden [touch-action:pan-y] [-webkit-overflow-scrolling:touch]";

    useEffect(() => {
        const nav = navigator as Navigator & {
            deviceMemory?: number;
            connection?: { saveData?: boolean; effectiveType?: string };
        };
        const isMobileViewport = window.matchMedia("(max-width: 768px)").matches;
        const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
        const isMobile = isMobileViewport || isTouchDevice;

        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const lowCpu = (navigator.hardwareConcurrency ?? 8) <= 4;
        const lowMemory = (nav.deviceMemory ?? 8) <= 4;
        const saveData = Boolean(nav.connection?.saveData);
        const slowConnection = ["slow-2g", "2g", "3g"].includes(nav.connection?.effectiveType ?? "");

        const shouldDisable3D = isMobile && (prefersReducedMotion || lowCpu || lowMemory || saveData || slowConnection);
        const frame = window.requestAnimationFrame(() => {
            setShouldRenderScene(!shouldDisable3D);
        });

        return () => window.cancelAnimationFrame(frame);
    }, []);

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
        // We animate the track x position from 0 to -300% (assuming 4 cards)
        if (portfolioTrack.current) {
            tl.fromTo(portfolioTrack.current,
                { x: "20%" },
                { x: "-120%", duration: 0.3, ease: "none" },
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
            {shouldRenderScene ? <Scene /> : <div className="fixed inset-0 z-0 pointer-events-none bg-white" aria-hidden="true" />}

            {/* FIXED VIEWPORT */}
            <main ref={container} className="fixed top-0 left-0 w-full h-[100dvh] z-10 font-sans text-black">

                {/* --- SECTION 1: HERO --- */}
                <section
                    ref={(el) => addToRefs(el, 0)}
                    className={cn(
                        "absolute inset-0 flex flex-col justify-center items-center p-6 pt-24 pb-10 md:p-10 pointer-events-auto",
                        mobileInnerScrollClass
                    )}
                >
                    <div className="text-center z-10 text-black max-w-[95vw] md:max-w-[85vw]">
                        <p className="inline-block text-[0.6rem] md:text-sm tracking-[0.3em] md:tracking-[0.5em] uppercase mb-4 md:mb-6 px-3 py-1.5 md:px-4 md:py-2 bg-white font-inter">
                            Hi, i am Doyle Omachonu · CEO & Founder of Cribnosh and
                        </p>
                        <h1 className="text-[12vw] md:text-[7vw] leading-[0.9] font-bold tracking-tighter uppercase font-oswald mb-6 md:mb-8">
                            <span className="bg-white px-4 md:px-6 py-1.5 md:py-2 box-decoration-clone inline-block">Supporting the Economy of Food creators</span>
                        </h1>
                        <div className="bg-white inline-block px-4 md:px-6 py-3 md:py-4">
                            <p className="text-base md:text-2xl font-inter max-w-5xl mx-auto leading-relaxed">
                                A FoodTech platform supporting the UK’s culinary landscape through data, logistics, and community.
                            </p>
                        </div>

                        {/* HERO BUTTONS */}
                        <div className="flex flex-wrap gap-4 mt-8 md:mt-12 justify-center">
                            <Link 
                                href="/pieces"
                                className="px-8 md:px-10 py-3 md:py-4 bg-black text-white font-oswald uppercase tracking-widest text-sm md:text-base hover:bg-white hover:text-black border border-black transition-all duration-300 pointer-events-auto"
                            >
                                Pieces
                            </Link>
                            <a 
                                href="https://www.linkedin.com/in/doyle-omachonu-9907981a0/"
                                target="_blank"
                                rel="noreferrer"
                                className="px-8 md:px-10 py-3 md:py-4 bg-white text-black font-oswald uppercase tracking-widest text-sm md:text-base hover:bg-black hover:text-white border border-black transition-all duration-300 pointer-events-auto"
                            >
                                Connect on LinkedIn
                            </a>
                        </div>
                    </div>
                    {/* Overlay gradient for depth */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5 pointer-events-none" />
                </section>

                {/* --- SECTION 2: STATEMENT --- */}
                <section
                    ref={(el) => addToRefs(el, 1)}
                    className={cn(
                        "absolute inset-0 flex flex-col justify-center items-start p-6 pt-24 pb-10 md:p-32 opacity-0",
                        mobileInnerScrollClass
                    )}
                >
                    <div className="max-w-[95vw] md:max-w-[85vw] w-full text-black mt-20 md:mt-0">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
                            {/* PORTRAIT PLACEHOLDER */}
                            <div className="lg:col-span-4 aspect-[4/5] bg-white border border-black/5 relative overflow-hidden group shadow-xl md:shadow-2xl">
                                <Image 
                                    src="/doyle-omachonu.png"
                                    alt="Portrait of Doyle Omachonu"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    priority
                                />
                            </div>

                            <div className="lg:col-span-8">
                                <h2 className="text-4xl md:text-[5vw] font-medium leading-[1.1] mb-8 md:mb-12 tracking-tight font-oswald uppercase">
                                    <span className="bg-white px-4 md:px-6 py-1.5 md:py-2 box-decoration-clone inline-block">Leadership Thesis</span>
                                </h2>
                                <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start">
                                    <div className="bg-white px-4 md:px-6 py-3 md:py-4 flex-1">
                                        <p className="text-sm md:text-xl leading-relaxed font-inter">
                                            The future of food is not just faster delivery. It is fairer systems, stronger local economies, and better operating discipline from sourcing to last-mile experience.
                                        </p>
                                    </div>
                                    <div className="bg-white px-4 md:px-6 py-3 md:py-4 flex-1">
                                        <p className="text-sm md:text-xl leading-relaxed font-inter">
                                            My work focuses on turning that thesis into execution: building trusted networks, measurable outcomes, and teams that can scale impact without losing integrity.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- SECTION 3: INNOVATION ECOSYSTEM (Horizontal) --- */}
                <section
                    ref={(el) => addToRefs(el, 2)}
                    className={cn(
                        "absolute inset-0 flex items-center overflow-x-hidden opacity-0 p-6 pt-24 pb-10 md:p-0",
                        mobileInnerScrollClass
                    )}
                >
                    <div ref={portfolioTrack} className="flex gap-6 md:gap-20 px-6 md:px-20 w-[500vw] md:w-[400vw]">

                        {/* Card 1: Analytical Approach */}
                        <div className="w-[85vw] md:w-[60vw] h-[60vh] md:h-[70vh] bg-black/90 text-white p-6 md:p-12 flex flex-col justify-between shrink-0 relative overflow-y-auto md:overflow-hidden overscroll-y-contain [-webkit-overflow-scrolling:touch] group border border-white/10 backdrop-blur-md">
                            <div className="text-[10px] md:text-sm tracking-widest uppercase opacity-40 font-inter">Case Study 01</div>
                            <div className="relative z-10">
                                <h3 className="text-3xl md:text-6xl font-oswald uppercase mb-4 md:mb-6 leading-tight">From Plant Floors to<br />Platform Thinking</h3>
                                <p className="font-inter opacity-70 max-w-xl text-sm md:text-xl leading-relaxed">
                                    Before founding Cribnosh, I spent years in operations and manufacturing, improving throughput, reducing defects, and building systems that perform under pressure.
                                </p>
                            </div>
                            <div className="absolute top-6 md:top-10 right-6 md:right-10 text-6xl md:text-8xl font-oswald opacity-5 group-hover:opacity-10 transition-opacity">01</div>
                        </div>

                        {/* Card 2: Building the "Cribnosh Way" */}
                        <div className="w-[85vw] md:w-[60vw] h-[60vh] md:h-[70vh] bg-white/90 text-black p-6 md:p-12 flex flex-col justify-between shrink-0 relative overflow-y-auto md:overflow-hidden overscroll-y-contain [-webkit-overflow-scrolling:touch] group border border-black/10 backdrop-blur-md">
                            <div className="text-[10px] md:text-sm tracking-widest uppercase opacity-40 font-inter">Case Study 02</div>
                            <div className="relative z-10">
                                <h3 className="text-3xl md:text-6xl font-oswald uppercase mb-4 md:mb-6 leading-tight">Turning Complexity<br />Into Clarity</h3>
                                <p className="font-inter opacity-70 max-w-xl text-sm md:text-xl leading-relaxed">
                                    I use strategy, data, and cross-functional leadership to translate messy market realities into clear decisions teams can execute with confidence.
                                </p>
                            </div>
                            <div className="absolute top-6 md:top-10 right-6 md:right-10 text-6xl md:text-8xl font-oswald opacity-5 group-hover:opacity-10 transition-opacity">02</div>
                        </div>

                        {/* Card 3: Strategic Leadership */}
                        <div className="w-[85vw] md:w-[60vw] h-[60vh] md:h-[70vh] bg-black/90 text-white p-6 md:p-12 flex flex-col justify-between shrink-0 relative overflow-y-auto md:overflow-hidden overscroll-y-contain [-webkit-overflow-scrolling:touch] group border border-white/10 backdrop-blur-md">
                            <div className="text-[10px] md:text-sm tracking-widest uppercase opacity-40 font-inter">Case Study 03</div>
                            <div className="relative z-10">
                                <h3 className="text-3xl md:text-6xl font-oswald uppercase mb-4 md:mb-6 leading-tight">Building Trust as<br />Infrastructure</h3>
                                <p className="font-inter opacity-70 max-w-xl text-sm md:text-xl leading-relaxed">
                                    Sustainable growth depends on trust. I focus on ethical supply chains, transparent standards, and governance models that protect both people and performance.
                                </p>
                            </div>
                            <div className="absolute top-6 md:top-10 right-6 md:right-10 text-6xl md:text-8xl font-oswald opacity-5 group-hover:opacity-10 transition-opacity">03</div>
                        </div>

                        {/* Card 4: Scaling & Innovation */}
                        <div className="w-[85vw] md:w-[60vw] h-[60vh] md:h-[70vh] bg-white/90 text-black p-6 md:p-12 flex flex-col justify-between shrink-0 relative overflow-y-auto md:overflow-hidden overscroll-y-contain [-webkit-overflow-scrolling:touch] group border border-black/10 backdrop-blur-md">
                            <div className="text-[10px] md:text-sm tracking-widest uppercase opacity-40 font-inter">Case Study 04</div>
                            <div className="relative z-10">
                                <h3 className="text-3xl md:text-6xl font-oswald uppercase mb-4 md:mb-6 leading-tight">Leading with Inclusion<br />and Performance</h3>
                                <p className="font-inter opacity-70 max-w-xl text-sm md:text-xl leading-relaxed">
                                    I believe inclusive teams and disciplined operations are not trade-offs. They are the foundation for long-term resilience, innovation, and economic value.
                                </p>
                            </div>
                            <div className="absolute top-6 md:top-10 right-6 md:right-10 text-6xl md:text-8xl font-oswald opacity-5 group-hover:opacity-10 transition-opacity">04</div>
                        </div>

                    </div>
                </section>

                {/* --- SECTION 4: FOOTER --- */}
                <section
                    ref={(el) => addToRefs(el, 3)}
                    className={cn(
                        "absolute inset-0 flex flex-col justify-center items-center bg-black/90 text-white pointer-events-auto opacity-0 z-20 backdrop-blur-md p-6 pt-24 pb-10 md:p-0",
                        mobileInnerScrollClass
                    )}
                >
                    <h2 className="text-5xl md:text-8xl font-bold mb-12 tracking-tight font-oswald uppercase text-center">
                        Collaborate<br />with Doyle
                    </h2>
                    
                    <div className="flex flex-col md:flex-row gap-6 items-center">
                        <a
                            href="https://www.linkedin.com/in/doyle-omachonu-9907981a0/"
                            target="_blank"
                            rel="noreferrer"
                            className="px-12 py-6 border border-white rounded-full hover:bg-white hover:text-black transition-all duration-500 text-xl uppercase tracking-widest cursor-pointer font-inter group relative overflow-hidden"
                        >
                            <span className="relative z-10">Speaking & Panels</span>
                        </a>
                        
                        <Link
                             href="/letter"
                             className="px-12 py-6 bg-white text-black rounded-full hover:bg-transparent hover:text-white border border-white transition-all duration-500 text-xl uppercase tracking-widest cursor-pointer font-inter"
                         >
                             Open Letter
                         </Link>
                    </div>

                    <div className="absolute bottom-10 left-10 text-xs text-gray-500 font-inter tracking-widest uppercase">
                        © 2026 Doyle Omachonu
                    </div>
                </section>

            </main>

            {/* Scroll Proxy (Height determines speed/duration) */}
            <div className="w-full h-[800vh] invisible pointer-events-none"></div>
        </SmoothScroll>
    );
}
