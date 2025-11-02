import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

const systemInstruction = `
You are an AI assistant that generates structured learning roadmaps strictly according to user preferences and bio.
The user provides:
- Roadmap title
- Duration in months
- Learning preferences
- A short bio

Output a roadmap strictly according to user preferences and bio, in strict JSON format matching the schema:
- Roadmap: { title, duration, progress, sections }
- Section: { title, subtopics }
- Subtopic: { title, resource_link, due_date, is_completed, duration }

Rules:
1. Always set "progress" = 0.
2. "due_date" must be null (backend will fill it later).
3. "is_completed" = false.
4. "duration" in days, reflecting time to learn each subtopic.
5. Resource links must be **official documentation only**, **working and authoritative**.
   - Examples: MDN, Node.js official docs, Python.org, Java docs, W3C, etc.
   - Do NOT include videos, tutorials, YouTube, GitHub repos, or non-official sites.
6. Organize sections and subtopics logically based on user bio, preferences, and total duration.
7. Output **JSON only**, no extra text or explanations.
`;




const roadmapSchema = {
    type: SchemaType.OBJECT,
    properties: {
        title: { type: SchemaType.STRING },
        duration: { type: SchemaType.NUMBER }, // months
        progress: { type: SchemaType.NUMBER }, // default 0
        sections: {
            type: SchemaType.ARRAY,
            items: {
                type: SchemaType.OBJECT,
                properties: {
                    title: { type: SchemaType.STRING },
                    subtopics: {
                        type: SchemaType.ARRAY,
                        items: {
                            type: SchemaType.OBJECT,
                            properties: {
                                title: { type: SchemaType.STRING },
                                resource_link: { type: SchemaType.STRING },
                                due_date: { type: SchemaType.STRING }, // null always
                                is_completed: { type: SchemaType.BOOLEAN },
                                duration: { type: SchemaType.NUMBER } // days
                            },
                            required: ["title", "resource_link", "due_date", "is_completed", "duration"]
                        }
                    }
                },
                required: ["title", "subtopics"]
            }
        }
    },
    required: ["title", "duration", "progress", "sections"]
};

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    systemInstruction,
});

export async function generateRoadmap(prompt: string): Promise<any> {
    const response = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
            responseMimeType: "application/json",
            responseSchema: roadmapSchema,
        },
    } as any);

    let result = response.response.text();
    return JSON.parse(result);
}