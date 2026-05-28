import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Users,
  Clock,
  ShieldCheck,
  Activity,
  XOctagon,
  ArrowUpRight,
  Plus,
  QrCode,
  ChevronRight,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/status-badge";
import { requests } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Operations Dashboard · Sentry-Ops" },
      { name: "description", content: "Live operational dashboard for visitor pass management." },
    ],
  }),
  component: Dashboard,
});

const stats = [
  { label: "Total Requests · 24h", value: "42", delta: "+8", icon: Users, tone: "text-foreground" },
  { label: "Pending HR Approval", value: "07", delta: "2 urgent", icon: Clock, tone: "text-warning" },
  { label: "Approved Passes", value: "28", delta: "+12", icon: ShieldCheck, tone: "text-success" },
  { label: "Active On-site", value: "13", delta: "live", icon: Activity, tone: "text-info" },
  { label: "Rejected · 24h", value: "04", delta: "-1", icon: XOctagon, tone: "text-destructive" },
];

function Dashboard() {
  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="stencil mb-1.5">Briefing · 28 May 2026</div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Operations Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Live status of visitor access across all gates and sectors.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="border-border bg-card hover:bg-secondary">
            <QrCode className="h-4 w-4" /> Scan pass
          </Button>
          <Button asChild className="bg-accent text-accent-foreground hover:brightness-110">
            <Link to="/requests/new">
              <Plus className="h-4 w-4" /> New visitor request
            </Link>
          </Button>
        </div>
      </div>

      {/* Stat grid */}
      <div className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {stats.map((s) => (
          <Card
            key={s.label}
            className="p-4 bg-card border-border hover:border-ring/40 transition-colors relative overflow-hidden"
          >
            <div className="absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-accent/60 to-transparent" />
            <div className="flex items-start justify-between">
              <div className="stencil">{s.label}</div>
              <s.icon className={cn("h-4 w-4", s.tone)} />
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <div className={cn("text-3xl font-semibold mono tabular-nums", s.tone)}>{s.value}</div>
              <div className="text-[11px] text-muted-foreground mono">{s.delta}</div>
            </div>
          </Card>
        ))}
      </div>

      {/* Main grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent requests */}
        <Card className="lg:col-span-2 bg-card border-border overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div>
              <div className="stencil">Stream · Recent requests</div>
              <h2 className="text-sm font-semibold mt-0.5">Last 7 entries</h2>
            </div>
            <Button asChild variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <Link to="/requests">
                View all <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="stencil h-9">Visitor</TableHead>
                  <TableHead className="stencil h-9">Organization</TableHead>
                  <TableHead className="stencil h-9">Purpose</TableHead>
                  <TableHead className="stencil h-9">Visit</TableHead>
                  <TableHead className="stencil h-9">Status</TableHead>
                  <TableHead className="stencil h-9 text-center">QR</TableHead>
                  <TableHead className="stencil h-9">HR decision</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((r) => (
                  <TableRow key={r.id} className="border-border hover:bg-secondary/40 cursor-pointer">
                    <TableCell>
                      <div className="font-medium text-sm">{r.visitor}</div>
                      <div className="mono text-[10px] text-muted-foreground">{r.id}</div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{r.org}</TableCell>
                    <TableCell className="text-sm">{r.purpose}</TableCell>
                    <TableCell className="mono text-xs text-muted-foreground">{r.visitAt}</TableCell>
                    <TableCell><StatusBadge status={r.status} /></TableCell>
                    <TableCell className="text-center">
                      {r.qr ? (
                        <QrCode className="h-4 w-4 mx-auto text-accent" />
                      ) : (
                        <span className="text-muted-foreground mono text-xs">—</span>
                      )}
                    </TableCell>
                    <TableCell className="mono text-xs text-muted-foreground">
                      {r.hrDecisionAt ?? "—"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>

        {/* Right column */}
        <div className="space-y-6">
          <Card className="bg-card border-border p-4">
            <div className="stencil">Sector load · Live</div>
            <h2 className="text-sm font-semibold mt-0.5 mb-4">Active visitors by zone</h2>
            <div className="space-y-3">
              {[
                { z: "Hangar 4 · Engineering", n: 5, cap: 12 },
                { z: "R&D Wing C", n: 3, cap: 8 },
                { z: "Admin Block", n: 2, cap: 20 },
                { z: "Logistics Gate B", n: 2, cap: 10 },
                { z: "Public Affairs", n: 1, cap: 6 },
              ].map((z) => {
                const pct = (z.n / z.cap) * 100;
                return (
                  <div key={z.z}>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-foreground">{z.z}</span>
                      <span className="mono text-muted-foreground">{z.n}/{z.cap}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                      <div
                        className={cn(
                          "h-full transition-all",
                          pct > 70 ? "bg-destructive" : pct > 40 ? "bg-accent" : "bg-success",
                        )}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card className="bg-card border-border p-4">
            <div className="stencil">Quick actions</div>
            <h2 className="text-sm font-semibold mt-0.5 mb-3">Operator shortcuts</h2>
            <div className="grid grid-cols-2 gap-2">
              {[
                { l: "Repeat visitor", to: "/requests/new" },
                { l: "Bulk import", to: "/requests/new" },
                { l: "Today's roster", to: "/requests" },
                { l: "Overstay alerts", to: "/requests" },
              ].map((a) => (
                <Button
                  key={a.l}
                  asChild
                  variant="outline"
                  className="justify-between border-border bg-background hover:bg-secondary h-auto py-2.5"
                >
                  <Link to={a.to}>
                    <span className="text-xs">{a.l}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground" />
                  </Link>
                </Button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
