import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    gig: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Gig",
      required: true,
    },

    reviewer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    reviewee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },

    comment: {
      type: String,
      trim: true,
      required: true,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    fraudFlag: {
      type: Boolean,
      default: false,
    },

    weight: {
      type: Number,
      default: 1.0, // Used for weighted reputation score
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Review",
  reviewSchema
);