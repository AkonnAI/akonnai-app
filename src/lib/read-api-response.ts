/**
 * Read a fetch Response as JSON without throwing SyntaxError on HTML/plain error bodies.
 */
export async function readApiJson(res: Response): Promise<Record<string, unknown>> {
  const text = await res.text();
  if (!text.trim()) return {};
  try {
    const parsed: unknown = JSON.parse(text);
    if (parsed !== null && typeof parsed === "object" && !Array.isArray(parsed)) {
      return parsed as Record<string, unknown>;
    }
    return {};
  } catch {
    throw new Error(
      "The server did not return valid JSON (often a crash or misconfigured API). Check the terminal running `next dev` and your .env.local (AWS, DynamoDB, AUTH_SESSION_SECRET)."
    );
  }
}
