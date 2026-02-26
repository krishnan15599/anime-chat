"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Search, BookOpen, HelpCircle, ChevronDown, X, MessageSquare, Flame } from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { searchCharactersFromDB } from "@/data/characters";
import { Character } from "@/components/ui/CharacterCard";
import { useRouter } from "next/navigation";

export default function Header() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Character[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            return;
        }

        const fetchResults = async () => {
            const searchResults = await searchCharactersFromDB(query);
            setResults(searchResults);
        };

        // Debounce slightly for better performance
        const timeout = setTimeout(fetchResults, 300);
        return () => clearTimeout(timeout);
    }, [query]);

    // Handle clicking outside to close
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (char: Character) => {
        const slug = char.name.toLowerCase().replace(/\s+/g, '-');
        router.push(`/chat/${slug}`);
        setIsOpen(false);
        setQuery("");
    };

    return (
        <header className="fixed top-0 right-0 z-50 h-16 w-full flex items-center justify-between px-6 bg-[var(--header-bg)]/80 backdrop-blur-xl border-b border-[var(--border-color)] sm:pl-24 transition-none">
            <div className="flex-1 max-w-xl relative" ref={dropdownRef}>
                <div className="relative group">
                    <Search className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${isOpen ? 'text-yellow-500' : 'text-[var(--text-muted)] group-focus-within:text-yellow-500'}`} size={18} />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            setIsOpen(true);
                        }}
                        onFocus={() => setIsOpen(true)}
                        placeholder="Search for anime characters..."
                        className="w-full h-10 pl-10 pr-10 rounded-xl bg-black/5 dark:bg-zinc-900 border border-transparent focus:border-yellow-500/30 focus:bg-white dark:focus:bg-zinc-800/80 outline-none text-sm text-[var(--foreground)] placeholder:text-[var(--text-muted)] transition-all"
                    />
                    {query && (
                        <button
                            onClick={() => setQuery("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--foreground)]"
                        >
                            <X size={16} />
                        </button>
                    )}
                </div>

                {/* Search Results Dropdown */}
                {isOpen && (query || results.length > 0) && (
                    <div className="absolute top-full left-0 right-0 mt-2 p-2 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl shadow-2xl backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-200 overflow-hidden max-h-[70vh] overflow-y-auto no-scrollbar">
                        {results.length > 0 ? (
                            <div className="space-y-1">
                                <div className="px-3 py-2 text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] flex items-center gap-2">
                                    <Flame size={12} className="text-orange-500" />
                                    Characters Found
                                </div>
                                {results.map((char) => (
                                    <button
                                        key={char.name}
                                        onClick={() => handleSelect(char)}
                                        className="w-full h-14 flex items-center gap-4 px-3 hover:bg-white/5 dark:hover:bg-white/5 rounded-xl transition-all group group-hover:pl-4"
                                    >
                                        <div className="w-10 h-10 rounded-full overflow-hidden border border-white/5 bg-zinc-800 shrink-0">
                                            <img src={char.image} alt={char.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 text-left min-w-0">
                                            <h4 className="text-sm font-bold truncate group-hover:text-yellow-400 transition-colors">{char.name}</h4>
                                            <p className="text-[10px] text-[var(--text-muted)] truncate">{char.tagline}</p>
                                        </div>
                                        <MessageSquare size={14} className="text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                                    </button>
                                ))}
                            </div>
                        ) : query && (
                            <div className="p-8 text-center">
                                <Search size={24} className="mx-auto text-[var(--text-muted)] mb-3 opacity-20" />
                                <p className="text-xs text-[var(--text-muted)]">No characters found for "{query}"</p>
                            </div>
                        )}

                        {!query && (
                            <div className="p-8 text-center">
                                <Search size={24} className="mx-auto text-[var(--text-muted)] mb-3 opacity-20" />
                                <p className="text-xs text-[var(--text-muted)]">Type anything to find your favorite character</p>
                            </div>
                        )}
                    </div>
                )}
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
                    <SignedOut>
                        <Link href="/login" className="px-4 py-2 text-sm font-semibold text-[var(--foreground)] hover:bg-black/5 dark:hover:bg-white/5 rounded-full whitespace-nowrap transition-colors">
                            Log In
                        </Link>
                        <Link href="/signup" className="px-5 py-2 text-sm font-bold bg-yellow-500 hover:bg-yellow-400 text-black rounded-full whitespace-nowrap transition-all shadow-lg active:scale-95">
                            Sign Up
                        </Link>
                    </SignedOut>
                    <SignedIn>
                        <UserButton
                            afterSignOutUrl="/login"
                            appearance={{
                                elements: {
                                    avatarBox: "w-9 h-9 border border-white/10"
                                }
                            }}
                        />
                    </SignedIn>
                </div>
            </div>
        </header>
    );
}
