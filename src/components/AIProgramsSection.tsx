"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const PROGRAMS = [
    {
        id: "explorers",
        title: "AI Explorers",
        description: "Introduction to AI, Logic & Coding",
        image: "/images/ai-explorers.png",
        gradient: "from-blue-500 to-indigo-600",
        glow: "hover:shadow-blue-200",
        badge: "Beginner Friendly",
    },
    {
        id: "builders",
        title: "AI Builders",
        description: "Building Real-World AI Apps",
        image: "/images/ai-builders.png",
        gradient: "from-purple-500 to-pink-500",
        glow: "hover:shadow-purple-200",
        badge: "Most Popular ⭐",
    },
    {
        id: "innovators",
        title: "AI Innovators",
        description: "Deep Learning & Generative AI",
        image: "/images/ai-innovators.png",
        gradient: "from-pink-500 to-red-500",
        glow: "hover:shadow-pink-200",
        badge: "Advanced",
    }
];

function TiltCard({ program, index }: { program: typeof PROGRAMS[0]; index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, type: "spring", stiffness: 60 }}
            style={{ perspective: 1000 }}
        >
            <motion.div
                ref={ref}
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className={`group relative bg-white rounded-3xl overflow-hidden shadow-lg transition-shadow duration-300 hover:shadow-2xl ${program.glow} cursor-pointer`}
            >
                {/* Gradient border glow on hover */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${program.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm scale-[1.02]`} />

                {/* Badge */}
                <div className="absolute top-4 left-4 z-20">
                    <span className={`px-3 py-1 text-xs font-bold text-white rounded-full bg-gradient-to-r ${program.gradient} shadow-md`}>
                        {program.badge}
                    </span>
                </div>

                {/* Image */}
                <div className="relative h-64 w-full overflow-hidden">
                    <Image
                        src={program.image}
                        alt={program.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${program.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-300`} />
                </div>

                {/* Content */}
                <div className="p-8 bg-white relative z-10">
                    <h3 className="text-2xl font-bold text-slate-900 mb-1">{program.title}</h3>
                    <p className="text-slate-600 mb-8 font-medium">{program.description}</p>

                    <button className={`w-full py-3 rounded-full font-bold text-white bg-gradient-to-r ${program.gradient} shadow-md transition-all duration-200 group-hover:scale-105 group-hover:shadow-lg`}>
                        View Program
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}

const AIProgramsSection = () => {
    return (
        <section className="py-24 bg-gray-50 relative overflow-hidden">
            {/* Decorative blobs */}
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
                        <TiltCard key={program.id} program={program} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AIProgramsSection;
