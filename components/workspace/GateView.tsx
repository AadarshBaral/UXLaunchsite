"use client";

import { CheckCircle2, Lock } from "lucide-react";
import { PHASES } from "@/lib/workflow/config";
import { getPhaseProgress, getPhaseStatus, isGateUnlocked } from "@/lib/workflow/progress";
import { generateHandoffDocument } from "@/lib/workflow/markdown";
import { copyToClipboard, downloadFile, slugify } from "@/lib/export";
import StatusDot from "@/components/ui/Dot";
import Button from "@/components/ui/Button";
import type { Project } from "@/lib/workflow/types";

export default function GateView({
  project,
  onReview,
}: {
  project: Project;
  onReview: (phaseId: string) => void;
}) {
  const unlocked = isGateUnlocked(project);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-serif text-lg font-semibold text-ink">Pre-Figma Gate</h2>
        <p className="text-sm text-ink-muted mt-1">
          All 5 phase criteria must be signed off before this project can move into Figma.
        </p>
      </div>

      <div className="border border-line rounded-md overflow-hidden">
        {PHASES.map((phase) => {
          const { complete, total } = getPhaseProgress(project, phase.id);
          const status = getPhaseStatus(project, phase.id);
          return (
            <div
              key={phase.id}
              className="flex items-center justify-between px-4 h-12 border-b border-line last:border-b-0"
            >
              <div className="flex items-center gap-3">
                <StatusDot status={status} label={`${phase.index}. ${phase.title}`} />
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-ink-muted tabular-nums">
                  {complete}/{total} complete
                </span>
                <Button variant="ghost" size="sm" onClick={() => onReview(phase.id)}>
                  Review
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      <div
        className={`border rounded-md px-4 py-4 flex items-center justify-between gap-4 ${
          unlocked ? "border-status-green/40" : "border-line"
        }`}
      >
        <div className="flex items-center gap-2.5">
          {unlocked ? (
            <CheckCircle2 size={18} className="text-status-green shrink-0" />
          ) : (
            <Lock size={16} className="text-ink-disabled shrink-0" />
          )}
          <p className="text-sm text-ink">
            {unlocked
              ? "All phases signed off — ready for Figma."
              : "Finish every deliverable across all 5 phases to unlock the Figma handoff."}
          </p>
        </div>
        <Button
          variant="primary"
          size="sm"
          disabled={!unlocked}
          onClick={async () => {
            const doc = generateHandoffDocument(project);
            await copyToClipboard(doc);
            downloadFile(`${slugify(project.name)}-figma-handoff.md`, doc, "text/markdown");
            alert("Handoff summary copied to clipboard and downloaded as Markdown.");
          }}
        >
          Copy Figma handoff summary
        </Button>
      </div>
    </div>
  );
}
