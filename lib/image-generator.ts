/**
 * AI Image Generation Utility
 * Uses Pollinations.ai for free anime-style image generation
 */

/**
 * Generate an anime-style image URL using Pollinations.ai
 * @param prompt - Description of the image to generate
 * @returns URL of the generated image
 */
export function generateImage(prompt: string): string {
    // Enhance prompt for anime style
    const animePrompt = `anime style, high quality, ${prompt}`;

    // Pollinations.ai free API - no key needed
    const encodedPrompt = encodeURIComponent(animePrompt);
    return `https://image.pollinations.ai/prompt/${encodedPrompt}?width=512&height=512&nologo=true`;
}

/**
 * Detect if a message is requesting image generation
 * @param message - User's message text
 * @returns boolean indicating if user wants an image
 */
export function isImageRequest(message: string): boolean {
    const imageKeywords = [
        'show me',
        'generate',
        'create',
        'draw',
        'image of',
        'picture of',
        'what do you look like',
        'your appearance',
        'how do you look'
    ];

    const lowerMessage = message.toLowerCase();
    return imageKeywords.some(keyword => lowerMessage.includes(keyword));
}

/**
 * Extract image description from user message
 * @param message - User's message text
 * @param characterName - Name of the character
 * @returns Cleaned description for image generation
 */
export function extractImagePrompt(message: string, characterName: string): string {
    let prompt = message.toLowerCase()
        .replace(/show me|generate|create|draw|image of|picture of/gi, '')
        .trim();

    // If empty or too short, use character name
    if (!prompt || prompt.length < 3) {
        prompt = characterName;
    }

    return prompt;
}
