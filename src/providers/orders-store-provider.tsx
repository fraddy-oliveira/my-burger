"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";
import { type OrdersStore, createOrdersStore } from "@/stores/orders-store";

export type OrdersStoreApi = ReturnType<typeof createOrdersStore>;

export interface OrdersStoreProviderProps {
  children: ReactNode;
}

export const OrdersStoreContext = createContext<OrdersStoreApi | undefined>(
  undefined
);

export const OrdersStoreProvider = ({ children }: OrdersStoreProviderProps) => {
  const storeRef = useRef<OrdersStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createOrdersStore();
  }

  return (
    <OrdersStoreContext.Provider value={storeRef.current}>
      {children}
    </OrdersStoreContext.Provider>
  );
};

export const useOrdersStore = <T,>(selector: (store: OrdersStore) => T): T => {
  const ordersStoreContext = useContext(OrdersStoreContext);

  if (!ordersStoreContext) {
    throw new Error(`useOrdersStore must be used within OrdersStoreContext`);
  }

  return useStore(ordersStoreContext, selector);
};
