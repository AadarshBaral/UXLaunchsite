"use client";

import { Plus, Trash2, X } from "lucide-react";
import Button from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { makeId } from "@/lib/id";
import type { PersonaData, PersonaField } from "@/lib/workflow/types";

const EMPTY_PERSONA: Omit<PersonaField, "id"> = {
  name: "",
  role: "",
  quote: "",
  bio: "",
  goals: [],
  frustrations: [],
  behaviors: [],
};

function ListField({
  label,
  items,
  onChange,
}: {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-ink-muted mb-1.5">{label}</label>
      <div className="flex flex-col gap-1.5">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <Input
              value={item}
              onChange={(e) => {
                const next = [...items];
                next[i] = e.target.value;
                onChange(next);
              }}
            />
            <button
              onClick={() => onChange(items.filter((_, idx) => idx !== i))}
              className="h-8 w-8 shrink-0 inline-flex items-center justify-center rounded-md text-ink-disabled hover:text-status-red hover:bg-surface cursor-pointer"
            >
              <X size={13} />
            </button>
          </div>
        ))}
        <Button variant="ghost" size="sm" className="self-start" onClick={() => onChange([...items, ""])}>
          <Plus size={13} /> Add
        </Button>
      </div>
    </div>
  );
}

export default function PersonaBuilder({
  data,
  onChange,
}: {
  data: PersonaData;
  onChange: (data: PersonaData) => void;
}) {
  function updatePersona(id: string, patch: Partial<PersonaField>) {
    onChange({
      personas: data.personas.map((p) => (p.id === id ? { ...p, ...patch } : p)),
    });
  }

  function addPersona() {
    onChange({ personas: [...data.personas, { id: makeId(), ...EMPTY_PERSONA }] });
  }

  function removePersona(id: string) {
    onChange({ personas: data.personas.filter((p) => p.id !== id) });
  }

  return (
    <div className="flex flex-col gap-6">
      {data.personas.map((persona) => (
        <div key={persona.id} className="border border-line rounded-md p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-ink-muted">Persona</span>
            <button
              onClick={() => removePersona(persona.id)}
              className="text-ink-disabled hover:text-status-red cursor-pointer"
              aria-label="Remove persona"
            >
              <Trash2 size={14} />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input
              placeholder="Name"
              value={persona.name}
              onChange={(e) => updatePersona(persona.id, { name: e.target.value })}
            />
            <Input
              placeholder="Role / segment"
              value={persona.role}
              onChange={(e) => updatePersona(persona.id, { role: e.target.value })}
            />
          </div>
          <Input
            placeholder="Representative quote"
            value={persona.quote}
            onChange={(e) => updatePersona(persona.id, { quote: e.target.value })}
          />
          <Textarea
            placeholder="Short bio / context"
            rows={2}
            value={persona.bio}
            onChange={(e) => updatePersona(persona.id, { bio: e.target.value })}
          />
          <ListField
            label="Goals"
            items={persona.goals}
            onChange={(goals) => updatePersona(persona.id, { goals })}
          />
          <ListField
            label="Frustrations"
            items={persona.frustrations}
            onChange={(frustrations) => updatePersona(persona.id, { frustrations })}
          />
          <ListField
            label="Behaviors"
            items={persona.behaviors}
            onChange={(behaviors) => updatePersona(persona.id, { behaviors })}
          />
        </div>
      ))}
      <Button variant="secondary" size="sm" onClick={addPersona} className="self-start">
        <Plus size={14} /> Add persona
      </Button>
    </div>
  );
}
