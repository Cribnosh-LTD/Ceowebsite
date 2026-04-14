"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const clearScrollLock = () => {
      document.documentElement.classList.remove("lenis-stopped");
      document.body.classList.remove("lenis-stopped");
      document.documentElement.style.removeProperty("overflow");
      document.body.style.removeProperty("overflow");
    };

    const mobileViewport = window.matchMedia("(max-width: 767px)");
    const coarsePointer = window.matchMedia("(pointer: coarse)");

    let lenis: Lenis | null = null;
    let onTick: ((time: number) => void) | null = null;

    const teardownLenis = () => {
      if (onTick) {
        gsap.ticker.remove(onTick);
        onTick = null;
      }

      if (lenis) {
        lenis.destroy();
        lenis = null;
      }

      clearScrollLock();
    };

    const applyScrollMode = () => {
      const useNativeScroll = mobileViewport.matches || coarsePointer.matches;
      teardownLenis();

      if (useNativeScroll) return;

      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
      });

      lenis.on("scroll", ScrollTrigger.update);

      onTick = (time: number) => {
        lenis?.raf(time * 1000);
      };

      gsap.ticker.add(onTick);
      gsap.ticker.lagSmoothing(0);
    };

    applyScrollMode();
    mobileViewport.addEventListener("change", applyScrollMode);
    coarsePointer.addEventListener("change", applyScrollMode);

    return () => {
      mobileViewport.removeEventListener("change", applyScrollMode);
      coarsePointer.removeEventListener("change", applyScrollMode);
      teardownLenis();
    };
  }, []);

  return <>{children}</>;
}
