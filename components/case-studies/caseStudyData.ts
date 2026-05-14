import type { Project } from "@/lib/domain";
import projects from "@/lib/data/projects.json";

export interface CaseStudyProps {
  side: "ungoverned" | "governed";
  currentDay: number;
}

export function getHeroProject(id: string): Project {
  const project = (projects as Project[]).find((item) => item.id === id);
  if (!project) throw new Error(`Missing hero project ${id}`);
  return project;
}

export function getVisibleEvents(project: Project, side: "ungoverned" | "governed", currentDay: number) {
  const events = side === "governed" ? project.governedEvents : project.ungovernedEvents;
  return events.filter((event) => event.day <= currentDay);
}
