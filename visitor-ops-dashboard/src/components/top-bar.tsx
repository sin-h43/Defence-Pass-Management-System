import { useQuery } from "@tanstack/react-query";
import { Bell, ChevronDown, Search, ShieldAlert } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { DEFAULT_POST_LABEL } from "@/constants/app";
import { useAuth } from "@/features/auth/auth-context";
import { getOperatorAlerts } from "@/services/dashboard-service";

const alertTone = {
  success: "text-success",
  warning: "text-accent",
  destructive: "text-destructive",
  info: "text-info",
};

export function TopBar() {
  const { session } = useAuth();
  const { data: alerts = [] } = useQuery({
    queryKey: ["operator-alerts"],
    queryFn: getOperatorAlerts,
  });
  const now = new Date().toLocaleString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "short",
  });
  const initials =
    session?.displayName
      .split(" ")
      .map((part) => part[0])
      .slice(0, 2)
      .join("") ?? "OP";

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-background/80 px-3 backdrop-blur-md">
      <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
      <Separator orientation="vertical" className="h-5" />

      <div className="hidden items-center gap-2 stencil md:flex">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success" />
        <span>{DEFAULT_POST_LABEL}</span>
      </div>

      <div className="relative ml-auto w-full max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search visitor, pass ID, organization..."
          className="h-9 border-border bg-card pl-9 focus-visible:ring-1 focus-visible:ring-ring"
        />
        <kbd className="absolute right-2 top-1/2 hidden h-5 -translate-y-1/2 items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] text-muted-foreground md:inline-flex">
          Ctrl K
        </kbd>
      </div>

      <div className="hidden flex-col items-end leading-tight lg:flex">
        <span className="mono text-[11px] text-muted-foreground">{now} IST</span>
        <span className="mono text-[10px] text-accent">STANDARD OPS</span>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-4 w-4" />
            <Badge className="absolute -right-0.5 -top-0.5 h-4 min-w-4 rounded-full border-0 bg-accent px-1 text-[10px] text-accent-foreground">
              {alerts.length}
            </Badge>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-80">
          <DropdownMenuLabel className="stencil">Alerts</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {alerts.map((alert) => (
            <DropdownMenuItem key={alert.id} className="flex items-start gap-3 py-2.5">
              <ShieldAlert className={`mt-0.5 h-4 w-4 ${alertTone[alert.severity]}`} />
              <div>
                <div className="text-sm">{alert.title}</div>
                <div className="mono text-[10px] text-muted-foreground">{alert.timestamp}</div>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-9 gap-2 pl-1.5 pr-2">
            <Avatar className="h-7 w-7 rounded-sm">
              <AvatarFallback className="rounded-sm bg-secondary text-xs font-semibold text-foreground">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="hidden flex-col items-start leading-tight md:flex">
              <span className="text-xs font-medium">{session?.displayName ?? "Operator Console"}</span>
              <span className="mono text-[10px] text-muted-foreground">
                {session ? `${session.employeeId} / ${session.clearanceLevel}` : "FastAPI auth pending"}
              </span>
            </div>
            <ChevronDown className="h-3 w-3 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Operator Profile</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>My credentials</DropdownMenuItem>
          <DropdownMenuItem>Session log</DropdownMenuItem>
          <DropdownMenuItem>Switch post</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive">Sign out securely</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
