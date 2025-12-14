import validator from "validator";
import Memory from "../models/Memory.js";
import { sendUnlockEmail,sendCollabInviteEmail } from "../services/emailService.js";

export const createMemory = async (req, res) => {
  try {
    let {
      text,
      unlockType,
      unlockDate,
      unlockEvent,
      recipients = [],
      collaborators = [],
    } = req.body;

    const now = new Date();

    /* ================= NORMALIZE RECIPIENTS ================= */
    if (typeof recipients === "string") {
      recipients = JSON.parse(recipients);
    }
    if (!Array.isArray(recipients)) {
      recipients = [recipients];
    }
    const validRecipients = recipients.filter(email => validator.isEmail(email));

    /* ================= NORMALIZE COLLABORATORS ================= */
    if (typeof collaborators === "string") {
      collaborators = JSON.parse(collaborators);
    }
    if (!Array.isArray(collaborators)) {
      collaborators = [collaborators];
    }
    const validCollaborators = collaborators.filter(email => validator.isEmail(email));

    /* ================= UNLOCK LOGIC ================= */
    let isUnlocked = false;
    let unlockAt = null;

    if (unlockType === "instant") {
      isUnlocked = true;
      unlockAt = now;
    } else if (unlockType === "date") {
      if (!unlockDate) {
        return res.status(400).json({ message: "Unlock date required" });
      }
      unlockAt = new Date(unlockDate);
      if (unlockAt <= now) isUnlocked = true;
    } else if (unlockType === "event" && !unlockEvent) {
      return res.status(400).json({ message: "Unlock event required" });
    }

    /* ================= CREATE MEMORY ================= */
    const memory = await Memory.create({
  user: req.user.id,
  text,

  images: req.files?.images?.map(f => f.path) || [],
  audios: req.files?.audios?.map(f => f.path) || [],
  videos: req.files?.videos?.map(f => f.path) || [],

  unlockType,
  unlockDate: unlockType === "date" ? unlockDate : null,
  unlockEvent: unlockType === "event" ? unlockEvent : null,
  unlockAt,
  isUnlocked,

  recipients: validRecipients.map(email => ({
    email,
    notified: false,
  })),

  collaborators: validCollaborators.map(email => ({
    email,
    accepted: false,
  })),
});

/* 🔔 SEND COLLABORATOR INVITES */
Promise.all(
  validCollaborators.map(email =>
    sendCollabInviteEmail(email, memory)
  )
).catch(err =>
  console.error("Collaborator email error:", err.message)
);

/* 📧 SEND RECIPIENT EMAILS ONLY WHEN UNLOCKED */
if (isUnlocked) {
  Promise.all(
    validRecipients.map(email =>
      sendUnlockEmail(email, memory).then(() => {
        const r = memory.recipients.find(r => r.email === email);
        if (r) r.notified = true;
      })
    )
  )
    .then(() => memory.save())
    .catch(err =>
      console.error("Recipient email error:", err.message)
    );
}


    /* ================= SEND COLLAB INVITE EMAILS ================= */
    if (validCollaborators.length > 0) {
      const collabResults = await Promise.allSettled(
        validCollaborators.map(email => sendCollabInviteEmail(email, memory))
      );
      collabResults.forEach((result, idx) => {
        if (result.status === "rejected") {
          console.error(`Collab email failed for ${validCollaborators[idx]}:`, result.reason);
        }
      });
    }

    /* ================= SEND UNLOCK EMAILS ================= */
    if (isUnlocked && validRecipients.length > 0) {
      const unlockResults = await Promise.allSettled(
        validRecipients.map(async email => {
          await sendUnlockEmail(email, memory);
          const r = memory.recipients.find(r => r.email === email);
          if (r) r.notified = true;
        })
      );
      unlockResults.forEach((result, idx) => {
        if (result.status === "rejected") {
          console.error(`Unlock email failed for ${validRecipients[idx]}:`, result.reason);
        }
      });
      await memory.save();
    }

    return res.status(201).json(memory);

  } catch (err) {
    console.error("Create memory error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};


/* ================= GET MY MEMORIES ================= */

export const getMyMemories = async (req, res) => {
  const memories = await Memory.find({ user: req.user.id });

  const filtered = memories.map(m => {
    if (!m.isUnlocked) {
      return {
        _id: m._id,
        text: "🔒 Locked Memory",
        unlockType: m.unlockType,
        unlockDate: m.unlockDate,
        unlockEvent: m.unlockEvent,
        isUnlocked: false,
      };
    }
    return m;
  });

  res.json(filtered);
};

/* ================= UNLOCK BY EVENT ================= */

export const unlockByEvent = async (req, res) => {
  const { eventName } = req.body;

  const result = await Memory.updateMany(
    {
      user: req.user.id,
      unlockType: "event",
      unlockEvent: eventName,
      isUnlocked: false,
    },
    { $set: { isUnlocked: true } }
  );

  res.json({
    message: `Unlocked ${result.modifiedCount} memories for event ${eventName}`,
  });
};
