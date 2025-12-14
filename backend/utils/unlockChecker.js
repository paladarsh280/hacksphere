import Memory from "../models/Memory.js";

export const checkDateUnlocks = async () => {
  const now = new Date();

  await Memory.updateMany(
    {
      unlockType: "date",
      unlockDate: { $lte: now },
      isUnlocked: false,
    },
    {
      $set: { isUnlocked: true },
    }
  );
};
