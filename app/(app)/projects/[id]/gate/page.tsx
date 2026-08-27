"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { useProject } from "@/lib/store";
import GateView from "@/components/workspace/GateView";

export default function GatePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const project = useProject(id);

  if (!project) return null;

  return (
    <GateView
      project={project}
      onReview={(phaseId) => router.push(`/projects/${id}/${phaseId}`)}
    />
  );
}
