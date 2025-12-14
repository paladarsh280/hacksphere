import MemoryCollection from "../models/MemoryCollection.js";
import User from "../models/User.js";

export const createCollection = async (req, res) => {
  const { title, collaboratorEmails = [] } = req.body;

  const collaborators = [];

  for (let email of collaboratorEmails) {
    const user = await User.findOne({ email });
    if (user) collaborators.push(user._id);
  }

  const collection = await MemoryCollection.create({
    title,
    owner: req.user.id,
    collaborators,
  });

  res.json(collection);
};
