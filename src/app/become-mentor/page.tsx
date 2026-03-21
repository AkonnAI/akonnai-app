"use client";

import { useState } from "react";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

export default function BecomeMentorPage() {
    const [form, setForm] = useState({ name: "", email: "", role: "", experience: "", expertise: "", motivation: "" });
    const [sent, setSent] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const body = [
            `Name: ${form.name}`,
            `Email: ${form.email}`,
            `Current Role: ${form.role}`,
            `Years of Experience: ${form.experience}`,
            `Expertise: ${form.expertise}`,
            `Why they want to mentor: ${form.motivation}`,
        ].join("\n");
        window.location.href = `mailto:admin@akonnai.ai?subject=Mentor Application: ${encodeURIComponent(form.name)}&body=${encodeURIComponent(body)}`;
        setSent(true);
    };

    return (
        <main className="min-h-screen flex flex-col bg-white">

            {/* Hero */}
            <section className="py-20 bg-gradient-to-br from-teal-50 via-white to-emerald-50 relative overflow-hidden">
                <div className="absolute top-0 right-1/4 w-72 h-72 bg-teal-100 rounded-full blur-3xl opacity-40 pointer-events-none" />
                <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
                    <span className="inline-block px-4 py-1.5 bg-teal-100 text-teal-700 text-sm font-bold rounded-full uppercase tracking-widest mb-6">Become a Mentor</span>
                    <h1 className="text-5xl font-bold text-slate-900 mb-4">
                        Share your AI expertise.<br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-emerald-600">Shape young futures.</span>
                    </h1>
                    <p className="text-xl text-slate-600">Join AKMIND as a mentor and teach the next generation of AI builders — on your own schedule.</p>
                </div>
            </section>

            {/* Why Mentor */}
            <section className="py-16 bg-white border-b border-slate-100">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        {[
                            { icon: "💰", title: "Competitive Pay", desc: "Earn per session on a flexible schedule that fits around your job." },
                            { icon: "🌱", title: "Give Back", desc: "Directly impact a child's career path by sharing your real-world experience." },
                            { icon: "🤝", title: "Join the Community", desc: "Be part of a growing network of AI professionals passionate about education." },
                        ].map((item) => (
                            <div key={item.title} className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
                                <div className="text-4xl mb-4">{item.icon}</div>
                                <h3 className="font-bold text-slate-900 text-lg mb-2">{item.title}</h3>
                                <p className="text-slate-500 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Application Form */}
            <section className="py-20 bg-white">
                <div className="max-w-2xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-slate-900 mb-2 text-center">Apply to become a mentor</h2>
                    <p className="text-slate-500 text-center mb-10">We review all applications within 3 business days.</p>

                    {sent ? (
                        <div className="text-center py-16">
                            <div className="text-5xl mb-4">🎉</div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Application sent!</h3>
                            <p className="text-slate-500">Your email client should have opened. We&apos;ll review your application and get back to you within 3 business days.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {[
                                { id: "name", label: "Full Name", type: "text", placeholder: "Your full name" },
                                { id: "email", label: "Email Address", type: "email", placeholder: "your@email.com" },
                                { id: "role", label: "Current Role & Company", type: "text", placeholder: "e.g. ML Engineer at Google" },
                                { id: "experience", label: "Years of AI/Tech Experience", type: "text", placeholder: "e.g. 5 years" },
                                { id: "expertise", label: "Areas of Expertise", type: "text", placeholder: "e.g. NLP, Computer Vision, Python, TensorFlow" },
                            ].map((f) => (
                                <div key={f.id}>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">{f.label}</label>
                                    <input
                                        type={f.type}
                                        required
                                        value={form[f.id as keyof typeof form]}
                                        onChange={(e) => setForm((prev) => ({ ...prev, [f.id]: e.target.value }))}
                                        placeholder={f.placeholder}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-slate-900"
                                    />
                                </div>
                            ))}
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1">Why do you want to mentor?</label>
                                <textarea
                                    required
                                    rows={4}
                                    value={form.motivation}
                                    onChange={(e) => setForm((prev) => ({ ...prev, motivation: e.target.value }))}
                                    placeholder="Tell us what motivates you to teach AI to students..."
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-slate-900 resize-none"
                                />
                            </div>
                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-3 bg-slate-900 text-white font-bold rounded-full hover:bg-teal-700 transition-colors flex items-center justify-center gap-2"
                            >
                                Submit Application <Send size={16} />
                            </motion.button>
                        </form>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
