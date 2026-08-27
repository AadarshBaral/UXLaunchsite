"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import AvatarPicker from "@/components/projects/AvatarPicker";
import type { Project } from "@/lib/workflow/types";

export default function ProjectSettingsModal({
  open,
  project,
  onClose,
  onSave,
}: {
  open: boolean;
  project: Project;
  onClose: () => void;
  onSave: (patch: {
    name: string;
    avatar?: string;
    startDate?: string;
    dueDate?: string;
  }) => void;
}) {
  const [name, setName] = useState(project.name);
  const [avatar, setAvatar] = useState(project.avatar);
  const [startDate, setStartDate] = useState(project.startDate ?? "");
  const [dueDate, setDueDate] = useState(project.dueDate ?? "");

  function submit() {
    if (!name.trim()) return;
    onSave({ name, avatar, startDate: startDate || undefined, dueDate: dueDate || undefined });
    onClose();
  }

  return (
    <Modal open={open} onClose={onClose} title="Project settings">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
        className="flex flex-col gap-4"
      >
        <AvatarPicker value={avatar} name={name} onChange={setAvatar} />

        <div>
          <label className="block text-xs font-medium text-ink-muted mb-1.5">Project name</label>
          <Input autoFocus value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-ink-muted mb-1.5">Start date</label>
            <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </div>
          <div>
            <label className="block text-xs font-medium text-ink-muted mb-1.5">Due date (optional)</label>
            <div className="flex items-center gap-1.5">
              <Input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
              {dueDate && (
                <button
                  type="button"
                  onClick={() => setDueDate("")}
                  className="h-9 w-9 shrink-0 inline-flex items-center justify-center rounded-md text-ink-disabled hover:text-status-red hover:bg-surface cursor-pointer"
                  aria-label="Clear due date"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={!name.trim()}>
            Save
          </Button>
        </div>
      </form>
    </Modal>
  );
}
