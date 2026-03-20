import { NextRequest } from "next/server";
import nodemailer from "nodemailer";
import { registerUser, createSessionCookiePayload } from "@/lib/auth";
import { registerUserSchema } from "@/lib/validators";
import { ok, fail, validationFail } from "@/lib/api-response";
import { safeHandler } from "@/middleware-helpers/safe-handler";

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

export const POST = safeHandler(async (req: NextRequest) => {
  const result = registerUserSchema.safeParse(await req.json());
  if (!result.success) return validationFail(result.error.flatten());

  const { name, email, password } = result.data;

  let user: Awaited<ReturnType<typeof registerUser>>;
  try {
    user = await registerUser(name, email, password);
  } catch (err: any) {
    if (err?.message === "Email already registered") {
      return fail("Email already registered", 409);
    }
    throw err;
  }

  const sessionCookie = createSessionCookiePayload(user);

  sendSignupEmail(user.name, user.email).catch((e) =>
    console.error("Failed to send signup notification email:", e)
  );

  const res = ok({ user }, 201);
  res.cookies.set(sessionCookie.name, sessionCookie.value, {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
});
