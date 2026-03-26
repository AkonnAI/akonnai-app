import { NextRequest, NextResponse } from "next/server";

/**
 * Proxies to the demo app so the browser can check demo usage same-origin
 * (avoids CORS when the marketing site and demo app run on different ports).
 */
export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email");
  if (!email?.trim()) {
    return NextResponse.json(
      { success: false, error: "Email required" },
      { status: 400 }
    );
  }

  const demoAppUrl =
    process.env.NEXT_PUBLIC_DEMO_APP_URL || "http://localhost:3001";

  try {
    const res = await fetch(
      `${demoAppUrl}/api/demo/check?email=${encodeURIComponent(email.trim())}`
    );
    const data = (await res.json()) as { hasUsedDemo?: boolean };
    return NextResponse.json(data, { status: res.status });
  } catch (e) {
    console.error("Demo check proxy error:", e);
    return NextResponse.json({ hasUsedDemo: false }, { status: 200 });
  }
}
