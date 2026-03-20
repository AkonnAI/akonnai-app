import { NextResponse } from "next/server";

export const ok = (data: unknown, status = 200) =>
  NextResponse.json({ success: true, ...(data as object) }, { status });

export const fail = (message: string, status: number) =>
  NextResponse.json({ error: message }, { status });

export const validationFail = (errors: unknown) =>
  NextResponse.json({ error: "Validation failed", details: errors }, { status: 422 });
