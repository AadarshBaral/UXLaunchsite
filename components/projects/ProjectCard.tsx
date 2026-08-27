import { useRouter } from "next/navigation";
import Avatar from "@/components/ui/Avatar";
import Menu, { type MenuItem } from "@/components/ui/Menu";
import PhaseDots from "@/components/projects/PhaseDots";
import { getOverallProgress } from "@/lib/workflow/progress";
import { formatDate, isOverdue } from "@/lib/date";
import type { Project } from "@/lib/workflow/types";

export default function ProjectCard({
  project,
  menuItems,
}: {
  project: Project;
  menuItems: MenuItem[];
}) {
  const router = useRouter();
  const progress = getOverallProgress(project);
  const overdue = isOverdue(project.dueDate, progress.ratio === 1);

  return (
    <div
      onClick={() => router.push(`/projects/${project.id}`)}
      className="border border-line rounded-md p-4 flex flex-col gap-3 hover:bg-surface cursor-pointer transition-colors"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <Avatar src={project.avatar} name={project.name} size={36} />
          <div className="min-w-0">
            <div className="font-medium text-ink truncate">{project.name}</div>
            <div className="text-xs text-ink-muted tabular-nums">
              {progress.complete}/{progress.total} deliverables
            </div>
          </div>
        </div>
        <div onClick={(e) => e.stopPropagation()}>
          <Menu items={menuItems} />
        </div>
      </div>

      <PhaseDots project={project} />

      <div className="flex items-center justify-between text-xs text-ink-muted pt-2 border-t border-line">
        <span>Started {formatDate(project.startDate)}</span>
        {project.dueDate && (
          <span className={overdue ? "text-status-red" : ""}>Due {formatDate(project.dueDate)}</span>
        )}
      </div>
    </div>
  );
}
