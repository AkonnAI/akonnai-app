import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const isApi = req.nextUrl.pathname.startsWith("/api");

  const cl = req.headers.get("content-length");
  if (cl && parseInt(cl, 10) > 10000) {
    if (isApi) {
      return NextResponse.json(
        { success: false, error: "Payload too large" },
        { status: 413 }
      );
    }
    return new NextResponse("Payload too large", { status: 413 });
  }

  if (req.method === "POST" && isApi) {
    const ct = req.headers.get("content-type") || "";
    if (!ct.includes("application/json")) {
      return NextResponse.json(
        {
          success: false,
          error: "Content-Type must be application/json",
        },
        { status: 415 }
      );
    }
  }

  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("X-XSS-Protection", "1; mode=block");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  res.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
