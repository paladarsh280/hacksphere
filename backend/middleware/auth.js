import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const isLoggedIn = async (req, res, next) => {
  try {
    let token;

    // Token from header → "Authorization: Bearer xyz"
    const authHeader = req.headers["authorization"];
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    // If no token
    if (!token) {
      return res.status(401).json({ message: "No token, unauthorized" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Attach user to request
    req.user = user;

    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};