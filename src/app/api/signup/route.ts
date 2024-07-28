import { jsonResponse } from "@/api/helpers/api-helpers";
import { signupSchema } from "@/api/validation/signup-schema";
import { ZodError } from "zod";
import AuthService from "@/api/services/auth.service";
import APIError from "@/api/utils/api-error";
import { API_ERROR } from "@/api/utils/constants";

export type SignupFirebaseResponse = {
  idToken: string;
  localId: string;
  expiresIn: string;
};

export type SignupResponsePayload = {
  idToken: string;
  localId: string;
  expiresIn: string;
};

export async function POST(request: Request) {
  try {
    const body = await request.json();

    try {
      signupSchema.parse(body);
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue: any) => ({
          field: issue.path.join("."),
          message: `${issue.path.join(".")} is ${issue.message}`,
        }));

        return jsonResponse(
          {
            message: API_ERROR.AUTH_INVALID_SIGNUP_FORM,
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

    const requestPayload = {
      email: body.email,
      password: body.password,
      returnSecureToken: true,
    };

    return jsonResponse(await AuthService.signup(requestPayload));
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
