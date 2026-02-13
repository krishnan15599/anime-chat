"use client";

import { useState, useEffect } from "react";
import { ChevronDown, MessageSquare } from "lucide-react";
import Footer from "@/components/layout/Footer";
import { ALL_CHARACTERS, getCharacterBySlug } from "@/data/characters";
import CategoryGrid from "@/components/categories/CategoryGrid";
import { getAllActiveSlugs } from "@/lib/db";
import CharacterCard, { Character } from "@/components/ui/CharacterCard";

const CATEGORIES = [
    "Maid", "Warrior", "Assassin", "School", "Fantasy",
    "Naruto", "One Piece", "Attack on Titan", "Demon Slayer",
    "Dragon Ball", "Jujutsu Kaisen", "Bleach", "High School DxD"
];

export default function HomeScreen() {
    const [activeCategory, setActiveCategory] = useState("Maid");
    const [recentCharacters, setRecentCharacters] = useState<Character[]>([]);

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
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-5 py-2.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all duration-200 ${activeCategory === cat
                                        ? "bg-zinc-800 dark:bg-zinc-700 text-white shadow-lg"
                                        : "bg-black/5 dark:bg-white/5 text-[var(--text-muted)] hover:text-[var(--foreground)] hover:bg-black/10 dark:hover:bg-white/10"
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-black/5 dark:bg-white/5 text-[var(--text-muted)] text-xs font-bold hover:bg-black/10 dark:hover:bg-white/10 border border-[var(--border-color)]">
                            Popular <ChevronDown size={14} />
                        </button>
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
