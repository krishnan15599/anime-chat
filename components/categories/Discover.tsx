import CharacterGrid from "@/components/ui/CharacterGrid";
import { Character } from "@/components/ui/CharacterCard";

const DISCOVER_CHARACTERS: Character[] = [
    {
        name: "Creative Writer",
        tagline: "I help you write stories and scripts.",
        author: "@creator",
        chats: "1.2 m",
    },
    {
        name: "Anime Sensei",
        tagline: "Talk about your favorite anime!",
        author: "@otaku",
        chats: "850 k",
    }
];

export default function Discover() {
    return (
        <div>
            <CharacterGrid title="Discover New Worlds" characters={DISCOVER_CHARACTERS} />
        </div>
    );
}
