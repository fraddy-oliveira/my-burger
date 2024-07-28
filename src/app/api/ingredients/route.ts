import { jsonResponse } from "@/api/helpers/api-helpers";
import BurgerService from "@/api/services/burger.service";
import APIError from "@/api/utils/api-error";
import { API_ERROR } from "@/api/utils/constants";

export type GetIngredientsFirebaseResponse = {
  bacon: number;
  cheese: number;
  meat: number;
  salad: number;
};

export type GetIngredientsResponsePayload = {
  bacon: number;
  cheese: number;
  meat: number;
  salad: number;
};

export async function GET() {
  try {
    return jsonResponse(await BurgerService.getIngredients());
  } catch (error) {
    if (error instanceof APIError) {
      return jsonResponse(
        { message: error.message, errorCode: error.errorCode },
        error.statusCode
      );
    }

    return jsonResponse({ message: API_ERROR.SERVER_INTERNAL_ERROR }, 500);
  }
}
