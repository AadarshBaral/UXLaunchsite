import { copyToClipboard, downloadFile, slugify, toCSV } from "@/lib/export";
import { deliverableToMarkdown, generateMermaidFlow, generateTaskFlowMermaid } from "./markdown";
import { exportMatrixPNG } from "./canvas";
import { generateFlowSVG } from "./svg";
import type {
  DeliverableConfig,
  GroupBoardData,
  Matrix2x2Data,
  TableData,
  TaskFlowData,
  UserFlowData,
} from "./types";

function tableCSV(config: DeliverableConfig, data: unknown): string | null {
  if (config.type === "table") {
    const d = data as TableData;
    return toCSV(config.table!.columns, d.rows);
  }
  if (config.type === "groupboard") {
    const d = data as GroupBoardData;
    const rows = d.items.map((i) => ({
      item: i.text,
      group: d.groups.find((g) => g.id === i.groupId)?.name ?? "",
    }));
    return toCSV(
      [
        { key: "item", label: config.groupboard!.itemLabel },
        { key: "group", label: config.groupboard!.groupLabel },
      ],
      rows
    );
  }
  return null;
}

function mermaidFor(config: DeliverableConfig, data: unknown): string | null {
  if (config.type === "userflow") return generateMermaidFlow((data as UserFlowData).nodes);
  if (config.type === "taskflow") return generateTaskFlowMermaid((data as TaskFlowData).steps);
  return null;
}

export async function runExport(format: string, config: DeliverableConfig, data: unknown) {
  const base = slugify(config.title);

  switch (format) {
    case "Markdown":
    case "Copy to Notion": {
      const md = deliverableToMarkdown(config, data);
      if (format === "Copy to Notion") {
        await copyToClipboard(md);
        alert("Markdown copied — paste it directly into a Notion page.");
      } else {
        downloadFile(`${base}.md`, md, "text/markdown");
      }
      return;
    }
    case "CSV": {
      const csv = tableCSV(config, data);
      if (csv) downloadFile(`${base}.csv`, csv, "text/csv");
      return;
    }
    case "JSON": {
      downloadFile(`${base}.json`, JSON.stringify(data, null, 2), "application/json");
      return;
    }
    case "Mermaid.js code": {
      const mermaid = mermaidFor(config, data);
      if (mermaid) {
        await copyToClipboard(mermaid);
        alert("Mermaid.js code copied to clipboard.");
      }
      return;
    }
    case "SVG": {
      if (config.type === "userflow") {
        const svg = generateFlowSVG((data as UserFlowData).nodes);
        downloadFile(`${base}.svg`, svg, "image/svg+xml");
      }
      return;
    }
    case "PNG": {
      if (config.type === "matrix2x2") {
        exportMatrixPNG(data as Matrix2x2Data, config.matrix2x2!.xLabel, config.matrix2x2!.yLabel, `${base}.png`);
      } else {
        window.print();
      }
      return;
    }
    case "PDF": {
      window.print();
      return;
    }
    case "Copyable Figma Spec Document": {
      const md = deliverableToMarkdown(config, data);
      await copyToClipboard(md);
      alert("Figma-ready spec document copied to clipboard.");
      return;
    }
    default:
      return;
  }
}
