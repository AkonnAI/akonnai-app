"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type AuthUser = {
    name: string;
    email: string;
};

const Navbar = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
    const [authUser, setAuthUser] = useState<AuthUser | null>(null);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileRef = useRef<HTMLDivElement>(null);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const menuVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
        exit: { opacity: 0, y: 10, transition: { duration: 0.15 } }
    };

    const chevronVariants = {
        idle: { rotate: 0 },
        hover: { rotate: 180 }
    };

    useEffect(() => {
        const fetchMe = async () => {
            try {
                const res = await fetch("/api/auth/me", { credentials: "include" });
                if (!res.ok) return;
                const data = await res.json();
                if (data.authenticated && data.user) {
                    setAuthUser({ name: data.user.name, email: data.user.email });
                } else {
                    setAuthUser(null);
                }
            } catch {
                setAuthUser(null);
            }
        };
        fetchMe();
    }, [pathname]);

    const getInitials = (user: AuthUser | null) => {
        if (!user) return "";
        const name = user.name?.trim();
        if (name) {
            const parts = name.split(" ").filter(Boolean);
            if (parts.length === 1) {
                return parts[0][0]?.toUpperCase() || "";
            }
            const first = parts[0]?.[0] || "";
            const last = parts.at(-1)?.[0] || "";
            return (first + last).toUpperCase();
        }
        const emailFirst = user.email?.trim()[0];
        return emailFirst ? emailFirst.toUpperCase() : "";
    };

    useEffect(() => {
        if (!isProfileOpen) return;
        const handler = (e: MouseEvent) => {
            if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [isProfileOpen]);

    const handleLogout = async () => {
        try {
            await fetch("/api/auth/logout", { method: "POST" });
        } catch {
            // ignore
        } finally {
            setAuthUser(null);
            setIsProfileOpen(false);
            router.push("/");
        }
    };

    return (
        <motion.div
            className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-white border-b border-gray-100"}`}
        >
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold shadow-indigo-200 shadow-lg group-hover:scale-110 transition-transform">
                            A
                        </div>
                        <span className="text-2xl font-bold text-slate-900 tracking-tight">
                            AKMIND
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">

                        {/* Programs Dropdown */}
                        <div
                            className="relative"
                            onMouseEnter={() => setHoveredMenu("programs")}
                            onMouseLeave={() => setHoveredMenu(null)}
                        >
                            <button className="flex items-center text-slate-700 hover:text-indigo-600 font-medium py-8 group">
                                Programs
                                <motion.div
                                    variants={chevronVariants}
                                    animate={hoveredMenu === "programs" ? "hover" : "idle"}
                                >
                                    <ChevronDown className="w-4 h-4 ml-1" />
                                </motion.div>
                            </button>

                            <AnimatePresence>
                                {hoveredMenu === "programs" && (
                                    <motion.div
                                        variants={menuVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        className="absolute top-full left-0 w-[260px] bg-white shadow-xl rounded-xl border border-gray-100 py-3 z-50 overflow-hidden"
                                    >
                                        <div className="px-5 py-2">
                                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Our AI Learning Tracks</h3>
                                        </div>
                                        <div className="h-px bg-gray-100 my-1 mx-5"></div>

                                        <div className="py-2">
                                            {[
                                                { title: "AI Explorers", grades: "Grades 5-6" },
                                                { title: "AI Builders", grades: "Grades 7-8" },
                                                { title: "AI Innovators", grades: "Grades 9-10" }
                                            ].map((program) => (
                                                <Link
                                                    key={program.title}
                                                    href="/programs"
                                                    className="block px-5 py-3 hover:bg-purple-50 group transition-colors relative"
                                                >
                                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                                    <div className="font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                                                        {program.title}
                                                    </div>
                                                    <div className="text-sm text-slate-500 group-hover:text-purple-500 transition-colors">
                                                        {program.grades}
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>

                                        <div className="h-px bg-gray-100 my-1 mx-5"></div>
                                        <div className="px-5 py-2">
                                            <Link href="/programs" className="text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 group/link">
                                                View All Programs <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                                            </Link>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* AI Mentors Dropdown */}
                        <div
                            className="relative"
                            onMouseEnter={() => setHoveredMenu("mentors")}
                            onMouseLeave={() => setHoveredMenu(null)}
                        >
                            <button className="flex items-center text-slate-700 hover:text-indigo-600 font-medium py-8 group">
                                AI Mentors
                                <motion.div
                                    variants={chevronVariants}
                                    animate={hoveredMenu === "mentors" ? "hover" : "idle"}
                                >
                                    <ChevronDown className="w-4 h-4 ml-1" />
                                </motion.div>
                            </button>
                            <AnimatePresence>
                                {hoveredMenu === "mentors" && (
                                    <motion.div
                                        variants={menuVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        className="absolute top-full left-0 w-56 bg-white shadow-xl rounded-xl border border-gray-100 p-2 z-50"
                                    >
                                        <Link href="#" className="block px-4 py-2 text-slate-600 hover:bg-purple-50 hover:text-purple-700 rounded-lg font-medium transition-colors">Meet Our AI Mentors</Link>
                                        <Link href="#" className="block px-4 py-2 text-slate-600 hover:bg-purple-50 hover:text-purple-700 rounded-lg font-medium transition-colors">Become a Mentor</Link>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* About Dropdown */}
                        <div
                            className="relative"
                            onMouseEnter={() => setHoveredMenu("about")}
                            onMouseLeave={() => setHoveredMenu(null)}
                        >
                            <button className="flex items-center text-slate-700 hover:text-indigo-600 font-medium py-8 group">
                                About AKMIND
                                <motion.div
                                    variants={chevronVariants}
                                    animate={hoveredMenu === "about" ? "hover" : "idle"}
                                >
                                    <ChevronDown className="w-4 h-4 ml-1" />
                                </motion.div>
                            </button>
                            <AnimatePresence>
                                {hoveredMenu === "about" && (
                                    <motion.div
                                        variants={menuVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        className="absolute top-full right-0 w-48 bg-white shadow-xl rounded-xl border border-gray-100 p-2 z-50"
                                    >
                                        {["Our Story", "Curriculum", "Reviews", "Careers", "Contact"].map(item => (
                                            <Link key={item} href="#" className="block px-4 py-2 text-slate-600 hover:bg-purple-50 hover:text-purple-700 rounded-lg font-medium transition-colors">{item}</Link>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Right Side Actions */}
                    <div className="hidden md:flex items-center space-x-6">
                        <div className="flex items-center text-slate-600 cursor-pointer hover:text-slate-900 gap-2">
                            <Globe size={16} />
                            <span className="text-sm font-semibold">India (EN)</span>
                        </div>
                        {!authUser && (
                            <>
                                <Link href="/login" className="text-slate-900 font-bold hover:text-indigo-600 transition-colors">
                                    Login
                                </Link>
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Link
                                        href="/signup"
                                        className="bg-indigo-600 text-white px-6 py-2.5 rounded-full font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
                                    >
                                        Sign Up
                                    </Link>
                                </motion.div>
                            </>
                        )}
                        {authUser && (
                            <div className="relative" ref={profileRef}>
                                <button
                                    type="button"
                                    onClick={() => setIsProfileOpen((open) => !open)}
                                    className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-2 py-1 hover:border-indigo-300 transition-colors"
                                >
                                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
                                        {getInitials(authUser)}
                                    </div>
                                    <ChevronDown className="w-4 h-4 text-slate-500" />
                                </button>
                                <AnimatePresence>
                                    {isProfileOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 8 }}
                                            transition={{ duration: 0.15 }}
                                            className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50"
                                        >
                                            <div className="px-4 py-2 border-b border-slate-100">
                                                <p className="text-xs text-slate-400 font-semibold uppercase">Signed in as</p>
                                                <p className="text-sm font-bold text-slate-900 truncate">{authUser.email}</p>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setIsProfileOpen(false);
                                                    router.push("/dashboard");
                                                }}
                                                className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                                            >
                                                Dashboard
                                            </button>
                                            <button
                                                type="button"
                                                onClick={handleLogout}
                                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                            >
                                                Log out
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-slate-700 hover:text-indigo-600 focus:outline-none"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-t border-gray-100 absolute w-full left-0 shadow-xl overflow-hidden"
                    >
                        <div className="px-4 pt-4 pb-8 space-y-4">
                            <Link href="#" className="block px-4 py-3 text-slate-700 font-bold hover:bg-slate-50 rounded-lg">Programs</Link>
                            <Link href="#" className="block px-4 py-3 text-slate-700 font-bold hover:bg-slate-50 rounded-lg">AI Mentors</Link>
                            <Link href="#" className="block px-4 py-3 text-slate-700 font-bold hover:bg-slate-50 rounded-lg">About AKMIND</Link>
                            <div className="border-t border-gray-100 my-4 pt-4 flex flex-col gap-3">
                                {!authUser && (
                                    <>
                                        <Link href="/login" className="block text-center px-4 py-3 text-indigo-600 font-bold border border-indigo-100 rounded-xl hover:bg-indigo-50">Login</Link>
                                        <Link href="/signup" className="block text-center px-4 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-200">Sign Up</Link>
                                    </>
                                )}
                                {authUser && (
                                    <>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setIsMenuOpen(false);
                                                router.push("/dashboard");
                                            }}
                                            className="block w-full text-center px-4 py-3 text-slate-700 font-bold border border-slate-100 rounded-xl hover:bg-slate-50"
                                        >
                                            Dashboard
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setIsMenuOpen(false);
                                                handleLogout();
                                            }}
                                            className="block w-full text-center px-4 py-3 text-red-600 font-bold border border-red-100 rounded-xl hover:bg-red-50"
                                        >
                                            Log out
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default Navbar;
