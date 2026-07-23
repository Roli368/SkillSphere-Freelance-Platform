import express from "express";
import {
  getFreelancerAnalytics,
  incrementProfileViews,
} from "../controllers/analyticsController.js";

const router = express.Router();

router.get("/:freelancerId", getFreelancerAnalytics);
router.post("/:freelancerId/views", incrementProfileViews);

export default router;
