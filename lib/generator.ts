
import { Character } from "@/components/ui/CharacterCard";

export async function generateAnimeCharacter(category: string): Promise<Character> {
    const seed = Math.floor(Math.random() * 1000000);

    const promptMap: Record<string, string> = {
        maid: "anime style maid character, beautiful, detailed frilly dress, cute, masterpiece, 8k, vibrant colors",
        warrior: "anime warrior character, armor, holding sword, epic battlefield background, dramatic lighting, detailed, 8k",
        fantasy: "anime fantasy mage, holding magic staff, glowing runes, ethereal atmosphere, masterpiece, detailed",
        school: "anime school girl, japanese school uniform, classroom background, sunlight, slice of life, high quality",
        assassin: "anime assassin character, dark hooded outfit, glowing eyes, stealthy, night city background, dynamic pose"
    };

    const basePrompt = promptMap[category.toLowerCase()] || `anime character style ${category}, high quality, masterpiece`;
    const finalPrompt = `${basePrompt} --seed ${seed}`;
    const encodedPrompt = encodeURIComponent(finalPrompt);
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=512&height=768`;

    // Preload image to check success before returning
    await new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = reject;
        img.src = imageUrl;
    });

    return {
        name: `New ${category} Char`,
        tagline: "AI Generated",
        description: `A unique ${category.toLowerCase()} character generated just for you.`,
        author: "@ai_gen",
        views: "0",
        likes: "0",
        isNew: true,
        image: imageUrl
    };
}
