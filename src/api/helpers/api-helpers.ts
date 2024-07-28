import { APIResponse } from "../types/request-response";

export const jsonResponse = <T, E = null>(
  responsePayload: APIResponse<T, E>,
  status: number = 200
) =>
  new Response(
    responsePayload !== null ? JSON.stringify(responsePayload) : null,
    {
      status,
      headers: {
        "content-type": "application/json",
      },
    }
  );
