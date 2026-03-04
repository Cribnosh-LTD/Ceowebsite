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
                        Message from the Founder
                    </p>
                    
                    <h1 className="text-3xl md:text-6xl font-oswald uppercase mb-10 md:mb-16 leading-[1.1] tracking-tight">
                        Read my Pieces: <br /><span className="text-gray-400">An Open Invitation</span>
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
                                To the creators, the home cooks, and the hidden culinary artists of the UK,
                            </p>

                            <p className="text-xl md:text-3xl font-oswald uppercase text-black py-2 md:py-4">
                                Welcome to a new era of food delivery.
                            </p>

                            <p>
                                This is a realization: the UK is a vibrant mosaic of cultures and global cuisines, yet that diversity is often missing from mainstream delivery platforms. There is a system that favors mass-market chains while sidelining the home-cooked heritage that connects us to our communities.
                            </p>

                            <p>
                                Food is more than sustenance; it is a connection to home and culture. That is why we are building a platform dedicated to representation. Whether you are a recipe developer, a stay-at-home parent with a digital storefront, or a student sharing a taste of home, Cribnosh is a launchpad.
                            </p>

                            <p>
                                We are here to bridge the gap between home-cooked heritage and modern convenience. By providing the technology, logistics, and data-driven insights needed, we are supporting the &quot;hidden economy&quot; of home chefs.
                            </p>

                            <p>
                                This is a chance to share your craft with a wider audience. Join us, and let&apos;s redefine what food delivery means, together.
                            </p>

                            <div className="pt-4 md:pt-6">
                                <a 
                                    href="https://cribnosh.co.uk" 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="inline-block px-8 py-4 bg-black text-white font-oswald uppercase tracking-widest text-sm md:text-base hover:bg-gray-800 transition-all duration-300"
                                >
                                    Visit Cribnosh
                                </a>
                            </div>

                            <div className="pt-8 md:pt-12 border-t border-gray-200 mt-12 md:mt-16">
                                <p className="font-oswald uppercase tracking-widest text-[10px] md:text-sm opacity-50 mb-3 md:mb-4">Sincerely,</p>
                                <p className="text-xl md:text-2xl font-oswald uppercase">— Doyle Omachonu</p>
                                <p className="text-xs md:text-sm opacity-60">Cribnosh</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </SmoothScroll>
    );
}
