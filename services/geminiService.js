const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const getCareerResponse = async (userMessage) => {
    try {

        const prompt = `
You are CareerGuide AI.

Answer career questions directly.
Provide detailed roadmaps.
Do not ask unnecessary follow-up questions.
Rules:
- Use markdown formatting.
- Use headings.
- Use bullet points.
- Use numbered roadmaps.
- Keep answers readable.
- Do not return one giant paragraph.
- Maximum 400 words.

Question:
${userMessage}
`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        console.log("FULL RESPONSE:");
        console.log(response);

        return response.text;

    } catch (error) {

        console.error("Gemini Error:", error);

        return `Gemini Error: ${error.message}`;
    }
};

module.exports = {
    getCareerResponse,
};