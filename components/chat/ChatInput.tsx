"use client";

import { useState } from "react";
import { Send, Image as ImageIcon, LayoutGrid } from "lucide-react";

interface ChatInputProps {
    charName: string;
    onSendMessage: (msg: string) => void;
}

export default function ChatInput({ charName, onSendMessage }: ChatInputProps) {
    const [message, setMessage] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim()) {
            onSendMessage(message);
            setMessage("");
        }
    };

    return (
        <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-[#111111] via-[#111111] to-transparent">
            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto flex items-center gap-4 bg-zinc-900/80 border border-white/10 rounded-2xl p-2 pl-4 backdrop-blur-md">
                <button type="button" className="p-2 text-zinc-400 hover:text-white transition-colors">
                    <LayoutGrid size={20} />
                </button>
                <div className="flex-1 relative">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 text-zinc-500">
                        <ImageIcon size={16} className="inline mr-2 opacity-30" />
                    </div>
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder={`Message ${charName}, reply from AI`}
                        className="w-full bg-transparent border-none outline-none text-sm py-3 px-6 placeholder:text-zinc-600 focus:ring-0"
                    />
                </div>
                <button type="button" className="p-2 text-zinc-400 hover:text-white transition-colors">
                    <ImageIcon size={20} />
                </button>
                <button type="submit" className="p-2 text-zinc-400 hover:text-white transition-colors">
                    <Send size={20} className="rotate-45" />
                </button>
            </form>
        </div>
    );
}
