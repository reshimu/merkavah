interface PanelLabelProps {
  side: "ungoverned" | "governed";
}

export function PanelLabel({ side }: PanelLabelProps) {
  const governed = side === "governed";
  return (
    <div className={governed ? "mb-2 inline-flex rounded-full border border-emerald-500/40 bg-emerald-950/50 px-3 py-1 text-xs uppercase tracking-[0.18em] text-emerald-200" : "mb-2 inline-flex rounded-full border border-amber-500/40 bg-amber-950/50 px-3 py-1 text-xs uppercase tracking-[0.18em] text-amber-200"}>
      {governed ? "ACME INDUSTRIES · Atzmut OS" : "ACME INDUSTRIES · No Governance"}
    </div>
  );
}
