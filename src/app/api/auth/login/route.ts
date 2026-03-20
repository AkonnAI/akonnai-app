import { NextRequest, NextResponse } from "next/server";
import { verifyUser, createSessionCookiePayload } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = String(body.email || "").trim();
    const password = String(body.password || "");

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password are required." },
        { status: 400 },
      );
    }

    const user = await verifyUser(email, password);
    const sessionCookie = createSessionCookiePayload(user);

    const res = NextResponse.json({ success: true, user }, { status: 200 });
    res.cookies.set(sessionCookie.name, sessionCookie.value, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });
    return res;
  } catch (err: any) {
    const message = err?.message || "Failed to login.";
    return NextResponse.json({ success: false, error: message }, { status: 401 });
  }
}

