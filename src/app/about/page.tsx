import Footer from "@/components/Footer";

export const metadata = {
  title: "About AKMIND",
  description: "Learn about AKMIND — the most exciting AI education platform founded in 2024. Our mission is to make world-class AI education accessible to every student.",
  alternates: { canonical: "https://www.akmind.com/about" }
};

export default function AboutPage() {
    return (
        <main className="min-h-screen flex flex-col bg-white">

            {/* Hero */}
            <section className="py-24 bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden">
                <div className="absolute top-10 right-20 w-72 h-72 bg-indigo-100 rounded-full blur-3xl opacity-50 pointer-events-none" />
                <div className="absolute bottom-0 left-10 w-64 h-64 bg-purple-100 rounded-full blur-3xl opacity-40 pointer-events-none" />
                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <span className="inline-block px-4 py-1.5 bg-indigo-100 text-indigo-700 text-sm font-bold rounded-full uppercase tracking-widest mb-6">Our Story</span>
                    <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                        We believe every child<br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">deserves an AI future</span>
                    </h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                        AKMIND™ exists to make world-class AI education accessible to every student. We believe the next generation of AI builders, researchers and entrepreneurs are sitting in classrooms right now — and they deserve expert mentorship, hands-on projects and real skills.
                    </p>
                </div>
            </section>

            {/* Mission */}
            <section className="py-20 bg-white">
                <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">Why we started AKMIND™</h2>
                        <p className="text-slate-600 leading-relaxed mb-4">
                            In 2024, our founders noticed a gap — students were learning outdated curricula while the world was rapidly shifting to AI-powered everything. Schools weren&apos;t equipped to bridge that gap.
                        </p>
                        <p className="text-slate-600 leading-relaxed mb-4">
                            So we built AKMIND™ — a structured, hands-on AI learning platform designed for students and AI enthusiasts of all backgrounds. We partnered with industry professionals to create curriculum that mirrors what real AI engineers build every day.
                        </p>
                        <p className="text-slate-600 leading-relaxed">
                            Today, 500+ students worldwide have learned to build chatbots, image classifiers, voice assistants, and more — with real portfolios to show for it.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        {[
                            { icon: "🎓", title: "500+ Students", desc: "Enrolled from worldwide" },
                            { icon: "🧑‍🏫", title: "4 Expert Mentors", desc: "Industry professionals" },
                            { icon: "🚀", title: "3 Programs", desc: "Explorers, Builders, Innovators" },
                            { icon: "📅", title: "Founded 2024", desc: "Bangalore, Karnataka, India" },
                        ].map((item) => (
                            <div key={item.title} className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                                <div className="text-3xl mb-3">{item.icon}</div>
                                <h3 className="font-bold text-slate-900 text-sm mb-1">{item.title}</h3>
                                <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-5xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">What we stand for</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: "🤝", title: "Student First", desc: "Every decision we make starts with one question: is this the best for the student?" },
                            { icon: "🏗️", title: "Build, Don't Just Learn", desc: "We believe understanding comes from creating. Every lesson ends with something built." },
                            { icon: "🌱", title: "Grow Together", desc: "Our mentors grow alongside students — we invest in our educators as much as our learners." },
                        ].map((v) => (
                            <div key={v.title} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 text-center">
                                <div className="text-4xl mb-4">{v.icon}</div>
                                <h3 className="font-bold text-slate-900 text-lg mb-3">{v.title}</h3>
                                <p className="text-slate-500 leading-relaxed">{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact CTA */}
            <section className="py-16 bg-white border-t border-slate-100 text-center">
                <p className="text-slate-500 text-sm">
                    Questions about AKMIND™? Reach us at{" "}
                    <a href="mailto:hello@akmind.com" className="text-indigo-600 font-semibold hover:underline">
                        hello@akmind.com
                    </a>
                </p>
            </section>

            <Footer />
        </main>
    );
}
