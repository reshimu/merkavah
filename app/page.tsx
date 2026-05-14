export default function Home() {
  return (
    <main className="relative bg-black text-white" style={{ minHeight: "500vh" }}>
      {/* Act 0 — Title (0–4%) */}
      <section
        id="act-0"
        className="sticky top-0 h-screen flex items-center justify-center z-10 pointer-events-none"
      >
        <div className="text-center px-8">
          <p className="text-xs tracking-[0.4em] text-zinc-500 uppercase mb-6">
            Atzmut OS · Runtime Governance
          </p>
          <h1 className="text-7xl md:text-9xl font-bold tracking-[0.25em] text-white leading-none">
            MERKAVAH
          </h1>
          <p className="mt-8 text-zinc-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            What happens when 184 autonomous agents work without runtime
            governance — and what happens when they don&apos;t.
          </p>
        </div>
      </section>

      {/* Scroll body — acts will be wired in subsequent steps */}
      <div className="relative z-20">
        {/* Act 1 placeholder */}
        <section
          id="act-1"
          className="h-screen flex items-center justify-center border-t border-zinc-800"
        >
          <div className="text-center">
            <p className="text-zinc-500 text-sm tracking-widest uppercase">
              Act 1 — Day 1
            </p>
            <p className="text-zinc-600 text-xs mt-2">Dashboard renders here (Step 4)</p>
          </div>
        </section>

        {/* Act 5 placeholder — disaster */}
        <section
          id="act-5"
          className="h-screen flex items-center justify-center border-t border-zinc-800"
        >
          <div className="text-center">
            <p className="text-red-500 text-sm tracking-widest uppercase">
              Act 5 — Day 21 Disaster
            </p>
            <p className="text-zinc-600 text-xs mt-2">Incident banner renders here (Step 4)</p>
          </div>
        </section>

        {/* Act 6 placeholder — reset */}
        <section
          id="act-6"
          className="h-screen flex items-center justify-center border-t border-zinc-800"
        >
          <div className="text-center">
            <p className="text-zinc-400 text-lg">What if there had been governance?</p>
            <p className="text-zinc-600 text-xs mt-2">Panel split renders here (Step 7)</p>
          </div>
        </section>

        {/* Act 9 placeholder — final accounting */}
        <section
          id="act-9"
          className="h-screen flex items-center justify-center border-t border-zinc-800"
        >
          <div className="text-center">
            <p className="text-zinc-500 text-sm tracking-widest uppercase">
              Act 9 — Final Accounting
            </p>
            <p className="text-zinc-600 text-xs mt-2">FinalAccounting table renders here (Step 11)</p>
          </div>
        </section>
      </div>
    </main>
  );
}
