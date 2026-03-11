"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, Calendar, Clock, BookOpen, Home } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ConfirmationPage() {
    const router = useRouter();
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const stored = sessionStorage.getItem("registrationData");
            if (stored) {
                setData(JSON.parse(stored));
            }
        }
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-emerald-500" />

                <div className="p-10 text-center">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring" }}
                        className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                        <Check className="w-12 h-12 text-green-600" />
                    </motion.div>

                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Booking Confirmed!</h1>
                    <p className="text-slate-500 mb-2">
                        Thank you, {data?.parentName || "Parent"}. We have received your registration.
                    </p>
                    {data?.email && (
                        <p className="text-sm text-emerald-600 font-medium mb-8">
                            A confirmation email has been sent to <span className="font-bold">{data.email}</span>
                        </p>
                    )}

                    <div className="bg-slate-50 rounded-2xl p-6 space-y-4 text-left border border-slate-100 mb-8">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                <BookOpen className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase">Course</p>
                                <p className="font-bold text-slate-900">{data?.course || "Selected Course"}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                                <Calendar className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase">Date</p>
                                <p className="font-bold text-slate-900">{data?.date || "Selected Date"}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                                <Clock className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase">Time</p>
                                <p className="font-bold text-slate-900">{data?.time || "Selected Time"}</p>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={() => router.push("/")}
                        className="w-full py-4 rounded-xl font-bold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors flex items-center justify-center gap-2"
                    >
                        <Home className="w-5 h-5" /> Return to Home
                    </button>
                </div>
            </div>
        </div>
    );
}
