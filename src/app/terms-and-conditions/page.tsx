import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Terms and Conditions",
  description: "AKMIND terms and conditions of use.",
  alternates: { canonical: "https://www.akmind.com/terms-and-conditions" }
};

const SECTIONS = [
    {
        heading: "1. Acceptance of Terms",
        body: "By accessing www.akmind.com you agree to these Terms and Conditions. If you do not agree, please do not use our platform.",
    },
    {
        heading: "2. Our Services",
        body: "AKMIND™ provides online AI education programs for students and AI enthusiasts through live expert mentorship sessions, gamified learning, and self-paced content.",
    },
    {
        heading: "3. Account Registration",
        items: [
            "You must be 18 or older to create a parent account",
            "You are responsible for maintaining the security of your account",
            "You must provide accurate and complete information during registration",
            "One account per family is recommended",
        ],
    },
    {
        heading: "4. Demo Class Policy",
        items: [
            "Free demo classes are available once per student",
            "Demo classes are 60 minutes with a qualified AI mentor",
            "Bookings must be made at least 2 hours in advance",
            "No-shows without 12 hours notice may forfeit the free demo",
        ],
    },
    {
        heading: "5. Payment and Refunds",
        items: [
            "Program fees are displayed at the time of enrollment",
            "Full refund is available within 7 days of enrollment",
            "After 7 days unused sessions are refunded on a pro-rata basis",
            "Refund requests must be sent to hello@akmind.com",
        ],
    },
    {
        heading: "6. Code of Conduct",
        intro: "Students and parents agree to:",
        items: [
            "Treat mentors and staff with respect",
            "Not record sessions without written consent",
            "Not share login credentials with others",
            "Use the platform only for its intended educational purpose",
        ],
    },
    {
        heading: "7. Intellectual Property",
        body: "All content on AKMIND™ including curriculum, videos and materials is the property of Akonnai AI. You may not reproduce or distribute our content without written permission.",
    },
    {
        heading: "8. Limitation of Liability",
        body: "AKMIND™ is not liable for any indirect or consequential damages arising from use of our platform. Our maximum liability is limited to the fees paid for the current program phase.",
    },
    {
        heading: "9. Changes to Terms",
        body: "We may update these terms at any time. Continued use of the platform after changes constitutes acceptance of the new terms.",
    },
    {
        heading: "10. Contact",
        body: "For any questions about these terms contact us at ",
        contactEmail: "hello@akmind.com",
    },
];

export default function TermsPage() {
    return (
        <main className="min-h-screen flex flex-col bg-white">

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full flex-1">

                {/* Back link */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-800 font-medium mb-10 transition-colors"
                >
                    ← Back to Home
                </Link>

                {/* Title */}
                <h1 className="text-4xl font-bold text-indigo-600 mb-2">Terms and Conditions</h1>
                <p className="text-sm text-slate-400 mb-10">Last updated: March 2026 · AKMIND™ by Akonnai AI, Bangalore, India</p>

                <div className="space-y-10">
                    {SECTIONS.map((section) => (
                        <section key={section.heading}>
                            <h2 className="text-xl font-bold text-slate-900 mb-3">{section.heading}</h2>

                            {section.intro && (
                                <p className="text-slate-600 leading-relaxed mb-2">{section.intro}</p>
                            )}

                            {section.body && !section.contactEmail && (
                                <p className="text-slate-600 leading-relaxed">{section.body}</p>
                            )}

                            {section.body && section.contactEmail && (
                                <p className="text-slate-600 leading-relaxed">
                                    {section.body}
                                    <a href={`mailto:${section.contactEmail}`} className="text-indigo-600 hover:underline">
                                        {section.contactEmail}
                                    </a>
                                </p>
                            )}

                            {section.items && (
                                <ul className="space-y-2">
                                    {section.items.map((item) => (
                                        <li key={item} className="flex items-start gap-2 text-slate-600 leading-relaxed">
                                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </section>
                    ))}
                </div>
            </div>

            <Footer />
        </main>
    );
}
