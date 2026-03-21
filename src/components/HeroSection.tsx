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

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.button
            ref={ref}
            style={{ x: springX, y: springY }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            whileTap={{ scale: 0.95 }}
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
        <div className="relative bg-white overflow-hidden">
            {/* Dot grid pattern */}
            <div className="absolute inset-0 bg-dot-pattern opacity-40 pointer-events-none z-0" />

            {/* Soft color blobs */}
            <div className="absolute top-0 right-1/3 w-[500px] h-[500px] bg-indigo-100 rounded-full blur-3xl opacity-50 pointer-events-none z-0" />
            <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-purple-100 rounded-full blur-3xl opacity-40 pointer-events-none z-0" />
            <div className="absolute top-1/2 right-0 w-64 h-64 bg-pink-100 rounded-full blur-2xl opacity-30 pointer-events-none z-0" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20 relative z-10">

                {/* Left Side */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-full lg:w-1/2 z-10 text-center lg:text-left"
                >
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 border border-indigo-200 text-indigo-700 text-sm font-medium rounded-full mb-4"
                    >
                        <Sparkles className="w-4 h-4" />
                        AKMIND™ — Dream. Discover. Shine.
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 border border-indigo-100 rounded-full mb-6"
                    >
                        <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                        <span className="text-sm font-bold text-indigo-600 tracking-wide uppercase">Future-Ready AI Education</span>
                    </motion.div>

                    <h1 className="text-5xl lg:text-7xl font-bold mb-6 text-slate-900 leading-tight tracking-tight">
                        Dream. Discover. <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-purple-500 via-blue-500 via-green-500 to-red-500 animate-gradient-text">
                            Build with AI
                        </span>
                    </h1>

                    {/* Typewriter subtitle */}
                    <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-lg mx-auto lg:mx-0 font-medium min-h-[2rem]">
                        {typewriterText}
                        <span className="inline-block w-[2px] h-5 bg-indigo-500 ml-1 animate-pulse align-middle" />
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
                        <MagneticButton
                            onClick={() => router.push("/register")}
                            className="px-8 py-4 bg-slate-900 text-white rounded-full font-bold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-slate-300 hover:shadow-indigo-200 hover:shadow-xl"
                        >
                            Book Demo Class <ArrowRight className="w-5 h-5" />
                        </MagneticButton>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => router.push("/curriculum")}
                            className="px-8 py-4 bg-white text-slate-900 border-2 border-slate-200 rounded-full font-bold hover:border-indigo-300 hover:text-indigo-700 transition-all shadow-sm hover:shadow-md"
                        >
                            View Curriculum
                        </motion.button>
                    </div>

                    <div className="flex items-center gap-2 justify-center lg:justify-start">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-sm text-slate-500 font-medium">Global Curriculum · Live Classes · 1-on-1 Mentorship</span>
                    </div>
                </motion.div>

                {/* Right Side - Slideshow */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="w-full lg:w-1/2 h-[500px] lg:h-[600px] relative rounded-bl-[80px] rounded-tr-[80px] rounded-tl-3xl rounded-br-3xl overflow-hidden shadow-2xl shadow-indigo-100"
                >
                    {/* Glow ring around image */}
                    <div className="absolute -inset-1 bg-gradient-to-br from-indigo-300 via-purple-300 to-pink-300 rounded-bl-[82px] rounded-tr-[82px] rounded-tl-[14px] rounded-br-[14px] opacity-40 blur-sm z-0" />

                    <div className="absolute inset-0 z-10 rounded-bl-[80px] rounded-tr-[80px] rounded-tl-3xl rounded-br-3xl overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentSlide}
                                initial={{ opacity: 0, scale: 1.1 }}
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
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                            </motion.div>
                        </AnimatePresence>

                        {/* Dots */}
                        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3 z-10">
                            {SLIDES.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSlide(index)}
                                    className={`h-2.5 rounded-full transition-all duration-300 ${index === currentSlide ? "bg-white w-8" : "bg-white/50 w-2.5 hover:bg-white/80"}`}
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
