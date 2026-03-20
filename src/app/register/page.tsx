"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Check, Loader2 } from "lucide-react";

const STEPS = [
    { id: 1, title: "Parent Details", fields: ["parentName", "phone", "email"] },
    { id: 2, title: "Student Details", fields: ["childName", "grade"] },
    { id: 3, title: "Select Course", fields: ["course"] },
    { id: 4, title: "Schedule", fields: ["date", "time"] },
];

const COURSES = ["AI Explorers (Grades 5-6)", "AI Builders (Grades 7-8)", "AI Innovators (Grades 9-10)"];
const TIMES = ["4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM"];

export default function RegisterPage() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
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

    const updateField = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const nextStep = () => {
        if (currentStep < STEPS.length) {
            setCurrentStep(prev => prev + 1);
        } else {
            handleSubmit();
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        setSubmitError(null);

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                console.error("Registration failed:", errData);
                setSubmitError("Registration failed. Please try again or contact support.");
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

    const isStepValid = () => {
        const currentFields = STEPS[currentStep - 1].fields;
        return currentFields.every(field => formData[field as keyof typeof formData] !== "");
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl overflow-hidden min-h-[500px] flex flex-col">
                {/* Progress Bar */}
                <div className="h-2 bg-slate-100 w-full">
                    <motion.div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
                        initial={{ width: 0 }}
                        animate={{ width: `${(currentStep / STEPS.length) * 100}%` }}
                    />
                </div>

                <div className="p-8 flex-1 flex flex-col">
                    <div className="mb-8">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Step {currentStep} of {STEPS.length}</span>
                        <h2 className="text-3xl font-bold text-slate-900 mt-2">{STEPS[currentStep - 1].title}</h2>
                    </div>

                    <div className="flex-1">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentStep}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-6"
                            >
                                {currentStep === 1 && (
                                    <>
                                        <InputField label="Parent Name" value={formData.parentName} onChange={(e) => updateField("parentName", e.target.value)} placeholder="Enter your name" />
                                        <InputField label="Phone Number" value={formData.phone} onChange={(e) => updateField("phone", e.target.value)} placeholder="Enter your mobile number" type="tel" />
                                        <InputField label="Email Address" value={formData.email} onChange={(e) => updateField("email", e.target.value)} placeholder="Enter your email" type="email" />
                                    </>
                                )}

                                {currentStep === 2 && (
                                    <>
                                        <InputField label="Child's Name" value={formData.childName} onChange={(e) => updateField("childName", e.target.value)} placeholder="Enter student's name" />
                                        <InputField label="Grade / Class" value={formData.grade} onChange={(e) => updateField("grade", e.target.value)} placeholder="e.g. Grade 6" />
                                    </>
                                )}

                                {currentStep === 3 && (
                                    <div className="space-y-3">
                                        <label className="block text-sm font-bold text-slate-700 mb-1">Select Program</label>
                                        {COURSES.map((course) => (
                                            <div
                                                key={course}
                                                onClick={() => updateField("course", course)}
                                                className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${formData.course === course ? "border-purple-600 bg-purple-50" : "border-slate-200 hover:border-purple-300"}`}
                                            >
                                                <span className={`font-medium ${formData.course === course ? "text-purple-700" : "text-slate-600"}`}>{course}</span>
                                                {formData.course === course && <Check className="w-5 h-5 text-purple-600" />}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {currentStep === 4 && (
                                    <>
                                        <div className="mb-6">
                                            <label className="block text-sm font-bold text-slate-700 mb-2">Select Date</label>
                                            <input
                                                type="date"
                                                value={formData.date}
                                                onChange={(e) => updateField("date", e.target.value)}
                                                className="w-full p-4 rounded-xl border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all text-slate-900"
                                            />
                                        </div>

                                        <label className="block text-sm font-bold text-slate-700 mb-2">Preferred Time</label>
                                        <div className="grid grid-cols-2 gap-3">
                                            {TIMES.map((time) => (
                                                <div
                                                    key={time}
                                                    onClick={() => updateField("time", time)}
                                                    className={`p-4 rounded-xl border cursor-pointer text-center transition-all ${formData.time === time ? "border-purple-600 bg-purple-50 text-purple-700 font-bold" : "border-slate-200 hover:border-purple-300 text-slate-600"}`}
                                                >
                                                    {time}
                                                </div>
                                            ))}
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

                    <div className="mt-8 flex justify-between items-center pt-8 border-t border-slate-100">
                        {currentStep > 1 ? (
                            <button onClick={prevStep} className="flex items-center gap-2 text-slate-500 font-bold hover:text-slate-800 transition-colors">
                                <ChevronLeft className="w-5 h-5" /> Back
                            </button>
                        ) : <div></div>}

                        <button
                            onClick={nextStep}
                            disabled={!isStepValid() || isSubmitting}
                            className={`flex items-center gap-2 px-8 py-3 rounded-full font-bold text-white transition-all ${!isStepValid() || isSubmitting ? "bg-slate-300 cursor-not-allowed" : "bg-slate-900 hover:bg-slate-800 shadow-lg hover:shadow-xl hover:scale-105"}`}
                        >
                            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : (currentStep === STEPS.length ? "Confirm Booking" : "Continue")}
                            {!isSubmitting && currentStep !== STEPS.length && <ChevronRight className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const InputField = ({ label, value, onChange, placeholder, type = "text" }: { label: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, placeholder: string, type?: string }) => (
    <div>
        <label className="block text-sm font-bold text-slate-700 mb-2">{label}</label>
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full p-4 rounded-xl border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all font-medium text-slate-900 placeholder:text-slate-400"
        />
    </div>
);
