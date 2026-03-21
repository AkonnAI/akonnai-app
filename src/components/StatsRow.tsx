"use client";

import { useRef, useEffect, useState } from "react";
import { useInView, motion } from "framer-motion";

const STATS = [
    { value: 500, suffix: "+", label: "Students Enrolled", icon: "🎓" },
    { value: 4, suffix: "", label: "Expert AI Mentors", icon: "🧑‍🏫" },
    { value: 3, suffix: "", label: "Programs Available", icon: "🚀" },
    { value: 100, suffix: "%", label: "Live 1-on-1 Sessions", icon: "🎥" },
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

export default function StatsRow() {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <div className="py-20 bg-slate-50 relative overflow-hidden">
            {/* Soft blob background */}
            <div className="absolute -top-20 left-1/4 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-40 pointer-events-none" />
            <div className="absolute -bottom-20 right-1/4 w-80 h-80 bg-purple-100 rounded-full blur-3xl opacity-30 pointer-events-none" />

            <div className="max-w-5xl mx-auto px-4 relative z-10" ref={ref}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {STATS.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            className="text-center group"
                        >
                            <div className="text-3xl mb-2">{stat.icon}</div>
                            <div className="text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-indigo-600 to-purple-600 tabular-nums">
                                <Counter target={stat.value} suffix={stat.suffix} inView={inView} />
                            </div>
                            <div className="text-slate-500 font-medium mt-2 text-sm">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
