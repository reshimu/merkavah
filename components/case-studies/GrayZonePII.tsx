"use client";

import { Badge } from "@/components/ui/badge";
import { CaseStudyProps, getHeroProject } from "./caseStudyData";
import { EventTimeline } from "./EventTimeline";

const unsafeFields = ["personal email", "phone", "LinkedIn", "support history"];
const safeFields = ["name", "work email", "usage tier"];

export function GrayZonePII({ side, currentDay }: CaseStudyProps) {
  const project = getHeroProject("p-0098");
  const showUnsafe = side === "ungoverned" && currentDay >= 10;

  return (
    <div className="mt-3 rounded-lg border border-teal-500/25 bg-black/35 p-3">
      <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Export Fields</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {safeFields.map((field) => <Badge key={field} variant="outline" className="border-zinc-600 text-zinc-200">{field}</Badge>)}
        {(showUnsafe || (side === "governed" && currentDay >= 9) ? unsafeFields : []).map((field) => (
          <Badge key={field} variant="outline" className={side === "governed" ? "border-red-500/50 text-red-300 line-through" : "border-orange-500/50 text-orange-200"}>{field}</Badge>
        ))}
      </div>
      <EventTimeline project={project} side={side} currentDay={currentDay} />
    </div>
  );
}
