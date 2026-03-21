"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Laptop, Heart, Info } from "lucide-react";

const CARDS = [
    {
        icon: <ShieldCheck className="w-6 h-6 text-indigo-600" />,
        title: "Age Suitability",
        content:
            "AKMIND™ programs are designed for students aged 10 to 16. For younger students, we recommend a parent or guardian to be present during the first few sessions to help with any technical setup or questions.",
    },
    {
        icon: <Laptop className="w-6 h-6 text-indigo-600" />,
        title: "Device Requirements",
        content:
            "A laptop or desktop computer with a stable internet connection is required for all sessions. Mobile phones and tablets are not supported. Please ensure the device is set up and tested before the first class.",
    },
    {
        icon: <Heart className="w-6 h-6 text-indigo-600" />,
        title: "Parent Involvement",
        content:
            "We encourage parents to stay involved in their child's learning journey. You will receive a progress update after every session and can reach out to your child's mentor at any time via hello@akmind.com.",
    },
];

const ParentalGuidelines = () => {
    return (
        <section className="py-16 px-4 bg-white">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-10"
                >
                    <h2 className="text-3xl font-bold text-slate-900 mb-2">Parental Guidelines</h2>
                    <p className="text-slate-500 text-base">What parents should know before enrolling</p>
                </motion.div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {CARDS.map((card, index) => (
                        <motion.div
                            key={card.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.12, duration: 0.5 }}
                            className="bg-white border-l-4 border-indigo-600 rounded-xl shadow-sm p-6"
                        >
                            <div className="mb-4">{card.icon}</div>
                            <h3 className="font-bold text-slate-900 text-lg mb-2">{card.title}</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">{card.content}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Pink info banner */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="flex items-start gap-3 bg-pink-50 border border-pink-200 rounded-xl p-5"
                >
                    <Info className="w-5 h-5 text-pink-500 shrink-0 mt-0.5" />
                    <p className="text-pink-800 text-sm leading-relaxed">
                        AKMIND™ programs are best suited for students aged 10 and above. For younger learners, significant parental involvement is recommended as students will need adult assistance to manage technical aspects during live sessions.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default ParentalGuidelines;
