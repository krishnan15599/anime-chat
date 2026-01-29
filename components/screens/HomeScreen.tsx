"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Featured from "@/components/categories/Featured";
import Discover from "@/components/categories/Discover";
import Helpers from "@/components/categories/Helpers";
import Footer from "@/components/layout/Footer";

const CATEGORIES = [
    "Anime", "Companionship", "OC", "Games", "Game Characters", "BL & ABO", "VTuber"
];

export default function HomeScreen() {
    const [activeCategory, setActiveCategory] = useState("Anime");

    const renderCategory = () => {
        switch (activeCategory) {
            case "Featured":
            case "Anime":
                return <Featured />;
            case "Discover":
                return <Discover />;
            case "Helpers":
                return <Helpers />;
            default:
                return (
                    <div className="flex flex-col items-center justify-center py-20 text-[var(--text-muted)]">
                        <h3 className="text-xl font-bold mb-2">{activeCategory}</h3>
                        <p>Coming soon...</p>
                    </div>
                );
        }
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
            <div className="transition-all duration-500">
                {renderCategory()}
            </div>

            <div className="mt-6">
                <Footer />
            </div>
        </div>
    );
}
