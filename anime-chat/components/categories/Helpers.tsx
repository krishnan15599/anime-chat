import CharacterGrid from "@/components/ui/CharacterGrid";
import { Character } from "@/components/ui/CharacterCard";

const HELPER_CHARACTERS: Character[] = [
    {
        name: "Coding Assistant",
        tagline: "Python, JS, C++, I know them all.",
        author: "@dev",
        chats: "2.5 m",
    },
    {
        name: "Language Tutor",
        tagline: "Practice any language with me.",
        author: "@polyglot",
        chats: "1.1 m",
    }
];

export default function Helpers() {
    return (
        <div>
            <CharacterGrid title="Your AI Assistants" characters={HELPER_CHARACTERS} />
        </div>
    );
}
