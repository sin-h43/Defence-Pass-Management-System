import { Link } from "@tanstack/react-router";
import { ArrowLeft, Construction } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function ModulePlaceholder({ title, description }: { title: string; description: string }) {
  return (
    <div className="mx-auto max-w-3xl p-8">
      <div className="stencil mb-2">Module</div>
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      <Card className="mt-6 border-border bg-card p-10 text-center">
        <Construction className="mx-auto mb-3 h-10 w-10 text-accent" />
        <div className="stencil">Pending deployment</div>
        <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">
          This module is scheduled for rollout in the next operational sprint.
        </p>
        <Button asChild variant="outline" className="mt-5 border-border bg-background">
          <Link to="/">
            <ArrowLeft className="h-4 w-4" /> Back to operations
          </Link>
        </Button>
      </Card>
    </div>
  );
}
