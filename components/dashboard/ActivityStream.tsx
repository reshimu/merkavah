import type { Project, ProjectEvent } from "@/lib/domain";

interface ActivityStreamProps {
  projects: Project[];
  currentDay: number;
  side: "ungoverned" | "governed";
}

interface ActivityItem {
  id: string;
  day: number;
  worker: string;
  event: ProjectEvent;
}

export function ActivityStream({ projects, currentDay, side }: ActivityStreamProps) {
  const items: ActivityItem[] = projects
    .flatMap((project) => {
      const events = side === "governed" ? project.governedEvents : project.ungovernedEvents;
      return events
        .filter((event) => event.day <= currentDay)
        .map((event, index) => ({
          id: `${project.id}-${side}-${event.day}-${event.kind}-${index}`,
          day: event.day,
          worker: project.worker.display,
          event,
        }));
    })
    .sort((a, b) => b.day - a.day)
    .slice(0, 8);

  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-950/70 p-3">
      <p className="mb-3 text-xs uppercase tracking-[0.22em] text-zinc-500">Activity Stream</p>
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className="rounded-md border border-zinc-800 bg-black/30 p-2">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-zinc-500">
              Day {item.day} — {item.worker} · {item.event.kind.replaceAll("_", " ")}
            </p>
            <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-zinc-300">{item.event.details}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
