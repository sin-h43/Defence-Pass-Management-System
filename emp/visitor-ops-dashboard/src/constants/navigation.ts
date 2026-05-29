import {
  ClipboardList,
  History,
  LayoutDashboard,
  QrCode,
  ShieldCheck,
  UserPlus,
  Users,
  type LucideIcon,
} from "lucide-react";

export type NavigationItem = {
  title: string;
  url: string;
  icon: LucideIcon;
};

export const operationsNavigation: NavigationItem[] = [
  { title: "Operations Dashboard", url: "/", icon: LayoutDashboard },
  { title: "New Visitor Request", url: "/requests/new", icon: UserPlus },
  { title: "All Requests", url: "/requests", icon: ClipboardList },
  { title: "Visitor Directory", url: "/visitors", icon: Users },
];

export const complianceNavigation: NavigationItem[] = [
  { title: "Active Passes", url: "/passes", icon: QrCode },
  { title: "Audit Trail", url: "/audit", icon: History },
  { title: "Clearance Levels", url: "/clearance", icon: ShieldCheck },
];
