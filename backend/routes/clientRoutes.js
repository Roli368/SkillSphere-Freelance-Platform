import express from "express";

import {
  createProfile,
  getMyProfile,
  updateProfile,
  getPublicProfile,
} from "../controllers/clientController.js";

import { protect, authorize } from "../middleware/authMiddleware.js";

import validate from "../middleware/validate.js";

import {
  createClientProfileSchema,
  updateClientProfileSchema,
} from "../validators/clientSchemas.js";

const router = express.Router();

router.post(
  "/profile",
  protect,
  authorize("client"),
  validate(createClientProfileSchema),
  createProfile
);

router.get(
  "/profile",
  protect,
  authorize("client"),
  getMyProfile
);

router.put(
  "/profile",
  protect,
  authorize("client"),
  validate(updateClientProfileSchema),
  updateProfile
);

router.get("/:id", getPublicProfile);

export default router;