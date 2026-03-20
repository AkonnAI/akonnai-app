import { NextRequest, NextResponse } from "next/server";
import { GetCommand } from "@aws-sdk/lib-dynamodb";
import { getDb, BOOKINGS_TABLE } from "@/lib/dynamodb";

export const runtime = "nodejs";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ bookingId: string }> }
) {
  const { bookingId } = await params;

  const result = await getDb().send(
    new GetCommand({ TableName: BOOKINGS_TABLE, Key: { id: bookingId } })
  );

  if (!result.Item) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const { id, childName, grade, course, date, time, email } = result.Item;
  return NextResponse.json({ id, childName, grade, course, date, time, email });
}
