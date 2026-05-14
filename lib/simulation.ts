import type { Simulation, FleetSnapshot, Project, Incident, Worker } from "./domain";
import workers from "./data/workers.json";
import projects from "./data/projects.json";
import incidents from "./data/incidents.json";
import ungovernedSnapshots from "./data/ungoverned-simulation.json";
import governedSnapshots from "./data/governed-simulation.json";

// Type assertions — JSON imports are typed as `any` by default
const simulation: Simulation = {
  ungoverned: ungovernedSnapshots as FleetSnapshot[],
  governed: governedSnapshots as FleetSnapshot[],
  workers: workers as Worker[],
  projects: projects as Project[],
  incidents: incidents as Incident[],
};

export function getSimulation(): Simulation {
  return simulation;
}

export function getUngovernedSnapshot(day: number): FleetSnapshot {
  if (day < 1 || day > 30) throw new RangeError(`Day must be 1–30, got ${day}`);
  return simulation.ungoverned[day - 1];
}

export function getGovernedSnapshot(day: number): FleetSnapshot {
  if (day < 1 || day > 30) throw new RangeError(`Day must be 1–30, got ${day}`);
  return simulation.governed[day - 1];
}

export function getProjectsForDay(day: number): Project[] {
  return simulation.projects.filter((p) => p.startDay <= day);
}

export function getIncidentsForDay(day: number, side: "ungoverned" | "governed" | "both"): Incident[] {
  return simulation.incidents.filter(
    (i) => i.day === day && (i.side === side || i.side === "both")
  );
}

