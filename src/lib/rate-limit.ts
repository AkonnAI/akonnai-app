import { getDb, RATE_LIMIT_TABLE } from "./dynamodb";
import { UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { env as _env } from "./env"; // ensure env validation runs at startup

type LimitConfig = { max: number; windowSeconds: number };

export const LIMITS = {
  auth:    { max: 5,  windowSeconds: 900  },
  booking: { max: 3,  windowSeconds: 3600 },
  general: { max: 60, windowSeconds: 60   },
} satisfies Record<string, LimitConfig>;

export async function checkRateLimit(
  key: string,
  config: LimitConfig
): Promise<{ allowed: boolean; remaining: number }> {
  const db = getDb();
  const now = Math.floor(Date.now() / 1000);
  const pk = `rl#${key}`;
  const ttl = now + config.windowSeconds;

  try {
    const res = await db.send(new UpdateCommand({
      TableName: RATE_LIMIT_TABLE,
      Key: { pk },
      UpdateExpression:
        "SET #count = if_not_exists(#count, :zero) + :inc, #ttl = :ttl",
      ExpressionAttributeNames: { "#count": "count", "#ttl": "ttl" },
      ExpressionAttributeValues: {
        ":zero": 0, ":inc": 1, ":ttl": ttl,
      },
      ReturnValues: "ALL_NEW",
    }));
    const count = res.Attributes?.count ?? 1;
    return { allowed: count <= config.max, remaining: Math.max(0, config.max - count) };
  } catch {
    return { allowed: true, remaining: config.max };
  }
}

export function getIP(req: Request): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || req.headers.get("x-real-ip")
    || "unknown";
}
