import type { ReactNode } from "react";
import { ShieldAlert } from "lucide-react";
import { EmptyState } from "@/components/feedback/empty-state";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/features/auth/auth-context";
import type { UserRole } from "@/types/auth";

export function ProtectedRoute({
  roles,
  children,
}: {
  roles?: UserRole[];
  children: ReactNode;
}) {
  const auth = useAuth();

  if (!auth.enforceAuth) {
    return children;
  }

  if (auth.isLoading) {
    return <div className="p-6 text-sm text-muted-foreground">Checking session...</div>;
  }

  if (!auth.isAuthenticated || (roles && !roles.some(auth.hasRole))) {
    return (
      <Card className="m-6 border-border bg-card">
        <EmptyState
          icon={ShieldAlert}
          title="Access restricted"
          description="Your session does not have clearance for this portal."
        />
      </Card>
    );
  }

  return children;
}
