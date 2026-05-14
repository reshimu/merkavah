import type { FleetSnapshot } from "@/lib/domain";
import { formatTokenCost } from "./format";

interface DivergenceArrowProps {
  ungoverned: FleetSnapshot;
  governed: FleetSnapshot;
}

export function DivergenceArrow({ ungoverned, governed }: DivergenceArrowProps) {
  const delta = ungoverned.tokensSpentCumulative - governed.tokensSpentCumulative;
  return (
    <div className="hidden w-28 shrink-0 flex-col items-center justify-center xl:flex">
      <p className="font-mono text-xs text-red-300">{formatTokenCost(ungoverned.tokensSpentCumulative)}</p>
      <div className="my-2 h-px w-full bg-gradient-to-r from-red-500 via-zinc-500 to-emerald-500" />
      <p className="rounded-full border border-zinc-700 bg-black px-2 py-1 font-mono text-[0.62rem] text-zinc-200">Δ {formatTokenCost(delta)}</p>
      <div className="my-2 h-px w-full bg-gradient-to-r from-red-500 via-zinc-500 to-emerald-500" />
      <p className="font-mono text-xs text-emerald-300">{formatTokenCost(governed.tokensSpentCumulative)}</p>
    </div>
  );
}
