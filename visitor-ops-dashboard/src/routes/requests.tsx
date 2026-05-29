import { createFileRoute, Link } from "@tanstack/react-router";
import { Fragment, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { StatusBadge } from "@/components/status-badge";
import { requests, type VisitorRequest } from "@/lib/mock-data";
import {
  Search,
  Filter,
  Plus,
  ChevronDown,
  ChevronRight,
  QrCode,
  Phone,
  Mail,
  Building2,
  ShieldCheck,
  ClipboardCheck,
  Inbox,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/requests")({
  head: () => ({ meta: [{ title: "All Requests · Sentry-Ops" }] }),
  component: RequestsPage,
});

const tabs = [
  { v: "all", label: "All" },
  { v: "pending", label: "Pending" },
  { v: "approved", label: "Approved" },
  { v: "rejected", label: "Denied" },
  { v: "active", label: "On-site" },
] as const;

function RequestsPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]["v"]>("all");
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [drawer, setDrawer] = useState<VisitorRequest | null>(null);

  const filtered = useMemo(() => {
    return requests.filter((r) => {
      const matchTab = tab === "all" || r.status === tab;
      const q = query.trim().toLowerCase();
      const matchQ = !q || [r.visitor, r.org, r.id, r.purpose].some((f) => f.toLowerCase().includes(q));
      return matchTab && matchQ;
    });
  }, [tab, query]);

  const counts = {
    all: requests.length,
    pending: requests.filter((r) => r.status === "pending").length,
    approved: requests.filter((r) => r.status === "approved").length,
    rejected: requests.filter((r) => r.status === "rejected").length,
    active: requests.filter((r) => r.status === "active").length,
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6 max-w-[1600px] mx-auto">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="stencil mb-1">Registry · Visitor requests</div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">All requests</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Search, filter, and inspect every visitor pass raised from this post.
          </p>
        </div>
        <Button asChild className="bg-accent text-accent-foreground hover:brightness-110">
          <Link to="/requests/new"><Plus className="h-4 w-4" /> New request</Link>
        </Button>
      </div>

      <Card className="bg-card border-border">
        <div className="p-4 flex flex-wrap items-center gap-3 border-b border-border">
          <Tabs value={tab} onValueChange={(v) => setTab(v as typeof tab)}>
            <TabsList className="bg-secondary border border-border h-9">
              {tabs.map((t) => (
                <TabsTrigger
                  key={t.v}
                  value={t.v}
                  className="data-[state=active]:bg-card data-[state=active]:text-foreground text-xs gap-2"
                >
                  {t.label}
                  <span className="mono text-[10px] text-muted-foreground">{counts[t.v]}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <div className="relative flex-1 min-w-[200px] max-w-md ml-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter by name, ID, organization…"
              className="pl-9 bg-background border-border h-9"
            />
          </div>
          <Button variant="outline" size="sm" className="border-border bg-background">
            <Filter className="h-3.5 w-3.5" /> Filters
          </Button>
        </div>

        {filtered.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="w-8" />
                  <TableHead className="stencil h-10">Pass ID</TableHead>
                  <TableHead className="stencil h-10">Visitor</TableHead>
                  <TableHead className="stencil h-10">Organization</TableHead>
                  <TableHead className="stencil h-10">Purpose</TableHead>
                  <TableHead className="stencil h-10">Visit</TableHead>
                  <TableHead className="stencil h-10">Status</TableHead>
                  <TableHead className="stencil h-10 text-center">QR</TableHead>
                  <TableHead className="stencil h-10" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((r) => {
                  const isOpen = expanded === r.id;
                  return (
                    <Fragment key={r.id}>
                      <TableRow
                        key={r.id}
                        className="border-border hover:bg-secondary/40"
                        onClick={() => setExpanded(isOpen ? null : r.id)}
                      >
                        <TableCell className="cursor-pointer">
                          {isOpen ? (
                            <ChevronDown className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          )}
                        </TableCell>
                        <TableCell className="mono text-xs text-accent">{r.id}</TableCell>
                        <TableCell className="font-medium text-sm">{r.visitor}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{r.org}</TableCell>
                        <TableCell className="text-sm">{r.purpose}</TableCell>
                        <TableCell className="mono text-xs text-muted-foreground">{r.visitAt}</TableCell>
                        <TableCell><StatusBadge status={r.status} /></TableCell>
                        <TableCell className="text-center">
                          {r.qr ? <QrCode className="h-4 w-4 mx-auto text-accent" /> : <span className="text-muted-foreground">—</span>}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => { e.stopPropagation(); setDrawer(r); }}
                          >
                            Inspect
                          </Button>
                        </TableCell>
                      </TableRow>
                      {isOpen && (
                        <TableRow className="border-border bg-background/50 hover:bg-background/50">
                          <TableCell />
                          <TableCell colSpan={8}>
                            <div className="grid md:grid-cols-4 gap-4 py-2">
                              <Mini icon={Phone} label="Phone" value={r.phone} />
                              <Mini icon={Mail} label="Email" value={r.email} />
                              <Mini icon={Building2} label="Department" value={r.department} />
                              <Mini icon={ClipboardCheck} label="Duration" value={r.duration} />
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </Fragment>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </Card>

      {/* Detail drawer */}
      <Sheet open={!!drawer} onOpenChange={(o) => !o && setDrawer(null)}>
        <SheetContent className="bg-card border-border w-full sm:max-w-lg overflow-y-auto">
          {drawer && (
            <>
              <SheetHeader>
                <div className="flex items-center justify-between">
                  <div className="stencil">Pass record</div>
                  <StatusBadge status={drawer.status} />
                </div>
                <SheetTitle className="text-2xl">{drawer.visitor}</SheetTitle>
                <SheetDescription className="flex items-center gap-2 mono text-xs">
                  <span className="text-accent">{drawer.id}</span>
                  <span>·</span>
                  <span>{drawer.org}</span>
                </SheetDescription>
              </SheetHeader>

              <div className="mt-6 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <Info label="Phone" value={drawer.phone} />
                  <Info label="Email" value={drawer.email} />
                  <Info label="ID type" value={drawer.idType} />
                  <Info label="ID number" value={drawer.idNumber} mono />
                </div>

                <Separator className="bg-border" />

                <div>
                  <div className="stencil mb-2">Visit details</div>
                  <div className="space-y-2">
                    <Row k="Purpose" v={drawer.purpose} />
                    <Row k="Department" v={drawer.department} />
                    <Row k="Requested at" v={drawer.requestedAt} />
                    <Row k="Visit time" v={drawer.visitAt} />
                    <Row k="Duration" v={drawer.duration} />
                  </div>
                </div>

                {drawer.hrDecisionAt && (
                  <>
                    <Separator className="bg-border" />
                    <div>
                      <div className="stencil mb-2">HR decision</div>
                      <div className="rounded-sm border border-border bg-background p-3 flex items-start gap-3">
                        <ShieldCheck className="h-4 w-4 text-success mt-0.5" />
                        <div className="text-sm">
                          <div className="font-medium">{drawer.hrOfficer}</div>
                          <div className="mono text-[11px] text-muted-foreground">{drawer.hrDecisionAt}</div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {drawer.qr && (
                  <div className="rounded-sm border border-accent/30 bg-accent/5 p-4 text-center">
                    <div className="h-32 w-32 mx-auto bg-foreground/95 rounded-sm grid place-items-center mb-2">
                      <QrCode className="h-24 w-24 text-background" />
                    </div>
                    <div className="stencil text-accent">Gate-scannable</div>
                    <div className="mono text-xs text-muted-foreground mt-1">Expires {drawer.visitAt} + {drawer.duration}</div>
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" className="flex-1 border-border bg-background">Revoke pass</Button>
                  <Button className="flex-1 bg-accent text-accent-foreground hover:brightness-110">Print pass</Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

function Mini({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2.5">
      <Icon className="h-4 w-4 text-muted-foreground mt-0.5" />
      <div>
        <div className="stencil">{label}</div>
        <div className="text-xs mt-0.5">{value}</div>
      </div>
    </div>
  );
}

function Info({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="rounded-sm border border-border bg-background p-3">
      <div className="stencil">{label}</div>
      <div className={cn("text-sm mt-1", mono && "mono")}>{value}</div>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between items-center text-sm py-1.5 border-b border-border/60 last:border-0">
      <span className="text-muted-foreground text-xs">{k}</span>
      <span>{v}</span>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="py-16 text-center">
      <div className="mx-auto h-12 w-12 rounded-sm bg-secondary grid place-items-center mb-3">
        <Inbox className="h-6 w-6 text-muted-foreground" />
      </div>
      <div className="stencil">No records match this filter</div>
      <p className="text-sm text-muted-foreground mt-1">Adjust filters or raise a new request.</p>
    </div>
  );
}
