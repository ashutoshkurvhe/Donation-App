const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    postalCode: { type: String, required: true },
  },
  { _id: false }
);

const documentSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: [true, "Document URL is required"],
    },
    type: {
      type: String,
      enum: {
        values: [
          "registration",
          "pan",
          "license",
          "tax-exemption",
          "annual-report",
          "other",
        ],
        message: "{VALUE} is not a valid document type",
      },
      required: [true, "Document type is required"],
    },
    verificationStatus: {
      type: String,
      enum: ["pending", "verified", "rejected"],
      default: "pending",
    },
    verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: "SuperAdmin" },
    verifiedAt: Date,
    uploadedAt: { type: Date, default: Date.now },
    expiryDate: Date,
  },
  { _id: false }
);

const ngoSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"],
      unique: true,
    },
    organizationName: {
      type: String,
      required: [true, "Organization name is required"],
      trim: true,
      minlength: [3, "Organization name must be at least 3 characters long"],
      maxlength: [100, "Organization name cannot exceed 100 characters"],
    },
    registrationNumber: {
      type: String,
      required: [true, "Registration number is required"],
      trim: true,
      unique: true,
    },
    contactEmail: {
      type: String,
      required: [true, "Contact email is required"],
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },
    contactPhone: {
      type: String,
      required: [true, "Contact phone is required"],
      trim: true,
      match: [
        /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
        "Please enter a valid phone number",
      ],
    },
    address: {
      type: addressSchema,
      required: [true, "Address is required"],
    },
    website: {
      type: String,
      match: [
        /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
        "Please enter a valid URL",
      ],
    },
    description: {
      type: String,
      required: [true, "Organization description is required"],
      minlength: [100, "Description must be at least 100 characters long"],
      maxlength: [2000, "Description cannot exceed 2000 characters"],
    },
    documents: {
      type: [documentSchema],
      validate: {
        validator: function (docs) {
          // Ensure required documents are present
          const requiredTypes = ["registration", "pan", "license"];
          return requiredTypes.every((type) =>
            docs.some((doc) => doc.type === type)
          );
        },
        message: "Registration, PAN, and License documents are required",
      },
    },
    status: {
      type: String,
      enum: {
        values: ["pending", "approved", "rejected", "suspended"],
        message: "{VALUE} is not a valid status",
      },
      default: "pending",
    },
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "SuperAdmin" },
    approvedAt: Date,
    campaigns: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Campaign",
      },
    ],
    socialMedia: {
      facebook: String,
      twitter: String,
      instagram: String,
      linkedin: String,
    },
    categories: [
      {
        type: String,
        enum: [
          "education",
          "healthcare",
          "environment",
          "disaster-relief",
          "poverty",
          "animal-welfare",
          "other",
        ],
      },
    ],
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    totalDonationsReceived: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for efficient queries
ngoSchema.index({ status: 1, "documents.verificationStatus": 1 });
ngoSchema.index({ organizationName: 1 });
ngoSchema.index({ categories: 1 });

// Virtual for active campaigns count
ngoSchema.virtual("activeCampaignsCount").get(function () {
  return this.campaigns.length;
});

// Pre-save middleware to ensure user has NGO role
ngoSchema.pre("save", async function (next) {
  if (this.isNew) {
    const User = mongoose.model("User");
    await User.findByIdAndUpdate(this.user, { role: "ngo" });
  }
  next();
});

module.exports = mongoose.model("NGO", ngoSchema);
