import { useEffect, useState } from "react";
import { getTrendingCharactersFromDB } from "@/data/characters";
import Link from "next/link";
import { Character } from "@/components/ui/CharacterCard";

export default function TrendingList() {
    const [trendingCharacters, setTrendingCharacters] = useState<(Character & { rank: number, slug: string })[]>([]);

    useEffect(() => {
        const fetchTrending = async () => {
            const data = await getTrendingCharactersFromDB();
            setTrendingCharacters(data.map((char, index) => ({
                ...char,
                rank: index + 1,
                slug: char.name.toLowerCase().replace(/\s+/g, '-')
            })));
        };
        fetchTrending();
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex gap-4 border-b border-[var(--border-color)] pb-2 overflow-x-auto no-scrollbar">
                <button className="text-[var(--foreground)] text-xs font-bold border-b-2 border-yellow-500 pb-2 whitespace-nowrap">Recommend</button>
                <button className="text-[var(--text-muted)] text-xs font-bold pb-2 whitespace-nowrap">Trending</button>
                <button className="text-[var(--text-muted)] text-xs font-bold pb-2 whitespace-nowrap">Popular</button>
            </div>

            <div className="space-y-4">
                {trendingCharacters.map((item) => (
                    <Link
                        href={`/chat/${item.slug}`}
                        key={item.name}
                        className="flex items-center gap-4 group cursor-pointer hover:bg-white/5 p-2 rounded-xl transition-all duration-300"
                    >
                        <span className={`text-xs font-black w-4 flex justify-center ${item.rank <= 3 ? "text-yellow-500" : "text-[var(--text-muted)]"}`}>
                            {item.rank}
                        </span>
                        <div className="w-10 h-10 rounded-full bg-[var(--card-bg)] overflow-hidden border border-[var(--border-color)] group-hover:border-yellow-500/50 group-hover:scale-105 transition-all">
                            <img
                                src={item.image || `https://api.dicebear.com/7.x/open-peeps/svg?seed=${item.name}`}
                                alt={item.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="text-[var(--foreground)] text-xs font-bold truncate group-hover:text-yellow-400 transition-colors">
                                {item.name}
                            </h4>
                            <div className="flex items-center gap-2">
                                <p className="text-[var(--text-muted)] text-[10px] truncate max-w-[150px]">
                                    {item.tagline}
                                </p>
                                <span className="text-[8px] px-1.5 py-0.5 rounded-md bg-white/5 text-zinc-500 font-bold uppercase">
                                    {item.likes || "K"}
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            <button className="w-full py-2.5 rounded-xl border border-[var(--border-color)] text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] hover:bg-white/5 hover:text-[var(--foreground)] transition-all">
                View All Ranking
            </button>
        </div>
    );
}

