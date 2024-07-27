import { Ingredients } from "@/stores/burger-builder-store";
import { StandardResponse, internalError } from "@/types/StandardResponse";
import { Orders } from "@/types/orders-types";

export const fetchOrders = async (
  token: string
): Promise<StandardResponse<Orders[]>> => {
  try {
    let url = `/api/order`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return {
        error: {
          message: "Failed to load orders.",
          statusCode: response.status,
        },
      };
    }

    const responsePayload = await response.json();

    const fetchedOrders = [];

    for (let key in responsePayload) {
      fetchedOrders.push({
        ...responsePayload[key],
        id: key,
      });
    }

    return {
      data: fetchedOrders,
    };
  } catch (error) {
    return internalError;
  }
};
