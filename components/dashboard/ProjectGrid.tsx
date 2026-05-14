"use client";

import type { Project, ProjectStatus } from "@/lib/domain";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { GrayZonePII } from "@/components/case-studies/GrayZonePII";
import { HallucinatedCompletion } from "@/components/case-studies/HallucinatedCompletion";
import { IrreversibilityDisaster } from "@/components/case-studies/IrreversibilityDisaster";
import { ScopeCreep } from "@/components/case-studies/ScopeCreep";
import { cn } from "@/lib/utils";

const HERO_IDS = new Set(["p-0042", "p-0098", "p-0117", "p-0184"]);

const STATUS_STYLES: Record<ProjectStatus, string> = {
  ON_TRACK: "border-emerald-500/30 bg-emerald-950/30 text-emerald-200",
  DRIFTING: "border-yellow-500/30 bg-yellow-950/30 text-yellow-200",
  SCOPE_CREEPING: "border-orange-500/40 bg-orange-950/40 text-orange-200",
  BURNING_TOKENS: "border-red-500/40 bg-red-950/40 text-red-200",
  DEATH_LOOP: "animate-pulse border-red-400/70 bg-red-950/60 text-red-100",
  HALTED_BY_GOVERNANCE: "border-sky-500/40 bg-sky-950/40 text-sky-200",
  AWAITING_BEIUR: "border-violet-500/40 bg-violet-950/40 text-violet-200",
  COMPLETED: "border-zinc-700 bg-zinc-900/70 text-zinc-300",
};

interface ProjectGridProps {
  projects: Project[];
  currentDay: number;
  side: "ungoverned" | "governed";
}

function HeroCaseStudy({ id, side, currentDay }: { id: string; side: "ungoverned" | "governed"; currentDay: number }) {
  if (id === "p-0042") return <ScopeCreep side={side} currentDay={currentDay} />;
  if (id === "p-0098") return <GrayZonePII side={side} currentDay={currentDay} />;
  if (id === "p-0117") return <HallucinatedCompletion side={side} currentDay={currentDay} />;
  if (id === "p-0184") return <IrreversibilityDisaster side={side} currentDay={currentDay} />;
  return null;
}

export function ProjectGrid({ projects, currentDay, side }: ProjectGridProps) {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-950/70 p-3">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">Project Fleet</p>
        <p className="font-mono text-xs text-zinc-400">{projects.length} visible</p>
      </div>
      <div className="grid max-h-[24rem] grid-cols-1 gap-2 overflow-y-auto pr-1 sm:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => {
          const isHero = HERO_IDS.has(project.id) && currentDay >= project.startDay;
          return (
            <Card
              key={project.id}
              className={cn(
                "rounded-lg border py-3 transition-colors",
                STATUS_STYLES[project.status],
                isHero && "sm:col-span-2 xl:col-span-3 ring-2 ring-white/25"
              )}
            >
              <CardContent className="px-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-white">{project.name}</p>
                    <p className="mt-1 text-xs text-zinc-400">{project.worker.display}</p>
                  </div>
                  <Badge variant="outline" className="border-white/10 bg-black/20 font-mono text-[0.62rem] text-zinc-200">
                    x{project.agentCount}
                  </Badge>
                </div>
                <p className="mt-3 truncate font-mono text-[0.62rem] uppercase tracking-[0.08em] text-current">{project.status.replaceAll("_", " ")}</p>
                {isHero ? <HeroCaseStudy id={project.id} side={side} currentDay={currentDay} /> : null}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
