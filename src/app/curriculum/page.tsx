"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Lock, ArrowRight, CheckCircle2 } from "lucide-react";

const MODULES = [
    {
        id: "explorers",
        title: "AI Explorers (Grades 5-6)",
        description: "Introduction to AI, Logic & Coding",
        topics: [
            "Introduction to Artificial Intelligence",
            "Block-based Coding Fundamentals",
            "Simple AI Models (Image Recognition)",
            "Logic & Problem Solving Games"
        ],
        gradient: "from-blue-500 to-indigo-600",
        bg: "bg-blue-50 border-blue-100"
    },
    {
        id: "builders",
        title: "AI Builders (Grades 7-8)",
        description: "Building Real-World AI Apps",
        topics: [
            "Python Programming Basics",
            "Building Chatbots with LLMs",
            "Computer Vision Projects",
            "Ethics in AI"
        ],
        gradient: "from-purple-500 to-pink-500",
        bg: "bg-purple-50 border-purple-100"
    },
    {
        id: "innovators",
        title: "AI Innovators (Grades 9-10)",
        description: "Deep Learning & Generative AI",
        topics: [
            "Advanced Python & Data Science",
            "Neural Networks & Deep Learning",
            "Generative AI (Text & Image)",
            "Capstone AI Project"
        ],
        gradient: "from-pink-500 to-red-500",
        bg: "bg-pink-50 border-pink-100"
    }
];

export default function CurriculumPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <div className="bg-slate-900 text-white py-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold mb-6"
                    >
                        Detailed AI Curriculum
                    </motion.h1>
                    <p className="text-xl text-slate-300">
                        A structured pathway from basics to advanced AI mastery.
                    </p>
                </div>
            </div>

            {/* Modules Grid */}
            <div className="max-w-6xl mx-auto px-4 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {MODULES.map((module, index) => (
                        <motion.div
                            key={module.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`rounded-3xl p-8 border ${module.bg} relative overflow-hidden group`}
                        >
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${module.gradient} mb-6 flex items-center justify-center text-white font-bold shadow-lg`}>
                                {index + 1}
                            </div>

                            <h3 className="text-2xl font-bold text-slate-900 mb-2">{module.title}</h3>
                            <p className="text-slate-600 font-medium mb-6">{module.description}</p>

                            <div className="space-y-3 mb-8">
                                {module.topics.map((topic, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                        <span className="text-slate-700 text-sm">{topic}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Locked Full Curriculum */}
                            <div className="relative p-4 rounded-xl bg-white/50 border border-slate-200 backdrop-blur-sm">
                                <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-[2px] z-10 rounded-xl">
                                    <div className="flex items-center gap-2 text-slate-500 font-bold text-sm bg-white px-3 py-1 rounded-full shadow-sm border border-slate-100">
                                        <Lock className="w-4 h-4" />
                                        <span>Full Syllabus Locked</span>
                                    </div>
                                </div>
                                <div className="opacity-40 blur-[1px] space-y-2 pointer-events-none select-none">
                                    <div className="h-2 bg-slate-300 rounded w-3/4"></div>
                                    <div className="h-2 bg-slate-300 rounded w-full"></div>
                                    <div className="h-2 bg-slate-300 rounded w-5/6"></div>
                                </div>
                            </div>

                            <button
                                onClick={() => router.push("/register")}
                                className="mt-8 w-full py-3 rounded-full bg-white border-2 border-slate-900 text-slate-900 font-bold hover:bg-slate-900 hover:text-white transition-all flex items-center justify-center gap-2 group-hover:shadow-lg"
                            >
                                View More & Register <ArrowRight className="w-4 h-4" />
                            </button>
                        </motion.div>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="mt-20 text-center">
                    <h2 className="text-3xl font-bold text-slate-900 mb-6">Ready to start?</h2>
                    <button
                        onClick={() => router.push("/register")}
                        className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all text-lg"
                    >
                        Book Your Spot Now
                    </button>
                </div>
            </div>
        </div>
    );
}
