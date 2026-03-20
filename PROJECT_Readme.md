# AKMIND v1.0 — Project Documentation

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
7. [Frontend Pages](#7-frontend-pages)
8. [Components](#8-components)
9. [Backend API Routes](#9-backend-api-routes)
10. [Demo Booking Flow](#10-demo-booking-flow)
11. [Email Notifications](#11-email-notifications)
12. [Third-Party Integrations](#12-third-party-integrations)
13. [Styling & Design System](#13-styling--design-system)
14. [Startup & Development](#14-startup--development)
15. [Key Data Flows](#15-key-data-flows)

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
| **Next.js** | 16.1.6 | React framework (App Router) |
| **React** | 19.2.3 | UI library |
| **TypeScript** | 5 | Type-safe JavaScript |
| **Tailwind CSS** | 4 | Utility-first styling |
| **Framer Motion** | 12.34.0 | Animations & transitions |
| **Lucide React** | 0.564.0 | Icon library |
| **clsx** | 2.1.1 | Conditional classnames |
| **tailwind-merge** | 3.4.1 | Tailwind class deduplication |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| **Node.js** | — | Runtime (via Next.js) |
| **Next.js API Routes** | — | Serverless API endpoints |
| **bcryptjs** | 2.4.3 | Password hashing |
| **nodemailer** | 6.9.16 | Email sending (SMTP) |

### Data Storage
| Storage | Purpose |
|---|---|
| **JSON file** (`data/users.json`) | Parent account database |
| **sessionStorage** (browser) | Temp registration wizard data |
| **Google Apps Script (GAS)** | Demo booking CRM (Google Sheets) |

### Fonts & Assets
- **Outfit** (Google Fonts) — Primary typeface
- Custom SVG brand assets
- Animated GIFs and MP4 video (intro)

---

## 3. Project Structure

```
akmind-v1.0-master/
│
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── api/                      # Backend API endpoints
│   │   │   ├── auth/
│   │   │   │   ├── login/
│   │   │   │   │   └── route.ts      # POST /api/auth/login
│   │   │   │   ├── logout/
│   │   │   │   │   └── route.ts      # POST /api/auth/logout
│   │   │   │   ├── me/
│   │   │   │   │   └── route.ts      # GET /api/auth/me
│   │   │   │   └── register/
│   │   │   │       └── route.ts      # POST /api/auth/register
│   │   │   └── register/
│   │   │       └── route.ts          # POST /api/register (demo booking)
│   │   │
│   │   ├── about/
│   │   │   └── page.tsx              # About Us page
│   │   ├── become-mentor/
│   │   │   └── page.tsx              # Become a Mentor page
│   │   ├── careers/
│   │   │   └── page.tsx              # Careers/Jobs page
│   │   ├── confirmation/
│   │   │   └── page.tsx              # Demo booking confirmation
│   │   ├── contact/
│   │   │   └── page.tsx              # Contact Us page
│   │   ├── curriculum/
│   │   │   └── page.tsx              # Program curriculum details
│   │   ├── login/
│   │   │   └── page.tsx              # Parent login page
│   │   ├── mentors/
│   │   │   └── page.tsx              # Meet the Mentors page
│   │   ├── register/
│   │   │   └── page.tsx              # Demo class booking wizard
│   │   ├── reviews/
│   │   │   └── page.tsx              # Student reviews & testimonials
│   │   ├── signup/
│   │   │   └── page.tsx              # Parent account signup
│   │   │
│   │   ├── page.tsx                  # Home/Landing page
│   │   ├── layout.tsx                # Root layout (fonts, metadata)
│   │   ├── globals.css               # Global styles
│   │   └── favicon.ico
│   │
│   ├── components/                   # Reusable React components
│   │   ├── AIProgramsSection.tsx     # 3D tilt program cards
│   │   ├── ChooseYourCourse.tsx      # Course selection UI
│   │   ├── Educators.tsx             # Educator/mentor showcase
│   │   ├── FAQ.tsx                   # Tabbed FAQ accordion
│   │   ├── Footer.tsx                # Site footer
│   │   ├── HeroSection.tsx           # Animated landing hero
│   │   ├── HowItWorks.tsx            # 3-step process section
│   │   ├── LogoTicker.tsx            # Scrolling logos ticker
│   │   ├── Navbar.tsx                # Navigation with dropdowns
│   │   ├── ScrollProgressBar.tsx     # Page scroll indicator bar
│   │   ├── SkillsForSuccess.tsx      # Skills highlight section
│   │   ├── StatsRow.tsx              # Key statistics display
│   │   ├── StudentSpotlight.tsx      # Student testimonials
│   │   ├── TopPicks.tsx              # Featured program card
│   │   └── WhyChoose.tsx             # USP/differentiators section
│   │
│   └── lib/
│       └── auth.ts                   # Auth utilities (hash, session, verify)
│
├── data/
│   └── users.json                    # Parent accounts (JSON database)
│
├── public/
│   ├── images/                       # Hero slides, program images
│   ├── media/                        # GIFs, intro.mp4 video
│   └── *.svg                         # Brand/logo SVG assets
│
├── .env.local                        # Environment variables (secrets)
├── .gitignore
├── eslint.config.mjs                 # ESLint configuration
├── next.config.ts                    # Next.js configuration
├── package.json                      # Project dependencies & scripts
├── package-lock.json
├── postcss.config.mjs                # PostCSS / Tailwind config
├── start_all.cmd                     # Windows one-click startup script
├── tsconfig.json                     # TypeScript configuration
└── README.md                         # Basic Next.js setup notes
```

---

## 4. Environment Configuration

File: **`.env.local`**

```env
# Session security — HMAC-SHA256 signing key for auth cookies
AUTH_SESSION_SECRET=akmind-super-secret-session-key-2024-x9q2

# Admin email that receives demo booking notifications
REGISTRATION_NOTIFY_EMAIL=admin@akonnai.ai

# Gmail SMTP credentials for sending emails
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=hebelniraj015@gmail.com
SMTP_PASS=afyzecittpwhnaab
```

### Security Notes
- Session cookies are signed with **HMAC-SHA256** (using `AUTH_SESSION_SECRET`)
- All passwords are hashed with **bcryptjs at 10 salt rounds** — never stored in plain text
- Cookies are `httpOnly` (not accessible via JS), `secure` in production, expire after **7 days**
- Email failures are non-blocking — booking still succeeds if email sending fails

---

## 5. Database & Data Storage

### User Accounts — `data/users.json`

A flat-file JSON database that stores registered parent accounts.

**Schema:**
```typescript
type UserRecord = {
  id: string;           // Unique: `${Date.now()}-${Math.random().toString(36)}`
  email: string;        // Lowercase, trimmed — must be unique
  name: string;         // Trimmed display name
  passwordHash: string; // bcryptjs hash (10 rounds)
  createdAt: string;    // ISO 8601 timestamp, e.g. "2024-11-15T09:30:00.000Z"
}

type UsersDb = {
  users: UserRecord[];
}
```

**Example entry:**
```json
{
  "users": [
    {
      "id": "1731659400000-k3m9x",
      "email": "parent@example.com",
      "name": "Priya Sharma",
      "passwordHash": "$2a$10$...",
      "createdAt": "2024-11-15T09:30:00.000Z"
    }
  ]
}
```

### Demo Registration Data — Browser `sessionStorage`

Temporarily held in the browser between the 4-step registration wizard and the confirmation page.

```typescript
type RegistrationData = {
  parentName: string;   // Parent/Guardian full name
  phone: string;        // Contact mobile number
  email: string;        // Parent email address
  childName: string;    // Student's name
  grade: string;        // e.g. "Grade 6"
  course: string;       // e.g. "AI Builders"
  date: string;         // Booking date: "YYYY-MM-DD"
  time: string;         // Booking time: e.g. "4:00 PM - 7:00 PM"
}
```

---

## 6. Authentication & Session Management

File: **`src/lib/auth.ts`**

### `registerUser(name, email, password)`
1. Validates all fields are present
2. Normalises email (lowercase + trim)
3. Checks `data/users.json` for duplicate email
4. Hashes password with bcryptjs (10 rounds)
5. Generates unique ID: `` `${Date.now()}-${Math.random().toString(36)}` ``
6. Appends new user to `data/users.json`
7. Returns user object (no `passwordHash` field)

### `verifyUser(email, password)`
1. Loads users from `data/users.json`
2. Finds user by email (case-insensitive)
3. Runs `bcrypt.compare(password, hash)`
4. Returns user object on success, throws generic error on failure

### `createSessionCookiePayload(user)`
1. Builds payload: `{ id, email, name }`
2. Base64URL-encodes JSON payload
3. Signs with HMAC-SHA256 using `AUTH_SESSION_SECRET`
4. Returns: `base64url(JSON).hex(HMAC_signature)`
5. Sets cookie as `httpOnly`, `SameSite=Lax`, 7-day expiry

### `parseSessionCookie(cookieHeader)`
1. Extracts `akmind_session` from cookie header
2. Splits value into `[payload, signature]`
3. Recomputes HMAC signature and compares
4. Returns parsed user object if valid, `null` if invalid/tampered

### `clearSessionCookie()`
Returns a cookie object with `maxAge: 0` to expire the session immediately.

---

## 7. Frontend Pages

### Home — `/`
**File:** `src/app/page.tsx`

The landing page. Assembles all home-page section components in order:
- `<HeroSection />` → `<LogoTicker />` → `<StatsRow />` → `<AIProgramsSection />` → `<TopPicks />` → `<HowItWorks />` → `<WhyChoose />` → `<SkillsForSuccess />` → `<Educators />` → `<StudentSpotlight />` → `<FAQ />`

---

### Login — `/login`
**File:** `src/app/login/page.tsx` (~109 lines)

Parent login form.
- Fields: Email, Password
- On submit: `POST /api/auth/login`
- On success: redirects to `/`
- On failure: displays inline error message
- Link to `/signup` for new users

---

### Sign Up — `/signup`
**File:** `src/app/signup/page.tsx` (~128 lines)

New parent account creation form.
- Fields: Full Name, Email, Password (min 6 characters)
- On submit: `POST /api/auth/register`
- On success: session cookie set, redirect to `/`
- Sends welcome email to parent via SMTP
- Link to `/login` for existing users

---

### Register (Demo Booking) — `/register`
**File:** `src/app/register/page.tsx` (~222 lines)

A 4-step multi-page wizard for booking a free demo class:

| Step | Fields |
|---|---|
| **Step 1 — Parent Details** | Parent/Guardian Name, Phone Number, Email |
| **Step 2 — Student Details** | Child's Name, Grade (5–10) |
| **Step 3 — Course Selection** | Choose from AI Explorers / Builders / Innovators |
| **Step 4 — Schedule** | Pick a date + time slot (4 PM – 7 PM) |

- State is preserved between steps in React state
- On final submit: sends data to `POST /api/register`
- Stores form data in `sessionStorage` before navigating to confirmation

---

### Confirmation — `/confirmation`
**File:** `src/app/confirmation/page.tsx` (~89 lines)

Post-booking confirmation screen.
- Reads registration data from `sessionStorage`
- Displays booking summary: child name, grade, course, date, time
- Shows email confirmation status (success/failure notice)
- CTA to return home or explore more

---

### About — `/about`
**File:** `src/app/about/page.tsx` (~83 lines)

Company information page.
- Mission & Vision statements
- Core Values
- Key statistics: 500+ students, founded 2023
- Team section

---

### Contact — `/contact`
**File:** `src/app/contact/page.tsx` (~125 lines)

Contact page with:
- Contact form (name, email, message)
- Email: info@akonnai.ai
- Phone number
- Office location
- "Book Free Demo" CTA button

---

### Curriculum — `/curriculum`
**File:** `src/app/curriculum/page.tsx`

Detailed breakdown of what each program covers — topics, tools, projects, and learning outcomes for AI Explorers, Builders, and Innovators.

---

### Mentors — `/mentors`
**File:** `src/app/mentors/page.tsx`

Profiles of AKMIND's mentor team — background, expertise, industry experience, and teaching philosophy.

---

### Become a Mentor — `/become-mentor`
**File:** `src/app/become-mentor/page.tsx`

Application page for industry professionals who want to teach on AKMIND. Form or expression-of-interest flow.

---

### Reviews — `/reviews`
**File:** `src/app/reviews/page.tsx`

Student and parent testimonials, success stories, and project showcases.

---

### Careers — `/careers`
**File:** `src/app/careers/page.tsx`

Open positions at AKMIND — role listings, responsibilities, and application instructions.

---

## 8. Components

### `Navbar.tsx` (~387 lines)
Sticky top navigation bar.
- **Logo** with brand name
- **Dropdown menus:**
  - *Programs* → AI Explorers, AI Builders, AI Innovators
  - *AI Mentors* → Meet Mentors, Become a Mentor
  - *About AKMIND* → About, Curriculum, Reviews, Careers, Contact
- **Auth state display:** Shows "Login / Sign Up" buttons OR logged-in user name with profile dropdown
- **Profile dropdown:** Displays user name, email, and Logout button
- **Mobile menu:** Hamburger-toggled full-screen nav for small screens
- Polls `GET /api/auth/me` on mount to detect active session

---

### `Footer.tsx` (~132 lines)
4-column footer.
- Brand logo + tagline + social links (Instagram, LinkedIn, YouTube)
- *Programs:* AI Explorers, AI Builders, AI Innovators
- *Company:* About, Curriculum, Mentors, Careers, Contact
- *Contact:* Email, phone
- "Book Free Trial" CTA button

---

### `HeroSection.tsx` (~215 lines)
The landing page hero — the first thing visitors see.
- **Animated headline** with typewriter-effect rotating phrases
- **Gradient animated text** (8-second colour cycle)
- **Auto-rotating image slideshow** (4 slides, auto-advances)
- **Magnetic CTA button** — cursor attraction effect on hover
- Two CTAs: "Book Demo Class" (`/register`) and "View Curriculum" (`/curriculum`)
- Background: dot-grid pattern with gradient overlay

---

### `AIProgramsSection.tsx` (~150 lines)
Three program cards displayed side by side.
- Each card has a **3D tilt effect** driven by mouse cursor position (`transform: perspective(800px) rotateX() rotateY()`)
- Gradient borders (indigo→purple, purple→pink, blue→indigo)
- Badge labels: Beginner Friendly / Most Popular / Advanced
- Program name, grade range, brief description
- "Learn More" CTA per card

---

### `TopPicks.tsx`
Featured program highlight — showcases **AI Builders (Grades 7–8)** as the most popular choice with a larger, emphasised card design.

---

### `HowItWorks.tsx`
Three-step process visual:
1. **Share Student Details** — tell us about your child
2. **Explore Curriculum** — see what they'll learn
3. **Start Learning** — book and begin
Includes an embedded `intro.mp4` video.

---

### `LogoTicker.tsx`
Horizontally scrolling ticker of tool/technology logos — Python, TensorFlow, OpenCV, etc. Infinite loop animation at 30-second duration.

---

### `StatsRow.tsx`
Highlights key numbers:
- 500+ Students
- Expert mentors
- Real AI projects built
- etc.

---

### `WhyChoose.tsx`
USP/differentiator section explaining what sets AKMIND apart:
- Industry expert mentors
- Hands-on projects (not just theory)
- Small batch sizes for personal attention
- Certificates on completion

---

### `SkillsForSuccess.tsx`
Visual display of skills students will gain:
- Python Programming
- Machine Learning
- Computer Vision
- Data Analysis
- Problem Solving
- etc.

---

### `Educators.tsx`
Snapshot of mentor profiles — photos, names, industry background, and areas of expertise.

---

### `StudentSpotlight.tsx`
Testimonial cards from students and parents — quotes, photos, grades, and what project they built.

---

### `FAQ.tsx` (~145 lines)
Accordion FAQ organised into 3 tabs:
- **AI Curriculum** — What is taught, tools used, project examples
- **Mentorship** — How 1-on-1 sessions work, mentor qualifications
- **Class Experience** — Class duration, schedule, how to join sessions

---

### `ScrollProgressBar.tsx`
A thin coloured bar fixed at the top of the page that grows from 0→100% as the user scrolls down. Built with `window.scrollY` listener.

---

### `ChooseYourCourse.tsx`
Interactive course selection widget — likely used on the curriculum or programs page to filter/display relevant program details based on grade selection.

---

## 9. Backend API Routes

### `POST /api/auth/register`
**File:** `src/app/api/auth/register/route.ts`

Creates a new parent account.

**Request body:**
```json
{
  "name": "Priya Sharma",
  "email": "priya@example.com",
  "password": "mypassword123"
}
```

**Validation:**
- All three fields required
- Password minimum 6 characters
- Email must not already exist in `users.json`

**On success:**
- Hashes password (bcrypt, 10 rounds)
- Appends user to `data/users.json`
- Creates and sets session cookie (7-day expiry)
- Sends welcome email to parent via SMTP
- Returns `200`:
```json
{ "success": true, "user": { "id": "...", "email": "...", "name": "..." } }
```

**On error:**
- `400` — Missing fields or password too short
- `409` — Email already registered
- `500` — Server error

---

### `POST /api/auth/login`
**File:** `src/app/api/auth/login/route.ts`

Authenticates a parent and creates a session.

**Request body:**
```json
{
  "email": "priya@example.com",
  "password": "mypassword123"
}
```

**Logic:**
- Finds user by email (case-insensitive)
- `bcrypt.compare(password, hash)`
- Sets session cookie on match

**Returns `200`:**
```json
{ "success": true, "user": { "id": "...", "email": "...", "name": "..." } }
```

**Returns `401`** on invalid credentials (generic message, no detail about which field failed — intentional for security).

---

### `POST /api/auth/logout`
**File:** `src/app/api/auth/logout/route.ts`

Clears the session cookie.

```json
{ "success": true }
```

---

### `GET /api/auth/me`
**File:** `src/app/api/auth/me/route.ts`

Verifies the current session from the cookie header.

**Returns `200` (authenticated):**
```json
{ "authenticated": true, "user": { "id": "...", "email": "...", "name": "..." } }
```

**Returns `200` (not authenticated):**
```json
{ "authenticated": false }
```

Used by `Navbar.tsx` on every page load to check login state.

---

### `POST /api/register`
**File:** `src/app/api/register/route.ts` (~143 lines)

Handles demo class booking. Does three things in parallel:

**1. Forwards to Google Apps Script (CRM)**
```
POST https://script.google.com/macros/s/AKfycby.../exec
Body: { parentName, phone, email, childName, grade, course, date, time }
```
Stores the booking in a Google Sheet for the AKMIND team.

**2. Sends admin notification email**
```
To: admin@akonnai.ai (REGISTRATION_NOTIFY_EMAIL)
Subject: "New Demo Booking — [childName] ([grade])"
Body: Full booking details
```

**3. Sends parent confirmation email**
```
To: [parent email]
Subject: "Your Demo Class is Booked! — AKMIND"
Body: Booking summary with date, time, course, what to expect
```

Both emails use nodemailer with Gmail SMTP. Email failures are non-blocking — if SMTP fails, the booking still succeeds (returns `200`).

**Request body:**
```json
{
  "parentName": "Priya Sharma",
  "phone": "9876543210",
  "email": "priya@example.com",
  "childName": "Aarav Sharma",
  "grade": "Grade 7",
  "course": "AI Builders",
  "date": "2024-12-01",
  "time": "4:00 PM - 5:00 PM"
}
```

**Returns `200`:**
```json
{ "success": true }
```

---

## 10. Demo Booking Flow

End-to-end walkthrough of a parent booking a demo class:

```
1. Parent visits /register
   │
   ├── Step 1: Enters name, phone, email
   ├── Step 2: Enters child name, selects grade
   ├── Step 3: Selects program (Explorers / Builders / Innovators)
   └── Step 4: Picks date & time slot → clicks "Confirm Booking"
                │
                ▼
2. Browser: saves form data to sessionStorage
                │
                ▼
3. Frontend: POST /api/register  (JSON body)
                │
       ┌────────┴────────┐
       ▼                 ▼
4a. Forward to        4b. Send admin email
    Google Apps            + parent confirmation
    Script (GAS)           email via SMTP
    (stores in
     Google Sheet)
                │
                ▼
5. Redirect to /confirmation
                │
                ▼
6. Confirmation page reads sessionStorage
   → Displays booking summary to parent
```

---

## 11. Email Notifications

### Welcome Email (on signup)
- **To:** New parent
- **Trigger:** Successful `POST /api/auth/register`
- **Content:** Welcome to AKMIND, link to book a demo, what to expect

### Admin Notification (on demo booking)
- **To:** `REGISTRATION_NOTIFY_EMAIL` (default: `admin@akonnai.ai`)
- **Trigger:** `POST /api/register`
- **Content:** Full booking details — parent name, phone, email, child name, grade, course, date, time

### Parent Booking Confirmation (on demo booking)
- **To:** Parent's email from registration form
- **Trigger:** `POST /api/register`
- **Content:** Booking summary, what to expect in the demo, contact info

All emails use **nodemailer** with Gmail SMTP (`smtp.gmail.com:587`, STARTTLS). Credentials set in `.env.local`.

---

## 12. Third-Party Integrations

### Google Apps Script (GAS)
- **URL:** `https://script.google.com/macros/s/AKfycbyKPtz_UBvC-_Xw9SiUvxJIXQMyblihzVCiZ6OatI1Q087Dq6vvLkFDP8pmnesFE7CP/exec`
- **Purpose:** Acts as a webhook to save demo bookings into a Google Sheet — serves as a lightweight CRM
- **Direction:** One-way POST from `api/register/route.ts`
- **Data:** Full registration object (parent + child + course + schedule)

### Gmail SMTP
- **Provider:** Google Gmail
- **Host:** `smtp.gmail.com`, Port `587` (STARTTLS)
- **Account:** `hebelniraj015@gmail.com`
- **Use:** All outbound emails — welcome, admin notification, booking confirmation

### Next.js Image Optimization
- Images served from `/public/images/` are optimised automatically
- Lazy loading, WebP conversion, size variants

### Google Fonts
- **Outfit** font family loaded via `next/font/google` in `layout.tsx`
- Applied globally as the primary typeface

---

## 13. Styling & Design System

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

### Gradients
- Hero text: Indigo → Purple → Pink (8s animated cycle)
- Program card borders: Indigo→Purple / Purple→Pink / Blue→Indigo
- CTA buttons: Indigo-600 → Purple-600

### Animations (Framer Motion)
| Animation | Component | Details |
|---|---|---|
| Typewriter effect | HeroSection | Cycles through 4 phrases |
| Gradient text shimmer | HeroSection | 8-second infinite cycle |
| Image slideshow | HeroSection | Auto-advances every 3s |
| Magnetic button | HeroSection | Mouse attraction effect |
| 3D tilt cards | AIProgramsSection | `perspective(800px)` on hover |
| Logo ticker scroll | LogoTicker | 30-second infinite loop |
| Scroll progress bar | ScrollProgressBar | Tracks `window.scrollY` |
| FAQ accordion | FAQ | Expand/collapse with spring physics |

### Typography
- **Font:** Outfit (Google Fonts), sans-serif
- **Headings:** Bold, large tracking, gradient where needed
- **Body:** Regular weight, Slate-600/700

### Layout
- Mobile-first responsive design
- Breakpoints: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px)
- Container max-width: typically `max-w-7xl mx-auto`
- Background texture: CSS dot-grid pattern on hero sections

---

## 14. Startup & Development

### Prerequisites
- Node.js 18+ (LTS recommended)
- npm

### Quick Start (Windows)
Double-click **`start_all.cmd`** — it will:
1. Detect if Node.js is installed; install via `winget` if missing
2. Run `npm install` if `node_modules/` doesn't exist
3. Start the dev server with `npm run dev`

Open **http://localhost:3000** in your browser.

### Manual Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
# → http://localhost:3000

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

### `start_all.cmd` (Windows Batch Script)
```batch
@echo off

:: Step 1: Check for Node.js
node -v >nul 2>&1
IF ERRORLEVEL 1 (
  echo Node.js not found. Installing via winget...
  winget install OpenJS.NodeJS.LTS
  echo Please restart this terminal and run start_all.cmd again.
  pause
  exit /b
)

:: Step 2: Install dependencies if needed
IF NOT EXIST "node_modules\" (
  echo Installing npm dependencies...
  npm install
)

:: Step 3: Start development server
echo Starting AKMIND dev server...
npm run dev
pause
```

### `package.json` (key fields)

```json
{
  "name": "akmind",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  },
  "dependencies": {
    "next": "16.1.6",
    "react": "^19.2.3",
    "react-dom": "^19.2.3",
    "framer-motion": "^12.34.0",
    "lucide-react": "^0.564.0",
    "nodemailer": "^6.9.16",
    "bcryptjs": "^2.4.3",
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
    "@types/nodemailer": "^6.4.17",
    "eslint": "^9"
  }
}
```

---

## 15. Key Data Flows

### User Registration Flow
```
/signup form submit
  → POST /api/auth/register
    → Validate fields (name, email, password)
    → Check email uniqueness in users.json
    → bcrypt.hash(password, 10)
    → Append to data/users.json
    → createSessionCookiePayload(user)
    → Set httpOnly cookie (7 days)
    → nodemailer: send welcome email to parent
  → 200 { success, user }
  → Client: redirect to /
```

### Login Flow
```
/login form submit
  → POST /api/auth/login
    → Find user in users.json by email
    → bcrypt.compare(password, hash)
    → createSessionCookiePayload(user)
    → Set httpOnly cookie (7 days)
  → 200 { success, user }
  → Client: redirect to /
```

### Session Check Flow (every page load)
```
Navbar mounts
  → GET /api/auth/me
    → Read "Cookie" header from request
    → parseSessionCookie: verify HMAC signature
    → Lookup user in users.json by ID
  → { authenticated: true, user } OR { authenticated: false }
  → Navbar: show user dropdown OR login/signup buttons
```

### Demo Booking Flow
```
/register (4-step form) → all fields filled → submit
  → Save to sessionStorage
  → POST /api/register
    → Parallel:
      ├── POST to GAS webhook (Google Sheet CRM)
      ├── nodemailer: admin notification email
      └── nodemailer: parent confirmation email
  → 200 { success: true }
  → Client: navigate to /confirmation
    → Read sessionStorage → display booking summary
```

### Logout Flow
```
User clicks Logout in Navbar profile dropdown
  → POST /api/auth/logout
    → clearSessionCookie() → maxAge: 0
  → Cookie cleared in browser
  → Client: reload or redirect to /
```

---

## Version History

| Commit | Description |
|---|---|
| `54287de` | feat: add new pages, navbar updates, and start_all.cmd setup script |
| `05cfd74` | feat: futuristic UI enhancements |
| `af25a19` | baseline: before futuristic UI enhancements |

---

*AKMIND v1.0 — Built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.*
*© 2024 AKonnai AI. All rights reserved.*
