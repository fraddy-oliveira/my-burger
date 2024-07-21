"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";
import {
  type BurgerBuilderStore,
  createBurgerBuilderStore,
} from "@app/stores/burger-builder-store";

export type BurgerBuilderStoreApi = ReturnType<typeof createBurgerBuilderStore>;

export interface BurgerBuilderStoreProviderProps {
  children: ReactNode;
}

export const BurgerBuilderStoreContext = createContext<
  BurgerBuilderStoreApi | undefined
>(undefined);

export const BurgerBuilderStoreProvider = ({
  children,
}: BurgerBuilderStoreProviderProps) => {
  const storeRef = useRef<BurgerBuilderStoreApi>();

  if (!storeRef.current) {
    storeRef.current = createBurgerBuilderStore();
  }

  return (
    <BurgerBuilderStoreContext.Provider value={storeRef.current}>
      {children}
    </BurgerBuilderStoreContext.Provider>
  );
};

export const useBurgerBuilderStore = <T,>(
  selector: (store: BurgerBuilderStore) => T
): T => {
  const burgerBuilderStoreContext = useContext(BurgerBuilderStoreContext);

  if (!burgerBuilderStoreContext) {
    throw new Error(
      `useBurgerBuilderStore must be used within BurgerBuilderStoreContext`
    );
  }

  return useStore(burgerBuilderStoreContext, selector);
};
