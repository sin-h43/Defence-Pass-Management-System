import { cn } from "@/lib/utils";
import type { VisitorPassStatus } from "@/types/visitor";

const statusStyles: Record<VisitorPassStatus, { label: string; className: string; dotClassName: string }> = {
  pending: {
    label: "Pending HR",
    className: "bg-warning/10 text-warning border-warning/30",
    dotClassName: "bg-warning",
  },
  approved: {
    label: "Approved",
    className: "bg-success/10 text-success border-success/30",
    dotClassName: "bg-success",
  },
  rejected: {
    label: "Rejected",
    className: "bg-destructive/10 text-destructive border-destructive/30",
    dotClassName: "bg-destructive",
  },
  active: {
    label: "On-site",
    className: "bg-info/10 text-info border-info/30",
    dotClassName: "bg-info animate-pulse",
  },
  expired: {
    label: "Expired",
    className: "bg-muted text-muted-foreground border-border",
    dotClassName: "bg-muted-foreground",
  },
  draft: {
    label: "Draft",
    className: "bg-secondary text-secondary-foreground border-border",
    dotClassName: "bg-muted-foreground",
  },
};

export function StatusBadge({
  status,
  className,
}: {
  status: VisitorPassStatus;
  className?: string;
}) {
  const config = statusStyles[status];

  return (
    <span
      className={cn(
        "mono inline-flex items-center gap-1.5 rounded-sm border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider",
        config.className,
        className,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", config.dotClassName)} />
      {config.label}
    </span>
  );
}
