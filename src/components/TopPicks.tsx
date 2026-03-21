"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const TopPicks = () => {
    return (
        <section className="py-24 bg-slate-50 relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-20 right-10 opacity-20 pointer-events-none">
                <img src="/media/abstract.gif" className="w-32" alt="" />
            </div>
            <div className="absolute bottom-10 left-20 opacity-20 pointer-events-none">
                <img src="/media/question.gif" className="w-20" alt="" />
            </div>
            <div className="absolute top-10 left-10 opacity-15 pointer-events-none">
                <img src="/media/stars.gif" className="w-24" alt="" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl font-bold text-slate-900 mb-2">Recommended Track</h2>
                        <p className="text-lg text-slate-500">Most popular choice for future innovators</p>
                    </motion.div>
                </div>

                {/* Featured Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ scale: 1.02 }}
                    className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-300 max-w-5xl mx-auto"
                >
                    <div className="flex flex-col md:flex-row">
                        {/* Left Side - Image */}
                        <div className="w-full md:w-1/2 relative h-80 overflow-hidden">
                            <Image
                                src="/images/ai-builders.png"
                                alt="AI Builders"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent" />
                        </div>

                        {/* Right Side - Content */}
                        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
                            <div className="mb-6">
                                <h3 className="text-3xl font-bold text-slate-900 mb-2">AI Builders</h3>
                                <p className="text-sm font-bold text-purple-600 uppercase tracking-wider mb-4">Most Popular</p>
                                <p className="text-slate-600 text-lg leading-relaxed">
                                    Building Real-World AI Apps. Learn to create smart chatbots, games, and intelligent systems.
                                </p>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-fit px-8 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold shadow-md hover:shadow-lg transition-all"
                            >
                                View Program
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default TopPicks;
