import mongoose from "mongoose";

const adminAnalyticsSchema = new mongoose.Schema(
  {
    platformRevenue: {
      type: Number,
      default: 0,
    },
    activeFreelancers: {
      type: Number,
      default: 0,
    },
    topCategories: [
      {
        category: String,
        gigCount: Number,
      },
    ],
    jobSuccessRate: {
      type: Number,
      default: 0, // e.g., 95 for 95%
    },
    totalUsers: {
      type: Number,
      default: 0,
    },
    fraudDetectionAlerts: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        reason: String,
        timestamp: {
          type: Date,
          default: Date.now,
        },
        resolved: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("AdminAnalytics", adminAnalyticsSchema);
