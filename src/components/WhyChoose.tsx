"use client";

import { motion } from "framer-motion";
import { Play, Gamepad2, Bot, Trophy, Users, Award } from "lucide-react";

const FEATURES = [
    {
        Icon: Play,
        iconBg: "bg-indigo-500/20",
        iconColor: "text-indigo-400",
        title: "Micro-Learning Format",
        description: "11-minute concept videos designed for how the brain actually learns. Short, sharp and packed with real demos and animations.",
    },
    {
        Icon: Gamepad2,
        iconBg: "bg-purple-500/20",
        iconColor: "text-purple-400",
        title: "Story-Based Games",
        description: "After every lesson, an interactive story game puts you inside the concept. You are not watching AI — you are living it.",
    },
    {
        Icon: Bot,
        iconBg: "bg-green-500/20",
        iconColor: "text-green-400",
        title: "AI Learning Guide",
        description: "Your personal AI companion available 24/7. Takes notes, answers questions, tracks progress and keeps you motivated throughout.",
    },
    {
        Icon: Trophy,
        iconBg: "bg-amber-500/20",
        iconColor: "text-amber-400",
        title: "XP, Badges & Leaderboards",
        description: "Earn XP for every lesson completed, unlock achievement badges and compete on leaderboards. Learning has never felt this good.",
    },
    {
        Icon: Users,
        iconBg: "bg-blue-500/20",
        iconColor: "text-blue-400",
        title: "Live Mentor Sessions",
        description: "2 live sessions per module with expert AI mentors — for doubt clearing, project reviews and interactive group activities.",
    },
    {
        Icon: Award,
        iconBg: "bg-pink-500/20",
        iconColor: "text-pink-400",
        title: "Verifiable Certificate",
        description: "Complete a program phase and earn a digitally verifiable AKMIND certificate — recognised in school portfolios and beyond.",
    },
];

const WhyChoose = () => {
    return (
        <section className="bg-slate-900 py-16 md:py-28 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full text-sm font-medium mb-5">
                        WHY AKMIND™
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                        Everything that makes{" "}
                        <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            AKMIND different
                        </span>
                    </h2>
                    <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                        Pre-recorded micro-lessons. Story-based games. Live mentor sessions. An AI guide that never sleeps. This is not just another online course.
                    </p>
                </motion.div>

                {/* Feature grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {FEATURES.map((feature, i) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08, duration: 0.45 }}
                            whileHover={{ y: -2, borderColor: "rgba(100,116,139,0.8)" }}
                            className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-4 md:p-6 transition-all duration-300"
                        >
                            <div className={`w-12 h-12 rounded-xl ${feature.iconBg} flex items-center justify-center mb-4`}>
                                <feature.Icon className={`w-6 h-6 ${feature.iconColor}`} />
                            </div>
                            <h3 className="text-white font-semibold text-lg mt-4 mb-2">{feature.title}</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default WhyChoose;
