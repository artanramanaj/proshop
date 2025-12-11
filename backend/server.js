import path from "path";
import express from "express";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
await connectDB();
const app = express();
const PORT = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));
app.use("/api/upload", uploadRoutes);
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  // Any route that is not API will be redirected to index.html
  app.get(/.*/, (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "..", "frontend", "build", "index.html")
    );
  });
} else {
  app.get("/", (req, res) => {
    res.send("app is running");
  });
}
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
