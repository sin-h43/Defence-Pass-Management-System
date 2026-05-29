export type VisitorPassStatus = "pending" | "approved" | "rejected" | "active" | "expired" | "draft";

export type VisitorRequest = {
  id: string;
  visitor: string;
  organization: string;
  purpose: string;
  department: string;
  requestedAt: string;
  visitAt: string;
  duration: string;
  status: VisitorPassStatus;
  hasQr: boolean;
  hrDecisionAt?: string;
  hrOfficer?: string;
  phone: string;
  email: string;
  idType: string;
  idNumber: string;
};

export type RecentVisitor = {
  id: string;
  name: string;
  organization: string;
  lastVisit: string;
  visits: number;
  phone: string;
};

export type ZoneLoad = {
  zone: string;
  activeVisitors: number;
  capacity: number;
};

export type DashboardMetric = {
  label: string;
  value: string;
  delta: string;
  tone: "default" | "warning" | "success" | "info" | "destructive";
};

export type OperatorAlert = {
  id: string;
  title: string;
  timestamp: string;
  severity: "success" | "warning" | "destructive" | "info";
};
