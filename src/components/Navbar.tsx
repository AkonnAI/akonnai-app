"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type AuthUser = { name: string; email: string };

const NAV_ITEMS = {
    programs: {
        label: "Programs",
        content: (
            <div className="py-2">
                <div className="px-5 py-2">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Our AI Learning Tracks</h3>
                </div>
                <div className="h-px bg-slate-700/50 my-1 mx-5" />
                {[
                    { title: "AI Explorers", level: "Beginner Friendly" },
                    { title: "AI Builders", level: "Most Popular" },
                    { title: "AI Innovators", level: "Advanced" },
                ].map((p) => (
                    <Link
                        key={p.title}
                        href="/register"
                        className="block px-5 py-3 hover:bg-slate-700/50 group/item transition-colors relative"
                    >
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                        <div className="font-bold text-slate-200 group-hover/item:text-white transition-colors">{p.title}</div>
                        <div className="text-sm text-slate-400 group-hover/item:text-indigo-400 transition-colors">{p.level}</div>
                    </Link>
                ))}
                <div className="h-px bg-slate-700/50 my-1 mx-5" />
                <div className="px-5 py-2">
                    <Link href="/register" className="text-sm font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 group/link">
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
                <Link href="/mentors" className="block px-4 py-2 text-slate-300 hover:bg-slate-700/50 hover:text-white rounded-lg font-medium transition-colors">Meet Our AI Mentors</Link>
                <Link href="/become-mentor" className="block px-4 py-2 text-slate-300 hover:bg-slate-700/50 hover:text-white rounded-lg font-medium transition-colors">Become a Mentor</Link>
            </div>
        ),
        width: "w-56",
        align: "left-0",
    },
    about: {
        label: "About AKMIND™",
        content: (
            <div className="p-2">
                {[
                    { label: "Our Story", href: "/about" },
                    { label: "Curriculum", href: "/curriculum" },
                    { label: "Reviews", href: "/reviews" },
                    { label: "Careers", href: "/careers" },
                    { label: "Contact", href: "/contact" },
                ].map((item) => (
                    <Link key={item.label} href={item.href} className="block px-4 py-2 text-slate-300 hover:bg-slate-700/50 hover:text-white rounded-lg font-medium transition-colors">{item.label}</Link>
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
        const handleScroll = () => setScrolled(window.scrollY > 80);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [isMenuOpen]);

    useEffect(() => {
        if (!openMenu) return;
        const handler = (e: MouseEvent) => {
            if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenMenu(null);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [openMenu]);

    useEffect(() => {
        if (!isProfileOpen) return;
        const handler = (e: MouseEvent) => {
            if (profileRef.current && !profileRef.current.contains(e.target as Node)) setIsProfileOpen(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [isProfileOpen]);

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
            const encoded = decoded.slice(0, dotIndex);
            const b64 = encoded.replace(/-/g, "+").replace(/_/g, "/");
            const padded = b64 + "===".slice((b64.length + 3) % 4);
            const base = atob(padded);
            const user = JSON.parse(base) as { id: string; name: string; email: string };
            setAuthUser({ name: user.name, email: user.email });
        } catch { setAuthUser(null); }
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

    const toggleMenu = (key: NavKey) => setOpenMenu((prev) => (prev === key ? null : key));
    const toggleMobileMenu = (key: NavKey) => setOpenMobileMenu((prev) => (prev === key ? null : key));

    return (
        <>
        <motion.div
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled
                    ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200"
                    : "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200"
            }`}
        >
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={navRef}>
                <div className="flex justify-between items-center h-14 md:h-20">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">AI</span>
                        </div>
                        <div className="flex flex-col leading-none">
                            <span className="font-bold text-xl text-slate-900">
                                AKMIND<span className="text-indigo-500">.</span><span className="text-xs align-super text-slate-400 font-normal">™</span>
                            </span>
                            <span className="text-xs text-slate-500">by AkonnAI</span>
                        </div>
                    </Link>

                    {/* Desktop nav items */}
                    <div className="hidden md:flex items-center space-x-1">
                        {(Object.keys(NAV_ITEMS) as NavKey[]).map((key) => {
                            const item = NAV_ITEMS[key];
                            const isOpen = openMenu === key;
                            return (
                                <div key={key} className="relative">
                                    <button
                                        onClick={() => toggleMenu(key)}
                                        className={`flex items-center gap-1 px-3 py-2 rounded-lg font-medium text-sm transition-colors ${
                                            isOpen
                                                ? "text-indigo-600 bg-indigo-50"
                                                : "text-slate-700 hover:text-indigo-600 hover:bg-slate-50"
                                        }`}
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
                                                className={`absolute top-full mt-1 ${item.width} ${item.align} bg-slate-900 shadow-xl rounded-xl border border-slate-700/50 z-50 overflow-hidden`}
                                            >
                                                {item.content}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>

                    {/* Right side */}
                    <div className="hidden md:flex items-center gap-4">
                        <div className="flex items-center cursor-pointer gap-1.5 transition-colors text-slate-500 hover:text-slate-700">
                            <Globe size={15} />
                            <span className="text-sm font-medium">India (EN)</span>
                        </div>

                        {/* Always-visible Book Demo */}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => router.push("/register")}
                            className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                        >
                            Book Demo
                        </motion.button>

                        {!authUser && (
                            <Link href="/login" className="font-medium transition-colors text-sm text-slate-700 hover:text-indigo-600">
                                Login
                            </Link>
                        )}

                        {authUser && (
                            <div className="relative" ref={profileRef}>
                                <button
                                    type="button"
                                    onClick={() => setIsProfileOpen((o) => !o)}
                                    className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/50 px-2 py-1 hover:border-indigo-500/50 transition-colors"
                                >
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
                                        {getInitials(authUser)}
                                    </div>
                                    <ChevronDown className="w-4 h-4 text-slate-400" />
                                </button>
                                <AnimatePresence>
                                    {isProfileOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 8 }}
                                            transition={{ duration: 0.15 }}
                                            className="absolute right-0 mt-3 w-48 bg-slate-900 rounded-xl shadow-xl border border-slate-700/50 py-2 z-50"
                                        >
                                            <div className="px-4 py-2 border-b border-slate-700/50">
                                                <p className="text-xs text-slate-500 font-semibold uppercase">Signed in as</p>
                                                <p className="text-sm font-bold text-white truncate">{authUser.email}</p>
                                            </div>
                                            <button type="button" onClick={() => { setIsProfileOpen(false); router.push("/dashboard"); }} className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
                                                Dashboard
                                            </button>
                                            <button type="button" onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors">
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
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-700 hover:text-slate-900 transition-colors focus:outline-none">
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </nav>
        </motion.div>

        {/* Mobile Menu — full-screen overlay, rendered outside sticky nav */}
        <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="fixed inset-0 z-[999] bg-white flex flex-col min-h-screen md:hidden"
                    >
                        {/* Top bar */}
                        <div className="flex items-center justify-between px-4 h-14 border-b border-slate-100 shrink-0">
                            <Link href="/" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-xs">AI</span>
                                </div>
                                <div className="flex flex-col leading-none">
                                    <span className="font-bold text-base text-slate-900">
                                        AKMIND<span className="text-indigo-500">.</span><span className="text-[10px] align-super text-slate-400 font-normal">™</span>
                                    </span>
                                    <span className="text-[10px] text-slate-500">by AkonnAI</span>
                                </div>
                            </Link>
                            <button
                                onClick={() => setIsMenuOpen(false)}
                                className="text-slate-700 hover:text-slate-900 transition-colors focus:outline-none p-1"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Nav links */}
                        <div className="flex-1 overflow-y-auto px-6 py-2">
                            {[
                                { label: "Home", href: "/" },
                                { label: "Programs", href: "/curriculum" },
                                { label: "Mentors", href: "/mentors" },
                                { label: "About", href: "/about" },
                                { label: "Contact", href: "/contact" },
                                { label: "Careers", href: "/careers" },
                            ].map((link) => (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block text-slate-800 text-lg font-medium py-4 border-b border-slate-100 w-full hover:text-indigo-600 transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                        {/* Bottom CTA */}
                        <div className="mt-auto px-6 pb-8 pt-4 shrink-0 space-y-3">
                            <Link
                                href="/register"
                                onClick={() => setIsMenuOpen(false)}
                                className="block w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 rounded-xl text-center transition-colors"
                            >
                                Book Free Demo
                            </Link>
                            {!authUser && (
                                <Link
                                    href="/login"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block w-full border border-slate-200 text-slate-700 font-semibold py-4 rounded-xl text-center hover:bg-slate-50 transition-colors"
                                >
                                    Login
                                </Link>
                            )}
                            {authUser && (
                                <>
                                    <button type="button" onClick={() => { setIsMenuOpen(false); router.push("/dashboard"); }} className="w-full border border-slate-200 text-slate-700 font-semibold py-4 rounded-xl text-center hover:bg-slate-50 transition-colors">
                                        Dashboard
                                    </button>
                                    <button type="button" onClick={() => { setIsMenuOpen(false); handleLogout(); }} className="w-full border border-red-200 text-red-500 font-semibold py-4 rounded-xl text-center hover:bg-red-50 transition-colors">
                                        Log out
                                    </button>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
        </AnimatePresence>
        </>
    );
};

export default Navbar;
