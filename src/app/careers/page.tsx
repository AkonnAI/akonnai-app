"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Briefcase, MapPin, Info } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const JOBS = [
    {
        title: "AI Mentor (Part-time / Freelance)",
        badge: "Remote · Part-time",
        description:
            "Conduct live 1-on-1 AI sessions with students aged 10-16. Must have strong Python and ML knowledge and a passion for teaching.",
        requirements: ["Python", "Machine Learning", "Teaching experience preferred"],
    },
    {
        title: "Curriculum Designer",
        badge: "Remote · Full-time",
        description:
            "Design and develop engaging AI curriculum content, lesson plans, video scripts and interactive activities for school students.",
        requirements: ["EdTech experience", "AI/ML knowledge", "Content writing"],
    },
    {
        title: "Student Success Manager",
        badge: "Bangalore · Full-time",
        description:
            "Own the student experience from demo booking to program completion. Build relationships with parents and ensure every student achieves their learning goals.",
        requirements: ["Communication skills", "EdTech or sales background"],
    },
    {
        title: "Full Stack Developer",
        badge: "Bangalore · Full-time",
        description:
            "Build and improve the AKMIND platform using Next.js, TypeScript and AWS. Work on features that directly impact thousands of students.",
        requirements: ["Next.js", "TypeScript", "AWS", "React"],
    },
];

const ROLES = [
    "AI Mentor",
    "Curriculum Designer",
    "Student Success Manager",
    "Full Stack Developer",
    "Other",
];

const SOURCES = ["LinkedIn", "Instagram", "Friend/Referral", "Google Search", "Other"];

const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.45, ease: [0.25, 0.1, 0.25, 1] as const },
    }),
};

export default function CareersPage() {
    const formRef = useRef<HTMLDivElement>(null);

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        role: "",
        linkedin: "",
        portfolio: "",
        message: "",
        source: "",
    });
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const update = (field: string, value: string) =>
        setForm((prev) => ({ ...prev, [field]: value }));

    const scrollToForm = () =>
        formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);

        try {
            const res = await fetch("/api/careers", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                setError(data.error || "Submission failed. Please try again.");
                return;
            }

            setSuccess(true);
            setForm({ name: "", email: "", phone: "", role: "", linkedin: "", portfolio: "", message: "", source: "" });
        } catch {
            setError("A network error occurred. Please check your connection and try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <main className="min-h-screen flex flex-col bg-white">
            <Navbar />

            {/* Hero */}
            <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-24 px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight"
                    >
                        Join the AKMIND Team
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15, duration: 0.5 }}
                        className="text-indigo-100 text-lg leading-relaxed max-w-2xl mx-auto"
                    >
                        Help us build the future of AI education in India. We are looking for passionate
                        people who love teaching, technology and making a difference in young lives.
                    </motion.p>
                </div>
            </section>

            {/* Open Positions */}
            <section className="py-20 px-4 bg-slate-50">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">Open Positions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {JOBS.map((job, i) => (
                            <motion.div
                                key={job.title}
                                custom={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-40px" }}
                                variants={cardVariants}
                                className="bg-white border-l-4 border-indigo-600 rounded-xl shadow-sm p-6 flex flex-col"
                            >
                                <div className="flex items-start justify-between gap-3 mb-3">
                                    <h3 className="font-bold text-slate-900 text-base leading-snug">{job.title}</h3>
                                    <span className="shrink-0 flex items-center gap-1 px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full whitespace-nowrap">
                                        <MapPin className="w-3 h-3" />
                                        {job.badge}
                                    </span>
                                </div>
                                <p className="text-slate-500 text-sm leading-relaxed mb-4">{job.description}</p>
                                <div className="flex flex-wrap gap-2 mb-5">
                                    {job.requirements.map((req) => (
                                        <span key={req} className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-full">
                                            {req}
                                        </span>
                                    ))}
                                </div>
                                <button
                                    onClick={scrollToForm}
                                    className="mt-auto w-full py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                                >
                                    <Briefcase className="w-4 h-4" />
                                    Apply Now
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Application Form */}
            <section ref={formRef} className="py-20 px-4 bg-white">
                <div className="max-w-2xl mx-auto">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-slate-900 mb-2">Apply Now</h2>
                        <p className="text-slate-500">Fill in your details and we will get back to you within 3 working days.</p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-8">
                        {success ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.97 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center text-center py-8"
                            >
                                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-5">
                                    <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">Application Submitted!</h3>
                                <p className="text-slate-500 leading-relaxed">
                                    Thank you for applying! We will review your application and get back to you within 3 working days.
                                </p>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <Field label="Full Name" required>
                                    <input
                                        type="text"
                                        value={form.name}
                                        onChange={(e) => update("name", e.target.value)}
                                        placeholder="Enter your full name"
                                        required
                                        className={inputCls}
                                    />
                                </Field>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <Field label="Email Address" required>
                                        <input
                                            type="email"
                                            value={form.email}
                                            onChange={(e) => update("email", e.target.value)}
                                            placeholder="you@example.com"
                                            required
                                            className={inputCls}
                                        />
                                    </Field>
                                    <Field label="Phone Number" required>
                                        <input
                                            type="tel"
                                            value={form.phone}
                                            onChange={(e) => update("phone", e.target.value)}
                                            placeholder="10-digit mobile"
                                            required
                                            className={inputCls}
                                        />
                                    </Field>
                                </div>

                                <Field label="Role Applying For" required>
                                    <select
                                        value={form.role}
                                        onChange={(e) => update("role", e.target.value)}
                                        required
                                        className={inputCls}
                                    >
                                        <option value="">Select a role</option>
                                        {ROLES.map((r) => (
                                            <option key={r} value={r}>{r}</option>
                                        ))}
                                    </select>
                                </Field>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <Field label="LinkedIn Profile URL">
                                        <input
                                            type="url"
                                            value={form.linkedin}
                                            onChange={(e) => update("linkedin", e.target.value)}
                                            placeholder="https://linkedin.com/in/..."
                                            className={inputCls}
                                        />
                                    </Field>
                                    <Field label="Portfolio or GitHub URL">
                                        <input
                                            type="url"
                                            value={form.portfolio}
                                            onChange={(e) => update("portfolio", e.target.value)}
                                            placeholder="https://github.com/..."
                                            className={inputCls}
                                        />
                                    </Field>
                                </div>

                                <Field label="Why do you want to join AKMIND?" required>
                                    <textarea
                                        value={form.message}
                                        onChange={(e) => update("message", e.target.value)}
                                        placeholder="Tell us about yourself and why you're a great fit (min 100 characters)..."
                                        required
                                        minLength={100}
                                        rows={5}
                                        className={`${inputCls} resize-none`}
                                    />
                                </Field>

                                <Field label="How did you hear about us?">
                                    <select
                                        value={form.source}
                                        onChange={(e) => update("source", e.target.value)}
                                        className={inputCls}
                                    >
                                        <option value="">Select an option</option>
                                        {SOURCES.map((s) => (
                                            <option key={s} value={s}>{s}</option>
                                        ))}
                                    </select>
                                </Field>

                                {error && (
                                    <div className="flex items-start gap-2 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                                        <Info className="w-4 h-4 shrink-0 mt-0.5" />
                                        {error}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="w-full py-3.5 rounded-xl bg-indigo-600 text-white font-bold text-sm hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {submitting ? "Submitting..." : "Submit Application"}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

const inputCls =
    "w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-slate-900 placeholder:text-slate-400 text-sm bg-white";

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
    return (
        <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">
                {label}
                {required && <span className="text-indigo-500 ml-0.5">*</span>}
            </label>
            {children}
        </div>
    );
}
