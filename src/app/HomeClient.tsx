"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
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

export default function HomeClient() {
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
            <Scene />

            {/* FIXED VIEWPORT */}
            <main ref={container} className="fixed top-0 left-0 w-full h-screen z-10 font-sans text-black">

                {/* --- SECTION 1: HERO --- */}
                <section ref={(el) => addToRefs(el, 0)} className="absolute inset-0 flex flex-col justify-center items-center p-6 md:p-10 pointer-events-none">
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
                        <div className="flex flex-wrap gap-4 mt-8 md:mt-12 pointer-events-auto justify-center">
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
                <section ref={(el) => addToRefs(el, 1)} className="absolute inset-0 flex flex-col justify-center items-start p-6 md:p-32 opacity-0 overflow-y-auto md:overflow-hidden">
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
                                    <span className="bg-white px-4 md:px-6 py-1.5 md:py-2 box-decoration-clone inline-block">The Drive for Representation</span>
                                </h2>
                                <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start">
                                    <div className="bg-white px-4 md:px-6 py-3 md:py-4 flex-1">
                                        <p className="text-sm md:text-xl leading-relaxed font-inter">
                                            Cribnosh was built out of a sense of responsibility. Arriving in the UK, Doyle recognized a mosaic of cultures, migrants, and global cuisines. Yet, there was a lack of representation in mainstream food delivery.
                                        </p>
                                    </div>
                                    <div className="bg-white px-4 md:px-6 py-3 md:py-4 flex-1">
                                        <p className="text-sm md:text-xl leading-relaxed font-inter">
                                            Cribnosh supports the human side of FoodTech—bridging the gap between home-cooked heritage and modern convenience, and giving a digital storefront to independent creators and recipe developers.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- SECTION 3: INNOVATION ECOSYSTEM (Horizontal) --- */}
                <section ref={(el) => addToRefs(el, 2)} className="absolute inset-0 flex items-center overflow-hidden opacity-0">
                    <div ref={portfolioTrack} className="flex gap-6 md:gap-20 px-6 md:px-20 w-[500vw] md:w-[400vw]">

                        {/* Card 1: Analytical Approach */}
                        <div className="w-[85vw] md:w-[60vw] h-[60vh] md:h-[70vh] bg-black/90 text-white p-6 md:p-12 flex flex-col justify-between shrink-0 relative overflow-hidden group border border-white/10 backdrop-blur-md">
                            <div className="text-[10px] md:text-sm tracking-widest uppercase opacity-40 font-inter">Analytical Approach</div>
                            <div className="relative z-10">
                                <h3 className="text-3xl md:text-6xl font-oswald uppercase mb-4 md:mb-6 leading-tight">Engineering a Better<br />Food Ecosystem</h3>
                                <p className="font-inter opacity-70 max-w-xl text-sm md:text-xl leading-relaxed">
                                    Doyle brings a unique, highly analytical approach to the FoodTech space. Before architecting the &quot;Cribnosh Way,&quot; he spent years optimizing complex manufacturing and supply chain operations, driving efficiency and quality control across major production facilities.
                                </p>
                            </div>
                            <div className="absolute top-6 md:top-10 right-6 md:right-10 text-6xl md:text-8xl font-oswald opacity-5 group-hover:opacity-10 transition-opacity">01</div>
                        </div>

                        {/* Card 2: Building the "Cribnosh Way" */}
                        <div className="w-[85vw] md:w-[60vw] h-[60vh] md:h-[70vh] bg-white/90 text-black p-6 md:p-12 flex flex-col justify-between shrink-0 relative overflow-hidden group border border-black/10 backdrop-blur-md">
                            <div className="text-[10px] md:text-sm tracking-widest uppercase opacity-40 font-inter">Innovation Ecosystem</div>
                            <div className="relative z-10">
                                <h3 className="text-3xl md:text-6xl font-oswald uppercase mb-4 md:mb-6 leading-tight">Building the<br />&quot;Cribnosh Way&quot;</h3>
                                <p className="font-inter opacity-70 max-w-xl text-sm md:text-xl leading-relaxed">
                                    Doyle actively cultivates a dynamic partnership ecosystem, collaborating closely with cutting-edge technical innovators like Marvengrey Technologies to ensure the platform is built for seamless, scalable operations.
                                </p>
                            </div>
                            <div className="absolute top-6 md:top-10 right-6 md:right-10 text-6xl md:text-8xl font-oswald opacity-5 group-hover:opacity-10 transition-opacity">02</div>
                        </div>

                        {/* Card 3: Strategic Leadership */}
                        <div className="w-[85vw] md:w-[60vw] h-[60vh] md:h-[70vh] bg-black/90 text-white p-6 md:p-12 flex flex-col justify-between shrink-0 relative overflow-hidden group border border-white/10 backdrop-blur-md">
                            <div className="text-[10px] md:text-sm tracking-widest uppercase opacity-40 font-inter">Strategic Leadership</div>
                            <div className="relative z-10">
                                <h3 className="text-3xl md:text-6xl font-oswald uppercase mb-4 md:mb-6 leading-tight">Data-Driven<br />Insights</h3>
                                <p className="font-inter opacity-70 max-w-xl text-sm md:text-xl leading-relaxed">
                                    Holding an MBA in Strategic Project Management from Edinburgh Napier University, his leadership is defined by data-driven insights and lean methodologies, focusing on the intersection of FoodTech and social impact.
                                </p>
                            </div>
                            <div className="absolute top-6 md:top-10 right-6 md:right-10 text-6xl md:text-8xl font-oswald opacity-5 group-hover:opacity-10 transition-opacity">03</div>
                        </div>

                        {/* Card 4: Scaling & Innovation */}
                        <div className="w-[85vw] md:w-[60vw] h-[60vh] md:h-[70vh] bg-white/90 text-black p-6 md:p-12 flex flex-col justify-between shrink-0 relative overflow-hidden group border border-black/10 backdrop-blur-md">
                            <div className="text-[10px] md:text-sm tracking-widest uppercase opacity-40 font-inter">Scaling & Innovation</div>
                            <div className="relative z-10">
                                <h3 className="text-3xl md:text-6xl font-oswald uppercase mb-4 md:mb-6 leading-tight">Supporting the<br />Gig Economy</h3>
                                <p className="font-inter opacity-70 max-w-xl text-sm md:text-xl leading-relaxed">
                                    Using technology to support the gig economy, Doyle focuses on the standard for homemade food delivery across the UK through partnership ecosystems.
                                </p>
                            </div>
                            <div className="absolute top-6 md:top-10 right-6 md:right-10 text-6xl md:text-8xl font-oswald opacity-5 group-hover:opacity-10 transition-opacity">04</div>
                        </div>

                    </div>
                </section>

                {/* --- SECTION 4: FOOTER --- */}
                <section ref={(el) => addToRefs(el, 3)} className="absolute inset-0 flex flex-col justify-center items-center bg-black/90 text-white pointer-events-auto opacity-0 z-20 backdrop-blur-md">
                    <h2 className="text-5xl md:text-8xl font-bold mb-12 tracking-tight font-oswald uppercase text-center">
                        Connect<br />with Doyle
                    </h2>
                    
                    <div className="flex flex-col md:flex-row gap-6 items-center">
                        <a
                            href="https://www.linkedin.com/in/doyle-omachonu-9907981a0/"
                            target="_blank"
                            rel="noreferrer"
                            className="px-12 py-6 border border-white rounded-full hover:bg-white hover:text-black transition-all duration-500 text-xl uppercase tracking-widest cursor-pointer font-inter group relative overflow-hidden"
                        >
                            <span className="relative z-10">LinkedIn Profile</span>
                        </a>
                        
                        <Link
                             href="/pieces"
                             className="px-12 py-6 bg-white text-black rounded-full hover:bg-transparent hover:text-white border border-white transition-all duration-500 text-xl uppercase tracking-widest cursor-pointer font-inter"
                         >
                             Pieces
                         </Link>
                    </div>

                    <div className="absolute bottom-10 left-10 text-xs text-gray-500 font-inter tracking-widest uppercase">
                        © 2026 Doyle Omachonu · Cribnosh
                    </div>
                </section>

            </main>

            {/* Scroll Proxy (Height determines speed/duration) */}
            <div className="w-full h-[800vh] invisible pointer-events-none"></div>
        </SmoothScroll>
    );
}
