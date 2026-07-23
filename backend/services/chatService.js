import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";

export const createConversation = async (
  sender,
  receiver
) => {
  let conversation =
    await Conversation.findOne({
      participants: {
        $all: [sender, receiver],
      },
    });

  if (!conversation) {
    conversation =
      await Conversation.create({
        participants: [
          sender,
          receiver,
        ],
      });
  }

  return conversation;
};

export const sendMessage = async (
  conversationId,
  sender,
  text,
  fileUrl,
  fileType
) => {
  let message =
    await Message.create({
      conversation: conversationId,
      sender,
      text,
      fileUrl,
      fileType,
    });

  message = await message.populate("sender", "fullName avatar");

  const lastMessageText = text ? text : (fileType === "image" ? "📷 Image attachment" : "📎 File attachment");

  await Conversation.findByIdAndUpdate(
    conversationId,
    {
      lastMessage: lastMessageText,
    }
  );

  return message;
};

export const getMessages = async (
  conversationId
) => {
  return Message.find({
    conversation: conversationId,
  })
    .populate(
      "sender",
      "fullName avatar"
    )
    .sort({
      createdAt: 1,
    });
};

export const getMyConversations =
  async (userId) => {
    return Conversation.find({
      participants: userId,
    })
      .populate(
        "participants",
        "fullName avatar"
      )
      .sort({
        updatedAt: -1,
      });
  };