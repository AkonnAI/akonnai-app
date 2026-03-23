import { NextRequest } from "next/server";
import { getDb, BOOKINGS_TABLE } from "@/lib/dynamodb";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { demoBookingSchema } from "@/lib/validators";
import { ok, fail, validationFail } from "@/lib/api-response";
import { safeHandler } from "@/middleware-helpers/safe-handler";
import { checkRateLimit, getIP, LIMITS } from "@/lib/rate-limit";
import { sendAdminBookingNotification, sendParentBookingConfirmation } from "@/lib/email";
import type { BookingData } from "@/lib/email";
import { env } from "@/lib/env";

export const runtime = "nodejs";

export const POST = safeHandler(async (req: NextRequest) => {
  const { allowed } = await checkRateLimit(`booking:${getIP(req)}`, LIMITS.booking);
  if (!allowed) return fail("Too many booking attempts. Try again in 1 hour.", 429);

  const result = demoBookingSchema.safeParse(await req.json());
  if (!result.success) return validationFail(result.error.flatten());

  const { parentName, phone, email, childName, course, date, time } = result.data;

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

  const bookingData: BookingData = { parentName, phone, email, childName, grade: "", course, date, time };
  await Promise.allSettled([
    sendAdminBookingNotification(bookingData),
    sendParentBookingConfirmation(email, bookingData),
  ]);

  return ok({ bookingId });
});
