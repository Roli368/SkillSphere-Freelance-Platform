import Proposal from "../models/Proposal.js";
import Gig from "../models/Gig.js";
import ApiError from "../utils/ApiError.js";

export const createProposal = async (userId, gigId, data) => {
  const gig = await Gig.findById(gigId);

  if (!gig)
    throw new ApiError(404, "Gig not found");

  const exists = await Proposal.findOne({
    gig: gigId,
    freelancer: userId,
  });

  if (exists)
    throw new ApiError(
      409,
      "Already applied"
    );

  const proposal = await Proposal.create({
    freelancer: userId,
    gig: gigId,
    ...data,
  });

  gig.proposalsCount += 1;

  await gig.save();

  return proposal;
};

export const getGigProposals = async (
  gigId
) => {
  return Proposal.find({
    gig: gigId,
  }).populate(
    "freelancer",
    "fullName avatar"
  );
};

export const myProposals = async (
  userId
) => {
  return Proposal.find({
    freelancer: userId,
  }).populate("gig");
};

export const updateStatus = async (
  proposalId,
  status
) => {
  return Proposal.findByIdAndUpdate(
    proposalId,
    {
      status,
    },
    {
      new: true,
    }
  );
};