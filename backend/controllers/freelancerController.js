import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import * as freelancerService from "../services/freelancerService.js";

export const createProfile = asyncHandler(async (req, res) => {
  const profile = await freelancerService.createProfile(
    req.user._id,
    req.body
  );

  return res.status(201).json(
    new ApiResponse(201, "Profile created successfully", profile)
  );
});

export const getMyProfile = asyncHandler(async (req, res) => {
  const profile = await freelancerService.getMyProfile(req.user._id);

  return res.status(200).json(
    new ApiResponse(200, "Profile fetched successfully", profile)
  );
});

export const updateProfile = asyncHandler(async (req, res) => {
  const profile = await freelancerService.updateProfile(
    req.user._id,
    req.body
  );

  return res.status(200).json(
    new ApiResponse(200, "Profile updated successfully", profile)
  );
});

export const getPublicProfile = asyncHandler(async (req, res) => {
  const profile = await freelancerService.getPublicProfile(
    req.params.id
  );

  return res.status(200).json(
    new ApiResponse(200, "Profile fetched successfully", profile)
  );
});

export const searchFreelancers = asyncHandler(async (req, res) => {
  const profiles = await freelancerService.searchFreelancers(
    req.query
  );

  return res.status(200).json(
    new ApiResponse(200, "Freelancers fetched", profiles)
  );
});