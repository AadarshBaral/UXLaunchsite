import { makeId } from "@/lib/id";
import type { SitemapNode } from "./types";

export function updateNode(node: SitemapNode, id: string, patch: Partial<SitemapNode>): SitemapNode {
  if (node.id === id) return { ...node, ...patch };
  return { ...node, children: node.children.map((c) => updateNode(c, id, patch)) };
}

export function addChild(node: SitemapNode, parentId: string): SitemapNode {
  if (node.id === parentId) {
    return {
      ...node,
      children: [...node.children, { id: makeId(), label: "New page", children: [] }],
    };
  }
  return { ...node, children: node.children.map((c) => addChild(c, parentId)) };
}

export function deleteNode(node: SitemapNode, id: string): SitemapNode {
  return { ...node, children: node.children.filter((c) => c.id !== id).map((c) => deleteNode(c, id)) };
}
