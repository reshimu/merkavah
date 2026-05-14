"use client";

import { Lock } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { CaseStudyProps, getHeroProject } from "./caseStudyData";
import { EventTimeline } from "./EventTimeline";

export function ScopeCreep({ side, currentDay }: CaseStudyProps) {
  const project = getHeroProject("p-0042");
  const governed = side === "governed";
  const agentCount = governed ? 1 : Math.min(project.agentCount, currentDay >= 11 ? 4 : currentDay >= 9 ? 3 : currentDay >= 7 ? 2 : 1);
  const tokenValue = governed ? 18 : Math.min(100, currentDay * 7);

  return (
    <div className="mt-3 rounded-lg border border-orange-500/25 bg-black/35 p-3">
      <div className="grid gap-2 sm:grid-cols-2">
        <div>
          <p className="text-[0.62rem] uppercase tracking-[0.18em] text-zinc-500">Original Goal</p>
          <p className="mt-1 text-sm text-zinc-100">{project.originalGoal}</p>
        </div>
        <div>
          <p className="text-[0.62rem] uppercase tracking-[0.18em] text-zinc-500">Current Goal</p>
          <p className={governed ? "mt-1 flex items-center gap-1 text-sm text-emerald-300" : "mt-1 text-sm text-orange-300"}>
            {governed ? <Lock className="size-3" /> : null}
            {governed ? project.originalGoal : project.currentGoal}
          </p>
        </div>
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <div><p className="text-xs text-zinc-500">Agents</p><p className="font-mono text-2xl text-white">{agentCount}</p></div>
        <div><p className="text-xs text-zinc-500">Token meter</p><Progress value={tokenValue} className="mt-2" /></div>
      </div>
      <EventTimeline project={project} side={side} currentDay={currentDay} />
    </div>
  );
}
