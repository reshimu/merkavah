"use client";

import { Badge } from "@/components/ui/badge";
import { CaseStudyProps, getHeroProject } from "./caseStudyData";
import { EventTimeline } from "./EventTimeline";

export function HallucinatedCompletion({ side, currentDay }: CaseStudyProps) {
  const project = getHeroProject("p-0117");
  const status = side === "governed"
    ? currentDay >= 11 ? "VERIFIED: sent" : currentDay >= 8 ? "SHOR: unverified" : "Drafting"
    : currentDay >= 18 ? "NEVER SENT" : currentDay >= 8 ? "Scheduled" : "Drafting";
  const tone = status.includes("VERIFIED") ? "text-emerald-300 border-emerald-500/40" : status.includes("NEVER") ? "text-red-300 border-red-500/40" : "text-amber-300 border-amber-500/40";

  return (
    <div className="mt-3 rounded-lg border border-sky-500/25 bg-black/35 p-3">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Campaign Status</p>
        <Badge variant="outline" className={tone}>{status}</Badge>
      </div>
      <EventTimeline project={project} side={side} currentDay={currentDay} />
    </div>
  );
}
