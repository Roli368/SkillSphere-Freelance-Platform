import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import * as favoriteService from "../services/favoriteService.js";

export const toggleFavorite = asyncHandler(
  async (req, res) => {
    const result =
      await favoriteService.toggleFavorite(
        req.user._id,
        req.params.gigId
      );

    res.json(
      new ApiResponse(
        200,
        "Favorite updated successfully",
        result
      )
    );
  }
);

export const getFavorites = asyncHandler(
  async (req, res) => {
    const favorites =
      await favoriteService.getFavorites(
        req.user._id
      );

    res.json(
      new ApiResponse(
        200,
        "Favorites fetched successfully",
        favorites
      )
    );
  }
);