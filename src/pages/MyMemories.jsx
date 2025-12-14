import React, { useEffect, useState } from "react";
import axios from "axios";
import { Image, Music, Video, Clock, Calendar } from "lucide-react";

export default function MyMemories() {
  const [memories, setMemories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [now, setNow] = useState(Date.now());

useEffect(() => {
  const interval = setInterval(() => {
    setNow(Date.now());
  }, 1000);

  return () => clearInterval(interval);
}, []);


const getRemainingTime = (unlockDate) => {
  const now = new Date().getTime();
  const unlockTime = new Date(unlockDate).getTime();
  const diff = unlockTime - now;

  if (diff <= 0) return null;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds };
};



  useEffect(() => {
    axios
      .get("https://hacksphere-e64m.onrender.com/api/memory/my", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(res => {
        setMemories(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading your memories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-3">
            My Uploaded Memories
          </h1>
          <p className="text-gray-600 text-lg">
            Cherish the moments that matter most
          </p>
          <div className="mt-4 inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
            <Calendar className="w-4 h-4 text-purple-500" />
            <span className="text-sm text-gray-700 font-medium">
              {memories.length} {memories.length === 1 ? 'Memory' : 'Memories'}
            </span>
          </div>
        </div>

        {/* Memories Grid */}
        
        {memories.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full mb-4">
              <Image className="w-10 h-10 text-purple-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No memories yet</h3>
            <p className="text-gray-500">Start creating and uploading your precious moments</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {memories.map((memory, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
              >
                {/* Memory Content */}
                <div className="p-6">
                    {/* 🔒 LOCK STATUS */}
{!memory.isUnlocked && memory.unlockDate && (
  <div className="mb-4 p-3 rounded-xl bg-gradient-to-r from-red-50 to-orange-50 border border-red-200">
    <p className="text-sm font-semibold text-red-600 mb-1">
      🔒 Unlocks in
    </p>

    {(() => {
      const time = getRemainingTime(memory.unlockDate);
      if (!time) {
        return (
          <span className="text-green-600 font-medium">
            Unlocking soon...
          </span>
        );
      }

      return (
        <div className="flex gap-3 text-sm font-medium text-gray-700">
          <span>{time.days}d</span>
          <span>{time.hours}h</span>
          <span>{time.minutes}m</span>
          <span>{time.seconds}s</span>
        </div>
      );
    })()}
  </div>
)}

                  {/* Text Content */}
                  {memory.text && (
                    <p className="text-gray-700 leading-relaxed mb-4 line-clamp-3">
                      {memory.text}
                    </p>
                  )}

                  {/* Images */}
                  {memory.images && memory.images.length > 0 && (
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Image className="w-4 h-4 text-purple-500" />
                        <span className="text-sm font-medium text-gray-600">
                          {memory.images.length} {memory.images.length === 1 ? 'Image' : 'Images'}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {memory.images.map((img, imgIdx) => (
                          <div key={imgIdx} className="relative aspect-square rounded-lg overflow-hidden group/img">
                            <img
                              src={img}
                              alt={`Memory ${idx + 1} - Image ${imgIdx + 1}`}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover/img:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity"></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Audios */}
                  {memory.audios && memory.audios.length > 0 && (
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Music className="w-4 h-4 text-pink-500" />
                        <span className="text-sm font-medium text-gray-600">
                          {memory.audios.length} Audio {memory.audios.length === 1 ? 'File' : 'Files'}
                        </span>
                      </div>
                      <div className="space-y-2">
                        {memory.audios.map((audio, audioIdx) => (
                          <div key={audioIdx} className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-3">
                            <audio
                              controls
                              src={audio}
                              className="w-full h-8"
                              style={{ maxHeight: '32px' }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Videos */}
                  {memory.videos && memory.videos.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Video className="w-4 h-4 text-blue-500" />
                        <span className="text-sm font-medium text-gray-600">
                          {memory.videos.length} Video {memory.videos.length === 1 ? 'File' : 'Files'}
                        </span>
                      </div>
                      <div className="space-y-3">
                        {memory.videos.map((video, videoIdx) => (
                          <div key={videoIdx} className="relative rounded-lg overflow-hidden bg-black">
                            <video
                              controls
                              src={video}
                              className="w-full rounded-lg"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                </div>

                {/* Card Footer */}
                <div className="px-6 py-4 bg-gradient-to-r from-purple-50 to-pink-50 border-t border-purple-100">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>Memory #{idx + 1}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}