// src/app/api/products/route.ts
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Ensure this API route is treated as static during an "output: export" build.
export const dynamic = "force-static";

// Serve the generated static products JSON when available. This keeps
// the /api/products route compatible with static HTML export and avoids
// dynamic server behavior during build.
export async function GET() {
  try {
    const jsonPath = path.join(process.cwd(), "public", "data", "products.json");
    if (fs.existsSync(jsonPath)) {
      const raw = fs.readFileSync(jsonPath, "utf8");
      try {
        const parsed = JSON.parse(raw);
        // parsed already has { products: [...] } structure, return as-is
        return NextResponse.json(parsed);
      } catch (e) {
        // fallthrough to empty
      }
    }
    return NextResponse.json({ products: [] });
  } catch (err) {
    console.error("/api/products read error:", err);
    return NextResponse.json({ products: [] });
  }
}
