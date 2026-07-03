import express from "express";
import authRoutes from "./authRoutes.js";

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

export default router;