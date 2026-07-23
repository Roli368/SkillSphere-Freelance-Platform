import jwt from "jsonwebtoken";
import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

/**
 * Protect Routes
 * Verifies JWT and attaches authenticated user to req.user
 */
export const protect = asyncHandler(async (req, res, next) => {
  try {
    let token;

    // Authorization Header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // Cookie Fallback (for future refresh-token support)
    if (!token && req.cookies?.accessToken) {
      token = req.cookies.accessToken;
    }

    if (!token) {
      throw new ApiError(
        401,
        "Access denied. Please login to continue."
      );
    }

    // Verify JWT
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Find User
    const user = await User.findById(decoded.id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(
        401,
        "User account not found."
      );
    }

    // Block inactive users
    if (user.isActive === false) {
      throw new ApiError(
        403,
        "Your account has been deactivated."
      );
    }

    req.user = user;

    next();

  } catch (err) {

    if (err.name === "TokenExpiredError") {
      return next(
        new ApiError(
          401,
          "Session expired. Please login again."
        )
      );
    }

    if (err.name === "JsonWebTokenError") {
      return next(
        new ApiError(
          401,
          "Invalid authentication token."
        )
      );
    }

    return next(err);
  }
});

/**
 * Role Based Authorization
 * Usage:
 * authorize("client")
 * authorize("freelancer")
 * authorize("admin")
 * authorize("admin","client")
 */
export const authorize = (...roles) => {
  return (req, res, next) => {

    if (!req.user) {
      return next(
        new ApiError(
          401,
          "Authentication required."
        )
      );
    }

    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError(
          403,
          `Access denied. Required role: ${roles.join(
            " or "
          )}`
        )
      );
    }

    next();
  };
};