import mongoose from "mongoose";

const freelancerProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    headline: {
      type: String,
      trim: true,
      default: "",
    },

    bio: {
      type: String,
      default: "",
    },

    skills: [
      {
        name: {
          type: String,
          trim: true,
        },

        level: {
          type: String,
          enum: [
            "Beginner",
            "Intermediate",
            "Advanced",
            "Expert",
          ],
          default: "Beginner",
        },
      },
    ],

    experience: [
      {
        company: String,

        position: String,

        startDate: Date,

        endDate: Date,

        currentlyWorking: {
          type: Boolean,
          default: false,
        },
      },
    ],

    education: [
      {
        institute: String,

        degree: String,

        year: Number,
      },
    ],

    languages: [String],

    hourlyRate: {
      type: Number,
      default: 0,
    },

    portfolio: [
      {
        title: String,
        description: String,
        projectUrl: String,
        image: String,
      },
    ],

    resume: {
      type: String,
      default: "",
    },

    availability: {
      type: String,
      enum: ["available", "busy", "offline"],
      default: "available",
    },

    rating: {
      type: Number,
      default: 0,
    },

    totalReviews: {
      type: Number,
      default: 0,
    },

    completedProjects: {
      type: Number,
      default: 0,
    },
    
    certifications: [
      {
        name: String,
        issuer: String,
        year: Number,
        link: String,
      },
    ],

    verificationBadge: {
      type: Boolean,
      default: false,
    },

    milestonePricing: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "FreelancerProfile",
  freelancerProfileSchema
);