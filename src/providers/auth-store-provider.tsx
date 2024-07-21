"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";
import { type AuthStore, createAuthStore } from "@app/stores/auth-store";

export type AuthStoreApi = ReturnType<typeof createAuthStore>;

export interface AuthStoreProviderProps {
  children: ReactNode;
}

export const AuthStoreContext = createContext<AuthStoreApi | undefined>(
  undefined
);

export const AuthStoreProvider = ({ children }: AuthStoreProviderProps) => {
  const storeRef = useRef<AuthStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createAuthStore();
  }

  return (
    <AuthStoreContext.Provider value={storeRef.current}>
      {children}
    </AuthStoreContext.Provider>
  );
};

export const useAuthStore = <T,>(selector: (store: AuthStore) => T): T => {
  const authStoreContext = useContext(AuthStoreContext);

  if (!authStoreContext) {
    throw new Error(`useAuthStore must be used within AuthStoreContext`);
  }

  return useStore(authStoreContext, selector);
};
