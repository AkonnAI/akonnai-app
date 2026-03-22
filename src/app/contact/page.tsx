"use client";

import { useState } from "react";
import Footer from "@/components/Footer";
import { Mail, MapPin, Send } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactPage() {
    const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
    const [sent, setSent] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Opens default mail client with pre-filled details
        const body = `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`;
        window.location.href = `mailto:hello@akmind.com?subject=${encodeURIComponent(form.subject || "Enquiry from AKMIND™ website")}&body=${encodeURIComponent(body)}`;
        setSent(true);
    };

    return (
        <main className="min-h-screen flex flex-col bg-white">

            {/* Hero */}
            <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden">
                <div className="absolute top-10 right-20 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-50 pointer-events-none" />
                <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
                    <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 text-sm font-bold rounded-full uppercase tracking-widest mb-6">Contact Us</span>
                    <h1 className="text-5xl font-bold text-slate-900 mb-4">We&apos;d love to hear from you</h1>
                    <p className="text-xl text-slate-600">Have a question? Want to learn more? Reach out and we&apos;ll get back to you within 24 hours.</p>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-16">

                    {/* Contact Info */}
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-8">Get in touch</h2>
                        <div className="space-y-6">
                            {[
                                { icon: Mail, label: "Email", value: "hello@akmind.com", href: "mailto:hello@akmind.com" },
                                { icon: MapPin, label: "Location", value: "Bangalore, Karnataka, India", href: "#" },
                            ].map((item) => (
                                <a key={item.label} href={item.href} className="flex items-start gap-4 group">
                                    <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-100 transition-colors flex-shrink-0">
                                        <item.icon size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{item.label}</p>
                                        <p className="font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors">{item.value}</p>
                                    </div>
                                </a>
                            ))}
                        </div>

                        <div className="mt-10 p-6 bg-indigo-50 rounded-2xl border border-indigo-100">
                            <p className="font-bold text-slate-900 mb-1">Want to book a demo class?</p>
                            <p className="text-slate-600 text-sm mb-4">Skip the form — book directly and we&apos;ll send you all the details.</p>
                            <a href="/register" className="inline-block px-6 py-3 bg-indigo-600 text-white font-bold rounded-full text-sm hover:bg-indigo-700 transition-colors">
                                Book Demo Class →
                            </a>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-8">Send us a message</h2>
                        {sent ? (
                            <div className="text-center py-16">
                                <div className="text-5xl mb-4">✅</div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Message ready!</h3>
                                <p className="text-slate-500">Your email client should have opened with the message pre-filled.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                {[
                                    { id: "name", label: "Your Name", type: "text", placeholder: "Parent / Guardian name" },
                                    { id: "email", label: "Email Address", type: "email", placeholder: "you@example.com" },
                                    { id: "subject", label: "Subject", type: "text", placeholder: "What is this about?" },
                                ].map((f) => (
                                    <div key={f.id}>
                                        <label className="block text-sm font-bold text-slate-700 mb-1">{f.label}</label>
                                        <input
                                            type={f.type}
                                            required
                                            value={form[f.id as keyof typeof form]}
                                            onChange={(e) => setForm((prev) => ({ ...prev, [f.id]: e.target.value }))}
                                            placeholder={f.placeholder}
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none text-slate-900"
                                        />
                                    </div>
                                ))}
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">Message</label>
                                    <textarea
                                        required
                                        rows={5}
                                        value={form.message}
                                        onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                                        placeholder="Tell us how we can help..."
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none text-slate-900 resize-none"
                                    />
                                </div>
                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full py-3 bg-slate-900 text-white font-bold rounded-full hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                                >
                                    Send Message <Send size={16} />
                                </motion.button>
                            </form>
                        )}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
