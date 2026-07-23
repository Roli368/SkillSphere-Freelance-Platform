import express from "express";
import authRoutes from "./authRoutes.js";
import dashboardRoutes from "./dashboardRoutes.js";
import freelancerRoutes from "./freelancerRoutes.js";
import gigRoutes from "./gigRoutes.js";
import proposalRoutes from "./proposalRoutes.js";
import notificationRoutes from "./notificationRoutes.js";
import chatRoutes from "./chatRoutes.js";
import settingsRoutes from "./settingsRoutes.js";
import favoriteRoutes from "./favoriteRoutes.js";
import reviewRoutes from "./reviewRoutes.js";
import adminRoutes from "./adminRoutes.js";
import progressRoutes from "./progressRoutes.js";
import analyticsRoutes from "./analyticsRoutes.js";
import searchRoutes from "./searchRoutes.js";

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
router.use("/notifications", notificationRoutes);
router.use("/chat", chatRoutes);
router.use("/settings", settingsRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/favorites", favoriteRoutes);
router.use("/reviews", reviewRoutes);

// New Feature Routes
router.use("/admin", adminRoutes);
router.use("/progress", progressRoutes);
router.use("/analytics", analyticsRoutes);
router.use("/search", searchRoutes);

export default router;