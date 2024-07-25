import React from "react";
import Button from "@/components/UI/Button/Button";
import { Ingredients } from "@/stores/burger-builder-store";

type Props = React.PropsWithChildren<{
  ingredients: Ingredients;
  totalPrice: number;
  purchaseCancel: () => void;
  purchaseContinue: () => void;
}>;

export default function OrderSummary(props: Props) {
  let ingredientsList = Object.keys(props.ingredients).map((igKey) => (
    <li key={igKey}>
      <span style={{ textTransform: "capitalize" }}>{igKey}</span>:
      {props.ingredients[igKey as keyof Ingredients]}
    </li>
  ));

  return (
    <>
      <p>Your order:</p>
      <p>A delicious burger has following ingredients:</p>
      <ul>{ingredientsList}</ul>
      <p>
        <strong>Total price: {props.totalPrice.toFixed(2)}</strong>
      </p>
      <p>Continue to checkout?</p>
      <Button clickHandler={props.purchaseCancel} btnType="Danger">
        Cancel
      </Button>
      <Button clickHandler={props.purchaseContinue} btnType="Success">
        Continue
      </Button>
    </>
  );
}
