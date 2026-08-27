import type { Matrix2x2Data } from "./types";

export function exportMatrixPNG(data: Matrix2x2Data, xLabel: string, yLabel: string, filename: string) {
  const size = 640;
  const pad = 48;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, size, size);

  const boardSize = size - pad * 2;
  ctx.strokeStyle = "#e6e6e8";
  ctx.lineWidth = 1;
  ctx.strokeRect(pad, pad, boardSize, boardSize);
  ctx.beginPath();
  ctx.moveTo(pad + boardSize / 2, pad);
  ctx.lineTo(pad + boardSize / 2, pad + boardSize);
  ctx.moveTo(pad, pad + boardSize / 2);
  ctx.lineTo(pad + boardSize, pad + boardSize / 2);
  ctx.stroke();

  ctx.fillStyle = "#6b7280";
  ctx.font = "12px sans-serif";
  ctx.fillText(`Low ${xLabel} → High ${xLabel}`, pad, size - 16);
  ctx.save();
  ctx.translate(16, pad + boardSize / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.fillText(`Low ${yLabel} → High ${yLabel}`, -boardSize / 4, 0);
  ctx.restore();

  data.items.forEach((item) => {
    const x = pad + (item.effort / 100) * boardSize;
    const y = pad + boardSize - (item.impact / 100) * boardSize;
    ctx.fillStyle = "#0f3d3e";
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#111214";
    ctx.font = "12px sans-serif";
    ctx.fillText(item.label, x + 8, y + 4);
  });

  const url = canvas.toDataURL("image/png");
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
}
