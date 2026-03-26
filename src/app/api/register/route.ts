import { NextRequest } from "next/server";
import { getDb, BOOKINGS_TABLE } from "@/lib/dynamodb";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { demoBookingSchema } from "@/lib/validators";
import { ok, fail, validationFail } from "@/lib/api-response";
import { safeHandler } from "@/middleware-helpers/safe-handler";
import { checkRateLimit, getIP, LIMITS } from "@/lib/rate-limit";
import { sendAdminBookingNotification, sendParentBookingConfirmation } from "@/lib/email";
import { env } from "@/lib/env";

export const runtime = "nodejs";

export const POST = safeHandler(async (req: NextRequest) => {
  const { allowed } = await checkRateLimit(`booking:${getIP(req)}`, LIMITS.booking);
  if (!allowed) return fail("Too many booking attempts. Try again in 1 hour.", 429);

  const result = demoBookingSchema.safeParse(await req.json());
  if (!result.success) return validationFail(result.error.flatten());

  const { parentName, phone, email, childName, course, date, time, grade } = result.data;

  const bookingId = crypto.randomUUID();
  await getDb().send(
    new PutCommand({
      TableName: BOOKINGS_TABLE,
      Item: {
        id: bookingId,
        parentName,
        phone,
        email,
        childName,
        grade: grade ?? "",
        course,
        date,
        time,
        createdAt: new Date().toISOString(),
      },
    })
  );

  // Forward to GAS — non-blocking
  fetch(env.gasWebhookUrl, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(result.data),
  }).catch((e) => console.error("GAS forward failed:", e));

  // Create demo token for parent
  let demoToken: string | undefined;

  try {
    const demoRes = await fetch(
      (process.env.DEMO_APP_URL ||
        "http://localhost:3001") +
        "/api/demo/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          parentName: result.data.parentName,
          email: result.data.email,
          phone: result.data.phone,
          childName: result.data.childName,
        }),
      }
    );
    if (demoRes.ok) {
      const demoData = await demoRes.json();
      demoToken = demoData.token;
      console.log("Demo token created:", demoToken);
    }
  } catch (e) {
    console.error("Demo app connection failed:", e);
    // Non-blocking — booking still succeeds
  }

  await Promise.allSettled([
    sendAdminBookingNotification({
      parentName,
      email,
      phone,
      childName,
      course,
      date,
      time,
      id: bookingId,
    }),
    sendParentBookingConfirmation(
      email,
      {
        parentName,
        childName,
        course,
        date,
        time,
        id: bookingId,
      },
      demoToken
    ),
  ]);

  return ok({ bookingId, demoToken });
});
