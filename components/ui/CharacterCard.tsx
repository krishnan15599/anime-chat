import { MessageSquare, Heart, Eye } from "lucide-react";

export interface Character {
    name: string;
    tagline: string;
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

    return (
        <div className="group relative aspect-[3/4] cursor-pointer overflow-hidden rounded-xl bg-[var(--card-bg)] transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-black/20 dark:hover:shadow-black/50 border border-[var(--border-color)]">
            {/* Background Image */}
            <div className="absolute inset-0 z-0 text-[var(--foreground)] opacity-10 flex items-center justify-center font-bold italic text-4xl">
                ai
                <img
                    src={character.image || defaultImage}
                    alt={character.name}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 dark:opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent opacity-40" />
            </div>

            {/* Badges */}
            {character.isNew && (
                <div className="absolute right-0 top-0 z-20 overflow-hidden rounded-bl-xl bg-yellow-500 px-3 py-1 text-[10px] font-black uppercase tracking-tighter text-black shadow-lg">
                    New
                </div>
            )}

            {/* Content */}
            <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col p-4">
                <h3 className="text-sm font-black text-white group-hover:text-yellow-400 dark:group-hover:text-yellow-400 transition-colors line-clamp-1 mb-1">
                    {character.name}
                </h3>
                <p className="text-[10px] text-zinc-100 dark:text-zinc-300 line-clamp-2 leading-relaxed mb-3 opacity-90">
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
