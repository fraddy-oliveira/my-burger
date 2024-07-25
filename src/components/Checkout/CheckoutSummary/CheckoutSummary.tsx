import React from "react";

import Burger from "../../BurgerBuilder/Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from "./CheckoutSummary.module.css";
import { Ingredients } from "@/stores/burger-builder-store";

type Props = React.PropsWithChildren<{
  ingredients: Ingredients;
  cancelCheckout: () => void;
  continueCheckout: () => void;
}>;

export default function CheckoutSummary(props: Props) {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes well</h1>
      <div className={classes.Ingredients}>
        <Burger ingredients={props.ingredients} />
        <Button btnType="Danger" clickHandler={props.cancelCheckout}>
          Cancel
        </Button>
        <Button btnType="Success" clickHandler={props.continueCheckout}>
          Continue
        </Button>
      </div>
    </div>
  );
}
