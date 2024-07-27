export const jsonResponse = <T>(responsePayload: T, status: number = 200) => {
  return new Response(
    responsePayload !== null ? JSON.stringify(responsePayload) : null,
    {
      status,
      headers: {
        "content-type": "application/json",
      },
    }
  );
};
