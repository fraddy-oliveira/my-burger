import { NextResponse, type NextRequest } from "next/server";
import { jsonResponse } from "@/api/helpers/api-helpers";

export default async function authMiddleware(request: NextRequest) {
  try {
    if (!String(request.headers.get("authorization")).match(/^Bearer \S+$/)) {
      return jsonResponse(
        {
          message: "Bearer token not found.",
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
        message: "Bearer token is invalid.",
      },
      401
    );
  }
}
