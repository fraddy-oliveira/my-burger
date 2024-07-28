import {
  GetOrdersFirebaseResponse,
  GetOrdersResponsePayload,
} from "@/app/api/order/route";
import APIError from "@/api/utils/api-error";
import { API_ERROR } from "@/api/utils/constants";
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

  static async getOrders(
    authToken: string,
    userId: string
  ): Promise<GetOrdersResponsePayload> {
    const response = await fetch(
      `${process.env.FIREBASE_BASE_URL}/orders.json?auth=${authToken}`
    );

    if (!response.ok) {
      const errorPayload = await response.json();

      let message = API_ERROR.ORDER_FAILED_TO_FETCH_ORDERS;

      if (response.status === 401) {
        message = errorPayload.error;
      }

      throw new APIError(message, response.status);
    }

    const data = (await response.json()) as GetOrdersFirebaseResponse;

    const orders = Object.keys(data)
      .map((key) => ({
        customer: data[key]["customer"],
        ingredients: data[key]["ingredients"],
        price: data[key]["price"],
        user_id: data[key]["user_id"],
      }))
      .filter((o) => o.user_id === userId);

    return orders;
  }
}
