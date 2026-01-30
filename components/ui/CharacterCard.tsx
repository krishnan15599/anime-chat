import { MessageSquare, Heart, Eye } from "lucide-react";
import Link from "next/link";

export interface Character {
    name: string;
    tagline: string;
    description?: string;
    author: string;
    chats?: string;
    likes?: string;
    views?: string;
    image?: string;
    isNew?: boolean;
}

interface CharacterCardProps {
    character: Character;
}

export default function CharacterCard({ character }: CharacterCardProps) {
    const defaultImage = `https://api.dicebear.com/7.x/open-peeps/svg?seed=${character.name}`;
    const charId = character.name.toLowerCase().replace(/\s+/g, '-');

    return (
        <div className="group relative aspect-[3/4] cursor-pointer overflow-hidden rounded-xl bg-[var(--card-bg)] hover:scale-[1.02] hover:shadow-2xl hover:shadow-black/20 dark:hover:shadow-black/50 border border-[var(--border-color)] transition-all duration-300 ease-out">
            {/* Background Image */}
            <div className="absolute inset-0 z-0 text-[var(--foreground)] flex items-center justify-center font-bold italic text-4xl">
                ai
                <img
                    src={character.image || defaultImage}
                    alt={character.name}
                    className="absolute inset-0 h-full w-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                />
                {/* Gradient Overlays - Themed */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent dark:from-black dark:via-black/40 dark:to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-transparent" />
            </div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 z-20 flex flex-col p-4 bg-black/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-start gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/20 shrink-0">
                        <img src={character.image || defaultImage} alt={character.name} className="w-full h-full object-cover" />
                    </div>
                </div>

                <div className="flex-1 min-h-0 mb-4 overflow-hidden">
                    <p className="text-white text-xs leading-relaxed line-clamp-[7]">
                        {(character.description || character.tagline).split(" ").map((word, i) => (
                            <span
                                key={i}
                                className="inline-block opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-150 ease-out"
                                style={{ transitionDelay: `${i * 70}ms` }}
                            >
                                {word}&nbsp;
                            </span>
                        ))}
                    </p>
                </div>

                <Link
                    href={`/chat/${charId}`}
                    className="w-full py-2.5 px-4 bg-white text-black rounded-full text-xs font-bold flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors shrink-0"
                >
                    <MessageSquare size={16} className="fill-current" />
                    Chat Now
                </Link>
            </div>

            {/* Badges */}
            {character.isNew && (
                <div className="absolute right-0 top-0 z-30 overflow-hidden rounded-bl-xl bg-yellow-500 px-3 py-1 text-[10px] font-black uppercase tracking-tighter text-black shadow-lg">
                    New
                </div>
            )}

            {/* Content (Visible when not hovered) */}
            <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col p-4 group-hover:opacity-0 transition-opacity duration-300">
                <h3 className="text-sm font-black text-white group-hover:text-yellow-400 transition-colors line-clamp-1 mb-1">
                    {character.name}
                </h3>
                <p className="text-[10px] text-zinc-100 line-clamp-2 leading-relaxed mb-3 opacity-90">
                    {character.tagline}
                </p>

                {/* Footer Stats */}
                <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 text-white">
                            <Eye size={12} className="opacity-70" />
                            <span className="text-[10px] font-bold">{character.views || character.chats}</span>
                        </div>
                        <div className="flex items-center gap-1 text-white">
                            <Heart size={10} className="opacity-70 fill-current" />
                            <span className="text-[10px] font-bold">{character.likes || "47"}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
