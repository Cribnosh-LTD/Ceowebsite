"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

interface TextRevealProps {
    children: string;
    className?: string;
    delay?: number;
}

export default function TextReveal({ children, className, delay = 0 }: TextRevealProps) {
    const el = useRef<HTMLHeadingElement>(null);

    useGSAP(() => {
        if (!el.current) return;

        const chars = el.current.querySelectorAll(".char");

        gsap.fromTo(
            chars,
            {
                y: 100,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                stagger: 0.05,
                duration: 1,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: el.current,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse",
                    // markers: true,
                },
                delay: delay,
            }
        );
    }, []);

    // Split text into characters
    const splitText = children.split("").map((char, index) => (
        <span key={index} className="char inline-block" style={{ whiteSpace: "pre" }}>
            {char}
        </span>
    ));

    return (
        <h2 ref={el} className={cn("overflow-hidden", className)}>
            {splitText}
        </h2>
    );
}
