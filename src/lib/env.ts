// Amplify reserves AWS_* variable names — user stores credentials under custom names.
// Fall back to custom names (ACCESS_KEY_ID, SECRET_ACCESS_KEY, REGION) when AWS_* are absent.
const region =
  process.env.AWS_REGION ||
  process.env.REGION ||
  "";

const required: Record<string, string | undefined> = {
  AWS_REGION: region,
  DYNAMODB_USERS_TABLE: process.env.DYNAMODB_USERS_TABLE,
  DYNAMODB_BOOKINGS_TABLE: process.env.DYNAMODB_BOOKINGS_TABLE,
  COGNITO_USER_POOL_ID: process.env.COGNITO_USER_POOL_ID,
  COGNITO_CLIENT_ID: process.env.COGNITO_CLIENT_ID,
  // AUTH_SESSION_SECRET validated separately — Amplify filters SECRET vars
  // from the build shell so it cannot be written to .env.production via printf.
  // Auth routes validate it at call time; booking routes do not need it.
};

// Skip validation during Next.js build — vars are only required at runtime
const isBuildPhase = process.env.NEXT_PHASE === "phase-production-build";

if (!isBuildPhase) {
  const missing = Object.entries(required)
    .filter(([_, v]) => !v)
    .map(([k]) => k);
  if (missing.length > 0)
    throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
}

export const env = {
  // Credentials: prefer custom Amplify var names (since AWS_* prefix is reserved)
  awsAccessKeyId:
    process.env.ACCESS_KEY_ID ||
    process.env.AWS_ACCESS_KEY_ID,
  awsSecretAccessKey:
    process.env.SECRET_ACCESS_KEY ||
    process.env.AWS_SECRET_ACCESS_KEY,
  awsRegion: region || "ap-south-1",
  usersTable: process.env.DYNAMODB_USERS_TABLE!,
  bookingsTable: process.env.DYNAMODB_BOOKINGS_TABLE!,
  cognitoUserPoolId: process.env.COGNITO_USER_POOL_ID!,
  cognitoClientId: process.env.COGNITO_CLIENT_ID!,
  sesFrom: process.env.SES_FROM_EMAIL ?? "",
  sesAdmin: process.env.SES_ADMIN_EMAIL ?? "",
  gasWebhookUrl: process.env.GAS_WEBHOOK_URL ?? "",
  sessionSecret: process.env.AUTH_SESSION_SECRET!,
};
