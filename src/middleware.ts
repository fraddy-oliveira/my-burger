import createMiddleware from "@/api/merge-middleware";
import authMiddleware from "./api/middlewares/auth-middleware";

const middlewares = {
  "/api/order": authMiddleware,
  "/api/create-order": authMiddleware,
};

export const middleware = createMiddleware(middlewares);

export const config = {
  /*
   * Match all paths except for:
   * 1.
   * 2. /_next/ (Next.js internals)
   * 3. /_static (inside /public)
   * 4. /_vercel (Vercel internals)
   * 5. Static files (e.g. /favicon.ico, /sitemap.xml, /robots.txt, etc.)
   */
  matcher: ["/((?!_next/|_static|_vercel|[\\w-]+\\.\\w+).*)"],
};
