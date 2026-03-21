import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = { title: "Privacy Policy | AKMIND" };

const SECTIONS = [
    {
        heading: "1. Introduction",
        body: 'AKMIND ("we", "us", "our") is committed to protecting the privacy of children and parents who use our platform. This Privacy Policy explains how we collect, use and protect your information when you use www.akmind.com.',
    },
    {
        heading: "2. Information We Collect",
        items: [
            "Parent/Guardian name, email address and phone number",
            "Child's name and grade level (no other personal details about the child)",
            "Demo booking details (date, time, course selected)",
            "Session cookies for login authentication",
            "We do NOT collect any payment information directly",
        ],
    },
    {
        heading: "3. How We Use Your Information",
        items: [
            "To schedule and conduct free demo classes",
            "To send booking confirmations and class reminders via email",
            "To improve our programs and platform",
            "We never sell your data to third parties",
        ],
    },
    {
        heading: "4. Data Storage and Security",
        items: [
            "All data is stored securely on AWS infrastructure located in India",
            "Passwords are encrypted using industry-standard bcrypt hashing",
            "Session data is signed with HMAC-SHA256 encryption",
            "We retain your data only as long as necessary to provide our services",
        ],
    },
    {
        heading: "5. Children's Privacy",
        items: [
            "We collect minimal information about children",
            "We only collect a child's first name and grade level",
            "Parents and guardians have full control over their child's data",
            "We comply with applicable Indian data protection laws",
        ],
    },
    {
        heading: "6. Cookies",
        items: [
            "We use essential session cookies only for login functionality",
            "We do not use tracking or advertising cookies",
            "You can disable cookies in your browser settings",
        ],
    },
    {
        heading: "7. Your Rights",
        items: [
            "You can request deletion of your account and data at any time",
            "Email hello@akmind.com to request data deletion or correction",
            "We will respond within 7 working days",
        ],
    },
    {
        heading: "8. Contact Us",
        body: "For any privacy concerns contact us at:",
        contact: { email: "hello@akmind.com", address: "Bangalore, Karnataka, India" },
    },
];

export default function PrivacyPolicyPage() {
    return (
        <main className="min-h-screen flex flex-col bg-white">
            <Navbar />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full flex-1">

                {/* Back link */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-800 font-medium mb-10 transition-colors"
                >
                    ← Back to Home
                </Link>

                {/* Title */}
                <h1 className="text-4xl font-bold text-indigo-600 mb-2">Privacy Policy</h1>
                <p className="text-sm text-slate-400 mb-10">Last updated: March 2026 · AKMIND by Akonnai AI, Bangalore, India</p>

                <div className="space-y-10">
                    {SECTIONS.map((section) => (
                        <section key={section.heading}>
                            <h2 className="text-xl font-bold text-slate-900 mb-3">{section.heading}</h2>

                            {section.body && (
                                <p className="text-slate-600 leading-relaxed">{section.body}</p>
                            )}

                            {section.items && (
                                <ul className="mt-3 space-y-2">
                                    {section.items.map((item) => (
                                        <li key={item} className="flex items-start gap-2 text-slate-600 leading-relaxed">
                                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {section.contact && (
                                <ul className="mt-3 space-y-1 text-slate-600">
                                    <li>
                                        <span className="font-medium">Email: </span>
                                        <a href={`mailto:${section.contact.email}`} className="text-indigo-600 hover:underline">
                                            {section.contact.email}
                                        </a>
                                    </li>
                                    <li>
                                        <span className="font-medium">Address: </span>
                                        {section.contact.address}
                                    </li>
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
