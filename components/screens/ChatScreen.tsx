"use client";

import { useParams } from "next/navigation";
import ChatInterface from "@/components/chat/ChatInterface";
import CharacterProfile from "@/components/chat/CharacterProfile";
import { getCharacterBySlug } from "@/data/characters";

export default function ChatScreen() {
    const params = useParams();
    const id = params?.id as string;

    const character = id ? getCharacterBySlug(id) : undefined;

    if (!id || !character) return (
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
