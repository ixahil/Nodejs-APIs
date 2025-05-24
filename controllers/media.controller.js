import path from "path";
import sharp from "sharp";
import AsyncHandler from "../middleware/asyncHandler.js";
import { Media } from "../models/media.model.js";
import { AppError } from "../utils/AppError.js";
import AppResponse from "../utils/AppResponse.js";
import cloudinary from "../utils/cloudinary.js";

export const uploadMedia = AsyncHandler(async (req, res) => {
  // #swagger.tags = ['Media']
  // #swagger.description = 'Upload Media'
  // #swagger.parameters['file'] = { in: 'formData', type:'string', required: true }

  let files = Array.isArray(req.files?.images)
    ? req.files.images
    : [req.files.images];

  const media = [];

  if (files) {
    for (const file of files) {
      const originalPath = file.tempFilePath;

      // Generate temp path for compressed image
      const compressedPath = path.join(
        path.dirname(originalPath),
        `compressed-${Date.now()}-${file.name}`
      );

      // Compress and write to temp file
      await sharp(originalPath)
        .resize({ width: 1000 }) // optional resize
        .jpeg({ quality: 75 }) // compress
        .toFile(compressedPath);

      // Upload compressed file
      const result = await cloudinary.uploader.upload(compressedPath, {
        folder: "ecommerce",
        public_id: file.name,
        overwrite: true,
        transformation: {
          crop: "scale",
          format: "auto",
          fetch_format: "auto",
        },
      });

      media.push(
        await Media.findOneAndUpdate(
          { public_id: result.public_id, user: req.user._id },
          { ...result, user: req.user._id },
          {
            upsert: true,
            returnDocument: "after",
          }
        )
      );

      // Clean up both files
      // await fs.unlink(originalPath).catch(() => {});
      // await fs.unlink(compressedPath).catch(() => {});
    }

    res
      .status(201)
      .json(new AppResponse(201, media, "Media uploaded successfully"));
  } else {
    throw AppError(400, "Invalid or no files");
  }
});
