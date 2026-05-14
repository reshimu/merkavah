import type { Incident } from "@/lib/domain";
import { formatCurrency } from "./format";

interface IncidentBannerProps {
  incidents: Incident[];
  side: "ungoverned" | "governed";
}

export function IncidentBanner({ incidents, side }: IncidentBannerProps) {
  if (side !== "ungoverned" || incidents.length === 0) return null;
  const incident = incidents[0];

  return (
    <div className="rounded-lg border border-red-500/60 bg-red-950/70 p-4 shadow-[0_0_30px_rgba(239,68,68,0.22)]">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-red-300">{incident.severity} incident</p>
          <h3 className="mt-1 text-lg font-semibold text-red-100">{incident.title}</h3>
        </div>
        <p className="font-mono text-2xl font-semibold text-red-200">{formatCurrency(incident.costUSD)}</p>
      </div>
      <p className="mt-3 max-w-5xl text-sm leading-relaxed text-red-100/80">{incident.description}</p>
    </div>
  );
}
