"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { clsx } from "clsx";

const TABS = ["Class Experience", "About the Program", "Support"] as const;
type Tab = typeof TABS[number];

const FAQS: { category: Tab; question: string; answer: string }[] = [
    // ── Class Experience ──────────────────────────────────────────────────────
    {
        category: "Class Experience",
        question: "How are AKMIND classes conducted?",
        answer: "AKMIND uses a unique micro-learning format. Each lesson consists of an 11-minute pre-recorded concept video, followed by an interactive story-based game that reinforces what you learned, and a 5-minute recap. Every module also includes 2 live sessions — either 1-on-1 or group — with an expert AI mentor for doubt clearing, project reviews and interactive activities. Students have complete freedom to learn at their own pace.",
    },
    {
        category: "Class Experience",
        question: "Can my child rewatch lessons?",
        answer: "Absolutely. All lessons are pre-recorded and available 24/7 on the AKMIND platform. Students can rewatch any lesson as many times as they need. There is no pressure to keep up with a fixed schedule — learning happens at your child's pace.",
    },
    {
        category: "Class Experience",
        question: "What devices does my child need?",
        answer: "AKMIND works on any device — web browser, iOS, Android and tablet. There are no device restrictions. All you need is a stable internet connection and you are ready to learn.",
    },
    {
        category: "Class Experience",
        question: "How long are the live sessions?",
        answer: "Each live session is 60 minutes. Every module includes 2 live sessions — these are used for kickoffs, doubt clearing, project reviews and interactive group activities. Live sessions can be 1-on-1 or group depending on the program and availability.",
    },
    {
        category: "Class Experience",
        question: "Can I reschedule a live session?",
        answer: "Yes. Live sessions can be rescheduled up to 12 hours before the session. Since the rest of the program is self-paced, your child can continue learning through lessons and games while waiting for the next live session.",
    },

    // ── About the Program ─────────────────────────────────────────────────────
    {
        category: "About the Program",
        question: "What will my child actually build in AKMIND?",
        answer: "Students build real AI projects throughout the program — image classifiers, chatbots, recommendation systems, data dashboards and more. Every project uses real tools like Python and TensorFlow. Students finish with a portfolio of projects they actually built themselves.",
    },
    {
        category: "About the Program",
        question: "Do I need any prior experience?",
        answer: "None at all. AKMIND is designed for complete beginners and advanced learners alike. Our AI guide and mentors adapt to every student's pace. Any AI enthusiast can join and thrive regardless of background.",
    },
    {
        category: "About the Program",
        question: "How does the gamified learning work?",
        answer: "After every 11-minute lesson video, students enter an interactive story-based game that brings the concept to life. Students earn XP points, unlock badges, maintain learning streaks and climb leaderboards. Learning feels like playing — but the skills gained are very real.",
    },
    {
        category: "About the Program",
        question: "What is the student dashboard?",
        answer: "The AKMIND student dashboard is where the entire learning experience lives. Students access their lessons, games, live session schedule, progress tracking, badges, XP points and their AI guide — all in one place. Parents can also view their child's progress from the dashboard.",
    },
    {
        category: "About the Program",
        question: "What certificate does my child receive?",
        answer: "Students receive an AKMIND Certificate of Completion at the end of each program phase. The certificate is digitally verifiable and can be added to school portfolios, college applications and LinkedIn profiles.",
    },
    {
        category: "About the Program",
        question: "How long is each program?",
        answer: "Each program phase has 60 micro-lessons combining self-paced lessons and live sessions. Most students complete a phase in 4 to 6 months. Since the program is self-paced, faster learners can finish sooner.",
    },

    // ── Support ───────────────────────────────────────────────────────────────
    {
        category: "Support",
        question: "What is the AKMIND AI Guide?",
        answer: "The AKMIND AI Guide is your child's personal learning companion available 24 hours a day, 7 days a week. It takes smart notes during lessons, answers questions instantly, tracks progress across all modules, sends personalised tips and celebrates milestones. Think of it as a brilliant study buddy that never sleeps.",
    },
    {
        category: "Support",
        question: "How do I book a free demo class?",
        answer: "Click the Book Free Demo button anywhere on the site, fill in your details and pick a convenient date and time. A mentor will join you for a free 60-minute trial session with no obligation and no credit card required.",
    },
    {
        category: "Support",
        question: "What is your refund policy?",
        answer: "We offer a full refund within 7 days of enrollment if you are not satisfied. After 7 days, unused sessions are refunded on a pro-rata basis. Email hello@akmind.com for any refund requests and we will respond within 24 hours.",
    },
    {
        category: "Support",
        question: "Is my child's data safe?",
        answer: "Yes. AKMIND stores only the minimum data required to provide the service. All data is encrypted and stored securely on AWS infrastructure. We never sell or share your data with any third party.",
    },
    {
        category: "Support",
        question: "How do I contact AKMIND support?",
        answer: "Email us at hello@akmind.com or use the contact form on our website. We respond within 24 hours on all working days. For urgent queries during live sessions, your mentor is directly reachable through the dashboard.",
    },
];

const FAQ = () => {
    const [activeTab, setActiveTab] = useState<Tab>("Class Experience");
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const filteredFaqs = FAQS.filter((faq) => faq.category === activeTab);

    const handleTab = (tab: Tab) => {
        setActiveTab(tab);
        setOpenIndex(null);
    };

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-14 md:py-20 bg-slate-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex justify-center mb-6">
                        <div className="relative">
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <HelpCircle className="w-24 h-24 text-indigo-100" />
                            </motion.div>
                            <div className="absolute top-0 right-0 text-pink-300 text-4xl animate-bounce">?</div>
                            <div className="absolute bottom-0 left-0 text-blue-300 text-3xl">?</div>
                        </div>
                    </div>
                    <h2 className="text-4xl font-bold text-slate-900 mb-8">
                        Frequently Asked{" "}
                        <span className="text-indigo-600">Questions</span>
                    </h2>

                    {/* Tab buttons */}
                    <div className="flex overflow-x-auto gap-2 sm:gap-3 border border-gray-100 p-2 rounded-2xl shadow-sm bg-white w-full sm:w-auto sm:inline-flex sm:justify-center sm:rounded-full">
                        {TABS.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => handleTab(tab)}
                                className={clsx(
                                    "px-4 sm:px-6 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap",
                                    activeTab === tab
                                        ? "bg-indigo-600 text-white shadow-md"
                                        : "bg-transparent text-indigo-600 hover:bg-indigo-50"
                                )}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* FAQ accordion list */}
                <div className="min-h-[400px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.25 }}
                            className="space-y-4"
                        >
                            {filteredFaqs.map((faq, index) => {
                                const isOpen = openIndex === index;
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.06 }}
                                        className={clsx(
                                            "rounded-xl border overflow-hidden transition-colors duration-200",
                                            isOpen
                                                ? "border-indigo-300 bg-indigo-50"
                                                : "border-gray-200 bg-white hover:border-indigo-200"
                                        )}
                                    >
                                        {/* Question row */}
                                        <button
                                            onClick={() => toggle(index)}
                                            className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                                        >
                                            <span className={clsx(
                                                "font-bold text-base pr-4",
                                                isOpen ? "text-indigo-700" : "text-slate-800"
                                            )}>
                                                {faq.question}
                                            </span>
                                            <motion.span
                                                animate={{ rotate: isOpen ? 180 : 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="shrink-0"
                                            >
                                                <ChevronDown className={clsx(
                                                    "w-5 h-5 transition-colors",
                                                    isOpen ? "text-indigo-600" : "text-gray-400"
                                                )} />
                                            </motion.span>
                                        </button>

                                        {/* Answer — animated height */}
                                        <AnimatePresence initial={false}>
                                            {isOpen && (
                                                <motion.div
                                                    key="answer"
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.25, ease: "easeInOut" }}
                                                    className="overflow-hidden"
                                                >
                                                    <p className="px-6 pb-5 text-slate-600 leading-relaxed text-sm">
                                                        {faq.answer}
                                                    </p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </AnimatePresence>
                </div>

            </div>
        </section>
    );
};

export default FAQ;
