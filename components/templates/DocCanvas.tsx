"use client";

import { Textarea } from "@/components/ui/Input";
import type { DocData, DocSection } from "@/lib/workflow/types";

export default function DocCanvas({
  sections,
  data,
  onChange,
}: {
  sections: DocSection[];
  data: DocData;
  onChange: (data: DocData) => void;
}) {
  return (
    <div className="flex flex-col gap-5">
      {sections.map((section) => (
        <div key={section.id}>
          <label className="block text-xs font-medium text-ink-muted mb-1.5">{section.heading}</label>
          <Textarea
            rows={4}
            value={data.values[section.id] ?? ""}
            placeholder={section.placeholder}
            onChange={(e) =>
              onChange({ values: { ...data.values, [section.id]: e.target.value } })
            }
          />
        </div>
      ))}
    </div>
  );
}
