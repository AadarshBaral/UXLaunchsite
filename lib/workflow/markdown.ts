import type {
  ChecklistData,
  DeliverableConfig,
  DocData,
  GroupBoardData,
  Matrix2x2Data,
  PersonaData,
  PrinciplesData,
  Project,
  ScriptData,
  SitemapData,
  SitemapNode,
  TableData,
  TaskFlowData,
  UserFlowData,
} from "./types";
import { PHASES } from "./config";

function sitemapToLines(node: SitemapNode, depth: number): string[] {
  const line = `${"  ".repeat(depth)}- ${node.label || "Untitled"}`;
  return [line, ...node.children.flatMap((c) => sitemapToLines(c, depth + 1))];
}

export function deliverableToMarkdown(config: DeliverableConfig, data: unknown): string {
  switch (config.type) {
    case "doc": {
      const d = data as DocData;
      return (config.doc?.sections ?? [])
        .map((s) => `## ${s.heading}\n\n${d.values[s.id]?.trim() || "_Not filled in yet._"}`)
        .join("\n\n");
    }
    case "table": {
      const d = data as TableData;
      const cols = config.table?.columns ?? [];
      if (d.rows.length === 0) return "_No rows yet._";
      const header = `| ${cols.map((c) => c.label).join(" | ")} |`;
      const divider = `| ${cols.map(() => "---").join(" | ")} |`;
      const rows = d.rows.map((r) => `| ${cols.map((c) => r[c.key] ?? "").join(" | ")} |`);
      return [header, divider, ...rows].join("\n");
    }
    case "script": {
      const d = data as ScriptData;
      return (config.script?.sections ?? [])
        .map((s) => {
          const items = d.values[s.id] ?? [];
          const body = items.length ? items.map((q) => `- ${q}`).join("\n") : "_No questions yet._";
          return `## ${s.heading}\n\n${body}`;
        })
        .join("\n\n");
    }
    case "groupboard": {
      const d = data as GroupBoardData;
      return d.groups
        .map((g) => {
          const items = d.items.filter((i) => i.groupId === g.id);
          const body = items.length ? items.map((i) => `- ${i.text}`).join("\n") : "_Empty._";
          return `## ${g.name}\n\n${body}`;
        })
        .join("\n\n");
    }
    case "persona": {
      const d = data as PersonaData;
      if (d.personas.length === 0) return "_No personas yet._";
      return d.personas
        .map(
          (p) => `## ${p.name || "Unnamed persona"}${p.role ? ` — ${p.role}` : ""}

${p.quote ? `> "${p.quote}"\n` : ""}
${p.bio || ""}

**Goals**
${p.goals.length ? p.goals.map((g) => `- ${g}`).join("\n") : "- _None listed_"}

**Frustrations**
${p.frustrations.length ? p.frustrations.map((g) => `- ${g}`).join("\n") : "- _None listed_"}

**Behaviors**
${p.behaviors.length ? p.behaviors.map((g) => `- ${g}`).join("\n") : "- _None listed_"}`
        )
        .join("\n\n---\n\n");
    }
    case "matrix2x2": {
      const d = data as Matrix2x2Data;
      const quadrant = (impact: number, effort: number) =>
        impact >= 50 && effort < 50
          ? "Do First (High Impact, Low Effort)"
          : impact >= 50
          ? "Plan (High Impact, High Effort)"
          : effort < 50
          ? "Reconsider (Low Impact, Low Effort)"
          : "Delegate (Low Impact, High Effort)";
      const groups = new Map<string, string[]>();
      d.items.forEach((item) => {
        const q = quadrant(item.impact, item.effort);
        groups.set(q, [...(groups.get(q) ?? []), item.label]);
      });
      if (groups.size === 0) return "_No items placed yet._";
      return [...groups.entries()].map(([q, items]) => `## ${q}\n\n${items.map((i) => `- ${i}`).join("\n")}`).join("\n\n");
    }
    case "sitemap": {
      const d = data as SitemapData;
      return sitemapToLines(d.root, 0).join("\n");
    }
    case "taskflow": {
      const d = data as TaskFlowData;
      if (d.steps.length === 0) return "_No steps yet._";
      return d.steps
        .map((s, i) => {
          const branches = s.branches.length ? `\n${s.branches.map((b) => `  - ↳ ${b.label}`).join("\n")}` : "";
          return `${i + 1}. **${s.label || "Untitled step"}**${s.type === "decision" ? " (decision)" : ""}${branches}`;
        })
        .join("\n");
    }
    case "userflow": {
      const d = data as UserFlowData;
      return d.nodes.map((n, i) => `${i + 1}. [${n.type}] ${n.label || "Untitled"}`).join("\n");
    }
    case "checklist": {
      const d = data as ChecklistData;
      return d.items.map((i) => `- [${i.done ? "x" : " "}] ${i.label}`).join("\n");
    }
    case "principles": {
      const d = data as PrinciplesData;
      if (d.principles.length === 0) return "_No principles defined yet._";
      return d.principles
        .map((p, i) => `${i + 1}. **${p.title || "Untitled principle"}** — ${p.description || ""}`)
        .join("\n");
    }
    default:
      return "";
  }
}

export function generateMermaidFlow(nodes: { id: string; label: string; type: string }[]): string {
  const shape = (type: string, label: string) => {
    const safe = label.replace(/"/g, "'") || "Untitled";
    if (type === "decision") return `{${safe}}`;
    if (type === "start" || type === "end") return `((${safe}))`;
    return `[${safe}]`;
  };
  const lines = ["flowchart TD"];
  nodes.forEach((n, i) => {
    lines.push(`  n${i}${shape(n.type, n.label)}`);
    if (i > 0) lines.push(`  n${i - 1} --> n${i}`);
  });
  return lines.join("\n");
}

export function generateTaskFlowMermaid(steps: { id: string; label: string; type: string; branches: { label: string }[] }[]): string {
  const lines = ["flowchart TD"];
  steps.forEach((s, i) => {
    const safe = (s.label || "Untitled").replace(/"/g, "'");
    lines.push(`  s${i}${s.type === "decision" ? `{${safe}}` : `[${safe}]`}`);
    if (i > 0) lines.push(`  s${i - 1} --> s${i}`);
    s.branches.forEach((b, bi) => {
      lines.push(`  s${i} -. "${b.label.replace(/"/g, "'")}" .-> s${i}_branch${bi}[Branch: ${b.label.replace(/"/g, "'")}]`);
    });
  });
  return lines.join("\n");
}

export function generateHandoffDocument(project: Project): string {
  const sections = PHASES.map((phase) => {
    const body = phase.deliverables
      .map((d) => {
        const state = project.deliverables[d.id];
        return `### ${d.title}\n\n${deliverableToMarkdown(d, state?.data)}`;
      })
      .join("\n\n");
    return `# ${phase.title}\n\n${body}`;
  });
  return `# ${project.name} — Figma Handoff Summary\n\n${sections.join("\n\n")}`;
}
