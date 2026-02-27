"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ChatInterface from "@/components/chat/ChatInterface";
import CharacterProfile from "@/components/chat/CharacterProfile";
import { getCharacterBySlug } from "@/lib/services/characterService";
import { Character } from "@/components/ui/CharacterCard";

export default function ChatScreen() {
    const params = useParams();
    const id = params?.id as string;
    const [character, setCharacter] = useState<Character | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        const fetch = async () => {
            const char = await getCharacterBySlug(id);
            setCharacter(char);
            setLoading(false);
        };
        fetch();
    }, [id]);

    if (loading) return (
        <div className="flex items-center justify-center h-screen bg-[var(--background)]">
            <div className="w-12 h-12 border-4 border-yellow-500/20 border-t-yellow-500 rounded-full animate-spin" />
        </div>
    );

    if (!character) return (
        <div className="flex items-center justify-center h-screen bg-[var(--background)] text-[var(--text-muted)]">
            Character not found
        </div>
    );

    return (
        <div className="fixed inset-0 flex bg-[var(--background)] overflow-hidden z-50">
            <ChatInterface character={character} />
            <CharacterProfile character={character} />
        </div>
    );
}
