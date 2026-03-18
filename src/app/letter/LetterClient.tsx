"use client";

import Header from "@/components/Header";
import Image from "next/image";
import SmoothScroll from "@/components/SmoothScroll";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function LetterClient() {
    const container = useRef<HTMLDivElement>(null);
    const content = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!content.current) return;
        
        gsap.fromTo(content.current.children, 
            { opacity: 0, y: 30 }, 
            { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out", delay: 0.5 }
        );
    }, []);

    return (
        <SmoothScroll>
            <Header />
            <main ref={container} className="min-h-screen bg-[#fafafa] text-black pt-24 md:pt-40 pb-12 md:pb-20 px-6 md:px-0">
                <div ref={content} className="max-w-3xl mx-auto font-inter">
                    <p className="text-[10px] md:text-sm tracking-[0.2em] md:tracking-[0.3em] uppercase mb-8 md:mb-12 opacity-50 font-oswald">
                        Open Letter
                    </p>
                    
                    <h1 className="text-3xl md:text-6xl font-oswald uppercase mb-10 md:mb-16 leading-[1.1] tracking-tight">
                        What I Build, <br /><span className="text-gray-400">Why It Matters</span>
                    </h1>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 items-start">
                        {/* PORTRAIT SIDEBAR - Moves to top on mobile */}
                        <div className="lg:col-span-4 lg:order-2 sticky top-24 md:top-40 mb-8 md:mb-0">
                            <div className="aspect-[3/4] bg-white border border-gray-200 shadow-lg md:shadow-xl relative overflow-hidden group">
                                <Image 
                                    src="/doyle-omachonu.png"
                                    alt="Portrait of Doyle Omachonu"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    priority
                                />
                            </div>
                            <div className="mt-4 md:mt-6 text-[8px] md:text-[10px] uppercase tracking-widest text-gray-400 font-oswald text-right">
                                CEO & Founder
                            </div>
                        </div>

                        <div className="lg:col-span-8 lg:order-1 space-y-6 md:space-y-8 text-base md:text-xl leading-relaxed text-gray-800">
                            <p className="font-medium text-black">
                                To founders, operators, and institutions building the next decade of food and infrastructure,
                            </p>

                            <p className="text-xl md:text-3xl font-oswald uppercase text-black py-2 md:py-4">
                                I believe leadership is the design of durable systems.
                            </p>

                            <p>
                                The most important businesses of this era will not be measured by scale alone. They will be measured by whether they strengthen trust, expand opportunity, and improve everyday life for the people who depend on them.
                            </p>

                            <p>
                                My background in operations, supply chains, and strategy taught me that outcomes follow systems. When incentives are clear, standards are high, and teams are empowered, performance compounds.
                            </p>

                            <p>
                                This is the lens I bring to every project, boardroom, and partnership: combine analytical rigor with social responsibility, and build models that are both efficient and humane.
                            </p>

                            <p>
                                I share ideas publicly to contribute to better leadership in food systems, workforce design, and sustainable growth. If these themes align with your work, I would value a conversation.
                            </p>

                            <div className="pt-4 md:pt-6">
                                <a 
                                    href="https://www.linkedin.com/in/doyle-omachonu-9907981a0/" 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="inline-block px-8 py-4 bg-black text-white font-oswald uppercase tracking-widest text-sm md:text-base hover:bg-gray-800 transition-all duration-300"
                                >
                                    Connect on LinkedIn
                                </a>
                            </div>

                            <div className="pt-8 md:pt-12 border-t border-gray-200 mt-12 md:mt-16">
                                <p className="font-oswald uppercase tracking-widest text-[10px] md:text-sm opacity-50 mb-3 md:mb-4">Sincerely,</p>
                                <p className="text-xl md:text-2xl font-oswald uppercase">— Doyle Omachonu</p>
                                <p className="text-xs md:text-sm opacity-60">Founder & CEO</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </SmoothScroll>
    );
}
