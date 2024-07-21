import { createStore } from "zustand/vanilla";
import { createJSONStorage, persist } from "zustand/middleware";

export type Ingredients = {
  salad: number;
  meat: number;
  cheese: number;
  bacon: number;
};

export type BurgerBuilderState = {
  ingredients: Ingredients | null;
  totalPrice: number;
  error: boolean;
  building: boolean;
};

type AddIngredientParams = { ingredientCode: keyof Ingredients };
type RemoveIngredientParams = { ingredientCode: keyof Ingredients };

export type BurgerBuilderActions = {
  addIngredients: (ingredient: AddIngredientParams) => void;
  removeIngredients: (ingredient: RemoveIngredientParams) => void;
  setIngredients: (ingredient: Ingredients) => void;
  fetchIngredientsFailed: () => void;
};

export type BurgerBuilderStore = BurgerBuilderState & BurgerBuilderActions;

export const defaultInitState: BurgerBuilderState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false,
};

const INGREDIENTS_PRICE = {
  salad: 0.1,
  meat: 0.7,
  cheese: 1,
  bacon: 0.9,
};

export const createBurgerBuilderStore = (
  initState: BurgerBuilderState = defaultInitState
) => {
  return createStore<BurgerBuilderStore>()(
    persist(
      (set, get) => ({
        ...initState,
        addIngredients: ({ ingredientCode }: AddIngredientParams) => {
          const ingredients = get().ingredients;

          if (!ingredients) {
            throw new Error("Ingredients not initialized");
          }

          set({
            ingredients: {
              ...ingredients,
              [ingredientCode]: ingredients[ingredientCode] + 1,
            },
          });
        },
        removeIngredients: ({ ingredientCode }: RemoveIngredientParams) => {
          const ingredients = get().ingredients;

          if (!ingredients) {
            throw new Error("Ingredients not initialized");
          }

          set({
            ingredients: {
              ...ingredients,
              [ingredientCode]: ingredients[ingredientCode] - 1,
            },
          });
        },
        setIngredients: (ingredients: Ingredients) => {
          set({
            ingredients,
            error: false,
            building: false,
          });
        },
        fetchIngredientsFailed: () => set({ error: true }),
      }),
      {
        name: "burger-builder",
        skipHydration: false,
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  );
};
