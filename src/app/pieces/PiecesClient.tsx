"use client";

import Header from "@/components/Header";
import SmoothScroll from "@/components/SmoothScroll";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface Piece {
    title: string;
    source: string;
    date: string;
    url: string;
    category: "By Me" | "About Me";
    description: string;
}

const pieces: Piece[] = [
    {
        title: "An Open Invitation",
        source: "Personal Letter",
        date: "2026",
        url: "/letter",
        category: "By Me",
        description: "A message to the food creators and the hidden culinary economy in the UK."
    },
    {
        title: "Cribnosh and the Future of Food Delivery",
        source: "Cribnosh.co.uk",
        date: "2025",
        url: "https://cribnosh.co.uk",
        category: "By Me",
        description: "An overview of how we're supporting independent food creators through technology and logistics."
    },
    {
        title: "FoodTech in the UK: Supporting Local Talent",
        source: "External Publication",
        date: "2025",
        url: "#",
        category: "About Me",
        description: "A look at the role of Cribnosh in providing digital storefronts for independent chefs."
    }
];

export default function PiecesClient() {
    const container = useRef<HTMLDivElement>(null);
    const content = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!content.current) return;
        
        gsap.fromTo(content.current.children, 
            { opacity: 0, y: 30 }, 
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out", delay: 0.2 }
        );
    }, []);

    return (
        <SmoothScroll>
            <Header />
            <main ref={container} className="min-h-screen bg-[#fafafa] text-black pt-24 md:pt-40 pb-12 md:pb-20 px-6 md:px-0">
                <div className="max-w-5xl mx-auto font-inter">
                    <p className="text-[10px] md:text-sm tracking-[0.2em] md:tracking-[0.3em] uppercase mb-8 md:mb-12 opacity-50 font-oswald">
                        Pieces & Mentions
                    </p>
                    
                    <h1 className="text-3xl md:text-6xl font-oswald uppercase mb-16 md:mb-24 leading-[1.1] tracking-tight">
                        Written & <span className="text-gray-400">Featured</span>
                    </h1>

                    <div ref={content} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                        {pieces.map((piece, index) => (
                            <a 
                                key={index}
                                href={piece.url}
                                target={piece.url.startsWith("http") ? "_blank" : "_self"}
                                rel={piece.url.startsWith("http") ? "noreferrer" : ""}
                                className="group block bg-white border border-gray-100 p-8 md:p-10 hover:border-black transition-colors duration-500 shadow-sm hover:shadow-xl"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <span className="text-[10px] tracking-widest uppercase opacity-40 font-oswald">
                                        {piece.category}
                                    </span>
                                    <span className="text-[10px] tracking-widest uppercase opacity-40 font-oswald">
                                        {piece.date}
                                    </span>
                                </div>
                                <h2 className="text-2xl md:text-3xl font-oswald uppercase mb-4 group-hover:text-black leading-tight">
                                    {piece.title}
                                </h2>
                                <p className="text-sm md:text-base text-gray-500 mb-8 font-inter leading-relaxed">
                                    {piece.description}
                                </p>
                                <div className="flex items-center gap-2 text-[10px] tracking-widest uppercase font-oswald opacity-60 group-hover:opacity-100 transition-opacity">
                                    Source: {piece.source}
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M7 17l9.2-9.2M17 17V7H7" />
                                    </svg>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </main>
        </SmoothScroll>
    );
}
