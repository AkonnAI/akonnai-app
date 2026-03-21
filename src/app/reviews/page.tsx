import Footer from "@/components/Footer";

export const metadata = { title: "Reviews | AKMIND™" };

const REVIEWS = [
    { name: "Priya Sharma", role: "Parent", stars: 5, text: "My son built his first chatbot after just 3 weeks. He now explains AI concepts to me! The mentors are incredibly patient and knowledgeable." },
    { name: "Rahul Menon", role: "Parent", stars: 5, text: "AKMIND™'s curriculum is miles ahead of what schools teach. My daughter got a special mention at her school science fair for her AI project." },
    { name: "Anjali Nair", role: "Parent", stars: 5, text: "The 1-on-1 sessions make all the difference. The mentor personalises lessons to my child's pace. Worth every rupee." },
    { name: "Vikram Pillai", role: "Parent", stars: 5, text: "Fantastic platform! My son went from zero coding experience to building an image classifier in 8 weeks. Absolutely phenomenal progress." },
    { name: "Deepa Krishnan", role: "Parent", stars: 5, text: "The portfolio my daughter built through AKMIND™ helped her get into a prestigious summer research program. Cannot recommend enough." },
    { name: "Suresh Babu", role: "Parent", stars: 4, text: "Great introduction to AI for young kids. My son loves the Scratch-based activities and is always excited for his next class." },
];

function Stars({ count }: { count: number }) {
    return (
        <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className={i < count ? "text-amber-400" : "text-slate-200"}>★</span>
            ))}
        </div>
    );
}

export default function ReviewsPage() {
    return (
        <main className="min-h-screen flex flex-col bg-white">

            {/* Hero */}
            <section className="py-20 bg-gradient-to-br from-amber-50 via-white to-orange-50 relative overflow-hidden">
                <div className="absolute top-10 right-20 w-64 h-64 bg-amber-100 rounded-full blur-3xl opacity-50 pointer-events-none" />
                <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
                    <span className="inline-block px-4 py-1.5 bg-amber-100 text-amber-700 text-sm font-bold rounded-full uppercase tracking-widest mb-6">Reviews</span>
                    <h1 className="text-5xl font-bold text-slate-900 mb-4">What parents are saying</h1>
                    <p className="text-xl text-slate-600">Real stories from families who've seen their children transform through AKMIND™.</p>
                    <div className="flex items-center justify-center gap-3 mt-6">
                        <div className="flex gap-1">
                            {Array.from({ length: 5 }).map((_, i) => <span key={i} className="text-amber-400 text-2xl">★</span>)}
                        </div>
                        <span className="text-2xl font-bold text-slate-900">4.9</span>
                        <span className="text-slate-500">out of 5 · 500+ reviews</span>
                    </div>
                </div>
            </section>

            {/* Reviews Grid */}
            <section className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {REVIEWS.map((r) => (
                        <div key={r.name} className="bg-slate-50 rounded-3xl p-8 border border-slate-100 hover:shadow-lg transition-shadow">
                            <Stars count={r.stars} />
                            <p className="text-slate-700 mt-4 mb-6 leading-relaxed">&ldquo;{r.text}&rdquo;</p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                                    {r.name[0]}
                                </div>
                                <div>
                                    <p className="font-bold text-slate-900 text-sm">{r.name}</p>
                                    <p className="text-xs text-slate-400">{r.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-indigo-600 text-white text-center">
                <h2 className="text-3xl font-bold mb-4">Join 500+ families already on AKMIND™</h2>
                <p className="text-indigo-200 mb-8">Book a free demo class and see the difference yourself.</p>
                <a href="/register" className="inline-block px-8 py-4 bg-white text-indigo-700 font-bold rounded-full hover:bg-indigo-50 transition-colors shadow-lg">
                    Book a Free Demo →
                </a>
            </section>

            <Footer />
        </main>
    );
}
