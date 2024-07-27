import { jsonResponse } from "@/api/helpers/api-helpers";

type ThirdPartyApiResponse = {
  bacon: number;
  cheese: number;
  meat: number;
  salad: number;
};

export async function GET() {
  try {
    const response = await fetch(
      `${process.env.FIREBASE_BASE_URL}/ingredients.json`
    );

    if (!response.ok) {
      return jsonResponse(
        { message: "Ingredients not found." },
        response.status
      );
    }

    const data = (await response.json()) as ThirdPartyApiResponse;

    return jsonResponse(data);
  } catch (error) {
    return jsonResponse({ message: "Oops! some error occurred." }, 500);
  }
}
