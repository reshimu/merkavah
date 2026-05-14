export type Team = "Engineering" | "Finance" | "Marketing" | "Operations" | "Data";

export interface Worker {
  id: string;           // e.g. "eng-014"
  display: string;      // e.g. "Alex C."
  team: Team;
  avatarSeed: string;   // deterministic avatar seed string
}

export type ProjectStatus =
  | "ON_TRACK"
  | "DRIFTING"
  | "SCOPE_CREEPING"
  | "BURNING_TOKENS"
  | "DEATH_LOOP"
  | "HALTED_BY_GOVERNANCE"
  | "AWAITING_BEIUR"
  | "COMPLETED";

export type ProjectEventKind =
  | "started"
  | "scope_expanded"
  | "added_subagent"
  | "tokens_spiked"
  | "irreversible_action_attempted"
  | "irreversible_action_committed"
  | "hallucinated_completion"
  | "death_loop_entered"
  | "death_loop_detected"
  | "governance_intercept"
  | "beiur_filed"
  | "beiur_resolved"
  | "halted"
  | "completed";

export type Chayyah = "ARYEH" | "SHOR" | "NESHER" | "PANIM_ADAM";

export interface ProjectEvent {
  day: number;
  kind: ProjectEventKind;
  details?: string;
  scopeFrom?: string;
  scopeTo?: string;
  costUSD?: number;
  chayyah?: Chayyah;
  beiurReportId?: string;
  resolution?: "approved" | "denied" | "altered";
}

export interface Project {
  id: string;
  worker: Worker;
  name: string;
  originalGoal: string;
  currentGoal: string;
  agentCount: number;
  tokensSpentCumulative: number;
  status: ProjectStatus;
  startDay: number;
  ungovernedEvents: ProjectEvent[];
  governedEvents: ProjectEvent[];
}

export type IncidentSeverity = "minor" | "major" | "critical";

export interface Incident {
  day: number;
  severity: IncidentSeverity;
  title: string;
  description: string;
  costUSD: number;
  projectId: string;
  side: "ungoverned" | "governed" | "both";
}

export interface FleetSnapshot {
  day: number;
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  haltedProjects: number;
  tokensSpentToday: number;
  tokensSpentCumulative: number;
  incidentsToday: number;
  incidentsCumulative: number;
  workerStressIndex: number;       // 0..100
  taskCompletionRate: number;      // 0..1
  // governed-side only:
  beiurReportsToday?: number;
  beiurReportsCumulative?: number;
  reshimuChainsIntact?: number;
  interceptsToday?: Record<Chayyah, number>;
}

export interface Simulation {
  ungoverned: FleetSnapshot[];
  governed: FleetSnapshot[];
  workers: Worker[];
  projects: Project[];
  incidents: Incident[];
}

export interface DashboardState {
  currentDay: number;
  ungovernedSnapshot: FleetSnapshot;
  governedSnapshot: FleetSnapshot | null;
  activePanels: ("ungoverned" | "governed")[];
  highlightedProjectId: string | null;
  activeIncident: Incident | null;
  governedRaceMode: boolean;
}

export type DashboardAction =
  | { type: "advance_day" }
  | { type: "set_day"; day: number; side: "ungoverned" | "governed" }
  | { type: "trigger_reset" }
  | { type: "begin_race"; targetDay: number }
  | { type: "highlight_project"; projectId: string }
  | { type: "show_incident"; incident: Incident };
