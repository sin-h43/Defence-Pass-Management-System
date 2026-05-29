import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { AUTH_CONFIG } from "@/constants/app";
import { getCurrentSession, signOut } from "@/services/api/auth-service";
import type { AuthSession, UserRole } from "@/types/auth";

type AuthContextValue = {
  session: AuthSession | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  enforceAuth: boolean;
  hasRole: (role: UserRole) => boolean;
  refreshSession: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshSession = async () => {
    setIsLoading(true);
    try {
      setSession(await getCurrentSession());
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void refreshSession();
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      isLoading,
      isAuthenticated: Boolean(session),
      enforceAuth: AUTH_CONFIG.enforceAuth,
      hasRole: (role) => Boolean(session?.roles.includes(role)),
      refreshSession,
      signOut,
    }),
    [isLoading, session],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
