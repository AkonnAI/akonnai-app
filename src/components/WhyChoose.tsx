"use client";

import { motion } from "framer-motion";
import { Users, Code, User, Award, Zap, Globe } from "lucide-react";

const FEATURES = [
    {
        Icon: Users,
        iconBg: "bg-indigo-500/20",
        iconColor: "text-indigo-400",
        title: "Expert AI Mentors",
        description: "Learn from industry professionals with real-world AI experience. Top 1% of educators.",
    },
    {
        Icon: Code,
        iconBg: "bg-purple-500/20",
        iconColor: "text-purple-400",
        title: "Hands-on Projects",
        description: "No theory-only classes. Every session involves building something real with actual code.",
    },
    {
        Icon: User,
        iconBg: "bg-blue-500/20",
        iconColor: "text-blue-400",
        title: "1-on-1 Attention",
        description: "Fully personalised sessions. Your child gets 100% of the mentor's focus every class.",
    },
    {
        Icon: Award,
        iconBg: "bg-pink-500/20",
        iconColor: "text-pink-400",
        title: "Verifiable Certificate",
        description: "AKMIND™ certificates are digitally verifiable and add real value to school portfolios.",
    },
    {
        Icon: Zap,
        iconBg: "bg-amber-500/20",
        iconColor: "text-amber-400",
        title: "Flexible Scheduling",
        description: "Classes scheduled around your child's timetable. Reschedule anytime with 12 hours notice.",
    },
    {
        Icon: Globe,
        iconBg: "bg-green-500/20",
        iconColor: "text-green-400",
        title: "India-Focused Curriculum",
        description: "Case studies and projects built around Indian context — agriculture, healthcare, education.",
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
                        Everything your child needs to{" "}
                        <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            succeed in AI
                        </span>
                    </h2>
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
