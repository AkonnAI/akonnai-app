import { NextRequest, NextResponse } from "next/server";

type Handler = (req: NextRequest, ctx?: unknown) => Promise<NextResponse>;

export function safeHandler(fn: Handler): Handler {
  return async (req, ctx) => {
    try {
      return await fn(req, ctx);
    } catch (err) {
      console.error("[API Error]", err);
      return NextResponse.json(
        {
          success: false,
          error: "Something went wrong. Please try again.",
        },
        { status: 500 }
      );
    }
  };
}
