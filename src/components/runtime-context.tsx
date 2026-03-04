"use client";

import { UserRole, canAccessModule } from "@/lib/domain";
import { auth } from "@/lib/firebase";
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

interface RuntimeState {
  tenantId: string;
  userId: string;
  role: UserRole;
  setTenantId: (value: string) => void;
  setUserId: (value: string) => void;
  setRole: (value: UserRole) => void;
  canAccess: (module: "objecten" | "planning" | "assets" | "taken") => boolean;
}

const STORAGE_KEY = "grondicore-runtime";

const RuntimeContext = createContext<RuntimeState | null>(null);

interface RuntimeStoredState {
  tenantId: string;
  userId: string;
  role: UserRole;
}

function getInitialState(): RuntimeStoredState {
  const defaults: RuntimeStoredState = {
    tenantId: "demo-tenant",
    userId: "usr-001",
    role: "planner",
  };

  if (typeof window === "undefined") {
    return defaults;
  }

  const rawValue = localStorage.getItem(STORAGE_KEY);
  if (!rawValue) {
    return defaults;
  }

  try {
    const parsed = JSON.parse(rawValue) as Partial<RuntimeStoredState>;
    return {
      tenantId: parsed.tenantId ?? defaults.tenantId,
      userId: parsed.userId ?? defaults.userId,
      role: parsed.role ?? defaults.role,
    };
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return defaults;
  }
}

export function RuntimeProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<RuntimeStoredState>(getInitialState);

  const setTenantId = (tenantId: string) => setState((current) => ({ ...current, tenantId }));
  const setUserId = (userId: string) => setState((current) => ({ ...current, userId }));
  const setRole = (role: UserRole) => setState((current) => ({ ...current, role }));

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    if (!auth) {
      return;
    }

    return onAuthStateChanged(auth, (user) => {
      if (!user?.uid) {
        return;
      }

      setState((current) =>
        current.userId === user.uid ? current : { ...current, userId: user.uid }
      );
    });
  }, []);

  const value = useMemo<RuntimeState>(
    () => ({
      tenantId: state.tenantId,
      userId: state.userId,
      role: state.role,
      setTenantId,
      setUserId,
      setRole,
      canAccess: (module) => canAccessModule(state.role, module),
    }),
    [state]
  );

  return <RuntimeContext.Provider value={value}>{children}</RuntimeContext.Provider>;
}

export function useRuntime() {
  const value = useContext(RuntimeContext);
  if (!value) {
    throw new Error("useRuntime must be used within RuntimeProvider");
  }
  return value;
}