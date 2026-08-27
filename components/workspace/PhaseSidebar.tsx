"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft, Lock, Pencil, Unlock } from "lucide-react";
import { useState } from "react";
import { PHASES } from "@/lib/workflow/config";
import { getOverallProgress, getPhaseProgress, getPhaseStatus, isGateUnlocked } from "@/lib/workflow/progress";
import { useStore } from "@/lib/store";
import { formatDate, isOverdue } from "@/lib/date";
import Avatar from "@/components/ui/Avatar";
import ProjectFormModal from "@/components/projects/ProjectFormModal";
import type { DeliverableStatus, Project } from "@/lib/workflow/types";

const DOT_COLOR: Record<DeliverableStatus, string> = {
  "not-started": "bg-status-gray",
  "in-progress": "bg-status-amber",
  complete: "bg-status-green",
};

export default function PhaseSidebar({ project }: { project: Project }) {
  const router = useRouter();
  const pathname = usePathname();
  const updateProjectDetails = useStore((s) => s.updateProjectDetails);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const overall = getOverallProgress(project);
  const unlocked = isGateUnlocked(project);
  const gateActive = pathname.endsWith("/gate");
  const overdue = isOverdue(project.dueDate, overall.ratio === 1);

  return (
    <aside className="w-60 shrink-0 border-r border-line bg-surface sticky top-14 h-[calc(100vh-56px)] overflow-y-auto thin-scroll flex flex-col">
      <div className="p-4 border-b border-line">
        <button
          onClick={() => router.push("/")}
          className="inline-flex items-center gap-1 text-xs text-ink-muted hover:text-ink cursor-pointer mb-2"
        >
          <ArrowLeft size={12} /> Projects
        </button>
        <div className="flex items-start gap-2">
          <Avatar src={project.avatar} name={project.name} size={32} />
          <div className="flex-1 min-w-0 flex items-start gap-1.5">
            <h1 className="font-serif text-base font-semibold text-ink leading-snug wrap-break-word flex-1">
              {project.name}
            </h1>
            <button
              onClick={() => setSettingsOpen(true)}
              className="h-6 w-6 shrink-0 inline-flex items-center justify-center rounded-md text-ink-muted hover:bg-background hover:text-ink cursor-pointer"
              aria-label="Project settings"
            >
              <Pencil size={12} />
            </button>
          </div>
        </div>
        <p className="text-xs text-ink-muted mt-2 tabular-nums">
          {overall.complete}/{overall.total} deliverables
        </p>
        <p className="text-xs text-ink-muted mt-0.5">
          Started {formatDate(project.startDate)}
          {project.dueDate && (
            <>
              {" · "}
              <span className={overdue ? "text-status-red" : ""}>Due {formatDate(project.dueDate)}</span>
            </>
          )}
        </p>
      </div>

      <nav className="p-2 flex flex-col gap-0.5">
        {PHASES.map((phase) => {
          const { complete, total } = getPhaseProgress(project, phase.id);
          const status = getPhaseStatus(project, phase.id);
          const active = pathname.includes(`/${phase.id}`);
          return (
            <Link
              key={phase.id}
              href={`/projects/${project.id}/${phase.id}`}
              className={`flex items-center gap-2 rounded-md border-l-2 pl-2 pr-2.5 py-2 text-sm transition-colors ${
                active
                  ? "border-accent bg-background text-ink font-medium"
                  : "border-transparent text-ink-muted hover:bg-background hover:text-ink"
              }`}
            >
              <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${DOT_COLOR[status]}`} />
              <span className="flex-1 truncate">
                {phase.index}. {phase.title}
              </span>
              <span className="text-xs text-ink-disabled tabular-nums shrink-0">
                {complete}/{total}
              </span>
            </Link>
          );
        })}

        <div className="my-2 border-t border-line" />

        <Link
          href={`/projects/${project.id}/gate`}
          className={`flex items-center gap-2 rounded-md border-l-2 pl-2 pr-2.5 py-2 text-sm transition-colors ${
            gateActive
              ? "border-accent bg-background text-ink font-medium"
              : "border-transparent text-ink-muted hover:bg-background hover:text-ink"
          }`}
        >
          {unlocked ? <Unlock size={13} className="shrink-0" /> : <Lock size={13} className="shrink-0" />}
          <span className="flex-1 truncate">Pre-Figma Gate</span>
        </Link>
      </nav>

      <ProjectFormModal
        key={project.id}
        open={settingsOpen}
        project={project}
        onClose={() => setSettingsOpen(false)}
        onSubmit={(patch) => updateProjectDetails(project.id, patch)}
      />
    </aside>
  );
}
