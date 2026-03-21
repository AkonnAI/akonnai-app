import { NextRequest } from "next/server";
import { registerUser, createSessionCookiePayload } from "@/lib/auth";
import { registerUserSchema } from "@/lib/validators";
import { ok, fail, validationFail } from "@/lib/api-response";
import { safeHandler } from "@/middleware-helpers/safe-handler";
import { checkRateLimit, getIP, LIMITS } from "@/lib/rate-limit";
import { sendWelcomeEmail } from "@/lib/email";

export const runtime = "nodejs";

export const POST = safeHandler(async (req: NextRequest) => {
  const { allowed } = await checkRateLimit(`auth:${getIP(req)}`, LIMITS.auth);
  if (!allowed) return fail("Too many attempts. Try again in 15 minutes.", 429);

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

  sendWelcomeEmail(user.email, user.name);

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
