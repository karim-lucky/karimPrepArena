// src/middleware.ts
import { NextResponse, NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 🧩 Skip Next.js internal routes and public assets
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/public")
  ) {
    return NextResponse.next();
  }

  // 🛡 Validate Content-Type header for all API routes
  const contentType = req.headers.get("content-type");

  if (!contentType || !contentType.includes("application/json")) {
    console.warn("🚫 Missing or invalid Content-Type header on:", pathname);
    return NextResponse.json(
      {
        success: false,
        error: "Invalid or missing Content-Type header. Expected 'application/json'.",
      },
      { status: 400 }
    );
  }

  // ✅ Allow the request to continue
  console.log("✅ Middleware passed:", pathname);
  return NextResponse.next();
}

// 🧩 Apply only to all API routes
export const config = {
  matcher: ["/api/:path*"],
};
