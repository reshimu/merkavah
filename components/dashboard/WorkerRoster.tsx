import type { Worker } from "@/lib/domain";
import { hashString } from "./format";

interface WorkerRosterProps {
  workers: Worker[];
  workerStressIndex: number;
}

export function WorkerRoster({ workers, workerStressIndex }: WorkerRosterProps) {
  const stressHue = 24 - Math.round(workerStressIndex * 0.12);
  const saturation = 12 + Math.round(workerStressIndex * 0.72);

  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-950/70 p-3">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">Workers</p>
        <p className="font-mono text-xs text-zinc-400">Stress {workerStressIndex}</p>
      </div>
      <div className="grid grid-cols-[repeat(7,1.65rem)] gap-1.5 sm:grid-cols-[repeat(10,1.65rem)]">
        {workers.map((worker) => {
          const lightness = 34 + (hashString(worker.avatarSeed) % 18);
          return (
            <div
              key={worker.id}
              title={`${worker.display} · ${worker.team}`}
              className="flex size-6 items-center justify-center rounded-full text-[0.55rem] font-semibold text-black ring-1 ring-white/10 transition-transform hover:scale-125"
              style={{ backgroundColor: `hsl(${stressHue} ${saturation}% ${lightness}%)` }}
            >
              {worker.display.slice(0, 1)}
            </div>
          );
        })}
      </div>
    </div>
  );
}
