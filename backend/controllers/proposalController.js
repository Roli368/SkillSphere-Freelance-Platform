import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import * as proposalService from "../services/proposalService.js";

export const createProposal =
  asyncHandler(async (req, res) => {
    const proposal =
      await proposalService.createProposal(
        req.user._id,
        req.params.gigId,
        req.body
      );

    res
      .status(201)
      .json(
        new ApiResponse(
          201,
          "Proposal submitted",
          proposal
        )
      );
  });

export const getGigProposals =
  asyncHandler(async (req, res) => {
    const proposals =
      await proposalService.getGigProposals(
        req.params.gigId
      );

    res.json(
      new ApiResponse(
        200,
        "Success",
        proposals
      )
    );
  });

export const getMyProposals =
  asyncHandler(async (req, res) => {
    const proposals =
      await proposalService.getMyProposals(
        req.user._id
      );

    res.json(
      new ApiResponse(
        200,
        "Success",
        proposals
      )
    );
  });

export const acceptProposal =
  asyncHandler(async (req, res) => {
    const proposal =
      await proposalService.updateProposalStatus(
        req.params.id,
        "Accepted"
      );

    res.json(
      new ApiResponse(
        200,
        "Accepted",
        proposal
      )
    );
  });

export const rejectProposal =
  asyncHandler(async (req, res) => {
    const proposal =
      await proposalService.updateProposalStatus(
        req.params.id,
        "Rejected"
      );

    res.json(
      new ApiResponse(
        200,
        "Rejected",
        proposal
      )
    );
  });