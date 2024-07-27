import { jwtDecode } from "jwt-decode";
import { ZodError, z } from "zod";
import { jsonResponse } from "@/api/helpers/api-helpers";
import { createOrderSchema } from "@/api/validation/create-order-schema";
import { AuthToken } from "@/api/types/auth-token.type";
import APIError from "@/api/utils/api-error";
import { API_ERROR } from "@/api/utils/constants";
import OrderService from "@/api/services/order.service";

export type CreateOrderRequestPayload = z.infer<typeof createOrderSchema>;

export type CreateOrderResponsePayload = { name: string };

export async function POST(request: Request): Promise<Response> {
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

    const requestPayload = (await request.json()) as CreateOrderRequestPayload;

    try {
      createOrderSchema.parse(requestPayload);
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue: any) => ({
          fieldname: issue.path.join("."),
          message: `${issue.path.join(".")} is ${issue.message}`,
        }));

        return jsonResponse(
          {
            message: API_ERROR.ORDER_INVALID_CREATE_ORDER_PAYLOAD,
            errors: errorMessages,
          },
          400
        );
      }

      return jsonResponse(
        {
          message: API_ERROR.SERVER_INTERNAL_ERROR,
        },
        500
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
      await OrderService.createOrder(
        authToken,
        tokenParse.user_id,
        requestPayload
      )
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
