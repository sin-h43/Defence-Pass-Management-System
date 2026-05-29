import type { AuthSession } from "@/types/auth";

export async function getCurrentSession(): Promise<AuthSession | null> {
  return null;
}

export async function signOut(): Promise<void> {
  return Promise.resolve();
}
