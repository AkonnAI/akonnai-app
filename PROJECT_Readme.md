# AKMIND v2.1 — Project Documentation

> **"Dream. Discover. Shine."**
> Exciting and effective AI programs, curated by experts!

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Technology Stack](#2-technology-stack)
3. [Project Structure](#3-project-structure)
4. [Environment Configuration](#4-environment-configuration)
5. [Database & Data Storage](#5-database--data-storage)
6. [Authentication & Session Management](#6-authentication--session-management)
7. [Rate Limiting](#7-rate-limiting)
8. [Security Hardening](#8-security-hardening)
9. [Frontend Pages](#9-frontend-pages)
10. [Components](#10-components)
11. [Backend API Routes](#11-backend-api-routes)
12. [Demo Booking Flow](#12-demo-booking-flow)
13. [Email Notifications](#13-email-notifications)
14. [Third-Party Integrations](#14-third-party-integrations)
15. [Styling & Design System](#15-styling--design-system)
16. [Startup & Development](#16-startup--development)
17. [Key Data Flows](#17-key-data-flows)
18. [Version History](#18-version-history)

---

## 1. Project Overview

**AKMIND™** is a full-stack AI education platform targeting students **worldwide**. It enables parents and students to discover structured AI learning programs, book free demo classes, and enroll in 1-on-1 mentorship sessions with industry experts.

### Mission & Goals
- Bridge the gap in AI education for young learners globally
- Provide hands-on, project-based learning (not just theory)
- Connect students with expert mentors for personalised guidance
- Make AI accessible and exciting through micro-learning, gamification, and an AI guide

### Key Stats
- **500+ students** have built real AI projects
- **4 Expert Mentors**
- **3 Programs** (Beginner / Most Popular / Advanced)
- **100% Gamification** sessions
- Founded in **2024** — by **Akonnai AI Pvt. Ltd.**

### Three Core Programs

| Program | Level | Description |
|---|---|---|
| **AI Explorers** | Beginner Friendly | Introduction to AI concepts, Python basics, and creative projects |
| **AI Builders** | Most Popular | Machine Learning, Computer Vision, real-world AI apps |
| **AI Innovators** | Advanced | NLP, Deep Learning, capstone research projects |

> **v2.1 change:** Removed all age/grade/India-specific restrictions. Platform is worldwide, open to all learner levels.

---

## 2. Technology Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| **Next.js** | ^16.2.1 | React framework (App Router) |
| **React** | 19.2.3 | UI library |
| **TypeScript** | ^5 | Type-safe JavaScript |
| **Tailwind CSS** | ^4 | Utility-first styling |
| **Framer Motion** | ^12.34.0 | Animations & transitions |
| **Lucide React** | ^0.564.0 | Icon library |
| **clsx** | ^2.1.1 | Conditional classnames |
| **tailwind-merge** | ^3.4.1 | Tailwind class deduplication |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| **Node.js** | — | Runtime (via Next.js) |
| **Next.js API Routes** | — | Serverless API endpoints |
| **Zod** | ^4.3.6 | Request body schema validation |
| **bcryptjs** | ^2.4.3 | Password hashing |
| **@aws-sdk/client-dynamodb** | ^3.1013.0 | DynamoDB low-level client |
| **@aws-sdk/lib-dynamodb** | ^3.1013.0 | DynamoDB document client (marshalling) |
| **@aws-sdk/client-ses** | ^3.1013.0 | AWS SES email sending |
| **@aws-sdk/client-cognito-identity-provider** | ^3.1013.0 | AWS Cognito authentication |

### AWS Infrastructure
| Service | Purpose |
|---|---|
| **DynamoDB** | Users table, bookings table, rate-limit table |
| **Cognito** | User pool (sign up / sign in infrastructure) |
| **SES** | Transactional emails from `hello@akmind.com` |
| **Amplify** | Hosting, CI/CD from GitHub, domain management |
| **Route 53** | DNS for `akmind.com` |

> **Removed in v2.0:** `nodemailer`, `@types/nodemailer`, `data/users.json` flat-file DB, Gmail SMTP

---

## 3. Project Structure

```
akmind-v1.0-master/
│
├── src/
│   ├── app/                              # Next.js App Router
│   │   ├── api/                          # Backend API endpoints
│   │   │   ├── auth/
│   │   │   │   ├── login/route.ts        # POST /api/auth/login
│   │   │   │   ├── logout/route.ts       # POST /api/auth/logout
│   │   │   │   ├── me/route.ts           # GET /api/auth/me
│   │   │   │   └── register/route.ts     # POST /api/auth/register
│   │   │   ├── booking/
│   │   │   │   └── [bookingId]/route.ts  # GET /api/booking/:id
│   │   │   ├── careers/
│   │   │   │   └── route.ts              # ★ NEW — POST /api/careers (job applications)
│   │   │   └── register/route.ts         # POST /api/register (demo booking)
│   │   │
│   │   ├── about/page.tsx
│   │   ├── become-mentor/page.tsx
│   │   ├── careers/
│   │   │   ├── layout.tsx                # ★ NEW — route-level metadata (client page)
│   │   │   └── page.tsx                  # ★ UPDATED — job cards + application form
│   │   ├── confirmation/page.tsx         # Booking confirmation (reads ?id= from URL)
│   │   ├── contact/
│   │   │   ├── layout.tsx                # ★ NEW — route-level metadata
│   │   │   └── page.tsx                  # ★ UPDATED — email only, no phone
│   │   ├── curriculum/
│   │   │   ├── layout.tsx                # ★ NEW — route-level metadata
│   │   │   └── page.tsx                  # ★ UPDATED — includes ParentalGuidelines
│   │   ├── login/page.tsx
│   │   ├── mentors/
│   │   │   ├── layout.tsx                # ★ NEW — route-level metadata
│   │   │   └── page.tsx                  # ★ UPDATED — real photos, 3-col grid, no CTA button
│   │   ├── privacy-policy/page.tsx       # ★ NEW — 8-section Privacy Policy
│   │   ├── register/
│   │   │   ├── layout.tsx                # ★ NEW — route-level metadata
│   │   │   └── page.tsx                  # ★ UPDATED — upgraded wizard with step bar + animations
│   │   ├── reviews/page.tsx
│   │   ├── signup/page.tsx
│   │   ├── terms-and-conditions/page.tsx # ★ NEW — 10-section Terms & Conditions
│   │   ├── page.tsx                      # ★ UPDATED — Home / Landing page with new sections
│   │   ├── layout.tsx                    # ★ UPDATED — Navbar global, full SEO metadata
│   │   └── globals.css                   # ★ UPDATED — mobile fixes, smooth scroll
│   │
│   ├── components/                       # Reusable React components
│   │   ├── AIBotCinematic.tsx            # ★ NEW — full-screen AI chat demo section
│   │   ├── AIProgramsSection.tsx         # ★ UPDATED — full mobile responsiveness
│   │   ├── ChooseYourCourse.tsx
│   │   ├── Educators.tsx                 # ★ UPDATED — real mentor photos (3-col grid)
│   │   ├── FAQ.tsx                       # ★ UPDATED — 3 tabs, 16 Q&As, new content
│   │   ├── FloatingCTA.tsx               # ★ NEW — sticky "Book Free Demo" floating button
│   │   ├── Footer.tsx                    # ★ UPDATED — real social URLs, legal links, Akonnai copyright
│   │   ├── GamificationShowcase.tsx      # ★ NEW — XP progress, badges, leaderboard section
│   │   ├── HeroSection.tsx               # ★ UPDATED — sparkle badge, mobile responsive
│   │   ├── HowAKMINDWorks.tsx            # ★ NEW — cinematic 5-step method with count-up stats
│   │   ├── HowItWorks.tsx                # ★ UPDATED — mobile responsive
│   │   ├── LogoTicker.tsx                # ★ UPDATED — mobile responsive
│   │   ├── Navbar.tsx                    # ★ UPDATED — fixed pos, full-screen mobile overlay, global layout
│   │   ├── ParentalGuidelines.tsx        # ★ NEW — age suitability, device req, parent involvement
│   │   ├── ScrollProgressBar.tsx
│   │   ├── ScrollReveal.tsx              # ★ NEW — scroll-triggered reveal animation wrapper
│   │   ├── SkillsForSuccess.tsx          # ★ UPDATED — mobile responsive
│   │   ├── StatsRow.tsx                  # ★ UPDATED — 500+ Students, 4 Mentors, 3 Programs, 100% Live
│   │   ├── StudentSpotlight.tsx          # ★ UPDATED — 5 new testimonials, show-more on mobile
│   │   ├── TopPicks.tsx                  # ★ UPDATED — removed grade references
│   │   └── WhyChoose.tsx                 # ★ UPDATED — new 6 feature cards, new headline
│   │
│   ├── lib/
│   │   ├── env.ts            # Validates all 11 required env vars at startup
│   │   ├── dynamodb.ts       # DynamoDB client + table name exports
│   │   ├── cognito.ts        # Cognito sign up / sign in helpers
│   │   ├── auth.ts           # Session cookie (HMAC-SHA256)
│   │   ├── email.ts          # ★ UPDATED — AWS SES; added sendCareerApplication
│   │   ├── rate-limit.ts     # DynamoDB TTL rate limiter
│   │   ├── validators.ts     # Zod schemas for all API inputs
│   │   └── api-response.ts   # ok() / fail() / validationFail() helpers
│   │
│   └── middleware-helpers/
│       └── safe-handler.ts   # Wraps handlers in try/catch, returns 500 on throw
│
├── src/middleware.ts          # Payload size, content-type, security headers
│
├── public/
│   ├── robots.txt             # Disallows /api/ and /confirmation from crawlers
│   ├── sitemap.xml            # ★ NEW — 10 routes with changefreq and priority
│   ├── og-image.png           # ★ NEW — 1200×630 branded OG image for social sharing
│   ├── images/
│   │   └── mentors/
│   │       ├── akhil.jpg      # ★ NEW — real mentor photo
│   │       ├── jebian.jpg     # ★ NEW — real mentor photo
│   │       └── nagaraj.jpg    # ★ NEW — real mentor photo
│   └── media/
│
├── .env.local                 # Local secrets (gitignored)
├── .env.local.example         # Safe-to-commit template for all 11 vars
├── next.config.ts             # CSP + security headers via headers()
├── DEPLOYMENT.md              # AWS setup checklist + pre-launch test list
├── ARCHITECTURE.md            # Schemas, rate limit rules, data flows
├── package.json
└── tsconfig.json
```

---

## 4. Environment Configuration

All 11 variables are **required**. The app throws at startup if any are missing (skipped during `next build`).

**File:** `.env.local` (never commit this — it is gitignored)

```env
# AWS credentials — IAM user: akmind-app
AWS_ACCESS_KEY_ID=your-iam-access-key-id
AWS_SECRET_ACCESS_KEY=your-iam-secret-access-key
AWS_REGION=ap-south-1

# DynamoDB table names
DYNAMODB_USERS_TABLE=users
DYNAMODB_BOOKINGS_TABLE=bookings

# Cognito User Pool
COGNITO_USER_POOL_ID=ap-south-1_NWlfYqpfw
COGNITO_CLIENT_ID=4es6i1i70nh367uhp8u4s8boiv
NEXT_PUBLIC_COGNITO_USER_POOL_ID=ap-south-1_NWlfYqpfw
NEXT_PUBLIC_COGNITO_CLIENT_ID=4es6i1i70nh367uhp8u4s8boiv
NEXT_PUBLIC_COGNITO_REGION=ap-south-1

# AWS SES — sender & admin recipient
SES_FROM_EMAIL=hello@akmind.com
SES_ADMIN_EMAIL=admin@akmind.com

# Session signing key — must be 32+ characters
# Generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
AUTH_SESSION_SECRET=your-32-char-minimum-secret-here

# Google Apps Script webhook URL (bookings → Google Sheet)
GAS_WEBHOOK_URL=https://script.google.com/macros/s/your-script-id/exec
```

### Where each variable comes from

| Variable | Source |
|---|---|
| `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` | AWS Console → IAM → Users → akmind-app → Security credentials |
| `AWS_REGION` | Your chosen AWS region (e.g. `ap-south-1`) |
| `DYNAMODB_USERS_TABLE` / `DYNAMODB_BOOKINGS_TABLE` | DynamoDB table names you created |
| `COGNITO_USER_POOL_ID` | Cognito → User pools → your pool → Pool ID |
| `COGNITO_CLIENT_ID` | Cognito → your pool → App clients → client ID |
| `SES_FROM_EMAIL` / `SES_ADMIN_EMAIL` | Verified SES identities |
| `AUTH_SESSION_SECRET` | Generate locally with crypto.randomBytes (see above) |
| `GAS_WEBHOOK_URL` | Google Apps Script → Deploy → Web app URL |

### `src/lib/env.ts` — Startup Validation

```typescript
const required: Record<string, string | undefined> = {
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  AWS_REGION: process.env.AWS_REGION,
  DYNAMODB_USERS_TABLE: process.env.DYNAMODB_USERS_TABLE,
  DYNAMODB_BOOKINGS_TABLE: process.env.DYNAMODB_BOOKINGS_TABLE,
  COGNITO_USER_POOL_ID: process.env.COGNITO_USER_POOL_ID,
  COGNITO_CLIENT_ID: process.env.COGNITO_CLIENT_ID,
  SES_FROM_EMAIL: process.env.SES_FROM_EMAIL,
  SES_ADMIN_EMAIL: process.env.SES_ADMIN_EMAIL,
  GAS_WEBHOOK_URL: process.env.GAS_WEBHOOK_URL,
  AUTH_SESSION_SECRET: process.env.AUTH_SESSION_SECRET,
};

// Skip during next build — vars only required at runtime
const isBuildPhase = process.env.NEXT_PHASE === "phase-production-build";

if (!isBuildPhase) {
  const missing = Object.entries(required)
    .filter(([_, v]) => !v)
    .map(([k]) => k);
  if (missing.length > 0)
    throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
  if (process.env.AUTH_SESSION_SECRET!.length < 32)
    throw new Error("AUTH_SESSION_SECRET must be at least 32 characters");
}

export const env = {
  awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID!,
  awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  awsRegion: process.env.AWS_REGION!,
  usersTable: process.env.DYNAMODB_USERS_TABLE!,
  bookingsTable: process.env.DYNAMODB_BOOKINGS_TABLE!,
  cognitoUserPoolId: process.env.COGNITO_USER_POOL_ID!,
  cognitoClientId: process.env.COGNITO_CLIENT_ID!,
  sesFrom: process.env.SES_FROM_EMAIL!,
  sesAdmin: process.env.SES_ADMIN_EMAIL!,
  gasWebhookUrl: process.env.GAS_WEBHOOK_URL!,
  sessionSecret: process.env.AUTH_SESSION_SECRET!,
};
```

All library files (`dynamodb.ts`, `cognito.ts`, `email.ts`, `auth.ts`, `rate-limit.ts`) import from `env` — no direct `process.env` access anywhere except `env.ts`.

---

## 5. Database & Data Storage

> **v1.0 used a flat `data/users.json` file. v2.0+ is fully on AWS DynamoDB.**

### Table: `users` (DYNAMODB_USERS_TABLE)

Stores registered parent accounts.

| Attribute | Type | Notes |
|---|---|---|
| `id` | String (PK) | `${Date.now()}-${Math.random().toString(36).slice(2)}` |
| `email` | String | Lowercased + trimmed; **GSI partition key** (`email-index`) |
| `name` | String | Trimmed display name |
| `passwordHash` | String | bcrypt hash, 10 rounds — **never returned to client** |
| `createdAt` | String | ISO 8601 timestamp |

**GSI:** `email-index` — partition key: `email` (used to look up users by email for login/uniqueness check)

**Example item:**
```json
{
  "id": "1731659400000-k3m9x",
  "email": "priya@example.com",
  "name": "Priya Sharma",
  "passwordHash": "$2a$10$...",
  "createdAt": "2025-03-01T09:30:00.000Z"
}
```

---

### Table: `bookings` (DYNAMODB_BOOKINGS_TABLE)

Stores all demo class bookings.

| Attribute | Type | Notes |
|---|---|---|
| `id` | String (PK) | `crypto.randomUUID()` |
| `parentName` | String | |
| `phone` | String | |
| `email` | String | Parent email |
| `childName` | String | |
| `course` | String | e.g. `"AI Builders"` |
| `date` | String | Selected demo date `"YYYY-MM-DD"` |
| `time` | String | Selected time slot e.g. `"4:00 PM"` |
| `createdAt` | String | ISO 8601 timestamp |

**Example item:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "parentName": "Priya Sharma",
  "phone": "9876543210",
  "email": "priya@example.com",
  "childName": "Aarav Sharma",
  "course": "AI Builders",
  "date": "2025-04-10",
  "time": "4:00 PM",
  "createdAt": "2025-03-21T10:00:00.000Z"
}
```

---

### Table: `akmind-rate-limits` (hardcoded name)

Used by the rate limiter. DynamoDB TTL auto-deletes expired windows — no Redis needed.

| Attribute | Type | Notes |
|---|---|---|
| `pk` | String (PK) | Format: `rl#<type>:<ip>` e.g. `rl#auth:1.2.3.4` |
| `count` | Number | Atomically incremented per request |
| `ttl` | Number | Unix epoch seconds — DynamoDB TTL attribute |

> **Important:** Enable TTL on this table in DynamoDB console → Additional settings → Time to live → attribute name: `ttl`

---

### `src/lib/dynamodb.ts`

```typescript
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { env } from "./env";

let client: DynamoDBDocumentClient | null = null;

export function getDb() {
  if (!client) {
    const ddb = new DynamoDBClient({
      region: env.awsRegion,
      credentials: {
        accessKeyId: env.awsAccessKeyId,
        secretAccessKey: env.awsSecretAccessKey,
      },
    });
    client = DynamoDBDocumentClient.from(ddb, {
      marshallOptions: { removeUndefinedValues: true },
    });
  }
  return client;
}

export const USERS_TABLE = env.usersTable;
export const BOOKINGS_TABLE = env.bookingsTable;
export const RATE_LIMIT_TABLE = "akmind-rate-limits";
```

---

## 6. Authentication & Session Management

**File:** `src/lib/auth.ts`

Authentication uses **DynamoDB** (not Cognito) for storing user accounts, and **HMAC-SHA256 signed cookies** for sessions.

### `registerUser(name, email, password)`
1. Normalises email (lowercase + trim)
2. Queries `email-index` GSI — throws `"Email already registered"` if found
3. Hashes password with bcrypt (10 rounds)
4. Writes user to DynamoDB `users` table
5. Returns `{ id, email, name }` — **passwordHash is never returned**

### `verifyUser(email, password)`
1. Queries `email-index` GSI to find user
2. `bcrypt.compare(password, user.passwordHash)`
3. Returns `{ id, email, name }` on match, throws on failure

### `createSessionCookiePayload(user)`
```typescript
// Payload: { id, email, name }
const base = JSON.stringify({ id, email, name });
const signature = crypto
  .createHmac("sha256", env.sessionSecret)
  .update(base)
  .digest("hex");
const value = Buffer.from(base).toString("base64url") + "." + signature;
return { name: "akmind_session", value };
```
Cookie is set with `secure: true` in production, `SameSite: lax`, 7-day `maxAge`.

### `parseSessionCookie(cookieHeader)`
1. Extracts `akmind_session` from cookie header
2. Splits on last `.` to get `[base64url payload, hex signature]`
3. Recomputes HMAC and uses constant-time comparison
4. Returns parsed `{ id, email, name }` or `null` if invalid/tampered

---

## 7. Rate Limiting

**File:** `src/lib/rate-limit.ts`

Production-grade rate limiting with **zero extra infrastructure** — uses DynamoDB atomic counters and TTL for automatic window expiry.

### Limits

| Route | Key | Limit | Window | 429 Message |
|---|---|---|---|---|
| `POST /api/auth/login` | `rl#auth:<ip>` | 5 req | 15 min | "Too many attempts. Try again in 15 minutes." |
| `POST /api/auth/register` | `rl#auth:<ip>` | 5 req | 15 min | "Too many attempts. Try again in 15 minutes." |
| `POST /api/register` | `rl#booking:<ip>` | 3 req | 1 hour | "Too many booking attempts. Try again in 1 hour." |
| `POST /api/careers` | `rl#careers:<ip>` | 3 req | 1 hour | "Too many applications. Try again in 1 hour." |
| `GET /api/auth/me` | `rl#general:<ip>` | 60 req | 60 sec | `{ error: "Too many requests" }` |
| `GET /api/booking/:id` | `rl#general:<ip>` | 60 req | 60 sec | `{ error: "Too many requests" }` |

### How it works

```typescript
export async function checkRateLimit(
  key: string,
  config: LimitConfig
): Promise<{ allowed: boolean; remaining: number }> {
  const db = getDb();
  const now = Math.floor(Date.now() / 1000);
  const pk = `rl#${key}`;
  const ttl = now + config.windowSeconds;

  const res = await db.send(new UpdateCommand({
    TableName: RATE_LIMIT_TABLE,
    Key: { pk },
    UpdateExpression:
      "SET #count = if_not_exists(#count, :zero) + :inc, #ttl = :ttl",
    ExpressionAttributeNames: { "#count": "count", "#ttl": "ttl" },
    ExpressionAttributeValues: { ":zero": 0, ":inc": 1, ":ttl": ttl },
    ReturnValues: "ALL_NEW",
  }));

  const count = res.Attributes?.count ?? 1;
  return {
    allowed: count <= config.max,
    remaining: Math.max(0, config.max - count),
  };
}
```

**Fail-open:** If DynamoDB is unreachable, `checkRateLimit` catches the error and returns `{ allowed: true }` — a DynamoDB outage never blocks users.

### IP extraction

```typescript
export function getIP(req: Request): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || req.headers.get("x-real-ip")
    || "unknown";
}
```

### Usage in routes

```typescript
// Top of every protected handler:
const { allowed } = await checkRateLimit(`auth:${getIP(req)}`, LIMITS.auth);
if (!allowed) return fail("Too many attempts. Try again in 15 minutes.", 429);
```

---

## 8. Security Hardening

### `src/middleware.ts` — Request Proxy

Runs on every request (excluding static assets):

```typescript
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Block oversized payloads (10 KB limit)
  const cl = req.headers.get("content-length");
  if (cl && parseInt(cl) > 10000) {
    return new NextResponse("Payload too large", { status: 413 });
  }

  // Enforce JSON content-type on all POST /api/* requests
  if (req.method === "POST" && req.nextUrl.pathname.startsWith("/api")) {
    const ct = req.headers.get("content-type") || "";
    if (!ct.includes("application/json")) {
      return new NextResponse("Unsupported Media Type", { status: 415 });
    }
  }

  // Security headers
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("X-XSS-Protection", "1; mode=block");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  res.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
```

### `next.config.ts` — HTTP Security Headers

```typescript
async headers() {
  return [
    {
      source: "/(.*)",
      headers: [
        {
          key: "Content-Security-Policy",
          value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://fonts.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.gstatic.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob: https:; connect-src 'self' https://*.amazonaws.com https://cognito-idp.*.amazonaws.com; frame-ancestors 'none';",
        },
        { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      ],
    },
  ];
}
```

### `safeHandler` — Global Error Boundary

**File:** `src/middleware-helpers/safe-handler.ts`

Wraps every API handler. If anything throws, returns a safe generic `500` — no `err.message` or stack traces ever reach the client:

```typescript
export function safeHandler(fn: Handler): Handler {
  return async (req, ctx) => {
    try {
      return await fn(req, ctx);
    } catch (err) {
      console.error("[API Error]", err);
      return NextResponse.json(
        { error: "Something went wrong. Please try again." },
        { status: 500 }
      );
    }
  };
}
```

### Zod Validation

All API route bodies are validated with Zod before any processing:

```typescript
// Example — login route
const result = loginSchema.safeParse(await req.json());
if (!result.success) return validationFail(result.error.flatten());
```

If validation fails, returns `422` with field-level error details. If it passes, TypeScript types are guaranteed from the schema.

### `public/robots.txt`

```
User-agent: *
Disallow: /api/
Disallow: /confirmation
Sitemap: https://www.akmind.com/sitemap.xml
```

### `public/sitemap.xml`

Covers all 10 public routes with `changefreq` and `priority` attributes. Generated manually and committed to `public/`.

### Security Summary

| Protection | Implementation |
|---|---|
| Passwords | bcrypt, 10 rounds — never stored plain, never returned to client |
| Sessions | HMAC-SHA256 signed cookies, 32+ char secret, 7-day expiry |
| Rate limiting | DynamoDB TTL counters per IP per route |
| Input validation | Zod schemas on all POST routes |
| Error leakage | `safeHandler` returns generic 500, logs full error server-side only |
| Payload attacks | 10 KB content-length limit in middleware |
| MIME sniffing | `X-Content-Type-Options: nosniff` |
| Clickjacking | `X-Frame-Options: DENY` + CSP `frame-ancestors: none` |
| HTTPS | HSTS `max-age=31536000; includeSubDomains` |
| XSS | `X-XSS-Protection: 1; mode=block` + strict CSP |
| Content-type injection | 415 on non-JSON POST to /api/* |
| Dependency CVEs | 0 vulnerabilities (`npm audit` — Next.js 16.2.1) |

---

## 9. Frontend Pages

### Home — `/`
**File:** `src/app/page.tsx`

Landing page — assembles all home-page section components in this order:

```
<HeroSection />
<LogoTicker />
<StatsRow />
<AIProgramsSection />
<TopPicks />
<HowAKMINDWorks />       ← NEW cinematic 5-step section
<WhyChoose />
<GamificationShowcase /> ← NEW gamification section
<SkillsForSuccess />
<AIBotCinematic />       ← NEW AI chat demo section
<Educators />
<StudentSpotlight />
<FAQ />
```

Wave-shaped SVG dividers separate each section for a smooth visual flow.

---

### Login — `/login`
**File:** `src/app/login/page.tsx`

Parent login form.
- Fields: Email, Password
- On submit: `POST /api/auth/login`
- On success: redirects to `/`
- On failure: displays inline error
- Link to `/signup` for new users

---

### Sign Up — `/signup`
**File:** `src/app/signup/page.tsx`

New parent account creation.
- Fields: Full Name, Email, Password (min 6 chars — enforced by Zod schema)
- On submit: `POST /api/auth/register`
- On success: session cookie set, redirect to `/`, welcome email sent via SES
- Link to `/login` for existing users

---

### Register (Demo Booking) — `/register`
**File:** `src/app/register/page.tsx`
**Metadata:** `src/app/register/layout.tsx`

Upgraded 4-step multi-page wizard for booking a free demo class.

**Step progress bar** — indigo/green circles with labels (Step 1–4), advances on each Next click.
**Directional slide animations** — `AnimatePresence` slides steps in/out correctly on forward and back navigation.

| Step | Heading | Fields |
|---|---|---|
| **Step 1** | Who's booking? | Parent/Guardian Name, Phone Number, Email |
| **Step 2** | Tell us about your child | Child's Name |
| **Step 3** | Pick your program | AI Explorers (Beginner) / AI Builders (Most Popular) / AI Innovators (Advanced) — displayed as cards with level badges |
| **Step 4** | Schedule your demo | Pick a date + time slot (4 PM, 5 PM, 6 PM, 7 PM) + Video call note |

- Back button: ghost/outline style
- Next/Confirm button: indigo filled
- Form data held in React state between steps
- On final submit: `POST /api/register` → receives `{ bookingId }` → navigates to `/confirmation?id=${bookingId}`
- **ParentalGuidelines** section included (collapsible toggle, default collapsed)

---

### Confirmation — `/confirmation`
**File:** `src/app/confirmation/page.tsx`

Post-booking confirmation screen.
- Reads `?id=` from URL search params (`window.location.search`)
- Fetches `GET /api/booking/${bookingId}` to load booking data from DynamoDB
- Shows loading skeleton while fetching
- Displays: child name, course, date, time, parent email
- Error state if booking ID is invalid or not found
- CTA to return home

---

### About — `/about`
Company info — mission statement, founding year (2024), key stats grid, team section, contact email (`hello@akmind.com`).

### Contact — `/contact`
**Updated:** Email-only contact (`hello@akmind.com`), Bangalore office address. Phone number removed.

### Curriculum — `/curriculum`
Program breakdown — topics, tools, projects, learning outcomes for all three tiers.
Includes **`<ParentalGuidelines />`** section before the CTA.

### Mentors — `/mentors`
**Updated:** Real mentor photos (Nagaraj, Akhil Raj, Jaibin Jose). 3-column grid layout. No "Book Free Demo" button on cards.

Active mentors:
- **Nagaraj** — `public/images/mentors/nagaraj.jpg`
- **Akhil Raj** — `public/images/mentors/akhil.jpg`
- **Jaibin Jose** — `public/images/mentors/jebian.jpg`

### Become a Mentor — `/become-mentor`
Application page for industry professionals.

### Reviews — `/reviews`
Student and parent testimonials. Role labels simplified to "Parent". Grade references removed.

### Careers — `/careers`
**Fully rewritten.** Indigo hero section + 4 job cards (left `border-l-4` accent) + full application form with validation and success state.

Job cards include: role title, type (Full-time/Part-time/Contract), location. On submission, `POST /api/careers` sends admin notification + applicant confirmation via SES.

### Privacy Policy — `/privacy-policy`
**New page.** 8 sections covering: data collection, use, storage, sharing, cookies, children's privacy, user rights, contact.

### Terms & Conditions — `/terms-and-conditions`
**New page.** 10 sections covering: acceptance, services, intellectual property, user conduct, payment, disclaimers, limitation of liability, governing law, changes, contact.

---

## 10. Components

### `Navbar.tsx`
**Fully rebuilt.** Fixed position, always-white background. AKMIND™ logo + "by AkonnAI" watermark below.
- Full-screen mobile overlay slide-in menu (fixed `AnimatePresence` outside nav container — previously broken)
- `overflow-x: clip` on `html` element fixes sticky header broken by `overflow-x: hidden`
- Auth state: polls `GET /api/auth/me` on mount → shows Login/Signup OR logged-in user dropdown
- Navbar moved to `layout.tsx` — present on every route automatically (previously missing on login, signup, register, confirmation, curriculum)
- Program labels use level descriptions instead of grade numbers

### `HeroSection.tsx`
- Animated typewriter headline cycling through phrases
- Gradient animated text (8s colour cycle)
- Auto-rotating image slideshow (4 slides, 3s interval)
- Magnetic CTA button — cursor attraction effect on hover
- **"AKMIND™ — Dream. Discover. Shine." sparkle badge** above the main headline (new)
- Background: dot-grid pattern with gradient overlay
- Fully mobile responsive

### `HowAKMINDWorks.tsx` ★ NEW (~563 lines)
Cinematic 5-step learning method section.
- Alternating left/right layout with scroll-triggered entry animations
- Mockup panels (phone/screen illustrations) per step
- Count-up stats bar at the bottom (e.g. 500+ Students, 95% Completion Rate)
- Steps: Watch & Learn → Play & Practice → Build Projects → Get Mentor Feedback → Earn Certificates

### `GamificationShowcase.tsx` ★ NEW (~282 lines)
Gamification section with live-feeling UI mockups.
- XP progress bar with level indicator
- Badge achievement grid
- Leaderboard preview (top 5 ranked students)
- Bottom stats row with amber gradient numbers

### `AIBotCinematic.tsx` ★ NEW (~261 lines)
Full-screen AI guide chat demo section.
- Staggered message animations (user + AI messages appear in sequence)
- Code block display inside chat
- Floating feature badges (e.g. "Always Available", "Personalized")
- Typing indicator animation

### `WhyChoose.tsx`
**Updated headline:** "Everything that makes AKMIND™ different"
**New 6 feature cards:**
1. Micro-Learning Format (Play icon)
2. Story-Based Games (Gamepad2 icon)
3. AI Guide (Bot icon)
4. XP & Badges (Trophy icon)
5. Live Mentor Sessions (Users icon)
6. Verifiable Certificate (Award icon)

### `FAQ.tsx`
**Rewritten content.** 3 tabs, 16 total questions.
- **Class Experience** — session format, devices, recording, AI guide usage
- **About the Program** — micro-learning, gamification, certificates, worldwide access
- **Support** — parent involvement, technical support, cancellation

### `ParentalGuidelines.tsx` ★ NEW (~79 lines)
3-card info section displayed on Curriculum and Register pages.
- Age Suitability card
- Device Requirements card (web browser, iOS, Android, tablet)
- Parent Involvement card
- Pink info banner at bottom

### `FloatingCTA.tsx` ★ NEW (~36 lines)
Sticky "Book Free Demo" button fixed at the bottom-right of the viewport. Appears after initial scroll.

### `ScrollReveal.tsx` ★ NEW (~25 lines)
Reusable wrapper component. Children animate into view (fade + slide up) when scrolled into viewport via Framer Motion's `whileInView`.

### `StudentSpotlight.tsx`
**Updated with 5 real testimonials:** Arjun, Priya, Rohan, Ananya, Karthik. Card layout with initials avatar, star rating, MapPin location. Show-more button on mobile. Grade references removed.

### `StatsRow.tsx`
**Updated numbers:** 500+ Students · 4 Expert Mentors · 3 Programs · 100% Gamification

### `Footer.tsx`
- Real social URLs: Instagram / LinkedIn / YouTube
- Contact email: `hello@akmind.com`
- Legal links: Privacy Policy · Terms & Conditions
- **Akonnai AI Pvt. Ltd. copyright line** added at bottom
- Phone number removed

### `Educators.tsx`
Real mentor photos from `public/images/mentors/`. 3-column grid. Mentors: Nagaraj, Akhil Raj, Jaibin Jose (Abhishek removed).

*(Other components: `TopPicks`, `HowItWorks`, `SkillsForSuccess`, `LogoTicker`, `ScrollProgressBar`, `ChooseYourCourse` — all mobile responsive)*

---

## 11. Backend API Routes

All routes use `safeHandler` (global error boundary) and Zod validation. All `process.env` access goes through `env.ts`.

---

### `POST /api/auth/register`
**File:** `src/app/api/auth/register/route.ts`

Creates a new parent account.

**Rate limit:** 5 requests / 15 min per IP

**Request body (Zod validated):**
```json
{
  "name": "Priya Sharma",
  "email": "priya@example.com",
  "password": "mypassword123"
}
```

**Flow:**
1. Rate limit check
2. Zod validation
3. DynamoDB GSI query — check email uniqueness
4. `bcrypt.hash(password, 10)`
5. DynamoDB `PutCommand` → users table
6. `createSessionCookiePayload(user)` → set cookie
7. `sendWelcomeEmail(email, name)` — fire and forget (no await)

**Response `201`:**
```json
{ "success": true, "user": { "id": "...", "email": "...", "name": "..." } }
```

**Errors:** `422` validation fail | `409` email taken | `429` rate limited | `500` server error

---

### `POST /api/auth/login`
**File:** `src/app/api/auth/login/route.ts`

Authenticates a parent and creates a session.

**Rate limit:** 5 requests / 15 min per IP

**Request body:**
```json
{ "email": "priya@example.com", "password": "mypassword123" }
```

**Flow:**
1. Rate limit check
2. Zod validation
3. DynamoDB GSI query by email
4. `bcrypt.compare(password, hash)`
5. `createSessionCookiePayload(user)` → set cookie

**Response `200`:**
```json
{ "success": true, "user": { "id": "...", "email": "...", "name": "..." } }
```

**Response `401`:** `{ "error": "Invalid email or password" }` — generic, doesn't reveal which field failed

---

### `POST /api/auth/logout`
**File:** `src/app/api/auth/logout/route.ts`

Clears the session cookie (`maxAge: 0`).

```json
{ "success": true }
```

---

### `GET /api/auth/me`
**File:** `src/app/api/auth/me/route.ts`

Verifies the current session. Used by Navbar on every page load.

**Rate limit:** 60 requests / 60 sec per IP

**Response (authenticated):**
```json
{ "authenticated": true, "user": { "id": "...", "email": "...", "name": "..." } }
```

**Response (not authenticated):**
```json
{ "authenticated": false }
```

`passwordHash` is **never** present in any response from this or any other route.

---

### `POST /api/register`
**File:** `src/app/api/register/route.ts`

Handles demo class booking.

**Rate limit:** 3 requests / 1 hour per IP

**Request body (Zod validated):**
```json
{
  "parentName": "Priya Sharma",
  "phone": "9876543210",
  "email": "priya@example.com",
  "childName": "Aarav Sharma",
  "course": "AI Builders",
  "date": "2025-04-10",
  "time": "4:00 PM"
}
```

**Flow:**
1. Rate limit check
2. Zod validation
3. `crypto.randomUUID()` → bookingId
4. DynamoDB `PutCommand` → bookings table
5. `fetch(env.gasWebhookUrl, ...)` — forward to Google Sheet (non-blocking, fire-and-forget)
6. `await Promise.allSettled([sendAdminBookingNotification(...), sendParentBookingConfirmation(...)])` — both SES emails

**Response `200`:**
```json
{ "success": true, "bookingId": "550e8400-e29b-41d4-a716-446655440000" }
```

---

### `GET /api/booking/[bookingId]`
**File:** `src/app/api/booking/[bookingId]/route.ts`

Fetches booking details for the confirmation page.

**Rate limit:** 60 requests / 60 sec per IP

**Response `200`:**
```json
{
  "success": true,
  "id": "...",
  "childName": "Aarav Sharma",
  "course": "AI Builders",
  "date": "2025-04-10",
  "time": "4:00 PM",
  "email": "priya@example.com"
}
```

**Errors:** `400` invalid ID | `404` not found | `429` rate limited

---

### `POST /api/careers` ★ NEW
**File:** `src/app/api/careers/route.ts`

Handles job application form submissions from the Careers page.

**Rate limit:** 3 requests / 1 hour per IP

**Request body (Zod validated):**
```json
{
  "name": "Ravi Kumar",
  "email": "ravi@example.com",
  "phone": "9876543210",
  "role": "AI Curriculum Designer",
  "message": "I'd love to contribute to AKMIND's mission..."
}
```

**Flow:**
1. Rate limit check
2. Zod validation (name, email format, phone format, role, message)
3. `sendCareerApplication(data)` — fires both SES emails (admin notification + applicant confirmation)

**Response `200`:**
```json
{ "success": true }
```

**Errors:** `422` validation fail | `429` rate limited | `500` server error

---

## 12. Demo Booking Flow

End-to-end walkthrough:

```
1. Parent visits /register
   ├── Step 1: Parent name, phone, email
   ├── Step 2: Child name
   ├── Step 3: Select course (with level badges)
   └── Step 4: Pick date + time → click "Confirm Booking"
                │
                ▼
2. POST /api/register (JSON)
   │
   ├── Rate limit: 3/hour per IP
   ├── Zod validation of all fields
   ├── DynamoDB PutCommand → bookings table → get bookingId
   ├── fetch(GAS_WEBHOOK_URL) → Google Sheet [non-blocking]
   ├── SES: admin notification → admin@akmind.com
   └── SES: parent confirmation → parent email
                │
                ▼
3. Response: { success: true, bookingId: "uuid" }
                │
                ▼
4. Client navigates to /confirmation?id=<bookingId>
                │
                ▼
5. GET /api/booking/<bookingId>
   └── DynamoDB GetCommand → returns booking fields
                │
                ▼
6. Confirmation page displays:
   ✓ Child name, course, date, time
   ✓ "Confirmation sent to priya@example.com"
```

---

## 13. Email Notifications

**File:** `src/lib/email.ts` — AWS SES via `@aws-sdk/client-ses`

> **v2.0 change:** Migrated from nodemailer / Gmail SMTP to AWS SES. All emails are HTML. Sender is `hello@akmind.com`.

### Welcome Email
- **Trigger:** Successful `POST /api/auth/register`
- **To:** New parent's email
- **Subject:** `"Welcome to AKMIND™! Your AI Journey Begins"`
- **Content:** Welcome message, "Book Free Demo Class" CTA button linking to `/register`
- **Sent as:** Fire-and-forget (doesn't block the response)

```typescript
export async function sendWelcomeEmail(to: string, name: string) {
  await sendEmail(to, "Welcome to AKMIND™! Your AI Journey Begins", `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
      <div style="background:#4F46E5;padding:32px;text-align:center">
        <h1 style="color:#fff;margin:0;font-size:28px">Welcome to AKMIND™</h1>
        <p style="color:#C7D2FE;margin:8px 0 0;font-size:16px">Dream. Discover. Shine.</p>
      </div>
      <div style="padding:32px;background:#fff">
        <p>Hi ${name},</p>
        <p>Welcome to AKMIND™ — the world's most exciting AI education program...</p>
        <a href="https://www.akmind.com/register"
           style="background:#4F46E5;color:#fff;padding:14px 32px;border-radius:8px;">
          Book Free Demo Class
        </a>
      </div>
    </div>
  `);
}
```

---

### Admin Booking Notification
- **Trigger:** Successful `POST /api/register`
- **To:** `SES_ADMIN_EMAIL` (`admin@akmind.com`)
- **Subject:** `"New Demo Booking — Aarav Sharma"`
- **Content:** HTML table with all booking fields

---

### Parent Booking Confirmation
- **Trigger:** Successful `POST /api/register`
- **To:** Parent's email from the booking form
- **Subject:** `"Your Demo Class is Booked! — AKMIND™"`
- **Content:** Booking summary card (student, course, date, time), mentor call instructions

---

### Career Application Emails ★ NEW
**Function:** `sendCareerApplication(data)` in `src/lib/email.ts`

Two emails sent on each career form submission:

**Admin notification:**
- **To:** `SES_ADMIN_EMAIL`
- **Subject:** `"New Job Application — <role> from <name>"`
- **Content:** HTML table with applicant name, email, phone, role, message

**Applicant confirmation:**
- **To:** Applicant's email
- **Subject:** `"We received your application — AKMIND™"`
- **Content:** Thank-you note, role applied for, expected response timeline

All email functions return `{ success: boolean }` and catch errors internally — a failed email never blocks the API response or throws.

---

## 14. Third-Party Integrations

### Google Apps Script (GAS) — Bookings CRM
- **URL:** Stored in `GAS_WEBHOOK_URL` env var (no longer hardcoded)
- **Purpose:** Forwards each booking to a Google Sheet for the AKMIND team
- **Direction:** One-way `POST` from `api/register/route.ts`
- **Behaviour:** Non-blocking — failure is logged but does not affect the booking response

### AWS SES
- **Sender:** `hello@akmind.com` (domain verified in SES)
- **Admin recipient:** `admin@akmind.com` (verified)
- **SDK:** `@aws-sdk/client-ses` → `SendEmailCommand`
- **Mode:** Must be out of SES sandbox for production (sends to unverified addresses)

### AWS Cognito
- **File:** `src/lib/cognito.ts`
- Exports `cognitoSignUp`, `cognitoSignIn`, `cognitoGetUser`
- Cognito client and pool/client IDs sourced from `env.*`
- (Currently the app uses its own DynamoDB-based auth for login/signup; Cognito integration is prepared)

### Google Fonts
- **Outfit** loaded via `next/font/google` in `layout.tsx`
- Applied globally as the primary typeface

---

## 15. Styling & Design System

### Color Palette

| Role | Color | Tailwind |
|---|---|---|
| Primary | Indigo | `indigo-600` |
| Accent 1 | Purple | `purple-600` |
| Accent 2 | Pink | `pink-500` |
| Accent 3 | Amber | `amber-500` (gamification) |
| Background | White / Slate-50 | `slate-50` |
| Dark Background | Slate-900 | `slate-900` |
| Text Primary | Slate-900 | `slate-900` |
| Text Muted | Slate-500 | `slate-500` |
| Success | Emerald | `emerald-500` |
| Error | Red | `red-600` |

### Animations (Framer Motion)

| Animation | Component | Details |
|---|---|---|
| Typewriter effect | HeroSection | Cycles through phrases |
| Gradient text shimmer | HeroSection | 8-second infinite cycle |
| Image slideshow | HeroSection | Auto-advances every 3s |
| Magnetic button | HeroSection | Mouse attraction on hover |
| 3D tilt cards | AIProgramsSection | `perspective(800px)` on hover |
| Logo ticker scroll | LogoTicker | 30s infinite loop |
| Scroll progress bar | ScrollProgressBar | Tracks `window.scrollY` |
| FAQ accordion | FAQ | Spring physics expand/collapse |
| Booking wizard steps | register/page.tsx | Directional slide via `AnimatePresence` |
| Scroll-triggered reveal | ScrollReveal | `whileInView` fade + slide up |
| HowAKMINDWorks steps | HowAKMINDWorks | Alternating scroll-triggered entry |
| Count-up numbers | HowAKMINDWorks | Animate from 0 to target on scroll |
| XP bar fill | GamificationShowcase | Smooth width transition |
| AI chat messages | AIBotCinematic | Staggered appearance + typing indicator |
| Full-screen mobile menu | Navbar | Slide-in overlay with `AnimatePresence` |

### `src/app/globals.css` — Key Fixes

```css
/* Prevent input zoom on mobile iOS */
input, select, textarea { font-size: 16px; }

/* Fix sticky header broken by overflow-x hidden */
html { overflow-x: clip; }

/* Smooth scroll */
html { scroll-behavior: smooth; }
```

### SEO & Social

| Asset | File | Details |
|---|---|---|
| Default metadata | `src/app/layout.tsx` | Title, description, keywords, authors, robots |
| Open Graph | `src/app/layout.tsx` | `og:title`, `og:description`, `og:image`, `en` locale |
| Twitter Card | `src/app/layout.tsx` | `summary_large_image` |
| OG Image | `public/og-image.png` | 1200×630 branded image |
| Sitemap | `public/sitemap.xml` | 10 routes, changefreq + priority |
| Robots | `public/robots.txt` | Disallow /api/ and /confirmation |
| Route metadata | `src/app/*/layout.tsx` | Per-page metadata for client-component routes |

---

## 16. Startup & Development

### Prerequisites
- Node.js 18+ (LTS recommended)
- npm
- AWS account with DynamoDB, SES, Cognito configured
- `.env.local` populated (see Section 4)

### Quick Start (Windows)
Double-click **`start_all.cmd`** — detects Node.js, runs `npm install`, starts dev server.
Open **http://localhost:3000**

### Manual Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
# → http://localhost:3000

# Type check
npx tsc --noEmit

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Security audit
npm audit
```

### `package.json` (current)

```json
{
  "name": "akmind-app",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  },
  "dependencies": {
    "next": "^16.2.1",
    "react": "19.2.3",
    "react-dom": "19.2.3",
    "@aws-sdk/client-dynamodb": "^3.1013.0",
    "@aws-sdk/lib-dynamodb": "^3.1013.0",
    "@aws-sdk/client-ses": "^3.1013.0",
    "@aws-sdk/client-cognito-identity-provider": "^3.1013.0",
    "zod": "^4.3.6",
    "bcryptjs": "^2.4.3",
    "framer-motion": "^12.34.0",
    "lucide-react": "^0.564.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^3.4.1"
  },
  "devDependencies": {
    "typescript": "^5",
    "tailwindcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "@types/bcryptjs": "^2.4.6",
    "eslint": "^9"
  }
}
```

---

## 17. Key Data Flows

### Sign Up Flow
```
POST /api/auth/register
  → Rate limit: 5/15min per IP
  → Zod validate: { name, email, password }
  → DynamoDB QueryCommand (email-index GSI) — check uniqueness
  → bcrypt.hash(password, 10)
  → DynamoDB PutCommand → users table
  → createSessionCookiePayload → Set-Cookie (7 days)
  → sendWelcomeEmail(email, name) [SES, fire-and-forget]
  → 201 { success: true, user: { id, email, name } }
  → Client: redirect to /
```

### Login Flow
```
POST /api/auth/login
  → Rate limit: 5/15min per IP
  → Zod validate: { email, password }
  → DynamoDB QueryCommand (email-index GSI)
  → bcrypt.compare(password, hash)
  → createSessionCookiePayload → Set-Cookie (7 days)
  → 200 { success: true, user: { id, email, name } }
  → Client: redirect to /
```

### Session Check (every page load)
```
Navbar mounts (global — injected by layout.tsx)
  → GET /api/auth/me
    → Rate limit: 60/min per IP
    → parseSessionCookie: split base64url + HMAC, verify signature
    → 200 { authenticated: true, user: { id, email, name } }
      OR { authenticated: false }
  → Navbar: shows user dropdown OR Login/Signup buttons
```

### Demo Booking Flow
```
/register (4 steps) → submit
  → POST /api/register
    → Rate limit: 3/hour per IP
    → Zod validate: all fields
    → DynamoDB PutCommand → bookings table → bookingId
    → fetch(GAS_WEBHOOK_URL) [non-blocking]
    → SES: sendAdminBookingNotification → admin@akmind.com
    → SES: sendParentBookingConfirmation → parent email
    → 200 { success: true, bookingId }
  → Client: /confirmation?id=<bookingId>
    → GET /api/booking/<bookingId>
      → Rate limit: 60/min per IP
      → DynamoDB GetCommand → bookings table
      → 200 { id, childName, course, date, time, email }
    → Display booking confirmation card
```

### Career Application Flow ★ NEW
```
/careers → application form → submit
  → POST /api/careers
    → Rate limit: 3/hour per IP
    → Zod validate: { name, email, phone, role, message }
    → sendCareerApplication(data)
      → SES: admin notification → admin@akmind.com
      → SES: applicant confirmation → applicant email
    → 200 { success: true }
  → Client: shows success state ("Application received!")
```

### Logout Flow
```
User clicks Logout in Navbar
  → POST /api/auth/logout
    → clearSessionCookie() → Set-Cookie: maxAge=0
  → Cookie cleared in browser
  → Client: reload
```

---

## 18. Version History

### v2.1 — UI/UX Overhaul, New Sections, SEO, Worldwide Scope (March 22–23, 2026)

| Commit | Description |
|---|---|
| `c74dfd2` | fix: mentors page — remove Book Free Demo button, fix card alignment, update Akhil Raj name |
| `8a0936a` | fix: remove phone number from contact page |
| `5173606` | fix: correct mentor name spelling from Jebin to Jaibin Jose |
| `03313c0` | feat: update WhyChoose section with new feature cards and headline |
| `ca1375d` | feat: add HowAKMINDWorks, GamificationShowcase, AIBotCinematic sections + rewrite FAQ |
| `0cd26ca` | fix: remove age/grade/India restrictions and fix device copy sitewide |
| `6cd51ae` | fix: shorten default title to AKMIND — AI Education for Schools |
| `cccd56e` | fix: update metadata titles and descriptions in layout.tsx |
| `1c1e160` | feat: add OG image for social media sharing |
| `0ee7bd7` | feat: add comprehensive SEO — metadata, sitemap, robots.txt |
| `b33ad9a` | fix: move Navbar to global layout so it appears on every page |
| `c4027af` | feat: mobile responsiveness, navbar fix, mentor photos, and visual polish |
| `f31cc49` | feat: final polish — social links, testimonials, stats, contact, about, SEO |
| `f53bc26` | feat: add AKMIND™ trademark symbol across all visible brand mentions |
| `74be465` | feat: add watermark badges, branded hero badge, and upgrade register wizard |
| `1574349` | feat: rewrite careers page with job cards, application form, and API route |
| `9d9fa88` | feat: add ParentalGuidelines section to curriculum and register pages |
| `38aa6d4` | feat: update mentors, FAQ, legal pages, remove grade refs, fix mentor lists |

### v2.0 — Security Hardening, AWS Migration (March 21, 2026)

| Commit | Description |
|---|---|
| `f48a34f` | docs: rewrite PROJECT_Readme.md for v2.0 — full update with all changes |
| `f504f68` | feat: security hardening — rate limiting, SES email, env validation, build fixes |
| `d9299b7` | feat: add Zod validation and safeHandler to all API routes |
| `4035f79` | feat: migrate auth to AWS Cognito + DynamoDB, replace JSON file DB |
| `f4a7cb0` | docs: add PROJECT_Readme.md and update about page year to 2026 |

### v1.x — Foundation

| Commit | Description |
|---|---|
| `54287de` | feat: add new pages, navbar updates, and start_all.cmd setup script |
| `05cfd74` | feat: futuristic UI enhancements |
| `af25a19` | baseline: before futuristic UI enhancements |

---

### What changed in v2.1 (vs v2.0)

| Area | v2.0 | v2.1 |
|---|---|---|
| Scope | India only, Grades 5–10, ages 10–16 | Worldwide, no age/grade restrictions |
| Homepage sections | 11 sections | 14 sections (+ HowAKMINDWorks, GamificationShowcase, AIBotCinematic) |
| Register wizard | Basic step form | Step progress bar, level badges, slide animations, video call note |
| Careers page | Basic listing | Full job cards + application form + `/api/careers` route + SES emails |
| Legal pages | None | Privacy Policy (8 sections) + Terms & Conditions (10 sections) |
| Mentor photos | Placeholder avatars | Real photos (Nagaraj, Akhil Raj, Jaibin Jose) |
| Navbar | Page-by-page import | Global — injected once in `layout.tsx` |
| Mobile | Partial | Full responsive pass across all pages and components |
| SEO | Basic | Full metadata, per-route layout.tsx, sitemap.xml, robots.txt, OG image |
| Branding | AKMIND | AKMIND™, "by AkonnAI" watermark, Akonnai AI Pvt. Ltd. copyright |
| WhyChoose cards | Generic | Micro-learning, Story games, AI guide, XP, Live mentors, Certificate |
| FAQ | 3 tabs, old content | 3 tabs, 16 Q&As, gamification + worldwide device support copy |
| Email copy | "India's most exciting" | "world's most exciting" |
| Contact page | Email + phone | Email only (`hello@akmind.com`) |
| Mentor cards | "Book Free Demo" button | No button — cleaner card layout |

---

*AKMIND™ v2.1 — Built with Next.js, TypeScript, Tailwind CSS, Framer Motion, and AWS.*
*© 2026 Akonnai AI Pvt. Ltd. All rights reserved.*
