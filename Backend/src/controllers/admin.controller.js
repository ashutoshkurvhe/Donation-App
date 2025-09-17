const User = require("../models/User");
const NGO = require("../models/NGO");
const Campaign = require("../models/Campaign");
const Donation = require("../models/Donation");

// ✅ Approve NGO
const approveNGO = async (req, res) => {
  try {
    const ngo = await NGO.findById(req.params.ngoId);
    if (!ngo) return res.status(404).json({ message: "NGO not found" });

    ngo.status = "approved";
    await ngo.save();
    res.json({ message: "NGO approved successfully", ngo });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ❌ Reject NGO
const rejectNGO = async (req, res) => {
  try {
    const ngo = await NGO.findByIdAndUpdate(
      req.params.ngoId,
      { status: "rejected" },
      { new: true }
    );
    if (!ngo) return res.status(404).json({ message: "NGO not found" });
    res.json({ message: "NGO rejected successfully", ngo });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🚫 Block User
const blockUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { isBlocked: true },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User blocked successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Unblock User
const unblockUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { isBlocked: false },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User unblocked successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🗑️ Remove Fake/Abusive Campaign
const removeCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findByIdAndDelete(req.params.campaignId);
    if (!campaign)
      return res.status(404).json({ message: "Campaign not found" });
    res.json({ message: "Campaign removed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📊 Get Platform Analytics
const getPlatformAnalytics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalNGOs = await NGO.countDocuments();
    const totalCampaigns = await Campaign.countDocuments();
    const totalDonations = await Donation.aggregate([
      { $group: { _id: null, sum: { $sum: "$amount" } } },
    ]);

    res.json({
      totalUsers,
      totalNGOs,
      totalCampaigns,
      totalDonations: totalDonations[0]?.sum || 0,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 👥 Get All Users with Filtering and Pagination
const getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build filter object
    const filter = {};
    if (req.query.role) filter.role = req.query.role;
    if (req.query.isBlocked !== undefined)
      filter.isBlocked = req.query.isBlocked === "true";
    if (req.query.search) {
      filter.$or = [
        { name: { $regex: req.query.search, $options: "i" } },
        { email: { $regex: req.query.search, $options: "i" } },
      ];
    }

    // Execute query with filters and pagination
    const users = await User.find(filter)
      .select("-password")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    // Get total count for pagination
    const total = await User.countDocuments(filter);

    res.json({
      users,
      pagination: {
        current: page,
        total: Math.ceil(total / limit),
        totalRecords: total,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🏢 Get All NGOs with Filtering and Pagination
const getAllNGOs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build filter object
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.search) {
      filter.$or = [
        { organizationName: { $regex: req.query.search, $options: "i" } },
        { description: { $regex: req.query.search, $options: "i" } },
      ];
    }

    // Execute query with filters and pagination
    const ngos = await NGO.find(filter)
      .populate("user", "name email")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    // Get total count for pagination
    const total = await NGO.countDocuments(filter);

    res.json({
      ngos,
      pagination: {
        current: page,
        total: Math.ceil(total / limit),
        totalRecords: total,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🚩 Get Flagged Content
const getFlaggedContent = async (req, res) => {
  try {
    // Get flagged campaigns
    const flaggedCampaigns = await Campaign.find({ isFlagged: true })
      .populate("ngo", "organizationName")
      .select("title description flagReason flaggedAt");

    // Get flagged comments (assuming you have a Comment model)
    const flaggedComments = await Comment.find({ isFlagged: true })
      .populate("user", "name")
      .populate("campaign", "title")
      .select("content flagReason flaggedAt");

    res.json({
      flaggedCampaigns,
      flaggedComments,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📨 Send System Notification
const sendSystemNotification = async (req, res) => {
  try {
    const { title, message, userIds, userType } = req.body;

    // Validate input
    if (!title || !message) {
      return res
        .status(400)
        .json({ message: "Title and message are required" });
    }

    let recipients = [];

    // If specific userIds are provided, use them
    if (userIds && userIds.length > 0) {
      recipients = userIds;
    }
    // Otherwise, if userType is provided, send to all users of that type
    else if (userType) {
      const users = await User.find({ role: userType }).select("_id");
      recipients = users.map((user) => user._id);
    }
    // If neither is provided, send to all users
    else {
      const users = await User.find().select("_id");
      recipients = users.map((user) => user._id);
    }

    // Create notifications for all recipients
    const notifications = await Notification.insertMany(
      recipients.map((userId) => ({
        user: userId,
        title,
        message,
        type: "SYSTEM",
        sender: req.user._id,
      }))
    );

    res.json({
      message: `Notification sent to ${recipients.length} users`,
      notifications,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📊 Export Data Report
const exportDataReport = async (req, res) => {
  try {
    const { startDate, endDate, type } = req.query;

    // Validate dates
    const start = startDate ? new Date(startDate) : new Date(0);
    const end = endDate ? new Date(endDate) : new Date();

    let data;
    switch (type) {
      case "donations":
        data = await Donation.find({
          createdAt: { $gte: start, $lte: end },
        })
          .populate("donor", "name email")
          .populate("campaign", "title")
          .select("amount status createdAt");
        break;

      case "campaigns":
        data = await Campaign.find({
          createdAt: { $gte: start, $lte: end },
        })
          .populate("ngo", "organizationName")
          .select("title targetAmount raisedAmount status createdAt");
        break;

      case "users":
        data = await User.find({
          createdAt: { $gte: start, $lte: end },
        }).select("name email role createdAt");
        break;

      default:
        return res.status(400).json({ message: "Invalid report type" });
    }

    res.json({
      type,
      dateRange: { start, end },
      count: data.length,
      data,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  approveNGO,
  rejectNGO,
  blockUser,
  unblockUser,
  removeCampaign,
  getPlatformAnalytics,
  getAllUsers,
  getAllNGOs,
  getFlaggedContent,
  sendSystemNotification,
  exportDataReport,
};
