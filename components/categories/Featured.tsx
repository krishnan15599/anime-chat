import CharacterGrid from "@/components/ui/CharacterGrid";
import { Character } from "@/components/ui/CharacterCard";

const FEATURED_CHARACTERS: Character[] = [
    {
        name: "Elias Broker",
        tagline: "You and Elias have been enemies since the day...",
        description: "Elias Broker is your long-time rival. He's cold, calculated, and always seems to be one step ahead. Despite your mutual animosity, there's an undeniable spark between you. Will you finally settle the score, or will your rivalry turn into something else?",
        author: "@landon",
        views: "2.2m",
        likes: "594",
        image: "https://api.dicebear.com/7.x/open-peeps/svg?seed=Elias"
    },
    {
        name: "Kafka",
        tagline: "Your GF has been on a mission for weeks but...",
        description: "Kafka is a mysterious and alluring woman from the Stellaron Hunters. She's known for her elegance and deadly skill. You've been waiting for her return, but what news does she bring from the edge of the galaxy?",
        author: "@landon",
        views: "943.7k",
        likes: "293",
        image: "https://api.dicebear.com/7.x/open-peeps/svg?seed=Kafka"
    },
    {
        name: "Ada and Leon",
        tagline: "The only thing they love more than each other...",
        description: "Ada Wong and Leon S. Kennedy. A classic duo caught in the middle of a global conspiracy. Their relationship is complicated, filled with secrets and survival. Join them as they navigate a world overrun by shadows.",
        author: "@landon",
        views: "414.3k",
        likes: "113",
        image: "https://api.dicebear.com/7.x/open-peeps/svg?seed=AdaLeon"
    },
    {
        name: "Sleep over.",
        tagline: "You are invited to an all girls sleep over.",
        description: "An invitation to a sleepover with your closest friends. Laughter, secrets, and maybe a few ghost stories. It's a night to remember, but what unexpected turns will the evening take?",
        author: "@landon",
        views: "1.8m",
        likes: "750",
        image: "https://api.dicebear.com/7.x/open-peeps/svg?seed=Sleepover"
    },
    {
        name: "Hana Kurokawa",
        tagline: "A high school bully accidentally fell for yo...",
        description: "Hana was the queen of the school, known for her sharp tongue and intimidating presence. But a secret confession has changed everything. Can you handle the pressure of being the target of her newfound affection?",
        author: "@landon",
        views: "484.3k",
        likes: "135",
        image: "https://api.dicebear.com/7.x/open-peeps/svg?seed=Hana"
    },
    {
        name: "Your Cold Marria...",
        tagline: "Your cold, arranged marriage in a wealthy...",
        description: "Married for convenience, living in a gilded cage. Your spouse is distant, preoccupied with business and legacy. Will you find a way to melt their heart, or will you both remain trapped in a cold union?",
        author: "@landon",
        views: "574.4k",
        likes: "239",
        image: "https://api.dicebear.com/7.x/open-peeps/svg?seed=Marriage"
    },
    {
        name: "Bambietta Baste...",
        tagline: "Sternritter E from Bleach",
        description: "Bambietta Basterbine, a fierce warrior with explosive power. She's ruthless in battle and won't hesitate to eliminate anyone in her path. Are you brave enough to face her?",
        author: "@landon",
        views: "465.7k",
        likes: "442",
        image: "https://api.dicebear.com/7.x/open-peeps/svg?seed=Bambietta"
    },
    {
        name: "Marin Kitagawa",
        tagline: "Character from Dress-up darling",
        description: "Marin Kitagawa, a bubbly and energetic girl who loves cosplay. She's passionate and kind, always looking for someone to share her hobbies with. Will you help her bring her favorite characters to life?",
        author: "@landon",
        views: "426.0k",
        likes: "432",
        image: "https://api.dicebear.com/7.x/open-peeps/svg?seed=Marin"
    },
    {
        name: "Ruan Mei",
        tagline: "Your wife",
        description: "Ruan Mei is a brilliant scientist and your devoted wife. She's dedicated to her research but always makes time for you. What new discoveries will you make together?",
        author: "@landon",
        views: "299.9k",
        likes: "112",
        image: "https://api.dicebear.com/7.x/open-peeps/svg?seed=RuanMei"
    },
    {
        name: "Delta",
        tagline: "Loves fighting, Listen to...",
        description: "Delta is a wild and untamed fighter with a love for excitement. She's unpredictable and always looking for a challenge. Can you match her intensity in the arena?",
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
