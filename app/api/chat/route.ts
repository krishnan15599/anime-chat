import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const CACHE_PATH = path.join(process.cwd(), "data", "chat-cache.json");

function getCache() {
    try {
        if (!fs.existsSync(CACHE_PATH)) return {};
        const data = fs.readFileSync(CACHE_PATH, "utf-8");
        return JSON.parse(data || "{}");
    } catch (e) {
        return {};
    }
}

function saveToCache(charId: string, userMsg: string, aiReply: string) {
    try {
        const cache = getCache();
        if (!cache[charId]) cache[charId] = {};

        // Normalize the message key for better matching
        const key = userMsg.trim().toLowerCase();
        cache[charId][key] = aiReply;

        fs.writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2));
    } catch (e) {
        console.error("Cache Save Error:", e);
    }
}

export async function POST(req: Request) {
    try {
        const { message, character, history = [] } = await req.json();
        const charId = character.name.toLowerCase().replace(/\s+/g, '-');
        const normalizedMsg = message.trim().toLowerCase();

        console.log(`[Chat Request] Message: "${message}" for ${charId}`);

        // 1. Check Cache
        const cache = getCache();
        if (cache[charId]?.[normalizedMsg]) {
            console.log(`[Cache Hit] ${charId}: ${normalizedMsg}`);
            return NextResponse.json({ reply: cache[charId][normalizedMsg] });
        }

        console.log(`[Cache Miss] Calling OpenRouter...`);

        const systemPrompt = `
You are ${character.name}.
Personality: ${character.description || character.tagline || "Helpful AI"}.
Stay fully in character.
Never mention you are AI.
Keep responses concise and engaging.
`;

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "http://localhost:3000",
                "X-Title": "Anime Chat App"
            },
            body: JSON.stringify({
                model: "mistralai/mistral-7b-instruct",
                messages: [
                    { role: "system", content: systemPrompt },
                    ...history.slice(-5).map((m: any) => ({
                        role: m.isAi ? "assistant" : "user",
                        content: m.text
                    })),
                    { role: "user", content: message }
                ],
                max_tokens: 200,
                temperature: 0.7
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("[OpenRouter Error Response]:", errorData);
            throw new Error(errorData.error?.message || `API error: ${response.status}`);
        }

        const data = await response.json();
        console.log("[OpenRouter Success Data]:", data);

        const reply = data.choices?.[0]?.message?.content || "No response";

        // 2. Save to Cache
        if (reply !== "No response") {
            saveToCache(charId, message, reply);
        }

        return NextResponse.json({ reply });

    } catch (error: any) {
        console.error("Chat API Error:", error.message);
        return NextResponse.json(
            { error: error.message || "AI failed" },
            { status: 500 }
        );
    }
}
