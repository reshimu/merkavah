"use client";

import { useScrollProgress } from "./useScrollProgress";

export type Act = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

const ACT_RANGES: [number, number][] = [
  [0, 0.04],
  [0.04, 0.10],
  [0.10, 0.22],
  [0.22, 0.38],
  [0.38, 0.52],
  [0.52, 0.62],
  [0.62, 0.68],
  [0.68, 0.84],
  [0.84, 0.94],
  [0.94, 1.00],
];

export function getActFromProgress(progress: number): Act {
  for (let i = ACT_RANGES.length - 1; i >= 0; i--) {
    if (progress >= ACT_RANGES[i][0]) return i as Act;
  }
  return 0;
}

export function useCurrentAct(): Act {
  return getActFromProgress(useScrollProgress());
}

export function useActLocalProgress(): number {
  const progress = useScrollProgress();
  const act = getActFromProgress(progress);
  const [start, end] = ACT_RANGES[act];
  return Math.min(1, Math.max(0, (progress - start) / (end - start)));
}
