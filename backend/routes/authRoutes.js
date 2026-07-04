import express from "express";
import {
  register,
  login,
  profile,
  updateProfile,
  logout,
} from "../controllers/authController.js";

import validate from "../middleware/validate.js";
import { registerSchema,loginSchema ,updateProfileSchema} from "../validators/authSchemas.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post(
  "/register",
  validate(registerSchema),
  register
);

router.post(
  "/login",
  validate(loginSchema),
  login
);

router.get(
  "/profile",
  protect,
  profile
);


router.put(
  "/profile",
  protect,
  validate(updateProfileSchema),
  updateProfile
);

router.post(
    "/logout",
    protect,
    logout
);

export default router;