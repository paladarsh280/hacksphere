import mongoose from "mongoose";

const memoryCollectionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    collaborators: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("MemoryCollection", memoryCollectionSchema);
