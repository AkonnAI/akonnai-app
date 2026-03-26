import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { env } from "./env";

let client: DynamoDBDocumentClient | null = null;

export function getDb() {
  if (!client) {
    const hasStaticCreds =
      Boolean(env.awsAccessKeyId?.trim()) &&
      Boolean(env.awsSecretAccessKey?.trim());
    const ddb = new DynamoDBClient({
      region: env.awsRegion,
      ...(hasStaticCreds
        ? {
            credentials: {
              accessKeyId: env.awsAccessKeyId!,
              secretAccessKey: env.awsSecretAccessKey!,
            },
          }
        : {}),
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
