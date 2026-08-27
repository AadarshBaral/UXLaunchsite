"use client";

import { useState } from "react";
import { Plus, Trash2, X } from "lucide-react";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { makeId } from "@/lib/id";
import type { GroupBoardData } from "@/lib/workflow/types";

export default function GroupBoard({
  itemLabel,
  groupLabel,
  data,
  onChange,
}: {
  itemLabel: string;
  groupLabel: string;
  data: GroupBoardData;
  onChange: (data: GroupBoardData) => void;
}) {
  const [newItem, setNewItem] = useState("");
  const [newGroup, setNewGroup] = useState("");
  const [dragItemId, setDragItemId] = useState<string | null>(null);

  function addItem() {
    if (!newItem.trim()) return;
    onChange({
      ...data,
      items: [...data.items, { id: makeId(), text: newItem.trim(), groupId: null }],
    });
    setNewItem("");
  }

  function addGroup() {
    if (!newGroup.trim()) return;
    onChange({ ...data, groups: [...data.groups, { id: makeId(), name: newGroup.trim() }] });
    setNewGroup("");
  }

  function moveItem(itemId: string, groupId: string | null) {
    onChange({
      ...data,
      items: data.items.map((i) => (i.id === itemId ? { ...i, groupId } : i)),
    });
  }

  function removeItem(itemId: string) {
    onChange({ ...data, items: data.items.filter((i) => i.id !== itemId) });
  }

  function removeGroup(groupId: string) {
    onChange({
      groups: data.groups.filter((g) => g.id !== groupId),
      items: data.items.map((i) => (i.groupId === groupId ? { ...i, groupId: null } : i)),
    });
  }

  const unassigned = data.items.filter((i) => i.groupId === null);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Input
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addItem()}
          placeholder={`Add a ${itemLabel.toLowerCase()}…`}
        />
        <Button variant="secondary" size="sm" onClick={addItem} className="shrink-0">
          <Plus size={14} /> Add
        </Button>
      </div>

      {unassigned.length > 0 && (
        <div>
          <div className="text-xs font-medium text-ink-muted mb-1.5">Unassigned</div>
          <div className="flex flex-wrap gap-1.5">
            {unassigned.map((item) => (
              <Card
                key={item.id}
                text={item.text}
                draggable
                onDragStart={() => setDragItemId(item.id)}
                onRemove={() => removeItem(item.id)}
              />
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-3 overflow-x-auto thin-scroll pb-1">
        {data.groups.map((group) => {
          const items = data.items.filter((i) => i.groupId === group.id);
          return (
            <div
              key={group.id}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => dragItemId && moveItem(dragItemId, group.id)}
              className="w-56 shrink-0 border border-line rounded-md bg-surface/60 p-3 flex flex-col gap-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-ink">{group.name}</span>
                <button
                  onClick={() => removeGroup(group.id)}
                  className="text-ink-disabled hover:text-status-red cursor-pointer"
                  aria-label="Remove group"
                >
                  <X size={13} />
                </button>
              </div>
              <div className="flex flex-col gap-1.5 min-h-[32px]">
                {items.map((item) => (
                  <Card
                    key={item.id}
                    text={item.text}
                    draggable
                    onDragStart={() => setDragItemId(item.id)}
                    onRemove={() => removeItem(item.id)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-2">
        <Input
          value={newGroup}
          onChange={(e) => setNewGroup(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addGroup()}
          placeholder={`New ${groupLabel.toLowerCase()} name…`}
          className="max-w-xs"
        />
        <Button variant="ghost" size="sm" onClick={addGroup}>
          <Plus size={13} /> Add {groupLabel.toLowerCase()}
        </Button>
      </div>
    </div>
  );
}

function Card({
  text,
  draggable,
  onDragStart,
  onRemove,
}: {
  text: string;
  draggable?: boolean;
  onDragStart?: () => void;
  onRemove: () => void;
}) {
  return (
    <div
      draggable={draggable}
      onDragStart={onDragStart}
      className="group flex items-center gap-1.5 rounded-md border border-line bg-background px-2 py-1.5 text-sm text-ink cursor-grab active:cursor-grabbing"
    >
      <span className="flex-1 truncate">{text}</span>
      <button
        onClick={onRemove}
        className="opacity-0 group-hover:opacity-100 text-ink-disabled hover:text-status-red cursor-pointer"
        aria-label="Remove"
      >
        <Trash2 size={12} />
      </button>
    </div>
  );
}
