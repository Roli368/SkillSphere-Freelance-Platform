import express from "express";

import {
  createGig,
  getAllGigs,
  getGig,
  updateGig,
  deleteGig,
  getMyGigs,
} from "../controllers/gigController.js";

import {
  protect,
  authorize,
} from "../middleware/authMiddleware.js";

import validate from "../middleware/validate.js";

import {
  createGigSchema,
  updateGigSchema,
} from "../validators/gigSchemas.js";

const router = express.Router();

// Public Routes
router.get("/", getAllGigs);

// Client Routes
router.get(
  "/my-gigs",
  protect,
  authorize("client"),
  getMyGigs
);

router.post(
  "/",
  protect,
  authorize("client"),
  validate(createGigSchema),
  createGig
);

router.put(
  "/:id",
  protect,
  authorize("client"),
  validate(updateGigSchema),
  updateGig
);

router.delete(
  "/:id",
  protect,
  authorize("client"),
  deleteGig
);

// Keep this LAST
router.get("/:id", getGig);

export default router;