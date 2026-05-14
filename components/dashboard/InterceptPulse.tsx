"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Chayyah, Project } from "@/lib/domain";

const COLORS: Record<Chayyah, string> = {
  ARYEH: "rgba(249,115,22,0.48)",
  SHOR: "rgba(59,130,246,0.48)",
  NESHER: "rgba(168,85,247,0.48)",
  PANIM_ADAM: "rgba(20,184,166,0.48)",
};

interface InterceptPulseProps {
  side: "ungoverned" | "governed";
  projects: Project[];
  currentDay: number;
}

export function InterceptPulse({ side, projects, currentDay }: InterceptPulseProps) {
  const [pulse, setPulse] = useState<Chayyah | null>(null);

  useEffect(() => {
    if (side !== "governed") return;
    const intercept = projects
      .flatMap((project) => project.governedEvents)
      .find((event) => event.day === currentDay && event.kind === "governance_intercept" && event.chayyah);
    if (!intercept?.chayyah) return;
    setPulse(intercept.chayyah);
    const timer = window.setTimeout(() => setPulse(null), 400);
    return () => window.clearTimeout(timer);
  }, [side, projects, currentDay]);

  return (
    <AnimatePresence>
      {pulse ? (
        <motion.div
          key={`${pulse}-${currentDay}`}
          initial={{ opacity: 0.8, scale: 0.2 }}
          animate={{ opacity: 0, scale: 1.8 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="pointer-events-none absolute inset-8 rounded-full"
          style={{ boxShadow: `0 0 0 42px ${COLORS[pulse]}` }}
        />
      ) : null}
    </AnimatePresence>
  );
}
