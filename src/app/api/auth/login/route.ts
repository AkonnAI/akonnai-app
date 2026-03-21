import { NextRequest } from "next/server";
import { verifyUser, createSessionCookiePayload } from "@/lib/auth";
import { loginSchema } from "@/lib/validators";
import { ok, fail, validationFail } from "@/lib/api-response";
import { safeHandler } from "@/middleware-helpers/safe-handler";
import { checkRateLimit, getIP, LIMITS } from "@/lib/rate-limit";

export const runtime = "nodejs";

export const POST = safeHandler(async (req: NextRequest) => {
  const { allowed } = await checkRateLimit(`auth:${getIP(req)}`, LIMITS.auth);
  if (!allowed) return fail("Too many attempts. Try again in 15 minutes.", 429);

  const result = loginSchema.safeParse(await req.json());
  if (!result.success) return validationFail(result.error.flatten());

  const { email, password } = result.data;

  let user: Awaited<ReturnType<typeof verifyUser>>;
  try {
    user = await verifyUser(email, password);
  } catch {
    return fail("Invalid email or password", 401);
  }

  const sessionCookie = createSessionCookiePayload(user);

  const res = ok({ user });
  res.cookies.set(sessionCookie.name, sessionCookie.value, {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
});
