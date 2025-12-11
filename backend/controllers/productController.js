import Product from "../models/productModel.js";
import asyncHandler from "../middleware/asyncHandlerMiddleware.js";
// @DESC fetch all products
// GET api/products
// @ACCESS Public
export const getProducts = asyncHandler(async (req, res) => {
  let page = parseInt(req.query.page) || 1;
  let limit = parseInt(req.query.limit) || 8;

  const search = req.query.search || "";

  const filter = search
    ? {
        name: {
          $regex: search,
          $options: "i", // case insensitive
        },
      }
    : {};

  const count = await Product.countDocuments(filter);

  const products = await Product.find(filter)
    .skip(limit * (page - 1))
    .limit(limit)
    .sort({ createdAt: -1 });

  return res.status(200).json({
    totalPages: Math.ceil(count / limit),
    currentPage: page,
    products,
  });
});

// @DESC get top products
// GET api/products/top
// @ACCESS Public
export const topProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
    .sort({ rating: -1, createdAt: -1 }) // combine sorting
    .limit(3);

  return res.status(200).json({
    products,
  });
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

// @DESC Review product
// PUT /api/products/:id/review
// @ACCESS Private
export const reviewProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { rating, comment } = req.body;

  const product = await Product.findById(id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  const userReviewed = product.review.find((el) => {
    return el.user.toString() === req.user._id.toString();
  });

  if (userReviewed) {
    res.status(404);
    throw new Error("You have already reviewed this product");
  } else if (!req.user._id) {
    res.status(401);
    throw new Error("You need to be a logged in  to make a review");
  }

  product.review.push({
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  });
  const totalRate = product.review.reduce((acc, el) => acc + el.rating, 0);

  product.numReviews = product.review.length;
  product.rating = totalRate / product.numReviews;

  await product.save();

  res.status(201).json({
    message: "Review added successfully",
    product,
  });
});
