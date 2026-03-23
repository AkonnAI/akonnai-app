"use client";

import { motion } from "framer-motion";
import { UserPlus, Calendar, Laptop, Trophy, PlayCircle } from "lucide-react";

const STEPS = [
    {
        number: "01",
        Icon: UserPlus,
        title: "Share Your Details",
        description: "Tell us about your child — name, age and which program interests them most.",
    },
    {
        number: "02",
        Icon: Calendar,
        title: "Book Free Demo",
        description: "Pick a date and time that suits you. A qualified AI mentor joins you for a free 60-min class.",
    },
    {
        number: "03",
        Icon: Laptop,
        title: "Start Learning",
        description: "Your child dives into hands-on AI projects with expert mentor guidance and gamified challenges every session.",
    },
    {
        number: "04",
        Icon: Trophy,
        title: "Get Certified",
        description: "Complete the program and receive an AKMIND™ certificate. Build a portfolio of real AI projects.",
    },
];

const HowItWorks = () => {
    return (
        <section className="py-16 md:py-28 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-20"
                >
                    <span className="inline-block px-4 py-1 bg-indigo-50 text-indigo-600 border border-indigo-100 rounded-full text-sm font-medium mb-5">
                        HOW IT WORKS
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
                        Your child&apos;s AI journey starts here
                    </h2>
                    <p className="text-slate-500 max-w-xl mx-auto leading-relaxed">
                        From booking a free demo to building real AI projects in just a few simple steps
                    </p>
                </motion.div>

                {/* Steps — horizontal timeline */}
                <div className="relative">
                    {/* Connecting dashed line (desktop only) */}
                    <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px border-t-2 border-dashed border-indigo-200 z-0" />

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                        {STEPS.map((step, i) => (
                            <motion.div
                                key={step.number}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.12, duration: 0.45 }}
                                whileHover={{ y: -4, boxShadow: "0 8px 30px rgba(0,0,0,0.08)" }}
                                className="bg-white rounded-2xl p-4 md:p-6 border border-slate-100 shadow-sm hover:border-indigo-100 transition-all duration-300 flex flex-col sm:flex-row sm:items-start md:flex-col md:items-center md:text-center items-start text-left gap-4"
                            >
                                {/* Number circle */}
                                <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-indigo-50 flex items-center justify-center mb-5 relative z-10 shrink-0">
                                    <span className="text-lg md:text-2xl font-bold text-indigo-600">{step.number}</span>
                                </div>

                                {/* Icon */}
                                <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center md:mb-4 shrink-0">
                                    <step.Icon className="w-5 h-5 text-white" />
                                </div>

                                <h3 className="font-bold text-slate-900 text-base mb-2">{step.title}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">{step.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Video */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mt-20"
                >
                    <div className="flex items-center gap-2 justify-center mb-4">
                        <PlayCircle className="w-4 h-4 text-indigo-500" />
                        <span className="text-indigo-600 text-sm font-semibold">See AKMIND™ in action</span>
                    </div>
                    <div className="relative rounded-xl md:rounded-2xl overflow-hidden shadow-xl border-2 border-indigo-100 bg-black aspect-video max-w-4xl mx-auto">
                        <video
                            className="w-full h-full object-cover"
                            autoPlay
                            muted
                            loop
                            playsInline
                            poster="/images/slide1.png"
                        >
                            <source src="/media/intro.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent pointer-events-none" />
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default HowItWorks;
