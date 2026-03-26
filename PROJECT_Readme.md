# AKMIND v1.0 — The Complete Project Bible

> This document is the single source of truth for the AKMIND platform. It covers every file, every function, every connection, and every line of logic in the codebase. Treat this as your bible when working on the project.

---

## TABLE OF CONTENTS

1. [What Is AKMIND?](#1-what-is-akmind)
2. [Technology Stack](#2-technology-stack)
3. [Repository Structure](#3-repository-structure)
4. [Environment Variables](#4-environment-variables)
5. [Database Schemas (DynamoDB)](#5-database-schemas-dynamodb)
6. [API Routes — Word for Word](#6-api-routes--word-for-word)
7. [Library / Utility Code — Word for Word](#7-library--utility-code--word-for-word)
8. [Pages — Word for Word](#8-pages--word-for-word)
9. [Components — Word for Word](#9-components--word-for-word)
10. [Authentication & Sessions](#10-authentication--sessions)
11. [Rate Limiting](#11-rate-limiting)
12. [Email Service (Gmail / Nodemailer)](#12-email-service-gmail--nodemailer)
13. [External Integrations](#13-external-integrations)
14. [Security Layers](#14-security-layers)
15. [Frontend-to-Backend Data Flow](#15-frontend-to-backend-data-flow)
16. [Validation Schemas (Zod)](#16-validation-schemas-zod)
17. [Pricing System](#17-pricing-system)
18. [Deployment & Infrastructure](#18-deployment--infrastructure)
19. [Key Mentor Profiles](#19-key-mentor-profiles)
20. [Open Job Roles](#20-open-job-roles)

---

## 1. WHAT IS AKMIND?

AKMIND is a **full-stack AI education platform** built for students aged roughly 8–18. It allows parents and children to:

- Browse three AI learning programs (AI Explorers, AI Builders, AI Innovators)
- Book a free demo class via a 4-step wizard
- Create a user account (sign up / log in)
- View mentor profiles, curriculum, and pricing
- Apply for jobs at AKMIND
- Contact the team
- Access a separate demo app (hosted at `demo.akmind.com`) with token-based access

The platform is based in **Bangalore, India** and serves students globally. The live domain is **www.akmind.com**.

The stack is entirely TypeScript: **Next.js 16 (App Router)** on the frontend and serverless API routes as the backend, connected to **AWS DynamoDB** (database), **Gmail/Nodemailer** (email), and **Google Sheets** (booking log). Deployed on **AWS Amplify**.

---

## 2. TECHNOLOGY STACK

### Core Framework
| Library | Version | Role |
|---------|---------|------|
| Next.js | 16.2.1 | Full-stack framework (App Router, RSC, API routes) |
| React | 19.2.3 | UI rendering |
| TypeScript | 5.x | Static typing across all files |

### UI & Styling
| Library | Version | Role |
|---------|---------|------|
| Tailwind CSS | 4.x | Utility-first styling |
| Framer Motion | 12.34.0 | Page transitions, scroll animations, hero effects |
| Lucide React | 0.564.0 | SVG icon library |
| clsx | 2.1.1 | Conditional className utility |
| tailwind-merge | 3.4.1 | Safe Tailwind class merging |

### AWS Services
| Service | Purpose |
|---------|---------|
| DynamoDB | Primary database (users, bookings, rate limits) |
| Cognito | Imported, available but NOT actively used — custom session auth is used instead |
| Amplify | Hosting & CI/CD (connected to GitHub, auto-deploys on push to `master`) |

> **Note:** AWS SES is NOT used in production. All emails are sent via Gmail SMTP using Nodemailer.

### AWS SDK Packages
- `@aws-sdk/client-dynamodb` — Low-level DynamoDB client
- `@aws-sdk/lib-dynamodb` — Document client (auto marshalling JS ↔ DynamoDB types)
- `@aws-sdk/client-ses` — Imported but not used in production
- `@aws-sdk/client-cognito-identity-provider` — Cognito (imported, not used in production)

### Email
| Library | Role |
|---------|------|
| nodemailer | Gmail SMTP email sending for all transactional emails |

### Security & Validation
| Library | Role |
|---------|------|
| bcryptjs | Password hashing (10 salt rounds) |
| crypto (Node built-in) | HMAC-SHA256 session signing |
| Zod 4.3.6 | Request body validation schemas |

### Dev Tools
- ESLint 9 — Code linting
- Node.js runtime — API routes via AWS Amplify SSR

---

## 3. REPOSITORY STRUCTURE

```
akmind-v1.0-master/
│
├── src/
│   ├── app/                          # Next.js App Router root
│   │   ├── layout.tsx                # Root HTML shell, metadata, fonts
│   │   ├── page.tsx                  # Homepage (/)
│   │   │
│   │   ├── api/                      # All backend API route handlers
│   │   │   ├── auth/
│   │   │   │   ├── register/route.ts # POST — Create user account
│   │   │   │   ├── login/route.ts    # POST — Log in user
│   │   │   │   ├── logout/route.ts   # POST — Clear session cookie
│   │   │   │   └── me/route.ts       # GET  — Who is the current user?
│   │   │   ├── register/
│   │   │   │   └── route.ts          # POST — Book a demo class
│   │   │   ├── booking/
│   │   │   │   └── [bookingId]/
│   │   │   │       └── route.ts      # GET  — Fetch booking by ID
│   │   │   ├── demo/
│   │   │   │   └── check/route.ts    # GET  — Proxy: check demo usage by email
│   │   │   └── careers/
│   │   │       └── route.ts          # POST — Submit job application
│   │   │
│   │   ├── about/page.tsx            # /about — Company info page
│   │   ├── become-mentor/page.tsx    # /become-mentor — Mentor application
│   │   ├── careers/page.tsx          # /careers — Jobs + application form
│   │   ├── confirmation/page.tsx     # /confirmation — Post-booking receipt
│   │   ├── contact/page.tsx          # /contact — Contact form
│   │   ├── curriculum/page.tsx       # /curriculum — Programs + pricing
│   │   ├── login/page.tsx            # /login — Login form
│   │   ├── mentors/page.tsx          # /mentors — Meet the mentors
│   │   ├── privacy-policy/page.tsx   # /privacy-policy — Legal
│   │   ├── register/page.tsx         # /register — 4-step booking wizard
│   │   ├── reviews/page.tsx          # /reviews — Student testimonials
│   │   ├── signup/page.tsx           # /signup — Create account form
│   │   └── terms-and-conditions/page.tsx  # Legal
│   │
│   ├── components/                   # 22 reusable React components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── HeroSection.tsx
│   │   ├── AIProgramsSection.tsx
│   │   ├── WhyChoose.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── HowAKMINDWorks.tsx
│   │   ├── GamificationShowcase.tsx
│   │   ├── AIBotCinematic.tsx
│   │   ├── Educators.tsx
│   │   ├── StudentSpotlight.tsx
│   │   ├── SkillsForSuccess.tsx
│   │   ├── FAQ.tsx
│   │   ├── TopPicks.tsx
│   │   ├── LogoTicker.tsx
│   │   ├── StatsRow.tsx
│   │   ├── ScrollReveal.tsx
│   │   ├── ScrollProgressBar.tsx
│   │   ├── FloatingCTA.tsx
│   │   ├── PhoneInput.tsx
│   │   ├── ParentalGuidelines.tsx
│   │   └── ChooseYourCourse.tsx
│   │
│   ├── lib/                          # Backend utilities and services
│   │   ├── env.ts                    # Env var validation at startup
│   │   ├── dynamodb.ts               # DynamoDB client singleton
│   │   ├── auth.ts                   # User auth + session logic
│   │   ├── cognito.ts                # Cognito helpers (not used in prod)
│   │   ├── email.ts                  # Gmail email templates via nodemailer
│   │   ├── rate-limit.ts             # DynamoDB-backed rate limiter
│   │   ├── validators.ts             # Zod validation schemas
│   │   ├── api-response.ts           # Standard JSON response wrappers
│   │   ├── pricing.ts                # Country-based pricing (default: India)
│   │   ├── demo-token.ts             # Demo token creation helper
│   │   └── read-api-response.ts      # Safe JSON parsing for fetch responses
│   │
│   ├── middleware-helpers/
│   │   └── safe-handler.ts           # Error-catching wrapper for API routes
│   │
│   └── middleware.ts                 # Next.js middleware (payload size, content-type, security headers)
│
├── public/
│   ├── images/
│   │   ├── mentors/                  # Mentor profile photos
│   │   ├── slide1.png – slide4.png   # Hero section carousel images
│   │   └── og-image.png              # Open Graph social preview image
│   ├── media/                        # Video/media assets
│   ├── robots.txt
│   └── sitemap.xml
│
├── Images & Videos/                  # Mentor photos (Akhil.jpeg, Jebian.jpeg, Nagaraj.jpeg)
│
├── .env.local                        # Local environment variables (NOT committed to git)
├── next.config.ts                    # Security headers, image domains
├── tsconfig.json                     # TypeScript strict config
├── postcss.config.mjs                # PostCSS/Tailwind v4 config
├── eslint.config.mjs                 # ESLint config
├── package.json                      # All dependencies & scripts
├── sync.cmd                          # Windows sync helper script
└── PROJECT_Readme.md                 # This file
```

---

## 4. ENVIRONMENT VARIABLES

File: `.env.local` (never committed to git). Must be created manually on each environment.

Validated at runtime in `src/lib/env.ts`. If any **required** variable is missing, the server throws an error on the first API call. Validation is **skipped during `next build`** (checked via `NEXT_PHASE === "phase-production-build"`).

### Required Variables (app will crash without these)

| Variable | Value (example) | Purpose |
|----------|-----------------|---------|
| `AWS_REGION` | `ap-south-1` | AWS region for all SDK calls |
| `DYNAMODB_USERS_TABLE` | `users` | DynamoDB table name for user accounts |
| `DYNAMODB_BOOKINGS_TABLE` | `bookings` | DynamoDB table name for demo bookings |
| `COGNITO_USER_POOL_ID` | `ap-south-1_NWlfYqpfw` | Cognito pool (required by env.ts, not actively used) |
| `COGNITO_CLIENT_ID` | `4es6i1i70nh367uhp8u4s8boiv` | Cognito client (required by env.ts, not actively used) |
| `AUTH_SESSION_SECRET` | 64-char hex string | HMAC-SHA256 key for signing session cookies. Must be ≥32 chars. |

### Optional Variables (features degrade gracefully without these)

| Variable | Purpose |
|----------|---------|
| `AWS_ACCESS_KEY_ID` | Static IAM key. **Not needed on Amplify** — Amplify injects its own via IAM role. |
| `AWS_SECRET_ACCESS_KEY` | Static IAM secret. **Not needed on Amplify** — auto-injected via IAM role. |
| `GMAIL_USER` | Gmail address for sending all emails (e.g. `noreply.akmind@gmail.com`) |
| `GMAIL_APP_PASSWORD` | Gmail App Password (16-char, spaces allowed). Required for emails to work. |
| `SES_FROM_EMAIL` | Sender label email (used as display name fallback) |
| `SES_ADMIN_EMAIL` | Admin email for booking/career notifications. Falls back to `GMAIL_USER`. |
| `GAS_WEBHOOK_URL` | Google Apps Script URL to sync bookings to Google Sheets |
| `NEXT_PUBLIC_APP_URL` | Public URL of this app (used in email links, e.g. `https://akmind.com`) |
| `NEXT_PUBLIC_DEMO_APP_URL` | Public URL of the demo app (browser-side, e.g. `http://demo.akmind.com`) |
| `DEMO_APP_URL` | Server-side URL of the demo app (e.g. `http://demo.akmind.com`) |

### Amplify-Specific Notes

> **IMPORTANT for AWS Amplify deployment:**
> - `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` are **reserved variables** in Amplify. Do NOT set them manually. Amplify auto-injects temporary credentials from its IAM service role.
> - The Amplify service role **must have DynamoDB permissions** (`dynamodb:PutItem`, `dynamodb:GetItem`, `dynamodb:UpdateItem`, `dynamodb:Query`, `dynamodb:Scan`) on tables: `users`, `bookings`, `akmind-rate-limits`.
> - All other variables must be added manually in: **Amplify Console → App → Hosting → Environment variables**.
> - After saving env vars, **trigger a new deployment** — they only take effect after a redeploy.

Generate `AUTH_SESSION_SECRET`:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 5. DATABASE SCHEMAS (DynamoDB)

All tables are in AWS DynamoDB (`ap-south-1`) with on-demand (pay-per-request) billing.

---

### Table: `users`
Stores user accounts created via `/signup`.

| Attribute | Type | Key | Description |
|-----------|------|-----|-------------|
| `id` | String | Partition Key | Format: `${Date.now()}-${Math.random().toString(36).slice(2)}` |
| `email` | String | GSI | Lowercased email address. Used for login lookups. |
| `name` | String | — | Display name of parent/user |
| `passwordHash` | String | — | bcryptjs hash, 10 salt rounds. Never returned to client. |
| `createdAt` | String | — | ISO 8601 timestamp |

**Global Secondary Index:** `email-index`
- Partition key: `email`
- Used by `verifyUser()` to query by email during login

---

### Table: `bookings`
Stores every demo class booking submitted via `/register`.

| Attribute | Type | Key | Description |
|-----------|------|-----|-------------|
| `id` | String | Partition Key | `crypto.randomUUID()` |
| `parentName` | String | — | Parent/guardian's full name |
| `phone` | String | — | Phone number (e.g. `+91 9876543210`) |
| `email` | String | — | Parent's email address |
| `childName` | String | — | Student's name |
| `grade` | String | — | Optional. `"Grade 1"` through `"Grade 12"` or `""` |
| `course` | String | — | `"AI Explorers"` or `"AI Builders"` or `"AI Innovators"` |
| `date` | String | — | ISO date string `YYYY-MM-DD` |
| `time` | String | — | Time slot string, e.g. `"4:00 PM"` |
| `createdAt` | String | — | ISO 8601 timestamp |

---

### Table: `akmind-rate-limits`
Auto-managed by `src/lib/rate-limit.ts`. Uses DynamoDB TTL to automatically expire old records.

| Attribute | Type | Key | Description |
|-----------|------|-----|-------------|
| `pk` | String | Partition Key | Format: `rl#<type>:<ip>` e.g. `rl#booking:192.168.1.1` |
| `count` | Number | — | Incremented atomically on each request |
| `ttl` | Number | — | Unix epoch seconds. DynamoDB auto-deletes when expired. |

Table name is hardcoded as `"akmind-rate-limits"` in `src/lib/dynamodb.ts`.

> **Must enable TTL on this table** in DynamoDB console: Settings → TTL attribute → `ttl`

---

## 6. API ROUTES — WORD FOR WORD

### 6.1 `POST /api/auth/register` — Create User Account
File: `src/app/api/auth/register/route.ts`

**What it does:** Creates a new user account. Validates the request body with Zod, checks the email is not already taken, hashes the password with bcrypt, saves the user to DynamoDB, creates a signed session cookie, fires a welcome email (non-blocking), and returns the user object.

**Rate limit:** 5 requests per 15 minutes per IP (type: `auth`)

**Request body:**
```json
{
  "name": "Priya Sharma",
  "email": "priya@example.com",
  "password": "securepassword123"
}
```

**Validation rules (Zod):**
- `name`: string, min 2 chars, max 80 chars, trimmed
- `email`: valid email format, lowercased, trimmed
- `password`: string, min 6 chars, max 128 chars

**Success response (201 Created):**
```json
{
  "success": true,
  "user": {
    "id": "1714000000000-abc123",
    "email": "priya@example.com",
    "name": "Priya Sharma"
  }
}
```
Also sets cookie: `akmind_session` (7 days, `sameSite: lax`, `secure: true` in production, `httpOnly: false`)

**Error responses:**
- `409 Conflict` — `{ "error": "Email already registered" }`
- `422 Unprocessable Entity` — Zod validation failed
- `429 Too Many Requests` — Rate limit exceeded
- `500 Internal Server Error` — Unexpected failure

---

### 6.2 `POST /api/auth/login` — Log In
File: `src/app/api/auth/login/route.ts`

**What it does:** Receives email + password, queries DynamoDB for user by email (using `email-index` GSI), runs `bcrypt.compare` against the stored hash, creates a signed session cookie if valid, returns the user object.

**Rate limit:** 5 requests per 15 minutes per IP (type: `auth`)

**Request body:**
```json
{
  "email": "priya@example.com",
  "password": "securepassword123"
}
```

**Success response (200 OK):**
```json
{
  "success": true,
  "user": {
    "id": "1714000000000-abc123",
    "email": "priya@example.com",
    "name": "Priya Sharma"
  }
}
```
Also sets: `akmind_session` cookie

**Error responses:**
- `401 Unauthorized` — `{ "error": "Invalid email or password" }`
- `422 Unprocessable Entity` — Validation failed
- `429 Too Many Requests` — Rate limit exceeded

---

### 6.3 `POST /api/auth/logout` — Log Out
File: `src/app/api/auth/logout/route.ts`

**What it does:** Deletes the session cookie by setting it to expire immediately (`maxAge: 0`).

**No request body needed.**

**Success response (200 OK):**
```json
{ "success": true }
```
Sets cookie: `akmind_session` with `maxAge: 0` (effectively deleted)

---

### 6.4 `GET /api/auth/me` — Get Current User
File: `src/app/api/auth/me/route.ts`

**What it does:** Reads the `akmind_session` cookie, parses and verifies the HMAC signature, returns user info if valid.

**Rate limit:** 60 requests per 60 seconds per IP (type: `general`)

**Success response if authenticated (200 OK):**
```json
{
  "authenticated": true,
  "user": {
    "id": "1714000000000-abc123",
    "email": "priya@example.com",
    "name": "Priya Sharma"
  }
}
```

**Success response if NOT authenticated (200 OK):**
```json
{ "authenticated": false }
```

---

### 6.5 `POST /api/register` — Book Demo Class
File: `src/app/api/register/route.ts`

**What it does:** Accepts a completed 4-step booking form. Validates all fields, generates a UUID, stores the booking in DynamoDB, fires a non-blocking POST to Google Sheets, attempts to register with the demo app to get a demo token (non-blocking), sends two emails (admin notification + parent confirmation with demo link), and returns the booking ID.

**Rate limit:** 3 requests per 1 hour per IP (type: `booking`)

**Request body:**
```json
{
  "parentName": "Ravi Kumar",
  "phone": "+91 9876543210",
  "email": "ravi@example.com",
  "childName": "Arjun Kumar",
  "grade": "Grade 5",
  "course": "AI Explorers",
  "date": "2026-04-10",
  "time": "4:00 PM"
}
```

**Validation rules (Zod `demoBookingSchema`):**
- `parentName`: string, min 2, max 80, trimmed
- `phone`: string, min 7, max 20, trimmed
- `email`: valid email, lowercased, trimmed
- `childName`: string, min 2, max 60, trimmed
- `grade`: optional string
- `course`: one of `"AI Explorers"` | `"AI Builders"` | `"AI Innovators"`
- `date`: matches regex `^\d{4}-\d{2}-\d{2}$`
- `time`: string, min 1, max 30, trimmed

**Process flow:**
1. Check rate limit (3/hour per IP)
2. Validate body with Zod
3. Generate `id = crypto.randomUUID()`
4. `PutCommand` to `bookings` table with all fields + `createdAt`
5. Forward to GAS — `fetch(GAS_WEBHOOK_URL, POST, body: JSON.stringify(data))` — **non-blocking**
6. Attempt to call demo app (`DEMO_APP_URL/api/demo/register`) to create a demo token — **non-blocking, failure is silently ignored**
7. `Promise.allSettled([sendAdminBookingNotification(...), sendParentBookingConfirmation(..., demoToken)])` — both emails sent in parallel
8. Return `{ bookingId, demoToken }`

**Success response (200 OK):**
```json
{
  "success": true,
  "bookingId": "550e8400-e29b-41d4-a716-446655440000",
  "demoToken": "abc123xyz"
}
```
`demoToken` may be `undefined` if the demo app is unreachable — booking still succeeds.

**Error responses:**
- `422 Unprocessable Entity` — Validation failed with field errors
- `429 Too Many Requests` — Rate limit exceeded
- `500 Internal Server Error` — DynamoDB write failure

---

### 6.6 `GET /api/booking/[bookingId]` — Fetch Booking
File: `src/app/api/booking/[bookingId]/route.ts`

**What it does:** Called by the `/confirmation` page after redirect. Fetches a specific booking by its UUID from DynamoDB and returns sanitized booking data.

**Rate limit:** 60 requests per 60 seconds per IP (type: `general`)

**URL parameter:** `bookingId` — UUID string

**Validation:** Rejects if `bookingId` is longer than 64 characters.

**Success response (200 OK):**
```json
{
  "success": true,
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "childName": "Arjun Kumar",
  "grade": "Grade 5",
  "course": "AI Explorers",
  "date": "2026-04-10",
  "time": "4:00 PM",
  "email": "ravi@example.com"
}
```

**Error responses:**
- `400 Bad Request` — `{ "error": "Invalid booking ID" }`
- `404 Not Found` — `{ "error": "Booking not found" }`
- `429 Too Many Requests` — Rate limit exceeded

---

### 6.7 `GET /api/demo/check` — Demo Usage Check (Proxy)
File: `src/app/api/demo/check/route.ts`

**What it does:** Proxies a request from the browser to the demo app to check if an email has already used their free demo. Exists to avoid CORS issues since the marketing site and demo app run on different origins.

**Query parameter:** `email` (required)

**Proxies to:** `NEXT_PUBLIC_DEMO_APP_URL/api/demo/check?email=<encoded_email>`

**Success response (200 OK):**
```json
{ "hasUsedDemo": false }
```
Returns `{ "hasUsedDemo": false }` by default if the demo app is unreachable.

**Error responses:**
- `400 Bad Request` — `{ "success": false, "error": "Email required" }` if no email provided

---

### 6.8 `POST /api/careers` — Submit Job Application
File: `src/app/api/careers/route.ts`

**What it does:** Accepts a career application form, validates all fields, sends an admin notification email and an applicant confirmation email.

**No rate limiting** on this route.

**Request body:**
```json
{
  "name": "Rahul Verma",
  "email": "rahul@example.com",
  "phone": "9876543210",
  "role": "AI Mentor",
  "linkedin": "https://linkedin.com/in/rahulverma",
  "portfolio": "https://github.com/rahulverma",
  "message": "I have 5 years of AI teaching experience...",
  "source": "LinkedIn"
}
```

**Required fields:** `name`, `email`, `phone`, `role`, `message`
**Optional fields:** `linkedin`, `portfolio`, `source`

**Validation logic (manual, not Zod):**
- Missing required fields → `400`: `"Missing required fields: <fields>"`
- Email regex test → `400`: `"Invalid email address."`
- Phone regex `/^[6-9]\d{9}$/` (10-digit Indian mobile) → `400`: `"Invalid phone number."`
- Role not in allowed list → `400`: `"Invalid role selected."`

**Valid roles:**
```
"AI Mentor"
"Curriculum Designer"
"Student Success Manager"
"Full Stack Developer"
"Other"
```

**Success response (200 OK):**
```json
{ "success": true }
```

---

## 7. LIBRARY / UTILITY CODE — WORD FOR WORD

### 7.1 `src/lib/env.ts` — Environment Variable Validation

Validates required env vars at module load time. Throws on missing or invalid values. Skips validation during `next build`.

**Required vars checked:** `AWS_REGION`, `DYNAMODB_USERS_TABLE`, `DYNAMODB_BOOKINGS_TABLE`, `COGNITO_USER_POOL_ID`, `COGNITO_CLIENT_ID`, `AUTH_SESSION_SECRET`

**Optional vars exported:** `awsAccessKeyId`, `awsSecretAccessKey`, `sesFrom`, `sesAdmin`, `gasWebhookUrl`

The `AUTH_SESSION_SECRET` must be ≥32 characters — throws if shorter.

---

### 7.2 `src/lib/dynamodb.ts` — DynamoDB Client

Creates a singleton `DynamoDBDocumentClient`. If `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` are both present (local dev), uses static credentials. Otherwise falls back to the default AWS credential chain (used automatically by Amplify's IAM role).

```typescript
export const USERS_TABLE = env.usersTable           // "users"
export const BOOKINGS_TABLE = env.bookingsTable     // "bookings"
export const RATE_LIMIT_TABLE = "akmind-rate-limits"
```

The Document Client uses `removeUndefinedValues: true` in marshallOptions so undefined fields are never written to DynamoDB.

---

### 7.3 `src/lib/auth.ts` — Authentication Logic

All user-related database operations and session token management.

#### `registerUser(name, email, password)`
1. Hash password: `bcrypt.hash(password, 10)`
2. Generate ID: `${Date.now()}-${Math.random().toString(36).slice(2)}`
3. Check existing user by email via `QueryCommand` on `email-index` GSI
4. Throw `"Email already registered"` if found
5. `PutCommand` to users table
6. Return `{ id, email, name, createdAt }`

#### `verifyUser(email, password)`
1. `QueryCommand` on `email-index` GSI for the email
2. If not found → throw `"Invalid email or password"`
3. `bcrypt.compare(password, user.passwordHash)` → throw if false
4. Return `{ id, email, name }` (passwordHash excluded)

#### `createSessionCookiePayload(user)`
1. Build JSON payload: `{ id, email, name }`
2. Compute HMAC: `crypto.createHmac('sha256', AUTH_SESSION_SECRET).update(payload).digest('hex')`
3. Return `{ name: "akmind_session", value: "<payload>.<hmac>" }`

#### `parseSessionCookie(cookieValue)`
1. Split on last `.` to get `[payload, hmac]`
2. Recompute HMAC and compare — return `null` if mismatch (tamper detection)
3. Return parsed user object

#### `clearSessionCookie()`
Returns a cookie config with `maxAge: 0` to delete the cookie.

---

### 7.4 `src/lib/email.ts` — Email Service (Gmail)

Uses **nodemailer** with Gmail SMTP (`service: 'gmail'`). Reads `GMAIL_USER` and `GMAIL_APP_PASSWORD` from env.

All emails are wrapped in a `try/catch` — failures are logged but never throw (email errors never crash a booking).

#### Functions exported:
| Function | Recipient | Trigger |
|----------|-----------|---------|
| `sendWelcomeEmail(email, name)` | New user | After `/api/auth/register` |
| `sendAdminBookingNotification(booking)` | `SES_ADMIN_EMAIL` or `GMAIL_USER` | After demo booking |
| `sendParentBookingConfirmation(email, booking, demoToken?)` | Parent | After demo booking |
| `sendCareerApplicationAdmin(app)` | `SES_ADMIN_EMAIL` or `GMAIL_USER` | After `/api/careers` |
| `sendCareerApplicationConfirmation(email, name, role)` | Applicant | After `/api/careers` |

The parent booking confirmation email includes a "Start Demo Lessons" button linking to `DEMO_APP_URL?token=<demoToken>` if a demo token was successfully created.

---

### 7.5 `src/lib/rate-limit.ts` — Rate Limiter

DynamoDB-backed atomic rate limiting. Each IP gets a count + TTL entry per action type. Uses `UpdateCommand` with `if_not_exists` to initialize and increment atomically.

**Limits:**
| Type | Max Requests | Window |
|------|-------------|--------|
| `auth` | 5 | 15 minutes |
| `booking` | 3 | 60 minutes |
| `general` | 60 | 60 seconds |

If DynamoDB is unreachable, the catch block **allows the request through** (fail-open) to avoid blocking legitimate users during outages.

#### `getIP(req)`
Reads `x-forwarded-for` (first IP in chain) → `x-real-ip` → falls back to `"unknown"`.

---

### 7.6 `src/lib/validators.ts` — Zod Schemas

```typescript
// User registration
registerUserSchema: { name, email, password }

// Login
loginSchema: { email, password }

// Demo class booking
demoBookingSchema: { parentName, phone, email, childName, grade?, course, date, time }
```

`course` is a strict enum: `"AI Explorers" | "AI Builders" | "AI Innovators"`
`date` must match `/^\d{4}-\d{2}-\d{2}$/`

---

### 7.7 `src/lib/api-response.ts` — Standardized API Responses

```typescript
ok(data?, status = 200)         // { success: true, ...data }
fail(message, status = 400)     // { success: false, error: message }
validationFail(errors)          // { success: false, error: "Validation failed", details: errors }
```

All responses are `NextResponse.json(...)` instances.

---

### 7.8 `src/lib/pricing.ts` — Country-Based Pricing

Exports a `PRICING` record keyed by ISO country code. `DEFAULT_PRICING` is set to **India** (`PRICING.IN`) so the site always shows INR prices by default — even before geolocation resolves.

#### Current Prices:
| Country | Currency | AI Explorers | AI Builders | AI Innovators |
|---------|----------|-------------|-------------|---------------|
| India (IN) | ₹ | 29,999 | 34,999 | 45,999 |
| Australia (AU) | A$ | 349 | 389 | 529 |
| Singapore (SG) | S$ | 279 | 309 | 419 |
| UAE (AE) | AED | 999 | 1,099 | 1,499 |
| Canada (CA) | C$ | 319 | 349 | 479 |
| International | $ | 249 | 279 | 379 |

#### `detectCountryPricing()`
Calls `https://ipapi.co/json/` with a 3-second timeout, reads `country_code`, returns matching pricing or falls back to `PRICING.DEFAULT` (USD). Used client-side in `AIProgramsSection` and `curriculum/page.tsx`.

---

### 7.9 `src/lib/demo-token.ts` — Demo Token Helper

Creates a demo user token by calling the demo app's registration endpoint. Returns the token string or `undefined` on failure. Called from `/api/register` after a booking is saved.

---

### 7.10 `src/lib/read-api-response.ts` — Safe JSON Parser

Safely reads a `Response` object and parses its JSON without throwing if the server returns an HTML error page. Used when calling external services where the response format is unpredictable.

---

### 7.11 `src/middleware-helpers/safe-handler.ts` — API Error Wrapper

Wraps every API route handler in a `try/catch`. On any uncaught error:
- Logs `[API Error]` + the error to console
- Returns `{ success: false, error: "Something went wrong. Please try again." }` with status 500

This prevents raw error messages or stack traces from leaking to the client.

---

### 7.12 `src/middleware.ts` — Next.js Middleware

Runs on every request (excluding static files and `_next` internals).

**Responsibilities:**
1. **Payload size check** — Rejects requests with `Content-Length > 10,240` bytes with HTTP 413
2. **Content-Type enforcement** — API POST/PUT/PATCH requests must have `Content-Type: application/json`, otherwise HTTP 415
3. **Security response headers** on every response:
   - `X-Content-Type-Options: nosniff`
   - `X-Frame-Options: DENY`
   - `X-XSS-Protection: 1; mode=block`
   - `Referrer-Policy: strict-origin-when-cross-origin`
   - `Permissions-Policy: camera=(), microphone=(), geolocation=()`

---

## 8. PAGES — WORD FOR WORD

### `/` — Homepage (`src/app/page.tsx`)
Renders the full marketing landing page by composing all homepage section components in order:
`HeroSection` → `LogoTicker` → `StatsRow` → `AIProgramsSection` → `HowItWorks` → `HowAKMINDWorks` → `GamificationShowcase` → `WhyChoose` → `AIBotCinematic` → `SkillsForSuccess` → `Educators` → `StudentSpotlight` → `TopPicks` → `FAQ`

---

### `/register` — Demo Booking Wizard (`src/app/register/page.tsx`)
4-step multi-page form:
1. **Step 1 — Parent Info:** `parentName`, `phone` (with `PhoneInput` country selector), `email`
2. **Step 2 — Student Info:** `childName`, `grade` (optional dropdown)
3. **Step 3 — Course Selection:** `ChooseYourCourse` component (shows 3 programs with pricing)
4. **Step 4 — Schedule:** Date picker + time slot selector

On submit → `POST /api/register` → redirect to `/confirmation?bookingId=<id>`

---

### `/confirmation` — Booking Confirmation (`src/app/confirmation/page.tsx`)
Reads `?bookingId=` from URL, calls `GET /api/booking/<id>`, displays:
- Child name, course, date, time
- Confirmation number
- "What happens next" instructions

---

### `/signup` — Account Creation (`src/app/signup/page.tsx`)
Form with `name`, `email`, `password` fields. Submits to `POST /api/auth/register`. On success sets session cookie and redirects.

---

### `/login` — Login (`src/app/login/page.tsx`)
Form with `email`, `password`. Submits to `POST /api/auth/login`. On success redirects to `NEXT_PUBLIC_DASHBOARD_URL` or home.

---

### `/curriculum` — Program Details (`src/app/curriculum/page.tsx`)
Shows detailed curriculum for all 3 programs with module breakdowns. Detects country pricing via `detectCountryPricing()` and animates the price display. Defaults to India pricing (₹) on first render.

---

### `/mentors` — Mentor Profiles (`src/app/mentors/page.tsx`)
Displays mentor cards with photo, name, bio, and expertise tags. No "Book Free Demo" button (removed). Cards are center-aligned.

---

### `/careers` — Job Listings (`src/app/careers/page.tsx`)
Lists open roles. Includes an application form that submits to `POST /api/careers`.

---

### `/become-mentor` — Mentor Application (`src/app/become-mentor/page.tsx`)
Separate form for prospective mentors to express interest.

---

### `/about` — About AKMIND
Company story, mission, team overview.

---

### `/contact` — Contact Page
Contact information and form. Phone number removed from this page.

---

### `/reviews` — Student Testimonials
Student and parent reviews/testimonials with ratings.

---

### `/privacy-policy` and `/terms-and-conditions`
Static legal pages.

---

## 9. COMPONENTS — WORD FOR WORD

| Component | File | Purpose |
|-----------|------|---------|
| `Navbar` | `Navbar.tsx` | Fixed top navigation. Links to all main pages. Shows login/logout based on session cookie. |
| `Footer` | `Footer.tsx` | Site footer with links, social icons, copyright. |
| `HeroSection` | `HeroSection.tsx` | Homepage hero with headline, CTA button, animated wave, background imagery. |
| `AIProgramsSection` | `AIProgramsSection.tsx` | 3 program cards (Explorers, Builders, Innovators) with geo-detected pricing, badges, and Book Demo CTAs. |
| `WhyChoose` | `WhyChoose.tsx` | Feature highlights — reasons to choose AKMIND. |
| `HowItWorks` | `HowItWorks.tsx` | Step-by-step process (Book → Demo → Enroll). |
| `HowAKMINDWorks` | `HowAKMINDWorks.tsx` | Detailed platform walkthrough section. |
| `GamificationShowcase` | `GamificationShowcase.tsx` | Shows the gamification/rewards system (badges, XP, leaderboards). |
| `AIBotCinematic` | `AIBotCinematic.tsx` | Cinematic visual section showcasing the AI bot/assistant. |
| `Educators` | `Educators.tsx` | Expert mentor highlights (Gamification mentors, AI mentors). |
| `StudentSpotlight` | `StudentSpotlight.tsx` | Featured student success stories. |
| `SkillsForSuccess` | `SkillsForSuccess.tsx` | Skills children gain (critical thinking, coding, creativity). |
| `FAQ` | `FAQ.tsx` | Collapsible frequently asked questions. |
| `TopPicks` | `TopPicks.tsx` | Highlighted/popular program picks. |
| `LogoTicker` | `LogoTicker.tsx` | Scrolling ticker of partner/trust logos. |
| `StatsRow` | `StatsRow.tsx` | Key stats bar (students enrolled, sessions, ratings). |
| `ScrollReveal` | `ScrollReveal.tsx` | Wrapper component that animates children into view on scroll using Framer Motion. |
| `ScrollProgressBar` | `ScrollProgressBar.tsx` | Thin top-of-page bar showing scroll depth. |
| `FloatingCTA` | `FloatingCTA.tsx` | Sticky floating button (bottom of screen) — "Book Free Demo". |
| `PhoneInput` | `PhoneInput.tsx` | Phone number input with country code flag selector and formatting. |
| `ParentalGuidelines` | `ParentalGuidelines.tsx` | Collapsible modal/disclosure for parental consent guidelines on booking form. |
| `ChooseYourCourse` | `ChooseYourCourse.tsx` | Step 3 of booking wizard — course selection cards with pricing. |

---

## 10. AUTHENTICATION & SESSIONS

AKMIND uses **custom session-based authentication** — not Cognito (which is imported but unused in production).

### Flow
1. User submits name + email + password to `POST /api/auth/register`
2. Server hashes password with bcrypt (10 rounds), saves to DynamoDB
3. Server creates a session payload: `JSON.stringify({ id, email, name })`
4. Server signs it: `HMAC-SHA256(payload, AUTH_SESSION_SECRET)` → hex string
5. Final cookie value: `<base64url(payload)>.<hmac>`
6. Cookie set: name=`akmind_session`, `httpOnly: false` (intentionally — client JS reads it for UI), `secure: true` in prod, `sameSite: lax`, `maxAge: 604800` (7 days)

### Verification (on `/api/auth/me`)
1. Read `akmind_session` cookie
2. Split on last `.` → `[payload, signature]`
3. Recompute HMAC — if mismatch → `{ authenticated: false }`
4. Parse JSON payload → return user

### Why `httpOnly: false`?
The Navbar reads the cookie client-side to show/hide the login button without a server round-trip.

---

## 11. RATE LIMITING

All rate limit data is stored in the `akmind-rate-limits` DynamoDB table with TTL auto-expiry.

| Route | Key Format | Limit | Window |
|-------|-----------|-------|--------|
| `/api/auth/register` | `rl#auth:<ip>` | 5 requests | 15 min |
| `/api/auth/login` | `rl#auth:<ip>` | 5 requests | 15 min |
| `/api/register` | `rl#booking:<ip>` | 3 requests | 60 min |
| `/api/auth/me` | `rl#general:<ip>` | 60 requests | 60 sec |
| `/api/booking/[id]` | `rl#general:<ip>` | 60 requests | 60 sec |

The `UpdateCommand` uses a conditional expression to atomically set-or-increment the counter and always refreshes the TTL. If DynamoDB is down, the rate limiter fails open (allows the request).

---

## 12. EMAIL SERVICE (GMAIL / NODEMAILER)

**Provider:** Gmail SMTP via `nodemailer`

**Config:**
```typescript
nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
})
```

**All emails use try/catch** — email failures are logged (`console.error`) but never throw. A failed email will not break a booking or registration.

### Email Templates

#### Welcome Email (sent after registration)
- To: new user
- Subject: `"Welcome to AKMIND!"`
- Contains: welcome message + "Go to Dashboard" button

#### Admin Booking Notification
- To: `SES_ADMIN_EMAIL` (or `GMAIL_USER` as fallback)
- Subject: `"New Booking — <childName> (<parentName>)"`
- Contains: full booking table (parent, email, phone, child, course, date, time, booking ID)

#### Parent Booking Confirmation
- To: parent email
- Subject: `"Your AKMIND Demo is Confirmed!"`
- Contains: booking summary + optional "Start Demo Lessons" CTA button (only shown if `demoToken` was created)

#### Career Application Admin Notification
- To: `SES_ADMIN_EMAIL` (or `GMAIL_USER` as fallback)
- Subject: `"New Application — <role> — <name>"`
- Contains: applicant details table

#### Career Application Confirmation
- To: applicant
- Subject: `"Application Received — AKMIND"`
- Contains: acknowledgement + 3-day response timeline

---

## 13. EXTERNAL INTEGRATIONS

### Google Apps Script (GAS) — Booking to Sheets
Every successful demo booking fires a non-blocking `fetch(GAS_WEBHOOK_URL, { method: "POST", body: JSON.stringify(booking) })`.
- If `GAS_WEBHOOK_URL` is empty, the step is skipped silently
- Headers: `Content-Type: text/plain;charset=utf-8` (required by GAS to avoid CORS preflight)

### Demo App (`demo.akmind.com`)
A separate Next.js application hosting the interactive demo lessons.
- After a booking, `/api/register` calls `DEMO_APP_URL/api/demo/register` to create a token
- The token is embedded in the parent confirmation email as a "Start Demo Lessons" link
- `/api/demo/check` proxies browser requests to check if an email has used the demo (avoids CORS)
- Failure to reach the demo app is non-blocking — booking succeeds regardless

### IP Geolocation (`ipapi.co`)
Used only in `detectCountryPricing()`. Called client-side (in browser) with a 3-second timeout. Determines the user's country code to show local currency pricing. Falls back to USD if the call fails.

---

## 14. SECURITY LAYERS

| Layer | Where | What It Does |
|-------|-------|-------------|
| Payload size limit | `middleware.ts` | Rejects requests with `Content-Length > 10KB` (HTTP 413) |
| Content-Type check | `middleware.ts` | API mutations must be `application/json` (HTTP 415) |
| Security headers | `middleware.ts` + `next.config.ts` | X-Frame-Options, X-XSS-Protection, HSTS, CSP, Referrer-Policy, Permissions-Policy |
| Zod validation | All POST routes | Type-safe schema validation before any DB write |
| HMAC session signing | `src/lib/auth.ts` | Sessions are cryptographically signed — cannot be forged |
| bcrypt hashing | `src/lib/auth.ts` | Passwords stored as bcrypt hash (10 rounds), never plaintext |
| Rate limiting | `src/lib/rate-limit.ts` | Per-IP DynamoDB rate limits with TTL auto-expiry |
| safeHandler wrapper | All API routes | Prevents stack traces / raw errors from leaking to client |
| `removeUndefinedValues` | DynamoDB client | Prevents undefined attributes writing unexpected null values |

---

## 15. FRONTEND-TO-BACKEND DATA FLOW

### Demo Booking Flow (happy path)
```
User fills 4-step wizard (/register)
  ↓
Submit → fetch POST /api/register
  ↓
middleware.ts: payload size check + content-type check
  ↓
rate-limit.ts: checkRateLimit("booking:<ip>", { max:3, window:3600 })
  ↓
demoBookingSchema.safeParse(body) — Zod validation
  ↓
getDb().send(PutCommand) → DynamoDB "bookings" table
  ↓ (non-blocking)
fetch(GAS_WEBHOOK_URL) — Google Sheets sync
  ↓ (non-blocking, failure safe)
fetch(DEMO_APP_URL/api/demo/register) → get demoToken
  ↓
Promise.allSettled([
  sendAdminBookingNotification(),   // email to admin
  sendParentBookingConfirmation()    // email to parent (with demo link if token exists)
])
  ↓
return { success: true, bookingId, demoToken }
  ↓
Browser redirect → /confirmation?bookingId=<id>
  ↓
/confirmation page: fetch GET /api/booking/<id>
  ↓
Display booking summary to user
```

### Auth Flow (registration)
```
User fills signup form (/signup)
  ↓
fetch POST /api/auth/register
  ↓
Rate limit check (auth: 5/15min)
  ↓
Zod validation
  ↓
bcrypt.hash(password, 10)
  ↓
DynamoDB PutCommand → "users" table
  ↓
createSessionCookiePayload(user) → HMAC-signed cookie
  ↓
sendWelcomeEmail() [non-blocking]
  ↓
Set cookie + return user object
  ↓
Browser stores cookie, Navbar shows logged-in state
```

---

## 16. VALIDATION SCHEMAS (ZOD)

```typescript
// src/lib/validators.ts

registerUserSchema = z.object({
  name:     z.string().min(2).max(80).trim(),
  email:    z.string().email().toLowerCase().trim(),
  password: z.string().min(6).max(128),
})

loginSchema = z.object({
  email:    z.string().email().toLowerCase().trim(),
  password: z.string().min(1).max(128),
})

demoBookingSchema = z.object({
  parentName: z.string().min(2).max(80).trim(),
  phone:      z.string().min(7).max(20).trim(),
  email:      z.string().email().toLowerCase().trim(),
  childName:  z.string().min(2).max(60).trim(),
  grade:      z.string().optional(),
  course:     z.enum(["AI Explorers", "AI Builders", "AI Innovators"]),
  date:       z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time:       z.string().min(1).max(30).trim(),
})
```

Validation errors are returned via `validationFail(result.error.flatten())` which includes field-level error details in the response.

---

## 17. PRICING SYSTEM

Pricing is defined in `src/lib/pricing.ts`. The system:
1. **Defaults to India pricing (INR)** — `DEFAULT_PRICING = PRICING.IN` — so pages show ₹ prices on first load
2. After the page loads, `detectCountryPricing()` runs client-side and may switch to a different currency
3. This ensures Indian visitors (the primary audience) never see USD as the default

### Current Pricing Table

| Country | Code | Currency | Symbol | AI Explorers | AI Builders | AI Innovators |
|---------|------|----------|--------|-------------|-------------|---------------|
| India | IN | INR | ₹ | 29,999 | 34,999 | 45,999 |
| Australia | AU | AUD | A$ | 349 | 389 | 529 |
| Singapore | SG | SGD | S$ | 279 | 309 | 419 |
| UAE | AE | AED | AED | 999 | 1,099 | 1,499 |
| Canada | CA | CAD | C$ | 319 | 349 | 479 |
| International | DEFAULT | USD | $ | 249 | 279 | 379 |

### Program Descriptions
- **AI Explorers** — Beginner level, ages 8–11. Introduction to AI concepts through games and projects.
- **AI Builders** — Intermediate level, ages 11–14. Build real AI applications. Most popular program.
- **AI Innovators** — Advanced level, ages 14–18. Deep AI/ML projects, capstone presentations.

---

## 18. DEPLOYMENT & INFRASTRUCTURE

### Platform: AWS Amplify

The app is deployed on **AWS Amplify Hosting** connected to the GitHub repository (`master` branch). Every push to `master` triggers an automatic build and deployment.

### Build Configuration
- **Build command:** `npm run build`
- **Start command:** `npm start`
- **Node version:** 18.x or 20.x (set in Amplify build settings)
- **Framework:** Next.js (SSR mode — not static export)

### Environment Variables on Amplify
Set in: **Amplify Console → App → Hosting → Environment variables**

Required vars (see Section 4 for full list):
```
AWS_REGION
DYNAMODB_USERS_TABLE
DYNAMODB_BOOKINGS_TABLE
COGNITO_USER_POOL_ID
COGNITO_CLIENT_ID
AUTH_SESSION_SECRET
GMAIL_USER
GMAIL_APP_PASSWORD
SES_ADMIN_EMAIL
NEXT_PUBLIC_APP_URL
DEMO_APP_URL
NEXT_PUBLIC_DEMO_APP_URL
GAS_WEBHOOK_URL
```

> After adding/updating env vars in Amplify, **manually trigger a redeploy** — the new values only take effect after a new build.

### IAM Permissions Required for Amplify Service Role
The Amplify execution role must have these DynamoDB permissions:

```json
{
  "Effect": "Allow",
  "Action": [
    "dynamodb:PutItem",
    "dynamodb:GetItem",
    "dynamodb:UpdateItem",
    "dynamodb:DeleteItem",
    "dynamodb:Query",
    "dynamodb:Scan"
  ],
  "Resource": [
    "arn:aws:dynamodb:ap-south-1:*:table/users",
    "arn:aws:dynamodb:ap-south-1:*:table/users/index/*",
    "arn:aws:dynamodb:ap-south-1:*:table/bookings",
    "arn:aws:dynamodb:ap-south-1:*:table/akmind-rate-limits"
  ]
}
```

### Local Development
```bash
# Install dependencies
npm install

# Create .env.local with all required variables
# (see Section 4)

# Start dev server
npm run dev         # → http://localhost:3000

# (Optional) Start demo app separately
# → http://localhost:3001
```

### next.config.ts — Security Headers
Applied via `headers()` to all routes:
- `Content-Security-Policy`: allows self, Google Fonts (`fonts.gstatic.com`, `fonts.googleapis.com`), `ipapi.co` (for geo pricing)
- `Strict-Transport-Security`: `max-age=31536000; includeSubDomains` (HSTS)
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`

---

## 19. KEY MENTOR PROFILES

Mentor data is defined directly in `src/app/mentors/page.tsx` and `src/components/Educators.tsx`.

| Name | Role | Expertise |
|------|------|-----------|
| Akhil Raj | Lead AI Mentor | Machine Learning, Python, Neural Networks |
| Jebian | AI Mentor | Computer Vision, NLP, Deep Learning |
| Nagaraj | Gamification Mentor | Game Design, Unity, Educational Technology |

Mentor photos are stored in:
- `public/images/mentors/` — optimized web versions
- `Images & Videos/` — original high-res JPEGs (Akhil.jpeg, Jebian.jpeg, Nagaraj.jpeg)

> No "Book Free Demo" button on the mentors page (removed). Cards use center-aligned layout.

---

## 20. OPEN JOB ROLES

Defined in `src/app/careers/page.tsx`. Valid roles accepted by `/api/careers`:

| Role | Description |
|------|-------------|
| AI Mentor | Teach live demo and enrolled classes to students aged 8–18 |
| Curriculum Designer | Design and update AI course content and lesson plans |
| Student Success Manager | Onboard students, track progress, support parent communication |
| Full Stack Developer | Build and maintain the AKMIND platform |
| Other | Open application for any other relevant role |

Applications go to `SES_ADMIN_EMAIL` (or `GMAIL_USER` fallback) with a copy confirmation to the applicant.

---

*Last updated: March 2026 — v1.0*
