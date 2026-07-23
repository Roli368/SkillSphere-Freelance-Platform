import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import * as chatService from "../services/chatService.js";
import { getIO } from "../socket.js";
import cloudinary from "../config/cloudinary.js";

export const createConversation =
  asyncHandler(async (req, res) => {
    const conversation =
      await chatService.createConversation(
        req.user._id,
        req.body.receiverId
      );

    res.json(
      new ApiResponse(
        200,
        "Conversation created",
        conversation
      )
    );
  });

export const sendMessage =
  asyncHandler(async (req, res) => {
    let fileUrl = "";
    let fileType = "";

    if (req.file) {
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      const dataURI = "data:" + req.file.mimetype + ";base64," + b64;
      const cldRes = await cloudinary.uploader.upload(dataURI, {
        resource_type: "auto",
        folder: "skillsphere_chat",
      });
      fileUrl = cldRes.secure_url;
      fileType = req.file.mimetype.startsWith("image/") ? "image" : "document";
    }

    const message =
      await chatService.sendMessage(
        req.params.id,
        req.user._id,
        req.body.text || "",
        fileUrl,
        fileType
      );

    try {
      const io = getIO();
      // Emit to the conversation room for the active chat window
      io.to(req.params.id.toString()).emit("newMessage", message);

      // Find the receiver from the conversation participants
      const conversation = await chatService.getMyConversations(req.user._id);
      const currentConv = conversation.find(c => c._id.toString() === req.params.id.toString());
      if (currentConv) {
        const receiver = currentConv.participants.find(p => p._id.toString() !== req.user._id.toString());
        if (receiver) {
          // Emit to the receiver's personal room to update their conversation list
          io.to(receiver._id.toString()).emit("conversationUpdated", {
            conversationId: currentConv._id,
            message: message,
          });
        }
      }
    } catch (err) {
      console.log("Socket emit failed", err);
    }

    res.json(
      new ApiResponse(
        200,
        "Message sent",
        message
      )
    );
  });

export const getMessages =
  asyncHandler(async (req, res) => {
    const messages =
      await chatService.getMessages(
        req.params.id
      );

    res.json(
      new ApiResponse(
        200,
        "Success",
        messages
      )
    );
  });

export const getConversations =
  asyncHandler(async (req, res) => {
    const conversations =
      await chatService.getMyConversations(
        req.user._id
      );

    res.json(
      new ApiResponse(
        200,
        "Success",
        conversations
      )
    );
  });