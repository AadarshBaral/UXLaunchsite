"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { useProject } from "@/lib/store";
import { getPhase } from "@/lib/workflow/config";
import DeliverablesTable from "@/components/workspace/DeliverablesTable";

export default function PhasePage({
  params,
}: {
  params: Promise<{ id: string; phaseId: string }>;
}) {
  const { id, phaseId } = use(params);
  const router = useRouter();
  const project = useProject(id);
  const phase = getPhase(phaseId);

  if (!project) return null;

  if (!phase) {
    return <p className="text-sm text-ink-muted">This phase doesn&apos;t exist.</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-serif text-xl font-semibold text-ink">
            {phase.index}. {phase.title}
          </h2>
          <p className="text-sm text-ink-muted mt-1">{phase.subtitle}</p>
        </div>
        <Link
          href={`/docs/${phaseId}`}
          className="inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink shrink-0"
        >
          <BookOpen size={14} /> Documentation
        </Link>
      </div>
      <DeliverablesTable
        phase={phase}
        project={project}
        onOpen={(deliverableId) => router.push(`/projects/${id}/${phaseId}/${deliverableId}`)}
      />
      <div>
        <Link href={`/projects/${id}/gate`} className="text-sm text-ink-muted hover:text-ink">
          Go to Pre-Figma Gate →
        </Link>
      </div>
    </div>
  );
}
