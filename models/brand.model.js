import { model, Schema } from "mongoose";

const BrandSchema = new Schema(
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
  },
  { timestamps: true }
);
export const Brand = model("Brand", BrandSchema);
