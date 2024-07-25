"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/providers/auth-store-provider";
import { isAuthenticated } from "@/utils/auth-helper";
import Spinner from "@/components/UI/Spinner/Spinner";
import { Ingredients } from "@/stores/burger-builder-store";
import { useOrdersStore } from "@/providers/orders-store-provider";
import classes from "./orders.module.css";

export default function Orders() {
  const router = useRouter();

  const { token } = useAuthStore(({ token }) => ({
    token,
  }));

  const { fetchOrders, orders, loading, error } = useOrdersStore(
    ({ fetchOrders, orders, loading, error }) => ({
      fetchOrders,
      orders,
      loading,
      error,
    })
  );

  useEffect(() => {
    if (isAuthenticated(token) === false) {
      router.push("/auth");
      return;
    }

    token && fetchOrders(token);
  }, [token]);

  const allOrders = orders.map((order) => {
    let ingredients = null;
    let ingredientsKeys = Object.keys(order.ingredients);

    ingredients = ingredientsKeys.map((key) => {
      return (
        <span key={key as keyof Ingredients}>
          {order.ingredients[key as keyof Ingredients]
            ? key + "(" + order.ingredients[key as keyof Ingredients] + ") "
            : null}
        </span>
      );
    });

    return (
      <div className={classes.Order} key={order.id}>
        <p>Ingredients: {ingredients}</p>
        <p>
          Price:{" "}
          <strong>
            USD {Number(order.price) ? Number(order.price).toFixed(2) : ""}
          </strong>
        </p>
      </div>
    );
  });

  if (!isAuthenticated(token)) {
    return null;
  }

  if (error !== "") return <div>{error}</div>;

  return <div>{loading ? <Spinner /> : allOrders}</div>;
}
