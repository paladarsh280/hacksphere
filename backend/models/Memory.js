import mongoose from "mongoose";

const memorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    text: String,

    images: [String],
    audios: [String],
    videos: [String],

    unlockType: {
      type: String,
      enum: ["date", "event"],
      required: true,
    },

    unlockDate: {
      type: Date,
      default: null,
    },

    unlockEvent: String,

    unlockAt: {
      type: Date,
      default: null,
    },

    isUnlocked: {
      type: Boolean,
      default: false,
    },

    recipients: [
      {
        email: { type: String, required: true },
        notified: { type: Boolean, default: false },
      },
    ],

    collaborators: [
      {
        email: { type: String, required: true },
        accepted: { type: Boolean, default: false },
        role: {
          type: String,
          enum: ["viewer", "editor"],
          default: "editor",
        },
      },
    ],

    collection: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MemoryCollection",
    },
  },
  { timestamps: true }
);

// Indexes
memorySchema.index({ "recipients.email": 1 });
memorySchema.index({ "collaborators.email": 1 });

export default mongoose.model("Memory", memorySchema);
