import express from "express";

import { protect } from "../middleware/authMiddleware.js";
import validate from "../middleware/validate.js";

import { changePassword } from "../controllers/settingsController.js";
import { changePasswordSchema } from "../validators/settingsSchema.js";

const router = express.Router();

router.put(
  "/change-password",
  protect,
  validate(changePasswordSchema),
  changePassword
);

export default router;