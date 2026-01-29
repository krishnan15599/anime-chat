"use client";

import { Search, BookOpen, HelpCircle, ChevronDown } from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function Header() {
    return (
        <header className="fixed top-0 right-0 z-30 h-16 w-full flex items-center justify-between px-6 bg-[var(--header-bg)] backdrop-blur-md border-b border-[var(--border-color)] sm:pl-24 transition-none">
            <div className="flex-1 max-w-xl">
                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] group-focus-within:text-sky-500" size={18} />
                    <input
                        type="text"
                        placeholder="Search characters..."
                        className="w-full h-10 pl-10 pr-4 rounded-full bg-zinc-200/50 dark:bg-zinc-900 border border-transparent focus:border-sky-500/50 focus:bg-white dark:focus:bg-zinc-800 outline-none text-sm text-[var(--foreground)] placeholder:text-[var(--text-muted)]"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4 ml-4">
                <ThemeToggle />

                <div className="hidden md:flex items-center gap-4 text-[var(--text-muted)] mr-4 border-r border-[var(--border-color)] pr-4">
                    <button className="hover:text-[var(--foreground)]"><BookOpen size={20} /></button>
                    <button className="hover:text-[var(--foreground)]"><HelpCircle size={20} /></button>
                    <button className="flex items-center gap-1 hover:text-[var(--foreground)] font-medium text-[10px] uppercase">
                        en <ChevronDown size={14} />
                    </button>
                </div>

                <div className="flex items-center gap-2">
                    <button className="px-4 py-2 text-sm font-semibold text-[var(--foreground)] hover:bg-black/5 dark:hover:bg-white/5 rounded-full whitespace-nowrap">
                        Log In
                    </button>
                    <button className="px-5 py-2 text-sm font-bold bg-sky-600 hover:bg-sky-500 text-white rounded-full whitespace-nowrap">
                        Sign Up
                    </button>
                </div>
            </div>
        </header>
    );
}
