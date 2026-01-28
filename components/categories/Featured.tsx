import CharacterGrid from "@/components/ui/CharacterGrid";
import { Character } from "@/components/ui/CharacterCard";

const FEATURED_CHARACTERS: Character[] = [
    {
        name: "Elias Broker",
        tagline: "You and Elias have been enemies since the day...",
        author: "@landon",
        views: "2.2m",
        likes: "594",
        image: "https://api.dicebear.com/7.x/open-peeps/svg?seed=Elias"
    },
    {
        name: "Kafka",
        tagline: "Your GF has been on a mission for weeks but...",
        author: "@landon",
        views: "943.7k",
        likes: "293",
        image: "https://api.dicebear.com/7.x/open-peeps/svg?seed=Kafka"
    },
    {
        name: "Ada and Leon",
        tagline: "The only thing they love more than each other...",
        author: "@landon",
        views: "414.3k",
        likes: "113",
        image: "https://api.dicebear.com/7.x/open-peeps/svg?seed=AdaLeon"
    },
    {
        name: "Sleep over.",
        tagline: "You are invited to an all girls sleep over.",
        author: "@landon",
        views: "1.8m",
        likes: "750",
        image: "https://api.dicebear.com/7.x/open-peeps/svg?seed=Sleepover"
    },
    {
        name: "Hana Kurokawa",
        tagline: "A high school bully accidentally fell for yo...",
        author: "@landon",
        views: "484.3k",
        likes: "135",
        image: "https://api.dicebear.com/7.x/open-peeps/svg?seed=Hana"
    },
    {
        name: "Your Cold Marria...",
        tagline: "Your cold, arranged marriage in a wealthy...",
        author: "@landon",
        views: "574.4k",
        likes: "239",
        image: "https://api.dicebear.com/7.x/open-peeps/svg?seed=Marriage"
    },
    {
        name: "Bambietta Baste...",
        tagline: "Sternritter E from Bleach",
        author: "@landon",
        views: "465.7k",
        likes: "442",
        image: "https://api.dicebear.com/7.x/open-peeps/svg?seed=Bambietta"
    },
    {
        name: "Marin Kitagawa",
        tagline: "Character from Dress-up darling",
        author: "@landon",
        views: "426.0k",
        likes: "432",
        image: "https://api.dicebear.com/7.x/open-peeps/svg?seed=Marin"
    },
    {
        name: "Ruan Mei",
        tagline: "Your wife",
        author: "@landon",
        views: "299.9k",
        likes: "112",
        image: "https://api.dicebear.com/7.x/open-peeps/svg?seed=RuanMei"
    },
    {
        name: "Delta",
        tagline: "Loves fighting, Listen to...",
        author: "@landon",
        views: "25.9k",
        likes: "19",
        isNew: true,
        image: "https://api.dicebear.com/7.x/open-peeps/svg?seed=Delta"
    }
];

export default function Featured() {
    return (
        <div className="space-y-12">
            <CharacterGrid characters={FEATURED_CHARACTERS} />
        </div>
    );
}
