"use client";

import { motion } from "framer-motion";
import { Code2, Brain, Eye, MessageSquare, BarChart2, Cpu, ShieldCheck, Lightbulb, Wrench, Target, GitBranch, FileText } from "lucide-react";

const SKILLS = [
    { name: "Python Programming", Icon: Code2 },
    { name: "Machine Learning", Icon: Brain },
    { name: "Computer Vision", Icon: Eye },
    { name: "Natural Language Processing", Icon: MessageSquare },
    { name: "Data Analysis", Icon: BarChart2 },
    { name: "Deep Learning", Icon: Cpu },
    { name: "AI Ethics", Icon: ShieldCheck },
    { name: "Problem Solving", Icon: Lightbulb },
    { name: "Project Building", Icon: Wrench },
    { name: "Critical Thinking", Icon: Target },
    { name: "Neural Networks", Icon: GitBranch },
    { name: "Prompt Engineering", Icon: FileText },
];

const SkillsForSuccess = () => {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <span className="inline-block px-4 py-1 bg-indigo-50 text-indigo-600 border border-indigo-100 rounded-full text-sm font-medium mb-5">
                        SKILLS YOU WILL GAIN
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3">
                        Skills that prepare your child for{" "}
                        <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            tomorrow&apos;s world
                        </span>
                    </h2>
                </motion.div>

                {/* Skills pills */}
                <div className="flex flex-wrap justify-center gap-3">
                    {SKILLS.map((skill, i) => (
                        <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05, duration: 0.4 }}
                            className="flex items-center gap-2 bg-white border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 rounded-full px-5 py-3 transition-all duration-200 cursor-default group"
                        >
                            <skill.Icon className="w-4 h-4 text-indigo-500 group-hover:text-indigo-600 shrink-0" />
                            <span className="text-slate-700 group-hover:text-indigo-700 text-sm font-medium whitespace-nowrap transition-colors">
                                {skill.name}
                            </span>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default SkillsForSuccess;
