"use client";

import Header from "@/components/Header";
import SmoothScroll from "@/components/SmoothScroll";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
export default function ExperiencesPage() {
    const container = useRef<HTMLDivElement>(null);
    const timeline = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const cards = gsap.utils.toArray<HTMLElement>(".experience-card");
        cards.forEach((card) => {
            gsap.fromTo(card,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        gsap.fromTo(".sidebar-item",
            { opacity: 0, x: 20 },
            {
                opacity: 1,
                x: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power2.out",
                delay: 0.5
            }
        );
    }, { scope: container });

    return (
        <SmoothScroll>
            <Header />
            <main ref={container} className="min-h-screen bg-[#0a0a0a] text-white pt-24 md:pt-32 pb-12 md:pb-20">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16">
                    
                    {/* --- MAIN CONTENT: TIMELINE --- */}
                    <div className="lg:col-span-8 order-2 lg:order-1">
                        <header className="mb-12 md:mb-20">
                            <h1 className="text-4xl md:text-7xl font-oswald uppercase tracking-tight mb-4 md:mb-6">
                                Professional <span className="text-gray-500">Trajectory</span>
                            </h1>
                            <p className="text-base md:text-xl text-gray-400 font-inter max-w-2xl leading-relaxed">
                                From Operations to FoodTech Visionary: A journey defined by strategic optimization and disruptive innovation.
                            </p>
                        </header>

                        <div ref={timeline} className="space-y-16 md:space-y-24 relative border-l border-white/10 ml-2 md:ml-4 pl-6 md:pl-12">
                            
                            {/* EXPERIENCE 1 */}
                            <div className="experience-card relative">
                                <div className="absolute -left-[33px] md:-left-[57px] top-0 w-4 h-4 rounded-full bg-white border-4 border-black" />
                                <div className="mb-3 flex flex-col md:flex-row md:items-baseline gap-1 md:gap-4">
                                    <h2 className="text-2xl md:text-3xl font-oswald uppercase">Founder & CEO | Cribnosh</h2>
                                    <span className="text-[10px] md:text-sm font-inter tracking-widest text-white/40 uppercase">Dec 2024 – Present</span>
                                </div>
                                <p className="text-sm md:text-lg text-gray-400 mb-6 font-inter leading-relaxed">
                                    Doyle currently leads the strategic growth and brand vision for Cribnosh, driving the platform’s <span className="text-white font-bold">0-to-1 expansion</span> in the UK market. He is actively building a sustainable, data-driven ecosystem for the &quot;hidden economy&quot; of home chefs.
                                </p>
                                <div className="flex gap-4 md:gap-8">
                                    <div className="bg-white/5 border border-white/10 p-3 md:p-4 rounded-lg flex-1 md:flex-none">
                                        <div className="text-xl md:text-2xl font-oswald text-white">0-to-1</div>
                                        <div className="text-[8px] md:text-[10px] uppercase tracking-widest text-gray-500">Scaling</div>
                                    </div>
                                    <div className="bg-white/5 border border-white/10 p-3 md:p-4 rounded-lg flex-1 md:flex-none">
                                        <div className="text-xl md:text-2xl font-oswald text-white">2026</div>
                                        <div className="text-[8px] md:text-[10px] uppercase tracking-widest text-gray-500">Vision</div>
                                    </div>
                                </div>
                            </div>

                            {/* EXPERIENCE 2 */}
                            <div className="experience-card relative">
                                <div className="absolute -left-[33px] md:-left-[57px] top-0 w-4 h-4 rounded-full bg-white/30 border-4 border-black" />
                                <div className="mb-3 flex flex-col md:flex-row md:items-baseline gap-1 md:gap-4">
                                    <h2 className="text-2xl md:text-3xl font-oswald uppercase leading-tight">The Strategic Incubator: Venture Building & MBA</h2>
                                    <span className="text-[10px] md:text-sm font-inter tracking-widest text-white/40 uppercase">Sept 2022 – May 2024</span>
                                </div>
                                <p className="text-sm md:text-lg text-gray-400 mb-6 font-inter leading-relaxed">
                                    Recognizing the need to scale his impact, Doyle took a deliberate period of academic rigor to pursue his MBA in Strategic Project Management at Edinburgh Napier University. This phase served as the <span className="text-white font-bold">incubator for Cribnosh</span>. Simultaneously, he applied these strategies as the CEO of AltDream.
                                </p>
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="bg-white/5 border border-white/10 p-3 md:p-4 rounded-lg flex items-center gap-4">
                                        <div className="text-2xl md:text-3xl font-oswald text-white">MBA</div>
                                        <div className="text-[10px] md:text-xs text-gray-500 font-inter">Strategic Project Management</div>
                                    </div>
                                </div>
                            </div>

                            {/* EXPERIENCE 3 */}
                            <div className="experience-card relative">
                                <div className="absolute -left-[33px] md:-left-[57px] top-0 w-4 h-4 rounded-full bg-white/30 border-4 border-black" />
                                <div className="mb-3 flex flex-col md:flex-row md:items-baseline gap-1 md:gap-4">
                                    <h2 className="text-2xl md:text-3xl font-oswald uppercase">Business Innovator & Technology Manager</h2>
                                    <span className="text-[10px] md:text-sm font-inter tracking-widest text-white/40 uppercase">Nov 2021 – Sept 2023</span>
                                </div>
                                <p className="text-sm md:text-lg text-gray-400 mb-6 font-inter leading-relaxed">
                                    Spearheaded critical digital transformation initiatives. Led the integration of sophisticated CRM systems and engineered automated workflows between marketing and development teams.
                                </p>
                                <div className="flex gap-4">
                                    <div className="bg-white/5 border border-white/10 p-3 md:p-4 rounded-lg">
                                        <div className="text-xl md:text-2xl font-oswald text-white">30%</div>
                                        <div className="text-[8px] md:text-[10px] uppercase tracking-widest text-gray-500">Efficiency Increase</div>
                                    </div>
                                </div>
                            </div>

                            {/* EXPERIENCE 4 */}
                            <div className="experience-card relative">
                                <div className="absolute -left-[33px] md:-left-[57px] top-0 w-4 h-4 rounded-full bg-white/30 border-4 border-black" />
                                <div className="mb-3 flex flex-col md:flex-row md:items-baseline gap-1 md:gap-4">
                                    <h2 className="text-2xl md:text-3xl font-oswald uppercase">Mastering Operations, Supply Chain, and Analytics</h2>
                                    <span className="text-[10px] md:text-sm font-inter tracking-widest text-white/40 uppercase">July 2017 – Aug 2022</span>
                                </div>
                                <p className="text-sm md:text-lg text-gray-400 mb-8 font-inter leading-relaxed">
                                    Built a formidable foundation in physical supply chains, engineering, and lean manufacturing across major FMCG companies, including Grand Cereals Limited and NASCO Group.
                                </p>
                                
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                    <div className="space-y-1">
                                        <div className="text-3xl md:text-4xl font-oswald text-white">40%</div>
                                        <div className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] text-gray-500 font-inter">Productivity Gain</div>
                                        <p className="text-[10px] text-gray-400 font-inter leading-relaxed hidden md:block">Crisis Leadership during COVID-19 using Agile methodologies.</p>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-3xl md:text-4xl font-oswald text-white">20%</div>
                                        <div className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] text-gray-500 font-inter">Process Opt.</div>
                                        <p className="text-[10px] text-gray-400 font-inter leading-relaxed hidden md:block">Achieved through Chemical Engineering process realignment.</p>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-3xl md:text-4xl font-oswald text-white">15%</div>
                                        <div className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] text-gray-500 font-inter">Defect Red.</div>
                                        <p className="text-[10px] text-gray-400 font-inter leading-relaxed hidden md:block">Implementation of rigorous Statistical Process Controls (SPC).</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* --- SIDEBAR: AT A GLANCE --- */}
                    <aside className="lg:col-span-4 space-y-8 md:space-y-12 order-1 lg:order-2">
                        <div className="lg:sticky lg:top-40">
                            <div className="sidebar-item bg-white/5 border border-white/10 p-6 md:p-8 rounded-2xl mb-6 md:mb-8">
                                <h3 className="text-lg md:text-xl font-oswald uppercase tracking-widest mb-6 md:mb-8 border-b border-white/10 pb-4">Academic Foundation</h3>
                                <div className="space-y-6 md:space-y-8">
                                    <div>
                                        <h4 className="text-sm md:text-base font-oswald uppercase text-white mb-1">MBA, Strategic Project Management</h4>
                                        <p className="text-[10px] md:text-sm text-gray-500 mb-2">Edinburgh Napier University (2022 – 2024)</p>
                                        <p className="text-[10px] md:text-xs text-gray-400 leading-relaxed font-inter">Focus: Corporate Strategy, Risk Mitigation, Financial Accounting, and Emerging Markets.</p>
                                    </div>
                                    <div>
                                        <h4 className="text-sm md:text-base font-oswald uppercase text-white mb-1">B.Eng, Chemical Engineering</h4>
                                        <p className="text-[10px] md:text-sm text-gray-500 mb-2">Covenant University (2012 – 2017)</p>
                                        <p className="text-[10px] md:text-xs text-gray-400 leading-relaxed font-inter">Focus: Process Optimization, Yield Improvement, and Plant Design.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="sidebar-item bg-white/5 border border-white/10 p-6 md:p-8 rounded-2xl mb-6 md:mb-8">
                                <h3 className="text-lg md:text-xl font-oswald uppercase tracking-widest mb-6 md:mb-8 border-b border-white/10 pb-4">Core Competencies</h3>
                                <div className="flex flex-wrap gap-2">
                                    {["0-to-1 Leadership", "Business Analysis", "Supply Chain", "Risk Mitigation", "Agile", "Lean/Six Sigma", "Kanban", "SPC"].map((skill) => (
                                        <span key={skill} className="px-2 md:px-3 py-1 bg-white/10 rounded-full text-[8px] md:text-[10px] uppercase tracking-widest font-inter text-gray-300">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="sidebar-item bg-white/5 border border-white/10 p-6 md:p-8 rounded-2xl">
                                <h3 className="text-lg md:text-xl font-oswald uppercase tracking-widest mb-6 md:mb-8 border-b border-white/10 pb-4">Technical Stack</h3>
                                <div className="grid grid-cols-2 gap-4 md:gap-6">
                                    <div className="space-y-1">
                                        <div className="text-[8px] md:text-[10px] text-gray-500 uppercase tracking-tighter">Data & BI</div>
                                        <div className="text-[10px] md:text-xs font-inter">Power BI, SAP IBP</div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-[8px] md:text-[10px] text-gray-500 uppercase tracking-tighter">ERP & Project</div>
                                        <div className="text-[10px] md:text-xs font-inter">Oracle Fusion, Jira</div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-[8px] md:text-[10px] text-gray-500 uppercase tracking-tighter">Automation</div>
                                        <div className="text-[10px] md:text-xs font-inter">Zapier, CRM</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>

                </div>
            </main>
        </SmoothScroll>
    );
}
