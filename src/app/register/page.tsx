"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Check, Loader2, ChevronDown } from "lucide-react";
import ParentalGuidelines from "@/components/ParentalGuidelines";

const STEPS = [
    { id: 1, label: "Your Details" },
    { id: 2, label: "Student Info" },
    { id: 3, label: "Choose Program" },
    { id: 4, label: "Schedule" },
];

const STEP_HEADINGS = [
    "Let's get started! Tell us about yourself.",
    "Now tell us about your child.",
    "Which program is the right fit?",
    "Almost there! Pick a date and time.",
];

const COURSES = [
    { name: "AI Explorers", desc: "Perfect for beginners — no prior experience needed", level: "Beginner" },
    { name: "AI Builders", desc: "Hands-on ML and Python projects — our most popular program", level: "Most Popular" },
    { name: "AI Innovators", desc: "Advanced AI, Deep Learning and real-world applications", level: "Advanced" },
];

const TIMES = ["4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM"];

const LEVEL_COLORS: Record<string, string> = {
    "Beginner": "bg-green-100 text-green-700",
    "Most Popular": "bg-indigo-100 text-indigo-700",
    "Advanced": "bg-purple-100 text-purple-700",
};

// Step progress indicator
function StepBar({ current, completed }: { current: number; completed: Set<number> }) {
    return (
        <div className="flex items-center justify-between mb-8 px-2">
            {STEPS.map((step, i) => {
                const isDone = completed.has(step.id);
                const isActive = current === step.id;
                return (
                    <div key={step.id} className="flex items-center flex-1">
                        <div className="flex flex-col items-center">
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                                    isDone
                                        ? "bg-green-500 text-white"
                                        : isActive
                                        ? "bg-indigo-600 text-white"
                                        : "bg-slate-100 text-slate-400"
                                }`}
                            >
                                {isDone ? <Check className="w-4 h-4" /> : step.id}
                            </div>
                            <span
                                className={`text-[10px] font-semibold mt-1 whitespace-nowrap hidden sm:block ${
                                    isActive ? "text-indigo-600" : isDone ? "text-green-600" : "text-slate-400"
                                }`}
                            >
                                {step.label}
                            </span>
                        </div>
                        {i < STEPS.length - 1 && (
                            <div className={`flex-1 h-0.5 mx-2 transition-colors duration-300 ${isDone ? "bg-green-400" : "bg-slate-100"}`} />
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default function RegisterPage() {
    const router = useRouter();
    const [guidelinesOpen, setGuidelinesOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
    const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        parentName: "",
        phone: "",
        email: "",
        childName: "",
        grade: "",
        course: "",
        date: "",
        time: "",
    });

    const updateField = (field: string, value: string) =>
        setFormData((prev) => ({ ...prev, [field]: value }));

    const isStepValid = (step = currentStep) => {
        if (step === 1) return !!(formData.parentName && formData.phone && formData.email);
        if (step === 2) return !!(formData.childName && formData.grade);
        if (step === 3) return !!formData.course;
        if (step === 4) return !!(formData.date && formData.time);
        return false;
    };

    const nextStep = () => {
        if (!isStepValid()) return;
        if (currentStep < STEPS.length) {
            setCompletedSteps((prev) => new Set([...prev, currentStep]));
            setDirection(1);
            setCurrentStep((prev) => prev + 1);
        } else {
            handleSubmit();
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setDirection(-1);
            setCurrentStep((prev) => prev - 1);
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        setSubmitError(null);
        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    parentName: formData.parentName,
                    phone: formData.phone,
                    email: formData.email,
                    childName: formData.childName,
                    course: formData.course,
                    date: formData.date,
                    time: formData.time,
                }),
            });
            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                setSubmitError("Registration failed. Please try again or contact support.");
                console.error("Registration failed:", errData);
                setIsSubmitting(false);
                return;
            }
            const { bookingId } = await res.json();
            router.push(`/confirmation?id=${bookingId}`);
        } catch (error) {
            console.error("Submission error:", error);
            setSubmitError("A network error occurred. Please check your connection and try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const variants = {
        enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
        center: { opacity: 1, x: 0 },
        exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -40 : 40 }),
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">

            {/* Collapsible Parental Guidelines */}
            <div className="w-full max-w-5xl mb-4">
                <button
                    onClick={() => setGuidelinesOpen((prev) => !prev)}
                    className="flex items-center gap-2 text-sm text-indigo-600 font-semibold hover:text-indigo-800 transition-colors"
                >
                    <motion.span
                        animate={{ rotate: guidelinesOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <ChevronDown className="w-4 h-4" />
                    </motion.span>
                    {guidelinesOpen ? "Hide parental guidelines" : "Show parental guidelines"}
                </button>
                <AnimatePresence initial={false}>
                    {guidelinesOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                        >
                            <ParentalGuidelines />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Wizard card */}
            <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col">
                {/* Top progress bar */}
                <div className="h-1.5 bg-slate-100 w-full">
                    <motion.div
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-600"
                        initial={{ width: 0 }}
                        animate={{ width: `${(currentStep / STEPS.length) * 100}%` }}
                        transition={{ duration: 0.4 }}
                    />
                </div>

                <div className="p-4 sm:p-8 flex flex-col">
                    {/* Step progress dots */}
                    <StepBar current={currentStep} completed={completedSteps} />

                    {/* Step heading */}
                    <div className="mb-6">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                            Step {currentStep} of {STEPS.length}
                        </span>
                        <h2 className="text-xl font-bold text-slate-900 mt-1">
                            {STEP_HEADINGS[currentStep - 1]}
                        </h2>
                    </div>

                    {/* Animated step content */}
                    <div className="min-h-[280px]">
                        <AnimatePresence mode="wait" custom={direction}>
                            <motion.div
                                key={currentStep}
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.28, ease: "easeInOut" }}
                                className="space-y-5"
                            >
                                {/* Step 1 — Parent Details */}
                                {currentStep === 1 && (
                                    <>
                                        <InputField label="Parent Name" value={formData.parentName} onChange={(e) => updateField("parentName", e.target.value)} placeholder="Enter your name" />
                                        <InputField label="Phone Number" value={formData.phone} onChange={(e) => updateField("phone", e.target.value)} placeholder="Enter your mobile number" type="tel" />
                                        <InputField label="Email Address" value={formData.email} onChange={(e) => updateField("email", e.target.value)} placeholder="Enter your email" type="email" />
                                    </>
                                )}

                                {/* Step 2 — Student Details */}
                                {currentStep === 2 && (
                                    <>
                                        <InputField label="Child's Name" value={formData.childName} onChange={(e) => updateField("childName", e.target.value)} placeholder="Enter student's name" />
                                        <InputField label="Grade / Class" value={formData.grade} onChange={(e) => updateField("grade", e.target.value)} placeholder="e.g. Grade 6" />
                                    </>
                                )}

                                {/* Step 3 — Course Selection */}
                                {currentStep === 3 && (
                                    <div className="space-y-3">
                                        {COURSES.map((course) => {
                                            const selected = formData.course === course.name;
                                            return (
                                                <div
                                                    key={course.name}
                                                    onClick={() => updateField("course", course.name)}
                                                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                                                        selected
                                                            ? "border-indigo-600 bg-indigo-50"
                                                            : "border-slate-200 hover:border-indigo-300 bg-white"
                                                    }`}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <p className={`font-bold text-sm ${selected ? "text-indigo-700" : "text-slate-800"}`}>
                                                                {course.name}
                                                            </p>
                                                            <p className={`text-xs mt-0.5 ${selected ? "text-indigo-500" : "text-slate-400"}`}>
                                                                {course.desc}
                                                            </p>
                                                        </div>
                                                        <div className="flex items-center gap-2 shrink-0 ml-3">
                                                            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${LEVEL_COLORS[course.level]}`}>
                                                                {course.level}
                                                            </span>
                                                            {selected && <Check className="w-5 h-5 text-indigo-600" />}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}

                                {/* Step 4 — Schedule */}
                                {currentStep === 4 && (
                                    <>
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-2">Select Date</label>
                                            <input
                                                type="date"
                                                value={formData.date}
                                                onChange={(e) => updateField("date", e.target.value)}
                                                className="w-full p-4 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-slate-900"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-2">Preferred Time</label>
                                            <div className="grid grid-cols-2 gap-3">
                                                {TIMES.map((time) => (
                                                    <div
                                                        key={time}
                                                        onClick={() => updateField("time", time)}
                                                        className={`p-4 rounded-xl border cursor-pointer text-center transition-all ${
                                                            formData.time === time
                                                                ? "border-indigo-600 bg-indigo-50 text-indigo-700 font-bold"
                                                                : "border-slate-200 hover:border-indigo-300 text-slate-600"
                                                        }`}
                                                    >
                                                        {time}
                                                    </div>
                                                ))}
                                            </div>
                                            <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                                                All sessions are conducted live over video call. Your mentor will send you a joining link 30 minutes before class.
                                            </p>
                                        </div>
                                    </>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {submitError && (
                        <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium text-center">
                            {submitError}
                        </div>
                    )}

                    {/* Navigation buttons */}
                    <div className="mt-6 sm:mt-8 flex flex-col-reverse sm:flex-row justify-between items-stretch sm:items-center gap-3">
                        {currentStep > 1 ? (
                            <button
                                onClick={prevStep}
                                className="flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-3 rounded-full font-bold text-slate-600 border border-slate-200 hover:border-slate-300 hover:text-slate-900 transition-all"
                            >
                                <ChevronLeft className="w-5 h-5" /> Back
                            </button>
                        ) : (
                            <div />
                        )}

                        <button
                            onClick={nextStep}
                            disabled={!isStepValid() || isSubmitting}
                            className={`flex items-center gap-2 px-8 py-3 rounded-full font-bold text-white transition-all w-full justify-center ${
                                !isStepValid() || isSubmitting
                                    ? "bg-slate-300 cursor-not-allowed"
                                    : "bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 hover:shadow-indigo-300"
                            }`}
                        >
                            {isSubmitting ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : currentStep === STEPS.length ? (
                                "Confirm Booking"
                            ) : (
                                <>Continue <ChevronRight className="w-5 h-5" /></>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const InputField = ({
    label, value, onChange, placeholder, type = "text",
}: {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    type?: string;
}) => (
    <div>
        <label className="block text-sm font-bold text-slate-700 mb-2">{label}</label>
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full p-4 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all font-medium text-slate-900 placeholder:text-slate-400"
        />
    </div>
);
