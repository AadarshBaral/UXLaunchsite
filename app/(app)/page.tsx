"use client";

import PhaseDots from "@/components/projects/PhaseDots";
import ProjectCard from "@/components/projects/ProjectCard";
import ProjectFormModal from "@/components/projects/ProjectFormModal";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import ConfirmModal from "@/components/ui/ConfirmModal";
import Menu, { type MenuItem } from "@/components/ui/Menu";
import { formatDate, isOverdue } from "@/lib/date";
import { downloadFile, slugify } from "@/lib/export";
import { useStore } from "@/lib/store";
import { getOverallProgress } from "@/lib/workflow/progress";
import type { Project } from "@/lib/workflow/types";
import { LayoutGrid, List, Plus, Search, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";

type ViewMode = "list" | "card";

export default function ProjectsHome() {
  const router = useRouter();
  const hasHydrated = useStore((s) => s.hasHydrated);
  const projects = useStore((s) => s.projects);
  const createProject = useStore((s) => s.createProject);
  const updateProjectDetails = useStore((s) => s.updateProjectDetails);
  const deleteProject = useStore((s) => s.deleteProject);
  const duplicateProject = useStore((s) => s.duplicateProject);
  const importProject = useStore((s) => s.importProject);

  const [query, setQuery] = useState("");
  const [view, setView] = useState<ViewMode>("list");
  const [newOpen, setNewOpen] = useState(false);
  const [settingsTarget, setSettingsTarget] = useState<Project | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Project | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(
    () =>
      projects.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()),
      ),
    [projects, query],
  );

  function handleCreate(values: {
    name: string;
    avatar?: string;
    startDate?: string;
    dueDate?: string;
  }) {
    const id = createProject(values.name, {
      avatar: values.avatar,
      startDate: values.startDate,
      dueDate: values.dueDate,
    });
    setNewOpen(false);
    router.push(`/projects/${id}`);
  }

  function handleImportFile(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result)) as Project;
        if (!parsed.deliverables || !parsed.name)
          throw new Error("Invalid file");
        const id = importProject(parsed);
        router.push(`/projects/${id}`);
      } catch {
        alert(
          "That file doesn't look like a valid UX Launchsite project export.",
        );
      }
    };
    reader.readAsText(file);
  }

  function menuItemsFor(project: Project): MenuItem[] {
    return [
      { label: "Settings", onSelect: () => setSettingsTarget(project) },
      { label: "Duplicate", onSelect: () => duplicateProject(project.id) },
      {
        label: "Export JSON",
        onSelect: () =>
          downloadFile(
            `${slugify(project.name)}.json`,
            JSON.stringify(project, null, 2),
            "application/json",
          ),
      },
      {
        label: "Delete",
        onSelect: () => setDeleteTarget(project),
        danger: true,
      },
    ];
  }

  if (!hasHydrated) {
    return <div className="mx-auto max-w-[1280px] w-full px-6 py-8" />;
  }

  return (
    <div className="mx-auto max-w-[1280px] w-full px-6 py-8 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl font-semibold text-ink">Projects</h1>
        <div className="flex items-center gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleImportFile(file);
              e.target.value = "";
            }}
          />
          <Button
            variant="secondary"
            size="md"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload size={14} /> Import
          </Button>
          <Button variant="primary" size="md" onClick={() => setNewOpen(true)}>
            <Plus size={14} /> New project
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3">
        <div className="relative max-w-xs flex-1">
          <Search
            size={14}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-ink-disabled"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects"
            className="h-9 w-full rounded-md border border-line bg-background pl-8 pr-3 text-sm text-ink placeholder:text-ink-disabled focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
        <div className="flex items-center border border-line rounded-md p-0.5 shrink-0">
          <button
            onClick={() => setView("list")}
            aria-label="List view"
            className={`h-7 w-7 inline-flex items-center justify-center rounded cursor-pointer ${
              view === "list"
                ? "bg-surface text-ink"
                : "text-ink-disabled hover:text-ink"
            }`}
          >
            <List size={15} />
          </button>
          <button
            onClick={() => setView("card")}
            aria-label="Card view"
            className={`h-7 w-7 inline-flex items-center justify-center rounded cursor-pointer ${
              view === "card"
                ? "bg-surface text-ink"
                : "text-ink-disabled hover:text-ink"
            }`}
          >
            <LayoutGrid size={15} />
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="border border-line rounded-md py-16 flex flex-col items-center justify-center gap-3 text-center">
          <p className="text-sm text-ink-muted">
            {projects.length === 0
              ? "No projects yet."
              : "No projects match your search."}
          </p>
          {projects.length === 0 && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setNewOpen(true)}
            >
              Create your first project
            </Button>
          )}
        </div>
      ) : view === "list" ? (
        <div className="border border-line rounded-md overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line bg-surface text-xs font-medium text-ink-muted">
                <th className="text-left px-4 py-2 font-medium">Name</th>
                <th className="text-left px-4 py-2 font-medium w-32">Phases</th>
                <th className="text-right px-4 py-2 font-medium w-20">
                  Progress
                </th>
                <th className="text-left px-4 py-2 font-medium w-28">Due</th>
                <th className="text-left px-4 py-2 font-medium w-28">
                  Updated
                </th>
                <th className="w-10" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((project) => {
                const progress = getOverallProgress(project);
                const overdue = isOverdue(
                  project.dueDate,
                  progress.ratio === 1,
                );
                return (
                  <tr
                    key={project.id}
                    onClick={() => router.push(`/projects/${project.id}`)}
                    className="border-b border-line last:border-b-0 h-12 hover:bg-surface cursor-pointer transition-colors"
                  >
                    <td className="px-4 py-2">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Avatar
                          src={project.avatar}
                          name={project.name}
                          size={24}
                        />
                        <span className="font-medium text-ink truncate">
                          {project.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-2">
                      <PhaseDots project={project} />
                    </td>
                    <td className="px-4 py-2 text-right text-ink-muted tabular-nums">
                      {progress.complete}/{progress.total}
                    </td>
                    <td
                      className={`px-4 py-2 ${overdue ? "text-status-red" : "text-ink-muted"}`}
                    >
                      {formatDate(project.dueDate)}
                    </td>
                    <td className="px-4 py-2 text-ink-muted">
                      {formatDate(project.updatedAt)}
                    </td>
                    <td
                      className="px-2 py-2 text-right"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Menu items={menuItemsFor(project)} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              menuItems={menuItemsFor(project)}
            />
          ))}
        </div>
      )}

      <ProjectFormModal
        open={newOpen}
        onClose={() => setNewOpen(false)}
        onSubmit={handleCreate}
      />
      {settingsTarget && (
        <ProjectFormModal
          key={settingsTarget.id}
          open={!!settingsTarget}
          project={settingsTarget}
          onClose={() => setSettingsTarget(null)}
          onSubmit={(patch) => updateProjectDetails(settingsTarget.id, patch)}
        />
      )}
      <ConfirmModal
        open={!!deleteTarget}
        title="Delete project"
        description={`This permanently deletes "${deleteTarget?.name}" and everything in it. This can't be undone.`}
        confirmLabel="Delete"
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => deleteTarget && deleteProject(deleteTarget.id)}
      />
    </div>
  );
}
