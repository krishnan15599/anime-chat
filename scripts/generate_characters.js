const fs = require('fs');
const path = require('path');

const OUTPUT_FILE = path.join(__dirname, '../data/characters.ts');

const GENERIC_CATEGORIES = [
    "Maid", "School", "Fantasy", "Action", "Romance", "Comedy", "Warrior", "Assassin"
];

// Jikan API Reference: https://docs.api.jikan.moe/
const BASE_URL = "https://api.jikan.moe/v4";

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWithRetry(url, retries = 3) {
    for (let i = 0; i < retries; i++) {
        try {
            console.log(`Fetching: ${url}`);
            const response = await fetch(url);

            if (response.status === 429) {
                const waitTime = 2000 * (i + 1);
                console.warn(`Rate limited. Waiting ${waitTime / 1000}s...`);
                await delay(waitTime);
                continue;
            }

            if (!response.ok) throw new Error(`HTTP ${response.status}`);

            const data = await response.json();
            return data.data;
        } catch (error) {
            console.error(`Attempt ${i + 1} failed for ${url}:`, error.message);
            if (i === retries - 1) return null;
            await delay(1000);
        }
    }
    return null;
}

// Fetch Top Anime to get popular series
async function fetchTopAnime() {
    // Fetch top 15 anime to get a good variety
    const data = await fetchWithRetry(`${BASE_URL}/top/anime?limit=25`);
    if (!data) return [];

    return data.map(anime => ({
        mal_id: anime.mal_id,
        title: anime.title_english || anime.title
    }));
}

// Fetch Characters for a specific Anime
async function fetchAnimeCharacters(animeId) {
    // Get characters for the anime
    const data = await fetchWithRetry(`${BASE_URL}/anime/${animeId}/characters`);
    if (!data) return [];

    // Sort by role (Main first) and favorites
    return data
        .sort((a, b) => {
            if (a.role === 'Main' && b.role !== 'Main') return -1;
            if (a.role !== 'Main' && b.role === 'Main') return 1;
            return (b.favorites || 0) - (a.favorites || 0);
        })
        .slice(0, 15) // Take top 15 characters per anime
        .map(item => item.character); // Extract character object
}

async function fetchGenericCategory(category) {
    console.log(`Fetching generic category: ${category}`);
    const query = category.toLowerCase();

    // 1. Search for Top Anime matching the category/genre
    const animeData = await fetchWithRetry(`${BASE_URL}/anime?q=${query}&order_by=popularity&sort=asc&limit=3`);
    if (!animeData) return [];

    let categoryChars = [];

    // 2. Fetch characters from these top anime
    for (const anime of animeData) {
        console.log(`  > Found anime: ${anime.title}. Fetching chars...`);
        const chars = await fetchAnimeCharacters(anime.mal_id);

        // Process top 5 chars
        let count = 0;
        for (const char of chars) {
            if (count >= 5) break;
            const processed = await processCharacter(char, anime.title, count < 2); // Fetch details for top 2
            if (processed.image) {
                categoryChars.push(processed);
            }
            count++;
        }
        await delay(1000);
    }

    // Remove duplicates
    const uniqueChars = [];
    const seenNames = new Set();
    for (const char of categoryChars) {
        if (!seenNames.has(char.name)) {
            seenNames.add(char.name);
            uniqueChars.push(char);
        }
    }

    return uniqueChars.slice(0, 20); // Limit to 20 total
}

// Check if character details need to be fetched? 
// anime/{id}/characters result has formatted character object: { mal_id, url, images, name }
// But it might miss 'about' (description).
// Let's assume we need to fetch full details if description is missing, OR just use a placeholder/tagline?
// Actually, fetching 300 character details is too slow. 
// Jikan anime characters endpoint items usually lack 'about'.
// We can try to use a generic description if missing, or maybe...
// Let's see if we can get 'about' from somewhere else.
// If we can't, we'll mark it to be filled or use a generated one.

async function getCharacterDetails(charId) {
    const data = await fetchWithRetry(`${BASE_URL}/characters/${charId}`);
    return data || {};
}

// To avoid N+1 fetches for descriptions (which would take forever),
// We will try to fetch details ONLY for top 3 characters of each anime?
// Or just accept missing descriptions.
// Let's try to fetch details for top 5 chars of each anime.

async function processCharacter(input, defaultTagline, fetchDetails = false) {
    const char = input.character || input;
    let details = char;

    if (fetchDetails && char.mal_id) {
        const fullDetails = await getCharacterDetails(char.mal_id);
        if (fullDetails) details = { ...char, ...fullDetails };
        await delay(500);
    }

    const name = (details.name || "Unknown").replace(/"/g, '');
    const tagline = details.name_kanji ? details.name_kanji.replace(/"/g, '') : defaultTagline;

    let description = details.about || details.description || `A popular character from ${defaultTagline}.`;
    description = description.replace(/[\r\n]+/g, ' ').trim();
    description = description.replace(/"/g, '\\"');

    if (description.length > 250) {
        description = description.substring(0, 247) + "...";
    }

    const imageUrl = details.images?.webp?.image_url || details.images?.jpg?.image_url || char.images?.webp?.image_url || char.images?.jpg?.image_url;
    const favorites = input.favorites || details.favorites || 0;
    const views = (favorites * 12).toLocaleString('en-US', { notation: 'compact' }).toLowerCase();
    const likes = (favorites).toLocaleString('en-US', { notation: 'compact' }).toLowerCase();

    return {
        name,
        tagline,
        description,
        author: "@jikan_api",
        views,
        likes,
        image: imageUrl,
        mal_id: char.mal_id
    };
}

async function generateData() {
    console.log("Starting character generation...");
    const groupedData = {};

    // 1. Fetch Generic Categories
    console.log("Fetching Generic Categories...");
    for (const category of GENERIC_CATEGORIES) {
        const chars = await fetchGenericCategory(category);
        const processedChars = [];
        for (const char of chars) {
            // Generic search returns full details usually
            processedChars.push(await processCharacter(char, `${category} Character`, false));
        }
        groupedData[category] = processedChars.filter(c => c.image);
        await delay(1000);
    }

    // 2. Fetch Top Anime and their characters
    console.log("Fetching Top Anime...");
    const topAnime = await fetchTopAnime();

    for (const anime of topAnime) {
        console.log(`Processing Anime: ${anime.title}...`);
        const chars = await fetchAnimeCharacters(anime.mal_id);

        const processedChars = [];
        // Only fetch full details for top 3 to save time/limits
        let count = 0;
        for (const char of chars) {
            // Need details for description
            // Rate limit check: 3 req/s. 
            // If we fetch details for every char, it's slow.
            // Let's just fetch for top 3?
            const shouldFetch = count < 3;
            processedChars.push(await processCharacter(char, anime.title, shouldFetch));
            count++;
        }

        groupedData[anime.title] = processedChars.filter(c => c.image);
        await delay(1000);
    }

    // Sort keys: Generic first, then by number of characters desc
    const sortedKeys = [
        ...GENERIC_CATEGORIES,
        ...Object.keys(groupedData)
            .filter(k => !GENERIC_CATEGORIES.includes(k))
            .filter(k => groupedData[k].length > 0)
    ];

    // Build File Content
    let content = `import { Character } from "@/components/ui/CharacterCard";\n\n`;

    // Export Categories List
    content += `export const CATEGORIES = ${JSON.stringify(sortedKeys, null, 4)};\n\n`;

    content += `export const ALL_CHARACTERS: Record<string, Character[]> = {\n`;

    for (const category of sortedKeys) {
        if (!groupedData[category] || groupedData[category].length === 0) continue;

        content += `    "${category}": [\n`;
        for (const char of groupedData[category]) {
            content += `        {
            name: "${char.name}",
            tagline: "${char.tagline}",
            description: "${char.description}",
            // author: "${char.author}", // Removed author to match interface or keep default? Interface usually has it.
            author: "@jikan_api",
            views: "${char.views}",
            likes: "${char.likes}",
            image: "${char.image}"
        },\n`;
        }
        content += `    ],\n`;
    }

    content += `};\n\n`;

    // Add helper function
    content += `export function getCharacterBySlug(slug: string): Character | undefined {
    const normalize = (str: string) => str.toLowerCase().replace(/\\s+/g, '-');
    for (const category in ALL_CHARACTERS) {
        const character = ALL_CHARACTERS[category].find(c => normalize(c.name) === slug);
        if (character) return character;
    }
    return undefined;
}
`;

    fs.writeFileSync(OUTPUT_FILE, content);
    console.log(`Successfully generated characters.ts! Total categories: ${sortedKeys.length}`);
}

generateData();
