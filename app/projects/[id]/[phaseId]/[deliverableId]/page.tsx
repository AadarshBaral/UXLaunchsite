"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Download } from "lucide-react";
import { useStore, useProject } from "@/lib/store";
import { getDeliverableConfig } from "@/lib/workflow/config";
import { runExport } from "@/lib/workflow/exportActions";
import Button from "@/components/ui/Button";
import Menu from "@/components/ui/Menu";
import TemplateBody from "@/components/workspace/TemplateBody";

export default function DeliverablePage({
  params,
}: {
  params: Promise<{ id: string; phaseId: string; deliverableId: string }>;
}) {
  const { id, phaseId, deliverableId } = use(params);
  const project = useProject(id);
  const updateDeliverableData = useStore((s) => s.updateDeliverableData);
  const setDeliverableStatus = useStore((s) => s.setDeliverableStatus);

  const config = getDeliverableConfig(deliverableId);
  const state = project?.deliverables[deliverableId];

  if (!project) return null;

  if (!config || !state) {
    return <p className="text-sm text-ink-muted">This deliverable doesn&apos;t exist.</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <Link
            href={`/projects/${id}/${phaseId}`}
            className="inline-flex items-center gap-1 text-xs text-ink-muted hover:text-ink mb-2"
          >
            <ArrowLeft size={12} /> Back to phase
          </Link>
          <h1 className="font-serif text-xl font-semibold text-ink">{config.title}</h1>
          <p className="text-sm text-ink-muted mt-1">{config.description}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Menu
            trigger={<Download size={15} />}
            items={config.exportFormats.map((format) => ({
              label: format,
              onSelect: () => runExport(format, config, state.data),
            }))}
          />
          <Button
            size="sm"
            variant={state.status === "complete" ? "primary" : "secondary"}
            onClick={() =>
              setDeliverableStatus(
                project.id,
                deliverableId,
                state.status === "complete" ? "in-progress" : "complete"
              )
            }
          >
            <Check size={14} />
            {state.status === "complete" ? "Completed" : "Mark complete"}
          </Button>
        </div>
      </div>

      <TemplateBody
        config={config}
        data={state.data}
        onChange={(data) => updateDeliverableData(project.id, deliverableId, data)}
      />
    </div>
  );
}
