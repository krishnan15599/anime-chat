
const fs = require('fs');
const path = require('path');

const OUTPUT_FILE = path.join(__dirname, '../data/characters.ts');

const CATEGORIES = [
    "Maid", "Warrior", "Assassin", "School", "Fantasy",
    "Naruto", "One Piece", "Attack on Titan", "Demon Slayer",
    "Dragon Ball", "Jujutsu Kaisen", "Bleach", "High School DxD"
];
// Jikan API Reference: https://docs.api.jikan.moe/
const BASE_URL = "https://api.jikan.moe/v4/characters";

async function fetchCharacters(category) {
    try {
        const query = category.toLowerCase();
        // Sorting by favorites to get popular characters
        const url = `${BASE_URL}?q=${query}&order_by=favorites&sort=desc&limit=15`;
        console.log(`Fetching ${category} characters from ${url}...`);

        const response = await fetch(url);

        if (!response.ok) {
            // Handle rate limiting specifically
            if (response.status === 429) {
                console.warn(`Rate limited for ${category}. Waiting longer...`);
                await new Promise(resolve => setTimeout(resolve, 2000));
                return fetchCharacters(category); // Retry once
            }
            throw new Error(`API Error: ${response.statusText}`);
        }

        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error(`Failed to fetch ${category}:`, error);
        return [];
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function generateData() {
    let content = `import { Character } from "@/components/ui/CharacterCard";\n\n`;
    content += `export const ALL_CHARACTERS: Record<string, Character[]> = {\n`;

    for (const category of CATEGORIES) {
        content += `    "${category}": [\n`;

        // Add delay to respect Jikan API rate limits (3 req/sec generally, but being safe with 1s)
        await delay(1000);

        const characters = await fetchCharacters(category);

        for (const char of characters) {
            // Map Jikan data to our app's Character interface
            const name = char.name.replace(/"/g, ''); // Remove quotes to avoid syntax errors
            const tagline = char.name_kanji ? char.name_kanji.replace(/"/g, '') : `${category} Anime Character`;

            // Clean up description: remove newlines, truncate, escape quotes
            let description = char.about || `A popular ${category} character from anime.`;
            // Remove newlines and excess whitespace
            description = description.replace(/[\r\n]+/g, ' ').trim();
            // Escape double quotes
            description = description.replace(/"/g, '\\"');
            // Truncate
            if (description.length > 150) {
                description = description.substring(0, 150) + "...";
            }

            const imageUrl = char.images?.jpg?.image_url;
            if (!imageUrl) continue;

            // Simulate social stats based on favorites
            const views = ((char.favorites || 100) / 1000).toFixed(1) + "m";
            const likes = Math.floor((char.favorites || 50) / 10) + "k";

            content += `        {
            name: "${name}",
            tagline: "${tagline}",
            description: "${description}",
            author: "@jikan_api",
            views: "${views}",
            likes: "${likes}",
            image: "${imageUrl}"
        },\n`;
        }
        content += `    ],\n`;
    }

    content += `};\n`;

    fs.writeFileSync(OUTPUT_FILE, content);
    console.log(`Successfully generated characters.ts using Jikan API data!`);
}

generateData();
