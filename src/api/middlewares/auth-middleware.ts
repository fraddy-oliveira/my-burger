import { NextResponse, type NextRequest } from "next/server";
import { jsonResponse } from "@/api/helpers/api-helpers";
import { API_ERROR } from "../utils/constants";

export default async function authMiddleware(request: NextRequest) {
  try {
    if (!String(request.headers.get("authorization")).match(/^Bearer \S+$/)) {
      return jsonResponse(
        {
          message: API_ERROR.AUTH_NOT_FOUND_TOKEN,
        },
        401
      );
    }

    const token = String(request.headers.get("authorization")).split(" ")[1];

    request.headers.set("auth-token", token);

    return NextResponse.next({
      request,
    });
  } catch (error) {
    return jsonResponse(
      {
        message: API_ERROR.AUTH_INVALID_TOKEN,
      },
      401
    );
  }
}
