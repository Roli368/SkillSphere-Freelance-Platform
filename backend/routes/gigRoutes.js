import express from "express";

import {
  createGig,
  getAllGigs,
  getGig,
  updateGig,
  deleteGig,
} from "../controllers/gigController.js";

import { protect, authorize } from "../middleware/authMiddleware.js";
import validate from "../middleware/validate.js";
import {
  createGigSchema,
  updateGigSchema,
} from "../validators/gigSchemas.js";

const router = express.Router();

router.get("/", getAllGigs);

router.get("/:id", getGig);

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

export default router;