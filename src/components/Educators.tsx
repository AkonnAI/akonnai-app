"use client";

import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";

const MENTORS = [
    {
        name: "Dr. Nagaraj Ethirajulu",
        role: "AI PhD | Research & Advanced Machine Learning",
        description: "Specializes in Deep Learning, Neural Networks, and Applied AI Research. Guides advanced AI curriculum and research-driven learning.",
        imageBg: "bg-slate-200"
    },
    {
        name: "Abhishek Vinayak",
        role: "Senior AI Developer",
        description: "Expert in Generative AI, Python, LLM applications, and real-world AI product development.",
        imageBg: "bg-slate-200"
    },
    {
        name: "Hebel Niraj",
        role: "Senior AI Developer",
        description: "Focused on AI systems engineering, deployment, and building scalable AI-powered applications.",
        imageBg: "bg-slate-200"
    },
    {
        name: "Jais Jose",
        role: "Critical Thinking & Communication",
        description: "Empowers students with logical reasoning, effective communication, and the critical thinking skills needed for the AI era.",
        imageBg: "bg-slate-200"
    }
];

const Educators = () => {
    return (
        <section className="py-24 bg-white border-t border-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Meet Your AI Mentors</h2>
                        <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
                            Learn from industry leaders building real-world AI systems.
                        </p>
                    </motion.div>
                </div>

                {/* Mentors Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {MENTORS.map((mentor, index) => (
                        <motion.div
                            key={mentor.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2, duration: 0.5 }}
                            whileHover={{ y: -4 }}
                            className="bg-white rounded-xl p-8 shadow-[0_4px_20px_-12px_rgba(0,0,0,0.1)] border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center"
                        >
                            {/* Profile Image Placeholder */}
                            <div className={`w-32 h-32 rounded-full ${mentor.imageBg} mb-6 flex items-center justify-center shadow-inner relative overflow-hidden`}>
                                <div className="absolute inset-0 bg-gradient-to-tr from-black/5 to-transparent"></div>
                                <span className="text-4xl text-slate-400 font-bold opacity-30">
                                    {mentor.name.charAt(0)}
                                </span>
                            </div>

                            {/* Content */}
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">{mentor.name}</h3>
                            <p className="text-purple-600 font-bold text-sm mb-4 uppercase tracking-wide">
                                {mentor.role}
                            </p>
                            <p className="text-slate-500 leading-relaxed text-sm mb-6">
                                {mentor.description}
                            </p>

                            {/* Optional Social Icon */}
                            <div className="mt-auto opacity-0 hover:opacity-100 transition-opacity">
                                <Linkedin className="w-5 h-5 text-slate-400 hover:text-blue-600 cursor-pointer" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Educators;
