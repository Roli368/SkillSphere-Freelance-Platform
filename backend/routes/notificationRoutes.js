import express from "express";

import {
  getNotifications,
  markAsRead,
  getUnreadCount,
  markAllAsRead,
} from "../controllers/notificationController.js";

import {
  protect,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/",
  protect,
  getNotifications
);

router.get(
  "/unread-count",
  protect,
  getUnreadCount
);

router.put(
  "/mark-all-read",
  protect,
  markAllAsRead
);

router.put(
  "/:id",
  protect,
  markAsRead
);

export default router;