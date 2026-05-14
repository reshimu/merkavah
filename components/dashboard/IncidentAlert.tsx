"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Incident } from "@/lib/domain";
import { formatCurrency } from "./format";

interface IncidentAlertProps {
  incident: Incident | null;
  currentDay: number;
}

export function IncidentAlert({ incident, currentDay }: IncidentAlertProps) {
  const [dismissedKey, setDismissedKey] = useState<string | null>(null);
  const [cost, setCost] = useState(0);
  const key = incident ? `${incident.day}-${incident.projectId}` : null;
  const visible = Boolean(incident && incident.severity === "critical" && currentDay === incident.day && dismissedKey !== key);

  useEffect(() => {
    if (!visible || !incident) return;
    setCost(0);
    const targetCost = incident.costUSD;
    const started = performance.now();
    const duration = 1200;
    let frame = 0;
    function tick(now: number) {
      const progress = Math.min(1, (now - started) / duration);
      setCost(Math.round(targetCost * progress));
      if (progress < 1) frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    const timer = window.setTimeout(() => setDismissedKey(key), 4000);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, [visible, incident, key]);

  useEffect(() => {
    if (!visible) return;
    const onScroll = () => setDismissedKey(key);
    window.addEventListener("wheel", onScroll, { once: true });
    window.addEventListener("touchmove", onScroll, { once: true });
    return () => {
      window.removeEventListener("wheel", onScroll);
      window.removeEventListener("touchmove", onScroll);
    };
  }, [visible, key]);

  return (
    <AnimatePresence>
      {visible && incident ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/82 p-4 backdrop-blur-sm"
          onClick={() => setDismissedKey(key)}
        >
          <motion.div
            initial={{ scale: 0.94, y: 24 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: -12 }}
            className="max-w-3xl rounded-lg border border-red-500 bg-red-950/80 p-6 shadow-[0_0_80px_rgba(239,68,68,0.35)]"
          >
            <div className="mb-4 inline-flex rounded-full border border-red-300/50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-red-100">
              CRITICAL
            </div>
            <h2 className="text-3xl font-semibold text-red-50">{incident.title}</h2>
            <p className="mt-4 text-sm leading-relaxed text-red-100/85">{incident.description}</p>
            <p className="mt-6 font-mono text-5xl font-bold text-white">{formatCurrency(cost)}</p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}


