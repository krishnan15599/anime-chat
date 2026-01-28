import CharacterCard, { Character } from "./CharacterCard";

interface CharacterGridProps {
    title?: string;
    characters: Character[];
}

export default function CharacterGrid({ title, characters }: CharacterGridProps) {
    return (
        <section className="mt-8">
            {title && <h2 className="text-xl font-bold mb-6">{title}</h2>}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4">
                {characters.map((char) => (
                    <CharacterCard key={char.name} character={char} />
                ))}
            </div>
        </section>
    );
}
