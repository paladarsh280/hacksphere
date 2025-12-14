import express from "express";
import { isLoggedIn } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";
import { createMemory, getMyMemories } from "../controllers/memoryController.js";
import { unlockByEvent } from "../controllers/memoryController.js";
const router = express.Router();

router.post(
  "/create",
  isLoggedIn,
  upload.fields([
    { name: "images", maxCount: 5 },
    { name: "audios", maxCount: 2 },
    { name: "videos", maxCount: 2 },
  ]),
  createMemory
);

router.get("/my", isLoggedIn, getMyMemories);

router.post("/unlock-event", isLoggedIn, unlockByEvent);

router.get("/accept-collab/:id", async (req, res) => {
  const { email } = req.query;

  await Memory.updateOne(
    { _id: req.params.id, "collaborators.email": email },
    { $set: { "collaborators.$.accepted": true } }
  );

  res.send("Collaboration accepted successfully");
});

export default router;
