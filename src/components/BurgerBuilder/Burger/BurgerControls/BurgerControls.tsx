import React from "react";
import classes from "./BurgerControls.module.css";
import BurgerControl from "./BuildControl/BuildControl";
import { Ingredients } from "@/stores/burger-builder-store";

const controls: { label: string; type: keyof Ingredients }[] = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
];

type Props = React.PropsWithChildren<{
  price: number;
  enableOrder: boolean;
  isAuthenticated: boolean;
  disabledIngredients: Record<keyof Ingredients, boolean>;
  removeIngredient: (type: keyof Ingredients) => void;
  addIngredient: (type: keyof Ingredients) => void;
  orderHandler: () => void;
}>;

export default function BurgerControls(props: Props) {
  return (
    <div className={classes.BurgerControls}>
      <p>
        Current price: <strong>{props.price.toFixed(2)}</strong>
      </p>
      {controls.map((ingred) => (
        <BurgerControl
          key={ingred.type}
          label={ingred.label}
          type={ingred.type}
          addIngredient={() => props.addIngredient(ingred.type)}
          removeIngredient={() => props.removeIngredient(ingred.type)}
          disabled={props.disabledIngredients[ingred.type]}
        />
      ))}
      <button
        className={classes.OrderButton}
        disabled={!props.enableOrder}
        onClick={props.orderHandler}
      >
        {props.isAuthenticated ? "Order Now" : "Sign in to order"}
      </button>
    </div>
  );
}
