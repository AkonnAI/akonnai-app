# AKMIND — Architecture Reference

## Tech Stack

| Package | Version | Purpose |
|---|---|---|
| `next` | ^16.2.1 | App framework (App Router, server components) |
| `react` | 19.2.3 | UI library |
| `typescript` | ^5 | Static typing |
| `@aws-sdk/client-dynamodb` | ^3.1013.0 | DynamoDB low-level client |
| `@aws-sdk/lib-dynamodb` | ^3.1013.0 | DynamoDB document client (marshalling) |
| `@aws-sdk/client-ses` | ^3.1013.0 | SES email sending |
| `@aws-sdk/client-cognito-identity-provider` | ^3.1013.0 | Cognito auth (sign up / sign in) |
| `zod` | ^4.3.6 | Request body validation schemas |
| `bcryptjs` | ^2.4.3 | Password hashing (DynamoDB-based auth) |
| `framer-motion` | ^12.34.0 | Page and component animations |
| `lucide-react` | ^0.564.0 | Icon library |
| `tailwindcss` | ^4 | Utility-first CSS |

---

## File Map

### New files added

| File | Description |
|---|---|
| `src/lib/env.ts` | Validates all 11 required env vars at startup; exports typed `env` object; skips validation during Next.js build phase |
| `src/lib/rate-limit.ts` | DynamoDB TTL-based rate limiter with `checkRateLimit`, `getIP`, and `LIMITS` config |
| `src/lib/email.ts` | AWS SES email functions: `sendWelcomeEmail`, `sendAdminBookingNotification`, `sendParentBookingConfirmation` |
| `src/middleware.ts` | Next.js proxy: payload size check (10 KB), POST content-type enforcement, security headers on all routes |
| `public/robots.txt` | Disallows crawlers from `/api/` and `/confirmation`; declares sitemap URL |
| `.env.local.example` | Safe-to-commit template listing all 11 required env vars with descriptions |
| `DEPLOYMENT.md` | Step-by-step AWS setup + pre-launch test checklist |
| `ARCHITECTURE.md` | This file |

### Modified files

| File | Change summary |
|---|---|
| `src/lib/dynamodb.ts` | Switched all `process.env.*` to `env.*`; added `RATE_LIMIT_TABLE` export |
| `src/lib/cognito.ts` | Switched all `process.env.*` to `env.*` |
| `src/lib/auth.ts` | Removed insecure `|| "development-secret-change-me"` fallback; uses `env.sessionSecret` |
| `src/app/api/auth/login/route.ts` | Added auth rate limit (5 req / 15 min per IP) |
| `src/app/api/auth/register/route.ts` | Added auth rate limit; replaced nodemailer with `sendWelcomeEmail` (SES) |
| `src/app/api/auth/me/route.ts` | Added general rate limit (60 req / 60 sec per IP) |
| `src/app/api/register/route.ts` | Added booking rate limit; replaced nodemailer with SES emails; replaced hardcoded GAS URL with `env.gasWebhookUrl` |
| `src/app/api/booking/[bookingId]/route.ts` | Added general rate limit |
| `next.config.ts` | Added `headers()` with CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy |

---

## DynamoDB Table Schemas

### `akmind-users`
| Attribute | Type | Notes |
|---|---|---|
| `id` | String (PK) | `${Date.now()}-${random}` |
| `email` | String | Lowercased; GSI partition key (`email-index`) |
| `name` | String | Trimmed display name |
| `passwordHash` | String | bcrypt hash (never returned to client) |
| `createdAt` | String | ISO 8601 timestamp |

GSI: `email-index` — partition key: `email`

### `akmind-bookings`
| Attribute | Type | Notes |
|---|---|---|
| `id` | String (PK) | `crypto.randomUUID()` |
| `parentName` | String | |
| `phone` | String | |
| `email` | String | Parent email |
| `childName` | String | |
| `grade` | String | e.g. "Grade 6" |
| `course` | String | Selected program |
| `date` | String | Selected demo date |
| `time` | String | Selected demo time slot |
| `createdAt` | String | ISO 8601 timestamp |

### `akmind-rate-limits`
| Attribute | Type | Notes |
|---|---|---|
| `pk` | String (PK) | Format: `rl#<type>:<ip>` e.g. `rl#auth:1.2.3.4` |
| `count` | Number | Incremented atomically on each request |
| `ttl` | Number | Unix epoch seconds — DynamoDB TTL auto-deletes after window expires |

---

## Rate Limiting Rules

| Route | Key pattern | Limit | Window | On exceed |
|---|---|---|---|---|
| `POST /api/auth/login` | `auth:<ip>` | 5 requests | 15 minutes | 429 — "Too many attempts. Try again in 15 minutes." |
| `POST /api/auth/register` | `auth:<ip>` | 5 requests | 15 minutes | 429 — "Too many attempts. Try again in 15 minutes." |
| `POST /api/register` | `booking:<ip>` | 3 requests | 1 hour | 429 — "Too many booking attempts. Try again in 1 hour." |
| `GET /api/auth/me` | `general:<ip>` | 60 requests | 60 seconds | 429 |
| `GET /api/booking/[bookingId]` | `general:<ip>` | 60 requests | 60 seconds | 429 |

Rate limit counters fail open — if DynamoDB is unreachable, the request is allowed through.

---

## Data Flows

### Sign Up
```
Client POST /api/auth/register
  → rate limit check (auth, 5/15min)
  → Zod validate (name, email, password)
  → bcrypt.hash(password, 10)
  → DynamoDB PutCommand → akmind-users table
  → createSessionCookiePayload (HMAC-SHA256)
  → SES sendWelcomeEmail (fire-and-forget)
  → Set cookie + return { user: { id, email, name } }
```

### Login
```
Client POST /api/auth/login
  → rate limit check (auth, 5/15min)
  → Zod validate (email, password)
  → DynamoDB QueryCommand (email-index GSI) → akmind-users
  → bcrypt.compare(password, hash)
  → createSessionCookiePayload (HMAC-SHA256)
  → Set cookie + return { user: { id, email, name } }
```

### Demo Booking
```
Client POST /api/register
  → rate limit check (booking, 3/hour)
  → Zod validate (parentName, phone, email, childName, grade, course, date, time)
  → DynamoDB PutCommand → akmind-bookings table
  → fetch(GAS_WEBHOOK_URL) [non-blocking — Google Sheets sync]
  → SES sendAdminBookingNotification → admin@akmind.com
  → SES sendParentBookingConfirmation → parent email
  → return { bookingId }
  → Client navigates to /confirmation?id=${bookingId}
  → Confirmation page fetches GET /api/booking/${bookingId}
  → DynamoDB GetCommand → returns { id, childName, grade, course, date, time, email }
  → Confirmation page renders booking details
```
