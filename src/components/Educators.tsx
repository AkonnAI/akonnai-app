"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";

const MENTORS = [
    {
        name: "Nagaraj Ethirajulu",
        photo: "/images/mentors/nagaraj.jpg",
        role: "Doctorate Researcher | Generative AI & Emerging Technologies",
        description: "Nagaraj Ethirajulu is a Doctorate Researcher in Emerging Technologies with Generative AI as concentration. Nagaraj has over 20+ years of experience in IT Product and Services Industry. Nagaraj's core expertise spans Python, Machine Learning, Deep Learning, Neural Networks, Generative AI, Large Language Models, and Applied AI Research.",
        objectPosition: "center",
    },
    {
        name: "Jaibin Jose",
        photo: "/images/mentors/jebian.jpg",
        role: "AI Mentor & Industry Expert",
        description: "A creative AI practitioner who makes deep learning accessible and thrilling for school students. Known for turning abstract AI ideas into tangible projects.",
    },
    {
        name: "Akhil",
        photo: "/images/mentors/akhil.jpg",
        role: "AI Mentor & Industry Expert",
        description: "Passionate about sparking curiosity in school students through hands-on AI projects. Brings real-world industry experience into every session.",
    }
];

const Educators = () => {
    return (
        <section className="py-24 bg-slate-50">
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
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
                            {/* Profile Photo */}
                            <div className="relative w-32 h-32 rounded-full overflow-hidden mb-6 ring-4 ring-indigo-50 shadow-md">
                                <Image
                                    src={mentor.photo}
                                    alt={mentor.name}
                                    fill
                                    className="object-cover"
                                    style={{ objectPosition: (mentor as typeof MENTORS[0] & { objectPosition?: string }).objectPosition ?? "top" }}
                                    sizes="128px"
                                />
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
