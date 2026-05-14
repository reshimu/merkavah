import type { Chayyah, Project, ProjectEvent } from "@/lib/domain";
import { Badge } from "@/components/ui/badge";

const CHAYYAH_LABELS: Record<Chayyah, string> = {
  ARYEH: "ARYEH",
  SHOR: "SHOR",
  NESHER: "NESHER",
  PANIM_ADAM: "PANIM ADAM",
};

interface BeiurCardProps {
  project: Project;
  event: ProjectEvent;
  currentDay: number;
}

function inferChayyah(project: Project, event: ProjectEvent): Chayyah | undefined {
  if (event.chayyah) return event.chayyah;
  return [...project.governedEvents]
    .reverse()
    .find((candidate) => candidate.day <= event.day && candidate.chayyah)?.chayyah;
}

export function BeiurCard({ project, event, currentDay }: BeiurCardProps) {
  const chayyah = inferChayyah(project, event);
  const resolution = project.governedEvents.find(
    (candidate) => candidate.kind === "beiur_resolved" && candidate.beiurReportId === event.beiurReportId && candidate.day <= currentDay
  );
  const resolutionTone = resolution?.resolution === "approved"
    ? "border-emerald-500/50 text-emerald-200"
    : resolution?.resolution === "denied"
      ? "border-red-500/50 text-red-200"
      : "border-amber-500/50 text-amber-200";

  return (
    <div className="rounded-md border border-sky-500/30 bg-sky-950/30 p-2">
      <div className="flex items-center justify-between gap-2">
        <p className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-sky-200">
          {chayyah ? CHAYYAH_LABELS[chayyah] : "BEIUR"} · {event.beiurReportId}
        </p>
        {resolution ? (
          <Badge variant="outline" className={resolutionTone}>{resolution.resolution?.toUpperCase()}</Badge>
        ) : null}
      </div>
      <p className="mt-1 line-clamp-3 text-xs leading-relaxed text-zinc-200">{event.details}</p>
    </div>
  );
}
