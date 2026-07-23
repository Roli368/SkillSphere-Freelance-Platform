import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    freelancer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Completed", "Canceled"],
      default: "Pending",
    },
    meetingLink: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
