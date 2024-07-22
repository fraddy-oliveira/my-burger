import { Ingredients } from "@/stores/burger-builder-store";

export type Orders = {
  id: string;
  price: number;
  ingredients: Ingredients;
};
