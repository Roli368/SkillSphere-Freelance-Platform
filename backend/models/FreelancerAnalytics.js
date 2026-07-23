import mongoose from "mongoose";

const freelancerAnalyticsSchema = new mongoose.Schema(
  {
    freelancer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    profileViews: {
      type: Number,
      default: 0,
    },
    gigApplications: {
      type: Number,
      default: 0,
    },
    totalEarnings: {
      type: Number,
      default: 0,
    },
    monthlyRevenue: [
      {
        month: String, // e.g., '2026-07'
        amount: Number,
      },
    ],
    clientFeedbackStats: {
      averageRating: {
        type: Number,
        default: 0,
      },
      totalReviews: {
        type: Number,
        default: 0,
      },
      positiveFeedbackPercentage: {
        type: Number,
        default: 0,
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("FreelancerAnalytics", freelancerAnalyticsSchema);
