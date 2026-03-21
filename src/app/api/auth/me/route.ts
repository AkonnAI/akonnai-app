import { NextRequest, NextResponse } from "next/server";
import { parseSessionCookie } from "@/lib/auth";
import { checkRateLimit, getIP, LIMITS } from "@/lib/rate-limit";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const { allowed } = await checkRateLimit(`general:${getIP(req)}`, LIMITS.general);
  if (!allowed) return NextResponse.json({ error: "Too many requests" }, { status: 429 });

  const cookieHeader = req.headers.get("cookie");
  const session = parseSessionCookie(cookieHeader);

  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 200 });
  }

  return NextResponse.json(
    {
      authenticated: true,
      user: {
        id: session.id,
        email: session.email,
        name: session.name,
      },
    },
    { status: 200 },
  );
}

