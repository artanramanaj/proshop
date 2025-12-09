import express from "express";
import {
  getProducts,
  getProduct,
  createProduct,
  editProduct,
  deleteProduct,
  reviewProduct,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getProducts).post(protect, admin, createProduct);

router.route("/:id").get(getProduct);
router.route("/:id/edit").put(protect, admin, editProduct);
router.route("/:id/delete").delete(protect, admin, deleteProduct);
router.route("/:id/reviews").post(protect, reviewProduct);
export default router;
