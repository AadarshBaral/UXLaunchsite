import { makeId } from "@/lib/id";
import type { DeliverableConfig } from "./types";

export function createInitialData(config: DeliverableConfig): unknown {
  switch (config.type) {
    case "doc": {
      const values: Record<string, string> = {};
      config.doc?.sections.forEach((s) => (values[s.id] = ""));
      return { values };
    }
    case "table": {
      const rows = config.table?.seedRows?.map((r) => ({ ...r })) ?? [];
      return { rows };
    }
    case "script": {
      const values: Record<string, string[]> = {};
      config.script?.sections.forEach((s) => (values[s.id] = []));
      return { values };
    }
    case "groupboard": {
      const groups = (config.groupboard?.seedGroups ?? ["Group 1"]).map((name) => ({
        id: makeId(),
        name,
      }));
      return { items: [], groups };
    }
    case "persona":
      return { personas: [] };
    case "matrix2x2":
      return { items: [] };
    case "sitemap":
      return { root: { id: makeId(), label: "Home", children: [] } };
    case "taskflow":
      return { steps: [] };
    case "userflow":
      return {
        nodes: [
          { id: makeId(), label: "Start", type: "start" },
          { id: makeId(), label: "End", type: "end" },
        ],
      };
    case "checklist": {
      const items = (config.checklist?.seedItems ?? []).map((label) => ({
        id: makeId(),
        label,
        done: false,
      }));
      return { items };
    }
    case "principles":
      return { principles: [] };
    default:
      return {};
  }
}
