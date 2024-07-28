import { SigninResponsePayload } from "@/app/api/signin/route";
import { FirebaseAuthErrorResponse } from "../types/request-response";
import APIError from "../utils/api-error";
import {
  SignupFirebaseResponse,
  SignupResponsePayload,
} from "@/app/api/signup/route";

export default class AuthService {
  static async signin(requestPayload: {
    email: string;
    password: string;
    returnSecureToken: boolean;
  }): Promise<SigninResponsePayload> {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`;

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(requestPayload),
    });

    if (!response.ok) {
      const {
        error: { message, code },
      } = (await response.json()) as FirebaseAuthErrorResponse;

      throw new APIError(message, code);
    }

    const { idToken, localId, expiresIn } =
      (await response.json()) as SigninResponsePayload;

    return { idToken, localId, expiresIn };
  }

  static async signup(requestPayload: {
    email: string;
    password: string;
    returnSecureToken: boolean;
  }): Promise<SignupResponsePayload> {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.FIREBASE_API_KEY}`;

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(requestPayload),
    });

    if (!response.ok) {
      const {
        error: { message, code },
      } = (await response.json()) as FirebaseAuthErrorResponse;

      throw new APIError(message, code);
    }

    const { idToken, localId, expiresIn } =
      (await response.json()) as SignupFirebaseResponse;

    return { idToken, localId, expiresIn };
  }
}
