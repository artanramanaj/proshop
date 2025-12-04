import express from "express";
import {
  getProducts,
  getProduct,
  createProduct,
  editProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getProducts).post(protect, admin, createProduct);

router.route("/:id").get(getProduct);
router.route("/:id/edit").put(protect, admin, editProduct);
router.route("/:id/delete").delete(protect, admin, deleteProduct);
export default router;
