import mongoose from "mongoose";

const gigSchema = new mongoose.Schema(
  {
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

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    skills: [
      {
        type: String,
      },
    ],

    budget: {
      type: Number,
      required: true,
    },

    deadline: {
      type: Date,
      required: true,
    },

    experienceLevel: {
      type: String,
      enum: ["Beginner", "Intermediate", "Expert"],
      default: "Beginner",
    },

    status: {
      type: String,
      enum: ["Open", "In Progress", "Completed", "Cancelled"],
      default: "Open",
    },

    proposalsCount: {
      type: Number,
      default: 0,
    },

    hiredFreelancer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Gig", gigSchema);