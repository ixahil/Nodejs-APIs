import { model, Schema } from "mongoose";

const CollectionSchema = new Schema(
  {
    slug: {
      type: String,
      required: true,
      index: {
        unique: true,
      },
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: Schema.Types.ObjectId,
      ref: "Media",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
export const Collection = model("Collection", CollectionSchema);
