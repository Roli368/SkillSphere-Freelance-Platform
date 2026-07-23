import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    conversation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      trim: true,
      default: "",
    },
    fileUrl: {
      type: String,
      default: "",
    },
    fileType: {
      type: String, // e.g., "image", "document"
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Message", messageSchema);