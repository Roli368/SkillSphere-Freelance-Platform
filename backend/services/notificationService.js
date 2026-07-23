import Notification from "../models/Notification.js";
import ApiError from "../utils/ApiError.js";
import { getIO } from "../socket.js";

export const getNotifications = async (userId) => {
  return Notification.find({
    user: userId,
  }).sort({
    createdAt: -1,
  });
};

export const createNotification = async (userId, title, message, type = "system") => {
  const notification = await Notification.create({
    user: userId,
    title,
    message,
    type,
  });

  try {
    getIO().to(userId.toString()).emit("newNotification", notification);
  } catch (err) {
    console.log("Failed to emit notification", err);
  }

  return notification;
};

export const markAsRead = async (notificationId, userId) => {
  const notification = await Notification.findOneAndUpdate(
    { _id: notificationId, user: userId },
    { read: true },
    { new: true }
  );

  if (!notification) {
    throw new ApiError(404, "Notification not found");
  }

  return notification;
};

export const markAllAsRead = async (userId) => {
  await Notification.updateMany(
    { user: userId, read: false },
    { read: true }
  );
};