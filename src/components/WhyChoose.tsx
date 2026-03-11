"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const FEATURES = [
    {
        title: "Real-world AI Projects",
        description: "Students don’t just learn theory — they build real AI applications from chatbots to computer vision systems.",
        icon: "/media/icon-projects.gif"
    },
    {
        title: "Industry Expert Mentors",
        description: "Learn directly from experienced AI professionals and senior developers working on real-world systems.",
        icon: "/media/icon-mentors.gif"
    },
    {
        title: "Portfolio Certification",
        description: "Earn structured certification and build a strong AI portfolio for future academic and career growth.",
        icon: "/media/icon-certification.gif"
    }
];

const WhyChoose = () => {
    return (
        <section className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left Side - Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative h-[600px] w-full rounded-3xl overflow-hidden shadow-xl group"
                    >
                        <Image
                            src="/media/why-side-image.png"
                            alt="Why Choose AKMIND"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </motion.div>

                    {/* Right Side - Content */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="mb-12"
                        >
                            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                                Why Choose <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">AKMIND?</span>
                            </h2>
                            <p className="text-lg text-slate-600 leading-relaxed">
                                We go beyond coding basics. Our curriculum is designed to create the next generation of AI innovators.
                            </p>
                        </motion.div>

                        <div className="space-y-6">
                            {FEATURES.map((feature, index) => (
                                <motion.div
                                    key={feature.title}
                                    initial={{ opacity: 0, x: 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.15 }}
                                    whileHover={{ y: -4, backgroundColor: "#ffffff" }}
                                    className="flex items-start gap-6 p-6 rounded-2xl bg-white shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
                                >
                                    <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-purple-50 flex items-center justify-center overflow-hidden">
                                        <Image
                                            src={feature.icon}
                                            alt={feature.title}
                                            width={56}
                                            height={56}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                                        <p className="text-slate-600 leading-relaxed text-sm lg:text-base">
                                            {feature.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChoose;
