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
        question: "How are AKMIND™ classes conducted?",
        answer: "All classes are conducted live on a 1-on-1 basis over video call. Each session is 60 minutes with a dedicated AI mentor who gives your child 100% personalised attention.",
    },
    {
        category: "Class Experience",
        question: "What devices does my child need?",
        answer: "A laptop or desktop with a stable internet connection is required. Mobile phones are not recommended. We will guide you with any software setup before the first class.",
    },
    {
        category: "Class Experience",
        question: "Can I get a recording of the class?",
        answer: "To protect student privacy we do not provide recordings. However detailed notes, project files and activity summaries are shared after every session.",
    },
    {
        category: "Class Experience",
        question: "Can I reschedule a class?",
        answer: "Yes. Classes can be rescheduled up to 12 hours before the session through your parent dashboard. We offer flexible scheduling to fit your child's routine.",
    },
    {
        category: "Class Experience",
        question: "Is there homework after each class?",
        answer: "There is no mandatory homework. We do share optional practice challenges and mini-projects that reinforce what was learned in class in a fun way.",
    },

    // ── About the Program ─────────────────────────────────────────────────────
    {
        category: "About the Program",
        question: "What will my child actually build in AKMIND™?",
        answer: "Students build real AI projects — image classifiers, chatbots, recommendation systems, and data dashboards — using Python, TensorFlow, and other industry tools. Every student leaves with a portfolio of projects.",
    },
    {
        category: "About the Program",
        question: "Do I need any prior coding experience?",
        answer: "No prior experience is needed for AI Explorers. For AI Builders and AI Innovators, basic familiarity with computers is helpful but not required. Our mentors adapt to every student's pace.",
    },
    {
        category: "About the Program",
        question: "What certificate does my child receive?",
        answer: "Students receive an AKMIND™ Certificate of Completion at the end of each program phase. The certificate is digitally verifiable and can be added to school portfolios and LinkedIn profiles.",
    },
    {
        category: "About the Program",
        question: "What is the difference between the 3 programs?",
        answer: "AI Explorers is for complete beginners focusing on no-code AI tools and fundamentals. AI Builders introduces Python and ML projects. AI Innovators covers advanced deep learning, NLP and computer vision for students ready for a real challenge.",
    },
    {
        category: "About the Program",
        question: "How long is each program?",
        answer: "Each program phase consists of 60 micro-lessons combining live sessions and self-paced content. Most students complete a phase in 4 to 6 months depending on their pace.",
    },

    // ── Support ───────────────────────────────────────────────────────────────
    {
        category: "Support",
        question: "How do I book a free demo class?",
        answer: "Click the \"Book Free Demo\" button anywhere on the site, fill in your child's details and pick a convenient date and time. A mentor will join you for a free 60-minute trial class with no obligation.",
    },
    {
        category: "Support",
        question: "What is your cancellation and refund policy?",
        answer: "We offer a full refund within 7 days of enrollment if you are not satisfied. After 7 days, unused sessions can be refunded on a pro-rata basis. Please email hello@akmind.com for refund requests.",
    },
    {
        category: "Support",
        question: "How do I contact AKMIND™ support?",
        answer: "You can reach us at hello@akmind.com or through the contact form on our website. We respond within 24 hours on all working days.",
    },
    {
        category: "Support",
        question: "Is my child's data safe?",
        answer: "Yes. AKMIND™ stores only the minimum data required to provide the service. We never sell or share your data with third parties. All data is encrypted and stored securely on AWS infrastructure in India.",
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
