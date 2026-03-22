"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";

const MENTORS = [
    {
        name: "Nagaraj Ethirajulu",
        photo: "/images/mentors/nagaraj.jpg",
        title: "AI Mentor & Industry Expert",
        bio: "A seasoned AI professional who transforms complex machine learning concepts into exciting discoveries for young minds worldwide. Nagaraj believes every student has the potential to build the future with AI.",
        tags: ["Python", "Machine Learning", "Deep Learning"],
    },
    {
        name: "Akhil Raj",
        photo: "/images/mentors/akhil.jpg",
        title: "AI Mentor & Industry Expert",
        bio: "Passionate about sparking curiosity in school students through hands-on AI projects. Akhil Raj brings real-world industry experience into every session, making AI practical, fun, and deeply inspiring.",
        tags: ["Computer Vision", "AI Projects", "Python"],
    },
    {
        name: "Jaibin Jose",
        photo: "/images/mentors/jebian.jpg",
        title: "AI Mentor & Industry Expert",
        bio: "A creative AI practitioner who makes deep learning accessible and thrilling for school students. Jaibin Jose is known for turning abstract AI ideas into tangible projects students are proud to show the world.",
        tags: ["Deep Learning", "Computer Vision", "AI Projects"],
    },
];

const cardVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.12, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
    }),
};

export default function MentorsPage() {
    return (
        <main className="min-h-screen flex flex-col bg-white">

            {/* Hero */}
            <section className="py-14 sm:py-20 bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden">
                <div className="absolute top-10 right-10 w-72 h-72 bg-indigo-100 rounded-full blur-3xl opacity-50 pointer-events-none" />
                <div className="absolute bottom-0 left-10 w-56 h-56 bg-purple-100 rounded-full blur-3xl opacity-40 pointer-events-none" />
                <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
                    <span className="inline-block px-4 py-1.5 bg-indigo-100 text-indigo-700 text-sm font-bold rounded-full uppercase tracking-widest mb-6">
                        Our Mentors
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 mb-5 leading-tight">
                        Meet Your{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
                            AI Mentors
                        </span>
                    </h1>
                    <p className="text-xl text-slate-600 leading-relaxed">
                        Learn from India&apos;s top AI professionals. Our mentors bring real
                        industry experience into every session.
                    </p>
                </div>
            </section>

            {/* Mentor Cards — 2x2 grid */}
            <section className="py-14 sm:py-20 bg-white">
                <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {MENTORS.map((mentor, i) => (
                        <motion.div
                            key={mentor.name}
                            custom={i}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-60px" }}
                            variants={cardVariants}
                            className="bg-white rounded-3xl shadow-md hover:shadow-xl border border-slate-100 hover:border-indigo-100 transition-all duration-300 p-8 flex flex-col items-center text-center justify-between"
                        >
                            {/* Photo */}
                            <div className="relative w-28 h-28 rounded-full overflow-hidden mb-5 ring-4 ring-indigo-100 shadow-lg">
                                <Image
                                    src={mentor.photo}
                                    alt={mentor.name}
                                    fill
                                    className="object-cover object-top"
                                    sizes="112px"
                                />
                            </div>

                            {/* Name & Title */}
                            <h3 className="text-xl font-bold text-slate-900 mb-1">{mentor.name}</h3>
                            <p className="text-sm font-semibold text-indigo-600 mb-4">{mentor.title}</p>

                            {/* Bio */}
                            <p className="text-slate-500 text-sm leading-relaxed mb-6">{mentor.bio}</p>

                            {/* Expertise Tags */}
                            <div className="flex flex-wrap justify-center gap-2">
                                {mentor.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Become a Mentor CTA */}
            <section className="py-20 bg-gradient-to-br from-indigo-600 to-purple-700 text-center">
                <div className="max-w-2xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Are you an AI professional?
                    </h2>
                    <p className="text-indigo-100 text-lg mb-8 leading-relaxed">
                        Join our mentor community and help shape the next generation of
                        AI innovators worldwide. Make an impact — one session at a time.
                    </p>
                    <a
                        href="/become-mentor"
                        className="inline-block px-10 py-4 bg-white text-indigo-700 font-bold rounded-full hover:bg-indigo-50 transition-colors shadow-xl text-base"
                    >
                        Become a Mentor →
                    </a>
                </div>
            </section>

            <Footer />
        </main>
    );
}
