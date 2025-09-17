const mongoose = require("mongoose");

const analyticsSchema = new mongoose.Schema(
  {
    totalUsers: { type: Number, default: 0 },
    totalNGOs: { type: Number, default: 0 },
    totalCampaigns: { type: Number, default: 0 },
    totalDonations: { type: Number, default: 0 },
    totalDonationAmount: { type: Number, default: 0 },
    generatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Analytics", analyticsSchema);
