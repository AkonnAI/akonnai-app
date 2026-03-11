"use client";

import { motion } from "framer-motion";
import { Star, PlayCircle, Quote } from "lucide-react";

const StudentSpotlight = () => {
    return (
        <section className="py-24 bg-gradient-to-br from-indigo-900 to-purple-900 text-white overflow-hidden relative">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-500 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-500 rounded-full blur-[100px]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">Student Spotlight</h2>
                    <p className="text-indigo-200">Celebrating the next generation of innovators</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 items-center justify-center">

                    {/* Video Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.02 }}
                        className="w-full lg:w-1/2 max-w-lg relative group"
                    >
                        <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
                        <div className="relative aspect-video bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                            {/* Placeholder for Student Video */}
                            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-500/20 to-purple-500/20">
                                <div className="w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    className="bg-white/20 backdrop-blur-md p-4 rounded-full cursor-pointer hover:bg-white/30 transition-colors"
                                >
                                    <PlayCircle className="w-12 h-12 text-white fill-white/50" />
                                </motion.div>
                            </div>

                            <div className="absolute bottom-4 left-4">
                                <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-mono text-green-400 border border-white/10">
                                    Thinking...
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Testimonial Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="w-full lg:w-1/2 max-w-lg"
                    >
                        <Quote className="text-yellow-400 w-12 h-12 mb-6 opacity-80" />
                        <h3 className="text-3xl font-bold leading-tight mb-6">
                            &quot;At AKMIND, I built my first <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">AI Chatbot</span> that helps my grandma use her phone!&quot;
                        </h3>

                        <div className="flex items-center gap-1 mb-4">
                            {[1, 2, 3, 4, 5].map((_, i) => (
                                <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                            ))}
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                            <div>
                                <h4 className="font-bold text-lg">Aarav Patel</h4>
                                <div className="flex items-center gap-2">
                                    <span className="text-indigo-200 text-sm">Class 8 Student</span>
                                    <span className="text-xs bg-white/10 px-2 py-0.5 rounded text-indigo-100">🇮🇳 India</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default StudentSpotlight;
