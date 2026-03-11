"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const PROGRAMS = [
    {
        id: "explorers",
        title: "AI Explorers",
        grades: "Grades 5–6",
        description: "Introduction to AI, Logic & Coding",
        image: "/images/ai-explorers.png",
        gradient: "from-blue-500 to-indigo-600",
        shadow: "group-hover:shadow-blue-200"
    },
    {
        id: "builders",
        title: "AI Builders",
        grades: "Grades 7–8",
        description: "Building Real-World AI Apps",
        image: "/images/ai-builders.png",
        gradient: "from-purple-500 to-pink-500",
        shadow: "group-hover:shadow-purple-200"
    },
    {
        id: "innovators",
        title: "AI Innovators",
        grades: "Grades 9–10",
        description: "Deep Learning & Generative AI",
        image: "/images/ai-innovators.png",
        gradient: "from-pink-500 to-red-500",
        shadow: "group-hover:shadow-pink-200"
    }
];

const AIProgramsSection = () => {
    return (
        <section className="py-24 bg-gray-50 relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-10 left-10 opacity-20 pointer-events-none">
                <img src="/media/stars.gif" className="w-24" alt="" />
            </div>
            <div className="absolute bottom-20 right-10 opacity-20 pointer-events-none">
                <img src="/media/arrows.gif" className="w-28 rotate-180" alt="" />
            </div>
            <div className="absolute top-40 right-20 opacity-15 pointer-events-none">
                <img src="/media/planets.gif" className="w-20" alt="" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Our AI Learning Tracks</h2>
                        <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
                            Curriculum designed to take students from curiosity to mastery.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {PROGRAMS.map((program, index) => (
                        <motion.div
                            key={program.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2, type: "spring", stiffness: 50 }}
                            whileHover={{ y: -10, scale: 1.03 }}
                            className={`group relative bg-white rounded-3xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl ${program.shadow}`}
                        >
                            {/* Image Section */}
                            <div className="relative h-64 w-full overflow-hidden">
                                <Image
                                    src={program.image}
                                    alt={program.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className={`absolute inset-0 bg-gradient-to-t ${program.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-300`} />
                            </div>

                            {/* Content Section */}
                            <div className="p-8 relative z-10 bg-white">
                                <h3 className="text-2xl font-bold text-slate-900 mb-1">{program.title}</h3>
                                <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">{program.grades}</p>
                                <p className="text-slate-600 mb-8 font-medium">{program.description}</p>

                                <button className={`w-full py-3 rounded-full font-bold text-white bg-gradient-to-r ${program.gradient} shadow-md transition-transform duration-200 group-hover:scale-105`}>
                                    View Program
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AIProgramsSection;
