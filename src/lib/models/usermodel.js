import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    subscriptionPlan: {
      type: String,
      enum: ["free", "premium"],
      default: "free",
    },

    apiCopeyLimit: {
      daily: {
        type: Number,
        default: 10,
      },
      copeidToday: {
        type: Number,
        default: 0,
      },
      lastResetData: {
        type: Date,
        default: Date.now,
      },
    },
    premiumExpiryDate: {
      type: Date,
      default: null,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
