"use client";

import { useState } from "react";
import { Share2, Heart, ChevronUp, X } from "lucide-react";
import Link from "next/link";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { Character } from "@/components/ui/CharacterCard";

interface Message {
    text: string;
    isAi: boolean;
    timestamp: string;
}

interface ChatInterfaceProps {
    character: Character;
}

export default function ChatInterface({ character }: ChatInterfaceProps) {
    const { name: charName, image: charAvatar, description, views, likes, author } = character;
    const [messages, setMessages] = useState<Message[]>([
        {
            text: `Hello there! I am ${charName}. How can I help you today?`,
            isAi: true,
            timestamp: 'Just now'
        }
    ]);

    const handleSendMessage = (msg: string) => {
        if (!msg.trim()) return;

        // Add user message
        setMessages(prev => [...prev, {
            text: msg,
            isAi: false,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
    };

    return (
        <div className="flex-1 flex flex-col relative min-w-0 border-r border-white/5 h-full overflow-hidden">
            {/* Close Button */}
            <Link
                href="/"
                className="absolute top-6 right-6 z-50 p-2 bg-zinc-900/50 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-full border border-white/10 backdrop-blur-md transition-all shadow-xl"
                aria-label="Close chat"
            >
                <X size={20} />
            </Link>

            {/* Chat Content (Scrollable Area) */}
            <div className="flex-1 overflow-y-auto px-6 pt-10 pb-32 scrollbar-hide">
                {/* Chat Header Info */}
                <div className="flex flex-col items-center mb-12">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white/10 mb-4 shadow-2xl">
                        <img src={charAvatar} alt={charName} className="w-full h-full object-cover" />
                    </div>
                    <h1 className="text-3xl font-black mb-2">{charName}</h1>
                    <div className="flex items-center gap-4 text-xs text-zinc-400 mb-6">
                        <div className="flex items-center gap-1">
                            <Share2 size={14} className="rotate-90" />
                            <span>{views || "0"}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Heart size={14} />
                            <span>{likes || "0"}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span>By {author || "@unknown"}</span>
                        </div>
                    </div>
                    <button className="px-10 py-2.5 bg-white text-black font-black rounded-full text-sm hover:bg-zinc-200 transition-colors uppercase tracking-wider">
                        Follow
                    </button>
                </div>

                {/* Intro Section */}
                <div className="max-w-2xl mx-auto mb-12">
                    <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
                        <p className="text-sm leading-relaxed text-zinc-300">
                            <span className="font-black text-white mr-2">Intro</span>
                            {description}
                            <ChevronUp size={16} className="inline ml-1 opacity-50 text-white" />
                        </p>
                    </div>
                </div>

                {/* History */}
                <div className="space-y-8">
                    {messages.map((msg, index) => (
                        <ChatMessage
                            key={index}
                            avatar={msg.isAi ? (charAvatar || "") : "https://api.dicebear.com/7.x/avataaars/svg?seed=User"}
                            name={msg.isAi ? charName : "You"}
                            isAi={msg.isAi}
                            time={msg.isAi ? msg.timestamp : undefined}
                            message={msg.text}
                        />
                    ))}
                </div>
            </div>

            {/* Message Input Container */}
            <ChatInput charName={charName} onSendMessage={handleSendMessage} />
        </div>
    );
}
