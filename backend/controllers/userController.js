import asyncHandler from "../middleware/asyncHandlerMiddleware.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { encryptPassword, comparePassword } from "../utils/securePassword.js";
// @DESC fetch auth user
// POST api/users/login
// @ACCESS Public
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = jwt.sign(
      { userId: user._id, isAdmin: user.isAdmin },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json([
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    ]);
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @DESC register user
// POST api/users/register
// @ACCESS Public
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await encryptPassword(password);
  const emailExist = await User.findOne({ email });
  if (emailExist) {
    throw new Error("email already exist");
  }
  await User.create({ name, email, password: hashedPassword });
  res.status(200).json("user registered successfully");
});

// @DESC logout user / clear cookie
// POST api/users/logout
// @ACCESS Private
export const logoutUser = asyncHandler(async (req, res) => {
  const { jwt: token } = req.cookies;

  if (token) {
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
    });
    return res.status(200).json({ message: "Successfully logged out" });
  }

  res.status(404);
  throw new Error("You are already logged out");
});

// @DESC Get user profile
// GET api/users/profile
// @ACCESS Private
export const getUserProfile = asyncHandler(async (req, res) => {
  const { user } = req;
  if (user) {
    return res.status(200).json({ user });
  }
  res.status(404);
  throw new Error("user does not exist");
});

// @DESC update user profile
// PUT api/users/profile
// @ACCESS Private
export const updateUserProfile = asyncHandler(async (req, res) => {
  const { user } = req;
  const { name, email, password } = req.body;

  const emailExist = await User.findOne({ email, _id: { $ne: user._id } });
  if (emailExist) {
    res.status(400);
    throw new Error("Email already exists");
  }

  const updatedUser = await User.findOneAndUpdate(
    { _id: user._id },
    {
      name,
      email,
      password: await encryptPassword(password),
    },
    { new: true }
  );

  if (!updatedUser) {
    res.status(404);
    throw new Error("User not found");
  }

  res.status(200).json({
    message: "Profile updated successfully",
    user: updatedUser,
  });
});

// @DESC GET  users
// GET api/users
// @ACCESS Private/Admin
export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});

// @DESC GET  specific user
// GET api/users/:id
// @ACCESS Private/Admin
export const getUserById = asyncHandler(async (req, res) => {
  const { id: userId } = req.params;
  if (userId) {
    const user = await User.findById({ _id: userId });
    return res.status(200).json(user);
  }
  throw new Error("there is no user with this id or the userid didn't match");
});

// @DESC delete   users
// DELETE api/users/:id
// @ACCESS Private/Admin
export const deleteUser = asyncHandler(async (req, res) => {
  const { id: userId } = req.params;
  if (userId) {
    await User.findOneAndDelete({ _id: userId });
  }
  // Fetch all remaining users
  const remainingUsers = await User.find();

  res.status(200).json({
    message: "User deleted successfully",
    users: remainingUsers,
  });
});

// @DESC update user
// PUT api/users/:id
// @ACCESS Private/Admin
export const updateUser = asyncHandler(async (req, res) => {
  const { id: userId } = req.params;
  const { name, email, password } = req.body;
  const emailexist = await User.findOne({ email, _id: { $ne: userId } });
  console.log("email exist", emailexist);
  if (emailexist) {
    res.status(400);
    throw new Error("Email already exists");
  } else {
    const user = await User.findOneAndUpdate(
      { _id: userId },
      {
        name,
        email,
        password: await encryptPassword(password),
      },
      {
        new: true,
      }
    );
    res.status(200).json({ message: "user has been updated", user });
  }
});
