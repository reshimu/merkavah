"use client";

import { useEffect, useState } from "react";
import Lenis from "@studio-freight/lenis";

let lenisInstance: Lenis | null = null;

export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!lenisInstance) {
      lenisInstance = new Lenis();
    }

    const lenis = lenisInstance;

    function onScroll({ progress }: { progress: number }) {
      setProgress(progress);
    }

    lenis.on("scroll", onScroll);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      lenis.off("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return progress;
}
