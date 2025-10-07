import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const productSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      requried: true,
    },
    category: {
      type: String,
      requried: true,
    },
    description: {
      type: String,
      requried: true,
    },

    review: [reviewSchema],
    rating: {
      type: Number,
      requried: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      requried: true,
      default: 0,
    },

    price: {
      type: Number,
      requried: true,
      default: 0,
    },
    qty: {
      type: Number,
      default: 1,
    },
    countInStock: {
      type: Number,
      requried: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
