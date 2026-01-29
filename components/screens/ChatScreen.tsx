"use client";

import { useParams } from "next/navigation";
import ChatInterface from "@/components/chat/ChatInterface";
import CharacterProfile from "@/components/chat/CharacterProfile";

export default function ChatScreen() {
    const params = useParams();
    const id = params?.id;

    if (!id) return null;

    // Mock data
    const charName = id.toString().split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    const charAvatar = `https://api.dicebear.com/7.x/open-peeps/svg?seed=${charName}`;

    return (
        <div className="fixed inset-0 flex bg-[var(--background)] overflow-hidden z-50">
            <ChatInterface charName={charName} charAvatar={charAvatar} />
            <CharacterProfile charName={charName} charAvatar={charAvatar} />
        </div>
    );
}
