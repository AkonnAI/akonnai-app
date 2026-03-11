import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import bcrypt from "bcryptjs";

const DATA_DIR = path.join(process.cwd(), "data");
const USERS_FILE = path.join(DATA_DIR, "users.json");

type UserRecord = {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  createdAt: string;
};

type UsersDb = {
  users: UserRecord[];
};

function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, JSON.stringify({ users: [] }, null, 2), "utf-8");
  }
}

function readUsers(): UsersDb {
  ensureDataFile();
  const raw = fs.readFileSync(USERS_FILE, "utf-8");
  try {
    return JSON.parse(raw) as UsersDb;
  } catch {
    return { users: [] };
  }
}

function writeUsers(db: UsersDb) {
  ensureDataFile();
  fs.writeFileSync(USERS_FILE, JSON.stringify(db, null, 2), "utf-8");
}

export async function registerUser(name: string, email: string, password: string) {
  const normalizedEmail = email.trim().toLowerCase();
  const db = readUsers();

  const existing = db.users.find((u) => u.email === normalizedEmail);
  if (existing) {
    throw new Error("User already exists with this email");
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user: UserRecord = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    email: normalizedEmail,
    name: name.trim(),
    passwordHash,
    createdAt: new Date().toISOString(),
  };

  db.users.push(user);
  writeUsers(db);

  return { id: user.id, email: user.email, name: user.name };
}

export async function verifyUser(email: string, password: string) {
  const normalizedEmail = email.trim().toLowerCase();
  const db = readUsers();
  const user = db.users.find((u) => u.email === normalizedEmail);

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) {
    throw new Error("Invalid email or password");
  }

  return { id: user.id, email: user.email, name: user.name };
}

const SESSION_COOKIE_NAME = "akmind_session";
const SESSION_SECRET = process.env.AUTH_SESSION_SECRET || "development-secret-change-me";

export function createSessionCookiePayload(user: { id: string; email: string; name: string }) {
  const base = JSON.stringify({
    id: user.id,
    email: user.email,
    name: user.name,
  });
  const signature = crypto.createHmac("sha256", SESSION_SECRET).update(base).digest("hex");
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
  const expectedSignature = crypto.createHmac("sha256", SESSION_SECRET).update(base).digest("hex");

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

