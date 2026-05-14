"use client";

import { useCurrentAct, useActLocalProgress } from "./useCurrentAct";

export function useCurrentDay(): { ungovernedDay: number; governedDay: number | null } {
  const act = useCurrentAct();
  const localProgress = useActLocalProgress();
  const dayFromProgress = Math.min(21, Math.max(1, Math.round(1 + localProgress * 20)));

  if (act >= 1 && act <= 5) return { ungovernedDay: dayFromProgress, governedDay: null };
  if (act === 6) return { ungovernedDay: 21, governedDay: null };
  if (act === 7) return { ungovernedDay: 21, governedDay: dayFromProgress };
  if (act >= 8) return { ungovernedDay: 30, governedDay: 30 };
  return { ungovernedDay: 1, governedDay: null };
}
