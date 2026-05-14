import type { FleetSnapshot, Incident, Project, Worker } from "@/lib/domain";
import { ActivityStream } from "./ActivityStream";
import { DayCounter } from "./DayCounter";
import { HeroMetrics } from "./HeroMetrics";
import { IncidentBanner } from "./IncidentBanner";
import { ProjectGrid } from "./ProjectGrid";
import { TokenBurnChart } from "./TokenBurnChart";
import { WorkerRoster } from "./WorkerRoster";

interface FleetPanelProps {
  side: "ungoverned" | "governed";
  snapshot: FleetSnapshot;
  currentDay: number;
  projects: Project[];
  workers: Worker[];
  incidents: Incident[];
  ungovernedSnapshots: FleetSnapshot[];
  governedSnapshots?: FleetSnapshot[];
}

export function FleetPanel({
  side,
  snapshot,
  currentDay,
  projects,
  workers,
  incidents,
  ungovernedSnapshots,
  governedSnapshots,
}: FleetPanelProps) {
  return (
    <div className="w-full rounded-lg border border-zinc-800 bg-black/82 p-4 shadow-2xl shadow-black/60 backdrop-blur md:p-5">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-zinc-500">Internal Agent Fleet</p>
          <h2 className="mt-1 text-xl font-semibold text-white">ACME INDUSTRIES</h2>
        </div>
        <DayCounter day={snapshot.day} />
      </div>
      <div className="space-y-4">
        <IncidentBanner incidents={incidents} side={side} />
        <HeroMetrics snapshot={snapshot} side={side} />
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_17rem]">
          <div className="space-y-4">
            <TokenBurnChart
              ungoverned={ungovernedSnapshots}
              governed={side === "governed" ? governedSnapshots : undefined}
              currentDay={currentDay}
            />
            <ProjectGrid projects={projects} currentDay={currentDay} side={side} />
          </div>
          <div className="space-y-4">
            <WorkerRoster workers={workers} workerStressIndex={snapshot.workerStressIndex} />
            <ActivityStream projects={projects} currentDay={currentDay} side={side} />
          </div>
        </div>
      </div>
    </div>
  );
}
