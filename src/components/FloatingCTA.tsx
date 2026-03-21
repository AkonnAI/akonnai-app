"use client";

import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const HIDDEN_PATHS = ["/register", "/confirmation"];

export default function FloatingCTA() {
    const pathname = usePathname();
    const router = useRouter();

    if (HIDDEN_PATHS.some((p) => pathname.startsWith(p))) return null;

    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 3, duration: 0.5, ease: "easeOut" }}
            className="fixed bottom-6 right-4 z-50 md:hidden"
        >
            {/* Ping dot */}
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-pink-500 rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-pink-500 rounded-full" />

            <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#6366f1" }}
                whileTap={{ scale: 0.97 }}
                onClick={() => router.push("/register")}
                className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-4 rounded-full shadow-lg shadow-indigo-900/40 font-semibold text-sm"
            >
                Book Demo <ArrowRight className="w-4 h-4" />
            </motion.button>
        </motion.div>
    );
}
