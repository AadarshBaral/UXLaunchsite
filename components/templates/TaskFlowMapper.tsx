"use client";

import { ArrowDown, ArrowUp, Copy, Plus, Trash2 } from "lucide-react";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { makeId } from "@/lib/id";
import { copyToClipboard } from "@/lib/export";
import { generateTaskFlowMermaid } from "@/lib/workflow/markdown";
import type { TaskFlowData, TaskFlowStep } from "@/lib/workflow/types";

export default function TaskFlowMapper({
  data,
  onChange,
}: {
  data: TaskFlowData;
  onChange: (data: TaskFlowData) => void;
}) {
  function update(id: string, patch: Partial<TaskFlowStep>) {
    onChange({
      steps: data.steps.map((s) => (s.id === id ? { ...s, ...patch } : s)),
    });
  }

  function addStep() {
    onChange({
      steps: [
        ...data.steps,
        { id: makeId(), label: "", type: "step", branches: [] },
      ],
    });
  }

  function removeStep(id: string) {
    onChange({ steps: data.steps.filter((s) => s.id !== id) });
  }

  function move(index: number, dir: -1 | 1) {
    const next = [...data.steps];
    const target = index + dir;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    onChange({ steps: next });
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        {data.steps.map((step, i) => (
          <div
            key={step.id}
            className="border border-line rounded-md p-3 flex flex-col gap-2"
          >
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-1.5">
              <div className="flex items-center gap-1.5 flex-1">
                <span className="text-xs text-ink-disabled w-5 shrink-0 tabular-nums">
                  {i + 1}.
                </span>
                <Input
                  value={step.label}
                  onChange={(e) => update(step.id, { label: e.target.value })}
                  placeholder="Step description"
                  className="flex-1"
                />
              </div>
              <div className="flex items-center gap-1.5 justify-end">
                <select
                  value={step.type}
                  onChange={(e) =>
                    update(step.id, {
                      type: e.target.value as "step" | "decision",
                    })
                  }
                  className="h-9 rounded-md border border-line bg-background px-2 text-sm text-ink flex-1 sm:flex-initial"
                >
                  <option value="step">Step</option>
                  <option value="decision">Decision</option>
                </select>
                <button
                  onClick={() => move(i, -1)}
                  className="h-8 w-8 inline-flex items-center justify-center rounded-md text-ink-muted hover:bg-surface cursor-pointer"
                  aria-label="Move up"
                >
                  <ArrowUp size={13} />
                </button>
                <button
                  onClick={() => move(i, 1)}
                  className="h-8 w-8 inline-flex items-center justify-center rounded-md text-ink-muted hover:bg-surface cursor-pointer"
                  aria-label="Move down"
                >
                  <ArrowDown size={13} />
                </button>
                <button
                  onClick={() => removeStep(step.id)}
                  className="h-8 w-8 inline-flex items-center justify-center rounded-md text-ink-disabled hover:text-status-red hover:bg-surface cursor-pointer"
                  aria-label="Remove step"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
            {step.type === "decision" && (
              <div className="pl-6 flex flex-col gap-1.5">
                {step.branches.map((branch, bi) => (
                  <div key={bi} className="flex items-center gap-1.5">
                    <span className="text-xs text-ink-disabled">↳</span>
                    <Input
                      value={branch.label}
                      onChange={(e) => {
                        const branches = [...step.branches];
                        branches[bi] = { label: e.target.value };
                        update(step.id, { branches });
                      }}
                      placeholder="Branch outcome (e.g. Yes)"
                      className="h-8 max-w-xs"
                    />
                    <button
                      onClick={() =>
                        update(step.id, {
                          branches: step.branches.filter((_, x) => x !== bi),
                        })
                      }
                      className="h-7 w-7 inline-flex items-center justify-center rounded-md text-ink-disabled hover:text-status-red cursor-pointer"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
                <Button
                  variant="ghost"
                  size="sm"
                  className="self-start"
                  onClick={() =>
                    update(step.id, {
                      branches: [...step.branches, { label: "" }],
                    })
                  }
                >
                  <Plus size={12} /> Add branch
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
      <Button
        variant="secondary"
        size="sm"
        onClick={addStep}
        className="self-start"
      >
        <Plus size={14} /> Add step
      </Button>

      {data.steps.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-medium text-ink-muted">
              Mermaid.js preview
            </span>
            <button
              onClick={() =>
                copyToClipboard(generateTaskFlowMermaid(data.steps))
              }
              className="inline-flex items-center gap-1 text-xs text-ink-muted hover:text-ink cursor-pointer"
            >
              <Copy size={12} /> Copy
            </button>
          </div>
          <pre className="border border-line rounded-md bg-surface p-3 text-xs text-ink-muted overflow-x-auto thin-scroll">
            {generateTaskFlowMermaid(data.steps)}
          </pre>
        </div>
      )}
    </div>
  );
}
