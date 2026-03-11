"use client";

const TOOLS = [
    { name: "Python", emoji: "🐍" },
    { name: "TensorFlow", emoji: "🤖" },
    { name: "OpenAI", emoji: "✨" },
    { name: "Scratch", emoji: "🎨" },
    { name: "PyTorch", emoji: "🔥" },
    { name: "Jupyter", emoji: "📓" },
    { name: "NumPy", emoji: "🔢" },
    { name: "Pandas", emoji: "🐼" },
    { name: "Keras", emoji: "🧠" },
    { name: "VS Code", emoji: "💻" },
    { name: "Hugging Face", emoji: "🤗" },
    { name: "Matplotlib", emoji: "📊" },
];

// Duplicate for seamless infinite loop
const ITEMS = [...TOOLS, ...TOOLS];

export default function LogoTicker() {
    return (
        <div className="py-14 bg-white overflow-hidden border-y border-slate-100 relative">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-8">
                Tools You&apos;ll Master
            </p>

            <div className="flex gap-6 animate-ticker w-max">
                {ITEMS.map((tool, i) => (
                    <div
                        key={i}
                        className="flex items-center gap-3 px-5 py-3 bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 rounded-full shadow-sm transition-all duration-200 flex-shrink-0 cursor-default"
                    >
                        <span className="text-xl">{tool.emoji}</span>
                        <span className="font-semibold text-slate-700 text-sm whitespace-nowrap">{tool.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
