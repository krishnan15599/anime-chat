import CharacterGrid from "@/components/ui/CharacterGrid";
import { Character } from "@/components/ui/CharacterCard";

const FEATURED_CHARACTERS: Character[] = [
    {
        name: "Character Assistant",
        tagline: "Your AI work/study buddy",
        author: "@landon",
        chats: "4.1 m",
        isNew: true
    },
    {
        name: "Lily",
        tagline: "Your friendly AI assistant",
        author: "@landon",
        chats: "498.8 k",
        isNew: true
    },
    {
        name: "Lyle",
        tagline: "Your no-nonsense AI assistant",
        author: "@landon",
        chats: "255.3 k",
        isNew: true
    },
    {
        name: "Stella",
        tagline: "Not 'Your' AI assistant",
        author: "@landon",
        chats: "903.0 k",
        isNew: true
    },
    {
        name: "Pair Programmer",
        tagline: "Your programming AI assistant",
        author: "@landon",
        chats: "289.7 k",
        isNew: true
    },
    {
        name: "Raiden Shogun and...",
        tagline: "From Genshin Impact",
        author: "@Zap",
        chats: "40.9 m",
    },
    {
        name: "SM64 Mario",
        tagline: "The Italian plumber from Super Mario 64.",
        author: "@Revolution64",
        chats: "21.1 m",
    }
];

export default function Featured() {
    return (
        <div className="space-y-12">
            <CharacterGrid title="Featured" characters={FEATURED_CHARACTERS} />

            {/* Specific Suggestions for Featured */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl p-5 hover:border-zinc-400 dark:hover:border-zinc-700 transition-all">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center italic font-bold">ai</div>
                        <div>
                            <h4 className="font-bold text-sm">Character Assistant</h4>
                            <p className="text-[10px] text-[var(--text-muted)] italic">Try saying:</p>
                        </div>
                    </div>
                    <div className="space-y-2">
                        {["What type of fish is Dory from Finding Nemo?", "Help me create an advertising campaign"].map((text) => (
                            <div key={text} className="p-3 bg-black/5 dark:bg-white/5 rounded-xl text-xs text-[var(--foreground)] hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer transition-colors border border-[var(--border-color)]">
                                "{text}"
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl p-5 hover:border-zinc-400 dark:hover:border-zinc-700 transition-all">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center italic font-bold text-sky-500">EM</div>
                        <div>
                            <h4 className="font-bold text-sm">Elon Musk</h4>
                            <p className="text-[10px] text-[var(--text-muted)] italic">Try saying:</p>
                        </div>
                    </div>
                    <div className="space-y-2">
                        {["If you could go back in time, when?", "Why did you buy Twitter?"].map((text) => (
                            <div key={text} className="p-3 bg-black/5 dark:bg-white/5 rounded-xl text-xs text-[var(--foreground)] hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer transition-colors border border-[var(--border-color)]">
                                "{text}"
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
