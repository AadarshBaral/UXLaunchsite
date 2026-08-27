"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DOC_PHASES } from "@/lib/docs/content";
import { useActiveHeading } from "@/lib/docs/useActiveHeading";

export default function DocsSidebar() {
  const pathname = usePathname();
  const activePhase = DOC_PHASES.find((p) => pathname.includes(`/${p.id}`));
  const stepIds = activePhase?.steps.map((s) => s.id) ?? [];
  const activeStepId = useActiveHeading(stepIds);

  return (
    <aside className="w-60 shrink-0 border-r border-line bg-surface sticky top-14 h-[calc(100vh-56px)] overflow-y-auto thin-scroll flex flex-col">
      <div className="p-4 border-b border-line">
        <h1 className="font-serif text-base font-semibold text-ink">Documentation</h1>
        <p className="text-xs text-ink-muted mt-1">Operational handbook</p>
      </div>
      <nav className="p-2 flex flex-col gap-0.5">
        {DOC_PHASES.map((phase, i) => {
          const active = phase.id === activePhase?.id;
          const isGuide = phase.id === "guide";
          return (
            <div key={phase.id}>
              {isGuide && i > 0 && <div className="my-2 border-t border-line" />}
              <Link
                href={`/docs/${phase.id}`}
                className={`flex items-center gap-2 rounded-md border-l-2 pl-2 pr-2.5 py-2 text-sm transition-colors ${
                  active
                    ? "border-accent bg-background text-ink font-medium"
                    : "border-transparent text-ink-muted hover:bg-background hover:text-ink"
                }`}
              >
                <span className="flex-1 truncate">
                  {isGuide ? phase.title : `${phase.index}. ${phase.title}`}
                </span>
                <span className="text-xs text-ink-disabled tabular-nums shrink-0">{phase.steps.length}</span>
              </Link>
              {active && (
                <div className="ml-4 pl-2 border-l border-line flex flex-col gap-0.5 my-1">
                  {phase.steps.map((step) => (
                    <a
                      key={step.id}
                      href={`#${step.id}`}
                      className={`truncate rounded-md px-2 py-1 text-xs transition-colors ${
                        step.id === activeStepId
                          ? "text-ink font-medium"
                          : "text-ink-muted hover:text-ink"
                      }`}
                    >
                      {step.number}. {step.title}
                    </a>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
