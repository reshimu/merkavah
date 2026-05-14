import type { DashboardState, DashboardAction, FleetSnapshot, Incident } from "./domain";

// The reducer receives the full simulation arrays as context.
// They are passed at initialization, not fetched inside the reducer.
export interface ReducerContext {
  ungovernedSnapshots: FleetSnapshot[];   // index 0 = Day 1
  governedSnapshots: FleetSnapshot[];
}

export function reduceDashboard(
  state: DashboardState,
  action: DashboardAction,
  ctx: ReducerContext
): DashboardState {
  switch (action.type) {
    case "advance_day": {
      const nextDay = Math.min(state.currentDay + 1, 30);
      const ungovernedSnapshot = ctx.ungovernedSnapshots[nextDay - 1];
      const governedSnapshot = state.governedRaceMode
        ? ctx.governedSnapshots[nextDay - 1]
        : state.governedSnapshot;
      // Check for incidents on nextDay (ungoverned side only, unless side: "both")
      return {
        ...state,
        currentDay: nextDay,
        ungovernedSnapshot,
        governedSnapshot,
      };
    }

    case "set_day": {
      const snap =
        action.side === "ungoverned"
          ? ctx.ungovernedSnapshots[action.day - 1]
          : ctx.governedSnapshots[action.day - 1];
      return {
        ...state,
        currentDay: action.day,
        ungovernedSnapshot:
          action.side === "ungoverned" ? snap : state.ungovernedSnapshot,
        governedSnapshot:
          action.side === "governed" ? snap : state.governedSnapshot,
      };
    }

    case "trigger_reset": {
      return {
        ...state,
        governedSnapshot: null,
        governedRaceMode: false,
        activeIncident: null,
      };
    }

    case "begin_race": {
      return {
        ...state,
        governedRaceMode: true,
        governedSnapshot: ctx.governedSnapshots[0],
      };
    }

    case "highlight_project": {
      return {
        ...state,
        highlightedProjectId: action.projectId,
      };
    }

    case "show_incident": {
      return {
        ...state,
        activeIncident: action.incident,
      };
    }

    default: {
      // Exhaustiveness check — TypeScript will error here if a case is missing
      const _exhaustive: never = action;
      return state;
    }
  }
}

export function makeInitialState(
  ctx: ReducerContext
): DashboardState {
  return {
    currentDay: 1,
    ungovernedSnapshot: ctx.ungovernedSnapshots[0],
    governedSnapshot: null,
    activePanels: ["ungoverned"],
    highlightedProjectId: null,
    activeIncident: null,
    governedRaceMode: false,
  };
}

