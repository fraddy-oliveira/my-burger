import { createStore } from "zustand/vanilla";
import { createJSONStorage, persist } from "zustand/middleware";
import { Ingredients } from "./burger-builder-store";

export type OrdersState = {
  loading: boolean;
  purchased: boolean;
  orders: {
    id: string;
    price: number;
    ingredients: Ingredients;
  }[];
  error: string;
};

type OrderPayloadType = {
  ingredients: Ingredients;
  price: number;
  customer: Record<string, string>;
};

export type OrderActions = {
  purchaseBurger: (data: {
    orderPayload: OrderPayloadType;
    token: string;
  }) => Promise<void>;
  fetchOrders: (token: string) => Promise<void>;
};

export type OrdersStore = OrdersState & OrderActions;

export const defaultInitState: OrdersState = {
  orders: [],
  loading: false,
  purchased: false,
  error: "",
};

export const createOrdersStore = (
  initState: OrdersState = defaultInitState
) => {
  return createStore<OrdersStore>()(
    persist(
      (set, get) => ({
        ...initState,
        purchaseBurger: async (purchaseBurgerData) => {
          try {
            let url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/order`;

            const response = await fetch(url, {
              method: "POST",
              headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${purchaseBurgerData.token}`,
              },
              body: JSON.stringify(purchaseBurgerData.orderPayload),
            });

            if (!response.ok) {
              return set({ error: "Failed to purchase order." });
            }

            const responsePayload = await response.json();

            set({
              loading: false,
              orders: get().orders.concat({
                ...purchaseBurgerData.orderPayload,
                id: responsePayload.name,
              }),
              purchased: true,
            });
          } catch (error) {
            set({ error: "Oops, some error occurred." });
          }
        },
        fetchOrders: async (token) => {
          try {
            let url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/order`;

            const response = await fetch(url, {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            if (!response.ok) {
              return set({ error: "Failed to load orders." });
            }

            const responsePayload = await response.json();

            const fetchedOrders = [];

            for (let key in responsePayload) {
              fetchedOrders.push({
                ...responsePayload[key],
                id: key,
              });
            }

            set({ orders: fetchedOrders, loading: false });
          } catch (error) {
            set({ error: "Oops, some error occurred." });
          }
        },
      }),
      {
        name: "orders",
        skipHydration: false,
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  );
};
