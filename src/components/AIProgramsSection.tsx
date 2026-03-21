"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Rocket, Code2, Zap, Check, Star } from "lucide-react";

const PROGRAMS = [
    {
        id: "explorers",
        title: "AI Explorers",
        description: "Introduction to AI, Logic & Coding",
        badge: "Beginner Friendly",
        badgeStyle: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
        iconBg: "bg-blue-500/20",
        iconColor: "text-blue-400",
        Icon: Rocket,
        features: [
            "No prior experience needed",
            "No-code AI tools and projects",
            "Build your first AI model",
        ],
    },
    {
        id: "builders",
        title: "AI Builders",
        description: "Building Real-World AI Apps",
        badge: "Most Popular",
        badgeStyle: "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20",
        iconBg: "bg-indigo-500/20",
        iconColor: "text-indigo-400",
        Icon: Code2,
        features: [
            "Python and Machine Learning",
            "Real project portfolio",
            "Industry-standard tools",
        ],
        featured: true,
    },
    {
        id: "innovators",
        title: "AI Innovators",
        description: "Deep Learning & Generative AI",
        badge: "Advanced",
        badgeStyle: "bg-purple-500/10 text-purple-400 border border-purple-500/20",
        iconBg: "bg-purple-500/20",
        iconColor: "text-purple-400",
        Icon: Zap,
        features: [
            "Deep Learning and NLP",
            "Advanced AI applications",
            "Research-level projects",
        ],
    },
];

function TiltCard({ program, index }: { program: typeof PROGRAMS[0]; index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 20 });
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 20 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const handleMouseLeave = () => { x.set(0); y.set(0); };

    return (
        <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ perspective: 1000 }}
            className={program.featured ? "md:-translate-y-4" : ""}
        >
            <motion.div
                ref={ref}
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                whileHover={{ boxShadow: "0 0 40px rgba(99,102,241,0.15)" }}
                className="group relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 hover:border-indigo-500/50 rounded-2xl p-5 md:p-8 cursor-pointer transition-colors duration-300"
            >
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl ${program.iconBg} flex items-center justify-center mb-4`}>
                    <program.Icon className={`w-7 h-7 ${program.iconColor}`} />
                </div>

                {/* Badge */}
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${program.badgeStyle}`}>
                    {program.featured && <Star className="w-3 h-3" />}
                    {program.badge}
                </span>

                {/* Title + Description */}
                <h3 className="text-white text-2xl font-bold mt-4">{program.title}</h3>
                <p className="text-slate-400 text-sm mt-2 leading-relaxed">{program.description}</p>

                {/* Divider */}
                <div className="border-t border-slate-700/50 my-6" />

                {/* Features */}
                <ul className="space-y-2 mb-8">
                    {program.features.map((f) => (
                        <li key={f} className="flex items-center gap-2.5 text-slate-300 text-sm">
                            <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                            {f}
                        </li>
                    ))}
                </ul>

                {/* CTA */}
                <Link
                    href="/curriculum"
                    className="block w-full border border-slate-600 hover:border-indigo-400 text-slate-300 hover:text-white hover:bg-indigo-600/10 py-3 rounded-xl transition-all text-sm font-medium text-center"
                >
                    Learn More →
                </Link>
            </motion.div>
        </motion.div>
    );
}

const AIProgramsSection = () => {
    return (
        <section className="relative bg-slate-950 py-14 md:py-28 overflow-hidden">
            {/* Grid overlay */}
            <div
                className="absolute inset-0 pointer-events-none z-0"
                style={{
                    backgroundImage: `linear-gradient(rgba(99,102,241,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.06) 1px, transparent 1px)`,
                    backgroundSize: "60px 60px",
                }}
            />

            {/* Centre glow orb */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none z-0" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-10 md:mb-16"
                >
                    <span className="inline-block px-4 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full text-sm font-medium mb-5">
                        PROGRAMS
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                        Our AI Programs
                    </h2>
                    <p className="text-slate-400 max-w-xl mx-auto leading-relaxed">
                        Three carefully designed programs to take your child from AI curious to AI builder
                    </p>
                </motion.div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                    {PROGRAMS.map((program, index) => (
                        <TiltCard key={program.id} program={program} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AIProgramsSection;
