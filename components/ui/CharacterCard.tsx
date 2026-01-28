import { MessageSquare } from "lucide-react";

export interface Character {
    name: string;
    tagline: string;
    author: string;
    chats: string;
    image?: string;
    isNew?: boolean;
}

interface CharacterCardProps {
    character: Character;
}

export default function CharacterCard({ character }: CharacterCardProps) {
    return (
        <div className="group cursor-pointer bg-[var(--card-bg)] hover:bg-[var(--card-hover)] border border-[var(--border-color)] rounded-2xl p-3 transition-all duration-300">
            <div className="aspect-square rounded-xl bg-zinc-200 dark:bg-zinc-800 mb-3 overflow-hidden relative shadow-inner">
                <div className="absolute inset-0 flex items-center justify-center opacity-10 text-3xl font-bold italic">ai</div>
                {character.isNew && (
                    <div className="absolute top-2 left-2 bg-black/70 backdrop-blur px-1.5 py-0.5 rounded text-[8px] uppercase font-bold text-white">new</div>
                )}
            </div>
            <h3 className="font-bold text-sm text-[var(--foreground)] group-hover:text-sky-500 transition-colors line-clamp-1">{character.name}</h3>
            <p className="text-[10px] text-[var(--text-muted)] mt-1 line-clamp-2 leading-relaxed min-h-[2.5rem]">{character.tagline}</p>

            <div className="mt-3 flex items-center justify-between text-[9px] text-[var(--text-muted)] font-bold uppercase tracking-wider">
                <span className="opacity-70">@{character.author.split('@')[1] || character.author}</span>
                <div className="flex items-center gap-1">
                    <MessageSquare size={10} />
                    <span>{character.chats}</span>
                </div>
            </div>
        </div>
    );
}
