import { mockRecentVisitors, mockVisitorRequests } from "@/services/mocks/visitor-mock-data";
import type { RecentVisitor, VisitorRequest } from "@/types/visitor";

export async function listVisitorRequests(): Promise<VisitorRequest[]> {
  return Promise.resolve(mockVisitorRequests);
}

export async function listRecentVisitors(): Promise<RecentVisitor[]> {
  return Promise.resolve(mockRecentVisitors);
}

export async function createVisitorRequest(): Promise<{ id: string }> {
  return Promise.resolve({ id: "VP-3048" });
}
