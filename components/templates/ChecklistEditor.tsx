"use client";

import { Plus, Trash2 } from "lucide-react";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { makeId } from "@/lib/id";
import type { ChecklistData } from "@/lib/workflow/types";

export default function ChecklistEditor({
  data,
  onChange,
}: {
  data: ChecklistData;
  onChange: (data: ChecklistData) => void;
}) {
  const done = data.items.filter((i) => i.done).length;

  function addItem() {
    onChange({ items: [...data.items, { id: makeId(), label: "", done: false }] });
  }

  function toggle(id: string) {
    onChange({ items: data.items.map((i) => (i.id === id ? { ...i, done: !i.done } : i)) });
  }

  function updateLabel(id: string, label: string) {
    onChange({ items: data.items.map((i) => (i.id === id ? { ...i, label } : i)) });
  }

  function removeItem(id: string) {
    onChange({ items: data.items.filter((i) => i.id !== id) });
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="text-xs text-ink-muted">
        {done}/{data.items.length} checked
      </div>
      <div className="flex flex-col gap-1.5">
        {data.items.map((item) => (
          <div key={item.id} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={item.done}
              onChange={() => toggle(item.id)}
              className="h-4 w-4 rounded accent-accent shrink-0 cursor-pointer"
            />
            <Input
              value={item.label}
              onChange={(e) => updateLabel(item.id, e.target.value)}
              className={item.done ? "line-through text-ink-disabled" : ""}
            />
            <button
              onClick={() => removeItem(item.id)}
              className="h-8 w-8 shrink-0 inline-flex items-center justify-center rounded-md text-ink-disabled hover:text-status-red hover:bg-surface cursor-pointer"
            >
              <Trash2 size={13} />
            </button>
          </div>
        ))}
      </div>
      <Button variant="ghost" size="sm" onClick={addItem} className="self-start">
        <Plus size={13} /> Add item
      </Button>
    </div>
  );
}
