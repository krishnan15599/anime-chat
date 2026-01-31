"use client";

import { Heart, Share2, MoreHorizontal, MessageSquare, UserPlus, Settings, ChevronDown, Reply, MessageCircle } from "lucide-react";

interface CharacterProfileProps {
    charName: string;
    charAvatar: string;
}

export default function CharacterProfile({ charName, charAvatar }: CharacterProfileProps) {
    return (
        <aside className="w-[450px] hidden xl:flex flex-col border-l border-[var(--border-color)] bg-[var(--sidebar-bg)] h-full overflow-hidden text-[var(--foreground)]">
            {/* Nathan Style Header */}
            <div className="flex items-center justify-between px-6 py-4 shrink-0 border-b border-[var(--border-color)]">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden border border-[var(--border-color)]">
                        <img src={charAvatar} alt={charName} className="w-full h-full object-cover" />
                    </div>
                    <span className="font-black text-sm">{charName}</span>
                    <ChevronDown size={16} className="text-[var(--text-muted)]" />
                </div>
                <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-[var(--hover-bg)] rounded-full text-[var(--text-muted)] hover:text-[var(--foreground)]">
                        <MoreHorizontal size={20} />
                    </button>
                </div>
            </div>

            {/* Profile Content Wrapper - Scrollable */}
            <div className="flex-1 overflow-y-auto scrollbar-hide">
                {/* Character Image & Info */}
                <div className="relative aspect-[3/4] overflow-hidden">
                    <img src={charAvatar} alt={charName} className="w-full h-full object-cover" />

                    {/* Floating Info Overlay */}
                    <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 via-black/20 to-transparent text-white">
                        <div className="flex justify-center mb-4">
                            <ChevronDown size={24} className="opacity-50" />
                        </div>
                        <h2 className="text-3xl font-black mb-2">{charName}</h2>
                        <div className="flex items-center gap-4 text-[10px] font-bold opacity-80 uppercase tracking-widest">
                            <span className="flex items-center gap-1.5"><Share2 size={12} className="rotate-90" /> 46.7K</span>
                            <span className="flex items-center gap-1.5"><UserPlus size={12} /> 1.1K</span>
                            <span className="flex items-center gap-1.5">By @raxcl2002 👋</span>
                        </div>
                        <div className="mt-4 flex gap-2">
                            <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-bold">ValentinesDay2025</span>
                        </div>
                    </div>
                </div>

                {/* Tab Bar (Nathan Style) */}
                <div className="flex items-center border-b border-[var(--border-color)] px-4">
                    <button className="flex-1 flex justify-center py-4 border-b-2 border-[var(--foreground)]">
                        <MessageSquare size={20} className="text-[var(--foreground)]" />
                    </button>
                    <button className="flex-1 flex justify-center py-4 text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors">
                        <UserPlus size={20} />
                    </button>
                    <button className="flex-1 flex justify-center py-4 text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors">
                        <Settings size={20} />
                    </button>
                </div>

                {/* Comments Section */}
                <div className="p-6 space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-black">Comments <span className="text-[var(--text-muted)] ml-1">245</span></h3>
                    </div>

                    {/* New Comment Input */}
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[var(--card-bg)] border border-[var(--border-color)] shrink-0 flex items-center justify-center">
                            <UserPlus size={20} className="w-5 h-5 opacity-30" />
                        </div>
                        <div className="flex-1">
                            <input
                                type="text"
                                placeholder="Type your comment about this character..."
                                className="w-full bg-black/5 dark:bg-zinc-800/40 border border-[var(--border-color)] rounded-full py-3 px-5 text-xs outline-none focus:border-[var(--foreground)]/30 transition-colors"
                            />
                        </div>
                    </div>

                    {/* Comment Items */}
                    <div className="space-y-8 pt-4">
                        <div className="space-y-4">
                            <div className="flex gap-3">
                                <div className="w-10 h-10 rounded-full bg-zinc-800 border border-[var(--border-color)] shrink-0" />
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-xs font-black">User-ydLOPWTA</span>
                                        <span className="text-[10px] text-[var(--text-muted)]">25/01/2026</span>
                                    </div>
                                    <p className="text-xs text-[var(--foreground)] leading-relaxed">so kind</p>
                                    <div className="flex items-center gap-6 mt-3 text-[10px] font-black text-[var(--text-muted)]">
                                        <button className="flex items-center gap-1.5 hover:text-[var(--foreground)]"><Reply size={12} /> Reply</button>
                                        <button className="flex items-center gap-1.5 hover:text-[var(--foreground)]"><Share2 size={12} /> Share</button>
                                        <button className="flex items-center gap-1.5 hover:text-[var(--foreground)]"><Heart size={12} /></button>
                                    </div>
                                </div>
                            </div>

                            {/* Reply Preview */}
                            <div className="ml-13 pl-3">
                                <button className="text-[10px] font-black text-sky-500 flex items-center gap-2">
                                    View 4 Replies <ChevronDown size={14} className="-rotate-90" />
                                </button>
                            </div>
                        </div>

                        {/* Another Comment with Image/GIF */}
                        <div className="flex gap-3">
                            <div className="w-10 h-10 rounded-full overflow-hidden border border-[var(--border-color)] shrink-0">
                                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Lincoln" alt="user" />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-xs font-black">Lincoln Loud (LL)</span>
                                    <span className="text-[10px] text-[var(--text-muted)]">26/01/2026</span>
                                </div>
                                <div className="mt-2 w-32 aspect-square rounded-xl overflow-hidden relative">
                                    <div className="absolute inset-0 bg-pink-500/20" />
                                    <img src="https://api.dicebear.com/7.x/shapes/svg?seed=pink" className="w-full h-full object-cover" alt="gif" />
                                    <span className="absolute bottom-2 left-2 bg-black/40 px-1 py-0.5 rounded text-[8px] font-black text-white">GIF</span>
                                </div>
                                <div className="flex items-center gap-6 mt-3 text-[10px] font-black text-[var(--text-muted)]">
                                    <button className="flex items-center gap-1.5 hover:text-[var(--foreground)]"><Reply size={12} /> Reply</button>
                                    <button className="flex items-center gap-1.5 hover:text-[var(--foreground)]"><Share2 size={12} /> Share</button>
                                    <button className="flex items-center gap-1.5 hover:text-[var(--foreground)]"><Heart size={12} /> 2</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}
