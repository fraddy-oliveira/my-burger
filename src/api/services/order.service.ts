import APIError from "../utils/api-error";
import { API_ERROR } from "../utils/constants";
import {
  CreateOrderRequestPayload,
  CreateOrderResponsePayload,
} from "@/app/api/create-order/route";

export default class OrderService {
  static async createOrder(
    authToken: string,
    userId: string,
    requestPayload: CreateOrderRequestPayload
  ): Promise<CreateOrderResponsePayload> {
    const url = `${process.env.FIREBASE_BASE_URL}/orders.json?auth=${authToken}`;

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        customer: {
          country: requestPayload.customer?.country,
          deliveryMethod: requestPayload.customer?.deliveryMethod,
          email: requestPayload.customer?.email,
          name: requestPayload.customer?.name,
          postalCode: requestPayload.customer?.postalCode,
          street: requestPayload.customer?.street,
        },
        ingredients: {
          bacon: requestPayload.ingredients?.bacon,
          cheese: requestPayload.ingredients?.cheese,
          meat: requestPayload.ingredients?.meat,
          salad: requestPayload.ingredients?.salad,
        },
        price: requestPayload.price,
        user_id: userId,
      }),
    });

    if (!response.ok) {
      throw new APIError(API_ERROR.ORDER_FAILED_CREATE_ORDER, response.status);
    }

    const { name } = (await response.json()) as { name: string };

    return { name };
  }
}
