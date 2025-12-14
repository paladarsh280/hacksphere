import React, { useEffect, useState } from "react";
import axios from "axios";
import { Sparkles } from "lucide-react";

export default function AiCaptionBox({ memoryText, onSelect }) {
  const [captions, setCaptions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!memoryText || memoryText.length < 20) {
      setCaptions([]);
      return;
    }

    const fetchCaptions = async () => {
      try {
        setLoading(true);
        const res = await axios.post(
          "https://hacksphere-e64m.onrender.com/api/ai/captions",
          { text: memoryText }
        );

        setCaptions(res.data.captions || ["This was the day we all sat together laughing until midnight."]);
      } catch (err) {
        console.error("AI caption error:", err);
        setCaptions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCaptions();
  }, [memoryText]);

  return (
    <div className="mt-4">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="w-4 h-4 text-purple-600" />
        <p className="text-sm font-semibold text-gray-700">
          AI Caption Suggestions
        </p>
      </div>

      {loading && (
        <p className="text-sm text-gray-500">Generating captions...</p>
      )}

      {!loading && captions.length === 0 && (
        <p className="text-xs text-gray-400">
          Write more to get AI suggestions ✨
        </p>
      )}

      <div className="flex flex-wrap gap-2 mt-2">
        {captions.map((cap, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onSelect(cap)}
            className="px-3 py-1 text-sm bg-purple-100 hover:bg-purple-200 rounded-full"
          >
            {cap}
          </button>
        ))}
      </div>
    </div>
  );
}
