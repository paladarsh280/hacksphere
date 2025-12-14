import { generateCaptions } from "../services/gemini.service.js";

export const getCaptions = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        captions: [],
        error: "Prompt is required",
      });
    }

    const text = await generateCaptions(prompt);

    res.json({
      captions: [text],
    });

  } catch (error) {
    console.error("❌ Gemini Controller Error:", error);

    res.status(500).json({
      captions: [],
      error: error.message,
    });
  }
};
