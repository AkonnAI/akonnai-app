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
12. [Email Service (AWS SES)](#12-email-service-aws-ses)
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

The platform is based in **Bangalore, India** and serves students globally. The live domain is **www.akmind.com**.

The stack is entirely TypeScript: **Next.js 16 (App Router)** on the frontend and serverless API routes as the backend, connected to **AWS DynamoDB** (database), **AWS SES** (email), and **Google Sheets** (booking log).

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

### AWS Services
| Service | Purpose |
|---------|---------|
| DynamoDB | Primary database (users, bookings, rate limits) |
| SES (Simple Email Service) | Transactional emails |
| Cognito | Imported but NOT actively used — custom auth instead |
| Amplify | Hosting & CI/CD |

### AWS SDK Packages
- `@aws-sdk/client-dynamodb` — Low-level DynamoDB client
- `@aws-sdk/lib-dynamodb` — Document client (auto marshalling JS ↔ DynamoDB types)
- `@aws-sdk/client-ses` — Email sending
- `@aws-sdk/client-cognito-identity-provider` — Cognito (imported, not used in production)

### Security & Validation
| Library | Role |
|---------|------|
| bcryptjs | Password hashing (10 salt rounds) |
| crypto (Node built-in) | HMAC-SHA256 session signing |
| Zod 4.3.6 | Request body validation schemas |

### Dev Tools
- ESLint 9 — Code linting
- Node.js (runtime for API routes via Vercel/Amplify edge)

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
│   │   ├── email.ts                  # All SES email templates
│   │   ├── rate-limit.ts             # DynamoDB-backed rate limiter
│   │   ├── validators.ts             # Zod validation schemas
│   │   ├── api-response.ts           # Standard JSON response wrappers
│   │   └── pricing.ts                # Country-based pricing detection
│   │
│   ├── middleware-helpers/
│   │   └── safe-handler.ts           # Error-catching wrapper for API routes
│   │
│   └── middleware.ts                 # Next.js middleware (payload size, CSP)
│
├── public/
│   ├── images/
│   │   ├── mentors/                  # Mentor profile photos
│   │   ├── slide1.png – slide4.png   # Hero section carousel images
│   │   └── og-image.png              # Open Graph social preview image
│   └── robots.txt
│
├── Images & Videos/                  # Untracked mentor photos (Akhil, Jebian, Nagaraj)
│
├── .env.local.example                # Template for required env vars
├── next.config.ts                    # Security headers, image domains
├── tsconfig.json                     # TypeScript strict config
├── package.json                      # All dependencies
├── ARCHITECTURE.md                   # Technical architecture notes
├── DEPLOYMENT.md                     # AWS setup guide
└── PROJECT_Readme.md                 # This file
```

---

## 4. ENVIRONMENT VARIABLES

File: `.env.local` (not committed). Template at `.env.local.example`.

Validated at runtime in `src/lib/env.ts`. If any variable is missing, the server throws an error at startup. Validation is **skipped during `next build`** (NEXT_PHASE check).

| Variable | Required | Purpose |
|----------|----------|---------|
| `AWS_ACCESS_KEY_ID` | Yes | IAM credentials for all AWS calls |
| `AWS_SECRET_ACCESS_KEY` | Yes | IAM credentials for all AWS calls |
| `AWS_REGION` | Yes | AWS region (e.g. `ap-south-1`) |
| `DYNAMODB_USERS_TABLE` | Yes | DynamoDB table name for users (e.g. `akmind-users`) |
| `DYNAMODB_BOOKINGS_TABLE` | Yes | DynamoDB table name for bookings (e.g. `akmind-bookings`) |
| `COGNITO_USER_POOL_ID` | Yes | Cognito pool ID (imported but not active) |
| `COGNITO_CLIENT_ID` | Yes | Cognito app client ID (imported but not active) |
| `SES_FROM_EMAIL` | Yes | Sender email: `hello@akmind.com` (must be SES-verified) |
| `SES_ADMIN_EMAIL` | Yes | Admin email: `admin@akmind.com` |
| `GAS_WEBHOOK_URL` | Yes | Google Apps Script URL to sync bookings to Google Sheets |
| `AUTH_SESSION_SECRET` | Yes | 32+ char secret for HMAC-SHA256 session signing |

**`AUTH_SESSION_SECRET` must be at least 32 characters.** Generate with:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 5. DATABASE SCHEMAS (DynamoDB)

All tables are in AWS DynamoDB with on-demand (pay-per-request) billing. No fixed capacity units are provisioned.

---

### Table: `akmind-users`
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

### Table: `akmind-bookings`
Stores every demo class booking submitted via `/register`.

| Attribute | Type | Key | Description |
|-----------|------|-----|-------------|
| `id` | String | Partition Key | `crypto.randomUUID()` |
| `parentName` | String | — | Parent/guardian's full name |
| `phone` | String | — | International phone number (e.g. `+91 9876543210`) |
| `email` | String | — | Parent's email address |
| `childName` | String | — | Student's name |
| `grade` | String | — | Optional. `"Grade 1"` through `"Grade 12"` |
| `course` | String | — | `"AI Explorers"` or `"AI Builders"` or `"AI Innovators"` |
| `date` | String | — | ISO date string `YYYY-MM-DD` |
| `time` | String | — | Time slot string, e.g. `"4:00 PM"` |
| `createdAt` | String | — | ISO 8601 timestamp |

---

### Table: `akmind-rate-limits`
Auto-managed by `src/lib/rate-limit.ts`. Uses DynamoDB's TTL feature to automatically expire old records.

| Attribute | Type | Key | Description |
|-----------|------|-----|-------------|
| `pk` | String | Partition Key | Format: `rl#<type>:<ip>` e.g. `rl#auth:192.168.1.1` |
| `count` | Number | — | Incremented atomically on each request |
| `ttl` | Number | — | Unix epoch seconds. DynamoDB deletes item when this expires. |

Table name is hardcoded as `"akmind-rate-limits"` inside `src/lib/dynamodb.ts`.

---

## 6. API ROUTES — WORD FOR WORD

### 6.1 `POST /api/auth/register` — Create User Account
File: `src/app/api/auth/register/route.ts`

**What it does:** Creates a new user account. Validates the request body with Zod, checks the email is not already taken, hashes the password with bcrypt, saves the user to DynamoDB, creates a signed session cookie, and returns the user object.

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
Also sets cookie: `akmind_session` (7 days, sameSite: lax, secure in prod)

**Error responses:**
- `409 Conflict` — `{ "error": "Email already registered" }`
- `422 Unprocessable Entity` — Zod validation failed
- `429 Too Many Requests` — Rate limit exceeded
- `500 Internal Server Error` — Unexpected failure

---

### 6.2 `POST /api/auth/login` — Log In
File: `src/app/api/auth/login/route.ts`

**What it does:** Receives email + password, queries DynamoDB for user by email (using `email-index` GSI), runs bcrypt.compare against the stored hash, creates a signed session cookie if valid, returns the user object.

**Rate limit:** 5 requests per 15 minutes per IP (type: `auth`)

**Request body:**
```json
{
  "email": "priya@example.com",
  "password": "securepassword123"
}
```

**Validation rules (Zod):**
- `email`: valid email format, lowercased, trimmed
- `password`: string, min 1 char, max 128 chars

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

**What it does:** Deletes the session cookie by setting it to expire immediately (maxAge: 0).

**No request body needed.**

**Success response (200 OK):**
```json
{ "success": true }
```
Sets cookie: `akmind_session` with `maxAge: 0` (effectively deleted)

---

### 6.4 `GET /api/auth/me` — Get Current User
File: `src/app/api/auth/me/route.ts`

**What it does:** Reads the `akmind_session` cookie, parses and verifies the HMAC signature, looks up the user by ID in DynamoDB, returns user info if valid.

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

**What it does:** Accepts a completed 4-step booking form. Validates all fields, generates a UUID, stores the booking in DynamoDB, fires a non-blocking POST to Google Sheets via webhook, sends two SES emails (admin notification + parent confirmation), and returns the booking ID.

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

**Validation rules (Zod):**
- `parentName`: string, min 2, max 80, trimmed
- `phone`: string, min 7, max 20, trimmed
- `email`: valid email, lowercased, trimmed
- `childName`: string, min 2, max 60, trimmed
- `grade`: optional string
- `course`: one of `"AI Explorers"` | `"AI Builders"` | `"AI Innovators"`
- `date`: matches regex `^\d{4}-\d{2}-\d{2}$`
- `time`: string, min 1, max 30, trimmed

**Process flow:**
1. Check rate limit (3/hour)
2. Validate body with Zod
3. Generate `id = crypto.randomUUID()`
4. `PutCommand` to `akmind-bookings` table with all fields + `createdAt`
5. Forward to Google Sheets — `fetch(GAS_WEBHOOK_URL, { method: "POST", body: JSON.stringify(booking) })` — non-blocking (`void fetch(...)`)
6. `sendAdminBookingNotification(booking)` — email to admin
7. `sendParentBookingConfirmation(email, booking)` — email to parent
8. Return `{ bookingId: id }`

**Success response (200 OK):**
```json
{ "bookingId": "550e8400-e29b-41d4-a716-446655440000" }
```

**Error responses:**
- `422 Unprocessable Entity` — Validation failed with field errors
- `429 Too Many Requests` — Rate limit exceeded
- `500 Internal Server Error` — DynamoDB or email failure

---

### 6.6 `GET /api/booking/[bookingId]` — Fetch Booking
File: `src/app/api/booking/[bookingId]/route.ts`

**What it does:** Called by the `/confirmation` page after redirect. Fetches a specific booking by its UUID from DynamoDB and returns sanitized booking data.

**Rate limit:** 60 requests per 60 seconds per IP (type: `general`)

**URL parameter:** `bookingId` — UUID string

**Validation:** Rejects if `bookingId` is longer than 64 characters (to prevent DynamoDB key abuse).

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

### 6.7 `POST /api/careers` — Submit Job Application
File: `src/app/api/careers/route.ts`

**What it does:** Accepts a career application form, validates all fields server-side (email format, 10-digit Indian phone, valid role), sends an admin notification email and an applicant confirmation email via SES.

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
- Phone regex `/^[6-9]\d{9}$/` (10-digit Indian mobile) → `400`: `"Invalid phone number. Please enter a valid 10-digit Indian mobile number."`
- Role not in list → `400`: `"Invalid role selected."`

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

**Error responses:**
- `400 Bad Request` — Various validation errors (see above)
- `500 Internal Server Error` — Email send failure

---

## 7. LIBRARY / UTILITY CODE — WORD FOR WORD

### 7.1 `src/lib/env.ts` — Environment Variable Validation

**What it does:** Exports a validated `env` object. At module load time (runtime only, not during build), it reads all 11 required environment variables and throws descriptive errors if any are missing or invalid.

```typescript
// Skip validation at build time
if (process.env.NEXT_PHASE !== "phase-production-build") {
  // Validate all 11 vars
  // Throw if AUTH_SESSION_SECRET is less than 32 chars
}

export const env = {
  awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID!,
  awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  awsRegion: process.env.AWS_REGION!,
  usersTable: process.env.DYNAMODB_USERS_TABLE!,
  bookingsTable: process.env.DYNAMODB_BOOKINGS_TABLE!,
  cognitoUserPoolId: process.env.COGNITO_USER_POOL_ID!,
  cognitoClientId: process.env.COGNITO_CLIENT_ID!,
  sesFromEmail: process.env.SES_FROM_EMAIL!,
  sesAdminEmail: process.env.SES_ADMIN_EMAIL!,
  gasWebhookUrl: process.env.GAS_WEBHOOK_URL!,
  sessionSecret: process.env.AUTH_SESSION_SECRET!,
}
```

---

### 7.2 `src/lib/dynamodb.ts` — DynamoDB Client

**What it does:** Creates a singleton DynamoDB Document Client. Exports the client and the three table name constants.

```typescript
import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb"

let dbInstance: DynamoDBDocumentClient | null = null

export function getDb(): DynamoDBDocumentClient {
  if (!dbInstance) {
    const client = new DynamoDBClient({
      region: env.awsRegion,
      credentials: {
        accessKeyId: env.awsAccessKeyId,
        secretAccessKey: env.awsSecretAccessKey,
      },
    })
    dbInstance = DynamoDBDocumentClient.from(client)
  }
  return dbInstance
}

export const USERS_TABLE = env.usersTable           // "akmind-users"
export const BOOKINGS_TABLE = env.bookingsTable     // "akmind-bookings"
export const RATE_LIMIT_TABLE = "akmind-rate-limits"
```

The Document Client handles automatic type marshalling (JavaScript objects ↔ DynamoDB's typed format), so you work with plain JS objects.

---

### 7.3 `src/lib/auth.ts` — Authentication Logic

**What it does:** All user-related database operations and session token management.

#### `registerUser(name, email, password)`
1. Hash password: `bcrypt.hash(password, 10)`
2. Generate ID: `${Date.now()}-${Math.random().toString(36).slice(2)}`
3. `PutCommand` to `akmind-users` with `{ id, email, name, passwordHash, createdAt }`
4. Returns `{ id, email, name }`

#### `verifyUser(email, password)`
1. `QueryCommand` on `email-index` GSI: `KeyConditionExpression: "email = :e"`
2. If no user found → `null`
3. `bcrypt.compare(password, user.passwordHash)`
4. If match → returns `{ id, email, name }`
5. If no match → `null`

#### `getUserById(id)`
1. `GetCommand` with `{ TableName: USERS_TABLE, Key: { id } }`
2. Returns `{ id, email, name }` or `null`

#### `createSessionCookiePayload(user)`
1. Builds payload: `JSON.stringify({ id, email, name })`
2. Encodes: `base64url(payload)`
3. Signs: `HMAC-SHA256(encoded, sessionSecret)` → hex digest
4. Returns: `${encoded}.${signature}`

#### `parseSessionCookie(cookieHeader)`
1. Parses `cookie` header string to find `akmind_session` value
2. Splits on last `.` → `[encoded, signature]`
3. Recomputes expected signature: `HMAC-SHA256(encoded, sessionSecret)`
4. Compares with `timingSafeEqual` to prevent timing attacks
5. If valid → `JSON.parse(base64url.decode(encoded))`
6. If invalid → `null`

#### `clearSessionCookie()`
Returns a `Set-Cookie` header string that sets `akmind_session` with `maxAge=0`.

**Session Cookie Properties:**
```
Name:     akmind_session
Path:     /
MaxAge:   604800 (7 days)
SameSite: Lax
Secure:   true (production) / false (development)
HttpOnly: false  <-- accessible to JavaScript
```

---

### 7.4 `src/lib/rate-limit.ts` — Rate Limiting

**What it does:** Implements DynamoDB-backed rate limiting using atomic counter increments and TTL-based expiry.

#### `getIP(req: Request): string`
1. Read `x-forwarded-for` header → first IP in comma-separated list
2. Fallback to `x-real-ip` header
3. Fallback to `"unknown"`

#### `checkRateLimit(key, config): Promise<{ allowed, remaining }>`
```typescript
config = {
  max: number,            // e.g. 5
  windowSeconds: number   // e.g. 900 (15 min)
}
key = "auth:192.168.1.1"   // type:ip
```

**DynamoDB operation:**
```typescript
UpdateCommand({
  TableName: RATE_LIMIT_TABLE,        // "akmind-rate-limits"
  Key: { pk: `rl#${key}` },
  UpdateExpression: "SET #count = if_not_exists(#count, :zero) + :one, #ttl = :ttl",
  ExpressionAttributeValues: {
    ":zero": 0,
    ":one": 1,
    ":ttl": Math.floor(Date.now() / 1000) + windowSeconds
  },
  ReturnValues: "UPDATED_NEW"
})
```

Returns:
```typescript
{
  allowed: newCount <= config.max,
  remaining: Math.max(0, config.max - newCount)
}
```

**Fails open:** If DynamoDB throws, returns `{ allowed: true, remaining: config.max }`. This is intentional — rate limiting failure should not block legitimate users.

**Pre-configured limits:**
```typescript
const LIMITS = {
  auth:    { max: 5,  windowSeconds: 900  },   // 5/15 min
  booking: { max: 3,  windowSeconds: 3600 },   // 3/hour
  general: { max: 60, windowSeconds: 60   }    // 60/min
}
```

---

### 7.5 `src/lib/validators.ts` — Zod Schemas

**What it does:** Defines and exports three Zod schemas used by API routes for request body validation.

#### `registerUserSchema`
```typescript
z.object({
  name:     z.string().min(2).max(80).trim(),
  email:    z.string().email().toLowerCase().trim(),
  password: z.string().min(6).max(128)
})
```

#### `loginSchema`
```typescript
z.object({
  email:    z.string().email().toLowerCase().trim(),
  password: z.string().min(1).max(128)
})
```

#### `demoBookingSchema`
```typescript
z.object({
  parentName: z.string().min(2).max(80).trim(),
  phone:      z.string().min(7).max(20).trim(),
  email:      z.string().email().toLowerCase().trim(),
  childName:  z.string().min(2).max(60).trim(),
  grade:      z.string().optional(),
  course:     z.enum(["AI Explorers", "AI Builders", "AI Innovators"]),
  date:       z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time:       z.string().min(1).max(30).trim()
})
```

---

### 7.6 `src/lib/email.ts` — SES Email Templates

**What it does:** All transactional email sending logic using AWS SES. All emails are sent from `hello@akmind.com`. HTML-formatted templates with brand colours.

#### `sendWelcomeEmail(email: string, name: string)`
- **To:** New user's email
- **From:** `hello@akmind.com`
- **Subject:** `"Welcome to AKMIND! Your AI Journey Begins"`
- **Content:** Branded HTML with welcome message, summary of AKMIND, CTA button linking to `/register`

#### `sendAdminBookingNotification(booking: BookingData)`
- **To:** `admin@akmind.com`
- **From:** `hello@akmind.com`
- **Subject:** `"New Demo Booking — {childName} ({grade})"`
- **Content:** HTML table with all booking fields: Parent Name, Phone, Email, Child Name, Grade, Course, Date, Time, Booking ID

#### `sendParentBookingConfirmation(email: string, booking: BookingData)`
- **To:** Parent's email
- **From:** `hello@akmind.com`
- **Subject:** `"Your Demo Class is Booked! — AKMIND"`
- **Content:** Confirmation card showing child's name, program selected, date, time. Note that the mentor will send the video call link separately.

#### `sendCareerApplicationAdmin(application: ApplicationData)`
- **To:** `admin@akmind.com`
- **From:** `hello@akmind.com`
- **Subject:** `"New Job Application — {role} — {name}"`
- **Content:** HTML table with applicant details: name, email, phone, role, LinkedIn, portfolio, message, source

#### `sendCareerApplicationConfirmation(email: string, name: string, role: string)`
- **To:** Applicant's email
- **From:** `hello@akmind.com`
- **Subject:** `"Application Received — AKMIND"`
- **Content:** Thank you message with applicant's name and role, mention of 3 working days review time

**SES Setup:**
```typescript
const sesClient = new SESClient({
  region: env.awsRegion,         // ap-south-1
  credentials: {
    accessKeyId: env.awsAccessKeyId,
    secretAccessKey: env.awsSecretAccessKey,
  },
})
```

---

### 7.7 `src/lib/api-response.ts` — Response Helpers

**What it does:** Standard response wrapper functions to ensure consistent JSON responses across all API routes.

```typescript
export function ok(data: object, status = 200): Response
export function fail(message: string, status = 400): Response
export function serverError(message = "Internal server error"): Response
```

All responses include `Content-Type: application/json`.

---

### 7.8 `src/lib/pricing.ts` — Country-Based Pricing

**What it does:** Detects the user's country from their IP address using `ipapi.co/json/` and returns the appropriate pricing object.

#### `detectCountryPricing(): Promise<PricingInfo>`
1. `fetch("https://ipapi.co/json/", { signal: AbortSignal.timeout(3000) })`
2. Read `country_code` from response
3. Match against `PRICING` object
4. Fallback to `PRICING.DEFAULT` if country not found or fetch fails

**Pricing table:**
```typescript
const PRICING = {
  IN: { currency: "INR", symbol: "₹",   explorers: 2999, builders: 4999, innovators: 7999 },
  AU: { currency: "AUD", symbol: "A$",  explorers: 79,   builders: 129,  innovators: 199  },
  SG: { currency: "SGD", symbol: "S$",  explorers: 69,   builders: 109,  innovators: 169  },
  AE: { currency: "AED", symbol: "د.إ", explorers: 199,  builders: 329,  innovators: 499  },
  CA: { currency: "CAD", symbol: "C$",  explorers: 79,   builders: 129,  innovators: 199  },
  DEFAULT: { currency: "USD", symbol: "$", explorers: 59, builders: 99,  innovators: 149  },
}
```

Used in `src/app/curriculum/page.tsx` to dynamically render prices in the user's local currency.

---

### 7.9 `src/middleware-helpers/safe-handler.ts` — Error Wrapper

**What it does:** Wraps API route handlers in a try/catch. If the handler throws, returns a 500 JSON response instead of crashing the server.

```typescript
export function safeHandler(
  handler: (req: Request, ctx?: unknown) => Promise<Response>
) {
  return async (req: Request, ctx?: unknown) => {
    try {
      return await handler(req, ctx)
    } catch (err) {
      console.error("[API Error]", err)
      return serverError("Internal server error")
    }
  }
}
```

All API route exports are wrapped with `safeHandler`.

---

### 7.10 `src/middleware.ts` — Next.js Middleware

**What it does:** Runs on every request before it reaches any page or API route.

1. **Payload size check:** Reads `Content-Length` header. If > 10 KB (10,240 bytes) on a POST/PUT/PATCH, returns `413 Payload Too Large`.
2. **Content-Type enforcement:** For POST/PUT/PATCH requests, if `Content-Type` is not `application/json`, returns `415 Unsupported Media Type`.
3. **CSP header injection:** Adds `Content-Security-Policy` header to every response.

**Matcher config:** Applies to all `/api/*` routes.

---

## 8. PAGES — WORD FOR WORD

### 8.1 `src/app/page.tsx` — Homepage (`/`)

The homepage renders these sections in order:
1. `<ScrollProgressBar />` — reading progress bar at top of viewport
2. `<Navbar />` — fixed top navigation
3. `<HeroSection />` — above-the-fold animated hero
4. `<StatsRow />` — key metrics (students, mentors, etc.)
5. `<LogoTicker />` — scrolling partner logos carousel
6. `<AIProgramsSection />` — 3 program cards
7. `<HowItWorks />` — 4-step process
8. `<GamificationShowcase />` — gamification features
9. `<HowAKMINDWorks />` — 5-step cinematic method
10. `<AIBotCinematic />` — AI bot character section
11. `<Educators />` — mentor showcase
12. `<SkillsForSuccess />` — skills section
13. `<TopPicks />` — featured picks
14. `<WhyChoose />` — value proposition
15. `<StudentSpotlight />` — testimonials
16. `<FAQ />` — FAQ accordion
17. `<FloatingCTA />` — sticky "Book Demo" button
18. `<Footer />` — site footer

---

### 8.2 `src/app/register/page.tsx` — Demo Booking Wizard (`/register`)

A 4-step animated wizard for booking a free demo class.

**State:**
- `step: number` — current step (1–4)
- `formData: object` — accumulates all form fields across steps
- `isLoading: boolean` — shows spinner during API call
- `errors: object` — per-field error messages

**Step 1 — Parent Details:**
- Fields: `parentName`, `phone` (via `<PhoneInput />` component), `email`
- Validation: all required, email must be valid format

**Step 2 — Child Details:**
- Fields: `childName`, `grade` (dropdown: Grade 1–12, optional)

**Step 3 — Choose Course:**
- UI: 3 clickable cards (AI Explorers, AI Builders, AI Innovators)
- Selecting a card sets `formData.course`

**Step 4 — Pick Date & Time:**
- Date: date picker (min: today, max: 30 days ahead)
- Time: 4 buttons — `4:00 PM`, `5:00 PM`, `6:00 PM`, `7:00 PM`

**Submission (Step 4 confirm):**
1. `fetch("POST /api/register", body: formData)`
2. On success: `router.push("/confirmation?id=" + bookingId)`
3. On failure: display error message

**Animations:** Framer Motion `AnimatePresence` slides each step in/out.

---

### 8.3 `src/app/confirmation/page.tsx` — Booking Confirmation (`/confirmation`)

**What it does:** Reads `?id=` from query string, fetches booking from `/api/booking/[id]`, displays a success screen.

**State:**
- `booking: BookingData | null`
- `loading: boolean`
- `error: string | null`

**On mount:**
1. `router.query.id` → `bookingId`
2. `fetch("GET /api/booking/" + bookingId)`
3. Store result in state
4. Render: child name, course, date, time, email, booking ID

Shows a celebratory design with green checkmark, course badge, all booking details, and a note about mentor contact.

---

### 8.4 `src/app/login/page.tsx` — Login (`/login`)

**Fields:** Email, Password
**On submit:**
1. `fetch("POST /api/auth/login", { email, password })`
2. On success: redirect to `/`
3. On error: show error message below form

Link to `/signup` for new users.

---

### 8.5 `src/app/signup/page.tsx` — Sign Up (`/signup`)

**Fields:** Name, Email, Password
**On submit:**
1. `fetch("POST /api/auth/register", { name, email, password })`
2. On success: redirect to `/`
3. On error: show error message

Link to `/login` for existing users.

---

### 8.6 `src/app/mentors/page.tsx` — Mentors (`/mentors`)

Displays mentor cards for the current AKMIND mentors. Each card includes:
- Profile photo
- Name
- Title / designation
- Areas of expertise (tags)
- Short bio

**Current mentors:**
1. **Akhil Raj** — AI & Machine Learning Specialist. Expertise: Python, TensorFlow, Computer Vision, NLP
2. **Jebian Pious** — Full Stack AI Developer. Expertise: React, Node.js, AI APIs, Cloud Deployment
3. **Nagaraj** — Data Science & AI Educator. Expertise: Data Analysis, Pandas, Scikit-learn, Visualization

---

### 8.7 `src/app/curriculum/page.tsx` — Curriculum & Pricing (`/curriculum`)

**On mount:** Calls `detectCountryPricing()` to get localized prices.

**Displays 3 programs:**

**AI Explorers** (Beginner, ages 8–12)
- Introduction to AI concepts, block-based coding, fun projects
- Price: varies by country (₹2,999 in India, $59 USD)

**AI Builders** (Intermediate, ages 12–15)
- Python programming, ML basics, real-world projects
- Price: varies by country (₹4,999 in India, $99 USD)

**AI Innovators** (Advanced, ages 15–18)
- Deep learning, neural networks, capstone AI project
- Price: varies by country (₹7,999 in India, $149 USD)

Each program card has a "Book Free Demo" CTA linking to `/register`.

---

### 8.8 `src/app/careers/page.tsx` — Careers (`/careers`)

**Two sections:**

**Open Positions:** 4 job cards with role name, type (Full-time/Part-time), location, and brief description.

**Application Form:**
- Fields: Name, Email, Phone (Indian 10-digit), Role (dropdown), LinkedIn (optional), Portfolio/GitHub (optional), Message, How did you hear about us? (optional)
- On submit: `fetch("POST /api/careers", body)`
- On success: Show success message
- On error: Show error from server

---

### 8.9 `src/app/contact/page.tsx` — Contact (`/contact`)

**What it does:** Displays AKMIND's contact information and a pre-filled `mailto:` link. When the user clicks "Send Message", it opens their default email client with:
- **To:** `hello@akmind.com`
- **Subject:** Pre-filled from form
- **Body:** Pre-filled from form message

No API call is made. This is a pure client-side `mailto:` form.

---

### 8.10 `src/app/about/page.tsx` — About (`/about`)

Displays AKMIND's founding story, mission statement, team stats, and core values. Static page with no API calls.

---

### 8.11 `src/app/reviews/page.tsx` — Reviews (`/reviews`)

Displays a grid of student testimonials with name, age, grade, course, photo, and quote. Static page.

---

### 8.12 `src/app/become-mentor/page.tsx` — Become a Mentor (`/become-mentor`)

Landing page explaining the benefits of becoming an AKMIND mentor, requirements, and a CTA that links to `/careers` for the AI Mentor role.

---

### 8.13 Legal Pages

- `src/app/privacy-policy/page.tsx` — Full privacy policy text
- `src/app/terms-and-conditions/page.tsx` — Full terms and conditions text

Both are static pages with no API interaction.

---

## 9. COMPONENTS — WORD FOR WORD

### 9.1 `Navbar.tsx`
Fixed top navigation bar. Contains:
- AKMIND logo (links to `/`)
- Nav links: Programs (dropdown), Mentors, Curriculum, About, Careers
- Auth buttons: "Login" → `/login`, "Sign Up" → `/signup`
- On scroll: background becomes opaque with shadow

On mobile: hamburger menu that slides in the same links.

---

### 9.2 `Footer.tsx`
Dark-themed footer with:
- AKMIND logo + tagline
- Link columns: Programs, Company, Legal
- Social media icons: LinkedIn, Twitter/X, Instagram, YouTube
- Copyright notice: "© 2024 AKMIND. All rights reserved. Bangalore, India."

---

### 9.3 `HeroSection.tsx`
Above-the-fold hero with:
- **Auto-typing text animation:** Cycles through 6 phrases every 3 seconds
  - "Build AI Projects"
  - "Learn Machine Learning"
  - "Code with Python"
  - "Create Smart Apps"
  - "Explore Data Science"
  - "Master Deep Learning"
- **Hero image carousel:** 4 images (slide1.png – slide4.png) that auto-advance every 5 seconds
- **"Book Free Demo" CTA button:** Links to `/register`. Has magnetic hover effect (button moves toward cursor).
- **Scroll-down arrow** that bounces

---

### 9.4 `AIProgramsSection.tsx`
Three program cards in a responsive grid:
- **AI Explorers** — Icon, title, description, age range, CTA
- **AI Builders** — Icon, title, description, age range, CTA
- **AI Innovators** — Icon, title, description, age range, CTA

Each card has a hover scale effect and links to `/register`.

---

### 9.5 `WhyChoose.tsx`
Value proposition section with 6 feature items:
1. Expert Mentors — Industry professionals
2. Gamified Learning — Points, badges, leaderboards
3. Project-Based — Real-world AI projects
4. Flexible Schedule — Choose your time slot
5. Small Batches — Personalized attention
6. Certificate — On completion

---

### 9.6 `HowItWorks.tsx`
4-step process visualization:
1. **Choose a Program** — Select the right course for your child's age
2. **Book a Free Demo** — Try a class before committing
3. **Start Learning** — Join live sessions with expert mentors
4. **Build Projects** — Create real AI applications

Each step has a numbered icon and description.

---

### 9.7 `HowAKMINDWorks.tsx`
Cinematic 5-step method presentation with Framer Motion animations. Shows AKMIND's unique teaching methodology with animated illustrations for each step.

---

### 9.8 `GamificationShowcase.tsx`
Visual showcase of the gamification system:
- Points and XP bar
- Badges and achievements
- Leaderboard
- Progress milestones

Animated with Framer Motion.

---

### 9.9 `AIBotCinematic.tsx`
Animated AI bot character section. Shows a stylized robot/AI bot with particle effects and floating elements. Used to illustrate the AI learning experience.

---

### 9.10 `Educators.tsx`
Mentor/educator showcase grid. Pulls from a hardcoded array of mentor data:
- Name, title, photo, expertise tags, short bio
- Hover effect on cards
- "Meet All Mentors" CTA → `/mentors`

---

### 9.11 `StudentSpotlight.tsx`
Student success stories in a card carousel:
- Student photo, name, age, grade
- Course they took
- Quote about their experience
- Project they built

---

### 9.12 `SkillsForSuccess.tsx`
Displays a list/grid of skills students gain:
- Python Programming
- Machine Learning
- Data Analysis
- Computer Vision
- Natural Language Processing
- AI Project Development

---

### 9.13 `FAQ.tsx`
Accordion FAQ component. Each item expands/collapses on click. Questions cover:
- Age requirements
- Prerequisites
- Session duration
- Pricing
- Certificate
- Parent involvement

---

### 9.14 `TopPicks.tsx`
"Top Picks" section featuring highlighted programs or content — a curated selection of the most popular courses with brief summaries.

---

### 9.15 `LogoTicker.tsx`
An auto-scrolling horizontal ticker of partner/technology logos. Uses CSS animation to loop infinitely. Examples: Python, TensorFlow, OpenAI, etc.

---

### 9.16 `StatsRow.tsx`
A row of key metrics displayed prominently:
- Number of students enrolled
- Number of expert mentors
- Number of AI projects built
- Countries reached
- Student satisfaction %

---

### 9.17 `ScrollReveal.tsx`
A wrapper component that uses Framer Motion's `useInView` hook to trigger an entrance animation when the wrapped content scrolls into the viewport.

```tsx
<ScrollReveal>
  <YourComponent />
</ScrollReveal>
```

Default animation: fade up (opacity 0→1, y 40→0).

---

### 9.18 `ScrollProgressBar.tsx`
A thin colored bar fixed at the very top of the viewport (above the navbar). It fills from left to right as the user scrolls down the page. Uses `useScroll` from Framer Motion.

---

### 9.19 `FloatingCTA.tsx`
A sticky "Book Free Demo" button fixed in the bottom-right corner of the screen. Appears after scrolling 300px from the top. Links to `/register`. Has a pulse animation.

---

### 9.20 `PhoneInput.tsx`
International phone number input with:
- Flag emoji + country code dropdown (194 countries)
- Searchable country list
- Phone number text input
- Combines dial code + number into `phone` field value (e.g. `+91 9876543210`)

Used in the booking wizard Step 1 and the careers form.

---

### 9.21 `ParentalGuidelines.tsx`
Informational section for parents about:
- Recommended device/screen setup
- Parent involvement during sessions
- Content safety and age-appropriateness
- Session recording policy

---

### 9.22 `ChooseYourCourse.tsx`
A standalone course selection component (alternative to the full curriculum page). Displays the 3 courses with key info and CTA buttons. Used in various contexts on the site.

---

## 10. AUTHENTICATION & SESSIONS

AKMIND uses **custom authentication** — no OAuth, no Cognito (even though it's imported). Everything runs on DynamoDB + bcryptjs + HMAC.

### Sign Up Flow
```
User fills /signup form
     ↓
POST /api/auth/register
     ↓
Zod validation
     ↓
Check email not taken (DynamoDB Query on email-index)
     ↓
bcrypt.hash(password, 10) → passwordHash
     ↓
DynamoDB PutItem to akmind-users
     ↓
createSessionCookiePayload(user)
     ↓
Set-Cookie: akmind_session=<encoded>.<signature>
     ↓
Return { success: true, user: { id, email, name } }
```

### Login Flow
```
User fills /login form
     ↓
POST /api/auth/login
     ↓
Zod validation
     ↓
DynamoDB Query on email-index → find user by email
     ↓
bcrypt.compare(password, user.passwordHash)
     ↓
If match: createSessionCookiePayload → Set-Cookie
     ↓
Return { success: true, user }
```

### Session Verification (on /api/auth/me)
```
Request arrives with Cookie: akmind_session=<encoded>.<signature>
     ↓
parseSessionCookie(cookieHeader)
     ↓
Split on last "." → [encoded, receivedSignature]
     ↓
HMAC-SHA256(encoded, sessionSecret) → expectedSignature
     ↓
timingSafeEqual(receivedSignature, expectedSignature)
     ↓
If match: JSON.parse(base64url.decode(encoded)) → { id, email, name }
     ↓
getUserById(id) → verify user still exists in DynamoDB
     ↓
Return { authenticated: true, user }
```

### Session Cookie Details
```
Cookie name:  akmind_session
Format:       base64url(JSON payload) . hex(HMAC-SHA256 signature)
Duration:     7 days (604800 seconds)
Secure:       true in production
SameSite:     Lax
HttpOnly:     false (JavaScript-readable)
Path:         /
```

---

## 11. RATE LIMITING

All rate limiting is backed by the `akmind-rate-limits` DynamoDB table with TTL-based automatic expiry.

| Route | Key Format | Limit | Window |
|-------|-----------|-------|--------|
| POST /api/auth/register | `rl#auth:<ip>` | 5 req | 15 min |
| POST /api/auth/login | `rl#auth:<ip>` | 5 req | 15 min |
| POST /api/register | `rl#booking:<ip>` | 3 req | 1 hour |
| GET /api/auth/me | `rl#general:<ip>` | 60 req | 60 sec |
| GET /api/booking/[id] | `rl#general:<ip>` | 60 req | 60 sec |

When the limit is exceeded, the API returns:
```json
HTTP 429 Too Many Requests
{ "error": "Too many requests. Please try again later." }
```

The DynamoDB TTL field (`ttl`) is set to `current Unix time + windowSeconds`. DynamoDB automatically deletes expired records, resetting the counter for the next window.

---

## 12. EMAIL SERVICE (AWS SES)

Region: `ap-south-1` (Mumbai, India)

**Required SES setup:**
1. Verify `hello@akmind.com` as sender identity
2. Verify `admin@akmind.com` as recipient (while in sandbox mode)
3. Request production access (to email any address)

**Email trigger points:**

| Trigger | Emails sent |
|---------|-------------|
| User signs up (`/api/auth/register`) | Welcome email to user |
| Demo booked (`/api/register`) | Admin notification + Parent confirmation |
| Career application (`/api/careers`) | Admin notification + Applicant confirmation |

All emails use `SendEmailCommand` from `@aws-sdk/client-ses` with `Message.Body.Html.Data` for HTML content.

---

## 13. EXTERNAL INTEGRATIONS

### 13.1 Google Sheets (Booking Log)
- **Trigger:** Every successful demo booking via `POST /api/register`
- **Method:** HTTP POST to `process.env.GAS_WEBHOOK_URL`
- **Payload:** Full booking JSON object
- **Behavior:** Non-blocking — the booking is saved to DynamoDB and the response is returned to the user first. The Google Sheets sync happens in the background via `void fetch(...)`. If it fails, the booking is still saved.
- **Google Apps Script:** A web app deployed on Google Workspace that receives the POST and appends a row to the spreadsheet.

### 13.2 ipapi.co (IP Geolocation)
- **Purpose:** Detect user's country for localized pricing
- **Endpoint:** `https://ipapi.co/json/`
- **Timeout:** 3000ms (AbortSignal)
- **Used in:** `src/lib/pricing.ts` → `src/app/curriculum/page.tsx`
- **Fallback:** USD pricing if request fails or country not in list

---

## 14. SECURITY LAYERS

### Layer 1: Input Validation
- Zod schemas on all POST routes (register, login, booking)
- Manual validation on careers route (email regex, phone regex, role whitelist)
- Payload size limit: 10 KB max (middleware)
- Content-Type enforcement: `application/json` only (middleware)

### Layer 2: Authentication
- Passwords hashed with bcryptjs (10 rounds)
- Sessions signed with HMAC-SHA256
- Signature verified with `crypto.timingSafeEqual` (prevents timing attacks)
- Session cookie `SameSite: Lax` (CSRF mitigation)

### Layer 3: Rate Limiting
- DynamoDB-backed atomic counters
- IP-based tracking via `x-forwarded-for`
- Different limits per endpoint type

### Layer 4: HTTP Headers (next.config.ts)
```
Content-Security-Policy:   default-src 'self'; script-src 'self' 'unsafe-inline'; ...
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options:    nosniff
X-Frame-Options:           DENY
Referrer-Policy:           strict-origin-when-cross-origin
```

### Layer 5: Database
- Booking ID length check before DynamoDB query (max 64 chars)
- Email uniqueness enforced via query before insert (not DynamoDB constraint)
- All queries use parameterized `ExpressionAttributeValues` (no injection risk in DynamoDB)

---

## 15. FRONTEND-TO-BACKEND DATA FLOW

### Complete Booking Flow
```
1. User visits /register
2. Fills 4-step wizard (React state, no API calls during steps)
3. Clicks "Confirm Booking" on Step 4

4. fetch("POST /api/register", {
     parentName, phone, email, childName, grade, course, date, time
   })

5. API Route:
   → Rate limit check (DynamoDB)
   → Zod validation
   → DynamoDB PutItem (akmind-bookings)
   → void fetch(GAS_WEBHOOK_URL)     ← non-blocking
   → SES email to admin
   → SES email to parent
   → return { bookingId }

6. Client receives { bookingId }
7. router.push("/confirmation?id=" + bookingId)

8. Confirmation page: fetch("GET /api/booking/" + bookingId)
9. Display booking details
```

### Complete Auth Flow
```
1. User visits /signup, fills form
2. fetch("POST /api/auth/register", { name, email, password })
3. API validates → bcrypt hash → DynamoDB save → set cookie
4. Client receives { user } + cookie is set automatically
5. Client redirects to /

6. Navbar calls fetch("GET /api/auth/me") on mount
7. Reads akmind_session cookie → verifies HMAC → DynamoDB lookup
8. Returns { authenticated: true, user }
9. Navbar shows "Hi, {name}" and logout button
```

---

## 16. VALIDATION SCHEMAS (ZOD)

### Why Zod?
Zod validates at runtime AND provides TypeScript types from the same definition. One schema = both validation + type.

### Pattern used in API routes:
```typescript
const parsed = schema.safeParse(body)
if (!parsed.success) {
  return fail(
    parsed.error.errors.map(e => `${e.path.join(".")}: ${e.message}`).join("; "),
    422
  )
}
const data = parsed.data   // Fully typed, validated
```

### Field transformations:
- `z.string().email().toLowerCase().trim()` — emails are automatically normalized before saving to DynamoDB
- `z.string().trim()` — whitespace stripped from names
- `.optional()` on grade field — allows omission without error

---

## 17. PRICING SYSTEM

### How it works:
1. `src/app/curriculum/page.tsx` calls `detectCountryPricing()` on mount (client-side)
2. Makes a request to `ipapi.co/json/` to get `country_code`
3. Looks up the code in `PRICING` map
4. Displays prices in local currency

### Supported Countries:
| Country | Code | Currency | Explorers | Builders | Innovators |
|---------|------|----------|-----------|----------|------------|
| India | IN | INR (₹) | ₹2,999 | ₹4,999 | ₹7,999 |
| Australia | AU | AUD (A$) | A$79 | A$129 | A$199 |
| Singapore | SG | SGD (S$) | S$69 | S$109 | S$169 |
| UAE | AE | AED (د.إ) | د.إ199 | د.إ329 | د.إ499 |
| Canada | CA | CAD (C$) | C$79 | C$129 | C$199 |
| Default (all others) | — | USD ($) | $59 | $99 | $149 |

---

## 18. DEPLOYMENT & INFRASTRUCTURE

### Hosting: AWS Amplify
- Connected to the GitHub `main` branch
- Auto-deploys on push
- Manages SSL/TLS certificates automatically
- Domain: `www.akmind.com` via Route 53 + GoDaddy nameservers

### Required AWS Services:
1. **DynamoDB** — 3 tables: `akmind-users`, `akmind-bookings`, `akmind-rate-limits`
   - `akmind-users`: GSI `email-index` with partition key `email`
   - `akmind-rate-limits`: Enable TTL attribute on field `ttl`
2. **SES** — Verify `hello@akmind.com` and `admin@akmind.com`, request production access
3. **IAM** — Create user with permissions: `dynamodb:*` on tables, `ses:SendEmail`
4. **Amplify** — Add all 11 env vars in Amplify console

### Build Command:
```bash
npm run build   # next build
```

### Dev Command:
```bash
npm run dev     # next dev
```

### Pre-Launch Checklist:
- [ ] All 11 env vars set in Amplify
- [ ] DynamoDB tables created with correct schemas and GSI
- [ ] TTL enabled on `akmind-rate-limits.ttl` field
- [ ] SES production access (out of sandbox)
- [ ] SES email addresses verified
- [ ] GAS_WEBHOOK_URL set and Google Apps Script deployed
- [ ] Domain routing: `akmind.com` → `www.akmind.com`
- [ ] CSP headers tested
- [ ] Rate limiting tested end-to-end
- [ ] Booking email confirmed working

---

## 19. KEY MENTOR PROFILES

### Akhil Raj
- **Role:** AI & Machine Learning Specialist
- **Photo:** `public/images/mentors/akhil.jpg`
- **Expertise:** Python, TensorFlow, Computer Vision, Natural Language Processing
- **Bio:** Industry professional with hands-on AI project experience

### Jebian Pious
- **Role:** Full Stack AI Developer
- **Photo:** `public/images/mentors/jebian.jpg`
- **Expertise:** React, Node.js, AI APIs, Cloud Deployment
- **Bio:** Full stack developer specializing in integrating AI into web applications

### Nagaraj
- **Role:** Data Science & AI Educator
- **Photo:** `public/images/mentors/nagaraj.jpg`
- **Expertise:** Data Analysis, Pandas, Scikit-learn, Data Visualization
- **Bio:** Experienced educator bridging data science and AI for young learners

---

## 20. OPEN JOB ROLES

As listed on `/careers`:

| Role | Type | Location |
|------|------|----------|
| AI Mentor | Part-time / Full-time | Remote (India) |
| Curriculum Designer | Full-time | Bangalore / Remote |
| Student Success Manager | Full-time | Bangalore |
| Full Stack Developer | Full-time | Bangalore / Remote |

Application submitted via `POST /api/careers` → SES emails to admin and applicant.

---

## QUICK REFERENCE — KEY CONNECTIONS

```
User Browser
    │
    ├── GET /                    → page.tsx (22 components)
    ├── GET /register            → register/page.tsx
    ├── POST /api/register       → DynamoDB (akmind-bookings) + SES + Google Sheets
    ├── GET /confirmation?id=    → /api/booking/[id] → DynamoDB (akmind-bookings)
    ├── POST /api/auth/register  → DynamoDB (akmind-users) → Set-Cookie
    ├── POST /api/auth/login     → DynamoDB (akmind-users) → Set-Cookie
    ├── GET /api/auth/me         → Cookie parse → DynamoDB (akmind-users)
    ├── POST /api/careers        → SES (admin + applicant)
    └── GET /curriculum          → ipapi.co (pricing) → Static render

All /api/* routes:
    → middleware.ts (payload size, Content-Type)
    → safeHandler (error catching)
    → rate-limit.ts (DynamoDB: akmind-rate-limits)
    → Route handler
    → DynamoDB Document Client
    → Response
```

---

*Document last updated: 2026-03-25. This is the complete project bible for AKMIND v1.0.*
