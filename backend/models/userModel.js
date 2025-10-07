import mongoose from "mongoose";
import { type } from "os";
import bcrypt from "bcryptjs";
import { comparePassword } from "../utils/securePassword.js";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  // return await bcrypt.compare(enteredPassword, this.password);
  return await comparePassword(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
