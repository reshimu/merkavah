"use client";

import { useCurrentAct } from "@/lib/hooks/useCurrentAct";
import { useCurrentDay } from "@/lib/hooks/useCurrentDay";

function DebugOverlay() {
  const act = useCurrentAct();
  const { ungovernedDay, governedDay } = useCurrentDay();

  return (
    <div className="fixed bottom-4 right-4 z-50 rounded bg-black/80 p-2 font-mono text-xs text-green-400 ring-1 ring-green-400/20">
      Act {act} | Day {ungovernedDay} {governedDay !== null ? `| Gov ${governedDay}` : ""}
    </div>
  );
}

export default function Home() {
  return (
    <main className="relative bg-black text-white" style={{ minHeight: "500vh" }}>
      {/* TODO: Step 6 — Theatre.js cinematography (manual) */}
      {/* Act 0 — Title (0–4%) */}
      <section
        id="act-0"
        className="pointer-events-none sticky top-0 z-10 flex h-screen items-center justify-center"
      >
        <div className="px-8 text-center">
          <p className="mb-6 text-xs uppercase tracking-[0.4em] text-zinc-500">
            Atzmut OS · Runtime Governance
          </p>
          <h1 className="text-7xl font-bold leading-none tracking-[0.25em] text-white md:text-9xl">
            MERKAVAH
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-zinc-400 md:text-lg">
            What happens when 184 autonomous agents work without runtime
            governance — and what happens when they don&apos;t.
          </p>
        </div>
      </section>

      {/* Scroll body — acts will be wired in subsequent steps */}
      <div className="relative z-20">
        <section
          id="act-1"
          className="flex h-screen items-center justify-center border-t border-zinc-800"
        >
          <div className="text-center">
            <p className="text-sm uppercase tracking-widest text-zinc-500">
              Act 1 — Day 1
            </p>
            <p className="mt-2 text-xs text-zinc-600">Dashboard renders here (Step 4)</p>
          </div>
        </section>

        <section
          id="act-5"
          className="flex h-screen items-center justify-center border-t border-zinc-800"
        >
          <div className="text-center">
            <p className="text-sm uppercase tracking-widest text-red-500">
              Act 5 — Day 21 Disaster
            </p>
            <p className="mt-2 text-xs text-zinc-600">Incident banner renders here (Step 4)</p>
          </div>
        </section>

        <section
          id="act-6"
          className="flex h-screen items-center justify-center border-t border-zinc-800"
        >
          <div className="text-center">
            <p className="text-lg text-zinc-400">What if there had been governance?</p>
            <p className="mt-2 text-xs text-zinc-600">Panel split renders here (Step 7)</p>
          </div>
        </section>

        <section
          id="act-9"
          className="flex h-screen items-center justify-center border-t border-zinc-800"
        >
          <div className="text-center">
            <p className="text-sm uppercase tracking-widest text-zinc-500">
              Act 9 — Final Accounting
            </p>
            <p className="mt-2 text-xs text-zinc-600">FinalAccounting table renders here (Step 11)</p>
          </div>
        </section>
      </div>
      <DebugOverlay />
    </main>
  );
}
