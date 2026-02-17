
"use client";


import CharacterCard, { Character } from "@/components/ui/CharacterCard";

interface CategoryGridProps {
    category: string;
    initialCharacters: Character[];
}



export default function CategoryGrid({ category, initialCharacters }: CategoryGridProps) {
    const characters = initialCharacters;

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[var(--foreground)]">{category} Characters</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {characters.map((char, index) => (
                    <div key={index} className="animate-in fade-in zoom-in duration-500">
                        <CharacterCard character={char} />
                    </div>
                ))}
            </div>

            {
                characters.length === 0 && (
                    <div className="py-20 text-center text-[var(--text-muted)]">
                        <p>No characters found in this category.</p>
                    </div>
                )
            }
        </div >
    );
}
