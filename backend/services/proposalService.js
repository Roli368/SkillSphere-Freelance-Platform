import Proposal from "../models/Proposal.js";
import Gig from "../models/Gig.js";
import ApiError from "../utils/ApiError.js";
import { createNotification } from "./notificationService.js";

/**
 * Create Proposal
 */
export const createProposal = async (
  userId,
  gigId,
  data
) => {
  const gig = await Gig.findById(gigId);

  if (!gig) {
    throw new ApiError(404, "Gig not found");
  }

  // Client cannot apply to own gig
  if (gig.client.toString() === userId.toString()) {
    throw new ApiError(
      403,
      "You cannot apply to your own gig."
    );
  }

  // Already applied
  const exists = await Proposal.findOne({
    gig: gigId,
    freelancer: userId,
  });

  if (exists) {
    throw new ApiError(
      409,
      "You have already applied for this gig."
    );
  }

  const proposal = await Proposal.create({
    freelancer: userId,
    gig: gigId,
    ...data,
  });

  gig.proposalsCount += 1;
  await gig.save();

  // Notify the client
  await createNotification(
    gig.client,
    "New Proposal",
    `You have received a new proposal for your gig "${gig.title}".`,
    "proposal"
  );

  return proposal;
};

/**
 * Get All Proposals of a Gig
 */
export const getGigProposals = async (
  gigId
) => {
  return Proposal.find({
    gig: gigId,
  })
    .populate(
      "freelancer",
      "fullName avatar email"
    )
    .sort({ createdAt: -1 });
};

/**
 * Get Logged In Freelancer Proposals
 */
export const getMyProposals = async (
  userId
) => {
  return Proposal.find({
    freelancer: userId,
  })
    .populate("gig")
    .sort({ createdAt: -1 });
};

/**
 * Accept / Reject Proposal
 */
export const updateProposalStatus = async (
  proposalId,
  status
) => {
  const proposal = await Proposal.findById(
    proposalId
  ).populate("gig");

  if (!proposal) {
    throw new ApiError(
      404,
      "Proposal not found"
    );
  }

  proposal.status = status;

  await proposal.save();

  if (status === "Accepted") {
    await Gig.findByIdAndUpdate(
      proposal.gig._id,
      {
        status: "In Progress",
        hiredFreelancer:
          proposal.freelancer,
      }
    );
  }

  // Notify the freelancer
  await createNotification(
    proposal.freelancer,
    `Proposal ${status}`,
    `Your proposal for the gig "${proposal.gig.title}" has been ${status.toLowerCase()}.`,
    "proposal"
  );

  return proposal;
};