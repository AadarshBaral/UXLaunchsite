import StatusDot from "@/components/ui/Dot";
import type { PhaseConfig, Project } from "@/lib/workflow/types";
import { ChevronRight } from "lucide-react";

function formatDate(iso?: string) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

export default function DeliverablesTable({
  phase,
  project,
  onOpen,
}: {
  phase: PhaseConfig;
  project: Project;
  onOpen: (deliverableId: string) => void;
}) {
  return (
    <div className="border border-line rounded-md overflow-x-auto thin-scroll">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-line bg-surface text-xs font-medium text-ink-muted">
            <th className="text-left px-3 sm:px-4 py-2 font-medium w-28 sm:w-36">
              Status
            </th>
            <th className="text-left px-3 sm:px-4 py-2 font-medium">
              Deliverable
            </th>
            <th className="text-left px-4 py-2 font-medium w-28 hidden sm:table-cell">
              Updated
            </th>
            <th className="w-8 sm:w-10" />
          </tr>
        </thead>
        <tbody>
          {phase.deliverables.map((deliverable) => {
            const state = project.deliverables[deliverable.id];
            return (
              <tr
                key={deliverable.id}
                onClick={() => onOpen(deliverable.id)}
                className="border-b border-line last:border-b-0 h-11 hover:bg-surface cursor-pointer transition-colors"
              >
                <td className="px-3 sm:px-4 py-2">
                  <StatusDot status={state?.status ?? "not-started"} />
                </td>
                <td className="px-3 sm:px-4 py-2">
                  <div className="font-medium text-ink text-xs sm:text-sm">
                    {deliverable.title}
                  </div>
                  <div className="text-xs text-ink-muted truncate max-w-[200px] sm:max-w-none">
                    {deliverable.description}
                  </div>
                </td>
                <td className="px-4 py-2 text-ink-muted hidden sm:table-cell">
                  {formatDate(state?.updatedAt)}
                </td>
                <td className="px-2 py-2 text-right text-ink-disabled">
                  <ChevronRight size={14} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
