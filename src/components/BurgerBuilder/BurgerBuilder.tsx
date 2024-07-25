"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Burger from "@/components/BurgerBuilder/Burger/Burger";
import BurgerControls from "@/components/BurgerBuilder/Burger/BurgerControls/BurgerControls";
import Spinner from "@/components/UI/Spinner/Spinner";
import { useAuthStore } from "@/providers/auth-store-provider";
import { useBurgerBuilderStore } from "@/providers/burger-builder-store-provider";
import { Ingredients } from "@/stores/burger-builder-store";
import { isAuthenticated } from "@/utils/auth-helper";
import OrderSummary from "@/components/Checkout/OrderSummary/OrderSummary";
import Modal from "@/components/UI/Modal/Modal";
import { useOrdersStore } from "@/providers/orders-store-provider";

export default function BurgerBuilder() {
  const {
    ingredients,
    error,
    totalPrice,
    addIngredient,
    removeIngredient,
    initIngredients,
  } = useBurgerBuilderStore(
    ({
      ingredients,
      error,
      totalPrice,
      addIngredient,
      removeIngredient,
      initIngredients,
    }) => ({
      ingredients,
      error,
      totalPrice,
      addIngredient,
      removeIngredient,
      initIngredients,
    })
  );

  const { token, setAuthRedirectURL } = useAuthStore(
    ({ token, setAuthRedirectURL }) => ({
      token,
      setAuthRedirectURL,
    })
  );

  const { purchaseBurgerInit } = useOrdersStore(({ purchaseBurgerInit }) => ({
    purchaseBurgerInit,
  }));

  const [purchasing, setPurchasing] = useState(false);

  const router = useRouter();

  const disabledIngredients: Record<keyof Ingredients, boolean> = {
    salad: true,
    meat: true,
    cheese: true,
    bacon: true,
  };

  for (let ingredientCode in ingredients) {
    if (
      ingredients?.[ingredientCode as keyof Ingredients] &&
      ingredients[ingredientCode as keyof Ingredients] > 0
    ) {
      disabledIngredients[ingredientCode as keyof Ingredients] = false;
    }
  }

  useEffect(() => {
    initIngredients();
  }, []);

  const updatePurchasable = (ingredients: Ingredients) => {
    let sum = Object.keys(ingredients)
      .map((igKey) => ingredients[igKey as keyof Ingredients])
      .reduce((sum, val) => sum + val, 0);

    return sum > 0;
  };

  const purchaseHandler = () => {
    if (isAuthenticated(token)) {
      setPurchasing(true);
    } else {
      //  TODO: use this redirect on auth page
      setAuthRedirectURL("/checkout");
      router.push("/auth");
    }
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    purchaseBurgerInit();
    router.push("/checkout");
  };

  let orderSummary = null;

  let burger = error ? <p>Ingredients cannot be fetched</p> : <Spinner />;

  if (ingredients) {
    burger = (
      <>
        <Burger ingredients={ingredients} />
        <BurgerControls
          addIngredient={addIngredient}
          removeIngredient={removeIngredient}
          price={totalPrice}
          disabledIngredients={disabledIngredients}
          enableOrder={updatePurchasable({ ...ingredients })}
          orderHandler={purchaseHandler}
          isAuthenticated={isAuthenticated(token)}
        />
      </>
    );

    orderSummary = (
      <OrderSummary
        totalPrice={totalPrice}
        purchaseCancel={purchaseCancelHandler}
        purchaseContinue={purchaseContinueHandler}
        ingredients={ingredients}
      />
    );
  }

  return (
    <>
      <Modal show={purchasing} closeModalHandler={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </>
  );
}
