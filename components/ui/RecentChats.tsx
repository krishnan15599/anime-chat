import Image from "next/image";

interface Chat {
    id: string;
    name: string;
    lastMessage: string;
    avatar?: string;
}

const RECENT_CHATS: Chat[] = [
    {
        id: "1",
        name: "Jotaro Kujo",
        lastMessage: "Pfft, of course I remember th...",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jotaro"
    }
];

export default function RecentChats() {
    return (
        <div className="bg-black/5 dark:bg-zinc-900/50 rounded-2xl p-4 border border-[var(--border-color)]">
            <h3 className="text-[var(--foreground)] font-bold mb-4 text-sm">Recent Chats</h3>
            <div className="space-y-4">
                {RECENT_CHATS.map((chat) => (
                    <div key={chat.id} className="flex items-center gap-3 group cursor-pointer">
                        <div className="w-10 h-10 rounded-full bg-[var(--card-bg)] overflow-hidden border border-[var(--border-color)]">
                            <img src={chat.avatar} alt={chat.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="text-[var(--foreground)] text-xs font-bold truncate">{chat.name}</h4>
                            <p className="text-[var(--text-muted)] text-[10px] truncate">{chat.lastMessage}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
