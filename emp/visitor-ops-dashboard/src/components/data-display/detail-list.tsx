import { cn } from "@/lib/utils";

export function DetailTile({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="rounded-sm border border-border bg-background p-3">
      <div className="stencil">{label}</div>
      <div className={cn("mt-1 text-sm", mono && "mono")}>{value}</div>
    </div>
  );
}

export function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border/60 py-1.5 text-sm last:border-0">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span>{value}</span>
    </div>
  );
}
