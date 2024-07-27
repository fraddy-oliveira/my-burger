import { jwtDecode } from "jwt-decode";
import { ZodError, z } from "zod";
import { jsonResponse } from "@/api/helpers/api-helpers";
import { createOrderSchema } from "@/api/validation/create-order-schema";
import { AuthToken } from "@/api/types/auth-token.type";

type RequestPayload = z.infer<typeof createOrderSchema>;

type ResponsePayload = { name: string };

type ThirdPartyApiResponse = { name: string };

export async function POST(request: Request) {
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

    const requestPayload = (await request.json()) as RequestPayload;

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
            message: "Create order payload is invalid",
            errors: errorMessages,
          },
          400
        );
      }

      return jsonResponse(
        {
          message: "Oops! some error occurred.",
        },
        500
      );
    }

    const tokenParse = jwtDecode(authToken) as AuthToken;

    if (!tokenParse.user_id) {
      return jsonResponse(
        {
          message: "Bearer token not formed properly. user_id not found.",
        },
        401
      );
    }

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
        user_id: tokenParse.user_id,
      }),
    });

    if (!response.ok) {
      return jsonResponse({ message: "Create order failed" }, response.status);
    }

    const { name } = (await response.json()) as ThirdPartyApiResponse;

    return jsonResponse<ResponsePayload>({ name });
  } catch (error) {
    return jsonResponse({ message: "Oops! some error occurred." }, 500);
  }
}
