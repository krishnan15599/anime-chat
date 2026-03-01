import { NextRequest, NextResponse } from "next/server";
import { getCharactersByCategory, getCharactersBySlugs, getTrendingCharacters } from "@/lib/services/characterService";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category") || "Maid";
    const slugsStr = searchParams.get("slugs") || "";
    const slugs = slugsStr ? slugsStr.split(",") : [];

    try {
        // Fetch everything in parallel
        const [categoryCharacters, recentCharacters, trendingCharacters] = await Promise.all([
            getCharactersByCategory(category),
            slugs.length > 0 ? getCharactersBySlugs(slugs) : Promise.resolve([]),
            getTrendingCharacters()
        ]);

        return NextResponse.json({
            categoryCharacters,
            recentCharacters,
            trendingCharacters
        });
    } catch (error: any) {
        console.error("API Route Error [Home]:", error);
        return NextResponse.json({ error: "Failed to fetch home data" }, { status: 500 });
    }
}
