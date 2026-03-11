"use client";

import { motion } from "framer-motion";
import { Brain, Bot, FileText, Smartphone, ShieldCheck, Database, Sparkles } from "lucide-react";

const SKILLS = [
    { name: "Machine Learning", icon: <Brain />, color: "bg-blue-100 text-blue-600" },
    { name: "Generative AI", icon: <Sparkles />, color: "bg-purple-100 text-purple-600" },
    { name: "Prompt Engineering", icon: <FileText />, color: "bg-pink-100 text-pink-600" },
    { name: "AI Automation", icon: <Bot />, color: "bg-orange-100 text-orange-600" },
    { name: "AI Ethics", icon: <ShieldCheck />, color: "bg-green-100 text-green-600" },
    { name: "Data Thinking", icon: <Database />, color: "bg-indigo-100 text-indigo-600" }
];

const SkillsForSuccess = () => {
    return (
        <section className="py-24 bg-gray-50 relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-10 right-0 opacity-20 pointer-events-none">
                <img src="/media/abstract.gif" className="w-40" alt="" />
            </div>
            <div className="absolute bottom-20 left-10 opacity-20 pointer-events-none">
                <img src="/media/arrows.gif" className="w-24" alt="" />
            </div>
            <div className="absolute top-1/3 left-20 opacity-15 pointer-events-none">
                <img src="/media/question.gif" className="w-16 rotate-12" alt="" />
            </div>
            <div className="absolute bottom-10 right-1/4 opacity-15 pointer-events-none">
                <img src="/media/stars.gif" className="w-20" alt="" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl font-bold text-slate-900 mb-4"
                    >
                        Skills for the <span className="text-purple-600">AI Era</span>
                    </motion.h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        We don&apos;t just teach coding. We teach students how to think, create, and innovate with Artificial Intelligence.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {SKILLS.map((skill, index) => (
                        <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center gap-4 transition-all hover:border-purple-200"
                        >
                            <div className={`w-14 h-14 rounded-full flex items-center justify-center ${skill.color}`}>
                                {/* Clone element to enforce size if needed, though class setup handles it */}
                                <div className="w-7 h-7 flex items-center justify-center">{skill.icon}</div>
                            </div>
                            <h3 className="font-bold text-slate-800">{skill.name}</h3>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-purple-600 font-bold hover:text-purple-700 flex items-center justify-center gap-2 mx-auto"
                    >
                        View Curriculum Details <span className="text-xl">→</span>
                    </motion.button>
                </div>
            </div>
        </section>
    );
};

export default SkillsForSuccess;
