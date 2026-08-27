"use client";

import { use } from "react";
import Link from "next/link";
import { useStore, useProject } from "@/lib/store";
import PhaseSidebar from "@/components/workspace/PhaseSidebar";

export default function ProjectLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const hasHydrated = useStore((s) => s.hasHydrated);
  const project = useProject(id);

  if (!hasHydrated) return null;

  if (!project) {
    return (
      <div className="mx-auto max-w-[1280px] w-full px-6 py-16 text-center">
        <p className="text-sm text-ink-muted mb-4">This project doesn&apos;t exist.</p>
        <Link href="/" className="text-sm text-accent hover:underline">
          Back to projects
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-1">
      <PhaseSidebar project={project} />
      <div className="flex-1 min-w-0">
        <div className="max-w-[1280px] mx-auto px-6 py-6">{children}</div>
      </div>
    </div>
  );
}
