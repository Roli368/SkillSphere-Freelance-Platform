import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import * as userService from "../services/userService.js";

export const changePassword =
  asyncHandler(async (req, res) => {
    await userService.changePassword(
      req.user._id,
      req.body.currentPassword,
      req.body.newPassword
    );

    res.json(
      new ApiResponse(
        200,
        "Password updated successfully"
      )
    );
  });