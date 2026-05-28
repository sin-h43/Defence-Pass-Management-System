import { Outlet } from "@tanstack/react-router";
import { AppErrorBoundary } from "@/components/feedback/error-boundary";
import { AppSidebar } from "@/components/app-sidebar";
import { TopBar } from "@/components/top-bar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/features/auth/auth-context";
import { ProtectedRoute } from "@/features/auth/protected-route";

export function AppLayout() {
  return (
    <AuthProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="bg-background">
          <TopBar />
          <main className="flex-1 ops-grid">
            <AppErrorBoundary>
              <ProtectedRoute>
                <Outlet />
              </ProtectedRoute>
            </AppErrorBoundary>
          </main>
        </SidebarInset>
        <Toaster theme="dark" position="bottom-right" />
      </SidebarProvider>
    </AuthProvider>
  );
}
