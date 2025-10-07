import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "./asyncHandlerMiddleware.js";

export const protect = asyncHandler(async (req, res, next) => {
  const { jwt: token } = req.cookies;
  if (token) {
    const tokenVerify = jwt.verify(token, process.env.SECRET_KEY);
    if (tokenVerify) {
      req.user = await User.findById(tokenVerify.userId).select("-password");
      next();
    } else {
      res.status(401);
      throw new Error("not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

export const admin = (req, res, next) => {
  const { user } = req;
  if (user && user.isAdmin === true) {
    return next();
  }
  throw new Error("Only administrators have access to this page");
};
