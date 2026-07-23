import express from "express";

import {
  createConversation,
  sendMessage,
  getMessages,
  getConversations,
} from "../controllers/chatController.js";

import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", protect, getConversations);
router.post("/", protect, createConversation);

router.get("/:id", protect, getMessages);

router.post(
  "/:id",
  protect,
  upload.single("attachment"),
  sendMessage
);

export default router;