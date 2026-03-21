# AKMIND v2.0 — Project Documentation

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

**AKMIND** is a full-stack AI education platform targeting students in **Grades 5–10 across India**. It enables parents and students to discover structured AI learning programs, book free demo classes, and enroll in 1-on-1 mentorship sessions with industry experts.

### Mission & Goals
- Bridge the gap in AI education for young learners
- Provide hands-on, project-based learning (not just theory)
- Connect students with expert mentors for personalised guidance
- Make AI accessible and exciting for kids aged 10–16

### Key Stats
- **500+ students** have built real AI projects
- **Founded in 2023**
- Focused on practical skills: Python, Machine Learning, Computer Vision, NLP

### Three Core Programs

| Program | Grades | Level |
|---|---|---|
| **AI Explorers** | 5–6 | Beginner Friendly |
| **AI Builders** | 7–8 | Most Popular |
| **AI Innovators** | 9–10 | Advanced |

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
│   │   │   └── register/route.ts         # POST /api/register (demo booking)
│   │   │
│   │   ├── about/page.tsx
│   │   ├── become-mentor/page.tsx
│   │   ├── careers/page.tsx
│   │   ├── confirmation/page.tsx         # Booking confirmation (reads ?id= from URL)
│   │   ├── contact/page.tsx
│   │   ├── curriculum/page.tsx
│   │   ├── login/page.tsx
│   │   ├── mentors/page.tsx
│   │   ├── register/page.tsx             # 4-step booking wizard
│   │   ├── reviews/page.tsx
│   │   ├── signup/page.tsx
│   │   ├── page.tsx                      # Home / Landing page
│   │   ├── layout.tsx
│   │   └── globals.css
│   │
│   ├── components/                       # Reusable React components
│   │   ├── AIProgramsSection.tsx
│   │   ├── ChooseYourCourse.tsx
│   │   ├── Educators.tsx
│   │   ├── FAQ.tsx
│   │   ├── Footer.tsx
│   │   ├── HeroSection.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── LogoTicker.tsx
│   │   ├── Navbar.tsx
│   │   ├── ScrollProgressBar.tsx
│   │   ├── SkillsForSuccess.tsx
│   │   ├── StatsRow.tsx
│   │   ├── StudentSpotlight.tsx
│   │   ├── TopPicks.tsx
│   │   └── WhyChoose.tsx
│   │
│   ├── lib/
│   │   ├── env.ts            # ★ NEW — validates all 11 required env vars at startup
│   │   ├── dynamodb.ts       # ★ UPDATED — DynamoDB client + table name exports
│   │   ├── cognito.ts        # ★ UPDATED — Cognito sign up / sign in helpers
│   │   ├── auth.ts           # ★ UPDATED — session cookie (HMAC-SHA256)
│   │   ├── email.ts          # ★ NEW — AWS SES email functions
│   │   ├── rate-limit.ts     # ★ NEW — DynamoDB TTL rate limiter
│   │   ├── validators.ts     # Zod schemas for all API inputs
│   │   └── api-response.ts   # ok() / fail() / validationFail() helpers
│   │
│   └── middleware-helpers/
│       └── safe-handler.ts   # Wraps handlers in try/catch, returns 500 on throw
│
├── src/middleware.ts          # ★ NEW — payload size, content-type, security headers
│
├── public/
│   ├── robots.txt             # ★ NEW — disallows /api/ and /confirmation from crawlers
│   ├── images/
│   └── media/
│
├── .env.local                 # Local secrets (gitignored)
├── .env.local.example         # ★ NEW — safe-to-commit template for all 11 vars
├── next.config.ts             # ★ UPDATED — CSP + security headers via headers()
├── DEPLOYMENT.md              # ★ NEW — AWS setup checklist + pre-launch test list
├── ARCHITECTURE.md            # ★ NEW — schemas, rate limit rules, data flows
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
AUTH_SESSION_SECRET=838c111179138ebef6610d6822b2cf3533ef14b146c1bec621ac27fee992619f

# Google Apps Script webhook URL (bookings → Google Sheet)
GAS_WEBHOOK_URL=https://script.google.com/macros/s/AKfycbyKPtz_UBvC-_Xw9SiUvxJIXQMyblihzVCiZ6OatI1Q087Dq6vvLkFDP8pmnesFE7CP/exec
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

> **v1.0 used a flat `data/users.json` file. v2.0 is fully on AWS DynamoDB.**

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
| `grade` | String | e.g. `"Grade 7"` |
| `course` | String | e.g. `"AI Builders (Grades 7-8)"` |
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
  "grade": "Grade 7",
  "course": "AI Builders (Grades 7-8)",
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
| Dependency CVEs | 0 vulnerabilities (`npm audit` — Next.js upgraded to 16.2.1) |

---

## 9. Frontend Pages

### Home — `/`
**File:** `src/app/page.tsx`

Landing page — assembles all home-page section components:
`<HeroSection />` → `<LogoTicker />` → `<StatsRow />` → `<AIProgramsSection />` → `<TopPicks />` → `<HowItWorks />` → `<WhyChoose />` → `<SkillsForSuccess />` → `<Educators />` → `<StudentSpotlight />` → `<FAQ />`

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

4-step multi-page wizard for booking a free demo class:

| Step | Fields |
|---|---|
| **Step 1 — Parent Details** | Parent/Guardian Name, Phone Number, Email |
| **Step 2 — Student Details** | Child's Name, Grade |
| **Step 3 — Course Selection** | AI Explorers / Builders / Innovators |
| **Step 4 — Schedule** | Pick a date + time slot (4 PM, 5 PM, 6 PM, 7 PM) |

- Form data held in React state between steps
- On final submit: `POST /api/register` → receives `{ bookingId }` → navigates to `/confirmation?id=${bookingId}`

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

> **v2.0 change:** Previously read from `sessionStorage`. Now fetches live from DynamoDB via the bookingId — works even if user shares the link or refreshes.

---

### About — `/about`
Company info — mission, values, key stats, team section.

### Contact — `/contact`
Contact form + email, phone, office location, "Book Free Demo" CTA.

### Curriculum — `/curriculum`
Program breakdown — topics, tools, projects, learning outcomes for all three tiers.

### Mentors — `/mentors`
Mentor profiles — background, expertise, teaching philosophy.

### Become a Mentor — `/become-mentor`
Application page for industry professionals.

### Reviews — `/reviews`
Student and parent testimonials, success stories, project showcases.

### Careers — `/careers`
Open positions and application instructions.

---

## 10. Components

### `Navbar.tsx` (~387 lines)
Sticky top navigation bar.
- Dropdown menus: Programs, AI Mentors, About AKMIND
- Auth state: polls `GET /api/auth/me` on mount → shows Login/Signup OR logged-in user dropdown
- Profile dropdown: user name, email, Logout button
- Mobile hamburger menu

### `HeroSection.tsx` (~215 lines)
- Animated typewriter headline cycling through 4 phrases
- Gradient animated text (8s colour cycle)
- Auto-rotating image slideshow (4 slides, 3s interval)
- Magnetic CTA button — cursor attraction effect on hover
- Background: dot-grid pattern with gradient overlay

### `AIProgramsSection.tsx` (~150 lines)
- 3D tilt effect on mouse hover (`perspective(800px) rotateX rotateY`)
- Gradient borders, badge labels, per-card CTAs

### `FAQ.tsx` (~145 lines)
Accordion FAQ with 3 tabs — AI Curriculum, Mentorship, Class Experience.

### `Footer.tsx`
4-column footer — brand, programs, company links, contact info, social links (Instagram, LinkedIn, YouTube).

### `LogoTicker.tsx`
Horizontally scrolling tech logo ticker — Python, TensorFlow, OpenCV, etc. 30s infinite loop.

### `ScrollProgressBar.tsx`
Thin progress bar fixed at top — grows 0→100% as user scrolls.

*(Other components: `TopPicks`, `HowItWorks`, `WhyChoose`, `SkillsForSuccess`, `Educators`, `StudentSpotlight`, `StatsRow`, `ChooseYourCourse`)*

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
  "grade": "Grade 7",
  "course": "AI Builders (Grades 7-8)",
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
  "grade": "Grade 7",
  "course": "AI Builders (Grades 7-8)",
  "date": "2025-04-10",
  "time": "4:00 PM",
  "email": "priya@example.com"
}
```

**Errors:** `400` invalid ID | `404` not found | `429` rate limited

---

## 12. Demo Booking Flow

End-to-end walkthrough:

```
1. Parent visits /register
   ├── Step 1: Parent name, phone, email
   ├── Step 2: Child name, grade
   ├── Step 3: Select course
   └── Step 4: Pick date + time → click "Confirm Booking"
                │
                ▼
2. POST /api/register (JSON)
   │
   ├── Rate limit: 3/hour per IP
   ├── Zod validation of all 8 fields
   ├── DynamoDB PutCommand → bookings table → get bookingId
   ├── fetch(GAS_WEBHOOK_URL) → Google Sheet [non-blocking]
   ├── SES: admin notification → admin@akmind.com
   └── SES: parent confirmation → priya@example.com
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
- **Subject:** `"Welcome to AKMIND! Your AI Journey Begins"`
- **Content:** Welcome message, "Book Free Demo Class" CTA button linking to `/register`
- **Sent as:** Fire-and-forget (doesn't block the response)

```typescript
export async function sendWelcomeEmail(to: string, name: string) {
  await sendEmail(to, "Welcome to AKMIND! Your AI Journey Begins", `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
      <div style="background:#4F46E5;padding:32px;text-align:center">
        <h1 style="color:#fff;margin:0;font-size:28px">Welcome to AKMIND</h1>
        <p style="color:#C7D2FE;margin:8px 0 0;font-size:16px">Dream. Discover. Shine.</p>
      </div>
      <div style="padding:32px;background:#fff">
        <p>Hi ${name},</p>
        <p>Welcome to AKMIND — India's most exciting AI education program...</p>
        <a href="https://www.akmind.com/register"
           style="background:#4F46E5;color:#fff;padding:14px 32px;border-radius:8px;...">
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
- **Subject:** `"New Demo Booking — Aarav Sharma (Grade 7)"`
- **Content:** HTML table with all 8 booking fields

---

### Parent Booking Confirmation
- **Trigger:** Successful `POST /api/register`
- **To:** Parent's email from the booking form
- **Subject:** `"Your Demo Class is Booked! — AKMIND"`
- **Content:** Booking summary card (student, course, date, time), mentor call instructions

All three email functions return `{ success: boolean }` and catch errors internally — a failed email never blocks the API response or throws.

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
| Background | White / Slate-50 | `slate-50` |
| Dark Background | Slate-900 | `slate-900` |
| Text Primary | Slate-900 | `slate-900` |
| Text Muted | Slate-500 | `slate-500` |
| Success | Emerald | `emerald-500` |
| Error | Red | `red-600` |

### Animations (Framer Motion)

| Animation | Component | Details |
|---|---|---|
| Typewriter effect | HeroSection | Cycles through 4 phrases |
| Gradient text shimmer | HeroSection | 8-second infinite cycle |
| Image slideshow | HeroSection | Auto-advances every 3s |
| Magnetic button | HeroSection | Mouse attraction on hover |
| 3D tilt cards | AIProgramsSection | `perspective(800px)` on hover |
| Logo ticker scroll | LogoTicker | 30s infinite loop |
| Scroll progress bar | ScrollProgressBar | Tracks `window.scrollY` |
| FAQ accordion | FAQ | Spring physics expand/collapse |
| Booking wizard steps | register/page.tsx | Slide in/out with AnimatePresence |

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
Navbar mounts
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
    → Zod validate: 8 fields
    → DynamoDB PutCommand → bookings table → bookingId
    → fetch(GAS_WEBHOOK_URL) [non-blocking]
    → SES: sendAdminBookingNotification → admin@akmind.com
    → SES: sendParentBookingConfirmation → parent email
    → 200 { success: true, bookingId }
  → Client: /confirmation?id=<bookingId>
    → GET /api/booking/<bookingId>
      → Rate limit: 60/min per IP
      → DynamoDB GetCommand → bookings table
      → 200 { id, childName, grade, course, date, time, email }
    → Display booking confirmation card
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

| Commit | Description |
|---|---|
| `f504f68` | **feat: security hardening — rate limiting, SES email, env validation, build fixes** |
| `d9299b7` | feat: add Zod validation and safeHandler to all API routes |
| `4035f79` | feat: migrate auth to AWS Cognito + DynamoDB, replace JSON file DB |
| `f4a7cb0` | docs: add PROJECT_Readme.md and update about page year to 2026 |
| `54287de` | feat: add new pages, navbar updates, and start_all.cmd setup script |
| `05cfd74` | feat: futuristic UI enhancements |

### What changed in v2.0 (commit `f504f68`)

| Area | v1.0 | v2.0 |
|---|---|---|
| Database | `data/users.json` flat file | AWS DynamoDB (3 tables) |
| Email | nodemailer + Gmail SMTP | AWS SES — HTML templates |
| Rate limiting | None | DynamoDB TTL (per-route, per-IP) |
| Env validation | None | `env.ts` — fails fast on missing vars |
| Security headers | None | CSP, HSTS, X-Frame-Options, Referrer-Policy via middleware + next.config |
| Error handling | Raw errors potentially exposed | `safeHandler` — generic 500, server-side log only |
| Input validation | Basic manual checks | Zod schemas on every route |
| Booking confirmation | Read from `sessionStorage` | Fetch from DynamoDB via `bookingId` |
| Hardcoded secrets | `AUTH_SESSION_SECRET` had a default fallback | No fallbacks — throws if missing |
| GAS URL | Hardcoded in source | Moved to `GAS_WEBHOOK_URL` env var |
| Next.js | 16.1.6 (5 CVEs) | 16.2.1 (0 vulnerabilities) |
| npm audit | 4 vulnerabilities | 0 vulnerabilities |

---

*AKMIND v2.0 — Built with Next.js, TypeScript, Tailwind CSS, Framer Motion, and AWS.*
*© 2026 AKonnAI AI. All rights reserved.*
