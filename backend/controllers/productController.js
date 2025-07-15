import Product from "../models/productModel.js";
import asyncHandler from "../middleware/asyncHandlerMiddleware.js";

// @DESC fetch all products
// GET api/products
// @ACCESS Public
export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.status(200).json(products);
});

// @DESC fetch single product
// GET api/products/:id
// @ACCESS Public
export const getProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (product) {
    res.status(200).json(product);
  }
  throw new Error("product not found");
});
