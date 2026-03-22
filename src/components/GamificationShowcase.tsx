"use client";

import { motion } from "framer-motion";
import { Star, Code, Zap, Cpu, Trophy, Flame, Lock } from "lucide-react";

const STYLES = `
  @keyframes xpBarShimmer {
    0%   { transform: translateX(-100%) skewX(-12deg); }
    100% { transform: translateX(350%)  skewX(-12deg); }
  }
`;

const BADGES = [
    { icon: Star,   color: "text-yellow-300", label: "First Lesson", unlocked: true  },
    { icon: Code,   color: "text-green-300",  label: "Coder",        unlocked: true  },
    { icon: Zap,    color: "text-yellow-300", label: "Speed Run",    unlocked: true  },
    { icon: Cpu,    color: "text-blue-300",   label: "ML Master",    unlocked: true  },
    { icon: Trophy, color: "text-yellow-300", label: "Champion",     unlocked: true  },
    { icon: Flame,  color: "text-orange-300", label: "On Fire",      unlocked: true  },
    { icon: Lock,   color: "text-white/30",   label: "???",          unlocked: false },
    { icon: Lock,   color: "text-white/30",   label: "???",          unlocked: false },
    { icon: Lock,   color: "text-white/30",   label: "???",          unlocked: false },
];

const LEADERBOARD = [
    { pos: 1, initials: "RS", name: "Rohan S.",   xp: "3,240", posClass: "bg-amber-100 text-amber-600",  medal: "🥇", isYou: false },
    { pos: 2, initials: "PN", name: "Priya N.",   xp: "3,180", posClass: "bg-slate-200 text-slate-600",  medal: "🥈", isYou: false },
    { pos: 3, initials: "KI", name: "Karthik I.", xp: "2,950", posClass: "bg-orange-100 text-orange-600",medal: "🥉", isYou: false },
    { pos: 4, initials: "AR", name: "Ananya R.",  xp: "2,780", posClass: "bg-slate-100 text-slate-600",  medal: null, isYou: false },
    { pos: 5, initials: "AK", name: "Aarav K.",   xp: "2,450", posClass: "bg-indigo-100 text-indigo-600",medal: null, isYou: true  },
];

const XP_LOG = [
    { xp: "+50 XP",  label: "Completed Lesson 7"              },
    { xp: "+100 XP", label: "Won Neural Network Challenge"     },
    { xp: "+25 XP",  label: "7-day streak bonus"              },
];

const BOTTOM_STATS = [
    { value: "50,000+", label: "XP Points earned daily"               },
    { value: "200+",    label: "Badges available to unlock"           },
    { value: "95%",     label: "Completion rate vs 40% industry avg"  },
    { value: "3x",      label: "Retention vs traditional learning"    },
];

const GamificationShowcase = () => {
    return (
        <section className="bg-white py-24 px-4">
            <style>{STYLES}</style>

            <div className="max-w-7xl mx-auto">

                {/* ── Section header ── */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block bg-amber-500/10 border border-amber-500/20 text-amber-600 text-sm font-medium px-4 py-2 rounded-full mb-6">
                        GAMIFIED LEARNING
                    </span>
                    <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-5 leading-tight">
                        Learning feels like{" "}
                        <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500 bg-clip-text text-transparent">
                            a game.
                        </span>
                    </h2>
                    <p className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                        Results are very real. Every lesson earns XP, unlocks badges and climbs the leaderboard.
                        Students don&apos;t want to stop learning.
                    </p>
                </motion.div>

                {/* ── 3-column grid ── */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">

                    {/* ── Column 1: XP & Progress ── */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-slate-50 border border-slate-200 rounded-2xl p-6"
                    >
                        <h3 className="text-slate-900 font-bold text-lg mb-5">Your Progress</h3>

                        {/* Avatar */}
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center shrink-0">
                                <span className="text-white font-bold text-xl">AK</span>
                            </div>
                            <div>
                                <p className="text-slate-800 font-semibold">Aarav K.</p>
                                <span className="inline-block bg-indigo-100 text-indigo-700 text-xs px-3 py-1 rounded-full mt-1">
                                    Level 7 · AI Builder
                                </span>
                            </div>
                        </div>

                        {/* XP bar */}
                        <div className="mb-4">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-slate-600 text-sm font-medium">XP Progress</span>
                                <span className="text-slate-400 text-xs">2,450 / 3,000 XP</span>
                            </div>
                            <div className="bg-slate-200 h-3 rounded-full overflow-hidden">
                                <div
                                    className="relative bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full overflow-hidden"
                                    style={{ width: "80%" }}
                                >
                                    <div
                                        className="absolute inset-y-0 w-1/3 bg-white/40"
                                        style={{ animation: "xpBarShimmer 2s ease-in-out infinite" }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Streak */}
                        <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 mb-5">
                            <div className="flex items-center gap-2">
                                <div className="w-7 h-7 bg-orange-500 rounded-full flex items-center justify-center text-sm">
                                    🔥
                                </div>
                                <div>
                                    <p className="text-orange-600 font-bold text-sm">12 Day Streak!</p>
                                    <p className="text-orange-400 text-xs">Keep it up!</p>
                                </div>
                            </div>
                        </div>

                        {/* XP log */}
                        <div className="space-y-2.5">
                            {XP_LOG.map((item, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <span className="text-green-500 text-xs font-bold w-20 shrink-0">{item.xp}</span>
                                    <span className="text-slate-600 text-sm">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* ── Column 2: Badges (elevated) ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-6 text-white md:-translate-y-4"
                        style={{ boxShadow: "0 20px 60px rgba(99,102,241,0.4)" }}
                    >
                        <h3 className="text-white font-bold text-lg">Achievements</h3>
                        <p className="text-indigo-200 text-sm mt-1 mb-6">Unlock badges as you learn</p>

                        {/* Badge grid */}
                        <div className="grid grid-cols-3 gap-3">
                            {BADGES.map((badge, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ scale: 0, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 + i * 0.08, duration: 0.4, type: "spring", stiffness: 200 }}
                                    className="flex flex-col items-center gap-1.5"
                                >
                                    <div
                                        className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                                            badge.unlocked ? "bg-white/20" : "bg-white/5"
                                        }`}
                                    >
                                        <badge.icon className={`w-7 h-7 ${badge.color}`} />
                                    </div>
                                    <span
                                        className={`text-xs text-center leading-tight ${
                                            badge.unlocked ? "text-white" : "text-white/30"
                                        }`}
                                    >
                                        {badge.label}
                                    </span>
                                </motion.div>
                            ))}
                        </div>

                        {/* Latest badge banner */}
                        <div className="bg-white/10 rounded-xl p-3 mt-5">
                            <p className="text-white text-sm font-medium">🏆 Latest: AI Explorer badge unlocked!</p>
                        </div>
                    </motion.div>

                    {/* ── Column 3: Leaderboard ── */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        className="bg-slate-50 border border-slate-200 rounded-2xl p-6"
                    >
                        <h3 className="text-slate-900 font-bold text-lg mb-4">This Week&apos;s Top Learners</h3>

                        <div className="space-y-1">
                            {LEADERBOARD.map((entry) => (
                                <div
                                    key={entry.pos}
                                    className={`flex items-center gap-3 py-2.5 border-b border-slate-100 last:border-0 ${
                                        entry.isYou
                                            ? "bg-indigo-50 border border-indigo-200 rounded-xl px-2 -mx-2 my-1"
                                            : ""
                                    }`}
                                >
                                    {/* Position */}
                                    <div
                                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm font-bold ${entry.posClass}`}
                                    >
                                        {entry.pos}
                                    </div>
                                    {/* Avatar */}
                                    <div className="w-8 h-8 bg-indigo-400 rounded-full flex items-center justify-center shrink-0">
                                        <span className="text-white text-xs font-bold">{entry.initials}</span>
                                    </div>
                                    {/* Name + XP */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-slate-800 font-medium text-sm truncate">{entry.name}</span>
                                            {entry.isYou && (
                                                <span className="bg-indigo-600 text-white text-xs px-2 py-0.5 rounded-full shrink-0">
                                                    You
                                                </span>
                                            )}
                                        </div>
                                        <span className="text-indigo-600 text-xs font-semibold">{entry.xp} XP</span>
                                    </div>
                                    {entry.medal && (
                                        <span className="text-base ml-auto shrink-0">{entry.medal}</span>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Weekly challenge */}
                        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-xl p-4 mt-4">
                            <p className="text-indigo-700 font-bold text-sm">Weekly Challenge</p>
                            <p className="text-slate-600 text-xs mt-1">Complete 5 lessons this week</p>
                            <div className="mt-3">
                                <div className="flex justify-between text-xs text-slate-500 mb-1.5">
                                    <span>Progress</span>
                                    <span>3 / 5 complete</span>
                                </div>
                                <div className="bg-white h-1.5 rounded-full overflow-hidden">
                                    <div className="bg-indigo-500 h-full rounded-full" style={{ width: "60%" }} />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* ── Bottom stats row ── */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
                    {BOTTOM_STATS.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            className="bg-slate-900 text-white rounded-2xl p-6 text-center"
                        >
                            <div className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                                {stat.value}
                            </div>
                            <div className="text-slate-400 text-sm mt-1 leading-snug">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default GamificationShowcase;
