import { mockDashboardMetrics, mockOperatorAlerts, mockZoneLoads } from "@/services/mocks/visitor-mock-data";
import type { DashboardMetric, OperatorAlert, ZoneLoad } from "@/types/visitor";

export async function getDashboardMetrics(): Promise<DashboardMetric[]> {
  return Promise.resolve(mockDashboardMetrics);
}

export async function getZoneLoads(): Promise<ZoneLoad[]> {
  return Promise.resolve(mockZoneLoads);
}

export async function getOperatorAlerts(): Promise<OperatorAlert[]> {
  return Promise.resolve(mockOperatorAlerts);
}
