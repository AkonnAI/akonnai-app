import { NextResponse } from "next/server";

export const runtime = "nodejs";

// Temporary diagnostic endpoint — remove after fixing production issue
export async function GET() {
  const accessKeyId =
    process.env.ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID || "";
  const secretKey =
    process.env.SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY || "";

  const info = {
    // Environment variable presence
    env: {
      AWS_REGION: process.env.AWS_REGION || null,
      REGION: process.env.REGION || null,
      DYNAMODB_BOOKINGS_TABLE: process.env.DYNAMODB_BOOKINGS_TABLE || null,
      DYNAMODB_USERS_TABLE: process.env.DYNAMODB_USERS_TABLE || null,
      COGNITO_USER_POOL_ID: process.env.COGNITO_USER_POOL_ID || null,
      COGNITO_CLIENT_ID: process.env.COGNITO_CLIENT_ID || null,
      AUTH_SESSION_SECRET_LENGTH:
        process.env.AUTH_SESSION_SECRET?.length ?? 0,
      AUTH_SESSION_SECRET_preview:
        process.env.AUTH_SESSION_SECRET
          ? process.env.AUTH_SESSION_SECRET.slice(0, 6) + "..."
          : "MISSING",
      ACCESS_KEY_ID_prefix: accessKeyId.slice(0, 8) || "MISSING",
      SECRET_KEY_present: secretKey.length > 0,
      GMAIL_USER: process.env.GMAIL_USER || null,
      GMAIL_APP_PASSWORD_present: !!process.env.GMAIL_APP_PASSWORD,
      DEMO_APP_URL: process.env.DEMO_APP_URL || null,
      GAS_WEBHOOK_URL_present: !!process.env.GAS_WEBHOOK_URL,
      NEXT_PHASE: process.env.NEXT_PHASE || null,
      NODE_ENV: process.env.NODE_ENV || null,
    },

    // DynamoDB connection test
    dynamodb: null as string | null,
    dynamodb_error: null as string | null,
  };

  // Try a real DynamoDB call
  try {
    const { DynamoDBClient, ListTablesCommand } = await import(
      "@aws-sdk/client-dynamodb"
    );
    const region =
      process.env.AWS_REGION || process.env.REGION || "ap-south-1";
    const ak = process.env.ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID;
    const sk =
      process.env.SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY;

    const cfg: Record<string, unknown> = { region };
    if (ak && sk && !ak.startsWith("ASIA")) {
      cfg.credentials = { accessKeyId: ak, secretAccessKey: sk };
    }

    const client = new DynamoDBClient(cfg);
    const res = await client.send(new ListTablesCommand({}));
    info.dynamodb = `OK — tables visible: ${res.TableNames?.join(", ") || "none"}`;
  } catch (e: unknown) {
    info.dynamodb_error =
      e instanceof Error ? `${e.name}: ${e.message}` : String(e);
  }

  return NextResponse.json(info, { status: 200 });
}
