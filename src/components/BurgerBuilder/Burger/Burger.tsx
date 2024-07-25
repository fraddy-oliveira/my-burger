import { Ingredients } from "@/stores/burger-builder-store";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import classes from "./Burger.module.css";

type Props = React.PropsWithChildren<{
  ingredients: Ingredients;
}>;

export default function Burger(props: Props) {
  let transformedIngredient =
    (props.ingredients &&
      Object.keys(props.ingredients)
        .map((key) =>
          [...Array(props.ingredients[key as keyof Ingredients])].map(
            (_, index) => <BurgerIngredient key={key + index} type={key} />
          )
        )
        .reduce((arr, el) => arr.concat(el), [])) ||
    [];

  if (
    Array.isArray(transformedIngredient) &&
    transformedIngredient.length === 0
  ) {
    transformedIngredient = [<p key={1}>Please start adding ingredients</p>];
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredient}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
}
