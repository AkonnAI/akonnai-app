"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Instagram, Linkedin, Youtube, MapPin, Mail } from "lucide-react";

const Footer = () => {
    const SOCIAL_LINKS = [
        { icon: <Instagram size={20} />, href: "https://instagram.com/akmind.ai" },
        { icon: <Linkedin size={20} />, href: "https://linkedin.com/company/akmind" },
        { icon: <Youtube size={20} />, href: "https://youtube.com/@akmind" }
    ];

    const LINKS = {
        programs: [
            { label: "AI Explorers", href: "/programs" },
            { label: "AI Builders", href: "/programs" },
            { label: "AI Innovators", href: "/programs" }
        ],
        company: [
            { label: "About AKMIND", href: "#" },
            { label: "Our Educators", href: "#" },
            { label: "Careers", href: "#" },
            { label: "Blog", href: "#" },
            { label: "Privacy Policy", href: "/privacy-policy" },
            { label: "Terms & Conditions", href: "/terms-and-conditions" },
        ]
    };

    return (
        <footer className="bg-slate-50 border-t border-gray-200 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    {/* Column 1 - Brand */}
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shadow-indigo-200 shadow-md">
                                A
                            </div>
                            <span className="text-xl font-bold text-slate-900 tracking-tight">
                                AKMIND™
                            </span>
                        </Link>
                        <p className="text-slate-500 leading-relaxed text-sm">
                            India’s future-ready AI education platform for students from Grades 5–10. Build real-world AI skills early.
                        </p>
                        <div className="flex gap-4">
                            {SOCIAL_LINKS.map((social, index) => (
                                <Link
                                    key={index}
                                    href={social.href}
                                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-400 border border-gray-100 shadow-sm hover:text-indigo-600 hover:border-indigo-100 hover:shadow-md transition-all duration-200"
                                >
                                    {social.icon}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Column 2 - AI Programs */}
                    <div>
                        <h3 className="font-bold text-slate-900 mb-6">AI Learning Tracks</h3>
                        <ul className="space-y-4">
                            {LINKS.programs.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-slate-600 hover:text-indigo-600 transition-colors text-sm font-medium block"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3 - Company */}
                    <div>
                        <h3 className="font-bold text-slate-900 mb-6">Company</h3>
                        <ul className="space-y-4">
                            {LINKS.company.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-slate-600 hover:text-indigo-600 transition-colors text-sm font-medium block"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4 - Contact */}
                    <div>
                        <h3 className="font-bold text-slate-900 mb-6">Contact</h3>
                        <div className="space-y-4 mb-8">
                            <a href="mailto:hello@akmind.com" className="flex items-center gap-3 text-slate-600 hover:text-indigo-600 transition-colors group">
                                <Mail size={18} className="text-slate-400 group-hover:text-indigo-500" />
                                <span className="text-sm font-medium">hello@akmind.com</span>
                            </a>
                            <div className="flex items-center gap-3 text-slate-600">
                                <MapPin size={18} className="text-slate-400" />
                                <span className="text-sm font-medium">India (EN)</span>
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-full font-bold text-sm shadow-lg shadow-indigo-200 hover:shadow-indigo-300 w-full transition-shadow"
                        >
                            Book Free Trial
                        </motion.button>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-400 text-sm">
                        © 2026 AKMIND™. All rights reserved.
                    </p>
                    <p className="text-slate-400 text-sm flex items-center gap-2">
                        Made in India <span className="text-lg">🇮🇳</span>
                    </p>
                </div>
                <p className="text-center text-xs text-slate-400 mt-2">
                    © 2026 Akonnai AI Pvt. Ltd. · Built for the next generation of AI builders
                </p>
            </div>
        </footer>
    );
};

export default Footer;
