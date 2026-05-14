"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { Act } from "@/lib/hooks/useCurrentAct";
import type { FleetSnapshot, Incident, Project, Worker } from "@/lib/domain";
import { DivergenceArrow } from "./DivergenceArrow";
import { FleetPanel } from "./FleetPanel";
import { PanelLabel } from "./PanelLabel";

interface PanelSplitProps {
  act: Act;
  ungovernedSnapshot: FleetSnapshot;
  governedSnapshot: FleetSnapshot | null;
  ungovernedDay: number;
  governedDay: number | null;
  ungovernedProjects: Project[];
  governedProjects: Project[];
  workers: Worker[];
  ungovernedIncidents: Incident[];
  governedIncidents: Incident[];
  ungovernedSnapshots: FleetSnapshot[];
  governedSnapshots: FleetSnapshot[];
}

export function PanelSplit({
  act,
  ungovernedSnapshot,
  governedSnapshot,
  ungovernedDay,
  governedDay,
  ungovernedProjects,
  governedProjects,
  workers,
  ungovernedIncidents,
  governedIncidents,
  ungovernedSnapshots,
  governedSnapshots,
}: PanelSplitProps) {
  const showGoverned = act >= 6 && governedSnapshot !== null;
  const activeGovernedDay = governedDay ?? 1;

  return (
    <div className="w-full">
      <AnimatePresence initial={false} mode="popLayout">
        {!showGoverned ? (
          <motion.div
            key="single"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="mx-auto max-w-7xl"
          >
            <PanelLabel side="ungoverned" />
            <FleetPanel
              side="ungoverned"
              snapshot={ungovernedSnapshot}
              currentDay={ungovernedDay}
              projects={ungovernedProjects}
              workers={workers}
              incidents={ungovernedIncidents}
              ungovernedSnapshots={ungovernedSnapshots}
            />
          </motion.div>
        ) : (
          <motion.div key="split" className="flex w-full items-start gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <motion.div className="min-w-0 flex-1" initial={{ x: 120 }} animate={{ x: 0 }} transition={{ duration: 0.45 }}>
              <PanelLabel side="ungoverned" />
              <FleetPanel
                side="ungoverned"
                snapshot={ungovernedSnapshot}
                currentDay={ungovernedDay}
                projects={ungovernedProjects}
                workers={workers}
                incidents={ungovernedIncidents}
                ungovernedSnapshots={ungovernedSnapshots}
              />
            </motion.div>
            {act >= 7 ? <DivergenceArrow ungoverned={ungovernedSnapshot} governed={governedSnapshot} /> : null}
            <motion.div className="min-w-0 flex-1" initial={{ x: 220, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.55 }}>
              <PanelLabel side="governed" />
              <FleetPanel
                side="governed"
                snapshot={governedSnapshot}
                currentDay={activeGovernedDay}
                projects={governedProjects}
                workers={workers}
                incidents={governedIncidents}
                ungovernedSnapshots={ungovernedSnapshots}
                governedSnapshots={governedSnapshots}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
