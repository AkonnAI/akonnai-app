import { NextRequest } from "next/server";
import { getDb, BOOKINGS_TABLE } from "@/lib/dynamodb";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { demoBookingSchema } from "@/lib/validators";
import { ok, fail, validationFail } from "@/lib/api-response";
import { safeHandler } from "@/middleware-helpers/safe-handler";
import { checkRateLimit, getIP, LIMITS } from "@/lib/rate-limit";
import { sendAdminBookingNotification, sendParentBookingConfirmation } from "@/lib/email";

export const runtime = "nodejs";
const DEMO_USERS_TABLE =
  process.env.DEMO_USERS_TABLE ||
  process.env.DYNAMODB_DEMO_TABLE ||
  "akmind-demo-users";

const normalizeDemoToken = (token: string) => token.trim().toLowerCase();
const generateDemoToken = () =>
  crypto.randomUUID().replaceAll("-", "").slice(0, 16);

export const POST = safeHandler(async (req: NextRequest) => {
  // STEP 5 — Log env state to CloudWatch on every booking attempt
  console.log("Booking attempt - env check:", {
    region: process.env.AWS_REGION,
    bookingsTable: process.env.DYNAMODB_BOOKINGS_TABLE,
    hasGmail: !!process.env.GMAIL_USER,
    demoUrl: process.env.DEMO_APP_URL,
  });

  const { allowed } = await checkRateLimit(`booking:${getIP(req)}`, LIMITS.booking);
  if (!allowed) return fail("Too many booking attempts. Try again in 1 hour.", 429);

  const result = demoBookingSchema.safeParse(await req.json());
  if (!result.success) return validationFail(result.error.flatten());

  const { parentName, phone, email, childName, course, date, time, grade } = result.data;

  const bookingId = crypto.randomUUID();

  // STEP 1 — DynamoDB write with detailed error logging
  try {
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
  } catch (error) {
    console.error("BOOKING ERROR:", {
      message: error instanceof Error ? error.message : "Unknown error",
      name: error instanceof Error ? error.name : "Unknown",
      stack: error instanceof Error ? error.stack : "No stack",
      env: {
        region: process.env.AWS_REGION,
        table: process.env.DYNAMODB_BOOKINGS_TABLE,
        hasAccessKey: !!process.env.AWS_ACCESS_KEY_ID,
        hasSecretKey: !!process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
    return fail("Registration failed. Please try again.", 500);
  }

  // STEP 3 — GAS webhook non-blocking
  try {
    void fetch(process.env.GAS_WEBHOOK_URL || "", {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify(result.data),
    });
  } catch (e) {
    console.log("GAS webhook failed:", e);
  }

  // STEP 2 — Create demo user in shared demo table
  let demoToken: string | undefined;
  try {
    demoToken = generateDemoToken();
    const now = new Date().toISOString();
    await getDb().send(
      new PutCommand({
        TableName: DEMO_USERS_TABLE,
        Item: {
          id: crypto.randomUUID(),
          email: email.trim().toLowerCase(),
          name: parentName.trim(),
          childName: childName.trim(),
          phone: phone.trim(),
          demoToken: normalizeDemoToken(demoToken),
          demoStarted: false,
          demoCompleted: false,
          lessonsComplete: [],
          quizScores: {},
          xp: 0,
          badgeEarned: false,
          createdAt: now,
        },
      })
    );
    console.log("Demo user created in shared table", {
      table: DEMO_USERS_TABLE,
      email: email.trim().toLowerCase(),
      token: demoToken.slice(0, 8) + "...",
    });
  } catch (e) {
    console.error("Demo user creation failed:", {
      message: e instanceof Error ? e.message : "Unknown error",
      name: e instanceof Error ? e.name : "Unknown",
      table: DEMO_USERS_TABLE,
      region: process.env.AWS_REGION,
    });
    demoToken = undefined;
    // Non-blocking — booking continues even if demo setup fails
  }

  // STEP 4 — Emails non-blocking
  try {
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
  } catch (e) {
    console.error("Email error:", e);
    // Non-blocking
  }

  return ok({ bookingId, demoToken });
});
