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

const NAV_ITEMS = {
    programs: {
        label: "Programs",
        content: (
            <div className="py-2">
                <div className="px-5 py-2">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Our AI Learning Tracks</h3>
                </div>
                <div className="h-px bg-gray-100 my-1 mx-5" />
                {[
                    { title: "AI Explorers", level: "Beginner Friendly" },
                    { title: "AI Builders", level: "Most Popular" },
                    { title: "AI Innovators", level: "Advanced" },
                ].map((p) => (
                    <Link
                        key={p.title}
                        href="/register"
                        className="block px-5 py-3 hover:bg-purple-50 group/item transition-colors relative"
                    >
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-600 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                        <div className="font-bold text-slate-900 group-hover/item:text-purple-700 transition-colors">{p.title}</div>
                        <div className="text-sm text-slate-500 group-hover/item:text-purple-500 transition-colors">{p.level}</div>
                    </Link>
                ))}
                <div className="h-px bg-gray-100 my-1 mx-5" />
                <div className="px-5 py-2">
                    <Link href="/register" className="text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 group/link">
                        View All Programs <span className="group-hover/link:translate-x-1 transition-transform inline-block">→</span>
                    </Link>
                </div>
            </div>
        ),
        width: "w-[260px]",
        align: "left-0",
    },
    mentors: {
        label: "AI Mentors",
        content: (
            <div className="p-2">
                <Link href="/mentors" className="block px-4 py-2 text-slate-600 hover:bg-purple-50 hover:text-purple-700 rounded-lg font-medium transition-colors">Meet Our AI Mentors</Link>
                <Link href="/become-mentor" className="block px-4 py-2 text-slate-600 hover:bg-purple-50 hover:text-purple-700 rounded-lg font-medium transition-colors">Become a Mentor</Link>
            </div>
        ),
        width: "w-56",
        align: "left-0",
    },
    about: {
        label: "About AKMIND",
        content: (
            <div className="p-2">
                {[
                    { label: "Our Story", href: "/about" },
                    { label: "Curriculum", href: "/curriculum" },
                    { label: "Reviews", href: "/reviews" },
                    { label: "Careers", href: "/careers" },
                    { label: "Contact", href: "/contact" },
                ].map((item) => (
                    <Link key={item.label} href={item.href} className="block px-4 py-2 text-slate-600 hover:bg-purple-50 hover:text-purple-700 rounded-lg font-medium transition-colors">{item.label}</Link>
                ))}
            </div>
        ),
        width: "w-48",
        align: "right-0",
    },
} as const;

type NavKey = keyof typeof NAV_ITEMS;

const menuVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.97 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.18 } },
    exit: { opacity: 0, y: 10, scale: 0.97, transition: { duration: 0.12 } },
};

const Navbar = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [openMenu, setOpenMenu] = useState<NavKey | null>(null);
    const [openMobileMenu, setOpenMobileMenu] = useState<NavKey | null>(null);
    const [authUser, setAuthUser] = useState<AuthUser | null>(null);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileRef = useRef<HTMLDivElement>(null);
    const navRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close dropdowns when clicking outside the nav
    useEffect(() => {
        if (!openMenu) return;
        const handler = (e: MouseEvent) => {
            if (navRef.current && !navRef.current.contains(e.target as Node)) {
                setOpenMenu(null);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [openMenu]);

    // Close profile dropdown when clicking outside
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

    // Close everything on route change
    useEffect(() => {
        setOpenMenu(null);
        setIsMenuOpen(false);
        setOpenMobileMenu(null);
    }, [pathname]);

    useEffect(() => {
        try {
            const cookies = Object.fromEntries(
                document.cookie.split(";").map((c) => {
                    const [k, ...v] = c.trim().split("=");
                    return [k.trim(), v.join("=")];
                })
            );
            const raw = cookies["akmind_session"];
            if (!raw) { setAuthUser(null); return; }

            const decoded = decodeURIComponent(raw);
            const dotIndex = decoded.lastIndexOf(".");
            if (dotIndex === -1) { setAuthUser(null); return; }

            // Decode base64url payload (HMAC is verified server-side on protected routes)
            const encoded = decoded.slice(0, dotIndex);
            const b64 = encoded.replace(/-/g, "+").replace(/_/g, "/");
            const padded = b64 + "===".slice((b64.length + 3) % 4);
            const base = atob(padded);
            const user = JSON.parse(base) as { id: string; name: string; email: string };
            setAuthUser({ name: user.name, email: user.email });
        } catch {
            setAuthUser(null);
        }
    }, [pathname]);

    const getInitials = (user: AuthUser | null) => {
        if (!user) return "";
        const parts = user.name?.trim().split(" ").filter(Boolean);
        if (parts?.length > 1) return (parts[0][0] + parts.at(-1)![0]).toUpperCase();
        if (parts?.length === 1) return parts[0][0].toUpperCase();
        return user.email?.[0]?.toUpperCase() || "";
    };

    const handleLogout = async () => {
        try { await fetch("/api/auth/logout", { method: "POST" }); } catch { }
        setAuthUser(null);
        setIsProfileOpen(false);
        router.push("/");
    };

    const toggleMenu = (key: NavKey) => {
        setOpenMenu((prev) => (prev === key ? null : key));
    };

    const toggleMobileMenu = (key: NavKey) => {
        setOpenMobileMenu((prev) => (prev === key ? null : key));
    };

    return (
        <motion.div
            className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-white border-b border-gray-100"}`}
        >
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={navRef}>
                <div className="flex justify-between items-center h-20">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold shadow-indigo-200 shadow-lg group-hover:scale-110 transition-transform">
                            A
                        </div>
                        <div className="flex flex-col leading-none">
                            <span className="text-2xl font-bold text-slate-900 tracking-tight">AKMIND</span>
                            <span className="text-xs text-slate-400 font-normal">by Akonnai</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-2">
                        {(Object.keys(NAV_ITEMS) as NavKey[]).map((key) => {
                            const item = NAV_ITEMS[key];
                            const isOpen = openMenu === key;
                            return (
                                <div key={key} className="relative">
                                    <button
                                        onClick={() => toggleMenu(key)}
                                        className={`flex items-center gap-1 px-3 py-2 rounded-lg font-medium transition-colors ${isOpen ? "text-indigo-600 bg-indigo-50" : "text-slate-700 hover:text-indigo-600 hover:bg-slate-50"}`}
                                    >
                                        {item.label}
                                        <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                                            <ChevronDown className="w-4 h-4" />
                                        </motion.span>
                                    </button>

                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.div
                                                variants={menuVariants}
                                                initial="hidden"
                                                animate="visible"
                                                exit="exit"
                                                className={`absolute top-full mt-1 ${item.width} ${item.align} bg-white shadow-xl rounded-xl border border-gray-100 z-50 overflow-hidden`}
                                            >
                                                {item.content}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>

                    {/* Right Side */}
                    <div className="hidden md:flex items-center space-x-6">
                        <div className="flex items-center text-slate-600 cursor-pointer hover:text-slate-900 gap-2">
                            <Globe size={16} />
                            <span className="text-sm font-semibold">India (EN)</span>
                        </div>
                        {!authUser && (
                            <>
                                <Link href="/login" className="text-slate-900 font-bold hover:text-indigo-600 transition-colors">Login</Link>
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Link href="/signup" className="bg-indigo-600 text-white px-6 py-2.5 rounded-full font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200">
                                        Sign Up
                                    </Link>
                                </motion.div>
                            </>
                        )}
                        {authUser && (
                            <div className="relative" ref={profileRef}>
                                <button
                                    type="button"
                                    onClick={() => setIsProfileOpen((o) => !o)}
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
                                            <button type="button" onClick={() => { setIsProfileOpen(false); router.push("/dashboard"); }} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                                                Dashboard
                                            </button>
                                            <button type="button" onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                                                Log out
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>

                    {/* Mobile hamburger */}
                    <div className="md:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-700 hover:text-indigo-600 focus:outline-none">
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-t border-gray-100 absolute w-full left-0 shadow-xl overflow-hidden z-40"
                    >
                        <div className="px-4 pt-3 pb-6 space-y-1">
                            {(Object.keys(NAV_ITEMS) as NavKey[]).map((key) => {
                                const item = NAV_ITEMS[key];
                                const isOpen = openMobileMenu === key;
                                return (
                                    <div key={key}>
                                        <button
                                            onClick={() => toggleMobileMenu(key)}
                                            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-bold transition-colors ${isOpen ? "bg-indigo-50 text-indigo-700" : "text-slate-700 hover:bg-slate-50"}`}
                                        >
                                            {item.label}
                                            <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                                                <ChevronDown className="w-4 h-4" />
                                            </motion.span>
                                        </button>

                                        <AnimatePresence>
                                            {isOpen && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: "auto" }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    className="overflow-hidden pl-4 border-l-2 border-indigo-100 ml-4 mt-1 mb-2"
                                                >
                                                    {key === "programs" && (
                                                        <div className="space-y-1 py-1">
                                                            {[
                                                                { title: "AI Explorers", level: "Beginner Friendly" },
                                                                { title: "AI Builders", level: "Most Popular" },
                                                                { title: "AI Innovators", level: "Advanced" },
                                                            ].map((p) => (
                                                                <Link key={p.title} href="/register" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-purple-50 transition-colors">
                                                                    <div className="font-semibold text-slate-800">{p.title}</div>
                                                                    <div className="text-xs text-slate-500">{p.level}</div>
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    )}
                                                    {key === "mentors" && (
                                                        <div className="space-y-1 py-1">
                                                            <Link href="/mentors" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-lg text-slate-700 font-medium hover:bg-purple-50 transition-colors">Meet Our AI Mentors</Link>
                                                            <Link href="/become-mentor" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-lg text-slate-700 font-medium hover:bg-purple-50 transition-colors">Become a Mentor</Link>
                                                        </div>
                                                    )}
                                                    {key === "about" && (
                                                        <div className="space-y-1 py-1">
                                                            {[
                                                                { label: "Our Story", href: "/about" },
                                                                { label: "Curriculum", href: "/curriculum" },
                                                                { label: "Reviews", href: "/reviews" },
                                                                { label: "Careers", href: "/careers" },
                                                                { label: "Contact", href: "/contact" },
                                                            ].map((item) => (
                                                                <Link key={item.label} href={item.href} onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-lg text-slate-700 font-medium hover:bg-purple-50 transition-colors">{item.label}</Link>
                                                            ))}
                                                        </div>
                                                    )}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                );
                            })}

                            <div className="border-t border-gray-100 pt-4 mt-2 flex flex-col gap-3">
                                {!authUser && (
                                    <>
                                        <Link href="/login" onClick={() => setIsMenuOpen(false)} className="block text-center px-4 py-3 text-indigo-600 font-bold border border-indigo-100 rounded-xl hover:bg-indigo-50">Login</Link>
                                        <Link href="/signup" onClick={() => setIsMenuOpen(false)} className="block text-center px-4 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-200">Sign Up</Link>
                                    </>
                                )}
                                {authUser && (
                                    <>
                                        <button type="button" onClick={() => { setIsMenuOpen(false); router.push("/dashboard"); }} className="w-full text-center px-4 py-3 text-slate-700 font-bold border border-slate-100 rounded-xl hover:bg-slate-50">
                                            Dashboard
                                        </button>
                                        <button type="button" onClick={() => { setIsMenuOpen(false); handleLogout(); }} className="w-full text-center px-4 py-3 text-red-600 font-bold border border-red-100 rounded-xl hover:bg-red-50">
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
