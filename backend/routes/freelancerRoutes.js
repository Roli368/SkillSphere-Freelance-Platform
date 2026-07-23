import express from "express";

import {
  createProfile,
  getMyProfile,
  updateProfile,
  getPublicProfile,
  searchFreelancers,
} from "../controllers/freelancerController.js";

import { protect, authorize } from "../middleware/authMiddleware.js";
import validate from "../middleware/validate.js";

import {
  createFreelancerProfileSchema,
  updateFreelancerProfileSchema,
} from "../validators/freelancerSchemas.js";
const router = express.Router();

router.post(
  "/",
  protect,
  authorize("freelancer"),
   validate(createFreelancerProfileSchema),
  createProfile
);

router.get(
  "/me",
  protect,
  authorize("freelancer"),
  getMyProfile
);

router.put(
  "/me",
  protect,
  authorize("freelancer"),
   validate(updateFreelancerProfileSchema),
  updateProfile
);

router.get("/search", searchFreelancers);

router.get("/:id", getPublicProfile);

export default router;