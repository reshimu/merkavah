import type { FleetSnapshot } from "@/lib/domain";
import { Card, CardContent } from "@/components/ui/card";
import { formatTokenCost } from "./format";

interface HeroMetricsProps {
  snapshot: FleetSnapshot;
  side: "ungoverned" | "governed";
}

export function HeroMetrics({ snapshot, side }: HeroMetricsProps) {
  const metrics = [
    { label: "Total Projects", value: snapshot.totalProjects.toString(), tone: "text-zinc-100" },
    { label: "Active Projects", value: snapshot.activeProjects.toString(), tone: "text-zinc-100" },
    { label: "Tokens Today", value: formatTokenCost(snapshot.tokensSpentToday), tone: side === "governed" ? "text-emerald-300" : "text-amber-300" },
    { label: "Incidents", value: snapshot.incidentsCumulative.toString(), tone: snapshot.incidentsCumulative > 0 ? "text-red-400" : "text-zinc-400" },
  ];

  if (side === "governed") {
    metrics.push({ label: "Beiur Today", value: String(snapshot.beiurReportsToday ?? 0), tone: "text-sky-300" });
  }

  return (
    <div className="grid grid-cols-2 gap-2 lg:grid-cols-5">
      {metrics.map((metric) => (
        <Card key={metric.label} className="rounded-lg border-zinc-800 bg-zinc-950/80 py-3">
          <CardContent className="px-3">
            <p className="text-[0.65rem] uppercase tracking-[0.18em] text-zinc-500">{metric.label}</p>
            <p className={`mt-2 font-mono text-2xl font-semibold tabular-nums ${metric.tone}`}>{metric.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
