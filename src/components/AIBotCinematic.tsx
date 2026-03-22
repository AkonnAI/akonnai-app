"use client";

import { motion } from "framer-motion";
import { BookOpen, Clock, TrendingUp, Bell, Mic, Send, Sparkles, MessageCircle } from "lucide-react";

const STYLES = `
  @keyframes aiBotFloat {
    0%, 100% { transform: translateY(0px);   }
    50%       { transform: translateY(-10px); }
  }
  @keyframes typingBounce {
    0%, 60%, 100% { transform: translateY(0px);  }
    30%            { transform: translateY(-8px); }
  }
`;

const MESSAGES: {
    role: "ai" | "student";
    text: string;
    code?: string;
    codeNote?: string;
    delay: number;
}[] = [
    {
        role: "ai",
        text: "Hey Aarav! 👋 I noticed you just finished Module 3. Your accuracy on the quiz was 87% — really impressive for your first attempt at classification algorithms!",
        delay: 0.2,
    },
    {
        role: "student",
        text: "Thanks! But I'm still confused about why we need to normalise data before training.",
        delay: 0.5,
    },
    {
        role: "ai",
        text: "Great question — this is actually one of the most important concepts in ML. Here is a simple way to think about it:\n\nImagine you are comparing the height of people (150–190cm) with their salary (₹30,000–₹5,00,000). Without normalisation, salary dominates everything just because the numbers are bigger.\n\nNormalisation puts everything on the same scale so the model can learn fairly. Does that help? Want me to show you a hands-on example? 🎯",
        delay: 0.8,
    },
    {
        role: "student",
        text: "Yes please! Can you give me a coding example?",
        delay: 1.1,
    },
    {
        role: "ai",
        text: "Of course! Here is a simple example in Python:",
        code: `from sklearn.preprocessing import MinMaxScaler

scaler = MinMaxScaler()
X_normalized = scaler.fit_transform(X_train)

# Now all values are between 0 and 1 ✓`,
        codeNote: "Try this in your next lesson! I have added it to your notes automatically. 📝",
        delay: 1.4,
    },
];

const FLOATING_BADGES: {
    icon: React.ElementType;
    color: string;
    label: string;
    posClass: string;
    delay: string;
}[] = [
    { icon: BookOpen,   color: "text-indigo-400", label: "Auto Note-Taking",  posClass: "top-10 -left-40",   delay: "0s"   },
    { icon: Clock,      color: "text-green-400",  label: "24/7 Available",    posClass: "top-10 -right-40",  delay: "1.5s" },
    { icon: TrendingUp, color: "text-purple-400", label: "Progress Tracking", posClass: "bottom-48 -left-40", delay: "3s"   },
    { icon: Bell,       color: "text-amber-400",  label: "Smart Reminders",   posClass: "bottom-48 -right-40",delay: "4.5s" },
];

const FEATURES = [
    { icon: BookOpen,      color: "text-green-400",   title: "Smart Notes",         desc: "Automatically captures key concepts from every lesson"          },
    { icon: MessageCircle, color: "text-teal-400",    title: "Always Available",    desc: "Ask questions anytime between your sessions"                   },
    { icon: TrendingUp,    color: "text-emerald-400", title: "Progress Insights",   desc: "Knows exactly where you are in your journey"                   },
    { icon: Sparkles,      color: "text-green-400",   title: "Personalised Tips",   desc: "Tailored guidance based on your learning patterns"             },
];

const AIBotCinematic = () => {
    return (
        <section className="bg-slate-950 py-32 overflow-hidden">
            <style>{STYLES}</style>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* ── Header ── */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <span className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium px-4 py-2 rounded-full mb-6">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        POWERED BY AI
                    </span>
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-5 leading-tight">
                        Meet your personal{" "}
                        <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
                            AI Learning Guide
                        </span>
                    </h2>
                    <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                        Not a chatbot. Not a FAQ page. A genuine AI companion that knows your learning journey,
                        understands where you are stuck, and guides you forward — 24 hours a day, 7 days a week.
                    </p>
                </motion.div>

                {/* ── Main chat window ── */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative mx-auto max-w-3xl mt-16"
                >
                    {/* Glow layers */}
                    <div className="absolute -inset-4 bg-green-500/10 blur-3xl rounded-3xl -z-10" />
                    <div className="absolute -inset-2 bg-teal-500/10 blur-2xl rounded-3xl -z-10" />
                    <div className="absolute inset-0 bg-emerald-500/5 blur-xl rounded-3xl -z-10" />

                    {/* Floating badges — visible only on xl screens where they won't clip */}
                    {FLOATING_BADGES.map((badge, i) => (
                        <div
                            key={i}
                            className={`hidden xl:flex absolute ${badge.posClass} z-10 items-center gap-2 bg-slate-800 border border-slate-700 rounded-2xl px-4 py-3 shadow-xl whitespace-nowrap`}
                            style={{ animation: `aiBotFloat 6s ease-in-out ${badge.delay} infinite` }}
                        >
                            <badge.icon className={`w-4 h-4 ${badge.color} shrink-0`} />
                            <span className="text-white text-sm font-medium">{badge.label}</span>
                        </div>
                    ))}

                    {/* Chat window */}
                    <div
                        className="bg-slate-900 border border-green-500/20 rounded-3xl overflow-hidden"
                        style={{ boxShadow: "0 0 120px rgba(34,197,94,0.15)" }}
                    >
                        {/* Window header */}
                        <div className="bg-slate-800 px-6 py-4 flex items-center gap-4">
                            <div className="flex items-center gap-1.5 shrink-0">
                                <div className="w-3 h-3 rounded-full bg-red-500" />
                                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                                <div className="w-3 h-3 rounded-full bg-green-500" />
                            </div>
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center shrink-0">
                                <span className="text-white font-bold text-sm">AI</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-white font-semibold text-sm leading-tight">AKMIND AI Guide</p>
                                <p className="text-green-400 text-xs">Watching your progress in real-time</p>
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0">
                                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                <span className="text-green-400 text-xs font-mono">LIVE</span>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="p-6 space-y-4">
                            {MESSAGES.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 12 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: msg.delay, duration: 0.5 }}
                                    className={`flex gap-3 ${msg.role === "student" ? "justify-end" : "justify-start"}`}
                                >
                                    {msg.role === "ai" && (
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center shrink-0 mt-1">
                                            <span className="text-white font-bold text-xs">AI</span>
                                        </div>
                                    )}
                                    <div
                                        className={`rounded-2xl p-4 text-sm leading-relaxed max-w-lg ${
                                            msg.role === "ai"
                                                ? "bg-slate-800 border border-slate-700 rounded-tl-sm text-slate-200"
                                                : "bg-indigo-600 rounded-tr-sm text-white"
                                        }`}
                                    >
                                        {msg.text.split("\n").map((line, j, arr) => (
                                            <span key={j}>
                                                {line}
                                                {j < arr.length - 1 && <br />}
                                            </span>
                                        ))}
                                        {msg.code && (
                                            <pre className="bg-slate-950 rounded-xl p-4 mt-3 font-mono text-xs text-green-400 overflow-x-auto whitespace-pre">
                                                {msg.code}
                                            </pre>
                                        )}
                                        {msg.codeNote && (
                                            <p className="text-slate-300 text-sm mt-2">{msg.codeNote}</p>
                                        )}
                                    </div>
                                </motion.div>
                            ))}

                            {/* Typing indicator */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 1.8, duration: 0.4 }}
                                className="flex items-center gap-3"
                            >
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center shrink-0">
                                    <span className="text-white font-bold text-xs">AI</span>
                                </div>
                                <div className="bg-slate-800 rounded-2xl rounded-tl-sm px-4 py-4 inline-flex items-center gap-1.5">
                                    {[0, 1, 2].map((i) => (
                                        <div
                                            key={i}
                                            className="w-2 h-2 bg-slate-500 rounded-full"
                                            style={{ animation: `typingBounce 1.2s ease-in-out ${i * 0.15}s infinite` }}
                                        />
                                    ))}
                                </div>
                            </motion.div>
                        </div>

                        {/* Input bar */}
                        <div className="bg-slate-800 border-t border-slate-700 px-6 py-4 flex items-center gap-3">
                            <div className="bg-slate-700 rounded-full px-5 py-3 text-slate-400 text-sm flex-1 select-none">
                                Ask your AI guide anything...
                            </div>
                            <div className="w-10 h-10 rounded-full bg-slate-600 flex items-center justify-center shrink-0">
                                <Mic className="w-4 h-4 text-slate-300" />
                            </div>
                            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center shrink-0">
                                <Send className="w-4 h-4 text-white" />
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* ── Feature grid ── */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
                    {FEATURES.map((feat, i) => (
                        <motion.div
                            key={feat.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 text-center"
                        >
                            <feat.icon className={`w-8 h-8 ${feat.color} mx-auto`} />
                            <p className="text-white font-semibold mt-3">{feat.title}</p>
                            <p className="text-slate-400 text-sm mt-2 leading-relaxed">{feat.desc}</p>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default AIBotCinematic;
