import { jwtDecode } from "jwt-decode";
import { jsonResponse } from "@/api/helpers/api-helpers";
import { AuthToken } from "@/api/types/auth-token.type";
import OrderService from "@/api/services/order.service";
import { API_ERROR } from "@/api/utils/constants";
import APIError from "@/api/utils/api-error";

export type GetOrdersFirebaseResponse = Record<
  string,
  {
    customer: {
      country: string;
      deliveryMethod: string;
      email: string;
      name: string;
      postalCode: string;
      street: string;
    };
    ingredients: { bacon: number; cheese: number; meat: number; salad: number };
    price: number;
    user_id: string;
  }
>;

type CustomerResponseDto = {
  country: string;
  deliveryMethod: string;
  email: string;
  name: string;
  postalCode: string;
  street: string;
};

export type GetOrdersResponsePayload = {
  customer: CustomerResponseDto;
  ingredients: { bacon: number; cheese: number; meat: number; salad: number };
  price: number;
  user_id: string;
}[];

export async function GET(request: Request) {
  try {
    const authToken = request.headers.get("auth-token");

    if (!authToken) {
      return jsonResponse(
        {
          message: API_ERROR.AUTH_INVALID_TOKEN,
        },
        401
      );
    }

    const tokenParse = jwtDecode(authToken) as AuthToken;

    if (!tokenParse.user_id) {
      return jsonResponse(
        {
          message: API_ERROR.AUTH_INVALID_TOKEN,
        },
        401
      );
    }

    return jsonResponse(
      await OrderService.getOrders(authToken, tokenParse.user_id)
    );
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
