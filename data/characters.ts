import { supabase } from "@/lib/supabase";
import { Character } from "@/components/ui/CharacterCard";

// All available categories (used for tabs and dropdowns in the UI)
export const CATEGORIES = [
    "Maid",
    "Warrior",
    "Assassin",
    "School",
    "Fantasy",
    "Frieren: Beyond Journey's End",
    "Frieren: Beyond Journey's End Season 2",
    "Chainsaw Man – The Movie: Reze Arc",
    "Fullmetal Alchemist: Brotherhood",
    "Steins;Gate",
    "Attack on Titan Season 3 Part 2",
    "Gintama Season 4",
    "Gintama: The Very Final",
    "Hunter x Hunter",
    "One Piece Fan Letter",
    "Gintama Season 2",
    "Gintama: Enchousen",
    "Legend of the Galactic Heroes",
    "Gintama Season 5",
    "Bleach: Thousand-Year Blood War",
    "Kaguya-sama: Love is War -Ultra Romantic-",
    "Fruits Basket: The Final Season",
    "Clannad: After Story",
    "Gintama",
    "A Silent Voice",
    "The Apothecary Diaries Season 2",
    "Code Geass: Lelouch of the Rebellion R2",
    "March Comes In Like a Lion 2nd Season",
    "Gintama: The Movie: The Final Chapter: Be Forever Yorozuya",
    "Monster"
];

// --- Supabase Fetch Functions ---

export async function getCharactersByCategoryFromDB(category: string): Promise<Character[]> {
    const { data, error } = await supabase
        .from('characters')
        .select('*')
        .eq('category', category)
        .order('name');

    if (error) {
        console.error("Error fetching characters:", error);
        return [];
    }

    return (data || []).map(char => ({
        ...char,
        views: char.views > 1000 ? `${(char.views / 1000).toFixed(1)}k` : char.views.toString(),
        likes: char.likes > 1000 ? `${(char.likes / 1000).toFixed(1)}k` : char.likes.toString(),
    }));
}

export async function getCharacterBySlugFromDB(slug: string): Promise<Character | null> {
    const normalize = (str: string) => str.toLowerCase().replace(/\s+/g, '-');

    const { data, error } = await supabase
        .from('characters')
        .select('*');

    if (error) return null;

    const character = data.find(c => normalize(c.name) === slug);
    if (!character) return null;

    return {
        ...character,
        views: character.views > 1000 ? `${(character.views / 1000).toFixed(1)}k` : character.views.toString(),
        likes: character.likes > 1000 ? `${(character.likes / 1000).toFixed(1)}k` : character.likes.toString(),
    };
}

export async function searchCharactersFromDB(query: string): Promise<Character[]> {
    const { data, error } = await supabase
        .from('characters')
        .select('*')
        .or(`name.ilike.%${query}%,tagline.ilike.%${query}%`)
        .limit(8);

    if (error) {
        console.error("Error searching characters:", error);
        return [];
    }

    return (data || []).map(char => ({
        ...char,
        views: char.views > 1000 ? `${(char.views / 1000).toFixed(1)}k` : char.views.toString(),
        likes: char.likes > 1000 ? `${(char.likes / 1000).toFixed(1)}k` : char.likes.toString(),
    }));
}

export async function getTrendingCharactersFromDB(): Promise<Character[]> {
    const { data, error } = await supabase
        .from('characters')
        .select('*')
        .order('likes', { ascending: false })
        .limit(5);

    if (error) {
        console.error("Error fetching trending characters:", error);
        return [];
    }

    return (data || []).map(char => ({
        ...char,
        views: char.views > 1000 ? `${(char.views / 1000).toFixed(1)}k` : char.views.toString(),
        likes: char.likes > 1000 ? `${(char.likes / 1000).toFixed(1)}k` : char.likes.toString(),
    }));
}
