"use client";

import { Plus, Trash2 } from "lucide-react";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import type { DocSection, ScriptData } from "@/lib/workflow/types";

export default function ScriptBuilder({
  sections,
  data,
  onChange,
}: {
  sections: DocSection[];
  data: ScriptData;
  onChange: (data: ScriptData) => void;
}) {
  function setItems(sectionId: string, items: string[]) {
    onChange({ values: { ...data.values, [sectionId]: items } });
  }

  return (
    <div className="flex flex-col gap-6">
      {sections.map((section) => {
        const items = data.values[section.id] ?? [];
        return (
          <div key={section.id}>
            <label className="block text-xs font-medium text-ink-muted mb-1">{section.heading}</label>
            <p className="text-xs text-ink-disabled mb-2">{section.placeholder}</p>
            <div className="flex flex-col gap-2">
              {items.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Input
                    value={item}
                    onChange={(e) => {
                      const next = [...items];
                      next[i] = e.target.value;
                      setItems(section.id, next);
                    }}
                    placeholder="Question…"
                  />
                  <button
                    onClick={() => setItems(section.id, items.filter((_, idx) => idx !== i))}
                    className="h-8 w-8 shrink-0 inline-flex items-center justify-center rounded-md text-ink-disabled hover:text-status-red hover:bg-surface cursor-pointer"
                    aria-label="Remove question"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
              <Button
                variant="ghost"
                size="sm"
                className="self-start"
                onClick={() => setItems(section.id, [...items, ""])}
              >
                <Plus size={13} /> Add question
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
