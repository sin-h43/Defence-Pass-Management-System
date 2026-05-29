import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { TopBar } from "@/components/top-bar";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 ops-grid">
      <div className="max-w-md text-center">
        <div className="stencil mb-2">Sector unmapped</div>
        <h1 className="text-7xl font-bold text-foreground mono">404</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          No clearance record exists for this route.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center rounded-sm bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-colors hover:brightness-110"
        >
          Return to Operations
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <div className="stencil mb-2 text-destructive">Channel disrupted</div>
        <h1 className="text-xl font-semibold tracking-tight">Console encountered a fault</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <div className="mt-6 flex justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="inline-flex items-center justify-center rounded-sm bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:brightness-110"
          >
            Retry
          </button>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Sentry-Ops · Visitor Access Control" },
      { name: "description", content: "Internal employee portal for defence visitor pass management." },
      { property: "og:title", content: "Sentry-Ops · Visitor Access Control" },
      { name: "twitter:title", content: "Sentry-Ops · Visitor Access Control" },
      { property: "og:description", content: "Internal employee portal for defence visitor pass management." },
      { name: "twitter:description", content: "Internal employee portal for defence visitor pass management." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/f0dcda2c-ab62-4b03-9aab-a165839cc346/id-preview-4cfb47b0--eb5dae84-8876-4d10-b79a-c2a187d0ddab.lovable.app-1779989019635.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/f0dcda2c-ab62-4b03-9aab-a165839cc346/id-preview-4cfb47b0--eb5dae84-8876-4d10-b79a-c2a187d0ddab.lovable.app-1779989019635.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head><HeadContent /></head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="bg-background">
          <TopBar />
          <main className="flex-1 ops-grid">
            <Outlet />
          </main>
        </SidebarInset>
        <Toaster theme="dark" position="bottom-right" />
      </SidebarProvider>
    </QueryClientProvider>
  );
}
