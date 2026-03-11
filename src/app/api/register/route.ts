import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const GAS_URL =
  "https://script.google.com/macros/s/AKfycbyKPtz_UBvC-_Xw9SiUvxJIXQMyblihzVCiZ6OatI1Q087Dq6vvLkFDP8pmnesFE7CP/exec";

export const runtime = "nodejs";

function createTransporter() {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) return null;

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

async function sendAdminNotificationEmail(registration: any) {
  const to = process.env.REGISTRATION_NOTIFY_EMAIL;
  if (!to) {
    console.warn("REGISTRATION_NOTIFY_EMAIL is not set; skipping admin email.");
    return;
  }

  const transporter = createTransporter();
  if (!transporter) {
    console.warn("SMTP configuration is incomplete; skipping admin email.");
    return;
  }

  const { parentName, phone, email, childName, grade, course, date, time } = registration || {};

  const subject = `New Demo Booking: ${childName || "Student"} (${course || "Course"})`;
  const text = [
    "A new demo class has been booked:",
    "",
    `Parent Name : ${parentName || "-"}`,
    `Parent Email: ${email || "-"}`,
    `Phone       : ${phone || "-"}`,
    `Student     : ${childName || "-"}`,
    `Grade       : ${grade || "-"}`,
    `Course      : ${course || "-"}`,
    `Date        : ${date || "-"}`,
    `Time        : ${time || "-"}`,
    "",
    `Submitted at: ${new Date().toLocaleString()}`,
  ].join("\n");

  await transporter.sendMail({
    from: `"AKMIND" <${process.env.SMTP_USER}>`,
    to,
    subject,
    text,
  });
}

async function sendParentConfirmationEmail(registration: any) {
  const { parentName, email, childName, course, date, time } = registration || {};
  if (!email) return;

  const transporter = createTransporter();
  if (!transporter) {
    console.warn("SMTP configuration is incomplete; skipping parent confirmation email.");
    return;
  }

  const subject = `Your AKMIND Demo Class is Confirmed!`;
  const text = [
    `Hi ${parentName || "Parent"},`,
    "",
    "Thank you for booking a demo class with AKMIND! We're excited to show you what your child will learn.",
    "",
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    "  BOOKING DETAILS",
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    `  Student : ${childName || "-"}`,
    `  Course  : ${course || "-"}`,
    `  Date    : ${date || "-"}`,
    `  Time    : ${time || "-"}`,
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    "",
    "Our team will reach out to you shortly with the demo class link and further details.",
    "",
    "If you have any questions, feel free to reply to this email.",
    "",
    "Warm regards,",
    "Team AKMIND",
    "admin@akonnai.ai",
  ].join("\n");

  await transporter.sendMail({
    from: `"AKMIND" <${process.env.SMTP_USER}>`,
    to: email,
    subject,
    text,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const gasResponse = await fetch(GAS_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(body),
    });

    if (!gasResponse.ok) {
      console.error("GAS responded with status:", gasResponse.status);
      return NextResponse.json(
        { success: false, error: "Google Apps Script returned an error." },
        { status: 502 },
      );
    }

    // Send both emails independently — neither failure blocks the booking
    await Promise.allSettled([
      sendAdminNotificationEmail(body).catch((e) =>
        console.error("Failed to send admin notification email:", e)
      ),
      sendParentConfirmationEmail(body).catch((e) =>
        console.error("Failed to send parent confirmation email:", e)
      ),
    ]);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Registration proxy error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error while forwarding registration." },
      { status: 500 },
    );
  }
}
