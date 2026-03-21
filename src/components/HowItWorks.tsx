"use client";

import { motion } from "framer-motion";
import { UserCheck, BookOpen, Rocket } from "lucide-react";

const STEPS = [
    {
        icon: <UserCheck className="w-8 h-8 text-blue-600" />,
        title: "1. Share Student Details",
        description: "Tell us about your child’s interests and learning goals.",
        bg: "bg-blue-50 border-blue-100"
    },
    {
        icon: <BookOpen className="w-8 h-8 text-purple-600" />,
        title: "2. Explore Curriculum",
        description: "Discover a structured AI pathway designed for progressive skill development.",
        bg: "bg-purple-50 border-purple-100"
    },
    {
        icon: <Rocket className="w-8 h-8 text-pink-600" />,
        title: "3. Start Learning",
        description: "Begin hands-on AI projects guided by expert mentors.",
        bg: "bg-pink-50 border-pink-100"
    }
];

const HowItWorks = () => {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-16">

                    {/* Left Side: Steps */}
                    <div className="w-full lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="mb-12"
                        >
                            <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">How It Works</h2>
                            <p className="text-lg text-slate-500 font-medium">
                                A simple, transparent process to get started with AKMIND™.
                            </p>
                        </motion.div>

                        <div className="space-y-6">
                            {STEPS.map((step, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                    whileHover={{ x: 10, backgroundColor: "rgba(249, 250, 251, 1)" }}
                                    className={`flex items-start gap-6 p-6 rounded-2xl border border-transparent hover:border-gray-100 transition-all cursor-default`}
                                >
                                    <div className={`p-4 rounded-xl ${step.bg} flex-shrink-0`}>
                                        {step.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                                        <p className="text-slate-600 leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side: Video Embed */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full lg:w-1/2"
                    >
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-100 bg-black aspect-video group">
                            <video
                                className="w-full h-full object-cover"
                                autoPlay
                                muted
                                loop
                                playsInline
                                poster="/images/slide1.png" // Fallback image if video fails/loads
                            >
                                <source src="/media/intro.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>

                            {/* Optional: Overlay gradient for better integration if needed */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent pointer-events-none"></div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
