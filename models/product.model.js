import { model, Schema } from "mongoose";

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Product Name is required"],
    },
    sku: {
      type: String,
      required: [true, "Product SKU is required"],
      unique: true,
      index: {
        unique: true,
      },
    },
    description: String,
    collections: [
      {
        type: Schema.Types.ObjectId,
        ref: "Collection",
      },
    ],
    brand: {
      type: Schema.Types.ObjectId,
      ref: "Brand",
      default: "Brand",
    },
    price: {
      default: 0,
      type: Number,
    },
    salePrice: {
      default: 0,
      type: Number,
    },
    stock: {
      default: 0,
      type: Number,
    },
    images: {
      type: [
        {
          url: String,
          public_id: String,
        },
      ],
      default: [],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isVisible: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      enum: ["ACTIVE", "DRAFT", "DELETED"],
      default: "ACTIVE",
    },
    handle: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { timestamps: true }
);

export const Product = model("Product", ProductSchema);
