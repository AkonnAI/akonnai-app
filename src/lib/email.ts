import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { env } from "./env";

const ses = new SESClient({
  region: env.awsRegion,
  credentials: {
    accessKeyId: env.awsAccessKeyId,
    secretAccessKey: env.awsSecretAccessKey,
  },
});

async function sendEmail(to: string, subject: string, html: string) {
  await ses.send(new SendEmailCommand({
    Source: env.sesFrom,
    Destination: { ToAddresses: [to] },
    Message: {
      Subject: { Data: subject, Charset: "UTF-8" },
      Body: { Html: { Data: html, Charset: "UTF-8" } },
    },
  }));
}

export type BookingData = {
  parentName: string; phone: string; email: string;
  childName: string; grade: string; course: string;
  date: string; time: string;
};

export async function sendWelcomeEmail(to: string, name: string) {
  try {
    await sendEmail(
      to,
      "Welcome to AKMIND! Your AI Journey Begins",
      `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
        <div style="background:#4F46E5;padding:32px;text-align:center">
          <h1 style="color:#fff;margin:0;font-size:28px">Welcome to AKMIND</h1>
          <p style="color:#C7D2FE;margin:8px 0 0;font-size:16px">Dream. Discover. Shine.</p>
        </div>
        <div style="padding:32px;background:#fff">
          <p style="font-size:16px;color:#374151">Hi ${name},</p>
          <p style="font-size:15px;color:#374151;line-height:1.6">Welcome to AKMIND — India's most exciting AI education program for school students in Grades 5 to 10.</p>
          <p style="font-size:15px;color:#374151">Ready to book your free demo class?</p>
          <div style="text-align:center;margin:28px 0">
            <a href="https://www.akmind.com/register"
              style="background:#4F46E5;color:#fff;padding:14px 32px;border-radius:8px;
              text-decoration:none;display:inline-block;font-weight:bold;font-size:15px">
              Book Free Demo Class
            </a>
          </div>
          <p style="color:#6B7280;font-size:13px;border-top:1px solid #E5E7EB;padding-top:16px;margin-top:24px">
            Questions? Email us at hello@akmind.com
          </p>
        </div>
      </div>`
    );
    return { success: true };
  } catch (err) {
    console.error("[SES] sendWelcomeEmail failed:", err);
    return { success: false };
  }
}

export async function sendAdminBookingNotification(b: BookingData) {
  try {
    await sendEmail(
      env.sesAdmin,
      `New Demo Booking — ${b.childName} (${b.grade})`,
      `<div style="font-family:Arial,sans-serif;max-width:600px">
        <div style="background:#4F46E5;padding:20px 24px">
          <h2 style="color:#fff;margin:0;font-size:20px">New Demo Booking</h2>
        </div>
        <div style="padding:24px;background:#fff">
          <table style="width:100%;border-collapse:collapse;font-size:14px">
            ${[
              ["Student", b.childName],
              ["Grade", b.grade],
              ["Program", b.course],
              ["Date", b.date],
              ["Time", b.time],
              ["Parent / Guardian", b.parentName],
              ["Phone", b.phone],
              ["Email", b.email]
            ].map(([k,v], i) => `<tr style="background:${i%2===0?'#F9FAFB':'#fff'}">
              <td style="padding:10px 12px;border:1px solid #E5E7EB;font-weight:600;color:#374151;width:160px">${k}</td>
              <td style="padding:10px 12px;border:1px solid #E5E7EB;color:#374151">${v}</td>
            </tr>`).join("")}
          </table>
        </div>
      </div>`
    );
    return { success: true };
  } catch (err) {
    console.error("[SES] sendAdminBookingNotification failed:", err);
    return { success: false };
  }
}

export type CareerApplication = {
  name: string;
  email: string;
  phone: string;
  role: string;
  linkedin?: string;
  portfolio?: string;
  message: string;
  source: string;
};

export async function sendCareerApplication(app: CareerApplication) {
  const rows = [
    ["Full Name", app.name],
    ["Email", app.email],
    ["Phone", app.phone],
    ["Role Applied For", app.role],
    ["LinkedIn", app.linkedin || "Not provided"],
    ["Portfolio / GitHub", app.portfolio || "Not provided"],
    ["How they heard", app.source],
    ["Message", app.message],
  ];

  try {
    // Admin notification
    await sendEmail(
      env.sesAdmin,
      `New Job Application — ${app.role} — ${app.name}`,
      `<div style="font-family:Arial,sans-serif;max-width:600px">
        <div style="background:#4F46E5;padding:20px 24px">
          <h2 style="color:#fff;margin:0;font-size:20px">New Job Application</h2>
          <p style="color:#C7D2FE;margin:6px 0 0;font-size:14px">${app.role}</p>
        </div>
        <div style="padding:24px;background:#fff">
          <table style="width:100%;border-collapse:collapse;font-size:14px">
            ${rows.map(([k, v], i) => `<tr style="background:${i % 2 === 0 ? "#F9FAFB" : "#fff"}">
              <td style="padding:10px 12px;border:1px solid #E5E7EB;font-weight:600;color:#374151;width:160px">${k}</td>
              <td style="padding:10px 12px;border:1px solid #E5E7EB;color:#374151;white-space:pre-wrap">${v}</td>
            </tr>`).join("")}
          </table>
        </div>
      </div>`
    );

    // Applicant confirmation
    await sendEmail(
      app.email,
      `Application Received — AKMIND`,
      `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
        <div style="background:#4F46E5;padding:32px;text-align:center">
          <h1 style="color:#fff;margin:0;font-size:24px">Application Received!</h1>
          <p style="color:#C7D2FE;margin:8px 0 0;font-size:15px">Thank you for applying to AKMIND</p>
        </div>
        <div style="padding:32px;background:#fff">
          <p style="font-size:16px;color:#374151">Hi ${app.name},</p>
          <p style="font-size:15px;color:#374151;line-height:1.6">
            Thank you for applying to AKMIND. We have received your application for
            <strong>${app.role}</strong> and will get back to you within 3 working days.
          </p>
          <p style="font-size:15px;color:#374151;line-height:1.6">
            If you have any questions in the meantime, feel free to reach out to us at
            <a href="mailto:hello@akmind.com" style="color:#4F46E5">hello@akmind.com</a>.
          </p>
          <p style="color:#6B7280;font-size:13px;border-top:1px solid #E5E7EB;padding-top:16px;margin-top:24px">
            — The AKMIND Team · <a href="https://www.akmind.com" style="color:#4F46E5">www.akmind.com</a>
          </p>
        </div>
      </div>`
    );

    return { success: true };
  } catch (err) {
    console.error("[SES] sendCareerApplication failed:", err);
    return { success: false };
  }
}

export async function sendParentBookingConfirmation(to: string, b: BookingData) {
  try {
    await sendEmail(
      to,
      "Your Demo Class is Booked! — AKMIND",
      `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
        <div style="background:#4F46E5;padding:32px;text-align:center">
          <h1 style="color:#fff;margin:0;font-size:26px">Your Demo is Confirmed!</h1>
          <p style="color:#C7D2FE;margin:8px 0 0">We can't wait to meet ${b.childName}!</p>
        </div>
        <div style="padding:32px;background:#fff">
          <p style="font-size:16px;color:#374151">Hi ${b.parentName},</p>
          <p style="font-size:15px;color:#374151;line-height:1.6">
            Your free demo class for ${b.childName} has been successfully booked.</p>
          <div style="background:#EEF2FF;border-radius:10px;padding:20px 24px;margin:20px 0">
            <p style="margin:0 0 8px;color:#374151"><b>Student:</b> ${b.childName} (${b.grade})</p>
            <p style="margin:0 0 8px;color:#374151"><b>Program:</b> ${b.course}</p>
            <p style="margin:0 0 8px;color:#374151"><b>Date:</b> ${b.date}</p>
            <p style="margin:0;color:#374151"><b>Time:</b> ${b.time}</p>
          </div>
          <p style="font-size:15px;color:#374151;line-height:1.6">
            Our mentor will send you a video call link 30 minutes before the class starts.</p>
          <p style="color:#6B7280;font-size:13px;border-top:1px solid #E5E7EB;padding-top:16px;margin-top:24px">
            Questions? Reply to this email or contact us at hello@akmind.com<br>
            <a href="https://www.akmind.com" style="color:#4F46E5">www.akmind.com</a>
          </p>
        </div>
      </div>`
    );
    return { success: true };
  } catch (err) {
    console.error("[SES] sendParentBookingConfirmation failed:", err);
    return { success: false };
  }
}
