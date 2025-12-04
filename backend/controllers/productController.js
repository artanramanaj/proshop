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
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @DESC CREATE  product
// POST api/products
// @ACCESS Admin
export const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample name",
    price: 0,
    user: req.user.id,
    image: "/assets/images/sample.png",
    brand: "Sample brand",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });
  const newProduct = await product.save();
  res.status(201).json({ message: "product created", data: newProduct });
});

// @DESC edit   product
// Put api/products/:id/edit
// @ACCESS Admin
export const editProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, price, image, brand, category, countInStock, description } =
    req.body;
  console.log("check the id", id);
  let updateProduct = await Product.findOneAndUpdate(
    { _id: id },
    {
      name,
      price,
      image,
      brand,
      category,
      countInStock,
      description,
    },
    { new: true }
  );
  if (updateProduct) {
    res.status(201).json({ message: "product updated " });
  } else {
    res.status(404);
    throw new Error("Product not edited");
  }
});

// @DESC delete   product
// Put api/products/:id/delete
// @ACCESS Admin
export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);
  res.status(201).json({ message: "product deleted successfully" });
});
