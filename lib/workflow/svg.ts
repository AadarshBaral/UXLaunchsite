import type { UserFlowNode } from "./types";

const SHAPE_FILL: Record<string, string> = {
  start: "#0f3d3e",
  end: "#0f3d3e",
  decision: "#f5a524",
  screen: "#ffffff",
};

export function generateFlowSVG(nodes: UserFlowNode[]): string {
  const boxWidth = 200;
  const boxHeight = 48;
  const gap = 40;
  const width = boxWidth + 80;
  const height = nodes.length * (boxHeight + gap) + gap;

  const boxes = nodes
    .map((node, i) => {
      const x = (width - boxWidth) / 2;
      const y = gap + i * (boxHeight + gap);
      const isCircle = node.type === "start" || node.type === "end";
      const fill = SHAPE_FILL[node.type] ?? "#ffffff";
      const textFill = node.type === "screen" ? "#111214" : node.type === "decision" ? "#111214" : "#ffffff";
      const shape = isCircle
        ? `<rect x="${x}" y="${y}" width="${boxWidth}" height="${boxHeight}" rx="24" fill="${fill}" />`
        : `<rect x="${x}" y="${y}" width="${boxWidth}" height="${boxHeight}" rx="8" fill="${fill}" stroke="#e6e6e8" />`;
      const label = escapeXml(node.label || "Untitled");
      const arrow =
        i > 0
          ? `<line x1="${width / 2}" y1="${y - gap}" x2="${width / 2}" y2="${y}" stroke="#9ca3af" stroke-width="1.5" marker-end="url(#arrow)" />`
          : "";
      return `${arrow}${shape}<text x="${width / 2}" y="${y + boxHeight / 2 + 4}" text-anchor="middle" font-family="sans-serif" font-size="13" fill="${textFill}">${label}</text>`;
    })
    .join("\n");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <marker id="arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 z" fill="#9ca3af" />
    </marker>
  </defs>
  <rect width="${width}" height="${height}" fill="#ffffff" />
  ${boxes}
</svg>`;
}

function escapeXml(text: string) {
  return text.replace(/[<>&"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" }[c] ?? c));
}
