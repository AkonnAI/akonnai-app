"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { clsx } from "clsx";

const TABS = ["AI Curriculum", "Mentorship", "Class Experience"];

const FAQS = [
    {
        category: "AI Curriculum",
        question: "Do students need coding experience for AI?",
        answer: "No prior experience is needed for our AI Explorers (Grades 5-6) program. We start with block-based coding and transition to Python. For AI Builders and Innovators, basic logical thinking is helpful but not mandatory as we cover foundations."
    },
    {
        category: "AI Curriculum",
        question: "What tools are used in AI classes?",
        answer: "Students use industry-standard tools like Python, TensorFlow (simplified), OpenAI APIs, and custom visual coding platforms designed for kids to build real AI models."
    },
    {
        category: "AI Curriculum",
        question: "Will students build real AI apps?",
        answer: "Yes! Every module ends with a Capstone Project. Students build Chatbots, Image Classifiers, Game AIs, and Voice Assistants that they can share with friends and family."
    },
    {
        category: "Mentorship",
        question: "Who are the mentors?",
        answer: "Our mentors are selected from top tech companies and universities. They have real-world experience in Data Science, Machine Learning, and Software Engineering."
    },
    {
        category: "Class Experience",
        question: "Are classes live or recorded?",
        answer: "All classes are 100% Live and 1:1. We believe personalized attention is crucial for mastering complex topics like Artificial Intelligence."
    },
    {
        category: "Class Experience",
        question: "Is Python required?",
        answer: "Python is the language of AI. We introduce Python syntax gradually, focusing on its application in AI rather than just dry theory. By Grade 8, students are comfortable writing Python scripts."
    }
];

const FAQ = () => {
    const [activeTab, setActiveTab] = useState("AI Curriculum");
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const filteredFaqs = FAQS.filter(faq => faq.category === activeTab);

    return (
        <section className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex justify-center mb-6">
                        <div className="relative">
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <HelpCircle className="w-24 h-24 text-purple-200" />
                            </motion.div>
                            <div className="absolute top-0 right-0 text-pink-300 text-4xl animate-bounce">?</div>
                            <div className="absolute bottom-0 left-0 text-blue-300 text-3xl">?</div>
                        </div>
                    </div>
                    <h2 className="text-4xl font-bold text-slate-900 mb-8">Frequently Asked <span className="text-purple-600">Questions</span></h2>

                    {/* Tabs */}
                    <div className="inline-flex flex-wrap justify-center gap-4 border border-gray-100 p-2 rounded-full shadow-sm bg-white">
                        {TABS.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => { setActiveTab(tab); setOpenIndex(null); }}
                                className={clsx(
                                    "px-6 py-2 rounded-full text-sm font-bold transition-all",
                                    activeTab === tab
                                        ? "bg-purple-600 text-white shadow-md"
                                        : "bg-transparent text-purple-600 hover:bg-purple-50"
                                )}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* FAQ List */}
                <div className="space-y-4 min-h-[400px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-4"
                        >
                            {filteredFaqs.map((faq, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="border border-gray-200 rounded-xl overflow-hidden hover:border-purple-300 transition-colors bg-white"
                                >
                                    <button
                                        onClick={() => toggleAccordion(index)}
                                        className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none bg-white hover:bg-gray-50 transition-colors"
                                    >
                                        <span className={clsx("font-bold text-lg", openIndex === index ? "text-purple-700" : "text-slate-700")}>
                                            {faq.question}
                                        </span>
                                        {openIndex === index ? (
                                            <ChevronUp className="w-5 h-5 text-purple-600 flex-shrink-0" />
                                        ) : (
                                            <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                        )}
                                    </button>

                                    <div
                                        className={clsx(
                                            "px-6 overflow-hidden transition-all duration-300 ease-in-out",
                                            openIndex === index ? "max-h-48 pb-6 opacity-100" : "max-h-0 opacity-0"
                                        )}
                                    >
                                        <p className="text-slate-600 leading-relaxed">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
