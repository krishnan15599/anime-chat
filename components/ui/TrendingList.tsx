interface TrendingItem {
    rank: number;
    name: string;
    description: string;
    tags: string[];
    avatar?: string;
}

const TRENDING_ITEMS: TrendingItem[] = [
    {
        rank: 3,
        name: "Julia",
        description: "Bitchy Emotional",
        tags: [],
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Julia"
    },
    {
        rank: 4,
        name: "Trip in Europe",
        description: "Curious Compassionate",
        tags: [],
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Trip"
    },
    {
        rank: 5,
        name: "Scaramouche",
        description: "Bully Possessive",
        tags: [],
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Scaramouche"
    },
    {
        rank: 6,
        name: "Kaelithra Tenebris",
        description: "Female Powerful",
        tags: [],
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kaelithra"
    },
    {
        rank: 7,
        name: "Peli",
        description: "Energetic Strong",
        tags: [],
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Peli"
    },
    {
        rank: 8,
        name: "Free Use Law RPG",
        description: "Adventure Fantasy",
        tags: [],
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=LawRPG"
    }
];

export default function TrendingList() {
    return (
        <div className="space-y-6">
            <div className="flex gap-4 border-b border-[var(--border-color)] pb-2">
                <button className="text-[var(--foreground)] text-xs font-bold border-b-2 border-yellow-500 pb-2">Recommend</button>
                <button className="text-[var(--text-muted)] text-xs font-bold pb-2">Trending</button>
            </div>

            <div className="space-y-4">
                {TRENDING_ITEMS.map((item) => (
                    <div key={item.name} className="flex items-center gap-4 group cursor-pointer">
                        <span className="text-[var(--text-muted)] text-xs font-bold w-4">{item.rank}</span>
                        <div className="w-8 h-8 rounded-full bg-[var(--card-bg)] overflow-hidden border border-[var(--border-color)]">
                            <img src={item.avatar} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="text-[var(--foreground)] text-xs font-bold truncate">{item.name}</h4>
                            <p className="text-[var(--text-muted)] text-[10px] truncate">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
