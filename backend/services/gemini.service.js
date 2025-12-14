import { GoogleGenAI } from "@google/genai";

const client = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const generateCaptions = async (prompt) => {
  try {
    const response = await client.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    return response.text;

  } catch (error) {
    console.error("❌ Gemini Service Error:", error);
    throw new Error(error?.message || "Gemini generation failed");
  }
};
