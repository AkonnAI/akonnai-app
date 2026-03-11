import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { registerUser, createSessionCookiePayload } from "@/lib/auth";

export const runtime = "nodejs";

async function sendSignupEmail(name: string, email: string) {
  const to = process.env.REGISTRATION_NOTIFY_EMAIL;
  if (!to) {
    console.warn("REGISTRATION_NOTIFY_EMAIL is not set; skipping signup email.");
    return;
  }

  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    console.warn("SMTP configuration is incomplete; skipping signup email.");
    return;
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  const subject = `New AKMIND parent signup: ${name || email}`;
  const lines = [
    "A new parent account has been created:",
    "",
    `Name: ${name || "-"}`,
    `Email: ${email || "-"}`,
    "",
    `Signed up at: ${new Date().toLocaleString()}`,
  ];

  await transporter.sendMail({
    from: user,
    to,
    subject,
    text: lines.join("\n"),
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const password = String(body.password || "");

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, error: "Name, email and password are required." },
        { status: 400 },
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, error: "Password must be at least 6 characters." },
        { status: 400 },
      );
    }

    const user = await registerUser(name, email, password);
    const sessionCookie = createSessionCookiePayload(user);

    try {
      await sendSignupEmail(user.name, user.email);
    } catch (emailErr) {
      console.error("Failed to send signup notification email:", emailErr);
    }

    const res = NextResponse.json({ success: true, user }, { status: 201 });
    res.cookies.set(sessionCookie.name, sessionCookie.value, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    return res;
  } catch (err: any) {
    const message = err?.message || "Failed to register user.";
    const status = message.includes("already exists") ? 409 : 500;
    return NextResponse.json({ success: false, error: message }, { status });
  }
}

