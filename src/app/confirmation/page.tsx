"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, Calendar, Clock, BookOpen, Home, Loader2, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

type BookingData = {
    id: string;
    childName: string;
    grade: string;
    course: string;
    date: string;
    time: string;
    email: string;
};

export default function ConfirmationPage() {
    const router = useRouter();
    const [data, setData] = useState<BookingData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const bookingId = new URLSearchParams(window.location.search).get("id");
        if (!bookingId) {
            setError(true);
            setLoading(false);
            return;
        }

        fetch(`/api/booking/${bookingId}`)
            .then(async (res) => {
                if (!res.ok) throw new Error("Not found");
                return res.json();
            })
            .then((json) => {
                setData(json);
            })
            .catch(() => {
                setError(true);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
                <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-emerald-500" />
                    <div className="p-10 flex flex-col items-center gap-6">
                        <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center">
                            <Loader2 className="w-10 h-10 text-slate-400 animate-spin" />
                        </div>
                        <div className="space-y-3 w-full">
                            <div className="h-6 bg-slate-100 rounded-xl w-3/4 mx-auto animate-pulse" />
                            <div className="h-4 bg-slate-100 rounded-xl w-1/2 mx-auto animate-pulse" />
                        </div>
                        <div className="bg-slate-50 rounded-2xl p-6 w-full space-y-4 border border-slate-100">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-slate-200 animate-pulse" />
                                    <div className="flex-1 space-y-2">
                                        <div className="h-3 bg-slate-200 rounded animate-pulse w-1/4" />
                                        <div className="h-4 bg-slate-200 rounded animate-pulse w-1/2" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
                <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-400 to-rose-500" />
                    <div className="p-10 text-center">
                        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <AlertCircle className="w-12 h-12 text-red-500" />
                        </div>
                        <h1 className="text-2xl font-bold text-slate-900 mb-3">Booking not found</h1>
                        <p className="text-slate-500 mb-8">
                            Check your email for booking details, or book a new demo class.
                        </p>
                        <button
                            onClick={() => router.push("/register")}
                            className="w-full py-4 rounded-xl font-bold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                        >
                            Book Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

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
                        We have received your registration for <span className="font-semibold text-slate-700">{data.childName}</span>.
                    </p>
                    {data.email && (
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
                                <p className="font-bold text-slate-900">{data.course}</p>
                                {data.grade && (
                                    <p className="text-sm text-slate-500 mt-0.5"><b>Grade:</b> {data.grade}</p>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                                <Calendar className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase">Date</p>
                                <p className="font-bold text-slate-900">{data.date}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                                <Clock className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase">Time</p>
                                <p className="font-bold text-slate-900">{data.time}</p>
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
