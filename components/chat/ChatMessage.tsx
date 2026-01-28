"use client";

interface ChatMessageProps {
    avatar: string;
    name: string;
    message: string;
    isAi?: boolean;
    time?: string;
}

export default function ChatMessage({ avatar, name, message, isAi, time }: ChatMessageProps) {
    return (
        <div className={`flex items-start gap-4 max-w-2xl mx-auto ${!isAi ? "flex-row-reverse" : ""}`}>
            <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-[var(--border-color)]">
                <img src={avatar} alt={name} className="w-full h-full object-cover" />
            </div>
            <div className={`flex flex-col gap-2 ${!isAi ? "items-end" : ""}`}>
                {isAi && time && (
                    <div className="flex items-center gap-2">
                        <button className="bg-black/5 dark:bg-zinc-800/80 px-3 py-1 rounded text-[10px] flex items-center gap-1 font-bold text-[var(--foreground)]">
                            <span className="w-2 h-2 bg-[var(--foreground)] rounded-full flex items-center justify-center">
                                <span className="w-1 h-1 bg-[var(--background)] rounded-full" />
                            </span>
                            {time}
                        </button>
                    </div>
                )}
                <div className={`bg-[var(--card-bg)] border border-[var(--border-color)] p-4 rounded-2xl text-sm leading-relaxed text-[var(--foreground)] ${isAi ? "rounded-tl-none shadow-sm" : "rounded-tr-none bg-sky-600/10 dark:bg-sky-600/20 border-sky-500/30 dark:border-sky-500/20"
                    }`}>
                    {message}
                </div>
            </div>
        </div>
    );
}
