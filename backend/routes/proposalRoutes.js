import express from "express";

import {
  createProposal,
  getGigProposals,
  getMyProposals,
  acceptProposal,
  rejectProposal,
} from "../controllers/proposalController.js";

import { protect, authorize } from "../middleware/authMiddleware.js";
import validate from "../middleware/validate.js";
import { proposalSchema } from "../validators/proposalSchemas.js";

const router = express.Router();

router.post(
  "/:gigId",
  protect,
  authorize("freelancer"),
  validate(proposalSchema),
  createProposal
);

router.get(
  "/my-proposals",
  protect,
  authorize("freelancer"),
  getMyProposals
);

router.get(
  "/gig/:gigId",
  protect,
  authorize("client"),
  getGigProposals
);

router.put(
  "/accept/:id",
  protect,
  authorize("client"),
  acceptProposal
);

router.put(
  "/reject/:id",
  protect,
  authorize("client"),
  rejectProposal
);

export default router;