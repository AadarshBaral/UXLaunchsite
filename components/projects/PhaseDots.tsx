import { PHASES } from "@/lib/workflow/config";
import { getPhaseStatus } from "@/lib/workflow/progress";
import type { Project } from "@/lib/workflow/types";

const COLOR = {
  "not-started": "bg-status-gray",
  "in-progress": "bg-status-amber",
  complete: "bg-status-green",
} as const;

export default function PhaseDots({ project }: { project: Project }) {
  return (
    <div className="flex items-center gap-1.5" title="Phase progress">
      {PHASES.map((phase) => {
        const status = getPhaseStatus(project, phase.id);
        return (
          <span
            key={phase.id}
            title={`${phase.title}: ${status.replace("-", " ")}`}
            className={`h-1.5 w-1.5 rounded-full ${COLOR[status]}`}
          />
        );
      })}
    </div>
  );
}
