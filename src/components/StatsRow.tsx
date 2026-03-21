"use client";

import { useRef, useEffect, useState } from "react";
import { useInView, motion } from "framer-motion";

const STATS = [
    { value: 500, suffix: "+", label: "STUDENTS ENROLLED" },
    { value: 4,   suffix: "",  label: "EXPERT AI MENTORS" },
    { value: 3,   suffix: "",  label: "AI PROGRAMS" },
    { value: 100, suffix: "%", label: "LIVE 1-ON-1" },
];

function Counter({ target, suffix, inView }: { target: number; suffix: string; inView: boolean }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!inView) return;
        let frame = 0;
        const totalFrames = 60;
        const timer = setInterval(() => {
            frame++;
            setCount(Math.round((frame / totalFrames) * target));
            if (frame >= totalFrames) clearInterval(timer);
        }, 25);
        return () => clearInterval(timer);
    }, [inView, target]);

    return <>{count}{suffix}</>;
}

const GradientLine = () => (
    <div
        className="w-full h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.5), transparent)" }}
    />
);

export default function StatsRow() {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <div className="bg-slate-900">
            <GradientLine />

            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="max-w-5xl mx-auto px-4 py-10 md:py-16"
            >
                <div className="grid grid-cols-2 md:grid-cols-4">
                    {STATS.map((stat, i) => (
                        <div key={stat.label} className="flex">
                            {/* Stat content */}
                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                className="flex-1 flex flex-col items-center text-center py-6 px-4"
                            >
                                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent tabular-nums mb-2">
                                    <Counter target={stat.value} suffix={stat.suffix} inView={inView} />
                                </div>
                                <div className="text-slate-400 text-xs font-medium uppercase tracking-wider">
                                    {stat.label}
                                </div>
                            </motion.div>

                            {/* Vertical divider between stats (not after last) */}
                            {i < STATS.length - 1 && (
                                <div className="hidden md:block w-px bg-indigo-900/60 my-6" />
                            )}
                        </div>
                    ))}
                </div>
            </motion.div>

            <GradientLine />
        </div>
    );
}
