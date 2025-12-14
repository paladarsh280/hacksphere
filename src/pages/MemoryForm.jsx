


import React, { useState } from "react";
import axios from "axios";
import {
  Sparkles,
  Star,
  Music,
  Video,
  Upload,
  X,
  Calendar,
  Users,
  FileText
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import CollaboratorInput from "../component/CollaboratorInput";
import memoriesformbg from "../assets/memoriesformbg.jpg";
export default function MemoryForm() {
  const [imageFiles, setImageFiles] = useState([]);
  const [audioFiles, setAudioFiles] = useState([]);
  const [videoFiles, setVideoFiles] = useState([]);

  const [recipients, setRecipients] = useState([]);
  const [emailInput, setEmailInput] = useState("");

  const [unlockType, setUnlockType] = useState("date");
  const [addCollaborators, setAddCollaborators] = useState(false);
  const [collaboratorEmails, setCollaboratorEmails] = useState([]);
  const [collectionTitle, setCollectionTitle] = useState("");
  const [collaboratorInput, setCollaboratorInput] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  /* ---------------- FILE HANDLERS ---------------- */
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(prev => [...prev, ...files]);
  };

  const handleAudioChange = (e) => {
    const files = Array.from(e.target.files);
    setAudioFiles(prev => [...prev, ...files]);
  };

  const handleVideoChange = (e) => {
    const files = Array.from(e.target.files);
    setVideoFiles(prev => [...prev, ...files]);
  };

  const removeImage = (index) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index));
  };

  const removeAudio = (index) => {
    setAudioFiles(prev => prev.filter((_, i) => i !== index));
  };

  const removeVideo = (index) => {
    setVideoFiles(prev => prev.filter((_, i) => i !== index));
  };

  /* ---------------- SUBMIT ---------------- */
  const submit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);

    /* 🔑 IMPORTANT: correct field names */
    formData.set("unlockType", unlockType);
    formData.set("recipients", JSON.stringify(recipients));
    formData.set("collaborators", JSON.stringify(collaboratorEmails));
    formData.set("collectionTitle", collectionTitle);

    imageFiles.forEach(file => formData.append("images", file));
    audioFiles.forEach(file => formData.append("audios", file));
    videoFiles.forEach(file => formData.append("videos", file));

    if (unlockType === "date" && !formData.get("unlockDate")) {
      alert("Please select an unlock date");
      setIsSubmitting(false);
      return;
    }

    if (unlockType === "event" && !formData.get("unlockEvent")) {
      alert("Please select an unlock event");
      setIsSubmitting(false);
      return;
    }

    if (recipients.length === 0) {
      alert("Please add at least one recipient");
      setIsSubmitting(false);
      return;
    }

    try {
      await axios.post(
        "https://hacksphere-e64m.onrender.com/api/memory/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Memory created successfully 🎉");

      e.target.reset();
      setImageFiles([]);
      setAudioFiles([]);
      setVideoFiles([]);
      setRecipients([]);
      setCollaboratorEmails([]);
      setUnlockType("date");
      setCollectionTitle("");

    } catch (err) {
      console.error(err);
      alert("Memory creation failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ---------------- RECIPIENT HANDLERS ---------------- */
  const addRecipient = () => {
    if (!emailInput.includes("@")) return;
    if (recipients.includes(emailInput)) return;
    setRecipients([...recipients, emailInput]);
    setEmailInput("");
  };

  const removeRecipient = (i) =>
    setRecipients(r => r.filter((_, x) => x !== i));

  /* ---------------- COLLABORATOR HANDLERS ---------------- */
  const addCollaborator = () => {
    if (!collaboratorInput.includes("@")) return;
    if (collaboratorEmails.includes(collaboratorInput)) return;
    setCollaboratorEmails([...collaboratorEmails, collaboratorInput]);
    setCollaboratorInput("");
  };

  const removeCollaborator = (i) =>
    setCollaboratorEmails(emails => emails.filter((_, x) => x !== i));

  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-12 px-4"  
    style={{ backgroundImage: `url(${memoriesformbg})` }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl mb-4 shadow-lg">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Create a Memory
          </h1>
          <p className="text-gray-600">Capture moments that matter, unlock them when the time is right</p>
        </div>

        <form onSubmit={submit} className="space-y-6">
          {/* Main Content Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
            {/* Memory Text */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                <FileText className="w-4 h-4 text-purple-600" />
                Your Memory
              </label>
              <textarea
                name="text"
                rows="6"
                placeholder="Write your memory here... Share your thoughts, feelings, or a special message for the future."
                className="w-full border-2 border-gray-200 p-4 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all resize-none"
              />
            </div>

            {/* Collection Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Collection Title (Optional)
              </label>
              <input
                type="text"
                value={collectionTitle}
                onChange={(e) => setCollectionTitle(e.target.value)}
                placeholder="e.g., Summer 2024, Family Vacation"
                className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
              />
            </div>

            {/* Media Upload Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Upload className="w-4 h-4 text-purple-600" />
                Add Media
              </h3>

              <div className="grid md:grid-cols-3 gap-4">
                {/* Images */}
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-purple-400 transition-all">
                  <label className="cursor-pointer block text-center">
                    <Upload className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                    <span className="text-sm font-medium text-gray-700 block mb-1">Images</span>
                    <span className="text-xs text-gray-500">Click to upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                  {imageFiles.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <p className="text-xs text-gray-600 font-medium mb-2">{imageFiles.length} file(s)</p>
                      <div className="space-y-1 max-h-32 overflow-y-auto">
                        {imageFiles.map((file, idx) => (
                          <div key={idx} className="flex items-center justify-between bg-purple-50 p-2 rounded-lg text-xs">
                            <span className="truncate flex-1">{file.name}</span>
                            <button
                              type="button"
                              onClick={() => removeImage(idx)}
                              className="ml-2 text-red-500 hover:text-red-700"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Audio */}
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-purple-400 transition-all">
                  <label className="cursor-pointer block text-center">
                    <Music className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                    <span className="text-sm font-medium text-gray-700 block mb-1">Audio</span>
                    <span className="text-xs text-gray-500">Click to upload</span>
                    <input
                      type="file"
                      accept="audio/*"
                      multiple
                      onChange={handleAudioChange}
                      className="hidden"
                    />
                  </label>
                  {audioFiles.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <p className="text-xs text-gray-600 font-medium mb-2">{audioFiles.length} file(s)</p>
                      <div className="space-y-1 max-h-32 overflow-y-auto">
                        {audioFiles.map((file, idx) => (
                          <div key={idx} className="flex items-center justify-between bg-purple-50 p-2 rounded-lg text-xs">
                            <span className="truncate flex-1">{file.name}</span>
                            <button
                              type="button"
                              onClick={() => removeAudio(idx)}
                              className="ml-2 text-red-500 hover:text-red-700"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Video */}
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-purple-400 transition-all">
                  <label className="cursor-pointer block text-center">
                    <Video className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                    <span className="text-sm font-medium text-gray-700 block mb-1">Videos</span>
                    <span className="text-xs text-gray-500">Click to upload</span>
                    <input
                      type="file"
                      accept="video/*"
                      multiple
                      onChange={handleVideoChange}
                      className="hidden"
                    />
                  </label>
                  {videoFiles.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <p className="text-xs text-gray-600 font-medium mb-2">{videoFiles.length} file(s)</p>
                      <div className="space-y-1 max-h-32 overflow-y-auto">
                        {videoFiles.map((file, idx) => (
                          <div key={idx} className="flex items-center justify-between bg-purple-50 p-2 rounded-lg text-xs">
                            <span className="truncate flex-1">{file.name}</span>
                            <button
                              type="button"
                              onClick={() => removeVideo(idx)}
                              className="ml-2 text-red-500 hover:text-red-700"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Unlock Settings Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-600" />
              Unlock Settings
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Unlock Type</label>
                <select
                  value={unlockType}
                  onChange={(e) => setUnlockType(e.target.value)}
                  className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                >
                  <option value="date">Unlock by Date</option>
                  <option value="event">Unlock by Event</option>
                </select>
              </div>

              {unlockType === "date" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
                  <input
                    type="date"
                    name="unlockDate"
                    className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                  />
                </div>
              )}

              {unlockType === "event" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Event</label>
                  <select
                    name="unlockEvent"
                    className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                  >
                    <option value="">Select Event</option>
                    <option value="graduation">Graduation</option>
                    <option value="wedding">Wedding</option>
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* Recipients Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-4">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-600" />
              Recipients
            </h3>

            <div className="flex gap-2">
              <input
                type="email"
                value={emailInput}
                placeholder="Enter recipient email"
                onChange={(e) => setEmailInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addRecipient();
                  }
                }}
                className="flex-1 border-2 border-gray-200 p-3 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
              />
              <button
                type="button"
                onClick={addRecipient}
                className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors font-medium"
              >
                Add
              </button>
            </div>

            {recipients.length > 0 && (
              <div className="flex flex-wrap gap-2 p-4 bg-gray-50 rounded-xl">
                {recipients.map((email, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-md"
                  >
                    {email}
                    <button
                      type="button"
                      onClick={() => removeRecipient(i)}
                      className="hover:bg-white hover:bg-opacity-20 rounded-full p-0.5 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Collaborators Card */}
      

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Creating Memory...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5" />
                Create Memory
              </span>
            )}
          </button>
        </form>

        {/* View Memories Link */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate("/my-memory")}
            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold transition-colors"
          >
            <Star className="w-5 h-5" />
            View My Memories
          </button>
        </div>
      </div>
    </div>
  );
}