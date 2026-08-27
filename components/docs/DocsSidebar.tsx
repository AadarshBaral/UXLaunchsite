"use client";

import { DOC_PHASES } from "@/lib/docs/content";
import { useActiveHeading } from "@/lib/docs/useActiveHeading";
import { ChevronDown, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function DocsSidebar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const activePhase = DOC_PHASES.find((p) => pathname.includes(`/${p.id}`));
  const stepIds = activePhase?.steps.map((s) => s.id) ?? [];
  const activeStepId = useActiveHeading(stepIds);

  const currentLabel = activePhase
    ? activePhase.id === "guide"
      ? activePhase.title
      : `${activePhase.index}. ${activePhase.title}`
    : "Documentation";

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden sticky top-14 z-20 border-b border-line bg-surface px-4 py-2 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="font-serif text-sm font-semibold text-ink">
            Docs
          </span>
          <span className="text-xs text-ink-muted">/</span>
          <span className="text-xs font-medium text-ink-muted truncate max-w-[150px]">
            {currentLabel}
          </span>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-line bg-background text-xs font-medium text-ink cursor-pointer shadow-xs"
        >
          <span>Topics</span>
          <ChevronDown
            size={13}
            className={`shrink-0 transition-transform ${mobileMenuOpen ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 top-[98px]">
          <div
            className="absolute inset-0 bg-ink/20 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative border-b border-line bg-background p-4 shadow-lg flex flex-col gap-3 max-h-[calc(100vh-120px)] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-line">
              <h2 className="font-serif text-sm font-semibold text-ink">
                Documentation Topics
              </h2>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-ink-muted hover:text-ink p-1"
                aria-label="Close menu"
              >
                <X size={16} />
              </button>
            </div>

            <nav className="flex flex-col gap-1">
              {DOC_PHASES.map((phase, i) => {
                const active = phase.id === activePhase?.id;
                const isGuide = phase.id === "guide";
                return (
                  <div key={phase.id}>
                    {isGuide && i > 0 && (
                      <div className="my-1.5 border-t border-line" />
                    )}
                    <Link
                      href={`/docs/${phase.id}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-2 rounded-md border-l-2 pl-2.5 pr-2.5 py-2 text-sm transition-colors ${
                        active
                          ? "border-accent bg-surface text-ink font-medium"
                          : "border-transparent text-ink-muted hover:bg-surface hover:text-ink"
                      }`}
                    >
                      <span className="flex-1 truncate">
                        {isGuide
                          ? phase.title
                          : `${phase.index}. ${phase.title}`}
                      </span>
                      <span className="text-xs text-ink-disabled tabular-nums shrink-0">
                        {phase.steps.length}
                      </span>
                    </Link>
                    {active && (
                      <div className="ml-4 pl-2 border-l border-line flex flex-col gap-1 my-1">
                        {phase.steps.map((step) => (
                          <a
                            key={step.id}
                            href={`#${step.id}`}
                            onClick={() => setMobileMenuOpen(false)}
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
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-60 shrink-0 border-r border-line bg-surface sticky top-14 h-[calc(100vh-56px)] overflow-y-auto thin-scroll flex-col">
        <div className="p-4 border-b border-line">
          <h1 className="font-serif text-base font-semibold text-ink">
            Documentation
          </h1>
          <p className="text-xs text-ink-muted mt-1">Operational handbook</p>
        </div>
        <nav className="p-2 flex flex-col gap-0.5">
          {DOC_PHASES.map((phase, i) => {
            const active = phase.id === activePhase?.id;
            const isGuide = phase.id === "guide";
            return (
              <div key={phase.id}>
                {isGuide && i > 0 && (
                  <div className="my-2 border-t border-line" />
                )}
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
                  <span className="text-xs text-ink-disabled tabular-nums shrink-0">
                    {phase.steps.length}
                  </span>
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
    </>
  );
}
