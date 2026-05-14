"use client";

import type { FleetSnapshot } from "@/lib/domain";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface TokenBurnChartProps {
  ungoverned: FleetSnapshot[];
  governed?: FleetSnapshot[];
  currentDay: number;
}

export function TokenBurnChart({ ungoverned, governed, currentDay }: TokenBurnChartProps) {
  const data = ungoverned.slice(0, currentDay).map((snapshot, index) => ({
    day: snapshot.day,
    ungoverned: snapshot.tokensSpentCumulative,
    governed: governed?.[index]?.tokensSpentCumulative,
  }));

  return (
    <div className="h-56 rounded-lg border border-zinc-800 bg-zinc-950/70 p-3">
      <p className="mb-2 text-xs uppercase tracking-[0.22em] text-zinc-500">Token Burn</p>
      <ResponsiveContainer width="100%" height={188}>
        <LineChart data={data} margin={{ left: -20, right: 8, top: 8, bottom: 0 }}>
          <XAxis dataKey="day" stroke="#71717a" tickLine={false} axisLine={false} tick={{ fontSize: 10 }} />
          <YAxis stroke="#71717a" tickLine={false} axisLine={false} tick={{ fontSize: 10 }} tickFormatter={(value) => `$${Math.round(Number(value) / 1000)}K`} />
          <Tooltip
            contentStyle={{ background: "#09090b", border: "1px solid #27272a", borderRadius: 8, color: "#e4e4e7" }}
            formatter={(value) => [`$${Math.round(Number(value) / 1000)}K`, "Tokens"]}
          />
          <Line type="monotone" dataKey="ungoverned" stroke="#ef4444" strokeWidth={2} dot={false} isAnimationActive={false} />
          {governed ? <Line type="monotone" dataKey="governed" stroke="#10b981" strokeWidth={2} dot={false} isAnimationActive={false} /> : null}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

