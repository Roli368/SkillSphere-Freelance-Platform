import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import * as authService from "../services/authService.js";
import { cookieOptions } from "../utils/cookieOptions.js";

export const register = asyncHandler(async (req, res) => {
  const data = await authService.registerUser(req.body);

  res.cookie("refreshToken", data.refreshToken, cookieOptions);

  return res.status(201).json(
    new ApiResponse(201, "Registration successful", {
      accessToken: data.accessToken,
      user: data.user,
    })
  );
});

export const login = asyncHandler(async (req, res) => {
  const data = await authService.loginUser(req.body);

  res.cookie("refreshToken", data.refreshToken, cookieOptions);

  return res.status(200).json(
    new ApiResponse(200, "Login successful", {
      accessToken: data.accessToken,
      user: data.user,
    })
  );
});

export const profile = asyncHandler(async (req, res) => {
  const user = await authService.getProfile(req.user._id);

  return res.status(200).json(
    new ApiResponse(200, "Profile fetched successfully.", user)
  );
});

export const updateProfile = asyncHandler(async (req, res) => {
  const user = await authService.updateProfile(req.user._id, req.body);

  return res.status(200).json(
    new ApiResponse(200, "Profile updated successfully.", user)
  );
});

export const logout = asyncHandler(async (req, res) => {
  await authService.logout(req.user._id);

  res.clearCookie("refreshToken");

  return res
    .status(200)
    .json(new ApiResponse(200, "Logged out successfully."));
});