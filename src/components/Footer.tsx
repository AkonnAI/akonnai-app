"use client";

import Link from "next/link";
import { Instagram, Linkedin, Youtube, Mail } from "lucide-react";

const SOCIAL = [
    { Icon: Instagram, href: "https://www.instagram.com/_akmind?igsh=MTQ4dDRkMHMxeDQ0OA%3D%3D&utm_source=qr", label: "Instagram" },
    { Icon: Linkedin, href: "https://linkedin.com/company/akmind", label: "LinkedIn" },
    { Icon: Youtube, href: "https://youtube.com/@akmind", label: "YouTube" },
];

const COLUMNS = [
    {
        heading: "Programs",
        links: [
            { label: "AI Explorers", href: "/register" },
            { label: "AI Builders", href: "/register" },
            { label: "AI Innovators", href: "/register" },
            { label: "View Curriculum", href: "/curriculum" },
            { label: "Book Free Demo", href: "/register" },
        ],
    },
    {
        heading: "Company",
        links: [
            { label: "About AKMIND™", href: "/about" },
            { label: "Our Mentors", href: "/mentors" },
            { label: "Careers", href: "/careers" },
            { label: "Become a Mentor", href: "/become-mentor" },
            { label: "Reviews", href: "/reviews" },
        ],
    },
    {
        heading: "Support",
        links: [
            { label: "Contact Us", href: "/contact" },
            { label: "Privacy Policy", href: "/privacy-policy" },
            { label: "Terms & Conditions", href: "/terms-and-conditions" },
        ],
        contacts: [
            { Icon: Mail, label: "hello@akmind.com", href: "mailto:hello@akmind.com" },
        ],
    },
];

const Footer = () => {
    return (
        <footer className="relative bg-slate-950 overflow-hidden">
            {/* Grid pattern */}
            <div
                className="absolute inset-0 pointer-events-none z-0"
                style={{
                    backgroundImage: `linear-gradient(rgba(99,102,241,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.05) 1px, transparent 1px)`,
                    backgroundSize: "60px 60px",
                }}
            />

            {/* Glowing top line */}
            <div
                className="w-full h-px"
                style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.8), transparent)" }}
            />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-16 pb-8 md:pb-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-14">

                    {/* Brand column */}
                    <div className="space-y-4 sm:col-span-2 lg:col-span-1">
                        <Link href="/" className="inline-flex items-center gap-2 group">
                            <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-900/40 group-hover:scale-105 transition-transform">
                                A
                            </div>
                            <div className="flex flex-col leading-none">
                                <span className="text-white text-2xl font-bold tracking-tight">AKMIND™</span>
                                <span className="text-slate-500 text-sm font-normal">by AkonnAI LLP</span>
                            </div>
                        </Link>
                        <p className="text-indigo-400 text-sm font-medium">Dream. Discover. Shine.</p>
                        <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
                            The most exciting AI education platform for students and AI enthusiasts worldwide. Building the next generation of AI innovators.
                        </p>
                        <div className="flex gap-3 pt-1">
                            {SOCIAL.map(({ Icon, href, label }) => (
                                <Link
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="w-10 h-10 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center text-slate-400 hover:bg-indigo-600/20 hover:border-indigo-500/30 hover:text-indigo-400 transition-all duration-200"
                                >
                                    <Icon className="w-5 h-5" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Link columns */}
                    {COLUMNS.map((col) => (
                        <div key={col.heading}>
                            <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-5">
                                {col.heading}
                            </h3>
                            <ul className="space-y-3">
                                {col.links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-slate-400 hover:text-white transition-colors text-sm"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                                {col.contacts?.map(({ Icon, label, href }) => (
                                    <li key={label}>
                                        <a
                                            href={href}
                                            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm"
                                        >
                                            <Icon className="w-3.5 h-3.5 shrink-0" />
                                            {label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom bar */}
                <div className="border-t border-slate-800 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-3">
                        <p className="text-slate-500 text-sm">
                            © 2026 AkonnAI LLP · Bengaluru, India
                        </p>
                        <div className="flex items-center gap-4 text-sm text-slate-500">
                            <Link href="/privacy-policy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
                            <span className="text-slate-700">·</span>
                            <Link href="/terms-and-conditions" className="hover:text-slate-300 transition-colors">Terms & Conditions</Link>
                        </div>
                    </div>
                    <p className="text-slate-600 text-xs text-center mt-3">
                        Built for the next generation of AI builders
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
