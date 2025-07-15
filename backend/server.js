import express from "express";
import productRoutes from "./routes/productRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
await connectDB();
const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("app is running");
});

app.use("/api/products", productRoutes);
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
