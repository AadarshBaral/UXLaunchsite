import type { DeliverableStatus } from "@/lib/workflow/types";

const COLOR: Record<DeliverableStatus, string> = {
  "not-started": "bg-status-gray",
  "in-progress": "bg-status-amber",
  complete: "bg-status-green",
};

const LABEL: Record<DeliverableStatus, string> = {
  "not-started": "Not started",
  "in-progress": "In progress",
  complete: "Complete",
};

export default function StatusDot({
  status,
  label,
}: {
  status: DeliverableStatus;
  label?: string;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 text-sm text-ink">
      <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${COLOR[status]}`} />
      {label ?? LABEL[status]}
    </span>
  );
}
