import express from "express";
import authRoutes from "./authRoutes.js";

import freelancerRoutes from "./freelancerRoutes.js";
import gigRoutes from "./gigRoutes.js";
import proposalRoutes from "./proposalRoutes.js";
const router = express.Router();

// Test Route
router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "API is working 🚀",
  });
});

// Auth Routes
router.use("/auth", authRoutes);
router.use("/freelancer", freelancerRoutes);
router.use("/gigs", gigRoutes);
router.use("/proposals", proposalRoutes);
export default router;