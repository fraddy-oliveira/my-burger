import { ThirdPartyApiErrorResponse } from "@/api/types/response";
import { jsonResponse } from "@/api/helpers/api-helpers";
import { loginSchema } from "@/api/validation/login-schema";
import { ZodError } from "zod";

type ThirdPartyApiResponse = {
  idToken: string;
  localId: string;
  expiresIn: string;
};

export type ResponsePayload = { idToken: string; localId: string; expiresIn: string };

export async function POST(request: Request) {
  try {
    const requestBody = await request.json();

    try {
      loginSchema.parse(requestBody);
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue: any) => ({
          field: issue.path.join("."),
          message: `${issue.path.join(".")} is ${issue.message}`,
        }));

        return jsonResponse(
          {
            message: 'INVALID_LOGIN_FORM',
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

    const requestPayload = {
      email: requestBody.email,
      password: requestBody.password,
      returnSecureToken: true,
    };

    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`;

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(requestPayload),
    });

    if (!response.ok) {
      const {
        error: { message, code },
      } = (await response.json()) as ThirdPartyApiErrorResponse;

      return jsonResponse({ message }, code);
    }

    const { idToken, localId, expiresIn } =
      (await response.json()) as ThirdPartyApiResponse;

    return jsonResponse<ResponsePayload>({ idToken, localId, expiresIn });
  } catch (error) {
    return jsonResponse({ message: "Oops! some error occurred." }, 500);
  }
}
