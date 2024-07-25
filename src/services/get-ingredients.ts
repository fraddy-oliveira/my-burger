import { Ingredients } from "@/stores/burger-builder-store";
import { StandardResponse, internalError } from "@/types/StandardResponse";

export const getIngredients = async (): Promise<
  StandardResponse<Ingredients>
> => {
  try {
    let url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/ingredients`;

    const response = await fetch(url);

    if (!response.ok) {
      return {
        error: {
          message: "Failed to load ingredients.",
          statusCode: response.status,
        },
      };
    }

    const responsePayload = await response.json();

    return {
      data: responsePayload,
    };
  } catch (error) {
    return internalError;
  }
};
