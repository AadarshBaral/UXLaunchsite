"use client";

import { Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { addChild, deleteNode, updateNode } from "@/lib/workflow/tree";
import type { SitemapData, SitemapNode } from "@/lib/workflow/types";

function NodeRow({
  node,
  depth,
  isRoot,
  onUpdate,
  onAddChild,
  onDelete,
}: {
  node: SitemapNode;
  depth: number;
  isRoot: boolean;
  onUpdate: (id: string, label: string) => void;
  onAddChild: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div>
      <div className="flex items-center gap-1.5 py-1" style={{ paddingLeft: depth * 20 }}>
        <Input
          value={node.label}
          onChange={(e) => onUpdate(node.id, e.target.value)}
          className="h-8 max-w-xs"
        />
        <button
          onClick={() => onAddChild(node.id)}
          className="h-7 w-7 shrink-0 inline-flex items-center justify-center rounded-md text-ink-muted hover:bg-surface hover:text-ink cursor-pointer"
          aria-label="Add child page"
        >
          <Plus size={13} />
        </button>
        {!isRoot && (
          <button
            onClick={() => onDelete(node.id)}
            className="h-7 w-7 shrink-0 inline-flex items-center justify-center rounded-md text-ink-disabled hover:text-status-red hover:bg-surface cursor-pointer"
            aria-label="Delete page"
          >
            <Trash2 size={13} />
          </button>
        )}
      </div>
      {node.children.map((child) => (
        <NodeRow
          key={child.id}
          node={child}
          depth={depth + 1}
          isRoot={false}
          onUpdate={onUpdate}
          onAddChild={onAddChild}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default function SitemapTree({
  data,
  onChange,
}: {
  data: SitemapData;
  onChange: (data: SitemapData) => void;
}) {
  return (
    <div>
      <NodeRow
        node={data.root}
        depth={0}
        isRoot
        onUpdate={(id, label) => onChange({ root: updateNode(data.root, id, { label }) })}
        onAddChild={(id) => onChange({ root: addChild(data.root, id) })}
        onDelete={(id) => onChange({ root: deleteNode(data.root, id) })}
      />
    </div>
  );
}
