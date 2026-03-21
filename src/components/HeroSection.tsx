"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const SLIDES = [
    "/images/slide1.png",
    "/images/slide2.png",
    "/images/slide3.png",
    "/images/slide4.png"
];

const TYPEWRITER_PHRASES = [
    "Master the tools of tomorrow.",
    "Build real AI projects.",
    "Learn from industry experts.",
    "Get certified. Stand out.",
];

function useTypewriter(phrases: string[]) {
    const [displayed, setDisplayed] = useState("");
    const [phraseIndex, setPhraseIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const current = phrases[phraseIndex];
        const speed = isDeleting ? 35 : 65;

        const timer = setTimeout(() => {
            if (!isDeleting) {
                setDisplayed(current.slice(0, displayed.length + 1));
                if (displayed.length + 1 === current.length) {
                    setTimeout(() => setIsDeleting(true), 1800);
                }
            } else {
                setDisplayed(current.slice(0, displayed.length - 1));
                if (displayed.length === 0) {
                    setIsDeleting(false);
                    setPhraseIndex((prev) => (prev + 1) % phrases.length);
                }
            }
        }, speed);

        return () => clearTimeout(timer);
    }, [displayed, isDeleting, phraseIndex, phrases]);

    return displayed;
}

function MagneticButton({ children, onClick, className }: { children: React.ReactNode; onClick: () => void; className: string }) {
    const ref = useRef<HTMLButtonElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 300, damping: 20 });
    const springY = useSpring(y, { stiffness: 300, damping: 20 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        x.set((e.clientX - (rect.left + rect.width / 2)) * 0.25);
        y.set((e.clientY - (rect.top + rect.height / 2)) * 0.25);
    };

    const handleMouseLeave = () => { x.set(0); y.set(0); };

    return (
        <motion.button
            ref={ref}
            style={{ x: springX, y: springY }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            whileTap={{ scale: 0.96 }}
            onClick={onClick}
            className={className}
        >
            {children}
        </motion.button>
    );
}

const HeroSection = () => {
    const router = useRouter();
    const [currentSlide, setCurrentSlide] = useState(0);
    const typewriterText = useTypewriter(TYPEWRITER_PHRASES);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 overflow-hidden">
            {/* Float keyframe */}
            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }
            `}</style>

            {/* Grid pattern overlay */}
            <div
                className="absolute inset-0 pointer-events-none z-0"
                style={{
                    backgroundImage: `linear-gradient(rgba(99,102,241,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.08) 1px, transparent 1px)`,
                    backgroundSize: `60px 60px`,
                }}
            />

            {/* Floating orbs */}
            <div
                className="absolute top-20 left-10 w-48 h-48 md:w-96 md:h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none z-0"
                style={{ animation: "float 6s ease-in-out infinite" }}
            />
            <div
                className="absolute top-40 right-10 w-40 h-40 md:w-80 md:h-80 bg-purple-600/20 rounded-full blur-3xl pointer-events-none z-0"
                style={{ animation: "float 6s ease-in-out 2s infinite" }}
            />
            <div
                className="absolute bottom-20 left-1/3 w-64 h-64 bg-pink-600/15 rounded-full blur-3xl pointer-events-none z-0 hidden md:block"
                style={{ animation: "float 6s ease-in-out 4s infinite" }}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-28 flex flex-col lg:flex-row items-center gap-12 lg:gap-16 relative z-10">

                {/* ── Left column ── */}
                <div className="w-full lg:w-1/2 text-center lg:text-left">

                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-sm font-medium rounded-full mb-6 backdrop-blur-sm"
                    >
                        <Sparkles className="w-4 h-4" />
                        AKMIND™ — Dream. Discover. Shine.
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.6 }}
                        className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4 tracking-tight"
                    >
                        Build the Mind<br />
                        of an{" "}
                        <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            AI Builder
                        </span>
                    </motion.h1>

                    {/* Typewriter */}
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15, duration: 0.6 }}
                        className="text-indigo-300 text-base sm:text-xl font-medium mb-5 min-h-[2rem]"
                    >
                        {typewriterText}
                        <span className="inline-block w-[2px] h-5 bg-indigo-400 ml-1 animate-pulse align-middle" />
                    </motion.p>

                    {/* Subheading */}
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="text-slate-300 text-sm sm:text-base lg:text-lg max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed"
                    >
                        India&apos;s most exciting AI education for students aged 10–16. Learn Python, Machine Learning and real AI with expert 1-on-1 mentors.
                    </motion.p>

                    {/* CTA buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-6"
                    >
                        <MagneticButton
                            onClick={() => router.push("/register")}
                            className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition-colors shadow-lg shadow-indigo-900/40"
                        >
                            Book Free Demo <ArrowRight className="w-5 h-5" />
                        </MagneticButton>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => router.push("/curriculum")}
                            className="border border-slate-600 hover:border-indigo-400 text-slate-300 hover:text-white px-8 py-4 rounded-xl font-semibold text-lg bg-transparent hover:bg-slate-800/50 transition-all"
                        >
                            View Curriculum
                        </motion.button>
                    </motion.div>

                    {/* Trust strip */}
                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="text-slate-500 text-sm hidden sm:block"
                    >
                        ✓ Free demo class &nbsp;·&nbsp; ✓ No credit card &nbsp;·&nbsp; ✓ Live 1-on-1 &nbsp;·&nbsp; ✓ Expert mentors
                    </motion.p>
                </div>

                {/* ── Right column — slideshow ── */}
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.7 }}
                    className="w-full lg:w-1/2"
                >
                    <div
                        className="relative h-56 sm:h-72 lg:h-[500px] rounded-2xl overflow-hidden border border-slate-700/50"
                        style={{ boxShadow: "0 0 60px rgba(99,102,241,0.3)" }}
                    >
                        {/* Live badge */}
                        <div className="absolute top-4 left-4 z-20 bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-full px-3 py-1 hidden sm:block">
                            <span className="text-white text-xs">🔴 Live Class in Progress</span>
                        </div>

                        {/* Slides */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentSlide}
                                initial={{ opacity: 0, scale: 1.05 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.8 }}
                                className="absolute inset-0"
                            >
                                <Image
                                    src={SLIDES[currentSlide]}
                                    alt="AI Education"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                            </motion.div>
                        </AnimatePresence>

                        {/* Slide dots */}
                        <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2 z-10">
                            {SLIDES.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSlide(index)}
                                    className={`h-2 rounded-full transition-all duration-300 ${index === currentSlide ? "bg-white w-7" : "bg-white/40 w-2 hover:bg-white/70"}`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default HeroSection;
