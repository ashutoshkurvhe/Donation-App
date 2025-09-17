const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Campaign title is required"],
      trim: true,
      minlength: [10, "Title must be at least 10 characters long"],
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Campaign description is required"],
      minlength: [50, "Description must be at least 50 characters long"],
      maxlength: [5000, "Description cannot exceed 5000 characters"],
    },
    goalAmount: {
      type: Number,
      required: [true, "Goal amount is required"],
      min: [100, "Goal amount must be at least 100"],
      validate: {
        validator: Number.isFinite,
        message: "Goal amount must be a valid number",
      },
    },
    raisedAmount: {
      type: Number,
      default: 0,
      min: [0, "Raised amount cannot be negative"],
    },
    status: {
      type: String,
      enum: {
        values: ["draft", "active", "paused", "completed", "cancelled"],
        message: "{VALUE} is not a valid status",
      },
      default: "draft",
    },
    images: [
      {
        url: { type: String, required: true },
        caption: String,
      },
    ],
    category: {
      type: String,
      required: [true, "Campaign category is required"],
      enum: {
        values: [
          "education",
          "healthcare",
          "environment",
          "disaster-relief",
          "poverty",
          "animal-welfare",
          "other",
        ],
        message: "{VALUE} is not a valid category",
      },
    },
    isFeatured: { type: Boolean, default: false },
    endDate: {
      type: Date,
      required: [true, "Campaign end date is required"],
      validate: {
        validator: function (value) {
          return value > new Date();
        },
        message: "End date must be in the future",
      },
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NGO",
      required: [true, "Campaign must be created by an NGO"],
    },
    donors: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        amount: Number,
        date: { type: Date, default: Date.now },
      },
    ],
    tags: [String],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual field for campaign progress percentage
campaignSchema.virtual("progressPercentage").get(function () {
  return ((this.raisedAmount / this.goalAmount) * 100).toFixed(2);
});

// Virtual field for remaining days
campaignSchema.virtual("remainingDays").get(function () {
  return Math.ceil((this.endDate - new Date()) / (1000 * 60 * 60 * 24));
});

// Index for efficient queries
campaignSchema.index({ status: 1, endDate: 1 });
campaignSchema.index({ createdBy: 1, status: 1 });
campaignSchema.index({ category: 1, status: 1 });

// Pre-save middleware to check if raised amount exceeds goal
campaignSchema.pre("save", function (next) {
  if (this.raisedAmount > this.goalAmount) {
    this.status = "completed";
  }
  next();
});

module.exports = mongoose.model("Campaign", campaignSchema);
