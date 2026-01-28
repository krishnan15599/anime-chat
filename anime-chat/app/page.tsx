"use client";

import { useState } from "react";
import Featured from "@/components/categories/Featured";
import Discover from "@/components/categories/Discover";
import Helpers from "@/components/categories/Helpers";

const CATEGORIES = [
  "Featured", "Discover", "Helpers", "Famous People", "Games", "Image Generating", "VTuber", "Game Characters", "Anime", "Movies & TV"
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("Featured");

  const renderCategory = () => {
    switch (activeCategory) {
      case "Featured":
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
    <div className="p-6 max-w-7xl mx-auto">
      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${activeCategory === cat
                ? "bg-zinc-800 dark:bg-zinc-200 text-zinc-100 dark:text-zinc-900 shadow-md"
                : "text-[var(--text-muted)] hover:text-[var(--foreground)] hover:bg-black/5 dark:hover:bg-white/5"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Dynamic Category Content */}
      <div className="mt-4 transition-all duration-300">
        {renderCategory()}
      </div>
    </div>
  );
}
