"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/providers/auth-store-provider";
import { fetchOrders } from "@/services/fetch-orders";
import { isAuthenticated } from "@/utils/auth-helper";
import Spinner from "@/components/UI/Spinner/Spinner";
import { Orders } from "@/types/orders-types";
import classes from "./orders.module.css";
import { Ingredients } from "@/stores/burger-builder-store";

export default function Orders() {
  const router = useRouter();
  const [orders, setOrders] = useState<Orders[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>("");

  const { token } = useAuthStore(({ token }) => ({
    token,
  }));

  useEffect(() => {
    if (!token || isAuthenticated(token) === false) {
      router.push("/auth");
      return;
    }

    setLoading(true);

    fetchOrders(token)
      .then((d) => {
        if ("data" in d) {
          setOrders(d.data);
          setError(null);
        } else {
          throw d;
        }
      })
      .catch((d) => {
        setOrders([]);
        setError(d?.error?.message);
      })
      .finally(() => {
        setLoading(false);
      });
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

  if (error) return <div>{error}</div>;

  return <div>{loading ? <Spinner /> : allOrders}</div>;
}
