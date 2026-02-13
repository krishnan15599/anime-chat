
"use client";

import { useState } from "react";
import CharacterCard, { Character } from "@/components/ui/CharacterCard";
import { Loader2, Plus, RefreshCw } from "lucide-react";

interface CategoryGridProps {
    category: string;
    initialCharacters: Character[];
}

import { generateAnimeCharacter } from "@/lib/generator";

export default function CategoryGrid({ category, initialCharacters }: CategoryGridProps) {
    const [characters, setCharacters] = useState<Character[]>(initialCharacters);
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerate = async () => {
        setIsGenerating(true);
        try {
            const newCharacter = await generateAnimeCharacter(category);
            setCharacters([newCharacter, ...characters]);
        } catch (error) {
            console.error("Error generating character:", error);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-[var(--foreground)]">{category} Characters</h2>
                <button
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-lg font-bold transition-all shadow-lg hover:shadow-indigo-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isGenerating ? (
                        <>
                            <Loader2 size={18} className="animate-spin" />
                            Generating...
                        </>
                    ) : (
                        <>
                            <RefreshCw size={18} />
                            Generate AI {category}
                        </>
                    )}
                </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {characters.map((char, index) => (
                    <div key={index} className="animate-in fade-in zoom-in duration-500">
                        <CharacterCard character={char} />
                    </div>
                ))}
            </div>

            {characters.length === 0 && (
                <div className="py-20 text-center text-[var(--text-muted)]">
                    <p>No characters found in this category.</p>
                </div>
            )}
        </div>
    );
}
