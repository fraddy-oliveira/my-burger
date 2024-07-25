"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import CheckoutSummary from "./CheckoutSummary/CheckoutSummary";
import { useBurgerBuilderStore } from "@/providers/burger-builder-store-provider";
import { useOrdersStore } from "@/providers/orders-store-provider";

type Props = React.PropsWithChildren<{}>;

export default function Checkout({}: Props) {
  const router = useRouter();

  const { ingredients } = useBurgerBuilderStore(({ ingredients }) => ({
    ingredients,
  }));

  const { purchased } = useOrdersStore(({ purchased }) => ({ purchased }));

  useEffect(() => {
    if (!ingredients || purchased) {
      router.push("/");
    }
  }, [ingredients, purchased]);

  if (!ingredients || purchased) {
    return null;
  }

  const cancelCheckoutHandler = () => {
    router.back();
  };

  const continueCheckoutHandler = () => {
    router.replace("/contact-data");
  };

  return (
    <div>
      <CheckoutSummary
        ingredients={ingredients}
        cancelCheckout={cancelCheckoutHandler}
        continueCheckout={continueCheckoutHandler}
      />
    </div>
  );
}
