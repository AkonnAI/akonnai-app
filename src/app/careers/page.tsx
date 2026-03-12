import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = { title: "Careers | AKMIND" };

const OPENINGS = [
    { title: "AI Curriculum Designer", type: "Full-time · Remote", dept: "Education", desc: "Design and iterate on AI learning modules for Grades 5–10. Strong pedagogy background + AI knowledge required." },
    { title: "AI Mentor / Tutor", type: "Part-time · Remote", dept: "Mentorship", desc: "Conduct 1-on-1 live sessions with students. Passion for teaching and a background in ML/AI engineering required." },
    { title: "Frontend Developer", type: "Full-time · Remote", dept: "Engineering", desc: "Build and improve our learning platform using Next.js, React, and Tailwind. You'll own the student experience." },
    { title: "Growth & Marketing Manager", type: "Full-time · Hybrid", dept: "Marketing", desc: "Drive parent acquisition through digital campaigns, content, and partnerships with schools." },
    { title: "Student Success Manager", type: "Full-time · Hybrid", dept: "Operations", desc: "Ensure students and parents have an exceptional experience from enrollment to completion." },
];

export default function CareersPage() {
    return (
        <main className="min-h-screen flex flex-col bg-white">
            <Navbar />

            {/* Hero */}
            <section className="py-20 bg-gradient-to-br from-emerald-50 via-white to-teal-50 relative overflow-hidden">
                <div className="absolute top-0 right-1/4 w-72 h-72 bg-emerald-100 rounded-full blur-3xl opacity-40 pointer-events-none" />
                <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
                    <span className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 text-sm font-bold rounded-full uppercase tracking-widest mb-6">Careers</span>
                    <h1 className="text-5xl font-bold text-slate-900 mb-4">Build the future of<br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-teal-600">AI education</span>
                    </h1>
                    <p className="text-xl text-slate-600">Join a team that&apos;s shaping how the next generation learns AI. Remote-first, mission-driven, and growing fast.</p>
                </div>
            </section>

            {/* Perks */}
            <section className="py-16 bg-white border-b border-slate-100">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { icon: "🌍", label: "100% Remote" },
                            { icon: "📈", label: "Fast Growth" },
                            { icon: "🧠", label: "Learn Every Day" },
                            { icon: "❤️", label: "Meaningful Work" },
                        ].map((p) => (
                            <div key={p.label} className="text-center p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                <div className="text-3xl mb-3">{p.icon}</div>
                                <div className="font-bold text-slate-700">{p.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Open Roles */}
            <section className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-slate-900 mb-10">Open Positions</h2>
                    <div className="space-y-4">
                        {OPENINGS.map((job) => (
                            <div key={job.title} className="group p-6 bg-white border border-slate-200 rounded-2xl hover:border-indigo-300 hover:shadow-md transition-all">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-xs font-bold px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full">{job.dept}</span>
                                            <span className="text-xs text-slate-400">{job.type}</span>
                                        </div>
                                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">{job.title}</h3>
                                        <p className="text-sm text-slate-500 mt-1">{job.desc}</p>
                                    </div>
                                    <a
                                        href={`mailto:admin@akonnai.ai?subject=Application: ${job.title}`}
                                        className="flex-shrink-0 px-6 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-full hover:bg-indigo-700 transition-colors text-center"
                                    >
                                        Apply Now
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="text-center text-slate-500 mt-10 text-sm">
                        Don&apos;t see your role? Email us at{" "}
                        <a href="mailto:admin@akonnai.ai" className="text-indigo-600 font-semibold hover:underline">admin@akonnai.ai</a>
                    </p>
                </div>
            </section>

            <Footer />
        </main>
    );
}
