import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import * as proposalService from "../services/proposalService.js";

export const apply = asyncHandler(
  async (req, res) => {
    const proposal =
      await proposalService.createProposal(
        req.user._id,
        req.params.gigId,
        req.body
      );

    res.status(201).json(
      new ApiResponse(
        201,
        "Applied Successfully",
        proposal
      )
    );
  }
);

export const myProposals =
  asyncHandler(async (req, res) => {
    const data =
      await proposalService.myProposals(
        req.user._id
      );

    res.json(
      new ApiResponse(
        200,
        "Fetched",
        data
      )
    );
  });

export const gigProposals =
  asyncHandler(async (req, res) => {
    const data =
      await proposalService.getGigProposals(
        req.params.gigId
      );

    res.json(
      new ApiResponse(
        200,
        "Fetched",
        data
      )
    );
  });

export const updateStatus =
  asyncHandler(async (req, res) => {
    const proposal =
      await proposalService.updateStatus(
        req.params.id,
        req.body.status
      );

    res.json(
      new ApiResponse(
        200,
        "Updated",
        proposal
      )
    );
  });