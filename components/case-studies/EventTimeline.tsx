"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { Project } from "@/lib/domain";
import { cn } from "@/lib/utils";

interface EventTimelineProps {
  project: Project;
  side: "ungoverned" | "governed";
  currentDay: number;
}

export function EventTimeline({ project, side, currentDay }: EventTimelineProps) {
  const events = (side === "governed" ? project.governedEvents : project.ungovernedEvents).filter(
    (event) => event.day <= currentDay
  );

  return (
    <div className="mt-3 space-y-2">
      <AnimatePresence initial={false}>
        {events.map((event, index) => (
          <motion.div
            key={`${event.day}-${event.kind}-${index}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className={cn(
              "rounded-md border p-2",
              event.kind.includes("governance") || event.kind.includes("beiur")
                ? "border-sky-500/30 bg-sky-950/30"
                : event.kind.includes("committed") || event.kind.includes("death") || event.kind.includes("hallucinated")
                  ? "border-red-500/30 bg-red-950/30"
                  : "border-zinc-700 bg-black/25"
            )}
          >
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-zinc-500">
              Day {event.day} · {event.kind.replaceAll("_", " ")}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-zinc-200">{event.details}</p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
