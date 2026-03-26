/** Static AWS keys are optional: Amplify / Lambda often use the default credential chain (IAM role). */
const required: Record<string, string | undefined> = {
  AWS_REGION: process.env.AWS_REGION,
  DYNAMODB_USERS_TABLE: process.env.DYNAMODB_USERS_TABLE,
  DYNAMODB_BOOKINGS_TABLE: process.env.DYNAMODB_BOOKINGS_TABLE,
  COGNITO_USER_POOL_ID: process.env.COGNITO_USER_POOL_ID,
  COGNITO_CLIENT_ID: process.env.COGNITO_CLIENT_ID,
  AUTH_SESSION_SECRET: process.env.AUTH_SESSION_SECRET,
};

// Skip validation during Next.js build — vars are only required at runtime
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
  awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
  awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  awsRegion: process.env.AWS_REGION!,
  usersTable: process.env.DYNAMODB_USERS_TABLE!,
  bookingsTable: process.env.DYNAMODB_BOOKINGS_TABLE!,
  cognitoUserPoolId: process.env.COGNITO_USER_POOL_ID!,
  cognitoClientId: process.env.COGNITO_CLIENT_ID!,
  sesFrom: process.env.SES_FROM_EMAIL ?? "",
  sesAdmin: process.env.SES_ADMIN_EMAIL ?? "",
  gasWebhookUrl: process.env.GAS_WEBHOOK_URL ?? "",
  sessionSecret: process.env.AUTH_SESSION_SECRET!,
};
