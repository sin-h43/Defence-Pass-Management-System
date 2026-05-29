import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Construction, ArrowLeft } from "lucide-react";

function makeStub(title: string, desc: string) {
  return function Stub() {
    return (
      <div className="p-8 max-w-3xl mx-auto">
        <div className="stencil mb-2">Module</div>
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        <p className="text-sm text-muted-foreground mt-1">{desc}</p>
        <Card className="bg-card border-border p-10 mt-6 text-center">
          <Construction className="h-10 w-10 mx-auto text-accent mb-3" />
          <div className="stencil">Pending deployment</div>
          <p className="text-sm text-muted-foreground mt-1 max-w-md mx-auto">
            This module is scheduled for rollout in the next operational sprint.
          </p>
          <Button asChild variant="outline" className="mt-5 border-border bg-background">
            <Link to="/"><ArrowLeft className="h-4 w-4" /> Back to operations</Link>
          </Button>
        </Card>
      </div>
    );
  };
}

export { makeStub };

export const Route = createFileRoute("/passes")({
  head: () => ({ meta: [{ title: "Active Passes · Sentry-Ops" }] }),
  component: makeStub("Active passes", "Live registry of currently scannable visitor passes across all gates."),
});
