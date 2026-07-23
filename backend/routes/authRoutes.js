import express from "express";
import {  register,  login,  profile,  updateProfile,  logout, uploadAvatar,} from "../controllers/authController.js";

import validate from "../middleware/validate.js";
import { registerSchema,loginSchema ,updateProfileSchema} from "../validators/authSchemas.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

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

router.put(
  "/avatar",
  protect,
  upload.single("avatar"),
  uploadAvatar
);

export default router;