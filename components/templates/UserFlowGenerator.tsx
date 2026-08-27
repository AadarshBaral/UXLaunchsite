"use client";

import { ArrowDown, Plus, Trash2 } from "lucide-react";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { makeId } from "@/lib/id";
import type { UserFlowData, UserFlowNode, UserFlowNodeType } from "@/lib/workflow/types";

const TYPE_LABEL: Record<UserFlowNodeType, string> = {
  start: "Start",
  screen: "Screen / Action",
  decision: "Decision",
  end: "End",
};

const TYPE_STYLE: Record<UserFlowNodeType, string> = {
  start: "bg-accent text-accent-ink border-accent rounded-full",
  end: "bg-accent text-accent-ink border-accent rounded-full",
  decision: "bg-status-amber/15 border-status-amber text-ink rounded-md",
  screen: "bg-background border-line text-ink rounded-md",
};

export default function UserFlowGenerator({
  data,
  onChange,
}: {
  data: UserFlowData;
  onChange: (data: UserFlowData) => void;
}) {
  function update(id: string, patch: Partial<UserFlowNode>) {
    onChange({ nodes: data.nodes.map((n) => (n.id === id ? { ...n, ...patch } : n)) });
  }

  function addNode() {
    const endIndex = data.nodes.findIndex((n) => n.type === "end");
    const insertAt = endIndex === -1 ? data.nodes.length : endIndex;
    const next = [...data.nodes];
    next.splice(insertAt, 0, { id: makeId(), label: "New screen", type: "screen" });
    onChange({ nodes: next });
  }

  function removeNode(id: string) {
    onChange({ nodes: data.nodes.filter((n) => n.id !== id) });
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        {data.nodes.map((node) => (
          <div key={node.id} className="flex items-center gap-1.5">
            <select
              value={node.type}
              onChange={(e) => update(node.id, { type: e.target.value as UserFlowNodeType })}
              className="h-9 rounded-md border border-line bg-background px-2 text-sm text-ink w-36 shrink-0"
            >
              {Object.entries(TYPE_LABEL).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            <Input value={node.label} onChange={(e) => update(node.id, { label: e.target.value })} />
            {node.type !== "start" && node.type !== "end" && (
              <button
                onClick={() => removeNode(node.id)}
                className="h-8 w-8 shrink-0 inline-flex items-center justify-center rounded-md text-ink-disabled hover:text-status-red hover:bg-surface cursor-pointer"
              >
                <Trash2 size={13} />
              </button>
            )}
          </div>
        ))}
        <Button variant="secondary" size="sm" onClick={addNode} className="self-start">
          <Plus size={14} /> Add node
        </Button>
      </div>

      <div>
        <div className="text-xs font-medium text-ink-muted mb-2">Preview</div>
        <div className="border border-line rounded-md bg-surface/40 py-6 flex flex-col items-center gap-1">
          {data.nodes.map((node, i) => (
            <div key={node.id} className="flex flex-col items-center gap-1">
              {i > 0 && <ArrowDown size={14} className="text-ink-disabled" />}
              <div
                className={`border px-4 py-2 text-xs font-medium text-center min-w-[160px] ${TYPE_STYLE[node.type]}`}
              >
                {node.label || "Untitled"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
