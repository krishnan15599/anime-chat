
const fs = require('fs');
const path = require('path');

const OUTPUT_FILE = path.join(__dirname, '../data/characters.ts');

const CATEGORIES = ["Maid", "Warrior", "Assassin", "School", "Fantasy"];
const ITEMS_PER_CATEGORY = 40; // 5 * 40 = 200 characters

const PROMPT_MAP = {
    maid: "anime style maid character, beautiful, detailed frilly dress, cute, masterpiece, 8k, vibrant colors",
    warrior: "anime warrior character, armor, holding sword, epic battlefield background, dramatic lighting, detailed, 8k",
    fantasy: "anime fantasy mage, holding magic staff, glowing runes, ethereal atmosphere, masterpiece, detailed",
    school: "anime school girl, japanese school uniform, classroom background, sunlight, slice of life, high quality",
    assassin: "anime assassin character, dark hooded outfit, glowing eyes, stealthy, night city background, dynamic pose"
};

const NAMES = {
    Maid: ["Rem", "Ram", "Tohru", "Roberta", "Mey-Rin", "Virgo", "Sakuya", "Maria", "Nako", "Chihiro", "Misaki", "Mikuru", "Felis", "Ai", "Mei", "Hina", "Yuki", "Sakura", "Mio", "Rina", "Sora", "Yuna", "Kaira", "Luna", "Mina", "Nana", "Lili", "Rose", "Viola", "Iris", "Bella", "Anna", "Cora", "Dina", "Elsa", "Flora", "Gina", "Hana", "Ivy", "Joy"],
    Warrior: ["Saber", "Erza", "Mikasa", "Clare", "Teresa", "Casca", "Balsa", "Ryuko", "Satsuki", "Akame", "Leone", "Maka", "Asuna", "Sinon", "Alice", "Jeanne", "Mordred", "Scathach", "Atalanta", "Boudica", "Zenobia", "Tomoe", "Mulan", "Joan", "Valkyrie", "Athena", "Diana", "Freya", "Sif", "Brunhilde", "Sigrun", "Kara", "Thora", "Astrid", "Ingrid", "Helga", "Greta", "Hilda", "Olga", "Runa"],
    Assassin: ["Akame", "Killua", "Kurome", "Chelsea", "Sheele", "Mine", "Yoruichi", "Soifon", "Himiko", "Shiki", "Canaan", "Reiji", "Ein", "Zwei", "Altair", "Ezio", "Connor", "Arno", "Jacob", "Evie", "Aveline", "Shao", "Nikolai", "Arbaaz", "Adewale", "Haytham", "Shay", "Bayek", "Aya", "Kassandra", "Alexios", "Eivor", "Basim", "Hytham", "Roshan", "Naoe", "Yasuke", "Hanzo", "Genji", "Kiru"],
    School: ["Nagisa", "Kyou", "Tomoyo", "Kotomi", "Fuko", "Ryou", "Yukino", "Yui", "Iroha", "Komachi", "Taiga", "Minori", "Ami", "Haruhi", "Mikuru", "Yuki", "Kyon", "Itsuki", "Mio", "Ritsu", "Tsumugi", "Azusa", "Ui", "Nodoka", "Sawako", "Chitanda", "Mayaka", "Satoshi", "Houtarou", "Kumiko", "Reina", "Hazuki", "Sapphire", "Asuka", "Kaori", "Haruka", "Michiru", "Mari", "Eli", "Nozomi"],
    Fantasy: ["Megumin", "Aqua", "Darkness", "Yunyun", "Wiz", "Emilia", "Rem", "Ram", "Beatrice", "Echidna", "Frieren", "Fern", "Stark", "Himmel", "Heiter", "Eisen", "Roxy", "Sylphiette", "Eris", "Ghislaine", "Elinalise", "Rudeus", "Paul", "Zenith", "Lilia", "Aisha", "Norn", "Ruijerd", "Orsted", "Kishirika", "Badigadi", "Perugius", "Almanfi", "Zanoba", "Cliff", "Ariel", "Luke", "Pile", "Gyes", "Rinia"]
};

function generateData() {
    let content = `import { Character } from "@/components/ui/CharacterCard";\n\n`;
    content += `export const ALL_CHARACTERS: Record<string, Character[]> = {\n`;

    for (const category of CATEGORIES) {
        content += `    "${category}": [\n`;

        const catNames = NAMES[category] || [];
        const basePrompt = PROMPT_MAP[category.toLowerCase()];

        for (let i = 0; i < ITEMS_PER_CATEGORY; i++) {
            const seed = Math.floor(Math.random() * 10000000);
            const name = catNames[i] || `${category} Create ${i + 1}`;

            // Generate Pollinations URL - REMOVED model=flux for stability
            const finalPrompt = `${basePrompt} --seed ${seed}`;
            const encodedPrompt = encodeURIComponent(finalPrompt);
            const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=512&height=768`;

            // Random stats
            const views = (Math.random() * 2 + 0.1).toFixed(1) + "m";
            const likes = Math.floor(Math.random() * 500) + "k";

            content += `        {
            name: "${name}",
            tagline: "${category} Character",
            description: "A unique ${category} character generated with AI.",
            author: "@ai_gen",
            views: "${views}",
            likes: "${likes}",
            image: "${imageUrl}"
        },\n`;
        }
        content += `    ],\n`;
    }

    content += `};\n`;

    fs.writeFileSync(OUTPUT_FILE, content);
    console.log(`Generated characters.ts with ${CATEGORIES.length * ITEMS_PER_CATEGORY} characters!`);
}

generateData();
