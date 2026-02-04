"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Footer from "@/components/layout/Footer";
import { ALL_CHARACTERS } from "@/data/characters";
import CategoryGrid from "@/components/categories/CategoryGrid";

const CATEGORIES = [
    "Maid", "Warrior", "Assassin", "School", "Fantasy"
];

export default function HomeScreen() {
    const [activeCategory, setActiveCategory] = useState("Maid");

    const renderCategory = () => {
        // Fallback empty array if category not found in data
        const data = ALL_CHARACTERS[activeCategory] || [];
        return <CategoryGrid key={activeCategory} category={activeCategory} initialCharacters={data} />;
    };

    return (
        <div className="p-4 lg:p-8 max-w-[1600px] mx-auto">
            {/* Category Tabs & Filter */}
            <div className="flex flex-col gap-6 mb-8">
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

            <div className="mt-6">
                <Footer />
            </div>
        </div>
    );
}
