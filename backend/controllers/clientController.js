import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import * as clientService from "../services/clientService.js";

export const createProfile = asyncHandler(async (req, res) => {
  const profile = await clientService.createProfile(
    req.user._id,
    req.body
  );

  res
    .status(201)
    .json(new ApiResponse(201, "Profile created", profile));
});

export const getMyProfile = asyncHandler(async (req, res) => {
  const profile = await clientService.getMyProfile(req.user._id);

  res
    .status(200)
    .json(new ApiResponse(200, "Profile fetched", profile));
});

export const updateProfile = asyncHandler(async (req, res) => {
  const profile = await clientService.updateProfile(
    req.user._id,
    req.body
  );

  res
    .status(200)
    .json(new ApiResponse(200, "Profile updated", profile));
});

export const getPublicProfile = asyncHandler(async (req, res) => {
  const profile = await clientService.getPublicProfile(req.params.id);

  res
    .status(200)
    .json(new ApiResponse(200, "Profile fetched", profile));
});