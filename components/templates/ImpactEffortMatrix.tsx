"use client";

import { useRef, useState } from "react";
import { Plus, X } from "lucide-react";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { makeId } from "@/lib/id";
import type { Matrix2x2Data } from "@/lib/workflow/types";

export default function ImpactEffortMatrix({
  xLabel,
  yLabel,
  data,
  onChange,
}: {
  xLabel: string;
  yLabel: string;
  data: Matrix2x2Data;
  onChange: (data: Matrix2x2Data) => void;
}) {
  const [label, setLabel] = useState("");
  const boardRef = useRef<HTMLDivElement>(null);
  const draggingId = useRef<string | null>(null);

  function addItem() {
    if (!label.trim()) return;
    onChange({ items: [...data.items, { id: makeId(), label: label.trim(), impact: 50, effort: 50 }] });
    setLabel("");
  }

  function removeItem(id: string) {
    onChange({ items: data.items.filter((i) => i.id !== id) });
  }

  function positionFromEvent(e: { clientX: number; clientY: number }) {
    const rect = boardRef.current?.getBoundingClientRect();
    if (!rect) return null;
    const effort = Math.min(100, Math.max(0, ((e.clientX - rect.left) / rect.width) * 100));
    const impact = Math.min(100, Math.max(0, 100 - ((e.clientY - rect.top) / rect.height) * 100));
    return { effort, impact };
  }

  function onPointerMove(e: React.PointerEvent) {
    const id = draggingId.current;
    if (!id) return;
    const pos = positionFromEvent(e);
    if (!pos) return;
    onChange({
      items: data.items.map((item) => (item.id === id ? { ...item, ...pos } : item)),
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addItem()}
          placeholder="Add an opportunity…"
        />
        <Button variant="secondary" size="sm" onClick={addItem} className="shrink-0">
          <Plus size={14} /> Add
        </Button>
      </div>

      <div className="flex gap-2">
        <div className="flex flex-col justify-between text-[10px] text-ink-disabled font-medium py-1 [writing-mode:vertical-rl] items-center">
          <span className="rotate-180">High {yLabel}</span>
          <span className="rotate-180">Low {yLabel}</span>
        </div>
        <div
          ref={boardRef}
          onPointerMove={onPointerMove}
          onPointerUp={() => (draggingId.current = null)}
          onPointerLeave={() => (draggingId.current = null)}
          className="relative flex-1 aspect-square border border-line rounded-md bg-surface/40 select-none"
        >
          <div className="absolute inset-0 border-b border-r border-line" style={{ width: "50%", height: "50%" }} />
          <div className="absolute top-0 left-1/2 bottom-0 w-px bg-line" />
          <div className="absolute left-0 top-1/2 right-0 h-px bg-line" />

          <span className="absolute top-1.5 left-1.5 text-[10px] text-ink-disabled">Do First</span>
          <span className="absolute top-1.5 right-1.5 text-[10px] text-ink-disabled">Plan</span>
          <span className="absolute bottom-1.5 left-1.5 text-[10px] text-ink-disabled">Reconsider</span>
          <span className="absolute bottom-1.5 right-1.5 text-[10px] text-ink-disabled">Delegate</span>

          {data.items.map((item) => (
            <div
              key={item.id}
              onPointerDown={(e) => {
                (e.target as HTMLElement).setPointerCapture(e.pointerId);
                draggingId.current = item.id;
              }}
              style={{
                left: `${item.effort}%`,
                bottom: `${item.impact}%`,
              }}
              className="group absolute -translate-x-1/2 translate-y-1/2 flex items-center gap-1 cursor-grab active:cursor-grabbing"
            >
              <span className="h-2.5 w-2.5 rounded-full bg-accent shrink-0 ring-2 ring-background" />
              <span className="whitespace-nowrap rounded-md bg-ink text-background text-[11px] px-1.5 py-0.5">
                {item.label}
              </span>
              <button
                onPointerDown={(e) => e.stopPropagation()}
                onClick={() => removeItem(item.id)}
                className="opacity-0 group-hover:opacity-100 text-ink-disabled hover:text-status-red cursor-pointer"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="text-center text-[10px] text-ink-disabled font-medium -mt-2">
        Low {xLabel} → High {xLabel}
      </div>
    </div>
  );
}
