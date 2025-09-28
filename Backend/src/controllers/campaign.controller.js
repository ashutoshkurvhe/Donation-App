const Campaign = require("../models/Campaign");

// Create campaign
const createCampaign = async (req, res, next) => {
  try {
    const campaign = await Campaign.create({ ...req.body, ngo: req.user._id });
    res.status(201).json({ success: true, campaign });
  } catch (error) {
    next(error);
  }
};

// Get all campaigns
const getCampaigns = async (req, res, next) => {
  try {
    const campaigns = await Campaign.find().populate("ngo", "organizationName");
    res.json({ success: true, campaigns });
  } catch (error) {
    next(error);
  }
};

// Get single campaign
const getCampaignById = async (req, res, next) => {
  try {
    const campaign = await Campaign.findById(req.params.id).populate(
      "ngo",
      "organizationName"
    );
    if (!campaign)
      return res.status(404).json({ message: "Campaign not found" });
    res.json({ success: true, campaign });
  } catch (error) {
    next(error);
  }
};

// Update campaign (only NGO owner or admin)
const updateCampaign = async (req, res, next) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign)
      return res.status(404).json({ message: "Campaign not found" });

    if (
      campaign.ngo.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    )
      return res.status(403).json({ message: "Not authorized" });

    Object.assign(campaign, req.body);
    await campaign.save();

    res.json({ success: true, campaign });
  } catch (error) {
    next(error);
  }
};

// Delete campaign (NGO owner or admin)
const deleteCampaign = async (req, res, next) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign)
      return res.status(404).json({ message: "Campaign not found" });

    if (
      campaign.ngo.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    )
      return res.status(403).json({ message: "Not authorized" });

    await campaign.deleteOne();
    res.json({ success: true, message: "Campaign deleted" });
  } catch (error) {
    next(error);
  }
};

// Get featured campaigns
const featuredCampaigns = async (req, res, next) => {
  try {
    const campaigns = await Campaign.find({ isFeatured: true })
      .populate("ngo", "organizationName")
      .sort("-createdAt");
    res.json({ success: true, campaigns });
  } catch (error) {
    next(error);
  }
};

// Search campaigns
const searchCampaigns = async (req, res, next) => {
  try {
    const { q, category, status } = req.query;
    const query = {};

    if (q) {
      query.$or = [
        { title: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
      ];
    }

    if (category) query.category = category;
    if (status) query.status = status;

    const campaigns = await Campaign.find(query)
      .populate("ngo", "organizationName")
      .sort("-createdAt");
    res.json({ success: true, campaigns });
  } catch (error) {
    next(error);
  }
};

// Get campaign statistics
const campaignStats = async (req, res, next) => {
  try {
    const stats = await Campaign.aggregate([
      {
        $group: {
          _id: null,
          totalCampaigns: { $sum: 1 },
          activeCampaigns: {
            $sum: { $cond: [{ $eq: ["$status", "active"] }, 1, 0] },
          },
          totalGoalAmount: { $sum: "$goalAmount" },
          totalRaisedAmount: { $sum: "$raisedAmount" },
        },
      },
    ]);

    res.json({
      success: true,
      stats: stats[0] || {
        totalCampaigns: 0,
        activeCampaigns: 0,
        totalGoalAmount: 0,
        totalRaisedAmount: 0,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Toggle campaign status
const toggleCampaignStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const campaign = await Campaign.findById(req.params.id);

    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    if (
      campaign.ngo.toString() !== req.user._id.toString() &&
      req.user.role !== "super-admin"
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    campaign.status = status;
    await campaign.save();

    res.json({ success: true, campaign });
  } catch (error) {
    next(error);
  }
};

// Donate to campaign
const donateToCampaign = async (req, res, next) => {
  try {
    const { amount } = req.body;
    const campaign = await Campaign.findById(req.params.id);

    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    if (campaign.status !== "active") {
      return res.status(400).json({ message: "Campaign is not active" });
    }

    campaign.raisedAmount += amount;
    campaign.donors.push(req.user._id);
    await campaign.save();

    res.json({
      success: true,
      message: "Donation successful",
      campaign,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCampaign,
  getCampaigns,
  getCampaignById,
  updateCampaign,
  deleteCampaign,
  featuredCampaigns,
  searchCampaigns,
  campaignStats,
  toggleCampaignStatus,
  donateToCampaign,
};
