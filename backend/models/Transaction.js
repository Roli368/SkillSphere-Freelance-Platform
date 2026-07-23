import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    gig: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Gig",
      required: true,
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    freelancer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ["Escrow", "Milestone", "Payout", "Refund"],
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Held in Escrow", "Released", "Refunded", "Failed"],
      default: "Pending",
    },
    paymentGateway: {
      type: String,
      enum: ["Stripe", "Razorpay"],
      default: "Stripe",
    },
    transactionId: {
      type: String, // ID from Stripe/Razorpay
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", transactionSchema);
