import { PHASES } from "./config";
import type { DeliverableStatus, Project } from "./types";

export function getDeliverableStatus(project: Project, deliverableId: string): DeliverableStatus {
  return project.deliverables[deliverableId]?.status ?? "not-started";
}

export function getPhaseProgress(project: Project, phaseId: string) {
  const phase = PHASES.find((p) => p.id === phaseId);
  if (!phase) return { total: 0, complete: 0, ratio: 0 };
  const total = phase.deliverables.length;
  const complete = phase.deliverables.filter(
    (d) => getDeliverableStatus(project, d.id) === "complete"
  ).length;
  return { total, complete, ratio: total === 0 ? 0 : complete / total };
}

export function getPhaseStatus(project: Project, phaseId: string): DeliverableStatus {
  const { total, complete } = getPhaseProgress(project, phaseId);
  if (complete === 0) return "not-started";
  if (complete === total) return "complete";
  return "in-progress";
}

export function isGateUnlocked(project: Project): boolean {
  return PHASES.every((p) => getPhaseStatus(project, p.id) === "complete");
}

export function getOverallProgress(project: Project) {
  const total = PHASES.reduce((sum, p) => sum + p.deliverables.length, 0);
  const complete = PHASES.reduce(
    (sum, p) => sum + getPhaseProgress(project, p.id).complete,
    0
  );
  return { total, complete, ratio: total === 0 ? 0 : complete / total };
}
