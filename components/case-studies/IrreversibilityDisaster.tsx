"use client";

import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/components/dashboard/format";
import { CaseStudyProps, getHeroProject } from "./caseStudyData";
import { EventTimeline } from "./EventTimeline";

export function IrreversibilityDisaster({ side, currentDay }: CaseStudyProps) {
  const project = getHeroProject("p-0184");
  const down = side === "ungoverned" && currentDay >= 19;

  return (
    <div className="mt-3 rounded-lg border border-red-500/25 bg-black/35 p-3">
      <div className="grid gap-2 sm:grid-cols-2">
        <div className={down ? "rounded-md border border-red-500/50 bg-red-950/50 p-3" : "rounded-md border border-emerald-500/30 bg-emerald-950/30 p-3"}>
          <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">Production Database</p>
          <p className="mt-1 font-mono text-lg text-white">{down ? "AUTH DOWN" : side === "governed" && currentDay >= 14 ? "NESHER: BLOCKED" : "HEALTHY"}</p>
        </div>
        <div className="rounded-md border border-zinc-700 bg-black/30 p-3">
          <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">Reversibility</p>
          <p className={side === "governed" ? "mt-1 text-sm text-emerald-300" : "mt-1 text-sm text-red-300"}>{side === "governed" ? "Shadow columns / dual-write" : "NO ROLLBACK PLAN"}</p>
          {down ? <Badge variant="outline" className="mt-2 border-red-500/50 text-red-200">{formatCurrency(312000)}</Badge> : null}
        </div>
      </div>
      <EventTimeline project={project} side={side} currentDay={currentDay} />
    </div>
  );
}
