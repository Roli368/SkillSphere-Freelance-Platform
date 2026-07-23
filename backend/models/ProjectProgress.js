import mongoose from "mongoose";

const projectProgressSchema = new mongoose.Schema(
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
    completionPercentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    milestones: [
      {
        title: String,
        description: String,
        dueDate: Date,
        status: {
          type: String,
          enum: ["Pending", "In Progress", "Completed", "Approved"],
          default: "Pending",
        },
        amount: Number,
        files: [
          {
            name: String,
            url: String,
            uploadedAt: {
              type: Date,
              default: Date.now,
            },
          },
        ],
      },
    ],
    progressLogs: [
      {
        message: String,
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("ProjectProgress", projectProgressSchema);
