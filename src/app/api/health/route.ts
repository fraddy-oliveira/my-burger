import { jsonResponse } from "@/api/helpers/api-helpers";

export async function GET() {
  return jsonResponse({ message: "Burger App backend is ok" });
}
