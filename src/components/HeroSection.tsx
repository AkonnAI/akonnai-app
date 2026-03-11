"use client";

import Link from "next/link";
import { useRouter } from "next/navigation"; // Added import
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

const SLIDES = [
    "/images/slide1.png",
    "/images/slide2.png",
    "/images/slide3.png",
    "/images/slide4.png"
];

const HeroSection = () => {
    const router = useRouter(); // Added router
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative bg-white overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-20 left-10 opacity-20 pointer-events-none z-0">
                <img src="/media/stars.gif" className="w-28" alt="" />
            </div>
            <div className="absolute bottom-16 right-20 opacity-20 pointer-events-none z-0">
                <img src="/media/planets.gif" className="w-36" alt="" />
            </div>
            <div className="absolute top-40 right-10 opacity-15 pointer-events-none z-0">
                <img src="/media/stars.gif" className="w-20 rotate-45" alt="" />
            </div>
            <div className="absolute bottom-40 left-1/4 opacity-15 pointer-events-none z-0">
                <img src="/media/abstract.gif" className="w-24 opacity-80" alt="" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20 relative z-10">

                {/* Left Side - Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-full lg:w-1/2 z-10 text-center lg:text-left"
                >
                    <h2 className="text-xl font-semibold text-indigo-600 mb-4 tracking-wide uppercase">Future-Ready AI Education</h2>
                    <h1 className="text-5xl lg:text-7xl font-bold mb-8 text-slate-900 leading-tight tracking-tight">
                        Dream. Discover. <br />
                        <span
                            className="bg-clip-text text-transparent bg-[length:300%_300%] bg-gradient-to-r from-red-500 via-purple-500 via-blue-500 via-green-500 to-red-500 animate-[gradientShift_8s_ease_infinite]"
                            style={{
                                textShadow: `
                                    0 0 8px rgba(168,85,247,0.3),
                                    0 0 15px rgba(59,130,246,0.25)
                                `
                            }}
                        >
                            Build with AI
                        </span>
                        <style jsx>{`
                            @keyframes gradientShift {
                                0% { background-position: 0% 50%; }
                                50% { background-position: 100% 50%; }
                                100% { background-position: 0% 50%; }
                            }
                        `}</style>
                    </h1>

                    <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-lg mx-auto lg:mx-0 font-medium">
                        Master the tools of tomorrow. Join the premier AI learning platform for young innovators.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <button
                                onClick={() => router.push("/register")}
                                className="px-8 py-4 bg-slate-900 text-white rounded-full font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-1"
                            >
                                Book Demo Class <ArrowRight className="w-5 h-5" />
                            </button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <button
                                onClick={() => router.push("/curriculum")}
                                className="px-8 py-4 bg-white text-slate-900 border-2 border-slate-100 rounded-full font-bold hover:border-slate-300 transition-colors shadow-sm hover:shadow-md"
                            >
                                View Curriculum
                            </button>
                        </motion.div>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span> Global Curriculum
                    </div>
                </motion.div>

                {/* Right Side - Slideshow */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="w-full lg:w-1/2 h-[500px] lg:h-[600px] relative rounded-bl-[80px] rounded-tr-[80px] rounded-tl-3xl rounded-br-3xl overflow-hidden shadow-2xl"
                >
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
                            {/* Overlay for better text contrast if needed, mostly stylistic here */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Dots Indicator */}
                    <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3 z-10">
                        {SLIDES.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide
                                    ? "bg-white w-8"
                                    : "bg-white/50 hover:bg-white/80"
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </motion.div>
            </div >
        </div >
    );
};

export default HeroSection;
