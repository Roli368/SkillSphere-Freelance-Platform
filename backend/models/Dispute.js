import mongoose from "mongoose";

const disputeSchema = new mongoose.Schema(
  {
    gig: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Gig",
      required: true,
    },
    transaction: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transaction",
    },
    initiator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    evidence: [
      {
        type: String, // URLs to files/images
      },
    ],
    status: {
      type: String,
      enum: ["Open", "Under Review", "Resolved in favor of Client", "Resolved in favor of Freelancer", "Closed"],
      default: "Open",
    },
    adminNotes: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Dispute", disputeSchema);
