import {
  GetIngredientsFirebaseResponse,
  GetIngredientsResponsePayload,
} from "@/app/api/ingredients/route";
import APIError from "../utils/api-error";
import { API_ERROR } from "../utils/constants";

export default class BurgerService {
  static async getIngredients(): Promise<GetIngredientsResponsePayload> {
    const response = await fetch(
      `${process.env.FIREBASE_BASE_URL}/ingredients.json`
    );

    if (!response.ok) {
      throw new APIError(
        API_ERROR.BURGER_INGREDIENTS_NOT_FOUND,
        response.status
      );
    }

    return (await response.json()) as GetIngredientsFirebaseResponse;
  }
}
