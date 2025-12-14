import cron from "node-cron";
import Memory from "../models/Memory.js";
import { sendUnlockEmail } from "../services/emailService.js";

export const startUnlockCron = () => {
  cron.schedule("0 * * * *", async () => {
    const now = new Date();

    const memories = await Memory.find({
      unlockType: "date",
      unlockDate: { $lte: now },
      isUnlocked: false,
    });

    for (const memory of memories) {
      memory.isUnlocked = true;
      await sendUnlockEmail(memory.recipients, memory);
      memory.emailSent = true;
      await memory.save();
    }
  });
};
