import { model, Schema } from "mongoose";

const MediaSchema = new Schema(
  {
    asset_id: {
      type: String,
      required: true,
    },
    public_id: {
      type: String,
      required: true,
      index: {
        unique: true,
      },
    },
    resource_type: {
      type: String,
      required: true,
    },
    folder: {
      type: String,
      required: true,
    },
    original_filename: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
export const Media = model("Media", MediaSchema);
