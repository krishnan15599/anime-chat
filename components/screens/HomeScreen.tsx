"use client";

import { useState, useEffect } from "react";
import { ChevronDown, MessageSquare } from "lucide-react";
import Footer from "@/components/layout/Footer";
import { ALL_CHARACTERS, CATEGORIES, getCharacterBySlug } from "@/data/characters";
import CategoryGrid from "@/components/categories/CategoryGrid";
import { getAllActiveSlugs } from "@/lib/db";
import CharacterCard, { Character } from "@/components/ui/CharacterCard";

export default function HomeScreen() {
    const GENERIC_CATEGORIES = [
        "Maid", "School", "Fantasy", "Action", "Romance", "Comedy", "Warrior", "Assassin"
    ];
    // Filter out generic categories to get the anime series list
    const animeCategories = CATEGORIES.filter(cat => !GENERIC_CATEGORIES.includes(cat));

    const [activeCategory, setActiveCategory] = useState(GENERIC_CATEGORIES[0]);
    const [recentCharacters, setRecentCharacters] = useState<Character[]>([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        const loadRecent = async () => {
            const slugs = await getAllActiveSlugs();
            const characters = slugs
                .map(slug => getCharacterBySlug(slug))
                .filter((c): c is Character => !!c);
            setRecentCharacters(characters);
        };
        loadRecent();
    }, []);

    const renderCategory = () => {
        const data = ALL_CHARACTERS[activeCategory] || [];
        return <CategoryGrid key={activeCategory} category={activeCategory} initialCharacters={data} />;
    };

    const isAnimeCategory = animeCategories.includes(activeCategory);

    return (
        <div className="p-4 lg:p-8 max-w-[1600px] mx-auto space-y-12">
            {/* Recent Chats Section */}
            {recentCharacters.length > 0 && (
                <div className="animate-in fade-in slide-in-from-top-4 duration-700">
                    <div className="flex items-center gap-2 mb-6">
                        <MessageSquare size={18} className="text-yellow-500" />
                        <h2 className="text-xl font-black uppercase tracking-tighter">Recently Chatting</h2>
                        <div className="h-px flex-1 bg-white/5 ml-4" />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                        {recentCharacters.map((char) => (
                            <CharacterCard key={char.name} character={char} />
                        ))}
                    </div>
                </div>
            )}

            <div className="space-y-8">
                {/* Category Tabs & Filter */}
                <div className="flex flex-col gap-6">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth">
                            {GENERIC_CATEGORIES.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => {
                                        setActiveCategory(cat);
                                        setIsDropdownOpen(false);
                                    }}
                                    className={`px-5 py-2.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all duration-200 ${activeCategory === cat
                                        ? "bg-zinc-800 dark:bg-zinc-700 text-white shadow-lg"
                                        : "bg-black/5 dark:bg-white/5 text-[var(--text-muted)] hover:text-[var(--foreground)] hover:bg-black/10 dark:hover:bg-white/10"
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {/* Popular / Anime Series Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold border transition-all ${isDropdownOpen || isAnimeCategory
                                    ? "bg-zinc-800 dark:bg-zinc-700 text-white border-zinc-700"
                                    : "bg-black/5 dark:bg-white/5 text-[var(--text-muted)] border-[var(--border-color)] hover:bg-black/10 dark:hover:bg-white/10"
                                    }`}
                            >
                                {isAnimeCategory ? activeCategory : "Popular"} <ChevronDown size={14} className={`transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
                            </button>

                            {isDropdownOpen && (
                                <div className="absolute right-0 top-full mt-2 w-64 max-h-[400px] overflow-y-auto bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-200">
                                    <div className="p-2 space-y-1">
                                        <div className="px-3 py-2 text-[10px] font-black uppercase tracking-wider text-[var(--text-muted)]">
                                            Anime Series
                                        </div>
                                        {animeCategories.map((anime) => (
                                            <button
                                                key={anime}
                                                onClick={() => {
                                                    setActiveCategory(anime);
                                                    setIsDropdownOpen(false);
                                                }}
                                                className={`w-full text-left px-3 py-2 text-xs font-bold rounded-lg transition-colors ${activeCategory === anime
                                                    ? "bg-yellow-500/10 text-yellow-500"
                                                    : "text-[var(--foreground)] hover:bg-black/5 dark:hover:bg-white/5"
                                                    }`}
                                            >
                                                {anime}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Dynamic Category Content */}
                <div className="min-h-[500px] transition-all duration-500">
                    {renderCategory()}
                </div>
            </div>

            <Footer />
        </div>
    );
}
