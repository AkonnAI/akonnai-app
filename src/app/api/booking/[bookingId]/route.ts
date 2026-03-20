import { NextRequest } from "next/server";
import { GetCommand } from "@aws-sdk/lib-dynamodb";
import { getDb, BOOKINGS_TABLE } from "@/lib/dynamodb";
import { ok, fail } from "@/lib/api-response";
import { safeHandler } from "@/middleware-helpers/safe-handler";

export const runtime = "nodejs";

export const GET = safeHandler(async (
  _req: NextRequest,
  ctx?: unknown
) => {
  const { bookingId } = await (ctx as { params: Promise<{ bookingId: string }> }).params;

  if (typeof bookingId !== "string" || bookingId.length > 100) {
    return fail("Invalid booking ID", 400);
  }

  const result = await getDb().send(
    new GetCommand({ TableName: BOOKINGS_TABLE, Key: { id: bookingId } })
  );

  if (!result.Item) {
    return fail("Not found", 404);
  }

  const { id, childName, grade, course, date, time, email } = result.Item;
  return ok({ id, childName, grade, course, date, time, email });
});
