"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle, Send } from "lucide-react";
import Link from "next/link";

// ─── CSS keyframes ─────────────────────────────────────────────────────────────
const STYLES = `
  @keyframes gradientShift {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes cursorBlink {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0; }
  }
  @keyframes xpShine {
    0%   { transform: translateX(-100%); }
    100% { transform: translateX(400%); }
  }
  @keyframes floatA {
    0%, 100% { transform: translateY(0px) translateX(0px); }
    33%      { transform: translateY(-12px) translateX(6px); }
    66%      { transform: translateY(6px) translateX(-8px); }
  }
  @keyframes floatB {
    0%, 100% { transform: translateY(0px) translateX(0px); }
    50%      { transform: translateY(-18px) translateX(-10px); }
  }
  @keyframes floatC {
    0%, 100% { transform: translateY(0px); }
    40%      { transform: translateY(10px); }
    80%      { transform: translateY(-8px); }
  }
  @keyframes dotBounce {
    0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
    40%           { transform: scale(1);   opacity: 1;   }
  }
`;

// ─── Count-up hook ─────────────────────────────────────────────────────────────
function useCountUp(target: number) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true });

    useEffect(() => {
        if (!inView) return;
        let frame = 0;
        const totalFrames = 60;
        const timer = setInterval(() => {
            frame++;
            setCount(Math.round((frame / totalFrames) * target));
            if (frame >= totalFrames) clearInterval(timer);
        }, 20);
        return () => clearInterval(timer);
    }, [inView, target]);

    return { count, ref };
}

// ─── Mockup: Video Player (Step 1) ────────────────────────────────────────────
function VideoMockup() {
    return (
        <div className="relative w-full max-w-md mx-auto">
            {/* Glow */}
            <div className="absolute inset-0 bg-indigo-600/20 blur-3xl rounded-full -z-10" />
            <div className="bg-slate-800/80 border border-slate-700/50 rounded-2xl p-4">
                {/* macOS dots */}
                <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                {/* Video area */}
                <div className="bg-slate-900 rounded-xl aspect-video flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/50 to-purple-950/50" />
                    <div className="relative z-10">
                        {/* Pulse ring */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-24 h-24 rounded-full bg-indigo-500/20 animate-ping" />
                        </div>
                        <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center relative z-10 shadow-lg shadow-indigo-900/50">
                            <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1" />
                        </div>
                    </div>
                </div>
                {/* Progress */}
                <div className="mt-3">
                    <div className="flex justify-between items-center mb-1.5">
                        <span className="text-white text-sm">Introduction to Neural Networks</span>
                        <span className="text-slate-400 text-xs">4:23 / 11:00</span>
                    </div>
                    <div className="bg-slate-700 h-1 rounded-full">
                        <div className="bg-indigo-500 h-full rounded-full" style={{ width: "35%" }} />
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Mockup: Game Card (Step 2) ───────────────────────────────────────────────
function GameMockup() {
    return (
        <div className="relative w-full max-w-md mx-auto">
            <div className="absolute inset-0 bg-purple-600/20 blur-3xl rounded-full -z-10" />
            {/* Animated gradient border wrapper */}
            <div
                className="rounded-2xl p-[2px]"
                style={{
                    background: "linear-gradient(45deg, #6366f1, #a855f7, #ec4899, #6366f1)",
                    backgroundSize: "300% 300%",
                    animation: "gradientShift 3s ease infinite",
                }}
            >
                <div className="bg-slate-800 rounded-2xl p-5">
                    <p className="text-indigo-400 text-xs font-mono uppercase tracking-wider">
                        MISSION: Neural Network Challenge
                    </p>
                    {/* Game terminal */}
                    <div className="bg-slate-900 rounded-xl p-4 mt-3">
                        <p className="text-green-400 font-mono text-xs leading-relaxed">
                            &gt; Training data loaded successfully...<br />
                            &gt; Accuracy: 94.2% ✓<br />
                            &gt; Mission complete! +150 XP
                            <span
                                className="inline-block w-[2px] h-3 bg-green-400 ml-1 align-middle"
                                style={{ animation: "cursorBlink 1s step-end infinite" }}
                            />
                        </p>
                    </div>
                    {/* XP bar */}
                    <div className="mt-4">
                        <p className="text-slate-500 text-xs font-mono">XP EARNED</p>
                        <div className="bg-slate-700 h-2 rounded-full mt-2 overflow-hidden">
                            <div className="relative bg-gradient-to-r from-indigo-500 to-purple-500 w-3/4 h-full rounded-full overflow-hidden">
                                <div
                                    className="absolute inset-y-0 w-1/4 bg-white/30 skew-x-12"
                                    style={{ animation: "xpShine 2s ease-in-out 1s infinite" }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Mockup: Recap Card (Step 3) ──────────────────────────────────────────────
function RecapMockup() {
    const checkItems = [
        "Neural networks mimic the human brain",
        "Layers process information step by step",
        "Training improves accuracy over time",
    ];
    return (
        <div className="relative w-full max-w-md mx-auto">
            <div className="absolute inset-0 bg-indigo-600/15 blur-3xl rounded-full -z-10" />
            <div className="bg-slate-800/80 border border-slate-700/50 rounded-2xl p-5">
                <p className="text-indigo-400 text-xs font-mono uppercase tracking-wider mb-4">
                    LESSON RECAP
                </p>
                <div className="space-y-3">
                    {checkItems.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -12 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 + i * 0.15, duration: 0.4 }}
                            className="flex items-start gap-3"
                        >
                            <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                            <span className="text-slate-300 text-sm">{item}</span>
                        </motion.div>
                    ))}
                </div>
                <div className="border-t border-slate-700 mt-4" />
                <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-3 mt-3">
                    <p className="text-indigo-400 text-xs font-mono uppercase tracking-wider">MINI CHALLENGE</p>
                    <p className="text-white text-sm mt-1">Build a 2-layer network in the simulator →</p>
                </div>
            </div>
        </div>
    );
}

// ─── Mockup: Mentor Chat (Step 4) ─────────────────────────────────────────────
function ChatMockup() {
    return (
        <div className="relative w-full max-w-md mx-auto">
            <div className="absolute inset-0 bg-purple-600/15 blur-3xl rounded-full -z-10" />
            <div className="bg-slate-800/80 border border-slate-700/50 rounded-2xl overflow-hidden">
                {/* Header */}
                <div className="bg-slate-900 px-4 py-3 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-white text-sm font-medium">Mentor Online</span>
                </div>
                {/* Messages */}
                <div className="p-4 space-y-3">
                    {/* Student */}
                    <div className="flex justify-end">
                        <div className="bg-indigo-600 text-white text-sm rounded-2xl rounded-tr-sm px-4 py-2 max-w-[80%]">
                            Why does the loss increase sometimes during training?
                        </div>
                    </div>
                    {/* Mentor */}
                    <div className="flex justify-start">
                        <div className="bg-slate-700 text-slate-200 text-sm rounded-2xl rounded-tl-sm px-4 py-2 max-w-[80%]">
                            Great question! This is called overfitting. Let me show you...
                        </div>
                    </div>
                    {/* Typing indicator */}
                    <div className="flex justify-start items-center gap-2">
                        <div className="bg-slate-700 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1">
                            {[0, 1, 2].map((i) => (
                                <div
                                    key={i}
                                    className="w-1.5 h-1.5 rounded-full bg-slate-400"
                                    style={{ animation: `dotBounce 1.2s ease-in-out ${i * 0.2}s infinite` }}
                                />
                            ))}
                        </div>
                        <span className="text-slate-400 text-xs">Mentor is typing...</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Mockup: AI Bot (Step 5) ──────────────────────────────────────────────────
function AIBotMockup() {
    const particles: { style: React.CSSProperties; animation: string }[] = [
        { style: { top: "8%", left: "-3%" },   animation: "floatA 3s ease-in-out 0s infinite" },
        { style: { top: "65%", right: "-3%" },  animation: "floatB 3.5s ease-in-out 0.5s infinite" },
        { style: { top: "30%", right: "-4%" },  animation: "floatC 4s ease-in-out 1s infinite" },
        { style: { bottom: "12%", left: "-3%" }, animation: "floatA 3.8s ease-in-out 0.8s infinite" },
    ];

    return (
        <div className="relative">
            {/* Floating particles */}
            {particles.map((p, i) => (
                <div
                    key={i}
                    className="absolute w-2 h-2 bg-indigo-400 rounded-full opacity-60 pointer-events-none"
                    style={{ ...p.style, animation: p.animation }}
                />
            ))}

            <div className="bg-slate-900/80 border border-indigo-500/20 rounded-2xl overflow-hidden">
                {/* Header */}
                <div className="bg-slate-800 px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center shrink-0">
                            <span className="text-white text-xs font-bold">AI</span>
                        </div>
                        <div>
                            <p className="text-white text-sm font-medium leading-tight">AKMIND AI Guide</p>
                            <p className="text-indigo-400 text-xs">Always online</p>
                        </div>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                </div>
                {/* Messages */}
                <div className="p-4 space-y-3">
                    {/* AI */}
                    <div className="bg-indigo-600/20 border border-indigo-500/20 rounded-2xl rounded-tl-sm px-4 py-3 text-slate-200 text-sm max-w-[85%]">
                        Hi! I noticed you just finished Lesson 7. Great work on the neural network challenge! 🎉
                    </div>
                    {/* Student */}
                    <div className="bg-slate-700 rounded-2xl rounded-tr-sm px-4 py-3 text-slate-200 text-sm ml-auto max-w-[80%]">
                        Thanks! I&apos;m confused about backpropagation though
                    </div>
                    {/* AI */}
                    <div className="bg-indigo-600/20 border border-indigo-500/20 rounded-2xl rounded-tl-sm px-4 py-3 text-slate-200 text-sm max-w-[85%]">
                        No worries! Think of it like this: imagine the network is trying to find its way through a maze, and backprop is how it learns from wrong turns. Want me to show you a quick visual explanation? 🧠
                    </div>
                </div>
                {/* Input bar */}
                <div className="bg-slate-800 px-4 py-3 flex items-center gap-2">
                    <div className="bg-slate-700 rounded-full px-4 py-2 text-slate-400 text-sm flex-1 select-none">
                        Ask anything...
                    </div>
                    <div className="bg-indigo-600 rounded-full p-2 shrink-0">
                        <Send className="w-4 h-4 text-white" />
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Stat item with count-up ──────────────────────────────────────────────────
function StatItem({ value, label, showDivider }: { value: number; label: string; showDivider: boolean }) {
    const { count, ref } = useCountUp(value);
    return (
        <div ref={ref} className="relative text-center px-4">
            {showDivider && (
                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 h-10 w-px bg-indigo-500/30" />
            )}
            <div className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent tabular-nums">
                {count}
            </div>
            <div className="text-slate-400 text-sm mt-1">{label}</div>
        </div>
    );
}

// ─── Steps 1–4 data ───────────────────────────────────────────────────────────
const STEPS = [
    {
        number: "01",
        textLeft: true,
        headline: "Watch. Learn. Get Inspired.",
        description:
            "Every lesson starts with an engaging 11-minute concept video. Real demos, animations and examples that make complex AI concepts feel simple and exciting.",
        tags: ["11 min video", "Real demos", "AI concepts simplified"],
        badge: null as string | null,
        Visual: VideoMockup,
    },
    {
        number: "02",
        textLeft: false,
        headline: "Play. Build. Remember.",
        description:
            "After every lesson, an interactive story-based game reinforces what you just learned. You are not just watching AI — you are living it. This is what makes AKMIND unforgettable.",
        tags: ["Story-based game", "Interactive challenges", "XP rewards"],
        badge: "⭐ Our biggest differentiator" as string | null,
        Visual: GameMockup,
    },
    {
        number: "03",
        textLeft: true,
        headline: "Recap. Reinforce. Master.",
        description:
            "A focused 5-minute recap locks in everything you learned. Key takeaways, a mini-challenge, and a preview of what is coming next. Short. Sharp. Effective.",
        tags: ["5 min recap", "Key takeaways", "Mini challenge"],
        badge: null as string | null,
        Visual: RecapMockup,
    },
    {
        number: "04",
        textLeft: false,
        headline: "Ask. Clarify. Go Deeper.",
        description:
            "Live Q&A sessions with your mentor after key modules. Got stuck? Confused? Your dedicated mentor is there to answer every question and push you further.",
        tags: ["Live Q&A", "Expert mentor", "Module reviews"],
        badge: null as string | null,
        Visual: ChatMockup,
    },
];

const STATS = [
    { value: 10, label: "Modules per Program" },
    { value: 60, label: "Bite-sized Lessons" },
    { value: 11, label: "Min Video per Lesson" },
    { value: 1,  label: "AI Guide per Student" },
];

const AI_FEATURES = [
    "Takes smart notes during every lesson",
    "Answers questions 24/7 between sessions",
    "Tracks your progress across all modules",
    "Sends personalised tips and reminders",
    "Celebrates your wins and milestones",
];

// ─── Main component ───────────────────────────────────────────────────────────
const HowAKMINDWorks = () => {
    return (
        <section className="relative bg-slate-950 py-24 overflow-hidden">
            <style>{STYLES}</style>

            {/* Grid pattern — same as hero */}
            <div
                className="absolute inset-0 pointer-events-none z-0"
                style={{
                    backgroundImage: `linear-gradient(rgba(99,102,241,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.08) 1px, transparent 1px)`,
                    backgroundSize: "60px 60px",
                }}
            />

            {/* Ambient orbs */}
            <div className="absolute top-40 left-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none z-0" />
            <div className="absolute bottom-40 right-10 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none z-0" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* ── Section header ── */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <span className="inline-block bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium px-4 py-2 rounded-full mb-6">
                        THE AKMIND METHOD
                    </span>
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-5 leading-tight">
                        Learning that actually{" "}
                        <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            sticks
                        </span>
                    </h2>
                    <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                        Not just videos. A complete AI learning experience engineered around how the brain actually learns.
                        Every lesson. Every time.
                    </p>
                </motion.div>

                {/* ── Steps 1–4 (alternating) ── */}
                <div className="space-y-28">
                    {STEPS.map((step) => {
                        const textFromX = step.textLeft ? -60 : 60;
                        const visualFromX = step.textLeft ? 60 : -60;

                        const TextBlock = (
                            <motion.div
                                initial={{ opacity: 0, x: textFromX }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.7, ease: "easeOut" }}
                                className="flex flex-col justify-center"
                            >
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="inline-block bg-indigo-500/20 text-indigo-400 text-sm font-mono rounded-full px-3 py-1">
                                        {step.number}
                                    </span>
                                    {step.badge && (
                                        <span className="inline-block bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs px-3 py-1 rounded-full">
                                            {step.badge}
                                        </span>
                                    )}
                                </div>
                                <h3 className="text-white text-2xl md:text-3xl font-bold mt-4 leading-tight">
                                    {step.headline}
                                </h3>
                                <p className="text-slate-400 text-base leading-relaxed mt-3 max-w-md">
                                    {step.description}
                                </p>
                                <div className="flex flex-wrap gap-2 mt-5">
                                    {step.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="bg-slate-800 border border-slate-700 text-slate-300 text-xs px-3 py-1.5 rounded-full"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        );

                        const VisualBlock = (
                            <motion.div
                                initial={{ opacity: 0, x: visualFromX }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.7, ease: "easeOut" }}
                                className="flex items-center justify-center"
                            >
                                <step.Visual />
                            </motion.div>
                        );

                        return (
                            <div
                                key={step.number}
                                className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center"
                            >
                                {step.textLeft ? (
                                    <>{TextBlock}{VisualBlock}</>
                                ) : (
                                    <>{VisualBlock}{TextBlock}</>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* ── Step 5 — Full-width special ── */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="mt-28"
                >
                    <div
                        className="bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 border border-indigo-500/20 rounded-3xl p-8 md:p-12"
                        style={{ boxShadow: "0 0 80px rgba(99,102,241,0.15)" }}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
                            {/* Text */}
                            <div>
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="inline-block bg-green-500/20 text-green-400 border border-green-500/30 rounded-full text-xs px-3 py-1">
                                        NEW
                                    </span>
                                    <span className="inline-block bg-indigo-500/20 text-indigo-400 text-sm font-mono rounded-full px-3 py-1">
                                        05
                                    </span>
                                </div>
                                <h3 className="text-white text-3xl md:text-4xl font-bold mt-4 leading-tight">
                                    Meet your AI Learning Companion
                                </h3>
                                <p className="text-slate-300 text-base leading-relaxed mt-4">
                                    AKMIND&apos;s built-in AI guide is with you throughout your entire learning journey. It takes notes during your lessons, answers your questions instantly, tracks your progress, and nudges you when you need a push. Think of it as a brilliant study buddy that never sleeps.
                                </p>
                                <ul className="space-y-3 mt-5">
                                    {AI_FEATURES.map((feat) => (
                                        <li key={feat} className="flex items-center gap-3">
                                            <CheckCircle className="w-5 h-5 text-indigo-400 shrink-0" />
                                            <span className="text-slate-300 text-sm">{feat}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Link
                                    href="/register"
                                    className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-semibold mt-6 transition-colors"
                                >
                                    Experience it free →
                                </Link>
                            </div>
                            {/* AI bot mockup */}
                            <AIBotMockup />
                        </div>
                    </div>
                </motion.div>

                {/* ── Stats bar ── */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 mt-16"
                >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {STATS.map((stat, i) => (
                            <StatItem
                                key={stat.label}
                                value={stat.value}
                                label={stat.label}
                                showDivider={i < STATS.length - 1}
                            />
                        ))}
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default HowAKMINDWorks;
