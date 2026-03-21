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

const ITEMS = [...TOOLS, ...TOOLS];

export default function LogoTicker() {
    return (
        <div className="bg-slate-900 overflow-hidden relative">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none" />

            <div className="py-8">
                <p className="text-center text-xs font-medium text-slate-500 uppercase tracking-[0.2em] mb-6">
                    Tools and technologies used in our curriculum
                </p>

                <div className="bg-slate-800/30 backdrop-blur-sm border-y border-slate-700/30 py-5">
                    <div className="flex gap-6 animate-ticker w-max">
                        {ITEMS.map((tool, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-2 flex-shrink-0 cursor-default"
                            >
                                <span className="text-lg">{tool.emoji}</span>
                                <span className="text-slate-400 hover:text-slate-200 transition-colors text-sm font-medium whitespace-nowrap">
                                    {tool.name}
                                </span>
                                <span className="text-slate-600 ml-4">·</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
