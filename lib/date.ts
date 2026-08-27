export function formatDate(iso?: string): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

export function isOverdue(dueDate: string | undefined, complete: boolean): boolean {
  if (!dueDate || complete) return false;
  return new Date(dueDate).getTime() < new Date(new Date().toDateString()).getTime();
}
