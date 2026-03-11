import { NextRequest, NextResponse } from "next/server";
import { clearSessionCookie } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(_req: NextRequest) {
  const cookie = clearSessionCookie();
  const res = NextResponse.json({ success: true }, { status: 200 });
  res.cookies.set(cookie.name, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
    maxAge: 0,
  });
  return res;
}

