import crypto from "node:crypto";
import bcrypt from "bcryptjs";
import { GetCommand, PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { getDb, USERS_TABLE } from "@/lib/dynamodb";
import { env } from "@/lib/env";

export async function registerUser(name: string, email: string, password: string) {
  const normalizedEmail = email.toLowerCase().trim();

  // Check uniqueness via email-index GSI
  const existing = await getDb().send(
    new QueryCommand({
      TableName: USERS_TABLE,
      IndexName: "email-index",
      KeyConditionExpression: "email = :e",
      ExpressionAttributeValues: { ":e": normalizedEmail },
      Limit: 1,
    })
  );
  if (existing.Items && existing.Items.length > 0) {
    throw new Error("Email already registered");
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;

  await getDb().send(
    new PutCommand({
      TableName: USERS_TABLE,
      Item: {
        id,
        email: normalizedEmail,
        name: name.trim(),
        passwordHash,
        createdAt: new Date().toISOString(),
      },
    })
  );

  return { id, email: normalizedEmail, name: name.trim() };
}

export async function verifyUser(email: string, password: string) {
  const normalizedEmail = email.toLowerCase().trim();

  const result = await getDb().send(
    new QueryCommand({
      TableName: USERS_TABLE,
      IndexName: "email-index",
      KeyConditionExpression: "email = :e",
      ExpressionAttributeValues: { ":e": normalizedEmail },
      Limit: 1,
    })
  );

  if (!result.Items || result.Items.length === 0) {
    throw new Error("Invalid credentials");
  }

  const user = result.Items[0];
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    throw new Error("Invalid credentials");
  }

  return { id: user.id as string, email: user.email as string, name: user.name as string };
}

export async function getUserById(id: string) {
  const result = await getDb().send(
    new GetCommand({ TableName: USERS_TABLE, Key: { id } })
  );
  return result.Item ?? null;
}

// ─── Session cookie (HMAC-SHA256) ────────────────────────────────────────────

const SESSION_COOKIE_NAME = "akmind_session";

export function createSessionCookiePayload(user: { id: string; email: string; name: string }) {
  const base = JSON.stringify({
    id: user.id,
    email: user.email,
    name: user.name,
  });
  const secret = env.sessionSecret || process.env.AUTH_SESSION_SECRET;
  if (!secret) throw new Error("AUTH_SESSION_SECRET is not configured");
  const signature = crypto.createHmac("sha256", secret).update(base).digest("hex");
  // base64url avoids +, /, = which would be percent-encoded in cookie values
  const value = Buffer.from(base).toString("base64url") + "." + signature;
  return { name: SESSION_COOKIE_NAME, value };
}

export function parseSessionCookie(cookieHeader: string | null | undefined) {
  if (!cookieHeader) return null;
  const cookies = Object.fromEntries(
    cookieHeader.split(";").map((p) => {
      const [k, ...rest] = p.trim().split("=");
      return [k, rest.join("=")];
    }),
  );
  const raw = cookies[SESSION_COOKIE_NAME];
  if (!raw) return null;

  // decodeURIComponent handles cases where the browser/server percent-encoded the value
  const decoded = decodeURIComponent(raw);
  const dotIndex = decoded.lastIndexOf(".");
  if (dotIndex === -1) return null;

  const encoded = decoded.slice(0, dotIndex);
  const signature = decoded.slice(dotIndex + 1);
  if (!encoded || !signature) return null;

  const base = Buffer.from(encoded, "base64url").toString("utf-8");
  const secret = env.sessionSecret || process.env.AUTH_SESSION_SECRET;
  if (!secret) return null;
  const expectedSignature = crypto.createHmac("sha256", secret).update(base).digest("hex");

  if (expectedSignature !== signature) return null;

  try {
    return JSON.parse(base) as { id: string; email: string; name: string };
  } catch {
    return null;
  }
}

export function clearSessionCookie() {
  return { name: SESSION_COOKIE_NAME };
}
