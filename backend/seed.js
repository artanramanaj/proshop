import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import Order from "./models/orderModel.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import products from "./data/products.js";
import users from "./data/users.js";
import connectDB from "./config/db.js";

const importData = async () => {
  try {
    await connectDB();
    await Order.deleteMany();
    await User.deleteMany();
    await Product.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => ({
      ...product,
      user: adminUser,
    }));

    console.log("check sample", sampleProducts);

    await Product.insertMany(sampleProducts);

    console.log(" Data Imported Successfully");
    process.exit();
  } catch (error) {
    console.error("Import Failed:", error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await connectDB();

    await Order.deleteMany();
    await User.deleteMany();
    await Product.deleteMany();

    console.log("Data Destroyed");
    process.exit();
  } catch (error) {
    console.error(" Destroy Failed:", error);
    process.exit(1);
  }
};

// Call correct function based on CLI argument
if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
