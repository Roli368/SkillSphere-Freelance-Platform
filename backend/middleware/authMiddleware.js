import jwt from "jsonwebtoken";
import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

/**
 * Protect Routes
 * Verifies JWT and attaches authenticated user to req.user
 */
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check Authorization Header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    throw new ApiError(401, "Access denied. Please login to continue.");
  }

  // Verify Token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // Find User
  const user = await User.findById(decoded.id).select("-password");

  if (!user) {
    throw new ApiError(401, "User not found.");
  }

  req.user = user;

  next();
});

/**
 * Role Based Authorization
 * Usage:
 * authorize("admin")
 * authorize("client")
 * authorize("freelancer")
 * authorize("admin", "client")
 */
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError(
          403,
          "You are not authorized to access this resource."
        )
      );
    }

    next();
  };
};