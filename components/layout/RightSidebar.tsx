"use client";

import { useState } from "react";
import { PanelRightClose, PanelRightOpen } from "lucide-react";
import RecentChats from "@/components/ui/RecentChats";
import TrendingList from "@/components/ui/TrendingList";

export default function RightSidebar() {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed right-4 top-20 z-50 hidden lg:flex items-center justify-center w-10 h-10 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-full shadow-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                title={isOpen ? "Collapse Sidebar" : "Expand Sidebar"}
            >
                {isOpen ? <PanelRightClose size={18} /> : <PanelRightOpen size={18} />}
            </button>

            <aside
                className={`h-full hidden lg:flex flex-col bg-[var(--card-bg)] border-l border-[var(--border-color)] transition-all duration-300 ease-in-out ${isOpen ? "w-80 p-6 opacity-100" : "w-0 p-0 opacity-0 overflow-hidden border-l-0"
                    }`}
            >
                <div className="flex flex-col gap-8 min-w-[270px]">
                    <RecentChats />
                    <TrendingList />
                </div>
            </aside>
        </>
    );
}
