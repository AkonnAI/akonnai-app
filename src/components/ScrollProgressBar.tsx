"use client";

import { useScroll, motion } from "framer-motion";

export default function ScrollProgressBar() {
    const { scrollYProgress } = useScroll();
    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-[3px] z-[200] origin-left"
            style={{
                scaleX: scrollYProgress,
                background: "linear-gradient(to right, #6366f1, #a855f7, #ec4899)",
            }}
        />
    );
}
