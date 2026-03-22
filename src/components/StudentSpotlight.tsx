"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, MapPin } from "lucide-react";

const TESTIMONIALS = [
    {
        name: "Arjun Sharma",
        grade: "Grade 8 · AI Builders",
        location: "Bangalore",
        quote: "I built my first image recognition model in just 3 weeks. My mentor Akhil explained everything so clearly. I never thought I could do this at my age!",
        initials: "AS",
    },
    {
        name: "Priya Nair",
        grade: "Grade 6 · AI Explorers",
        location: "Chennai",
        quote: "AKMIND™ made AI so fun and easy to understand. I trained my own Teachable Machine model to recognize my cats. My parents were so impressed!",
        initials: "PN",
    },
    {
        name: "Rohan Mehta",
        grade: "Grade 10 · AI Innovators",
        location: "Mumbai",
        quote: "The curriculum is genuinely advanced. I am now working on a real NLP project for my school science fair. My mentor Nagaraj is incredible.",
        initials: "RM",
    },
    {
        name: "Ananya Reddy",
        grade: "Grade 7 · AI Builders",
        location: "Hyderabad",
        quote: "I used to think coding was boring. AKMIND™ completely changed that. Every class feels like solving a puzzle. I look forward to it every week!",
        initials: "AR",
    },
    {
        name: "Karthik Iyer",
        grade: "Grade 9 · AI Innovators",
        location: "Pune",
        quote: "My mentor helped me build a sentiment analysis tool for my dad's business. The project actually works and my dad uses it. That is the coolest thing ever.",
        initials: "KI",
    },
];

const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.45, ease: [0.25, 0.1, 0.25, 1] as const },
    }),
};

const StudentSpotlight = () => {
    const [showAll, setShowAll] = useState(false);

    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-10 md:mb-14">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">Student Spotlight</h2>
                        <p className="text-slate-500 text-base md:text-lg">Real stories from real students worldwide</p>
                    </motion.div>
                </div>

                {/* Cards grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                    {TESTIMONIALS.map((t, i) => (
                        <motion.div
                            key={t.name}
                            custom={i}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-40px" }}
                            variants={cardVariants}
                            className={`bg-white rounded-xl shadow-sm p-5 flex flex-col gap-4 border border-slate-100 hover:shadow-md transition-shadow ${
                                i >= 3 && !showAll ? "hidden sm:flex" : "flex"
                            }`}
                        >
                            {/* Stars */}
                            <div className="flex gap-0.5">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <Star key={s} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                ))}
                            </div>

                            {/* Quote */}
                            <p className="text-slate-600 text-sm leading-relaxed italic flex-1">
                                &ldquo;{t.quote}&rdquo;
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
                                <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-bold shrink-0">
                                    {t.initials}
                                </div>
                                <div>
                                    <p className="font-bold text-slate-900 text-sm">{t.name}</p>
                                    <p className="text-slate-400 text-xs flex items-center gap-1 mt-0.5">
                                        <MapPin className="w-3 h-3" />
                                        {t.location}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Show more button — mobile only */}
                {!showAll && (
                    <div className="mt-6 text-center sm:hidden">
                        <button
                            onClick={() => setShowAll(true)}
                            className="px-6 py-3 border border-slate-200 rounded-full text-slate-600 font-semibold text-sm hover:border-indigo-300 hover:text-indigo-600 transition-colors"
                        >
                            Show more stories
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default StudentSpotlight;
