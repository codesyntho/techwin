// Minimal placeholder for static export: real search API is moved to src/app/_api
import { NextResponse, type NextRequest } from "next/server";

// For static HTML export ensure this route is treated as static by default
export const dynamic = "force-static";

// Shared type for search results used by client components
export type SearchResult = {
  type: "application" | "category" | "product" | string;
  url: string;
  title: string;
  description?: string;
  image?: string;
  category?: string;
};

// The real implementation lives in `src/app/_api/search/route.ts` so that
// static export isn't blocked. During development (or if explicitly
// enabled via env), proxy to that implementation so local `next dev` shows
// real search results. For static builds we still return an empty array so
// `next export` can complete.
export async function GET(request?: NextRequest) {
  try {
    // Use the real API when running in dev or when forced via env var
    const useReal = process.env.NODE_ENV !== "production" || process.env.USE_REAL_API === "1";
    if (useReal) {
      // Dynamically import to avoid bundling the server-only implementation
      // into static builds.
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const mod = await import("@/app/_api/search/route");
      if (mod && typeof mod.GET === "function") {
        return await mod.GET(request as NextRequest);
      }
    }
  } catch (err) {
    // ignore and fall back to empty
  }

  // Return empty results for static export build-time checks.
  const results: SearchResult[] = [];
  return NextResponse.json({ results });
}