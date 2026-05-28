import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { recentVisitors } from "@/lib/mock-data";
import { Search, Phone, History, UserPlus } from "lucide-react";
import { useEffect } from "react";

export const Route = createFileRoute("/visitors")({
  head: () => ({ meta: [{ title: "Visitor Directory · Sentry-Ops" }] }),
  component: VisitorsPage,
});

function VisitorsPage() {
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  const list = recentVisitors.filter((v) =>
    !q || [v.name, v.org, v.id, v.phone].some((f) => f.toLowerCase().includes(q.toLowerCase())),
  );

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6 max-w-[1600px] mx-auto">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="stencil mb-1">Archive · Visitor profiles</div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Visitor directory</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Repeat visitors with previously cleared identity documents.
          </p>
        </div>
        <Button asChild className="bg-accent text-accent-foreground hover:brightness-110">
          <Link to="/requests/new"><UserPlus className="h-4 w-4" /> Raise pass</Link>
        </Button>
      </div>

      <Card className="bg-card border-border p-4">
        <div className="relative max-w-xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name, phone (+91…), or visitor ID (VIS-…)"
            className="pl-9 bg-background border-border"
          />
        </div>
      </Card>

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="bg-card border-border p-4">
                <Skeleton className="h-10 w-10 rounded-sm bg-secondary" />
                <Skeleton className="h-4 w-3/4 mt-3 bg-secondary" />
                <Skeleton className="h-3 w-1/2 mt-2 bg-secondary" />
                <Skeleton className="h-8 w-full mt-4 bg-secondary" />
              </Card>
            ))
          : list.map((v) => (
              <Card
                key={v.id}
                className="bg-card border-border p-4 hover:border-ring/40 transition-colors group"
              >
                <div className="flex items-start justify-between">
                  <div className="h-11 w-11 rounded-sm bg-secondary grid place-items-center font-semibold text-sm">
                    {v.name.split(" ").map((s) => s[0]).slice(0, 2).join("")}
                  </div>
                  <span className="mono text-[10px] text-muted-foreground">{v.id}</span>
                </div>
                <div className="mt-3">
                  <div className="font-medium">{v.name}</div>
                  <div className="text-xs text-muted-foreground">{v.org}</div>
                </div>
                <div className="mt-3 space-y-1.5 text-xs">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-3 w-3" /> <span className="mono">{v.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <History className="h-3 w-3" /> {v.visits} prior visits · last {v.lastVisit}
                  </div>
                </div>
                <Button
                  asChild
                  variant="outline"
                  className="w-full mt-4 border-border bg-background group-hover:border-accent/60 group-hover:text-accent"
                >
                  <Link to="/requests/new">Reuse profile</Link>
                </Button>
              </Card>
            ))}
      </div>
    </div>
  );
}
