const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema(
  {
    donation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Donation",
      required: true,
    },

    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ngo: { type: mongoose.Schema.Types.ObjectId, ref: "NGO", required: true },
    campaign: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Campaign",
      required: true,
    },

    // Auto-filled from linked models
    donorName: { type: String, required: true },
    ngoName: { type: String, required: true },
    campaignTitle: { type: String, required: true },

    // Auto-generated text template
    certificateText: { type: String, required: true },

    issuedAt: { type: Date, default: Date.now },
    certificateUrl: { type: String }, // PDF/IMG file after generation
  },
  { timestamps: true }
);

module.exports = mongoose.model("Certificate", certificateSchema);
