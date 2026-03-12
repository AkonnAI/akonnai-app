import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = { title: "Meet Our AI Mentors | AKMIND" };

const MENTORS = [
    { name: "Arjun Krishnamurthy", role: "Senior AI Engineer", company: "Ex-Google", expertise: ["Deep Learning", "NLP", "TensorFlow"], bio: "10+ years in AI/ML. Led NLP projects at Google India. Passionate about making complex AI simple for young minds.", emoji: "👨‍💻" },
    { name: "Priyanka Menon", role: "ML Researcher", company: "Ex-Microsoft", expertise: ["Computer Vision", "PyTorch", "OpenAI API"], bio: "Published researcher in computer vision. Built AI products used by millions. Loves teaching through hands-on projects.", emoji: "👩‍🔬" },
    { name: "Rahul Nambiar", role: "AI Product Manager", company: "IIT Bombay Alumni", expertise: ["AI Strategy", "Python", "Data Science"], bio: "IIT Bombay grad. Helped 200+ students build AI portfolios. Specialises in Grades 9–10 advanced curriculum.", emoji: "👨‍🏫" },
    { name: "Sneha Pillai", role: "Data Scientist", company: "Ex-Amazon", expertise: ["Machine Learning", "Pandas", "Matplotlib"], bio: "4 years at Amazon Alexa team. Expert at making data science fun and accessible for beginners.", emoji: "👩‍💻" },
    { name: "Karthik Rajan", role: "AI Educator", company: "MIT Online Instructor", expertise: ["Scratch AI", "Logic", "Beginner AI"], bio: "Specialises in Grades 5–6. Created AKMIND's AI Explorers curriculum. 3 years of teaching kids to code.", emoji: "👨‍🎓" },
    { name: "Divya Suresh", role: "Full Stack AI Developer", company: "Startup Founder", expertise: ["Generative AI", "APIs", "Web AI"], bio: "Founded an AI-powered EdTech startup. Brings real-world startup experience to the classroom.", emoji: "👩‍🚀" },
];

export default function MentorsPage() {
    return (
        <main className="min-h-screen flex flex-col bg-white">
            <Navbar />

            {/* Hero */}
            <section className="py-20 bg-gradient-to-br from-purple-50 via-white to-indigo-50 relative overflow-hidden">
                <div className="absolute top-10 right-10 w-72 h-72 bg-purple-100 rounded-full blur-3xl opacity-50 pointer-events-none" />
                <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
                    <span className="inline-block px-4 py-1.5 bg-purple-100 text-purple-700 text-sm font-bold rounded-full uppercase tracking-widest mb-6">Our Mentors</span>
                    <h1 className="text-5xl font-bold text-slate-900 mb-4">
                        Learn from the <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-indigo-600">best in the industry</span>
                    </h1>
                    <p className="text-xl text-slate-600">Every AKMIND mentor is a working AI professional — not just a teacher. Your child learns what&apos;s actually used in the real world.</p>
                </div>
            </section>

            {/* Mentors Grid */}
            <section className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {MENTORS.map((m) => (
                        <div key={m.name} className="bg-white border border-slate-200 rounded-3xl p-8 hover:shadow-xl hover:border-indigo-200 transition-all group">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-3xl mb-5 group-hover:scale-110 transition-transform">
                                {m.emoji}
                            </div>
                            <h3 className="text-xl font-bold text-slate-900">{m.name}</h3>
                            <p className="text-sm font-semibold text-indigo-600 mb-1">{m.role}</p>
                            <p className="text-xs text-slate-400 mb-4">{m.company}</p>
                            <p className="text-slate-600 text-sm leading-relaxed mb-5">{m.bio}</p>
                            <div className="flex flex-wrap gap-2">
                                {m.expertise.map((tag) => (
                                    <span key={tag} className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full">{tag}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-slate-50 text-center border-t border-slate-100">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Want to join as a mentor?</h2>
                <p className="text-slate-600 mb-8">We&apos;re always looking for passionate AI professionals to inspire the next generation.</p>
                <a href="/become-mentor" className="inline-block px-8 py-4 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200">
                    Become a Mentor →
                </a>
            </section>

            <Footer />
        </main>
    );
}
