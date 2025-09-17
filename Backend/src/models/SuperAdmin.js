const mongoose = require("mongoose");

const superAdminSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    permissions: [
      {
        type: String,
        enum: [
          "approve_ngo",
          "delete_campaign",
          "view_analytics",
          "manage_users",
        ],
      },
    ],
    superAdmin: { type: Boolean, default: false }, // main owner = true
  },
  { timestamps: true }
);

module.exports = mongoose.model("SuperAdmin", superAdminSchema);
