import { ArrowRight } from "lucide-react";
import type { DocStep } from "@/lib/docs/types";

export default function DocStepCard({ step }: { step: DocStep }) {
  return (
    <div id={step.id} className="scroll-mt-20 border border-line rounded-md p-5 flex flex-col gap-4">
      <h3 className="font-serif text-lg font-semibold text-ink">
        {step.number}. {step.title}
      </h3>

      {step.blocks.map((block) => (
        <div key={block.label}>
          <div className="text-xs font-medium text-ink-muted uppercase tracking-wide mb-1.5">
            {block.label}
          </div>
          <ul className="flex flex-col gap-1.5">
            {block.items.map((item, i) =>
              item.formula ? (
                <li key={i}>
                  <code className="block rounded-md border border-line bg-surface px-3 py-2 text-sm text-ink font-mono">
                    {item.text}
                  </code>
                </li>
              ) : (
                <li key={i} className="flex gap-2 text-sm text-ink">
                  <span className="text-ink-disabled shrink-0">–</span>
                  <span>
                    {item.label && <span className="font-medium">{item.label}: </span>}
                    {item.text}
                  </span>
                </li>
              )
            )}
          </ul>
        </div>
      ))}

      <div className="border-l-2 border-accent bg-surface rounded-md pl-3 pr-4 py-2.5 flex items-start gap-2">
        <ArrowRight size={14} className="text-accent shrink-0 mt-0.5" />
        <div>
          <div className="text-xs font-medium text-accent mb-0.5">{step.calloutLabel ?? "Workspace Action"}</div>
          <p className="text-sm text-ink">{step.workspaceAction}</p>
        </div>
      </div>
    </div>
  );
}
