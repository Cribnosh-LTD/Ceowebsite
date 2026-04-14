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

const caseStudies = [
    {
        caseNumber: "01",
        title: "From Plant Floors to\nPlatform Thinking",
        description:
            "Before founding Cribnosh, I spent years in operations and manufacturing, improving throughput, reducing defects, and building systems that perform under pressure.",
        theme: "dark",
    },
    {
        caseNumber: "02",
        title: "Turning Complexity\nInto Clarity",
        description:
            "I use strategy, data, and cross-functional leadership to translate messy market realities into clear decisions teams can execute with confidence.",
        theme: "light",
    },
    {
        caseNumber: "03",
        title: "Building Trust as\nInfrastructure",
        description:
            "Sustainable growth depends on trust. I focus on ethical supply chains, transparent standards, and governance models that protect both people and performance.",
        theme: "dark",
    },
    {
        caseNumber: "04",
        title: "Leading with Inclusion\nand Performance",
        description:
            "I believe inclusive teams and disciplined operations are not trade-offs. They are the foundation for long-term resilience, innovation, and economic value.",
        theme: "light",
    },
] as const;

type CaseStudy = (typeof caseStudies)[number];

function CaseStudyCard({ study }: { study: CaseStudy }) {
    const isDark = study.theme === "dark";

    return (
        <article
            className={cn(
                "group relative flex w-full shrink-0 flex-col justify-between overflow-hidden border p-6 md:h-[70vh] md:w-[60vw] md:p-12",
                "min-h-[22rem]",
                isDark ? "border-white/10 bg-black/90 text-white" : "border-black/10 bg-white/90 text-black"
            )}
        >
            <p className="text-[10px] font-inter uppercase tracking-widest opacity-40 md:text-sm">Case Study {study.caseNumber}</p>
            <div className="relative z-10 mt-8">
                <h3 className="mb-4 whitespace-pre-line font-oswald text-3xl uppercase leading-tight md:mb-6 md:text-6xl">
                    {study.title}
                </h3>
                <p className={cn("max-w-xl font-inter text-sm leading-relaxed md:text-xl", isDark ? "opacity-75" : "opacity-70")}>{study.description}</p>
            </div>
            <div className="pointer-events-none absolute right-6 top-6 font-oswald text-6xl opacity-5 transition-opacity group-hover:opacity-10 md:right-10 md:top-10 md:text-8xl">
                {study.caseNumber}
            </div>
        </article>
    );
}

export default function HomeClient() {
    const container = useRef<HTMLDivElement>(null);
    const portfolioTrack = useRef<HTMLDivElement>(null);
    const sections = useRef<(HTMLElement | null)[]>([]);
    const [shouldRenderScene, setShouldRenderScene] = useState(false);
    const [isMobileLayout, setIsMobileLayout] = useState<boolean | null>(null);

    useEffect(() => {
        const mobileBreakpoint = window.matchMedia("(max-width: 767px)");
        const updateLayout = () => setIsMobileLayout(mobileBreakpoint.matches);

        updateLayout();
        mobileBreakpoint.addEventListener("change", updateLayout);

        return () => mobileBreakpoint.removeEventListener("change", updateLayout);
    }, []);

    useEffect(() => {
        if (isMobileLayout === null) return;

        const nav = navigator as Navigator & {
            deviceMemory?: number;
            connection?: { saveData?: boolean; effectiveType?: string };
        };

        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const lowCpu = (navigator.hardwareConcurrency ?? 8) <= 4;
        const lowMemory = (nav.deviceMemory ?? 8) <= 4;
        const saveData = Boolean(nav.connection?.saveData);
        const slowConnection = ["slow-2g", "2g", "3g"].includes(nav.connection?.effectiveType ?? "");

        const shouldDisable3D = isMobileLayout || prefersReducedMotion || lowCpu || lowMemory || saveData || slowConnection;
        const frame = window.requestAnimationFrame(() => {
            setShouldRenderScene(!shouldDisable3D);
        });

        return () => window.cancelAnimationFrame(frame);
    }, [isMobileLayout]);

    useGSAP(
        () => {
            if (!container.current || isMobileLayout !== false) return;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: document.body,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1,
                },
                defaults: { ease: "power1.inOut" },
            });

            const sec1 = sections.current[0];
            const sec2 = sections.current[1];
            const sec3 = sections.current[2];
            const sec4 = sections.current[3];

            tl.to(sec1, { opacity: 0, scale: 0.95, filter: "blur(10px)", duration: 0.15 }, 0);
            tl.fromTo(sec2, { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 0.05 }, 0.15);
            tl.to(sec2?.querySelectorAll(".char") || [], { y: 0, opacity: 1, stagger: 0.02, duration: 0.05 }, 0.2);
            tl.to(sec2, { opacity: 0, y: -50, filter: "blur(5px)", duration: 0.05 }, 0.4);
            tl.fromTo(sec3, { opacity: 0 }, { opacity: 1, duration: 0.05 }, 0.45);

            if (portfolioTrack.current) {
                tl.fromTo(portfolioTrack.current, { x: "20%" }, { x: "-120%", duration: 0.3, ease: "none" }, 0.5);
            }

            tl.to(sec3, { opacity: 0, scale: 0.9, duration: 0.05 }, 0.85);
            tl.fromTo(sec4, { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 0.1 }, 0.9);

            return () => {
                tl.scrollTrigger?.kill();
                tl.kill();
            };
        },
        { dependencies: [isMobileLayout] }
    );

    const addToRefs = (el: HTMLElement | null, index: number) => {
        sections.current[index] = el;
    };

    return (
        <SmoothScroll>
            <Header />
            {shouldRenderScene ? <Scene /> : <div className="fixed inset-0 z-0 bg-white" aria-hidden="true" />}

            <main ref={container} className="relative z-10 font-sans text-black md:fixed md:left-0 md:top-0 md:h-[100dvh] md:w-full">
                <section
                    ref={(el) => addToRefs(el, 0)}
                    className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 pb-14 pt-28 md:absolute md:inset-0 md:p-10"
                >
                    <div className="z-10 text-center text-black md:max-w-[85vw]">
                        <p className="mb-4 inline-block bg-white px-3 py-1.5 font-inter text-[0.6rem] uppercase tracking-[0.3em] md:mb-6 md:px-4 md:py-2 md:text-sm md:tracking-[0.5em]">
                            Hi, I am Doyle Omachonu · CEO & Founder of Cribnosh
                        </p>
                        <h1 className="mb-6 font-oswald text-[15vw] font-bold uppercase leading-[0.9] tracking-tight md:mb-8 md:text-[7vw] md:tracking-tighter">
                            <span className="inline-block bg-white px-4 py-1.5 box-decoration-clone md:px-6 md:py-2">Supporting the Economy of Food Creators</span>
                        </h1>
                        <div className="inline-block bg-white px-4 py-3 md:px-6 md:py-4">
                            <p className="mx-auto max-w-5xl font-inter text-base leading-relaxed md:text-2xl">
                                A FoodTech platform supporting the UK&apos;s culinary landscape through data, logistics, and community.
                            </p>
                        </div>

                        <div className="mx-auto mt-8 flex w-full max-w-xl flex-col gap-3 sm:flex-row sm:justify-center md:mt-12 md:max-w-none md:flex-wrap md:gap-4">
                            <Link
                                href="/pieces"
                                className="w-full border border-black bg-black px-8 py-3 text-center font-oswald text-sm uppercase tracking-widest text-white transition-all duration-300 hover:bg-white hover:text-black md:w-auto md:px-10 md:py-4 md:text-base"
                            >
                                Pieces
                            </Link>
                            <a
                                href="https://www.linkedin.com/in/doyle-omachonu-9907981a0/"
                                target="_blank"
                                rel="noreferrer"
                                className="w-full border border-black bg-white px-8 py-3 text-center font-oswald text-sm uppercase tracking-widest text-black transition-all duration-300 hover:bg-black hover:text-white md:w-auto md:px-10 md:py-4 md:text-base"
                            >
                                Connect on LinkedIn
                            </a>
                        </div>
                    </div>
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-black/5" />
                </section>

                <section
                    ref={(el) => addToRefs(el, 1)}
                    className="relative flex min-h-[100svh] flex-col justify-center px-6 py-16 md:absolute md:inset-0 md:p-32 md:opacity-0"
                >
                    <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-8 md:gap-12 lg:grid-cols-12">
                        <div className="relative aspect-[4/5] overflow-hidden border border-black/5 bg-white shadow-xl lg:col-span-4 md:shadow-2xl">
                            <Image
                                src="/doyle-omachonu.png"
                                alt="Portrait of Doyle Omachonu"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>

                        <div className="lg:col-span-8">
                            <h2 className="mb-6 font-oswald text-4xl font-medium uppercase leading-[1.1] tracking-tight md:mb-12 md:text-[5vw]">
                                <span className="inline-block bg-white px-4 py-1.5 box-decoration-clone md:px-6 md:py-2">Leadership Thesis</span>
                            </h2>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
                                <div className="bg-white px-4 py-3 md:px-6 md:py-4">
                                    <p className="font-inter text-sm leading-relaxed md:text-xl">
                                        The future of food is not just faster delivery. It is fairer systems, stronger local economies, and better operating discipline from sourcing to last-mile experience.
                                    </p>
                                </div>
                                <div className="bg-white px-4 py-3 md:px-6 md:py-4">
                                    <p className="font-inter text-sm leading-relaxed md:text-xl">
                                        My work focuses on turning that thesis into execution: building trusted networks, measurable outcomes, and teams that can scale impact without losing integrity.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section
                    ref={(el) => addToRefs(el, 2)}
                    className="relative flex items-stretch overflow-visible px-6 py-16 md:absolute md:inset-0 md:items-center md:overflow-x-hidden md:p-0 md:opacity-0"
                >
                    <div ref={portfolioTrack} className="flex w-full flex-col gap-6 md:w-[400vw] md:flex-row md:gap-20 md:px-20">
                        {caseStudies.map((study) => (
                            <CaseStudyCard key={study.caseNumber} study={study} />
                        ))}
                    </div>
                </section>

                <section
                    ref={(el) => addToRefs(el, 3)}
                    className="relative flex min-h-[100svh] flex-col items-center justify-center bg-black/90 px-6 py-16 text-white backdrop-blur-md md:absolute md:inset-0 md:z-20 md:p-0 md:opacity-0"
                >
                    <h2 className="mb-10 text-center font-oswald text-5xl font-bold uppercase tracking-tight md:mb-12 md:text-8xl">
                        Collaborate
                        <br />
                        with Doyle
                    </h2>

                    <div className="flex w-full max-w-sm flex-col gap-4 md:max-w-none md:flex-row md:gap-6">
                        <a
                            href="https://www.linkedin.com/in/doyle-omachonu-9907981a0/"
                            target="_blank"
                            rel="noreferrer"
                            className="w-full rounded-full border border-white px-8 py-4 text-center font-inter text-sm uppercase tracking-widest transition-all duration-500 hover:bg-white hover:text-black md:w-auto md:px-12 md:py-6 md:text-xl"
                        >
                            Speaking & Panels
                        </a>

                        <Link
                            href="/letter"
                            className="w-full rounded-full border border-white bg-white px-8 py-4 text-center font-inter text-sm uppercase tracking-widest text-black transition-all duration-500 hover:bg-transparent hover:text-white md:w-auto md:px-12 md:py-6 md:text-xl"
                        >
                            Open Letter
                        </Link>
                    </div>

                    <p className="mt-12 text-xs uppercase tracking-widest text-gray-500 md:absolute md:bottom-10 md:left-10 md:mt-0">© 2026 Doyle Omachonu</p>
                </section>
            </main>

            <div className="invisible hidden h-[800vh] w-full pointer-events-none md:block" />
        </SmoothScroll>
    );
}
