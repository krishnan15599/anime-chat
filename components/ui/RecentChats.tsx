"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllActiveSlugs, getLastMessage, ChatMessage } from "@/lib/db";
import { getCharacterBySlug } from "@/lib/services/characterService";
import { Character } from "@/components/ui/CharacterCard";

interface RecentChatData {
    character: Character;
    lastMessage: ChatMessage;
    slug: string;
}

export default function RecentChats() {
    const [recentChats, setRecentChats] = useState<RecentChatData[]>([]);

    useEffect(() => {
        const loadRecent = async () => {
            const slugs = await getAllActiveSlugs();
            const data = await Promise.all(
                slugs.map(async (slug) => {
                    const character = await getCharacterBySlug(slug);
                    const lastMsg = await getLastMessage(slug);
                    if (character && lastMsg) {
                        return { character, lastMessage: lastMsg, slug };
                    }
                    return null;
                })
            );
            setRecentChats(data.filter((d): d is RecentChatData => !!d).slice(0, 5));
        };
        loadRecent();
    }, []);

    if (recentChats.length === 0) return null;

    return (
        <div className="bg-black/5 dark:bg-zinc-900/50 rounded-2xl p-4 border border-[var(--border-color)]">
            <h3 className="text-[var(--foreground)] font-bold mb-4 text-sm flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Recent Chats
            </h3>
            <div className="space-y-4">
                {recentChats.map((chat) => (
                    <Link
                        href={`/chat/${chat.slug}`}
                        key={chat.slug}
                        className="flex items-center gap-3 group cursor-pointer hover:bg-white/5 p-1 rounded-lg transition-colors"
                    >
                        <div className="w-10 h-10 rounded-full bg-[var(--card-bg)] overflow-hidden border border-[var(--border-color)] group-hover:border-yellow-500/50 transition-colors">
                            <img src={chat.character.image || `https://api.dicebear.com/7.x/open-peeps/svg?seed=${chat.character.name}`} alt={chat.character.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="text-[var(--foreground)] text-xs font-bold truncate group-hover:text-yellow-500 transition-colors">{chat.character.name}</h4>
                            <p className="text-[var(--text-muted)] text-[10px] truncate italic">"{chat.lastMessage.text}"</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
