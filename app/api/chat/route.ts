import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { message, character, history } = await req.json();

        const systemPrompt = `
You are ${character.name}.
Personality: ${character.description}.
Stay fully in character.
Never mention you are AI.
Keep responses concise.
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
                    ...history.map((m: any) => ({
                        role: m.isAi ? "assistant" : "user",
                        content: m.text
                    })),
                    { role: "user", content: message }
                ],
                max_tokens: 200,
                temperature: 0.7
            })
        });

        const data = await response.json();

        const reply = data.choices?.[0]?.message?.content || "No response";

        return NextResponse.json({ reply });

    } catch (error: any) {
        console.error("OpenRouter Error:", error);
        return NextResponse.json(
            { error: error.message || "AI failed" },
            { status: 500 }
        );
    }
}
