import { createStore } from "zustand/vanilla";
import { createJSONStorage, persist } from "zustand/middleware";
import { getIngredients } from "@/services/get-ingredients";

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

export type BurgerBuilderActions = {
  addIngredient: (ingredientCode: keyof Ingredients) => void;
  removeIngredient: (ingredientCode: keyof Ingredients) => void;
  setIngredients: (ingredient: Ingredients) => void;
  fetchIngredientsFailed: () => void;
  initIngredients: () => Promise<void>;
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
        addIngredient: (ingredientCode: keyof Ingredients) => {
          console.debug(`ingredientCode ${ingredientCode}`);

          const ingredients = get().ingredients;

          if (!ingredients) {
            //  TODO: remove alert
            alert("Ingredients not initialized");
            return;
          }

          set({
            ingredients: {
              ...ingredients,
              [ingredientCode]: ingredients[ingredientCode] + 1,
            },
            totalPrice: get().totalPrice + INGREDIENTS_PRICE[ingredientCode],
            building: true,
          });
        },
        removeIngredient: (ingredientCode: keyof Ingredients) => {
          const ingredients = get().ingredients;

          if (!ingredients) {
            //  TODO: remove alert
            alert("Ingredients not initialized");
            return;
          }

          set({
            ingredients: {
              ...ingredients,
              [ingredientCode]: ingredients[ingredientCode] - 1,
            },
            totalPrice: get().totalPrice - INGREDIENTS_PRICE[ingredientCode],
            building: true,
          });
        },
        setIngredients: (ingredients: Ingredients) => {
          set({
            ingredients: { ...ingredients },
            totalPrice: defaultInitState.totalPrice,
            error: false,
            building: false,
          });
        },
        fetchIngredientsFailed: () => set({ error: true }),
        initIngredients: async () => {
          const response = await getIngredients();
          if ("data" in response) {
            get().setIngredients(response.data);
          } else {
            get().fetchIngredientsFailed();
            //  TODO: remove alert
            alert(`Fetching ingredients failed.`);
          }
        },
      }),
      {
        name: "burger-builder",
        skipHydration: false,
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  );
};
