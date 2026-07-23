import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import * as reviewService from "../services/reviewService.js";

export const addReview =
  asyncHandler(async (req, res) => {
    const review =
      await reviewService.addReview({
        ...req.body,
        reviewer: req.user._id,
      });

    res.json(
      new ApiResponse(
        201,
        "Review Added",
        review
      )
    );
  });

export const getReviews =
  asyncHandler(async (req, res) => {
    const reviews =
      await reviewService.getUserReviews(
        req.params.userId
      );

    res.json(
      new ApiResponse(
        200,
        "Success",
        reviews
      )
    );
  });