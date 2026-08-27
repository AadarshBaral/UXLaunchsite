"use client";

import ProjectFormModal from "@/components/projects/ProjectFormModal";
import Avatar from "@/components/ui/Avatar";
import { formatDate, isOverdue } from "@/lib/date";
import { useStore } from "@/lib/store";
import { PHASES } from "@/lib/workflow/config";
import {
  getOverallProgress,
  getPhaseProgress,
  getPhaseStatus,
  isGateUnlocked,
} from "@/lib/workflow/progress";
import type { DeliverableStatus, Project } from "@/lib/workflow/types";
import { ArrowLeft, ChevronDown, Lock, Pencil, Unlock, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const overall = getOverallProgress(project);
  const unlocked = isGateUnlocked(project);
  const gateActive = pathname.endsWith("/gate");
  const overdue = isOverdue(project.dueDate, overall.ratio === 1);

  const currentPhase = PHASES.find((p) => pathname.includes(`/${p.id}`));
  const currentLabel = gateActive
    ? "Pre-Figma Gate"
    : currentPhase
      ? `${currentPhase.index}. ${currentPhase.title}`
      : "Select Phase";

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden sticky top-14 z-20 border-b border-line bg-surface px-4 py-2 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <button
            onClick={() => router.push("/")}
            className="text-ink-muted hover:text-ink p-1 -ml-1 rounded cursor-pointer"
            aria-label="Back to projects"
          >
            <ArrowLeft size={16} />
          </button>
          <Avatar src={project.avatar} name={project.name} size={22} />
          <span className="font-serif text-sm font-semibold text-ink truncate max-w-[120px]">
            {project.name}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setSettingsOpen(true)}
            className="h-8 w-8 inline-flex items-center justify-center rounded-md text-ink-muted hover:bg-background hover:text-ink cursor-pointer"
            aria-label="Project settings"
          >
            <Pencil size={13} />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-line bg-background text-xs font-medium text-ink cursor-pointer shadow-xs"
          >
            <span className="truncate max-w-[130px]">{currentLabel}</span>
            <ChevronDown
              size={13}
              className={`shrink-0 transition-transform ${mobileMenuOpen ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 top-[98px]">
          <div
            className="absolute inset-0 bg-ink/20 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative border-b border-line bg-background p-4 shadow-lg flex flex-col gap-3 max-h-[calc(100vh-120px)] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-line">
              <div>
                <div className="text-xs text-ink-muted tabular-nums">
                  {overall.complete}/{overall.total} deliverables complete
                </div>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-ink-muted hover:text-ink p-1"
                aria-label="Close menu"
              >
                <X size={16} />
              </button>
            </div>

            <nav className="flex flex-col gap-1">
              {PHASES.map((phase) => {
                const { complete, total } = getPhaseProgress(project, phase.id);
                const status = getPhaseStatus(project, phase.id);
                const active = pathname.includes(`/${phase.id}`);
                return (
                  <Link
                    key={phase.id}
                    href={`/projects/${project.id}/${phase.id}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-2 rounded-md border-l-2 pl-2.5 pr-2.5 py-2.5 text-sm transition-colors ${
                      active
                        ? "border-accent bg-surface text-ink font-medium"
                        : "border-transparent text-ink-muted hover:bg-surface hover:text-ink"
                    }`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full shrink-0 ${DOT_COLOR[status]}`}
                    />
                    <span className="flex-1 truncate">
                      {phase.index}. {phase.title}
                    </span>
                    <span className="text-xs text-ink-disabled tabular-nums shrink-0">
                      {complete}/{total}
                    </span>
                  </Link>
                );
              })}

              <div className="my-1 border-t border-line" />

              <Link
                href={`/projects/${project.id}/gate`}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2 rounded-md border-l-2 pl-2.5 pr-2.5 py-2.5 text-sm transition-colors ${
                  gateActive
                    ? "border-accent bg-surface text-ink font-medium"
                    : "border-transparent text-ink-muted hover:bg-surface hover:text-ink"
                }`}
              >
                {unlocked ? (
                  <Unlock size={14} className="shrink-0 text-status-green" />
                ) : (
                  <Lock size={14} className="shrink-0" />
                )}
                <span className="flex-1 truncate">Pre-Figma Gate</span>
              </Link>
            </nav>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-60 shrink-0 border-r border-line bg-surface sticky top-14 h-[calc(100vh-56px)] overflow-y-auto thin-scroll flex-col">
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
                <span className={overdue ? "text-status-red" : ""}>
                  Due {formatDate(project.dueDate)}
                </span>
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
                <span
                  className={`h-1.5 w-1.5 rounded-full shrink-0 ${DOT_COLOR[status]}`}
                />
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
            {unlocked ? (
              <Unlock size={13} className="shrink-0" />
            ) : (
              <Lock size={13} className="shrink-0" />
            )}
            <span className="flex-1 truncate">Pre-Figma Gate</span>
          </Link>
        </nav>
      </aside>

      <ProjectFormModal
        key={project.id}
        open={settingsOpen}
        project={project}
        onClose={() => setSettingsOpen(false)}
        onSubmit={(patch) => updateProjectDetails(project.id, patch)}
      />
    </>
  );
}
