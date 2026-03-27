import crypto from "crypto";

export async function createDemoTokenForParent(
  email: string,
  parentName: string,
  childName: string,
  phone: string
): Promise<string> {
  try {
    const token = crypto.randomUUID().replace(/-/g, "").slice(0, 16);

    const demoAppUrl =
      process.env.DEMO_APP_URL ||
      process.env.NEXT_PUBLIC_DEMO_APP_URL ||
      "http://demo.akmind.com";

    const res = await fetch(`${demoAppUrl}/api/demo/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        parentName,
        email,
        phone,
        childName,
        presetToken: token,
        noExpiry: true,
        permanent: true,
        expiresAt: null,
      }),
    });

    if (!res.ok) {
      console.error("Demo register failed:", res.status, await res.text());
      return "";
    }

    return token;
  } catch (e) {
    console.error("Demo token error:", e);
    return "";
  }
}
