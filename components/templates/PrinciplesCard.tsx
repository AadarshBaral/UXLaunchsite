"use client";

import { Plus, Trash2 } from "lucide-react";
import Button from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { makeId } from "@/lib/id";
import type { PrinciplesData } from "@/lib/workflow/types";

export default function PrinciplesCard({
  max,
  data,
  onChange,
}: {
  max: number;
  data: PrinciplesData;
  onChange: (data: PrinciplesData) => void;
}) {
  function update(id: string, patch: Partial<{ title: string; description: string }>) {
    onChange({
      principles: data.principles.map((p) => (p.id === id ? { ...p, ...patch } : p)),
    });
  }

  function addPrinciple() {
    if (data.principles.length >= max) return;
    onChange({ principles: [...data.principles, { id: makeId(), title: "", description: "" }] });
  }

  function removePrinciple(id: string) {
    onChange({ principles: data.principles.filter((p) => p.id !== id) });
  }

  return (
    <div className="flex flex-col gap-3">
      {data.principles.map((principle, i) => (
        <div key={principle.id} className="border border-line rounded-md p-3 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs text-ink-disabled shrink-0">{i + 1}.</span>
            <Input
              value={principle.title}
              onChange={(e) => update(principle.id, { title: e.target.value })}
              placeholder="Principle name"
            />
            <button
              onClick={() => removePrinciple(principle.id)}
              className="h-8 w-8 shrink-0 inline-flex items-center justify-center rounded-md text-ink-disabled hover:text-status-red hover:bg-surface cursor-pointer"
            >
              <Trash2 size={13} />
            </button>
          </div>
          <Textarea
            rows={2}
            value={principle.description}
            onChange={(e) => update(principle.id, { description: e.target.value })}
            placeholder="What does this principle mean in practice?"
          />
        </div>
      ))}
      {data.principles.length < max && (
        <Button variant="secondary" size="sm" onClick={addPrinciple} className="self-start">
          <Plus size={14} /> Add principle ({data.principles.length}/{max})
        </Button>
      )}
    </div>
  );
}
