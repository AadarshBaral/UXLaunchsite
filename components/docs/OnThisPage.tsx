"use client";

import { usePathname } from "next/navigation";
import { DOC_PHASES } from "@/lib/docs/content";
import { useActiveHeading } from "@/lib/docs/useActiveHeading";

export default function OnThisPage() {
  const pathname = usePathname();
  const phase = DOC_PHASES.find((p) => pathname.includes(`/${p.id}`));
  const ids = phase?.steps.map((s) => s.id) ?? [];
  const activeId = useActiveHeading(ids);

  if (!phase) return null;

  return (
    <aside className="hidden xl:block w-52 shrink-0">
      <div className="sticky top-20">
        <div className="text-xs font-medium text-ink-muted uppercase tracking-wide mb-3">On this page</div>
        <nav className="flex flex-col gap-0.5 border-l border-line">
          {phase.steps.map((step) => {
            const active = step.id === activeId;
            return (
              <a
                key={step.id}
                href={`#${step.id}`}
                className={`-ml-px pl-3 py-1 text-sm border-l-2 transition-colors ${
                  active
                    ? "border-accent text-ink font-medium"
                    : "border-transparent text-ink-muted hover:text-ink"
                }`}
              >
                {step.number}. {step.title}
              </a>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
