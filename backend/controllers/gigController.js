import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import * as gigService from "../services/gigService.js";

export const createGig = asyncHandler(async (req, res) => {
  const gig = await gigService.createGig(req.user._id, req.body);

  res.status(201).json(
    new ApiResponse(201, "Gig created successfully", gig)
  );
});

export const getAllGigs = asyncHandler(async (req, res) => {
  const gigs = await gigService.getAllGigs(req.query);

  res.status(200).json(
    new ApiResponse(200, "Gigs fetched", gigs)
  );
});

export const getMyGigs = asyncHandler(async (req, res) => {
  const gigs = await gigService.getMyGigs(req.user._id);

  return res.status(200).json(
    new ApiResponse(
      200,
      "My gigs fetched successfully",
      gigs
    )
  );
});

export const getGig = asyncHandler(async (req, res) => {
  const gig = await gigService.getGigById(req.params.id);

  res.status(200).json(
    new ApiResponse(200, "Gig fetched", gig)
  );
});

export const updateGig = asyncHandler(async (req, res) => {
  const gig = await gigService.updateGig(
    req.params.id,
    req.user._id,
    req.body
  );

  res.status(200).json(
    new ApiResponse(200, "Gig updated", gig)
  );
});

export const deleteGig = asyncHandler(async (req, res) => {
  await gigService.deleteGig(req.params.id, req.user._id);

  res.status(200).json(
    new ApiResponse(200, "Gig deleted")
  );
});