import { supabase } from "@/lib/supabase";
import { Character } from "@/components/ui/CharacterCard";

/**
 * CHARACTER API SERVICE
 * Centralized file for all database requests.
 */

// 1. Fetch characters by category
export async function getCharactersByCategory(category: string): Promise<Character[]> {
    const { data, error } = await supabase
        .from('characters')
        .select('*')
        .eq('category', category)
        .order('name');

    if (error) {
        console.error("API Error [getCharactersByCategory]:", error);
        return [];
    }

    return formatCharacterData(data);
}

// 2. Fetch a single character by slug (MUCH FASTER & SCALABLE)
// NOTE: Ensure you have a 'slug' column in your Supabase 'characters' table.
export async function getCharacterBySlug(slug: string): Promise<Character | null> {
    const { data, error } = await supabase
        .from('characters')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error) {
        // If error, it might be because the 'slug' column doesn't exist yet.
        // Falling back to name matching to keep the app working for now.
        console.warn("API Note: Could not find by slug column. Falling back to name search.");

        const { data: allData } = await supabase.from('characters').select('*');
        const normalize = (str: string) => str.toLowerCase().replace(/\s+/g, '-');
        const found = (allData || []).find(c => normalize(c.name) === slug);
        return found ? formatSingleCharacter(found) : null;
    }

    return formatSingleCharacter(data);
}

// 3. Search characters with clean query handling
export async function searchCharacters(query: string): Promise<Character[]> {
    const cleanQuery = query.trim();
    if (!cleanQuery) return [];

    const { data, error } = await supabase
        .from('characters')
        .select('*')
        .or(`name.ilike.%${cleanQuery}%,tagline.ilike.%${cleanQuery}%`)
        .limit(8);

    if (error) {
        console.error("API Error [searchCharacters]:", error);
        return [];
    }

    return formatCharacterData(data);
}

// 4. Fetch the top 5 trending characters
export async function getTrendingCharacters(): Promise<Character[]> {
    const { data, error } = await supabase
        .from('characters')
        .select('*')
        .order('likes', { ascending: false })
        .limit(5);

    if (error) {
        console.error("API Error [getTrendingCharacters]:", error);
        return [];
    }

    return formatCharacterData(data);
}

/**
 * FORMATTING HELPERS
 */

function formatCharacterData(data: any[]): Character[] {
    return (data || []).map(char => formatSingleCharacter(char));
}

function formatSingleCharacter(char: any): Character {
    return {
        ...char,
        // Improved formatting: show '1.0k' for exactly 1000
        views: char.views >= 1000 ? `${(char.views / 1000).toFixed(1)}k` : char.views.toString(),
        likes: char.likes >= 1000 ? `${(char.likes / 1000).toFixed(1)}k` : char.likes.toString(),
    };
}
