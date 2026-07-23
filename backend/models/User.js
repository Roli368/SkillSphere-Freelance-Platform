import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },

    role: {
      type: String,
      enum: ["client", "freelancer", "admin"],
      default: "client",
    },

    avatar: {
      type: String,
      default: "",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    refreshToken: {
      type: String,
      default: null,
    },

    verificationToken: {
    type: String,
    default: null,
    },

    verificationTokenExpiry: {
      type: Date,
      default: null,
    },

    resetPasswordToken: {
      type: String,
      default: null,
    },

    resetPasswordExpiry: {
      type: Date,
      default: null,
    },

    lastLogin: {
      type: Date,
      default: null,
    },
    googleId: {
      type: String,
      default: null,
    },
    twoFactorSecret: {
      type: String,
      default: null,
    },
    isTwoFactorEnabled: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;