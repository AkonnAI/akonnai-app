import { NextRequest, NextResponse } from "next/server";
import { safeHandler } from "@/middleware-helpers/safe-handler";
import {
    sendCareerApplicationAdmin,
    sendCareerApplicationConfirmation,
} from "@/lib/email";

const REQUIRED_ROLES = [
    "AI Mentor",
    "Curriculum Designer",
    "Student Success Manager",
    "Full Stack Developer",
    "Other",
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[6-9]\d{9}$/;

export const POST = safeHandler(async (req: NextRequest) => {
    const body = await req.json();
    const { name, email, phone, role, linkedin, portfolio, message, source } = body;

    // Required field validation
    const missing: string[] = [];
    if (!name?.trim()) missing.push("name");
    if (!email?.trim()) missing.push("email");
    if (!phone?.trim()) missing.push("phone");
    if (!role?.trim()) missing.push("role");
    if (!message?.trim()) missing.push("message");

    if (missing.length > 0) {
        return NextResponse.json(
            { error: `Missing required fields: ${missing.join(", ")}` },
            { status: 400 }
        );
    }

    if (!EMAIL_RE.test(email)) {
        return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    if (!PHONE_RE.test(phone.replace(/\s/g, ""))) {
        return NextResponse.json(
            { error: "Invalid phone number. Please enter a valid 10-digit Indian mobile number." },
            { status: 400 }
        );
    }

    if (!REQUIRED_ROLES.includes(role)) {
        return NextResponse.json({ error: "Invalid role selected." }, { status: 400 });
    }

    const nameTrim = name.trim();
    const emailTrim = email.trim();
    const phoneTrim = phone.trim();
    const roleTrim = role.trim();
    const messageTrim = message.trim();
    const adminMessage = [
        messageTrim,
        linkedin?.trim() && `LinkedIn: ${linkedin.trim()}`,
        portfolio?.trim() && `Portfolio: ${portfolio.trim()}`,
        source?.trim() && `Source: ${source.trim()}`,
    ]
        .filter(Boolean)
        .join("\n\n");

    await Promise.all([
        sendCareerApplicationAdmin({
            name: nameTrim,
            email: emailTrim,
            phone: phoneTrim,
            role: roleTrim,
            message: adminMessage,
        }),
        sendCareerApplicationConfirmation(emailTrim, nameTrim, roleTrim),
    ]);

    return NextResponse.json({ success: true });
});
