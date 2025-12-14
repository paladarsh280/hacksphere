import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    let folder = "memories/others";
    let resource_type = "auto";

    if (file.mimetype.startsWith("image")) folder = "memories/images";
    if (file.mimetype.startsWith("audio")) folder = "memories/audio";
    if (file.mimetype.startsWith("video")) folder = "memories/video";

    return {
      folder,
      resource_type,
    };
  },
});

export const upload = multer({ storage });
