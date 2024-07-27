import { jwtDecode } from "jwt-decode";
import { jsonResponse } from "@/api/helpers/api-helpers";
import { AuthToken } from "@/api/types/auth-token.type";

type ThirdPartyApiResponse = Record<
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

type ResponsePayload = {
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
          message: "Please provide valid bearer token.",
        },
        401
      );
    }

    const tokenParse = jwtDecode(authToken) as AuthToken;

    const response = await fetch(
      `${process.env.FIREBASE_BASE_URL}/orders.json?auth=${authToken}`
    );

    if (!response.ok) {
      const errorPayload = await response.json();

      let message = "Failed to fetch Orders.";

      if (response.status === 401) {
        message = errorPayload.error;
      }

      return jsonResponse({ message }, response.status);
    }

    const data = (await response.json()) as ThirdPartyApiResponse;

    const orders = Object.keys(data)
      .map((key) => ({
        customer: data[key]["customer"],
        ingredients: data[key]["ingredients"],
        price: data[key]["price"],
        user_id: data[key]["user_id"],
      }))
      .filter((o) => o.user_id === tokenParse.user_id);

    return jsonResponse<ResponsePayload>(orders);
  } catch (error) {
    return jsonResponse({ message: "Oops! some error occurred." }, 500);
  }
}
