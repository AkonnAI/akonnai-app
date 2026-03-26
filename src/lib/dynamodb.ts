import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { env } from "./env";

let client: DynamoDBDocumentClient | null = null;

export function getDb() {
  if (!client) {
    // Amplify reserves AWS_* variable names and auto-injects temp STS creds (ASIA* prefix).
    // The user's permanent IAM key is stored under custom names ACCESS_KEY_ID / SECRET_ACCESS_KEY.
    // Prefer the permanent AKIA key when available; fall back to Amplify's IAM role otherwise.
    const accessKeyId =
      process.env.ACCESS_KEY_ID ||        // Amplify custom var (permanent AKIA key)
      process.env.AWS_ACCESS_KEY_ID;      // Amplify auto-injected (temp ASIA key)
    const secretAccessKey =
      process.env.SECRET_ACCESS_KEY ||    // Amplify custom var
      process.env.AWS_SECRET_ACCESS_KEY;  // Amplify auto-injected
    const region =
      process.env.AWS_REGION ||           // Amplify auto-injected
      process.env.REGION ||               // Amplify custom var
      "ap-south-1";

    const clientConfig: Record<string, unknown> = { region };

    // Only use static creds if permanent AKIA key — skip temp STS (ASIA) tokens
    if (
      accessKeyId &&
      secretAccessKey &&
      !accessKeyId.startsWith("ASIA")
    ) {
      clientConfig.credentials = { accessKeyId, secretAccessKey };
    }

    const ddb = new DynamoDBClient(clientConfig);
    client = DynamoDBDocumentClient.from(ddb, {
      marshallOptions: { removeUndefinedValues: true },
    });
  }
  return client;
}

export const USERS_TABLE = env.usersTable;
export const BOOKINGS_TABLE = env.bookingsTable;
export const RATE_LIMIT_TABLE = "akmind-rate-limits";
