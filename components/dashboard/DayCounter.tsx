"use client";

import { AnimatePresence, motion } from "framer-motion";

interface DayCounterProps {
  day: number;
}

export function DayCounter({ day }: DayCounterProps) {
  return (
    <div className="flex items-end gap-2">
      <span className="text-xs uppercase tracking-[0.28em] text-zinc-500">Day</span>
      <div className="relative h-12 w-24 overflow-hidden font-mono text-5xl font-semibold leading-none text-white">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={day}
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -24, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="absolute left-0 top-0 tabular-nums"
          >
            {day}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="pb-1 font-mono text-lg text-zinc-500">/ 30</span>
    </div>
  );
}
