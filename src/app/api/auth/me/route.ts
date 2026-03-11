import { NextRequest, NextResponse } from "next/server";
import { parseSessionCookie } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
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

