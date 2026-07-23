import express from "express";
import {
  getProgress,
  updateCompletionPercentage,
  addProgressLog,
  addMilestoneFile,
} from "../controllers/progressController.js";

const router = express.Router();

router.get("/:gigId", getProgress);
router.put("/:gigId/percentage", updateCompletionPercentage);
router.post("/:gigId/log", addProgressLog);
router.post("/:gigId/file", addMilestoneFile);

export default router;
