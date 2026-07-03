import express from "express";

import {
  apply,
  myProposals,
  gigProposals,
  updateStatus,
} from "../controllers/proposalController.js";

import {
  protect,
  authorize,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/:gigId",
  protect,
  authorize("freelancer"),
  apply
);

router.get(
  "/my",
  protect,
  authorize("freelancer"),
  myProposals
);

router.get(
  "/gig/:gigId",
  protect,
  authorize("client"),
  gigProposals
);

router.patch(
  "/:id",
  protect,
  authorize("client"),
  updateStatus
);

export default router;