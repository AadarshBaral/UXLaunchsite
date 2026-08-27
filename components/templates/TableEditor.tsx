"use client";

import { Plus, Trash2 } from "lucide-react";
import Button from "@/components/ui/Button";
import type { TableColumn, TableData } from "@/lib/workflow/types";

export default function TableEditor({
  columns,
  data,
  onChange,
}: {
  columns: TableColumn[];
  data: TableData;
  onChange: (data: TableData) => void;
}) {
  function updateCell(rowIndex: number, key: string, value: string) {
    const rows = data.rows.map((row, i) => (i === rowIndex ? { ...row, [key]: value } : row));
    onChange({ rows });
  }

  function addRow() {
    const blank = Object.fromEntries(columns.map((c) => [c.key, ""]));
    onChange({ rows: [...data.rows, blank] });
  }

  function removeRow(rowIndex: number) {
    onChange({ rows: data.rows.filter((_, i) => i !== rowIndex) });
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="border border-line rounded-md overflow-x-auto thin-scroll">
        <table className="w-full text-sm min-w-[420px]">
          <thead>
            <tr className="border-b border-line bg-surface text-xs font-medium text-ink-muted">
              {columns.map((col) => (
                <th key={col.key} className="text-left px-3 py-2 font-medium">
                  {col.label}
                </th>
              ))}
              <th className="w-9" />
            </tr>
          </thead>
          <tbody>
            {data.rows.length === 0 && (
              <tr>
                <td colSpan={columns.length + 1} className="px-3 py-6 text-center text-ink-disabled text-sm">
                  No rows yet.
                </td>
              </tr>
            )}
            {data.rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b border-line last:border-b-0">
                {columns.map((col) => (
                  <td key={col.key} className="p-0">
                    <input
                      value={row[col.key] ?? ""}
                      onChange={(e) => updateCell(rowIndex, col.key, e.target.value)}
                      className="w-full h-10 bg-transparent px-3 text-sm text-ink focus:outline-none focus:bg-surface"
                    />
                  </td>
                ))}
                <td className="text-center">
                  <button
                    onClick={() => removeRow(rowIndex)}
                    className="h-7 w-7 inline-flex items-center justify-center rounded-md text-ink-disabled hover:text-status-red hover:bg-surface cursor-pointer"
                    aria-label="Remove row"
                  >
                    <Trash2 size={13} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Button variant="secondary" size="sm" onClick={addRow} className="self-start">
        <Plus size={14} /> Add row
      </Button>
    </div>
  );
}
