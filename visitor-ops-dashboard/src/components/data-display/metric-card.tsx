import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const toneClassName = {
  default: "text-foreground",
  warning: "text-warning",
  success: "text-success",
  info: "text-info",
  destructive: "text-destructive",
};

export function MetricCard({
  label,
  value,
  delta,
  icon: Icon,
  tone = "default",
}: {
  label: string;
  value: string;
  delta: string;
  icon: LucideIcon;
  tone?: keyof typeof toneClassName;
}) {
  return (
    <Card className="relative overflow-hidden border-border bg-card p-4 transition-colors hover:border-ring/40">
      <div className="absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-accent/60 to-transparent" />
      <div className="flex items-start justify-between">
        <div className="stencil">{label}</div>
        <Icon className={cn("h-4 w-4", toneClassName[tone])} />
      </div>
      <div className="mt-3 flex items-baseline gap-2">
        <div className={cn("mono text-3xl font-semibold tabular-nums", toneClassName[tone])}>{value}</div>
        <div className="mono text-[11px] text-muted-foreground">{delta}</div>
      </div>
    </Card>
  );
}
