import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import * as notificationService from "../services/notificationService.js";
import Notification from "../models/Notification.js";

export const getNotifications = asyncHandler(
  async (req, res) => {
    const notifications =
      await notificationService.getNotifications(
        req.user._id
      );

    res.json(
      new ApiResponse(
        200,
        "Notifications fetched successfully",
        notifications
      )
    );
  }
);

export const markAsRead = asyncHandler(
  async (req, res) => {
    const notification =
      await notificationService.markAsRead(
        req.params.id,
        req.user._id
      );

    res.json(
      new ApiResponse(
        200,
        "Notification marked as read",
        notification
      )
    );
  }
);

export const getUnreadCount = asyncHandler(
  async (req, res) => {
    const count =
      await Notification.countDocuments({
        user: req.user._id,
        isRead: false,
      });

    res.json(
      new ApiResponse(
        200,
        "Unread notification count",
        {
          count,
        }
      )
    );
  }
);

export const markAllAsRead = asyncHandler(
  async (req, res) => {
    await Notification.updateMany(
      {
        user: req.user._id,
        isRead: false,
      },
      {
        isRead: true,
      }
    );

    res.json(
      new ApiResponse(
        200,
        "All notifications marked as read"
      )
    );
  }
);